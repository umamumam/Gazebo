# 🌲 Sae Gazebo - Premium Woodcraft & Modern Gazebo Configurator

<img width="1920" height="7703" alt="screencapture-localhost-5173-2026-06-04-15_00_19" src="https://github.com/user-attachments/assets/cd5bdf1e-4373-480a-852e-e813d93a1e6d" />

Sae Gazebo adalah platform web e-commerce premium untuk pemesanan dan kustomisasi gazebo kayu jati, mahoni, dan bambu secara interaktif. Web ini menggabungkan keindahan kerajinan kayu tradisional Jepara dengan teknologi modern berupa simulator kustomisasi real-time (*interactive configurator*) serta desain antarmuka (*UI*) modern berkonsep *glassmorphism*.

---

## 🚀 Fitur Utama

### 1. 🛠️ Simulator Kustomisasi Interaktif (3D Preview Simulator)
Memungkinkan pengguna merancang gazebo impian secara langsung dengan visualisasi dinamis dan estimasi harga real-time:
*   **Bahan Baku**: Pilihan material mulai dari Bambu Petung (Eco), Kayu Mahoni, hingga Kayu Jati Premium.
*   **Ukuran Dimensi**: Pilihan ukuran 2x2 meter, 3x3 meter, dan 4x4 meter.
*   **Bentuk Konstruksi**: Bentuk Kotak (4 Sisi), Segi Enam, dan Segi Delapan.
*   **Material Atap**: Pilihan Atap Alang-alang, Atap Genteng Tanah, hingga Atap Sirap Ulin (Kayu).
*   **Live Preview Mockup**: Pratinjau langsung model yang dipilih lengkap dengan kontrol interaktif (*reset view*, *zoom in*, *zoom out*).
*   **Integrasi WhatsApp**: Pesanan kustomisasi dapat langsung diteruskan ke chat admin WhatsApp dengan pesan yang sudah terisi otomatis sesuai spesifikasi yang dipilih.

### 2. ✍️ Animasi Typewriter Hero Loop
Bagian landing page/hero dilengkapi dengan efek mengetik (*typewriter*) pada judul utama **"Bangun Sudut Santai Impian Anda"**:
*   Mengetik baris pertama, dilanjutkan jeda visual singkat, lalu mengetik baris kedua.
*   Menampilkan kursor ketik kuning berkedip (*blinking cursor*) yang memudar (*fade-out*) secara halus setelah penulisan selesai.
*   Efek ini berjalan secara melingkar (*looping*) otomatis setiap **10 detik** kembali ke awal untuk memberikan kesan hidup dan dinamis pada halaman web.

### 3. 🛍️ Katalog Gazebo Premium & Sistem Keranjang
*   Menampilkan katalog model gazebo standar (*pre-configured*) berkualitas tinggi dengan detail material dan spesifikasi.
*   *Drawer* keranjang belanja belanja interaktif di sisi samping (*Cart Sidebar*) yang mendukung pembaruan kuantitas barang, penghapusan, dan kalkulasi subtotal otomatis.

### 4. 👤 Autentikasi Pengguna & Dashboard Pelacakan
*   Modal masuk (*Sign In*) dan daftar (*Sign Up*) interaktif dengan penyimpanan data berbasis *local storage*.
*   *Dashboard* akun untuk melacak riwayat pemesanan, detail spesifikasi gazebo yang dipesan, alamat pengiriman, status perakitan, dan tombol cepat untuk koordinasi langsung dengan admin via WhatsApp.

### 5. 📬 Premium Footer & Newsletter Card
*   Newsletter card bertema *dark green gradient* mewah menggunakan gambar visual utama `herobackgounrd.png` dengan efek animasi melayang (*floating animation*) yang elegan.

---

## 💻 Teknologi yang Digunakan

*   **Framework Utama**: [React 19](https://react.dev/)
*   **Bundler & Tooling**: [Vite 8](https://vite.dev/)
*   **Ikon Grafis**: [Lucide React](https://lucide.dev/)
*   **Sistem Styling**: Vanilla CSS Modern dengan variabel khusus (*CSS variables*), *keyframe* animasi kustom, *glassmorphism*, dan *scroll reveal animation*.

---

## 📁 Struktur Folder Proyek

```text
SaeGazebo/
├── public/                 # Aset statis publik (ikon, manifest, dll.)
│   └── images/             # Gambar aset produk, latar belakang, dan testimonial
├── src/
│   ├── components/         # Komponen-komponen React
│   │   ├── AuthModal.jsx             # Modal login & pendaftaran user
│   │   ├── CartSidebar.jsx           # Panel drawer keranjang belanja samping
│   │   ├── Dashboard.jsx             # Dashboard pesanan & profil pelanggan
│   │   ├── Footer.jsx                # Kaki halaman & form newsletter
│   │   ├── GazeboCatalog.jsx         # Halaman katalog produk gazebo standar
│   │   ├── Hero.jsx                  # Bagian atas landing page dengan typewriter
│   │   ├── InteractiveConfigurator.jsx # Simulator kustomisasi gazebo
│   │   ├── Navbar.jsx                # Navigasi atas & tombol keranjang/user
│   │   └── WhatsAppWidget.jsx        # Widget WhatsApp melayang di sudut bawah
│   ├── App.jsx             # Komponen utama pengatur routing & state global
│   ├── index.css           # File stylesheet utama & desain sistem
│   └── main.jsx            # Entry point aplikasi React
├── package.json            # Daftar dependensi & script proyek
└── README.md               # Dokumentasi proyek
```

---

## 🛠️ Instalasi & Penggunaan

### Prasyarat
Pastikan Anda sudah menginstal [Node.js](https://nodejs.org/) di komputer Anda.

### Langkah-Langkah

1.  **Clone atau Unduh Repositori**
    ```bash
    git clone https://github.com/umamumam/Gazebo.git
    cd Gazebo
    ```

2.  **Instal Dependensi**
    Jalankan perintah berikut untuk menginstal seluruh dependensi React dan pustaka ikon:
    ```bash
    npm install
    ```

3.  **Jalankan Server Pengembangan (Lokal)**
    Mulai server lokal untuk melihat aplikasi secara langsung di browser Anda:
    ```bash
    npm run dev
    ```
    Aplikasi akan berjalan secara lokal, biasanya di alamat [http://localhost:5173/](http://localhost:5173/).

4.  **Build untuk Produksi**
    Untuk mengompilasi dan mengoptimalkan aplikasi agar siap dipublikasikan ke server hosting:
    ```bash
    npm run build
    ```

5.  **Pratinjau Hasil Build**
    Untuk menguji hasil build produksi secara lokal sebelum dideploy:
    ```bash
    npm run preview
    ```

---

## 🎨 Desain Sistem & Kustomisasi CSS

Aplikasi ini menggunakan konfigurasi CSS modern di [src/index.css](file:///h:/SaeGazebo/src/index.css) dengan beberapa variabel warna utama:
*   `--color-primary`: `#2d4a43` (Dark Forest Green - melambangkan kemewahan kayu dan alam)
*   `--color-secondary`: `#d4af37` (Muted Gold - melambangkan kualitas premium dan aksen)
*   `--color-bg-dark`: `#0f1715` (Deep Dark Green - latar belakang gelap modern)
*   `--color-border`: `rgba(255, 255, 255, 0.08)` (Garis pembatas halus untuk estetika *glassmorphism*)

Semua elemen interaktif dilengkapi dengan transisi halus (`transition: all 0.3s ease`) dan efek *hover* yang responsif.
