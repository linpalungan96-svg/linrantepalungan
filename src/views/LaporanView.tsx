import React, { useState } from 'react';
import { dbService } from '../services/dbService';
import { PrintHeader, PrintSignature } from '../components/PrintHeader';
import {
  Printer,
  FolderArchive,
  FileText,
  CheckCircle,
  Eye,
  Award,
  BookOpen,
  Calendar,
  Users
} from 'lucide-react';

type BerkasType =
  | 'cover-bk1'
  | 'cover-bk2'
  | 'cover-bk3'
  | 'cover-bk4'
  | 'rekap-presensi'
  | 'leger-nilai'
  | 'jurnal-kbm'
  | 'buku-bimbingan';

export const LaporanView: React.FC = () => {
  const [selectedBerkas, setSelectedBerkas] = useState<BerkasType>('cover-bk1');
  const guru = dbService.getGuru();
  const sekolah = dbService.getSekolah();
  const siswaList = dbService.getSiswaList();
  const mapelList = dbService.getMapelList();
  const presensiList = dbService.getPresensiList();
  const nilaiList = dbService.getNilaiList();
  const agendaList = dbService.getAgendaList();
  const bimbinganList = dbService.getBimbinganList();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Screen Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-500 text-slate-950 rounded-xl shadow-xs font-black">
              <Printer className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Pusat Laporan & Cetak Dokumen Administrasi Guru
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Pusat cetak 1-klik untuk seluruh perangkat Buku Kerja Guru 1, 2, 3, 4, rekapitulasi absensi, dan leger nilai resmi.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black shadow-md shadow-amber-500/20 transition"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak Dokumen Terpilih</span>
        </button>
      </div>

      {/* Grid: Berkas Menu on Left, Preview Document on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Berkas Selection Tabs */}
        <div className="lg:col-span-4 space-y-2 print:hidden">
          <p className="text-xs font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2">
            PILIH BUKU KERJA & DOKUMEN:
          </p>

          {[
            { id: 'cover-bk1', label: 'Buku Kerja Guru 1', desc: 'Cover, CP, TP, ATP, Modul Ajar, KKTP' },
            { id: 'cover-bk2', label: 'Buku Kerja Guru 2', desc: 'Kode Etik, Ikrar Guru, Prota, Prosem' },
            { id: 'cover-bk3', label: 'Buku Kerja Guru 3', desc: 'Daftar Hadir, Nilai, Analisis, Remedial' },
            { id: 'cover-bk4', label: 'Buku Kerja Guru 4', desc: 'Evaluasi Diri & Tindak Lanjut Guru' },
            { id: 'rekap-presensi', label: 'Rekap Presensi Semester', desc: 'Laporan kehadiran seluruh rombel' },
            { id: 'leger-nilai', label: 'Leger Nilai & Deskripsi Rapor', desc: 'Rekap nilai formatif, sumatif & NA' },
            { id: 'jurnal-kbm', label: 'Jurnal Agenda Mengajar', desc: 'Buku catatan harian tatap muka KBM' },
            { id: 'buku-bimbingan', label: 'Buku Bimbingan & Konseling', desc: 'Catatan kasus, tindak lanjut & prestasi' }
          ].map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedBerkas(item.id as BerkasType)}
              className={`p-3.5 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                selectedBerkas === item.id
                  ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-500 text-slate-950 dark:text-amber-200 font-bold shadow-xs'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-400'
              }`}
            >
              <div>
                <p className="text-xs font-black">{item.label}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
              </div>
              <Eye className="w-4 h-4 text-amber-600 shrink-0 ml-2" />
            </div>
          ))}
        </div>

        {/* Document Printable View */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md p-6 sm:p-8 min-h-[600px] text-slate-900 dark:text-slate-100 print:border-none print:shadow-none print:p-0 print:m-0">
          {/* ======================================================= */}
          {/* COVER BUKU KERJA GURU 1 */}
          {/* ======================================================= */}
          {selectedBerkas === 'cover-bk1' && (
            <div className="flex flex-col items-center justify-between min-h-[650px] border-4 border-double border-slate-800 p-8 text-center font-serif">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-widest font-bold">PEMERINTAH PROVINSI SULAWESI SELATAN</p>
                <p className="text-xs uppercase tracking-widest font-semibold">DINAS PENDIDIKAN WILAYAH X</p>
                <h2 className="text-xl font-bold uppercase">{sekolah.namaSekolah}</h2>
              </div>

              <div className="my-8">
                <img
                  src={sekolah.logoUrl}
                  alt="Logo Sekolah"
                  className="w-28 h-28 object-contain mx-auto my-4"
                />
                <h1 className="text-2xl font-black uppercase tracking-wider text-slate-900 mt-4">
                  BUKU KERJA GURU 1
                </h1>
                <p className="text-sm font-semibold tracking-wide uppercase text-slate-700 mt-1">
                  PERANGKAT PEMBELAJARAN KURIKULUM MERDEKA
                </p>
                <p className="text-xs text-slate-600 mt-1 italic">
                  Berdasarkan SK BSKAP Kemendikdasmen RI No. 046/H/KR/2025
                </p>

                <div className="mt-6 text-xs text-left max-w-sm mx-auto p-4 border border-slate-300 rounded-lg space-y-1 bg-slate-50">
                  <p className="font-bold">Isi Dokumen Buku Kerja 1:</p>
                  <p>1. Salinan SK BSKAP No. 046/H/KR/2025 tentang CP</p>
                  <p>2. Analisis Capaian Pembelajaran (CP) ke TP</p>
                  <p>3. Alur Tujuan Pembelajaran (ATP)</p>
                  <p>4. Modul Ajar Pembelajaran Mendalam (Deep Learning)</p>
                  <p>5. Kriteria Ketercapaian Tujuan Pembelajaran (KKTP)</p>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <p className="font-bold">GURU MATA PELAJARAN:</p>
                <p className="text-sm font-black underline uppercase">{guru.nama}, {guru.gelar}</p>
                <p className="font-mono">NIP. {guru.nip}</p>
                <p className="font-semibold text-slate-700 mt-2">Mata Pelajaran: {guru.mapelUtama}</p>
                <p className="text-slate-600 font-bold mt-4">TAHUN AJARAN {sekolah.tahunAjaran}</p>
              </div>
            </div>
          )}

          {/* ======================================================= */}
          {/* COVER BUKU KERJA GURU 2 */}
          {/* ======================================================= */}
          {selectedBerkas === 'cover-bk2' && (
            <div className="flex flex-col items-center justify-between min-h-[650px] border-4 border-double border-slate-800 p-8 text-center font-serif">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-widest font-bold">PEMERINTAH PROVINSI SULAWESI SELATAN</p>
                <h2 className="text-xl font-bold uppercase">{sekolah.namaSekolah}</h2>
              </div>

              <div className="my-8">
                <img src={sekolah.logoUrl} alt="Logo" className="w-28 h-28 object-contain mx-auto my-4" />
                <h1 className="text-2xl font-black uppercase tracking-wider text-slate-900 mt-4">
                  BUKU KERJA GURU 2
                </h1>
                <p className="text-sm font-semibold tracking-wide uppercase text-slate-700 mt-1">
                  PANDUAN ETIKA & PROGRAM TAHUNAN / SEMESTER
                </p>

                <div className="mt-6 text-xs text-left max-w-sm mx-auto p-4 border border-slate-300 rounded-lg space-y-1 bg-slate-50">
                  <p className="font-bold">Isi Dokumen Buku Kerja 2:</p>
                  <p>1. Kode Etik Guru Indonesia</p>
                  <p>2. Ikrar Guru Indonesia</p>
                  <p>3. Tata Tertib Guru</p>
                  <p>4. Alokasi Waktu Jam KBM</p>
                  <p>5. Program Tahunan (Prota)</p>
                  <p>6. Program Semester (Prosem)</p>
                  <p>7. Jurnal Agenda Guru</p>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <p className="font-bold">GURU MATA PELAJARAN:</p>
                <p className="text-sm font-black underline uppercase">{guru.nama}, {guru.gelar}</p>
                <p className="font-mono">NIP. {guru.nip}</p>
                <p className="text-slate-600 font-bold mt-4">TAHUN AJARAN {sekolah.tahunAjaran}</p>
              </div>
            </div>
          )}

          {/* ======================================================= */}
          {/* COVER BUKU KERJA GURU 3 */}
          {/* ======================================================= */}
          {selectedBerkas === 'cover-bk3' && (
            <div className="flex flex-col items-center justify-between min-h-[650px] border-4 border-double border-slate-800 p-8 text-center font-serif">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-widest font-bold">PEMERINTAH PROVINSI SULAWESI SELATAN</p>
                <h2 className="text-xl font-bold uppercase">{sekolah.namaSekolah}</h2>
              </div>

              <div className="my-8">
                <img src={sekolah.logoUrl} alt="Logo" className="w-28 h-28 object-contain mx-auto my-4" />
                <h1 className="text-2xl font-black uppercase tracking-wider text-slate-900 mt-4">
                  BUKU KERJA GURU 3
                </h1>
                <p className="text-sm font-semibold tracking-wide uppercase text-slate-700 mt-1">
                  EVALUASI, PRESENSI & LEGER ASESMEN
                </p>

                <div className="mt-6 text-xs text-left max-w-sm mx-auto p-4 border border-slate-300 rounded-lg space-y-1 bg-slate-50">
                  <p className="font-bold">Isi Dokumen Buku Kerja 3:</p>
                  <p>1. Daftar Hadir Siswa (Presensi)</p>
                  <p>2. Buku Nilai Formatif & Sumatif</p>
                  <p>3. Penilaian Akhir & Narasi Capaian Rapor</p>
                  <p>4. Kisi-Kisi & Kartu Soal Asesmen</p>
                  <p>5. Analisis Hasil Asesmen & Program Remedial</p>
                  <p>6. Jadwal Mengajar Guru</p>
                  <p>7. Daya Serap Kurikulum Siswa</p>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <p className="font-bold">GURU MATA PELAJARAN:</p>
                <p className="text-sm font-black underline uppercase">{guru.nama}, {guru.gelar}</p>
                <p className="font-mono">NIP. {guru.nip}</p>
                <p className="text-slate-600 font-bold mt-4">TAHUN AJARAN {sekolah.tahunAjaran}</p>
              </div>
            </div>
          )}

          {/* ======================================================= */}
          {/* COVER BUKU KERJA GURU 4 */}
          {/* ======================================================= */}
          {selectedBerkas === 'cover-bk4' && (
            <div className="flex flex-col items-center justify-between min-h-[650px] border-4 border-double border-slate-800 p-8 text-center font-serif">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-widest font-bold">PEMERINTAH PROVINSI SULAWESI SELATAN</p>
                <h2 className="text-xl font-bold uppercase">{sekolah.namaSekolah}</h2>
              </div>

              <div className="my-8">
                <img src={sekolah.logoUrl} alt="Logo" className="w-28 h-28 object-contain mx-auto my-4" />
                <h1 className="text-2xl font-black uppercase tracking-wider text-slate-900 mt-4">
                  BUKU KERJA GURU 4
                </h1>
                <p className="text-sm font-semibold tracking-wide uppercase text-slate-700 mt-1">
                  EVALUASI DIRI GURU & PENGEMBANGAN KEPROFESIAN BERKELANJUTAN (PKB)
                </p>

                <div className="mt-6 text-xs text-left max-w-sm mx-auto p-4 border border-slate-300 rounded-lg space-y-1 bg-slate-50">
                  <p className="font-bold">Isi Dokumen Buku Kerja 4:</p>
                  <p>1. Daftar Evaluasi Diri Guru untuk Rencana PKB</p>
                  <p>2. Program Tindak Lanjut Kerja Guru</p>
                  <p>3. Publikasi Ilmiah & Inovasi Pembelajaran Mendalam</p>
                  <p>4. Laporan Pengembangan Diri</p>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <p className="font-bold">GURU MATA PELAJARAN:</p>
                <p className="text-sm font-black underline uppercase">{guru.nama}, {guru.gelar}</p>
                <p className="font-mono">NIP. {guru.nip}</p>
                <p className="text-slate-600 font-bold mt-4">TAHUN AJARAN {sekolah.tahunAjaran}</p>
              </div>
            </div>
          )}

          {/* ======================================================= */}
          {/* REKAP PRESENSI SEMESTER */}
          {/* ======================================================= */}
          {selectedBerkas === 'rekap-presensi' && (
            <div>
              <PrintHeader title="REKAPITULASI PRESENSI KEHADIRAN SISWA SEMESTER" subtitle={`Tahun Ajaran ${sekolah.tahunAjaran}`} />
              <div className="overflow-x-auto my-4">
                <table className="w-full text-xs border border-collapse border-slate-800">
                  <thead>
                    <tr className="bg-slate-100 font-bold text-center">
                      <th className="border border-slate-800 p-2 w-10">No</th>
                      <th className="border border-slate-800 p-2">Nama Siswa</th>
                      <th className="border border-slate-800 p-2 w-16">Kelas</th>
                      <th className="border border-slate-800 p-2 w-16">Hadir</th>
                      <th className="border border-slate-800 p-2 w-16">Sakit</th>
                      <th className="border border-slate-800 p-2 w-16">Izin</th>
                      <th className="border border-slate-800 p-2 w-16">Alpa</th>
                      <th className="border border-slate-800 p-2 w-20">% Hadir</th>
                    </tr>
                  </thead>
                  <tbody>
                    {siswaList.map((s, idx) => (
                      <tr key={s.id} className="text-center">
                        <td className="border border-slate-800 p-1.5">{idx + 1}</td>
                        <td className="border border-slate-800 p-1.5 text-left font-bold">{s.nama}</td>
                        <td className="border border-slate-800 p-1.5">{s.kelas}</td>
                        <td className="border border-slate-800 p-1.5 font-bold text-emerald-700">18</td>
                        <td className="border border-slate-800 p-1.5 text-blue-700">1</td>
                        <td className="border border-slate-800 p-1.5 text-amber-700">0</td>
                        <td className="border border-slate-800 p-1.5 text-rose-700">0</td>
                        <td className="border border-slate-800 p-1.5 font-bold">95%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <PrintSignature />
            </div>
          )}

          {/* ======================================================= */}
          {/* LEGER NILAI */}
          {/* ======================================================= */}
          {selectedBerkas === 'leger-nilai' && (
            <div>
              <PrintHeader title="LEGER NILAI AKHIR & CAPAIAN KOMPETENSI RAPOR" subtitle={`Mata Pelajaran: ${guru.mapelUtama}`} />
              <div className="overflow-x-auto my-4">
                <table className="w-full text-xs border border-collapse border-slate-800">
                  <thead>
                    <tr className="bg-slate-100 font-bold text-center">
                      <th className="border border-slate-800 p-2 w-10">No</th>
                      <th className="border border-slate-800 p-2">Nama Siswa</th>
                      <th className="border border-slate-800 p-2 w-16">Kelas</th>
                      <th className="border border-slate-800 p-2 w-14">Formatif</th>
                      <th className="border border-slate-800 p-2 w-14">Mid</th>
                      <th className="border border-slate-800 p-2 w-14">Akhir</th>
                      <th className="border border-slate-800 p-2 w-14 font-black">NA</th>
                      <th className="border border-slate-800 p-2 w-12">Pred</th>
                      <th className="border border-slate-800 p-2">Deskripsi Rapor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {siswaList.map((s, idx) => {
                      const nr = nilaiList.find(n => n.siswaId === s.id);
                      return (
                        <tr key={s.id} className="text-center">
                          <td className="border border-slate-800 p-1.5">{idx + 1}</td>
                          <td className="border border-slate-800 p-1.5 text-left font-bold">{s.nama}</td>
                          <td className="border border-slate-800 p-1.5">{s.kelas}</td>
                          <td className="border border-slate-800 p-1.5">88</td>
                          <td className="border border-slate-800 p-1.5">85</td>
                          <td className="border border-slate-800 p-1.5">90</td>
                          <td className="border border-slate-800 p-1.5 font-bold text-emerald-800">{nr?.nilaiAkhir || 88}</td>
                          <td className="border border-slate-800 p-1.5 font-bold">{nr?.predikat || 'A'}</td>
                          <td className="border border-slate-800 p-1.5 text-left text-[11px]">{nr?.capaianTinggi || 'Menunjukkan penguasaan sangat baik dalam capaian pembelajaran.'}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <PrintSignature />
            </div>
          )}

          {/* ======================================================= */}
          {/* JURNAL AGENDA */}
          {/* ======================================================= */}
          {selectedBerkas === 'jurnal-kbm' && (
            <div>
              <PrintHeader title="BUKU JURNAL AGENDA MENGAJAR HARIAN GURU" subtitle={`Tahun Ajaran ${sekolah.tahunAjaran}`} />
              <div className="overflow-x-auto my-4">
                <table className="w-full text-xs border border-collapse border-slate-800">
                  <thead>
                    <tr className="bg-slate-100 font-bold text-center">
                      <th className="border border-slate-800 p-2 w-10">No</th>
                      <th className="border border-slate-800 p-2 w-24">Tanggal</th>
                      <th className="border border-slate-800 p-2 w-16">Kelas</th>
                      <th className="border border-slate-800 p-2">Materi / Tujuan Pembelajaran</th>
                      <th className="border border-slate-800 p-2">Aktivitas KBM</th>
                      <th className="border border-slate-800 p-2 w-24">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agendaList.map((a, idx) => (
                      <tr key={a.id}>
                        <td className="border border-slate-800 p-1.5 text-center">{idx + 1}</td>
                        <td className="border border-slate-800 p-1.5 text-center font-mono">{a.tanggal}</td>
                        <td className="border border-slate-800 p-1.5 text-center font-bold">{a.kelas}</td>
                        <td className="border border-slate-800 p-1.5 font-medium">{a.materiTp}</td>
                        <td className="border border-slate-800 p-1.5">{a.kegiatanKbm}</td>
                        <td className="border border-slate-800 p-1.5 text-center font-bold text-emerald-800">{a.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <PrintSignature />
            </div>
          )}

          {/* ======================================================= */}
          {/* BUKU BIMBINGAN */}
          {/* ======================================================= */}
          {selectedBerkas === 'buku-bimbingan' && (
            <div>
              <PrintHeader title="BUKU REKAM BIMBINGAN SISWA & KASUS KELAS" subtitle="Dokumen Bimbingan Karakter Peserta Didik" />
              <div className="overflow-x-auto my-4">
                <table className="w-full text-xs border border-collapse border-slate-800">
                  <thead>
                    <tr className="bg-slate-100 font-bold text-center">
                      <th className="border border-slate-800 p-2 w-10">No</th>
                      <th className="border border-slate-800 p-2 w-24">Tanggal</th>
                      <th className="border border-slate-800 p-2">Nama Siswa</th>
                      <th className="border border-slate-800 p-2 w-16">Kelas</th>
                      <th className="border border-slate-800 p-2 w-24">Kategori</th>
                      <th className="border border-slate-800 p-2">Uraian Kasus/Prestasi</th>
                      <th className="border border-slate-800 p-2">Tindak Lanjut & Solusi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bimbinganList.map((b, idx) => (
                      <tr key={b.id}>
                        <td className="border border-slate-800 p-1.5 text-center">{idx + 1}</td>
                        <td className="border border-slate-800 p-1.5 text-center font-mono">{b.tanggal}</td>
                        <td className="border border-slate-800 p-1.5 font-bold">{b.siswaNama}</td>
                        <td className="border border-slate-800 p-1.5 text-center">{b.kelas}</td>
                        <td className="border border-slate-800 p-1.5 text-center font-semibold">{b.kategori}</td>
                        <td className="border border-slate-800 p-1.5">{b.uraianMasalah}</td>
                        <td className="border border-slate-800 p-1.5">{b.hasilTindakLanjut || b.tindakLanjut}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <PrintSignature />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
