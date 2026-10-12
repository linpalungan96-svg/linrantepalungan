import React, { useState } from 'react';
import { dbService, DEFAULT_LOGO_SVG } from '../services/dbService';
import { ProfilGuru, ProfilSekolah } from '../types';
import { LogoUploadModal } from '../components/LogoUploadModal';
import {
  Settings,
  User,
  Building2,
  Database,
  Save,
  Download,
  Upload,
  RefreshCw,
  Code,
  FileCode2,
  Camera,
  Check
} from 'lucide-react';
import Swal from 'sweetalert2';

export const PengaturanView: React.FC = () => {
  const [guru, setGuru] = useState<ProfilGuru>(dbService.getGuru());
  const [sekolah, setSekolah] = useState<ProfilSekolah>(dbService.getSekolah());
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'profil-guru' | 'profil-sekolah' | 'database' | 'apps-script'>('profil-guru');

  const handleSaveGuru = (e: React.FormEvent) => {
    e.preventDefault();
    dbService.saveGuru(guru);
    Swal.fire('Tersimpan', 'Profil Guru berhasil diperbarui.', 'success');
  };

  const handleSaveSekolah = (e: React.FormEvent) => {
    e.preventDefault();
    dbService.saveSekolah(sekolah);
    Swal.fire('Tersimpan', 'Profil Sekolah berhasil diperbarui.', 'success');
  };

  const handleExportBackup = () => {
    const jsonStr = dbService.exportFullBackup();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Backup_Administrasi_LinPalungan_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    Swal.fire('Backup Berhasil', 'File JSON cadangan data tersimpan.', 'success');
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = dbService.importBackup(content);
      if (success) {
        setGuru(dbService.getGuru());
        setSekolah(dbService.getSekolah());
        Swal.fire('Restore Berhasil', 'Seluruh data berhasil dipulihkan dari file JSON.', 'success');
      } else {
        Swal.fire('Gagal', 'Format file JSON tidak valid.', 'error');
      }
    };
    reader.readAsText(file);
  };

  const handleResetDemo = () => {
    Swal.fire({
      title: 'Reset ke Data Bawaan?',
      text: 'Semua perubahan data lokal akan dikembalikan ke data default resmi.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d97706',
      confirmButtonText: 'Ya, Kembalikan Data Bawaan',
      cancelButtonText: 'Batal'
    }).then(res => {
      if (res.isConfirmed) {
        dbService.resetToDefault();
        setGuru(dbService.getGuru());
        setSekolah(dbService.getSekolah());
        Swal.fire('Berhasil Reset', 'Data contoh default telah dimuat ulang.', 'success');
      }
    });
  };

  // Google Apps Script source code
  const appsScriptCodeGs = `// ====================================================================
// GOOGLE APPS SCRIPT WEB APP - LIN RANTE PALUNGAN
// Sinkronisasi Database Google Sheets Akun belajar.id
// ====================================================================

function doGet(e) {
  var action = e.parameter.action;
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  if (action === "getData") {
    var sheet = ss.getSheetByName("Siswa") || ss.getActiveSheet();
    var data = sheet.getDataRange().getValues();
    return ContentService.createTextOutput(JSON.stringify({ status: "success", data: data }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  return HtmlService.createHtmlOutputFromFile("index")
    .setTitle("Sinkronisasi Cloud Administrasi Guru");
}

function doPost(e) {
  var payload = JSON.parse(e.postData.contents);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Presensi") || ss.insertSheet("Presensi");
  
  sheet.appendRow([
    new Date(),
    payload.kelas,
    payload.tanggal,
    JSON.stringify(payload.items)
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({ status: "saved" }))
    .setMimeType(ContentService.MimeType.JSON);
}`;

  const appsScriptIndexHtml = `<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
    <title>Sinkronisasi Cloud Guru Lin Rante Palungan</title>
  </head>
  <body style="font-family: Arial, sans-serif; padding: 20px;">
    <h2>Web App Endpoint Sinkronisasi Google Sheets</h2>
    <p>Endpoint ini aktif dan siap menerima data presensi dan asesmen dari dashboard.</p>
    <p>Regulasi: SK BSKAP No. 046/H/KR/2025.</p>
  </body>
</html>`;

  const handleDownloadAppsScript = () => {
    // Download code.gs
    const blob1 = new Blob([appsScriptCodeGs], { type: 'text/plain' });
    const url1 = URL.createObjectURL(blob1);
    const link1 = document.createElement('a');
    link1.href = url1;
    link1.download = 'Code.gs';
    document.body.appendChild(link1);
    link1.click();
    document.body.removeChild(link1);

    // Download index.html
    const blob2 = new Blob([appsScriptIndexHtml], { type: 'text/html' });
    const url2 = URL.createObjectURL(blob2);
    const link2 = document.createElement('a');
    link2.href = url2;
    link2.download = 'Index.html';
    document.body.appendChild(link2);
    link2.click();
    document.body.removeChild(link2);

    Swal.fire('Diunduh', 'File Code.gs & Index.html untuk Apps Script berhasil diunduh.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Screen Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-500 text-slate-950 rounded-xl shadow-xs font-black">
              <Settings className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Pengaturan Profil & Manajemen Database
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Konfigurasi identitas guru, data sekolah resmi, cadangan data (backup/restore), dan integrasi Google Apps Script.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto p-1.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <button
          onClick={() => setActiveTab('profil-guru')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'profil-guru'
              ? 'bg-amber-400 text-slate-950 shadow-xs font-black'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profil Guru</span>
        </button>

        <button
          onClick={() => setActiveTab('profil-sekolah')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'profil-sekolah'
              ? 'bg-amber-400 text-slate-950 shadow-xs font-black'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Profil Sekolah & Logo</span>
        </button>

        <button
          onClick={() => setActiveTab('database')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'database'
              ? 'bg-amber-400 text-slate-950 shadow-xs font-black'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Cadangan Data (Backup/Restore)</span>
        </button>

        <button
          onClick={() => setActiveTab('apps-script')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'apps-script'
              ? 'bg-amber-400 text-slate-950 shadow-xs font-black'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <FileCode2 className="w-4 h-4" />
          <span>Google Apps Script</span>
        </button>
      </div>

      {/* Tab 1: Profil Guru */}
      {activeTab === 'profil-guru' && (
        <form onSubmit={handleSaveGuru} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md p-6 space-y-4 max-w-3xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Identitas Guru Profesional</h3>
              <p className="text-xs text-slate-500">Data ini otomatis tampil di seluruh titimangsa cetak dan kop administrasi.</p>
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-sm"
            >
              <Save className="w-4 h-4" /> Simpan Profil
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold mb-1">Nama Lengkap Guru (Tanpa Gelar)</label>
              <input
                type="text"
                required
                value={guru.nama}
                onChange={(e) => setGuru({ ...guru, nama: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Gelar Akademik</label>
              <input
                type="text"
                value={guru.gelar}
                onChange={(e) => setGuru({ ...guru, gelar: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">NIP (Nomor Induk Pegawai)</label>
              <input
                type="text"
                required
                value={guru.nip}
                onChange={(e) => setGuru({ ...guru, nip: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">NUPTK</label>
              <input
                type="text"
                value={guru.nuptk}
                onChange={(e) => setGuru({ ...guru, nuptk: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Pangkat / Golongan Ruang</label>
              <input
                type="text"
                value={guru.pangkatGol}
                onChange={(e) => setGuru({ ...guru, pangkatGol: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Mata Pelajaran Utama</label>
              <input
                type="text"
                value={guru.mapelUtama}
                onChange={(e) => setGuru({ ...guru, mapelUtama: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Email Resmi (belajar.id)</label>
              <input
                type="email"
                value={guru.email}
                onChange={(e) => setGuru({ ...guru, email: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">No. WhatsApp / Handphone</label>
              <input
                type="tel"
                value={guru.noHp}
                onChange={(e) => setGuru({ ...guru, noHp: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
              />
            </div>
          </div>
        </form>
      )}

      {/* Tab 2: Profil Sekolah & Logo */}
      {activeTab === 'profil-sekolah' && (
        <form onSubmit={handleSaveSekolah} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md p-6 space-y-4 max-w-3xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Data Satuan Pendidikan & Kepala Sekolah</h3>
              <p className="text-xs text-slate-500">Digunakan pada Kop Surat Resmi seluruh dokumen cetak.</p>
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-sm"
            >
              <Save className="w-4 h-4" /> Simpan Data Sekolah
            </button>
          </div>

          {/* Logo Frame */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <div className="w-20 h-20 rounded-2xl bg-white p-1 border-2 border-amber-400 shadow-md flex items-center justify-center shrink-0">
              <img src={sekolah.logoUrl || DEFAULT_LOGO_SVG} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Logo Resmi Satuan Pendidikan</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Tampil di Kop Surat Resmi, Kartu Siswa QR, dan Sampul Buku Kerja.</p>
              <button
                type="button"
                onClick={() => setIsLogoModalOpen(true)}
                className="mt-2 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold inline-flex items-center gap-1 shadow-xs"
              >
                <Camera className="w-3.5 h-3.5" /> Ganti Logo Sekolah
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold mb-1">Nama Satuan Pendidikan *</label>
              <input
                type="text"
                required
                value={sekolah.namaSekolah}
                onChange={(e) => setSekolah({ ...sekolah, namaSekolah: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">NPSN</label>
              <input
                type="text"
                value={sekolah.npsn}
                onChange={(e) => setSekolah({ ...sekolah, npsn: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">NSS</label>
              <input
                type="text"
                value={sekolah.nss}
                onChange={(e) => setSekolah({ ...sekolah, nss: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Tahun Ajaran & Semester</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={sekolah.tahunAjaran}
                  onChange={(e) => setSekolah({ ...sekolah, tahunAjaran: e.target.value })}
                  className="w-full px-2 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
                />
                <select
                  value={sekolah.semesterAktif}
                  onChange={(e) => setSekolah({ ...sekolah, semesterAktif: e.target.value as any })}
                  className="w-full px-2 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
                >
                  <option value="Ganjil">Ganjil</option>
                  <option value="Genap">Genap</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block font-semibold mb-1">Nama Kepala Sekolah *</label>
              <input
                type="text"
                required
                value={sekolah.kepalaSekolahNama}
                onChange={(e) => setSekolah({ ...sekolah, kepalaSekolahNama: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">NIP Kepala Sekolah</label>
              <input
                type="text"
                value={sekolah.kepalaSekolahNip}
                onChange={(e) => setSekolah({ ...sekolah, kepalaSekolahNip: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block font-semibold mb-1">Alamat Lengkap Satuan Pendidikan</label>
              <textarea
                rows={2}
                value={sekolah.alamat}
                onChange={(e) => setSekolah({ ...sekolah, alamat: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Kabupaten / Kota</label>
              <input
                type="text"
                value={sekolah.kabupatenKota}
                onChange={(e) => setSekolah({ ...sekolah, kabupatenKota: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Provinsi</label>
              <input
                type="text"
                value={sekolah.provinsi}
                onChange={(e) => setSekolah({ ...sekolah, provinsi: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
          </div>
        </form>
      )}

      {/* Tab 3: Database (Backup / Restore / Reset) */}
      {activeTab === 'database' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md p-6 space-y-6 max-w-3xl">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Pencadangan & Pemulihan Data (JSON)</h3>
            <p className="text-xs text-slate-500">Amankan seluruh data riil (siswa, nilai, presensi, jadwal, bimbingan, perangkat) ke dalam berkas cadangan offline.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Backup */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-3">
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs">
                <Download className="w-4 h-4" /> Cadangkan Seluruh Data (Backup)
              </div>
              <p className="text-[11px] text-slate-500">Unduh seluruh berkas database lokal ke format file JSON.</p>
              <button
                type="button"
                onClick={handleExportBackup}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition"
              >
                Unduh File Backup JSON
              </button>
            </div>

            {/* Restore */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-3">
              <div className="flex items-center gap-2 text-blue-600 font-bold text-xs">
                <Upload className="w-4 h-4" /> Pulihkan Data (Restore)
              </div>
              <p className="text-[11px] text-slate-500">Muat ulang data dari file JSON cadangan yang pernah diunduh.</p>
              <label className="cursor-pointer block text-center w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition">
                Pilih File JSON Restore
                <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
              </label>
            </div>
          </div>

          {/* Reset to Default */}
          <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-800/60 bg-amber-50 dark:bg-amber-950/30 flex items-center justify-between gap-4">
            <div>
              <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200">Muat Ulang Data Contoh Bawaan</h4>
              <p className="text-[11px] text-amber-800/80 dark:text-amber-300/80 mt-0.5">
                Mengembalikan data contoh resmi guru Lin Rante Palungan, S.Pd., M.Pd. jika data rusak.
              </p>
            </div>
            <button
              type="button"
              onClick={handleResetDemo}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black shrink-0 transition"
            >
              Reset Bawaan
            </button>
          </div>
        </div>
      )}

      {/* Tab 4: Google Apps Script */}
      {activeTab === 'apps-script' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md p-6 space-y-5 max-w-3xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Kesiapan Google Apps Script (Sheets Cloud Sync)</h3>
              <p className="text-xs text-slate-500">Skrip siap pakai untuk menghubungkan sistem dengan Google Sheets di Google Drive belajar.id.</p>
            </div>
            <button
              type="button"
              onClick={handleDownloadAppsScript}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-4 h-4" /> Unduh Code.gs & Index.html
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <p className="font-semibold text-slate-700 dark:text-slate-300">Cara Penggunaan di Google Spreadsheet:</p>
            <ol className="list-decimal pl-4 space-y-1 text-slate-600 dark:text-slate-400">
              <li>Buka Google Spreadsheet baru di akun belajar.id Anda.</li>
              <li>Klik menu <strong>Ekstensi &gt; Apps Script</strong>.</li>
              <li>Salin kode <code>Code.gs</code> berikut ke editor Apps Script.</li>
              <li>Klik <strong>Deploy &gt; New deployment &gt; Web app</strong> (Access: Anyone).</li>
            </ol>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Pratinjau Kode: Code.gs</label>
              <pre className="p-3 bg-slate-900 text-emerald-400 rounded-xl font-mono text-[11px] overflow-x-auto max-h-48">
                {appsScriptCodeGs}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Logo Modal */}
      <LogoUploadModal isOpen={isLogoModalOpen} onClose={() => setIsLogoModalOpen(false)} />
    </div>
  );
};
