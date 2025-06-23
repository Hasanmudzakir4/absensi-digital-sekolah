const { onSchedule } = require("firebase-functions/v2/scheduler");
const functions = require("firebase-functions");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

admin.initializeApp();
const db = admin.firestore();

// 1️⃣ Fungsi AutoMark Absent
exports.autoMarkAbsent = onSchedule(
  {
    schedule: "every 5 minutes",
    timeZone: "Asia/Jakarta",
  },
  async () => {
    const now = new Date();
    const todayDay = now.toLocaleDateString("id-ID", { weekday: "long" });
    logger.info(`📅 Hari ini: ${todayDay} (${now.toISOString()})`);

    const schedulesSnap = await db
      .collection("schedules")
      .where("day", "==", todayDay)
      .get();
    const unprocessed = schedulesSnap.docs.filter(
      (doc) => doc.data().autoMarked !== true
    );
    logger.info(`🔍 Ditemukan ${unprocessed.length} jadwal belum diproses.`);

    if (unprocessed.length === 0) {
      logger.info("⚠️ Tidak ada jadwal baru untuk diproses, fungsi selesai.");
      return null;
    }

    const batch = db.batch();
    let totalMarked = 0;

    for (const schedDoc of unprocessed) {
      const sched = schedDoc.data();
      const scheduleId = schedDoc.id;

      const endTs = sched.endTimestamp?.toDate?.();
      if (!endTs) continue;
      if (now <= endTs) continue;

      const studentsSnap = await db
        .collection("users")
        .where("role", "==", "siswa")
        .where("studentClass", "==", sched.className)
        .get();

      for (const studentDoc of studentsSnap.docs) {
        const studentId = studentDoc.id;
        const student = studentDoc.data();

        const attSnap = await db
          .collection("attendance")
          .where("scheduleId", "==", scheduleId)
          .where("studentId", "==", studentId)
          .limit(1)
          .get();

        if (!attSnap.empty) continue;

        const ref = db.collection("attendance").doc();
        batch.set(ref, {
          id: ref.id,
          qrData: {
            date: now.toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }),
            day: todayDay,
            status: "Tidak Hadir",
            subject: sched.subject,
            teacher: sched.teacherName,
            time: `${endTs.getHours().toString().padStart(2, "0")}:${endTs
              .getMinutes()
              .toString()
              .padStart(2, "0")}`,
          },
          scheduleId,
          studentClass: sched.className,
          studentId,
          studentName: student.name,
          studentNumber: student.idNumber ?? "Tidak Ada NIS",
          timestamp: admin.firestore.Timestamp.fromDate(now),
        });

        totalMarked++;
      }

      await schedDoc.ref.update({ autoMarked: true });
    }

    await batch.commit();
    logger.info(
      `🚀 Batch commit selesai. Total siswa ditandai: ${totalMarked}`
    );
    return null;
  }
);

// 2️⃣ Fungsi Delete Akun Siswa (Dipanggil dari Admin/Guru)
exports.deleteStudentAccount = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const idToken = req.headers.authorization?.split("Bearer ")[1];

    if (!idToken) {
      logger.warn("❌ Token Authorization tidak ditemukan.");
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const callerUid = decodedToken.uid;
      const targetUid = req.body.uid;

      if (!targetUid) {
        return res.status(400).json({ error: "UID target dibutuhkan." });
      }

      const callerDoc = await db.collection("users").doc(callerUid).get();
      const callerData = callerDoc.data();

      if (!callerData || !["admin", "guru"].includes(callerData.role)) {
        return res.status(403).json({ error: "Akses ditolak." });
      }

      await admin.auth().deleteUser(targetUid);
      await db.collection("users").doc(targetUid).delete();

      const attendanceSnap = await db
        .collection("attendance")
        .where("studentId", "==", targetUid)
        .get();

      const batch = db.batch();
      attendanceSnap.forEach((doc) => batch.delete(doc.ref));
      await batch.commit();

      return res
        .status(200)
        .json({ success: true, message: "Akun berhasil dihapus." });
    } catch (error) {
      logger.error("❌ Gagal verifikasi/hapus:", error);
      return res.status(500).json({ error: error.message });
    }
  });
});

exports.testDeleteFunction = functions.https.onCall(async (data, context) => {
  const targetUid = data.uid;
  const callerUid = context.auth?.uid;

  logger.info(
    `🧪 Fungsi testDeleteFunction dipanggil oleh ${callerUid}, target UID: ${targetUid}`
  );

  return {
    success: true,
    message: `Fungsi dipanggil dengan UID: ${targetUid}`,
  };
});
