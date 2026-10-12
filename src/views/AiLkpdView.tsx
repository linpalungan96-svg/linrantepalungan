import React, { useState } from 'react';
import { dbService } from '../services/dbService';
import { aiService } from '../services/aiService';
import { PrintHeader, PrintSignature } from '../components/PrintHeader';
import { FileText, Sparkles, Copy, Printer, RefreshCw } from 'lucide-react';
import Swal from 'sweetalert2';

export const AiLkpdView: React.FC = () => {
  const mapelList = dbService.getMapelList();
  const kelasList = dbService.getKelasList();
  const [mapelNama, setMapelNama] = useState(mapelList[0]?.nama || 'Informatika');
  const [kelas, setKelas] = useState(kelasList[0] || 'X-1');
  const [judulAktivitas, setJudulAktivitas] = useState('Eksperimen Algoritma Pencarian Efisien');
  const [tipePengerjaan, setTipePengerjaan] = useState('Kolaboratif Kelompok (4-5 Siswa)');

  const [isLoading, setIsLoading] = useState(false);
  const [hasilLkpd, setHasilLkpd] = useState<string>('');

  const handleGenerate = async () => {
    setIsLoading(true);
    setHasilLkpd('');

    const prompt = `Susunlah LEMBAR KERJA PESERTA DIDIK (LKPD) TERSTRUKTUR & DEEP LEARNING (Meaningful & Joyful) berbasis SK BSKAP No. 046/H/KR/2025 untuk:
- Mata Pelajaran: ${mapelNama}
- Kelas: ${kelas}
- Judul Aktivitas LKPD: ${judulAktivitas}
- Metode Pengerjaan: ${tipePengerjaan}

STRUKTUR WAJIB LKPD RESMI:
1. IDENTITAS KELOMPOK (Nama Anggota Kelompok, Kelas, Tanggal)
2. CAPAIAN PEMBELAJARAN (SK 046/2025) & TUJUAN AKTIVITAS
3. PETUNJUK KERJA & KESELAMATAN BELAJAR
4. STIMULUS KASUS / WACANA KONTEKSTUAL DUNIA NYATA
5. LANGKAH EKSPLORASI & PENGUMPULAN DATA
6. RUANG DISKUSI & ANALISIS KRITIS (Pertanyaan Pemantik Tingkat Tinggi)
7. KESIMPULAN & LEMBAR REFLEKSI SISWA
8. RUBRIK PENILAIAN OTENTIK GURU.

Format Markdown rapi dengan kolom isian kosong [.......] untuk jawaban siswa, siap dicetak A4.`;

    try {
      const res = await aiService.generateContent(prompt);
      setHasilLkpd(res);
    } catch {
      setHasilLkpd(`# LEMBAR KERJA PESERTA DIDIK (LKPD)
## DEEP LEARNING BERBASIS SK BSKAP NO. 046/H/KR/2025

### IDENTITAS KELOMPOK
- **Mata Pelajaran**: ${mapelNama}
- **Kelas / Kelompok**: ${kelas} / Kelompok: __________________
- **Anggota**:
  1. _____________________________ (Ketua)
  2. _____________________________
  3. _____________________________
  4. _____________________________

---

### A. TUJUAN AKTIVITAS
Peserta didik dapat menganalisis dan membandingkan performa algoritma pencarian biner dan linier dalam menyelesaikan masalah nyata.

### B. STIMULUS KASUS
Bayangkan Anda adalah manajer inventaris toko digital. Terdapat 10.000 barang yang masuk setiap hari. Manakah urutan pengarsipan yang paling cepat ketika pelanggan memesan barang?

### C. LANGKAH EKSPLORASI
1. Siapkan 10 kartu angka acak yang dibagikan guru.
2. Catat jumlah langkah pencarian angka tertentu dengan metode Linear:
   *Hasil uji coba*: [ .......... ] langkah perbandingan.
3. Urutkan ke-10 kartu dari kecil ke besar. Lakukan Binary Search:
   *Hasil uji coba*: [ .......... ] langkah perbandingan.

### D. REFLEKSI SAYA HARI INI
"Hal paling penting yang saya pelajari dari kerja sama tim hari ini adalah: [ ............................................................ ]"`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(hasilLkpd);
    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'LKPD disalin!', timer: 1500, showConfirmButton: false });
  };

  return (
    <div className="space-y-6">
      <div className="hidden print:block">
        <PrintHeader title="LEMBAR KERJA PESERTA DIDIK (LKPD)" subtitle={`Mata Pelajaran: ${mapelNama} · Kelas: ${kelas} · SK BSKAP 046/H/KR/2025`} />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-600 text-white rounded-xl shadow-xs">
              <FileText className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Generator LKPD Terstruktur AI
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Lembar Kerja Peserta Didik interaktif dengan stimulus masalah nyata, investigasi kelompok, dan lembar refleksi.
          </p>
        </div>

        {hasilLkpd && (
          <div className="flex items-center gap-2">
            <button onClick={handleCopy} className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold">
              <Copy className="w-4 h-4 inline mr-1" /> Salin LKPD
            </button>
            <button onClick={() => window.print()} className="px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold">
              <Printer className="w-4 h-4 inline mr-1" /> Cetak LKPD
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 print:hidden">
          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold mb-1">Mata Pelajaran</label>
              <select value={mapelNama} onChange={(e) => setMapelNama(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold">
                {mapelList.map(m => <option key={m.id} value={m.nama}>{m.nama}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1">Kelas / Rombel</label>
              <select value={kelas} onChange={(e) => setKelas(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold">
                {kelasList.map(k => <option key={k} value={k}>Rombel {k}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1">Judul / Topik Aktivitas LKPD</label>
              <input type="text" value={judulAktivitas} onChange={(e) => setJudulAktivitas(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Tipe Pengerjaan</label>
              <select value={tipePengerjaan} onChange={(e) => setTipePengerjaan(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <option value="Kolaboratif Kelompok (4-5 Siswa)">Kolaboratif Kelompok (4-5 Siswa)</option>
                <option value="Tugas Mandiri / Individu Eksploratif">Tugas Mandiri / Individu Eksploratif</option>
                <option value="Berpasangan (Think-Pair-Share)">Berpasangan (Think-Pair-Share)</option>
              </select>
            </div>

            <button
              type="button"
              disabled={isLoading}
              onClick={handleGenerate}
              className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2"
            >
              {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>{isLoading ? 'Menyusun LKPD...' : 'Generate LKPD Siap Pakai'}</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between min-h-[500px]">
          {hasilLkpd ? (
            <div className="space-y-4">
              <div className="prose dark:prose-invert max-w-none text-xs leading-relaxed whitespace-pre-wrap font-sans text-slate-800 dark:text-slate-200 max-h-[600px] overflow-y-auto">
                {hasilLkpd}
              </div>
              <div className="hidden print:block"><PrintSignature /></div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-400">
              <FileText className="w-12 h-12 text-orange-400/50 mb-3" />
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">LKPD Belum Dibuat</p>
              <p className="text-xs text-slate-500 mt-1">Klik tombol di sebelah kiri untuk menghasilkan LKPD siap cetak.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
