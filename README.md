# 📚 Aplikasi Absensi Siswa dan Guru

Aplikasi Absensi Sekolah adalah solusi berbasis mobile yang dibangun menggunakan **Flutter** dan **Firebase**. Aplikasi ini memungkinkan siswa dan guru untuk melakukan proses absensi digital dengan mudah melalui pemindaian QR code, serta menyediakan fitur manajemen jadwal dan riwayat kehadiran secara real-time.

---

## 🚀 Fitur Utama

### 🔐 Autentikasi

- Siswa dan Guru dapat melakukan **registrasi** dan **login** menggunakan Firebase Authentication.

### 👤 Manajemen Profil

- Siswa dan Guru dapat **melengkapi** dan **mengubah** profil mereka (seperti nama lengkap, NIS/NIP, kelas, jurusan, dll).

### 👨‍🏫 Fitur untuk Guru

- **Kelola Jadwal Mengajar**: Tambah, ubah, dan hapus jadwal mengajar.
- **Generate QR Code**: Tampilkan QR code absensi untuk siswa berdasarkan jadwal aktif.
- **Riwayat Kehadiran Siswa**: Lihat semua kehadiran siswa berdasarkan jadwal yang dibuat.

### 🧑‍🎓 Fitur untuk Siswa

- **Scan QR Code**: Siswa dapat memindai barcode dari guru untuk melakukan absensi.
- **Lihat Jadwal Hari Ini**: Tampilkan jadwal berdasarkan hari dan semester saat ini.
- **Lihat Semua Jadwal**: Tampilkan semua jadwal aktif yang tersedia.
- **Riwayat Kehadiran**: Lihat daftar absensi yang telah dilakukan.

---

## 🛠 Teknologi yang Digunakan

- **Flutter**: Framework UI cross-platform untuk Android dan iOS.
- **Firebase Authentication**: Digunakan untuk sistem login dan registrasi pengguna.
- **Firebase Cloud Firestore**: Digunakan sebagai basis data utama.
- **Firebase Storage**: Untuk menyimpan gambar profil pengguna.

---

## 📷 Cuplikan Aplikasi

<p align="center">
  <img src="/images/screenshots/splash-screen.png" alt="Splash Screen" width="150"/>
  <img src="/images/screenshots/welcome-screen1.png" alt="Welcome Screen 1" width="150"/>
  <img src="/images/screenshots/welcome-screen2.png" alt="Welcome Screen 2" width="150"/>
  <img src="/images/screenshots/welcome-screen3.png" alt="Welcome Screen 3" width="150"/>
  <img src="/images/screenshots/login.png" alt="Login" width="150"/>
  <img src="/images/screenshots/register.png" alt="Register" width="150"/>
  <img src="/images/screenshots/home-lecturer.png" alt="Home Lecturer" width="150"/>
  <img src="/images/screenshots/barcode.png" alt="barcode" width="150"/>
  <img src="/images/screenshots/schedule-lecturer.png" alt="Schedule" width="150"/>
  <img src="/images/screenshots/profile-lecturer.png" alt="Profile" width="150"/>
  <img src="/images/screenshots/update-profile-lecturer.png" alt="Update Profile" width="150"/>
</p>

---

## 📦 Cara Menjalankan

1. Clone repository ini:

```bash
git clone https://github.com/Hasanmudzakir4/absensi-sekolah.git
```

2. Masuk ke folder project:

```bash
cd absensi
```

3. Install dependencies:

```bash
flutter pub get
```

4. Hubungkan dengan Firebase:

- Buat project baru di [Firebase Console](https://console.firebase.google.com/).
- Aktifkan Authentication (Email/Password) dan Cloud Firestore .
- Download google-services.json (Android).
- Tempatkan file konfigurasi tersebut pada direktori sesuai platform.

5. Jalankan aplikasi:

```bash
flutter run
```

## 📲 Unduh Aplikasi

Silakan unduh dan coba aplikasi melalui tautan berikut:

👉 [App Absensi](https://appdistribution.firebase.dev/i/d89478dcee0c9538)

© 2025 Aplikasi Absensi. Dibuat dengan ❤️ menggunakan Flutter dan Firebase.
