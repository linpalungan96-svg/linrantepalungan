import {
  Siswa,
  Mapel,
  Jadwal,
  PresensiRecord,
  NilaiRecord,
  AgendaKbm,
  BimbinganRecord,
  ProfilGuru,
  ProfilSekolah,
  KktpConfig,
  AiSavedDocument
} from '../types';

const STORAGE_KEYS = {
  SISWA: 'lrp_siswa_v1',
  MAPEL: 'lrp_mapel_v1',
  JADWAL: 'lrp_jadwal_v1',
  PRESENSI: 'lrp_presensi_v1',
  NILAI: 'lrp_nilai_v1',
  AGENDA: 'lrp_agenda_v1',
  BIMBINGAN: 'lrp_bimbingan_v1',
  GURU: 'lrp_guru_v1',
  SEKOLAH: 'lrp_sekolah_v1',
  KKTP: 'lrp_kktp_v1',
  AI_DOCS: 'lrp_ai_docs_v1',
  CUSTOM_LOGO: 'lrp_custom_logo_v1'
};

// Default Indonesian School Vector Badge / Logo SVG
export const DEFAULT_LOGO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%231e3a8a;stop-opacity:1" /><stop offset="100%" style="stop-color:%230284c7;stop-opacity:1" /></linearGradient></defs><circle cx="50" cy="50" r="46" fill="url(%23grad1)" stroke="%23f59e0b" stroke-width="4"/><path d="M50 16 L78 30 L78 60 C78 74 50 84 50 84 C50 84 22 74 22 60 L22 30 Z" fill="%23ffffff" stroke="%23d97706" stroke-width="2"/><path d="M50 26 L68 36 L50 46 L32 36 Z" fill="%23f59e0b"/><path d="M42 47 L58 47 L58 64 C58 64 54 68 50 68 C46 68 42 64 42 64 Z" fill="%23dc2626"/><circle cx="50" cy="56" r="4" fill="%23fbbf24"/><path d="M28 39 L28 52" stroke="%23f59e0b" stroke-width="3" stroke-linecap="round"/><path d="M72 39 L72 52" stroke="%23f59e0b" stroke-width="3" stroke-linecap="round"/></svg>`;

const DEFAULT_GURU: ProfilGuru = {
  nama: 'Lin Rante Palungan',
  gelar: 'S.Pd., M.Pd.',
  nip: '198804122014031002',
  nuptk: '7442766667130122',
  nik: '7318051204880001',
  noHp: '081242339812',
  email: 'linpalungan96@guru.sma.belajar.id',
  pangkatGol: 'Pembina Tk. I, IV/b',
  mapelUtama: 'Informatika & Pembelajaran Mendalam'
};

const DEFAULT_SEKOLAH: ProfilSekolah = {
  namaSekolah: 'SMA NEGERI 1 TANA TORAJA',
  npsn: '40304561',
  nss: '301191802001',
  alamat: 'Jalan Tritura No. 42, Kel. Bombongan, Makale',
  kelurahan: 'Bombongan',
  kecamatan: 'Makale',
  kabupatenKota: 'Kabupaten Tana Toraja',
  provinsi: 'Sulawesi Selatan',
  kodePos: '91811',
  telepon: '(0423) 22056',
  email: 'sman1makale@gmail.sch.id',
  website: 'https://sman1tanatoraja.sch.id',
  kepalaSekolahNama: 'Drs. Kornelius Baturante, M.Pd.',
  kepalaSekolahNip: '196805141994121003',
  logoUrl: DEFAULT_LOGO_SVG,
  tahunAjaran: '2025/2026',
  semesterAktif: 'Genap'
};

const DEFAULT_MAPEL: Mapel[] = [
  {
    id: 'mpl-1',
    kode: 'INF-X',
    nama: 'Informatika (Fase E)',
    fase: 'Fase E',
    tingkatKelas: 'Kelas X',
    alokasiJp: 3,
    capaianUmum: 'Peserta didik mampu menerapkan berpikir komputasional, memahami dampak sosial informatika, algoritma pemrograman, dan analisis data berlandaskan SK BSKAP No. 046/H/KR/2025.',
    elemenList: ['Berpikir Komputasional (BK)', 'Teknologi Informasi dan Komunikasi (TIK)', 'Sistem Komputer (SK)', 'Jaringan Komputer dan Internet (JKI)', 'Analisis Data (AD)', 'Algoritma dan Pemrograman (AP)']
  },
  {
    id: 'mpl-2',
    kode: 'INF-XI',
    nama: 'Informatika (Fase F - Lanjutan)',
    fase: 'Fase F',
    tingkatKelas: 'Kelas XI',
    alokasiJp: 4,
    capaianUmum: 'Peserta didik mampu mengembangkan solusi terprogram, rekayasa perangkat lunak sederhana, etika kecerdasan artifisial, dan basis data berlandaskan SK BSKAP No. 046/H/KR/2025.',
    elemenList: ['Pengembangan Solusi Digital', 'Rekayasa Perangkat Lunak', 'Basis Data & Informasi', 'Dampak Sosial & Etika AI']
  },
  {
    id: 'mpl-3',
    kode: 'PKK-XII',
    nama: 'Projek Kreatif & Kewirausahaan (PKK)',
    fase: 'Fase F',
    tingkatKelas: 'Kelas XII',
    alokasiJp: 4,
    capaianUmum: 'Peserta didik menghasilkan karya digital bernilai ekonomis, inovasi produk lokal, dan perencanaan bisnis rintisan berbasis teknologi.',
    elemenList: ['Peluang Usaha Digital', 'Desain Prototipe Produk', 'Pemasaran Digital & Finansial']
  }
];

