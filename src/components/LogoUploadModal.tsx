import React, { useState } from 'react';
import { dbService, DEFAULT_LOGO_SVG } from '../services/dbService';
import { Upload, Check, RefreshCw, X, Image as ImageIcon } from 'lucide-react';

interface LogoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogoUploadModal: React.FC<LogoUploadModalProps> = ({ isOpen, onClose }) => {
  const sekolah = dbService.getSekolah();
  const [preview, setPreview] = useState<string>(sekolah.logoUrl || DEFAULT_LOGO_SVG);
  const [successMsg, setSuccessMsg] = useState(false);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Ukuran file maksimal 2 MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const currentSekolah = dbService.getSekolah();
    dbService.saveSekolah({
      ...currentSekolah,
      logoUrl: preview
    });
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      onClose();
    }, 700);
  };

  const handleResetDefault = () => {
    setPreview(DEFAULT_LOGO_SVG);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl relative text-slate-900 dark:text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 bg-amber-100 dark:bg-amber-950/60 text-amber-600 rounded-xl">
            <ImageIcon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Unggah Logo Resmi Sekolah</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Logo akan otomatis muncul di seluruh kop surat resmi & kartu siswa QR
            </p>
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 mb-5">
          <div className="w-28 h-28 rounded-2xl bg-white p-2 shadow-md border-2 border-amber-400 flex items-center justify-center overflow-hidden mb-3">
            <img
              src={preview}
              alt="Preview Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
            Pratinjau Logo Aktif
          </span>
        </div>

        {/* Input File */}
        <div className="space-y-3 mb-6">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Pilih File Gambar (PNG, JPG, SVG, WebP)
          </label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="block w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-950 dark:file:text-blue-300 cursor-pointer border border-slate-200 dark:border-slate-700 rounded-xl p-1"
            />
          </div>
          <div className="flex justify-between items-center text-[11px] text-slate-500">
            <span>Maksimal 2 MB</span>
            <button
              type="button"
              onClick={handleResetDefault}
              className="text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 font-medium"
            >
              <RefreshCw className="w-3 h-3" /> Kembalikan Default
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSave}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-white transition flex items-center justify-center gap-2 shadow-md ${
              successMsg
                ? 'bg-emerald-600 ring-2 ring-emerald-400'
                : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/30'
            }`}
          >
            {successMsg ? (
              <>
                <Check className="w-4 h-4" /> Tersimpan!
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" /> Simpan Logo
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
