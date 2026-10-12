export interface Siswa {
  id: string;
  nis: string;
  nisn: string;
  nama: string;
  jenisKelamin: 'L' | 'P';
  kelas: string;
  noHpOrtu: string;
  alamat: string;
  status: 'Aktif' | 'Mutasi' | 'Lulus';
  fotoUrl?: string;
}

export interface Mapel {
  id: string;
  kode: string;
  nama: string;
  fase: 'Fase E' | 'Fase F';
  tingkatKelas: string;
  alokasiJp: number;
  capaianUmum: string;
  elemenList: string[];
}

export interface Jadwal {
  id: string;
  hari: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu';
  jamMulai: string;
  jamSelesai: string;
  jamKe: string;
  mapelId: string;
  mapelNama: string;
  kelas: string;
  ruang: string;
}

export type PresensiStatus = 'H' | 'S' | 'I' | 'A';

export interface PresensiItem {
  siswaId: string;
  status: PresensiStatus;
  keterangan?: string;
}

export interface PresensiRecord {
  id: string;
  tanggal: string;
  kelas: string;
  mapelId: string;
  jamKe: string;
  catatanKbm: string;
  items: PresensiItem[];
}

export interface NilaiKomponen {
  tpId: string;
  tpJudul: string;
  nilai: number;
}

export interface NilaiRecord {
  id: string;
  siswaId: string;
  mapelId: string;
  kelas: string;
  semester: 'Ganjil' | 'Genap';
  tahunAjaran: string;
  formatif: NilaiKomponen[];
  sumatifMid: number;
  sumatifAkhir: number;
  nilaiAkhir: number;
  predikat: 'A' | 'B' | 'C' | 'D';
  capaianTinggi: string;
  capaianRendah: string;
}

export interface AgendaKbm {
  id: string;
  tanggal: string;
  kelas: string;
  jamKe: string;
  mapelNama: string;
  materiTp: string;
  kegiatanKbm: string;
  hambatan: string;
  solusi: string;
  status: 'Terlaksana' | 'Tertunda' | 'Daring';
}

export interface BimbinganRecord {
  id: string;
  tanggal: string;
  siswaId: string;
  siswaNama: string;
  kelas: string;
  kategori: 'Kedisiplinan' | 'Akademik' | 'Sosial/Pribadi' | 'Prestasi';
  uraianMasalah: string;
  tindakLanjut: 'Konseling Mandiri' | 'Panggilan Orang Tua' | 'Home Visit' | 'Bimbingan Khusus' | 'Apresiasi Prestasi';
  hasilTindakLanjut: string;
  statusKasus: 'Selesai' | 'Dalam Proses';
}

export interface ProfilGuru {
  nama: string;
  gelar: string;
  nip: string;
  nuptk: string;
  nik: string;
  noHp: string;
  email: string;
  pangkatGol: string;
  mapelUtama: string;
}

export interface ProfilSekolah {
  namaSekolah: string;
  npsn: string;
  nss: string;
  alamat: string;
  kelurahan: string;
  kecamatan: string;
  kabupatenKota: string;
  provinsi: string;
  kodePos: string;
  telepon: string;
  email: string;
  website: string;
  kepalaSekolahNama: string;
  kepalaSekolahNip: string;
  logoUrl: string;
  tahunAjaran: string;
  semesterAktif: 'Ganjil' | 'Genap';
}

export interface KktpConfig {
  kktpMinimal: number;
  rangeA: number; // e.g. 90
  rangeB: number; // e.g. 80
  rangeC: number; // e.g. 70
}

export interface AiSavedDocument {
  id: string;
  tipe: 'modul' | 'media' | 'perangkat' | 'kbc' | 'kokurikuler' | 'soal' | 'kartu-soal' | 'lkpd' | 'ppt';
  judul: string;
  konten: string;
  tanggal: string;
  mapel: string;
  kelas: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}