const DEFAULT_SISWA: Siswa[] = [
  {
    id: 'sw-101',
    nis: '230101',
    nisn: '0078912301',
    nama: 'Adriel Mario Palimbong',
    jenisKelamin: 'L',
    kelas: 'X-1',
    noHpOrtu: '081244556677',
    alamat: 'Jl. Pantan No. 12, Makale',
    status: 'Aktif'
  },
  {
    id: 'sw-102',
    nis: '230102',
    nisn: '0078912302',
    nama: 'Brenda Natalia Rantetasak',
    jenisKelamin: 'P',
    kelas: 'X-1',
    noHpOrtu: '081399887766',
    alamat: 'Jl. Poros Rantepao Km. 3, Makale Utara',
    status: 'Aktif'
  },
  {
    id: 'sw-103',
    nis: '230103',
    nisn: '0078912303',
    nama: 'Christian Ezra Tandilino',
    jenisKelamin: 'L',
    kelas: 'X-1',
    noHpOrtu: '085244112233',
    alamat: 'Lingkungan Tarongko, Makale',
    status: 'Aktif'
  },
  {
    id: 'sw-104',
    nis: '230104',
    nisn: '0078912304',
    nama: 'Debora Gloria Banne',
    jenisKelamin: 'P',
    kelas: 'X-1',
    noHpOrtu: '082155667788',
    alamat: 'Jl. Nusantara No. 88, Makale',
    status: 'Aktif'
  },
  {
    id: 'sw-105',
    nis: '230105',
    nisn: '0078912305',
    nama: 'Eliezer Yohanis Sambominanga',
    jenisKelamin: 'L',
    kelas: 'X-1',
    noHpOrtu: '081299001122',
    alamat: 'Manggasa, Makale Selatan',
    status: 'Aktif'
  },
  {
    id: 'sw-106',
    nis: '230106',
    nisn: '0078912306',
    nama: 'Febiola Angelia Sarungallo',
    jenisKelamin: 'P',
    kelas: 'X-2',
    noHpOrtu: '085377889900',
    alamat: 'Jl. Tritura No. 15, Makale',
    status: 'Aktif'
  },
  {
    id: 'sw-107',
    nis: '230107',
    nisn: '0078912307',
    nama: 'Gabriel Samuel Tangkeallo',
    jenisKelamin: 'L',
    kelas: 'X-2',
    noHpOrtu: '082211445566',
    alamat: 'Batupapan, Makale',
    status: 'Aktif'
  },
  {
    id: 'sw-108',
    nis: '230108',
    nisn: '0078912308',
    nama: 'Hanna Priskila Mangontan',
    jenisKelamin: 'P',
    kelas: 'X-2',
    noHpOrtu: '081344221199',
    alamat: 'Jl. Pongtiku No. 5, Rantepao',
    status: 'Aktif'
  },
  {
    id: 'sw-201',
    nis: '220201',
    nisn: '0068912401',
    nama: 'Immanuel Kevin Linting',
    jenisKelamin: 'L',
    kelas: 'XI-1',
    noHpOrtu: '081277665544',
    alamat: 'Kamali, Makale',
    status: 'Aktif'
  },
  {
    id: 'sw-202',
    nis: '220202',
    nisn: '0068912402',
    nama: 'Jessica Michelle Todingbua',
    jenisKelamin: 'P',
    kelas: 'XI-1',
    noHpOrtu: '085299881122',
    alamat: 'Botang, Makale',
    status: 'Aktif'
  },
  {
    id: 'sw-203',
    nis: '220203',
    nisn: '0068912403',
    nama: 'Kenan Jonathan Pakilaran',
    jenisKelamin: 'L',
    kelas: 'XI-2',
    noHpOrtu: '082188442211',
    alamat: 'Sangalla Utara',
    status: 'Aktif'
  },
  {
    id: 'sw-301',
    nis: '210301',
    nisn: '0058912501',
    nama: 'Lois Amanda Salurante',
    jenisKelamin: 'P',
    kelas: 'XII-1',
    noHpOrtu: '081355998844',
    alamat: 'Mandetek, Makale Utara',
    status: 'Aktif'
  }
];

