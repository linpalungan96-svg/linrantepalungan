import React from 'react';
import { dbService } from '../services/dbService';
import { MenuId } from '../components/Sidebar';
import {
  Users,
  BookOpen,
  Calendar,
  CheckCircle,
  Sparkles,
  QrCode,
  Award,
  ArrowRight,
  Clock,
  FileCheck,
  AlertCircle
} from 'lucide-react';

interface DashboardViewProps {
  onNavigate: (menu: MenuId) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  const guru = dbService.getGuru();
  const sekolah = dbService.getSekolah();
  const siswaList = dbService.getSiswaList();
  const mapelList = dbService.getMapelList();
  const jadwalList = dbService.getJadwalList();
  const presensiList = dbService.getPresensiList();
  const agendaList = dbService.getAgendaList();

  // Metrics
  const totalSiswa = siswaList.length;
  const siswaL = siswaList.filter(s => s.jenisKelamin === 'L').length;
  const siswaP = siswaList.filter(s => s.jenisKelamin === 'P').length;
  const totalMapel = mapelList.length;

  // Calculate attendance rate
  let totalHadir = 0;
  let totalPresensiItems = 0;
  presensiList.forEach(p => {
    p.items.forEach(item => {
      totalPresensiItems++;
      if (item.status === 'H') totalHadir++;
    });
  });
  const persentaseHadir = totalPresensiItems > 0
    ? Math.round((totalHadir / totalPresensiItems) * 100)
    : 96;

  // Current Day
  const todayName = new Date().toLocaleDateString('id-ID', { weekday: 'long' });
  const jadwalHariIni = jadwalList.filter(j => j.hari.toLowerCase() === todayName.toLowerCase());

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-blue-700/50">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Kurikulum Merdeka · SK BSKAP No. 046/H/KR/2025</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-amber-300 tracking-tight leading-tight">
            Selamat Datang, {guru.nama}, {guru.gelar}!
          </h2>

          <p className="text-sm text-blue-100 leading-relaxed">
            Sistem Informasi Manajemen Administrasi Guru Terpadu & Suite AI Pembelajaran Mendalam (Deep Learning Framework: Mindful, Meaningful, Joyful Learning). Seluruh administrasi kelas dan mapel siap dikelola dalam satu platform terintegrasi.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-blue-200">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Tahun Ajaran {sekolah.tahunAjaran} ({sekolah.semesterAktif})
            </span>
            <span className="text-blue-400">·</span>
            <span>{sekolah.namaSekolah}</span>
            <span className="text-blue-400">·</span>
            <span>NIP. {guru.nip}</span>
          </div>
        </div>

