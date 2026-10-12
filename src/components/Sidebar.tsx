import React from 'react';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  QrCode,
  GraduationCap,
  BookCheck,
  HeartHandshake,
  Download,
  Brain,
  MonitorPlay,
  FileCode2,
  Heart,
  Smile,
  HelpCircle,
  FileText,
  FileSpreadsheet,
  Presentation,
  Bot,
  Printer,
  Settings,
  X
} from 'lucide-react';

export type MenuId =
  | 'dashboard'
  | 'siswa'
  | 'mapel'
  | 'jadwal'
  | 'presensi'
  | 'kartu-siswa'
  | 'nilai'
  | 'agenda'
  | 'bimbingan'
  | 'perangkat-unduh'
  | 'ai-modul'
  | 'ai-media'
  | 'ai-perangkat'
  | 'ai-kbc'
  | 'ai-kokurikuler'
  | 'ai-soal'
  | 'ai-kartu-soal'
  | 'ai-lkpd'
  | 'ai-ppt'
  | 'ai-chat'
  | 'laporan'
  | 'pengaturan';

interface SidebarProps {
  activeMenu: MenuId;
  onSelectMenu: (menu: MenuId) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeMenu,
  onSelectMenu,
  isOpen,
  onClose,
}) => {
  const handleItemClick = (id: MenuId) => {
    onSelectMenu(id);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-72 lg:w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shadow-xl flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } print:hidden`}
      >
        {/* Sidebar Header Mobile */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 lg:hidden bg-slate-950 text-white">
          <span className="font-extrabold text-sm text-amber-400">
            NAVIGASI MENU
          </span>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Nav Items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {/* ======================================================== */}
          {/* GRUP 1: MENU UTAMA (Tema Biru Tajam) */}
          {/* ======================================================== */}
          <div className="space-y-2">
            <div className="bg-blue-700 text-white border-2 border-blue-400 shadow-md rounded-xl px-3 py-1.5 flex items-center justify-between">
              <span className="text-xs font-black tracking-wider uppercase">
                1. MENU UTAMA
              </span>
              <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-sm bg-blue-800 border border-blue-400 text-blue-100">
                BIRU TAJAM
              </span>
            </div>

            <div className="space-y-1.5 pt-1">
              <button
                onClick={() => handleItemClick('dashboard')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition duration-150 text-left ${
                  activeMenu === 'dashboard'
                    ? 'bg-blue-600 text-white border-2 border-blue-300 shadow-lg shadow-blue-600/30 ring-2 ring-blue-400 font-extrabold scale-[1.02]'
                    : 'bg-blue-50/90 dark:bg-blue-950/70 text-blue-950 dark:text-blue-100 border-2 border-blue-300 dark:border-blue-700 hover:bg-blue-600 hover:text-white font-bold'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 shrink-0" />
                <span className="truncate">Dashboard Utama</span>
              </button>
            </div>
          </div>

          {/* ======================================================== */}
          {/* GRUP 2: MENU AKADEMIK (Tema Emerald & Multi-Warna) */}
          {/* ======================================================== */}
          <div className="space-y-2">
            <div className="bg-emerald-800 text-white border-2 border-emerald-400 shadow-md rounded-xl px-3 py-1.5 flex items-center justify-between">
              <span className="text-xs font-black tracking-wider uppercase">
                2. MENU AKADEMIK
              </span>
              <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-sm bg-emerald-900 border border-emerald-400 text-emerald-100">
                MULTI WARNA
              </span>
            </div>

            <div className="space-y-1.5 pt-1">
              {/* Siswa - Cyan */}
              <button
                onClick={() => handleItemClick('siswa')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition duration-150 text-left ${
                  activeMenu === 'siswa'
                    ? 'bg-cyan-600 text-white border-2 border-cyan-300 shadow-lg shadow-cyan-600/30 ring-2 ring-cyan-400 font-extrabold scale-[1.02]'
                    : 'bg-cyan-50 dark:bg-cyan-950/70 text-cyan-950 dark:text-cyan-100 border-2 border-cyan-300 dark:border-cyan-700 hover:bg-cyan-600 hover:text-white font-bold'
                }`}
              >
                <Users className="w-4 h-4 shrink-0" />
                <span className="truncate">Kelola Peserta Didik</span>
              </button>

              {/* Mapel - Ungu */}
              <button
                onClick={() => handleItemClick('mapel')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition duration-150 text-left ${
                  activeMenu === 'mapel'
                    ? 'bg-purple-600 text-white border-2 border-purple-300 shadow-lg shadow-purple-600/30 ring-2 ring-purple-400 font-extrabold scale-[1.02]'
                    : 'bg-purple-50 dark:bg-purple-950/70 text-purple-950 dark:text-purple-100 border-2 border-purple-300 dark:border-purple-700 hover:bg-purple-600 hover:text-white font-bold'
                }`}
              >
                <BookOpen className="w-4 h-4 shrink-0" />
                <span className="truncate">Materi & Mata Pelajaran</span>
              </button>

              {/* Jadwal - Rose */}
              <button
                onClick={() => handleItemClick('jadwal')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition duration-150 text-left ${
                  activeMenu === 'jadwal'
                    ? 'bg-rose-600 text-white border-2 border-rose-300 shadow-lg shadow-rose-600/30 ring-2 ring-rose-400 font-extrabold scale-[1.02]'
                    : 'bg-rose-50 dark:bg-rose-950/70 text-rose-950 dark:text-rose-100 border-2 border-rose-300 dark:border-rose-700 hover:bg-rose-600 hover:text-white font-bold'
                }`}
              >
                <CalendarDays className="w-4 h-4 shrink-0" />
                <span className="truncate">Jadwal Pelajaran KBM</span>
              </button>

              {/* Presensi - Emerald */}
              <button
                onClick={() => handleItemClick('presensi')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition duration-150 text-left ${
                  activeMenu === 'presensi'
                    ? 'bg-emerald-600 text-white border-2 border-emerald-300 shadow-lg shadow-emerald-600/30 ring-2 ring-emerald-400 font-extrabold scale-[1.02]'
                    : 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-950 dark:text-emerald-100 border-2 border-emerald-300 dark:border-emerald-700 hover:bg-emerald-600 hover:text-white font-bold'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span className="truncate">Kehadiran Siswa (Presensi)</span>
              </button>

              {/* Kartu Siswa QR */}
              <button
                onClick={() => handleItemClick('kartu-siswa')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition duration-150 text-left ${
                  activeMenu === 'kartu-siswa'
                    ? 'bg-emerald-600 text-white border-2 border-emerald-300 shadow-lg shadow-emerald-600/30 ring-2 ring-emerald-400 font-extrabold scale-[1.02]'
                    : 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-950 dark:text-emerald-100 border-2 border-emerald-300 dark:border-emerald-700 hover:bg-emerald-600 hover:text-white font-bold'
                }`}
              >
                <QrCode className="w-4 h-4 shrink-0" />
                <span className="truncate">Cetak Kartu Siswa QR</span>
              </button>

              {/* Nilai */}
              <button
                onClick={() => handleItemClick('nilai')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition duration-150 text-left ${
                  activeMenu === 'nilai'
                    ? 'bg-emerald-600 text-white border-2 border-emerald-300 shadow-lg shadow-emerald-600/30 ring-2 ring-emerald-400 font-extrabold scale-[1.02]'
                    : 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-950 dark:text-emerald-100 border-2 border-emerald-300 dark:border-emerald-700 hover:bg-emerald-600 hover:text-white font-bold'
                }`}
              >
                <GraduationCap className="w-4 h-4 shrink-0" />
                <span className="truncate">Asesmen & Leger Nilai</span>
              </button>

              {/* Agenda Mengajar */}
              <button
                onClick={() => handleItemClick('agenda')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition duration-150 text-left ${
                  activeMenu === 'agenda'
                    ? 'bg-emerald-600 text-white border-2 border-emerald-300 shadow-lg shadow-emerald-600/30 ring-2 ring-emerald-400 font-extrabold scale-[1.02]'
                    : 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-950 dark:text-emerald-100 border-2 border-emerald-300 dark:border-emerald-700 hover:bg-emerald-600 hover:text-white font-bold'
                }`}
              >
                <BookCheck className="w-4 h-4 shrink-0" />
                <span className="truncate">Jurnal Agenda Mengajar</span>
              </button>

              {/* Bimbingan Wali / BK */}
              <button
                onClick={() => handleItemClick('bimbingan')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition duration-150 text-left ${
                  activeMenu === 'bimbingan'
                    ? 'bg-emerald-600 text-white border-2 border-emerald-300 shadow-lg shadow-emerald-600/30 ring-2 ring-emerald-400 font-extrabold scale-[1.02]'
                    : 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-950 dark:text-emerald-100 border-2 border-emerald-300 dark:border-emerald-700 hover:bg-emerald-600 hover:text-white font-bold'
                }`}
              >
                <HeartHandshake className="w-4 h-4 shrink-0" />
                <span className="truncate">Bimbingan Wali / BK</span>
              </button>

              {/* Unduh Perangkat Ajar */}
              <button
                onClick={() => handleItemClick('perangkat-unduh')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition duration-150 text-left ${
                  activeMenu === 'perangkat-unduh'
                    ? 'bg-emerald-600 text-white border-2 border-emerald-300 shadow-lg shadow-emerald-600/30 ring-2 ring-emerald-400 font-extrabold scale-[1.02]'
                    : 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-950 dark:text-emerald-100 border-2 border-emerald-300 dark:border-emerald-700 hover:bg-emerald-600 hover:text-white font-bold'
                }`}
              >
                <Download className="w-4 h-4 shrink-0" />
                <span className="truncate">Unduh Perangkat Ajar</span>
              </button>
            </div>
          </div>

          {/* ======================================================== */}
          {/* GRUP 3: MENU SUITE AI (Tema Oranye Tajam) */}
          {/* ======================================================== */}
          <div className="space-y-2">
            <div className="bg-orange-600 text-white border-2 border-orange-400 shadow-md rounded-xl px-3 py-1.5 flex items-center justify-between">
              <span className="text-xs font-black tracking-wider uppercase">
                3. MENU SUITE AI
              </span>
              <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-sm bg-orange-700 border border-orange-300 text-orange-100">
                ORANGE TAJAM
              </span>
            </div>

            <div className="space-y-1.5 pt-1">
              {/* Rencana Pembelajaran Mendalam */}
              <button
                onClick={() => handleItemClick('ai-modul')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition duration-150 text-left ${
                  activeMenu === 'ai-modul'
                    ? 'bg-orange-500 text-white border-2 border-orange-300 shadow-lg shadow-orange-500/30 ring-2 ring-orange-300 font-extrabold scale-[1.02]'
                    : 'bg-orange-50/90 dark:bg-orange-950/70 text-orange-950 dark:text-orange-100 border-2 border-orange-300 dark:border-orange-700 hover:bg-orange-500 hover:text-white font-bold'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Brain className="w-4 h-4 shrink-0" />
                  <span className="truncate">Rencana Pembelajaran</span>
                </div>
                <span className="text-[9px] font-black uppercase px-1.5 py-0.2 bg-red-600 text-white rounded-xs">
                  HOT
                </span>
              </button>

              {/* Media Pembelajaran */}
              <button
                onClick={() => handleItemClick('ai-media')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition duration-150 text-left ${
                  activeMenu === 'ai-media'
                    ? 'bg-orange-500 text-white border-2 border-orange-300 shadow-lg shadow-orange-500/30 ring-2 ring-orange-300 font-extrabold scale-[1.02]'
                    : 'bg-orange-50/90 dark:bg-orange-950/70 text-orange-950 dark:text-orange-100 border-2 border-orange-300 dark:border-orange-700 hover:bg-orange-500 hover:text-white font-bold'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <MonitorPlay className="w-4 h-4 shrink-0" />
                  <span className="truncate">Media Pembelajaran</span>
                </div>
                <span className="text-[9px] font-black uppercase px-1.5 py-0.2 bg-emerald-600 text-white rounded-xs">
                  BARU
                </span>
              </button>

              {/* CP, TP, ATP, Prota, KKTP */}
              <button
                onClick={() => handleItemClick('ai-perangkat')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition duration-150 text-left ${
                  activeMenu === 'ai-perangkat'
                    ? 'bg-orange-500 text-white border-2 border-orange-300 shadow-lg shadow-orange-500/30 ring-2 ring-orange-300 font-extrabold scale-[1.02]'
                    : 'bg-orange-50/90 dark:bg-orange-950/70 text-orange-950 dark:text-orange-100 border-2 border-orange-300 dark:border-orange-700 hover:bg-orange-500 hover:text-white font-bold'
                }`}
              >
                <FileCode2 className="w-4 h-4 shrink-0" />
                <span className="truncate">CP, TP, ATP, Prota, KKTP</span>
              </button>

              {/* Perangkat Berbasis Cinta */}
              <button
                onClick={() => handleItemClick('ai-kbc')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition duration-150 text-left ${
                  activeMenu === 'ai-kbc'
                    ? 'bg-orange-500 text-white border-2 border-orange-300 shadow-lg shadow-orange-500/30 ring-2 ring-orange-300 font-extrabold scale-[1.02]'
                    : 'bg-orange-50/90 dark:bg-orange-950/70 text-orange-950 dark:text-orange-100 border-2 border-orange-300 dark:border-orange-700 hover:bg-orange-500 hover:text-white font-bold'
                }`}
              >
                <Heart className="w-4 h-4 shrink-0" />
                <span className="truncate">Perangkat Berbasis Kasih</span>
              </button>

              {/* Kokurikuler 7 Kebiasaan */}
              <button
                onClick={() => handleItemClick('ai-kokurikuler')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition duration-150 text-left ${
                  activeMenu === 'ai-kokurikuler'
                    ? 'bg-orange-500 text-white border-2 border-orange-300 shadow-lg shadow-orange-500/30 ring-2 ring-orange-300 font-extrabold scale-[1.02]'
                    : 'bg-orange-50/90 dark:bg-orange-950/70 text-orange-950 dark:text-orange-100 border-2 border-orange-300 dark:border-orange-700 hover:bg-orange-500 hover:text-white font-bold'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Smile className="w-4 h-4 shrink-0" />
                  <span className="truncate">Kokurikuler 7 Kebiasaan</span>
                </div>
                <span className="text-[9px] font-black uppercase px-1.5 py-0.2 bg-amber-500 text-slate-950 rounded-xs">
                  7 HEBAT
                </span>
              </button>

              {/* Paket Soal Ujian & LJS */}
              <button
                onClick={() => handleItemClick('ai-soal')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition duration-150 text-left ${
                  activeMenu === 'ai-soal'
                    ? 'bg-orange-500 text-white border-2 border-orange-300 shadow-lg shadow-orange-500/30 ring-2 ring-orange-300 font-extrabold scale-[1.02]'
                    : 'bg-orange-50/90 dark:bg-orange-950/70 text-orange-950 dark:text-orange-100 border-2 border-orange-300 dark:border-orange-700 hover:bg-orange-500 hover:text-white font-bold'
                }`}
              >
                <HelpCircle className="w-4 h-4 shrink-0" />
                <span className="truncate">Paket Soal Ujian & LJS</span>
              </button>

              {/* Kartu Soal & Kisi-Kisi */}
              <button
                onClick={() => handleItemClick('ai-kartu-soal')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition duration-150 text-left ${
                  activeMenu === 'ai-kartu-soal'
                    ? 'bg-orange-500 text-white border-2 border-orange-300 shadow-lg shadow-orange-500/30 ring-2 ring-orange-300 font-extrabold scale-[1.02]'
                    : 'bg-orange-50/90 dark:bg-orange-950/70 text-orange-950 dark:text-orange-100 border-2 border-orange-300 dark:border-orange-700 hover:bg-orange-500 hover:text-white font-bold'
                }`}
              >
                <FileSpreadsheet className="w-4 h-4 shrink-0" />
                <span className="truncate">Kartu Soal & Kisi-Kisi</span>
              </button>

              {/* Generator LKPD AI */}
              <button
                onClick={() => handleItemClick('ai-lkpd')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition duration-150 text-left ${
                  activeMenu === 'ai-lkpd'
                    ? 'bg-orange-500 text-white border-2 border-orange-300 shadow-lg shadow-orange-500/30 ring-2 ring-orange-300 font-extrabold scale-[1.02]'
                    : 'bg-orange-50/90 dark:bg-orange-950/70 text-orange-950 dark:text-orange-100 border-2 border-orange-300 dark:border-orange-700 hover:bg-orange-500 hover:text-white font-bold'
                }`}
              >
                <FileText className="w-4 h-4 shrink-0" />
                <span className="truncate">Generator LKPD AI</span>
              </button>

              {/* Generator Presentasi PPT */}
              <button
                onClick={() => handleItemClick('ai-ppt')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition duration-150 text-left ${
                  activeMenu === 'ai-ppt'
                    ? 'bg-orange-500 text-white border-2 border-orange-300 shadow-lg shadow-orange-500/30 ring-2 ring-orange-300 font-extrabold scale-[1.02]'
                    : 'bg-orange-50/90 dark:bg-orange-950/70 text-orange-950 dark:text-orange-100 border-2 border-orange-300 dark:border-orange-700 hover:bg-orange-500 hover:text-white font-bold'
                }`}
              >
                <Presentation className="w-4 h-4 shrink-0" />
                <span className="truncate">Generator Presentasi PPT</span>
              </button>

              {/* Asisten Chat Konsultan AI */}
              <button
                onClick={() => handleItemClick('ai-chat')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition duration-150 text-left ${
                  activeMenu === 'ai-chat'
                    ? 'bg-orange-500 text-white border-2 border-orange-300 shadow-lg shadow-orange-500/30 ring-2 ring-orange-300 font-extrabold scale-[1.02]'
                    : 'bg-orange-50/90 dark:bg-orange-950/70 text-orange-950 dark:text-orange-100 border-2 border-orange-300 dark:border-orange-700 hover:bg-orange-500 hover:text-white font-bold'
                }`}
              >
                <Bot className="w-4 h-4 shrink-0" />
                <span className="truncate">Konsultan Chat AI 24/7</span>
              </button>
            </div>
          </div>

          {/* ======================================================== */}
          {/* GRUP 4: MENU LAPORAN & PENGATURAN (Tema Kuning/Amber Tajam) */}
          {/* ======================================================== */}
          <div className="space-y-2">
            <div className="bg-amber-500 text-slate-950 border-2 border-yellow-300 shadow-md rounded-xl px-3 py-1.5 flex items-center justify-between font-black">
              <span className="text-xs tracking-wider uppercase">
                4. LAPORAN & ATURAN
              </span>
              <span className="text-[10px] uppercase px-1.5 py-0.5 rounded-sm bg-amber-600 border border-yellow-300 text-white font-black">
                KUNING TAJAM
              </span>
            </div>

            <div className="space-y-1.5 pt-1">
              {/* Pusat Laporan & Cetak */}
              <button
                onClick={() => handleItemClick('laporan')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition duration-150 text-left ${
                  activeMenu === 'laporan'
                    ? 'bg-amber-400 text-slate-950 border-2 border-amber-600 shadow-lg shadow-amber-500/30 ring-2 ring-amber-300 font-black scale-[1.02]'
                    : 'bg-amber-50/90 dark:bg-amber-950/70 text-amber-950 dark:text-amber-100 border-2 border-amber-300 dark:border-amber-700 hover:bg-amber-400 hover:text-slate-950 font-bold'
                }`}
              >
                <Printer className="w-4 h-4 shrink-0" />
                <span className="truncate">Pusat Laporan & Cetak</span>
              </button>

              {/* Pengaturan & Database */}
              <button
                onClick={() => handleItemClick('pengaturan')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition duration-150 text-left ${
                  activeMenu === 'pengaturan'
                    ? 'bg-amber-400 text-slate-950 border-2 border-amber-600 shadow-lg shadow-amber-500/30 ring-2 ring-amber-300 font-black scale-[1.02]'
                    : 'bg-amber-50/90 dark:bg-amber-950/70 text-amber-950 dark:text-amber-100 border-2 border-amber-300 dark:border-amber-700 hover:bg-amber-400 hover:text-slate-950 font-bold'
                }`}
              >
                <Settings className="w-4 h-4 shrink-0" />
                <span className="truncate">Pengaturan & Database</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Footer Info */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-[11px] text-slate-500 text-center">
          <p className="font-semibold text-slate-700 dark:text-slate-300">
            Lin Rante Palungan
          </p>
          <p className="text-[10px]">Kurikulum Merdeka 2025/2026</p>
        </div>
      </aside>
    </>
  );
};