const DEFAULT_JADWAL: Jadwal[] = [
  {
    id: 'jdw-1',
    hari: 'Senin',
    jamMulai: '07:30',
    jamSelesai: '09:45',
    jamKe: '1 - 3',
    mapelId: 'mpl-1',
    mapelNama: 'Informatika (Fase E)',
    kelas: 'X-1',
    ruang: 'Lab Komputer 1'
  },
  {
    id: 'jdw-2',
    hari: 'Senin',
    jamMulai: '10:15',
    jamSelesai: '12:30',
    jamKe: '4 - 6',
    mapelId: 'mpl-1',
    mapelNama: 'Informatika (Fase E)',
    kelas: 'X-2',
    ruang: 'Lab Komputer 1'
  },
  {
    id: 'jdw-3',
    hari: 'Selasa',
    jamMulai: '08:15',
    jamSelesai: '11:15',
    jamKe: '2 - 5',
    mapelId: 'mpl-2',
    mapelNama: 'Informatika (Fase F - Lanjutan)',
    kelas: 'XI-1',
    ruang: 'Lab Komputer 2'
  },
  {
    id: 'jdw-4',
    hari: 'Rabu',
    jamMulai: '07:30',
    jamSelesai: '10:30',
    jamKe: '1 - 4',
    mapelId: 'mpl-2',
    mapelNama: 'Informatika (Fase F - Lanjutan)',
    kelas: 'XI-2',
    ruang: 'Lab Komputer 2'
  },
  {
    id: 'jdw-5',
    hari: 'Kamis',
    jamMulai: '08:15',
    jamSelesai: '11:15',
    jamKe: '2 - 5',
    mapelId: 'mpl-3',
    mapelNama: 'Projek Kreatif & Kewirausahaan (PKK)',
    kelas: 'XII-1',
    ruang: 'Ruang Teori XII-1'
  },
  {
    id: 'jdw-6',
    hari: 'Jumat',
    jamMulai: '07:30',
    jamSelesai: '09:45',
    jamKe: '1 - 3',
    mapelId: 'mpl-1',
    mapelNama: 'Informatika (Fase E)',
    kelas: 'X-1',
    ruang: 'Lab Multimedia'
  }
];

const DEFAULT_AGENDA: AgendaKbm[] = [
  {
    id: 'agn-1',
    tanggal: '2026-10-05',
    kelas: 'X-1',
    jamKe: '1 - 3',
    mapelNama: 'Informatika (Fase E)',
    materiTp: 'TP 1.1 Menganalisis cara kerja algoritma pencarian (Searching) pada data kontekstual',
    kegiatanKbm: 'Pembelajaran mendalam (Meaningful Learning): Siswa mengorganisir data buku perpustakaan sekolah menggunakan Binary Search dan Linear Search dalam kerja kelompok.',
    hambatan: 'Sebagian siswa kesulitan membedakan kompleksitas waktu (Big-O) secara intuitif.',
    solusi: 'Diberikan analogi permainan tebak angka 1-100 dengan feedback lebih besar/kecil.',
    status: 'Terlaksana'
  },
  {
    id: 'agn-2',
    tanggal: '2026-10-06',
    kelas: 'XI-1',
    jamKe: '2 - 5',
    mapelNama: 'Informatika (Fase F)',
    materiTp: 'TP 2.2 Desain Basis Data Relasional dengan Normalisasi 3NF',
    kegiatanKbm: 'Praktik membuat Entity Relationship Diagram (ERD) sistem informasi koperasi siswa Toraja.',
    hambatan: 'Koneksi jaringan lab sempat lambat saat sinkronisasi tool daring.',
    solusi: 'Dialihkan menggunakan software lokal pemodelan offline terlebih dahulu.',
    status: 'Terlaksana'
  },
  {
    id: 'agn-3',
    tanggal: '2026-10-07',
    kelas: 'X-2',
    jamKe: '4 - 6',
    mapelNama: 'Informatika (Fase E)',
    materiTp: 'TP 1.2 Etika Digital dan Dampak Media Sosial terhadap Kesehatan Mental Remaja',
    kegiatanKbm: 'Deep Learning (Mindful Learning): Diskusi refleksi pengalaman bermedia sosial dan perancangan kampanye anti-cyberbullying.',
    hambatan: 'Tidak ada hambatan berarti, antusiasme siswa sangat tinggi.',
    solusi: 'Hasil infografis siswa dipajang di mading digital kelas.',
    status: 'Terlaksana'
  }
];