        {/* Decorative background circles */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-blue-600/10 blur-2xl pointer-events-none" />
        <div className="absolute right-20 -top-10 w-48 h-48 rounded-full bg-amber-500/10 blur-xl pointer-events-none" />
      </div>

      {/* Quick Action Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => onNavigate('presensi')}
          className="flex items-center gap-3 p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800/60 shadow-sm hover:shadow-md hover:border-emerald-400 transition text-left group"
        >
          <div className="p-2.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-100">Presensi Cepat</p>
            <p className="text-[11px] text-slate-500">Absensi KBM Hari Ini</p>
          </div>
        </button>

        <button
          onClick={() => onNavigate('nilai')}
          className="flex items-center gap-3 p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800/60 shadow-sm hover:shadow-md hover:border-blue-400 transition text-left group"
        >
          <div className="p-2.5 rounded-lg bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-100">Input Nilai</p>
            <p className="text-[11px] text-slate-500">Formatif & Sumatif</p>
          </div>
        </button>

        <button
          onClick={() => onNavigate('ai-modul')}
          className="flex items-center gap-3 p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-orange-200 dark:border-orange-800/60 shadow-sm hover:shadow-md hover:border-orange-400 transition text-left group"
        >
          <div className="p-2.5 rounded-lg bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-100">Modul Ajar AI</p>
            <p className="text-[11px] text-slate-500">Deep Learning 1-Klik</p>
          </div>
        </button>

        <button
          onClick={() => onNavigate('kartu-siswa')}
          className="flex items-center gap-3 p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-cyan-200 dark:border-cyan-800/60 shadow-sm hover:shadow-md hover:border-cyan-400 transition text-left group"
        >
          <div className="p-2.5 rounded-lg bg-cyan-100 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 group-hover:scale-105 transition-transform">
            <QrCode className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-100">Cetak Kartu QR</p>
            <p className="text-[11px] text-slate-500">Format A4 Pelajar</p>
          </div>
        </button>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Siswa */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Peserta Didik
            </span>
            <div className="p-2 bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 rounded-xl">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">
              {totalSiswa}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              <span className="font-semibold text-cyan-600">{siswaL} Laki-laki</span> · <span className="font-semibold text-rose-500">{siswaP} Perempuan</span>
            </p>
          </div>
          <button
            onClick={() => onNavigate('siswa')}
            className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 flex items-center gap-1 hover:underline pt-1"
          >
            Kelola data siswa <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Total Mapel */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Mata Pelajaran
            </span>
            <div className="p-2 bg-purple-100 dark:bg-purple-950/60 text-purple-600 rounded-xl">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">
              {totalMapel} Mapel
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Fase E & Fase F (11 JP/Minggu)
            </p>
          </div>
          <button
            onClick={() => onNavigate('mapel')}
            className="text-xs font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-1 hover:underline pt-1"
          >
            Lihat lingkup materi <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Kehadiran Rata-rata */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Rata-rata Presensi
            </span>
            <div className="p-2 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 rounded-xl">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
              {persentaseHadir}%
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Kedisiplinan sangat baik
            </p>
          </div>
          <button
            onClick={() => onNavigate('presensi')}
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 hover:underline pt-1"
          >
            Buka rekap presensi <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Kelengkapan Administrasi */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Perangkat Ajar
            </span>
            <div className="p-2 bg-amber-100 dark:bg-amber-950/60 text-amber-600 rounded-xl">
              <FileCheck className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-amber-500">
              100%
            </div>
            <p className="text-xs text-slate-500 mt-1">
              CP, TP, ATP, Modul, KKTP Lengkap
            </p>
          </div>
          <button
            onClick={() => onNavigate('laporan')}
            className="text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1 hover:underline pt-1"
          >
            Pusat cetak buku kerja <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Grid: Jadwal Hari Ini & Aktivitas Terakhir */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Jadwal Mengajar Hari Ini */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-rose-100 dark:bg-rose-950/60 text-rose-600 rounded-xl">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Jadwal KBM Hari Ini ({todayName})
                </h3>
                <p className="text-xs text-slate-500">
                  Agenda sesi tatap muka dan kelas aktif
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('jadwal')}
              className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline"
            >
              Semua Jadwal Mingguan
            </button>
          </div>

          {jadwalHariIni.length > 0 ? (
            <div className="space-y-3">
              {jadwalHariIni.map((j) => (
                <div
                  key={j.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:border-blue-400 transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-center px-3 py-1.5 bg-blue-100 dark:bg-blue-950/80 rounded-lg text-blue-800 dark:text-blue-300">
                      <Clock className="w-4 h-4 mx-auto mb-0.5 text-blue-600" />
                      <span className="text-[11px] font-bold font-mono">
                        {j.jamMulai} - {j.jamSelesai}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {j.mapelNama}
                      </p>
                      <p className="text-xs text-slate-500">
                        Kelas <span className="font-semibold text-blue-600">{j.kelas}</span> · Jam Ke: {j.jamKe} · {j.ruang}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onNavigate('presensi')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs"
                    >
                      Buka Presensi
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
              <Calendar className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Tidak ada jadwal KBM terjadwal untuk hari {todayName}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Waktu dapat dimanfaatkan untuk menyusun modul ajar, bimbingan siswa, atau administrasi nilai.
              </p>
              <button
                onClick={() => onNavigate('jadwal')}
                className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs"
              >
                Lihat Jadwal Lengkap
              </button>
            </div>
          )}
        </div>

        {/* Pengingat Tugas & Agenda Terakhir */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md p-6 space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="p-2 bg-amber-100 dark:bg-amber-950/60 text-amber-600 rounded-xl">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Agenda Mengajar Terakhir
              </h3>
              <p className="text-xs text-slate-500">
                Catatan jurnal harian guru
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {agendaList.slice(0, 3).map((a) => (
              <div
                key={a.id}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    Kelas {a.kelas}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {a.tanggal}
                  </span>
                </div>
                <p className="font-medium text-slate-800 dark:text-slate-200 line-clamp-1">
                  {a.materiTp}
                </p>
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>Jam Ke: {a.jamKe}</span>
                  <span className="px-2 py-0.5 rounded-sm bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                    {a.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigate('agenda')}
            className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 transition"
          >
            Buka Buku Jurnal Agenda
          </button>
        </div>
      </div>
    </div>
  );
};
