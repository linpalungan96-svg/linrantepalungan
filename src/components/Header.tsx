import React, { useState } from 'react';
import { dbService, DEFAULT_LOGO_SVG } from '../services/dbService';
import { LogoUploadModal } from './LogoUploadModal';
import { Camera, Sun, Moon, LogOut, Menu, User, BookOpen } from 'lucide-react';
import Swal from 'sweetalert2';

interface HeaderProps {
  onToggleSidebar?: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  darkMode,
  onToggleDarkMode,
}) => {
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const guru = dbService.getGuru();
  const sekolah = dbService.getSekolah();

  const handleLogout = () => {
    Swal.fire({
      title: 'Keluar dari Sesi?',
      text: 'Semua perubahan data lokal Anda telah tersimpan secara aman di peramban ini.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Ya, Akhiri Sesi',
      cancelButtonText: 'Batal',
      background: darkMode ? '#0f172a' : '#ffffff',
      color: darkMode ? '#f8fafc' : '#0f172a',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Sesi Selesai',
          text: `Terima kasih atas dedikasi Anda mendidik generasi bangsa, ${guru.nama}!`,
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
          background: darkMode ? '#0f172a' : '#ffffff',
          color: darkMode ? '#f8fafc' : '#0f172a',
        });
      }
    });
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full select-none shadow-xl print:hidden">
        {/* Top Rainbow Ribbon */}
        <div className="h-2 w-full bg-gradient-to-r from-blue-600 via-emerald-500 via-orange-500 to-amber-400" />

        {/* Main Navbar */}
        <div className="bg-gradient-to-r from-[#071328] via-[#0d2240] to-[#0a182e] border-b-2 border-blue-800 px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Mobile Toggle & Brand + School Logo */}
            <div className="flex items-center gap-3 sm:gap-4">
              {onToggleSidebar && (
                <button
                  onClick={onToggleSidebar}
                  className="lg:hidden p-2 rounded-xl text-blue-200 hover:text-white hover:bg-blue-900/50 transition focus:outline-hidden"
                  aria-label="Toggle Sidebar"
                >
                  <Menu className="w-6 h-6" />
                </button>
              )}

              {/* School Logo Frame with Camera Badge */}
              <div
                onClick={() => setIsLogoModalOpen(true)}
                title="Klik untuk mengganti Logo Resmi Sekolah"
                className="relative group cursor-pointer w-12 h-12 rounded-2xl bg-white p-1 border-2 border-amber-400 shadow-md shadow-amber-500/20 hover:scale-105 transition-transform flex items-center justify-center shrink-0"
              >
                <img
                  src={sekolah.logoUrl || DEFAULT_LOGO_SVG}
                  alt="Logo Sekolah"
                  className="w-full h-full object-contain"
                />
                <div className="absolute -bottom-1 -right-1 bg-amber-500 text-slate-950 p-1 rounded-full shadow-md group-hover:bg-amber-400 transition">
                  <Camera className="w-3 h-3" />
                </div>
              </div>

              {/* Brand Titles */}
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-blue-200">
                    DASHBOARD ADMINISTRASI
                  </span>
                  <span className="hidden md:inline-block text-[10px] font-semibold px-2 py-0.5 rounded-sm bg-blue-900/80 text-blue-300 border border-blue-700/60">
                    BSKAP 046/H/KR/2025
                  </span>
                </div>
                <h1 className="text-base sm:text-xl font-black tracking-wide text-amber-300 drop-shadow-xs leading-tight">
                  LIN RANTE PALUNGAN
                </h1>
                <p className="text-[11px] text-slate-300 hidden sm:block truncate max-w-md">
                  <span className="font-semibold text-white">{sekolah.namaSekolah}</span> · {guru.nama}, {guru.gelar}
                </p>
              </div>
            </div>

            {/* Right: Quick Color Tags, Dark Mode, Profile Ring, Logout */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Quick Color Category Indicators */}
              <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 bg-blue-950/60 border border-blue-800/80 rounded-xl">
                <span className="flex items-center gap-1 text-[11px] font-bold text-blue-400">
                  <span className="w-2 h-2 rounded-full bg-blue-500" /> Utama
                </span>
                <span className="text-blue-700">·</span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Akademik
                </span>
                <span className="text-blue-700">·</span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-orange-400">
                  <span className="w-2 h-2 rounded-full bg-orange-500" /> AI Suite
                </span>
                <span className="text-blue-700">·</span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-amber-400">
                  <span className="w-2 h-2 rounded-full bg-amber-400" /> Laporan
                </span>
              </div>

              {/* Dark Mode Switch */}
              <button
                onClick={onToggleDarkMode}
                title={darkMode ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
                className="p-2 sm:px-2.5 sm:py-2 rounded-xl bg-blue-950/80 hover:bg-blue-900 border border-blue-700/70 text-amber-300 hover:text-amber-200 transition shadow-inner flex items-center gap-1.5 text-xs font-semibold"
              >
                {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-300" />}
                <span className="hidden md:inline">{darkMode ? 'Terang' : 'Gelap'}</span>
              </button>

              {/* Teacher Profile with Golden Ring */}
              <div className="flex items-center gap-2.5 pl-1 sm:pl-2">
                <div className="relative">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-600 p-[2px] shadow-lg shadow-amber-500/20">
                    <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-amber-300 font-black text-sm">
                      <User className="w-5 h-5 text-amber-300" />
                    </div>
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-950 rounded-full" />
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-xs font-bold text-white leading-none">
                    {guru.nama}
                  </p>
                  <p className="text-[10px] text-amber-300/90 font-mono mt-0.5">
                    NIP. {guru.nip}
                  </p>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                title="Keluar dari sesi"
                className="p-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-800/60 text-red-300 hover:text-white transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* School Logo Modal */}
      <LogoUploadModal
        isOpen={isLogoModalOpen}
        onClose={() => setIsLogoModalOpen(false)}
      />
    </>
  );
};
