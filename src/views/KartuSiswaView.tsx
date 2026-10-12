import React, { useState } from 'react';
import { dbService, DEFAULT_LOGO_SVG } from '../services/dbService';
import { QRCodeSVG } from 'qrcode.react';
import { Siswa } from '../types';
import { QrCode, Printer, Filter, User } from 'lucide-react';

export const KartuSiswaView: React.FC = () => {
  const [siswaList] = useState<Siswa[]>(dbService.getSiswaList());
  const kelasList = dbService.getKelasList();
  const [selectedKelas, setSelectedKelas] = useState<string>('all');
  const sekolah = dbService.getSekolah();

  const filteredSiswa = siswaList.filter(s =>
    selectedKelas === 'all' ? true : s.kelas === selectedKelas
  );

  return (
    <div className="space-y-6">
      {/* Screen Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-600 text-white rounded-xl shadow-xs">
              <QrCode className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Cetak Kartu Pelajar Digital & QR Code
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Format cetak standar A4 (8 kartu presisi per lembar) dilengkapi QR Code profil terverifikasi & barcode identitas.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={selectedKelas}
              onChange={(e) => setSelectedKelas(e.target.value)}
              className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold"
            >
              <option value="all">Semua Kelas ({siswaList.length} Kartu)</option>
              {kelasList.map(k => (
                <option key={k} value={k}>Rombel {k}</option>
              ))}
            </select>
          </div>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/30 transition"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Kartu (A4)</span>
          </button>
        </div>
      </div>

      {/* Sheet Print Info */}
      <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex items-center justify-between print:hidden text-xs">
        <span className="font-semibold text-emerald-900 dark:text-emerald-200">
          Tip Pencetakan: Gunakan kertas Glossy Photo Paper atau Brief Card (BC) A4 dengan skala cetak 100% (Fit to Printable Area).
        </span>
        <span className="font-bold text-emerald-700 dark:text-emerald-300">
          {filteredSiswa.length} Kartu Siap Cetak
        </span>
      </div>

      {/* Cards Grid: 2 columns on A4 landscape/portrait, exactly 8 cards per A4 sheet */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:grid-cols-2 print:gap-3 print:m-0">
        {filteredSiswa.map((siswa) => {
          const qrPayload = JSON.stringify({
            nama: siswa.nama,
            nis: siswa.nis,
            nisn: siswa.nisn,
            kelas: siswa.kelas,
            sekolah: sekolah.namaSekolah
          });

          return (
            <div
              key={siswa.id}
              className="relative rounded-2xl overflow-hidden border-2 border-slate-300 dark:border-slate-700 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white shadow-lg p-4 flex flex-col justify-between print:shadow-none print:border-slate-800 print:page-break-inside-avoid aspect-[85/54]"
            >
              {/* Header Kartu */}
              <div className="flex items-center gap-2.5 border-b border-blue-500/40 pb-2">
                <img
                  src={sekolah.logoUrl || DEFAULT_LOGO_SVG}
                  alt="Logo"
                  className="w-10 h-10 object-contain p-1 bg-white rounded-lg shrink-0"
                />
                <div className="leading-tight flex-1">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-amber-300">
                    KARTU TANDA PELAJAR RESMI
                  </p>
                  <h3 className="text-xs font-black uppercase text-white truncate">
                    {sekolah.namaSekolah}
                  </h3>
                  <p className="text-[8px] text-blue-200 truncate">
                    {sekolah.alamat}
                  </p>
                </div>
              </div>

              {/* Body: Foto, Data, QR Code */}
              <div className="grid grid-cols-12 gap-3 items-center my-2">
                {/* Foto Profil */}
                <div className="col-span-3 flex flex-col items-center">
                  <div className="w-16 h-20 rounded-lg bg-blue-100 border-2 border-amber-400 overflow-hidden flex items-center justify-center shadow-xs">
                    <User className="w-10 h-10 text-slate-500" />
                  </div>
                  <span className="text-[8px] font-bold text-amber-300 mt-1 uppercase">
                    AKTIF 2025/2026
                  </span>
                </div>

                {/* Data Siswa */}
                <div className="col-span-6 space-y-1 text-[10px]">
                  <div>
                    <span className="text-[8px] uppercase text-blue-300 block">Nama Lengkap</span>
                    <span className="font-bold text-white text-xs block leading-tight truncate">
                      {siswa.nama}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-[9px]">
                    <div>
                      <span className="text-[8px] uppercase text-blue-300 block">NIS / NISN</span>
                      <span className="font-mono font-semibold text-amber-200">{siswa.nis}</span>
                      <span className="block font-mono text-[8px] text-blue-200">{siswa.nisn}</span>
                    </div>
                    <div>
                      <span className="text-[8px] uppercase text-blue-300 block">Kelas / JK</span>
                      <span className="font-bold text-white">Rombel {siswa.kelas}</span>
                      <span className="block text-[8px] text-blue-200">{siswa.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</span>
                    </div>
                  </div>
                </div>

                {/* QR Code Verifikasi */}
                <div className="col-span-3 flex flex-col items-center justify-center">
                  <div className="p-1.5 bg-white rounded-lg shadow-md">
                    <QRCodeSVG value={qrPayload} size={58} level="M" />
                  </div>
                  <span className="text-[7px] text-blue-200 mt-1 font-mono">
                    VERIFIED QR
                  </span>
                </div>
              </div>

              {/* Footer Kartu & Tanda Tangan KS */}
              <div className="flex items-center justify-between border-t border-blue-500/40 pt-1.5 text-[8px] text-blue-200">
                <div>
                  <p className="font-mono text-[7px] tracking-widest">
                    ID: {siswa.nisn}-LRP
                  </p>
                  <p className="text-[7px] text-slate-400">
                    Kartu sah milik peserta didik SMA
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[7px]">Kepala Sekolah,</p>
                  <p className="font-bold underline text-white text-[8px]">
                    {sekolah.kepalaSekolahNama}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