const DEFAULT_BIMBINGAN: BimbinganRecord[] = [
  {
    id: 'bmb-1',
    tanggal: '2026-10-02',
    siswaId: 'sw-103',
    siswaNama: 'Christian Ezra Tandilino',
    kelas: 'X-1',
    kategori: 'Kedisiplinan',
    uraianMasalah: 'Terlambat masuk jam pelajaran pertama selama 3 hari berturut-turut.',
    tindakLanjut: 'Konseling Mandiri',
    hasilTindakLanjut: 'Siswa mengonfirmasi membantu orang tua membuka toko sebelum berangkat. Dibuatkan jadwal manajemen waktu pagi dan sepakat datang sebelum jam 07.15.',
    statusKasus: 'Selesai'
  },
  {
    id: 'bmb-2',
    tanggal: '2026-10-04',
    siswaId: 'sw-102',
    siswaNama: 'Brenda Natalia Rantetasak',
    kelas: 'X-1',
    kategori: 'Prestasi',
    uraianMasalah: 'Potensi unggul dalam Olimpiade Sains Nasional (OSN) bidang Informatika tingkat Kabupaten.',
    tindakLanjut: 'Apresiasi Prestasi',
    hasilTindakLanjut: 'Diberikan modul bimbingan khusus pemrograman C++ dan algoritma kompetisi.',
    statusKasus: 'Selesai'
  },
  {
    id: 'bmb-3',
    tanggal: '2026-10-06',
    siswaId: 'sw-105',
    siswaNama: 'Eliezer Yohanis Sambominanga',
    kelas: 'X-1',
    kategori: 'Akademik',
    uraianMasalah: 'Mengalami penurunan konsentrasi belajar saat sesi pemrograman praktikum.',
    tindakLanjut: 'Bimbingan Khusus',
    hasilTindakLanjut: 'Dilakukan pendampingan tutor sebaya oleh rekan kelompoknya (Adriel). Menunjukkan perkembangan positif.',
    statusKasus: 'Dalam Proses'
  }
];

const DEFAULT_KKTP: KktpConfig = {
  kktpMinimal: 75,
  rangeA: 90,
  rangeB: 80,
  rangeC: 70
};

// Seed initial Nilai for X-1
const DEFAULT_NILAI: NilaiRecord[] = [
  {
    id: 'nil-1',
    siswaId: 'sw-101',
    mapelId: 'mpl-1',
    kelas: 'X-1',
    semester: 'Genap',
    tahunAjaran: '2025/2026',
    formatif: [
      { tpId: 'tp-1', tpJudul: 'Berpikir Komputasional (Searching/Sorting)', nilai: 92 },
      { tpId: 'tp-2', tpJudul: 'Sistem Komputer & Jaringan', nilai: 88 },
      { tpId: 'tp-3', tpJudul: 'Algoritma & Pemrograman Dasar', nilai: 90 }
    ],
    sumatifMid: 88,
    sumatifAkhir: 94,
    nilaiAkhir: 91,
    predikat: 'A',
    capaianTinggi: 'Menunjukkan penguasaan sangat istimewa dalam mengimplementasikan algoritma pencarian dan struktur logika pemrograman.',
    capaianRendah: 'Perlu mempertahankan ketelitian saat melakukan tracing eksekusi baris kode bersarang.'
  },
  {
    id: 'nil-2',
    siswaId: 'sw-102',
    mapelId: 'mpl-1',
    kelas: 'X-1',
    semester: 'Genap',
    tahunAjaran: '2025/2026',
    formatif: [
      { tpId: 'tp-1', tpJudul: 'Berpikir Komputasional (Searching/Sorting)', nilai: 96 },
      { tpId: 'tp-2', tpJudul: 'Sistem Komputer & Jaringan', nilai: 94 },
      { tpId: 'tp-3', tpJudul: 'Algoritma & Pemrograman Dasar', nilai: 95 }
    ],
    sumatifMid: 95,
    sumatifAkhir: 98,
    nilaiAkhir: 96,
    predikat: 'A',
    capaianTinggi: 'Sangat mahir memecahkan persoalan komputasi kompleks dengan efisiensi memori dan waktu optimal.',
    capaianRendah: 'Telah melampaui seluruh indikator ketercapaian tujuan pembelajaran.'
  },
  {
    id: 'nil-3',
    siswaId: 'sw-103',
    mapelId: 'mpl-1',
    kelas: 'X-1',
    semester: 'Genap',
    tahunAjaran: '2025/2026',
    formatif: [
      { tpId: 'tp-1', tpJudul: 'Berpikir Komputasional (Searching/Sorting)', nilai: 78 },
      { tpId: 'tp-2', tpJudul: 'Sistem Komputer & Jaringan', nilai: 80 },
      { tpId: 'tp-3', tpJudul: 'Algoritma & Pemrograman Dasar', nilai: 76 }
    ],
    sumatifMid: 75,
    sumatifAkhir: 82,
    nilaiAkhir: 78,
    predikat: 'B',
    capaianTinggi: 'Mampu memahami arsitektur perangkat keras dan topologi jaringan lokal dengan baik.',
    capaianRendah: 'Perlu bimbingan lebih lanjut dalam menyusun alur flowchart dan sintaks percabangan kompleks.'
  },
  {
    id: 'nil-4',
    siswaId: 'sw-104',
    mapelId: 'mpl-1',
    kelas: 'X-1',
    semester: 'Genap',
    tahunAjaran: '2025/2026',
    formatif: [
      { tpId: 'tp-1', tpJudul: 'Berpikir Komputasional (Searching/Sorting)', nilai: 86 },
      { tpId: 'tp-2', tpJudul: 'Sistem Komputer & Jaringan', nilai: 84 },
      { tpId: 'tp-3', tpJudul: 'Algoritma & Pemrograman Dasar', nilai: 88 }
    ],
    sumatifMid: 85,
    sumatifAkhir: 89,
    nilaiAkhir: 86,
    predikat: 'B',
    capaianTinggi: 'Menunjukkan kemampuan baik dalam analisis kebutuhan data dan perancangan antarmuka pengguna.',
    capaianRendah: 'Tingkatkan pemahaman teknis pada routing jaringan skala luas.'
  },
  {
    id: 'nil-5',
    siswaId: 'sw-105',
    mapelId: 'mpl-1',
    kelas: 'X-1',
    semester: 'Genap',
    tahunAjaran: '2025/2026',
    formatif: [
      { tpId: 'tp-1', tpJudul: 'Berpikir Komputasional (Searching/Sorting)', nilai: 74 },
      { tpId: 'tp-2', tpJudul: 'Sistem Komputer & Jaringan', nilai: 72 },
      { tpId: 'tp-3', tpJudul: 'Algoritma & Pemrograman Dasar', nilai: 75 }
    ],
    sumatifMid: 70,
    sumatifAkhir: 76,
    nilaiAkhir: 73,
    predikat: 'C',
    capaianTinggi: 'Cukup memahami fungsi dasar sistem operasi dan peripheral komputer.',
    capaianRendah: 'Perlu latihan berkala dalam mengonstruksi logika algoritma pemrograman dasar.'
  }
];

