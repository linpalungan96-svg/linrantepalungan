import React from 'react';
import { dbService } from '../services/dbService';

interface PrintHeaderProps {
  title: string;
  subtitle?: string;
  tahunAjaran?: string;
  nomorDokumen?: string;
}

export const PrintHeader: React.FC<PrintHeaderProps> = ({
  title,
  subtitle,
  nomorDokumen,
}) => {
  const sekolah = dbService.getSekolah();

  return (
    <div className="print:block mb-6 text-slate-900 border-b-4 border-double border-slate-900 pb-3">
      <div className="flex items-center gap-4">
        {sekolah.logoUrl ? (
          <img
            src={sekolah.logoUrl}
            alt="Logo Sekolah"
            className="w-20 h-20 object-contain shrink-0"
          />
        ) : (
          <div className="w-20 h-20 bg-slate-200 rounded flex items-center justify-center font-bold text-xs shrink-0">
            LOGO
          </div>
        )}

        <div className="flex-1 text-center font-serif">
          <p className="text-xs uppercase tracking-widest font-semibold text-slate-700">
            Pemerintah Provinsi {sekolah.provinsi || 'Sulawesi Selatan'}
          </p>
          <p className="text-xs uppercase tracking-widest font-semibold text-slate-700">
            Dinas Pendidikan Wilayah X
          </p>
          <h1 className="text-xl font-bold uppercase tracking-wide text-slate-900 mt-0.5">
            {sekolah.namaSekolah}
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            {sekolah.alamat} · Telp: {sekolah.telepon} · Pos: {sekolah.kodePos}
          </p>
          <p className="text-[11px] text-slate-500">
            NPSN: {sekolah.npsn} | NSS: {sekolah.nss} | Email: {sekolah.email} | Web: {sekolah.website}
          </p>
        </div>
      </div>

      <div className="mt-4 text-center">
        <h2 className="text-base font-bold uppercase tracking-wider underline decoration-1 underline-offset-4">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs font-medium text-slate-700 mt-1">{subtitle}</p>
        )}
        {nomorDokumen && (
          <p className="text-xs text-slate-600 mt-0.5">Nomor: {nomorDokumen}</p>
        )}
        <p className="text-[10px] text-slate-500 italic mt-1">
          Landasan Regulasi: SK BSKAP Kemendikdasmen RI No. 046/H/KR/2025 tentang Capaian Pembelajaran
        </p>
      </div>
    </div>
  );
};

export const PrintSignature: React.FC<{ tanggal?: string }> = ({ tanggal }) => {
  const guru = dbService.getGuru();
  const sekolah = dbService.getSekolah();
  const currentDate = tanggal || new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="mt-10 pt-4 text-xs font-serif text-slate-900 page-break-inside-avoid">
      <div className="grid grid-cols-2 gap-8 text-center">
        <div>
          <p className="mb-1">Mengetahui,</p>
          <p className="font-semibold">Kepala {sekolah.namaSekolah}</p>
          <div className="h-20 flex items-center justify-center">
            {/* Signature space */}
          </div>
          <p className="font-bold underline uppercase">{sekolah.kepalaSekolahNama}</p>
          <p className="text-[11px] text-slate-700">NIP. {sekolah.kepalaSekolahNip}</p>
        </div>

        <div>
          <p className="mb-1">{sekolah.kabupatenKota || 'Makale'}, {currentDate}</p>
          <p className="font-semibold">Guru Mata Pelajaran,</p>
          <div className="h-20 flex items-center justify-center">
            {/* Signature space */}
          </div>
          <p className="font-bold underline uppercase">{guru.nama}, {guru.gelar}</p>
          <p className="text-[11px] text-slate-700">NIP. {guru.nip}</p>
        </div>
      </div>
    </div>
  );
};