// Seed Presensi for recent dates
const DEFAULT_PRESENSI: PresensiRecord[] = [
  {
    id: 'prs-1',
    tanggal: '2026-10-05',
    kelas: 'X-1',
    mapelId: 'mpl-1',
    jamKe: '1 - 3',
    catatanKbm: 'KBM berjalan aktif, materi Searching Algorithm dengan metode jigsaw kelompok.',
    items: [
      { siswaId: 'sw-101', status: 'H' },
      { siswaId: 'sw-102', status: 'H' },
      { siswaId: 'sw-103', status: 'H', keterangan: 'Terlambat 10 menit' },
      { siswaId: 'sw-104', status: 'H' },
      { siswaId: 'sw-105', status: 'S', keterangan: 'Surat dokter flu batuk' }
    ]
  },
  {
    id: 'prs-2',
    tanggal: '2026-10-06',
    kelas: 'XI-1',
    mapelId: 'mpl-2',
    jamKe: '2 - 5',
    catatanKbm: 'Praktik basis data normalisasi, kehadiran 100%.',
    items: [
      { siswaId: 'sw-201', status: 'H' },
      { siswaId: 'sw-202', status: 'H' }
    ]
  }
];

type ListenerCallback = () => void;
const listeners: Set<ListenerCallback> = new Set();

function notifyListeners() {
  listeners.forEach(cb => {
    try {
      cb();
    } catch (e) {
      console.error(e);
    }
  });
}

export const dbService = {
  subscribe(callback: ListenerCallback) {
    listeners.add(callback);
    return () => {
      listeners.delete(callback);
    };
  },

  // Initialize DB if empty
  init() {
    if (!localStorage.getItem(STORAGE_KEYS.GURU)) {
      localStorage.setItem(STORAGE_KEYS.GURU, JSON.stringify(DEFAULT_GURU));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SEKOLAH)) {
      localStorage.setItem(STORAGE_KEYS.SEKOLAH, JSON.stringify(DEFAULT_SEKOLAH));
    }
    if (!localStorage.getItem(STORAGE_KEYS.MAPEL)) {
      localStorage.setItem(STORAGE_KEYS.MAPEL, JSON.stringify(DEFAULT_MAPEL));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SISWA)) {
      localStorage.setItem(STORAGE_KEYS.SISWA, JSON.stringify(DEFAULT_SISWA));
    }
    if (!localStorage.getItem(STORAGE_KEYS.JADWAL)) {
      localStorage.setItem(STORAGE_KEYS.JADWAL, JSON.stringify(DEFAULT_JADWAL));
    }
    if (!localStorage.getItem(STORAGE_KEYS.AGENDA)) {
      localStorage.setItem(STORAGE_KEYS.AGENDA, JSON.stringify(DEFAULT_AGENDA));
    }
    if (!localStorage.getItem(STORAGE_KEYS.BIMBINGAN)) {
      localStorage.setItem(STORAGE_KEYS.BIMBINGAN, JSON.stringify(DEFAULT_BIMBINGAN));
    }
    if (!localStorage.getItem(STORAGE_KEYS.KKTP)) {
      localStorage.setItem(STORAGE_KEYS.KKTP, JSON.stringify(DEFAULT_KKTP));
    }
    if (!localStorage.getItem(STORAGE_KEYS.NILAI)) {
      localStorage.setItem(STORAGE_KEYS.NILAI, JSON.stringify(DEFAULT_NILAI));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PRESENSI)) {
      localStorage.setItem(STORAGE_KEYS.PRESENSI, JSON.stringify(DEFAULT_PRESENSI));
    }
    if (!localStorage.getItem(STORAGE_KEYS.AI_DOCS)) {
      localStorage.setItem(STORAGE_KEYS.AI_DOCS, JSON.stringify([]));
    }
  },

  // Guru
  getGuru(): ProfilGuru {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.GURU);
      return data ? JSON.parse(data) : DEFAULT_GURU;
    } catch {
      return DEFAULT_GURU;
    }
  },
  saveGuru(guru: ProfilGuru) {
    localStorage.setItem(STORAGE_KEYS.GURU, JSON.stringify(guru));
    notifyListeners();
  },

  // Sekolah
  getSekolah(): ProfilSekolah {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SEKOLAH);
      return data ? JSON.parse(data) : DEFAULT_SEKOLAH;
    } catch {
      return DEFAULT_SEKOLAH;
    }
  },
  saveSekolah(sekolah: ProfilSekolah) {
    localStorage.setItem(STORAGE_KEYS.SEKOLAH, JSON.stringify(sekolah));
    notifyListeners();
  },

  // Siswa
  getSiswaList(): Siswa[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SISWA);
      return data ? JSON.parse(data) : DEFAULT_SISWA;
    } catch {
      return DEFAULT_SISWA;
    }
  },
  saveSiswaList(list: Siswa[]) {
    localStorage.setItem(STORAGE_KEYS.SISWA, JSON.stringify(list));
    notifyListeners();
  },
  addSiswa(siswa: Omit<Siswa, 'id'>) {
    const list = this.getSiswaList();
    const newSiswa: Siswa = {
      ...siswa,
      id: 'sw-' + Date.now()
    };
    list.push(newSiswa);
    this.saveSiswaList(list);
    return newSiswa;
  },
  updateSiswa(id: string, updated: Partial<Siswa>) {
    const list = this.getSiswaList();
    const index = list.findIndex(s => s.id === id);
    if (index !== -1) {
      list[index] = { ...list[index], ...updated };
      this.saveSiswaList(list);
    }
  },
  deleteSiswa(id: string) {
    const list = this.getSiswaList().filter(s => s.id !== id);
    this.saveSiswaList(list);
  },

  // Unique Classes from Siswa
  getKelasList(): string[] {
    const siswa = this.getSiswaList();
    const set = new Set(siswa.map(s => s.kelas.trim()).filter(Boolean));
    if (set.size === 0) {
      return ['X-1', 'X-2', 'XI-1', 'XI-2', 'XII-1'];
    }
    return Array.from(set).sort();
  },

  // Mapel
  getMapelList(): Mapel[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MAPEL);
      return data ? JSON.parse(data) : DEFAULT_MAPEL;
    } catch {
      return DEFAULT_MAPEL;
    }
  },
  saveMapelList(list: Mapel[]) {
    localStorage.setItem(STORAGE_KEYS.MAPEL, JSON.stringify(list));
    notifyListeners();
  },
  addMapel(mapel: Omit<Mapel, 'id'>) {
    const list = this.getMapelList();
    const newMapel: Mapel = {
      ...mapel,
      id: 'mpl-' + Date.now()
    };
    list.push(newMapel);
    this.saveMapelList(list);
    return newMapel;
  },
  updateMapel(id: string, updated: Partial<Mapel>) {
    const list = this.getMapelList();
    const index = list.findIndex(m => m.id === id);
    if (index !== -1) {
      list[index] = { ...list[index], ...updated };
      this.saveMapelList(list);
    }
  },
  deleteMapel(id: string) {
    const list = this.getMapelList().filter(m => m.id !== id);
    this.saveMapelList(list);
  },

  // Jadwal
  getJadwalList(): Jadwal[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.JADWAL);
      return data ? JSON.parse(data) : DEFAULT_JADWAL;
    } catch {
      return DEFAULT_JADWAL;
    }
  },
  saveJadwalList(list: Jadwal[]) {
    localStorage.setItem(STORAGE_KEYS.JADWAL, JSON.stringify(list));
    notifyListeners();
  },
  addJadwal(jadwal: Omit<Jadwal, 'id'>) {
    const list = this.getJadwalList();
    const newJadwal: Jadwal = {
      ...jadwal,
      id: 'jdw-' + Date.now()
    };
    list.push(newJadwal);
    this.saveJadwalList(list);
    return newJadwal;
  },
  updateJadwal(id: string, updated: Partial<Jadwal>) {
    const list = this.getJadwalList();
    const index = list.findIndex(j => j.id === id);
    if (index !== -1) {
      list[index] = { ...list[index], ...updated };
      this.saveJadwalList(list);
    }
  },
  deleteJadwal(id: string) {
    const list = this.getJadwalList().filter(j => j.id !== id);
    this.saveJadwalList(list);
  },

  // Presensi
  getPresensiList(): PresensiRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PRESENSI);
      return data ? JSON.parse(data) : DEFAULT_PRESENSI;
    } catch {
      return DEFAULT_PRESENSI;
    }
  },
  savePresensiList(list: PresensiRecord[]) {
    localStorage.setItem(STORAGE_KEYS.PRESENSI, JSON.stringify(list));
    notifyListeners();
  },
  saveOrUpdatePresensi(record: Omit<PresensiRecord, 'id'> & { id?: string }) {
    const list = this.getPresensiList();
    if (record.id) {
      const idx = list.findIndex(p => p.id === record.id);
      if (idx !== -1) {
        list[idx] = { ...record, id: record.id };
        this.savePresensiList(list);
        return list[idx];
      }
    }
    // Check if an entry for same date, class & mapel exists
    const existingIndex = list.findIndex(
      p => p.tanggal === record.tanggal && p.kelas === record.kelas && p.mapelId === record.mapelId
    );
    if (existingIndex !== -1) {
      list[existingIndex] = {
        ...record,
        id: list[existingIndex].id
      };
      this.savePresensiList(list);
      return list[existingIndex];
    } else {
      const newRec: PresensiRecord = {
        ...record,
        id: 'prs-' + Date.now()
      };
      list.unshift(newRec);
      this.savePresensiList(list);
      return newRec;
    }
  },

  // Nilai
  getNilaiList(): NilaiRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.NILAI);
      return data ? JSON.parse(data) : DEFAULT_NILAI;
    } catch {
      return DEFAULT_NILAI;
    }
  },
  saveNilaiList(list: NilaiRecord[]) {
    localStorage.setItem(STORAGE_KEYS.NILAI, JSON.stringify(list));
    notifyListeners();
  },
  saveNilaiRecord(record: NilaiRecord) {
    const list = this.getNilaiList();
    const idx = list.findIndex(n => n.id === record.id || (n.siswaId === record.siswaId && n.mapelId === record.mapelId && n.semester === record.semester));
    if (idx !== -1) {
      list[idx] = record;
    } else {
      list.push(record);
    }
    this.saveNilaiList(list);
  },

  // Agenda
  getAgendaList(): AgendaKbm[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.AGENDA);
      return data ? JSON.parse(data) : DEFAULT_AGENDA;
    } catch {
      return DEFAULT_AGENDA;
    }
  },
  saveAgendaList(list: AgendaKbm[]) {
    localStorage.setItem(STORAGE_KEYS.AGENDA, JSON.stringify(list));
    notifyListeners();
  },
  addAgenda(agenda: Omit<AgendaKbm, 'id'>) {
    const list = this.getAgendaList();
    const newAgenda: AgendaKbm = {
      ...agenda,
      id: 'agn-' + Date.now()
    };
    list.unshift(newAgenda);
    this.saveAgendaList(list);
    return newAgenda;
  },
  deleteAgenda(id: string) {
    const list = this.getAgendaList().filter(a => a.id !== id);
    this.saveAgendaList(list);
  },

  // Bimbingan
  getBimbinganList(): BimbinganRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BIMBINGAN);
      return data ? JSON.parse(data) : DEFAULT_BIMBINGAN;
    } catch {
      return DEFAULT_BIMBINGAN;
    }
  },
  saveBimbinganList(list: BimbinganRecord[]) {
    localStorage.setItem(STORAGE_KEYS.BIMBINGAN, JSON.stringify(list));
    notifyListeners();
  },
  addBimbingan(bimbingan: Omit<BimbinganRecord, 'id'>) {
    const list = this.getBimbinganList();
    const newBimbingan: BimbinganRecord = {
      ...bimbingan,
      id: 'bmb-' + Date.now()
    };
    list.unshift(newBimbingan);
    this.saveBimbinganList(list);
    return newBimbingan;
  },
  deleteBimbingan(id: string) {
    const list = this.getBimbinganList().filter(b => b.id !== id);
    this.saveBimbinganList(list);
  },

  // KKTP
  getKktp(): KktpConfig {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.KKTP);
      return data ? JSON.parse(data) : DEFAULT_KKTP;
    } catch {
      return DEFAULT_KKTP;
    }
  },
  saveKktp(cfg: KktpConfig) {
    localStorage.setItem(STORAGE_KEYS.KKTP, JSON.stringify(cfg));
    notifyListeners();
  },

  // AI Saved Docs
  getAiDocs(): AiSavedDocument[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.AI_DOCS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },
  saveAiDoc(doc: Omit<AiSavedDocument, 'id' | 'tanggal'>) {
    const list = this.getAiDocs();
    const newDoc: AiSavedDocument = {
      ...doc,
      id: 'aidoc-' + Date.now(),
      tanggal: new Date().toISOString().split('T')[0]
    };
    list.unshift(newDoc);
    localStorage.setItem(STORAGE_KEYS.AI_DOCS, JSON.stringify(list));
    notifyListeners();
    return newDoc;
  },
  deleteAiDoc(id: string) {
    const list = this.getAiDocs().filter(d => d.id !== id);
    localStorage.setItem(STORAGE_KEYS.AI_DOCS, JSON.stringify(list));
    notifyListeners();
  },

  // Backup & Restore
  exportFullBackup(): string {
    const data = {
      guru: this.getGuru(),
      sekolah: this.getSekolah(),
      siswa: this.getSiswaList(),
      mapel: this.getMapelList(),
      jadwal: this.getJadwalList(),
      presensi: this.getPresensiList(),
      nilai: this.getNilaiList(),
      agenda: this.getAgendaList(),
      bimbingan: this.getBimbinganList(),
      kktp: this.getKktp(),
      aiDocs: this.getAiDocs(),
      exportTimestamp: new Date().toISOString()
    };
    return JSON.stringify(data, null, 2);
  },

  importBackup(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      if (data.guru) localStorage.setItem(STORAGE_KEYS.GURU, JSON.stringify(data.guru));
      if (data.sekolah) localStorage.setItem(STORAGE_KEYS.SEKOLAH, JSON.stringify(data.sekolah));
      if (data.siswa) localStorage.setItem(STORAGE_KEYS.SISWA, JSON.stringify(data.siswa));
      if (data.mapel) localStorage.setItem(STORAGE_KEYS.MAPEL, JSON.stringify(data.mapel));
      if (data.jadwal) localStorage.setItem(STORAGE_KEYS.JADWAL, JSON.stringify(data.jadwal));
      if (data.presensi) localStorage.setItem(STORAGE_KEYS.PRESENSI, JSON.stringify(data.presensi));
      if (data.nilai) localStorage.setItem(STORAGE_KEYS.NILAI, JSON.stringify(data.nilai));
      if (data.agenda) localStorage.setItem(STORAGE_KEYS.AGENDA, JSON.stringify(data.agenda));
      if (data.bimbingan) localStorage.setItem(STORAGE_KEYS.BIMBINGAN, JSON.stringify(data.bimbingan));
      if (data.kktp) localStorage.setItem(STORAGE_KEYS.KKTP, JSON.stringify(data.kktp));
      if (data.aiDocs) localStorage.setItem(STORAGE_KEYS.AI_DOCS, JSON.stringify(data.aiDocs));
      notifyListeners();
      return true;
    } catch (e) {
      console.error('Import failed', e);
      return false;
    }
  },

  resetToDefault() {
    localStorage.setItem(STORAGE_KEYS.GURU, JSON.stringify(DEFAULT_GURU));
    localStorage.setItem(STORAGE_KEYS.SEKOLAH, JSON.stringify(DEFAULT_SEKOLAH));
    localStorage.setItem(STORAGE_KEYS.MAPEL, JSON.stringify(DEFAULT_MAPEL));
    localStorage.setItem(STORAGE_KEYS.SISWA, JSON.stringify(DEFAULT_SISWA));
    localStorage.setItem(STORAGE_KEYS.JADWAL, JSON.stringify(DEFAULT_JADWAL));
    localStorage.setItem(STORAGE_KEYS.AGENDA, JSON.stringify(DEFAULT_AGENDA));
    localStorage.setItem(STORAGE_KEYS.BIMBINGAN, JSON.stringify(DEFAULT_BIMBINGAN));
    localStorage.setItem(STORAGE_KEYS.KKTP, JSON.stringify(DEFAULT_KKTP));
    localStorage.setItem(STORAGE_KEYS.NILAI, JSON.stringify(DEFAULT_NILAI));
    localStorage.setItem(STORAGE_KEYS.PRESENSI, JSON.stringify(DEFAULT_PRESENSI));
    localStorage.setItem(STORAGE_KEYS.AI_DOCS, JSON.stringify([]));
    notifyListeners();
  }
};

// Auto init on import
dbService.init();
