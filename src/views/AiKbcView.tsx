import React, { useState } from 'react';
import { dbService } from '../services/dbService';
import { aiService } from '../services/aiService';
import { PrintHeader, PrintSignature } from '../components/PrintHeader';
import { Heart, Sparkles, Copy, Printer, Save, RefreshCw } from 'lucide-react';
import Swal from 'sweetalert2';

export const AiKbcView: React.FC = () => {
  const mapelList = dbService.getMapelList();
  const kelasList = dbService.getKelasList();
  const [mapelNama, setMapelNama] = useState(mapelList[0]?.nama || 'Informatika');
  const [kelas, setKelas] = useState(kelasList[0] || 'X-1');
  const [fokusKasih, setFokusKasih] = useState('Empati Komunikasi, Kehangatan Kelas & Mindful Learning');
  const [temaPembelajaran, setTemaPembelajaran] = useState('Kolaborasi Proyek Digital Tanpa Bullying');

  const [isLoading, setIsLoading] = useState(false);
  const [hasilKbc, setHasilKbc] = useState<string>('');

  const handleGenerate = async () => {
    setIsLoading(true);
    setHasilKbc('');

    const prompt = `Susunlah sebuah RANCANGAN MODUL PEMBELAJARAN BERBASIS KASIH SAYANG / KURIKULUM BERBASIS CINTA (KBC & LOVING PEDAGOGY) terintegrasi Kurikulum Merdeka (SK BSKAP No. 046/H/KR/2025) untuk:
- Mata Pelajaran: ${mapelNama}
- Kelas: ${kelas}
- Fokus Pedagogi Kasih: ${fokusKasih}
- Tema Pembelajaran: ${temaPembelajaran}

STRUKTUR DOKUMEN WAJIB:
1. FILOSOFI CINTA & KASIH SAYANG PENDIDIKAN (Ki Hadjar Dewantara & Pendekatan Emosional Humanis)
2. IDENTITAS PEMBELAJARAN & CP RESMI SK BSKAP NO. 046/H/KR/2025
3. TUJUAN PEMBELAJARAN KASIH (Kompetensi Kognitif + Penguatan Kesehatan Mental & Empati)
4. TAHAPAN KBM PENUH KASIH:
   - Sapaan Cinta (Morning Greeting & Check-in Emosional 5 Menit)
   - Lingkaran Kasih (Mindful listening & Apresiasi Teman Sebaya)
   - Eksplorasi Materi dengan Bahasa Afirmasi Positif (Bebas Takut Salah)
   - Refleksi Hati & Doa Penuh Makna
5. INSTRUMEN OBSERVASI EMPATI DAN KESEHATAN MENTAL SISWA

Format Markdown profesional, menyentuh hati pendidik, dan operasional di kelas.`;

    try {
      const res = await aiService.generateContent(prompt);
      setHasilKbc(res);
    } catch {
      setHasilKbc(`# RANCANGAN PEMBELAJARAN BERBASIS KASIH SAYANG (KBC)
## PENGUATAN EMOSIONAL & KESEHATAN MENTAL SISWA (SK BSKAP 046/H/KR/2025)

### 1. FILOSOFI PEDAGOGI KASIH SAYANG
Pendidikan bukan semata transfer informasi logika, melainkan penyalaan lentera cinta dan rasa aman di hati anak didik.

### 2. IDENTITAS & CAPAIAN PEMBELAJARAN
- **Mata Pelajaran**: ${mapelNama} (Kelas ${kelas})
- **CP SK 046/H/KR/2025**: Berpikir kritis, kolaboratif, dan pemanfaatan teknologi secara etis dan bertanggung jawab sosial.

### 3. TAHAPAN PEMBELAJARAN
- **A. Sapaan Kasih (10 Menit)**: Guru menyambut setiap anak di pintu dengan salam hangat, menanyakan kabar perasaan (Emoticon Mood Meter).
- **B. Ruang Aman Belajar (40 Menit)**: Menegaskan bahwa "Di kelas ini tidak ada kata salah atau bodoh, yang ada adalah proses belajar bersama".
- **C. Apresiasi Sahabat (20 Menit)**: Setiap kelompok saling memberikan apresiasi 1 kekuatan rekan belajarnya.
- **D. Doa & Afirmasi (10 Menit)**: Refleksi kebaikan dan harapan untuk hari esok.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(hasilKbc);
    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Teks disalin!', timer: 1500, showConfirmButton: false });
  };

  return (
    <div className="space-y-6">
      <div className="hidden print:block">
        <PrintHeader title="PERANGKAT PEMBELAJARAN BERBASIS KASIH SAYANG (KBC)" subtitle={`Mata Pelajaran: ${mapelNama} · Kelas: ${kelas}`} />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-rose-600 text-white rounded-xl shadow-xs">
              <Heart className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Perangkat Berbasis Kasih Sayang (KBC)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Desain pembelajaran humanis berprinsip empati, komunikasi positif, dan kesehatan mental peserta didik.
          </p>
        </div>

        {hasilKbc && (
          <div className="flex items-center gap-2">
            <button onClick={handleCopy} className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold">
              <Copy className="w-4 h-4 inline mr-1" /> Salin
            </button>
            <button onClick={() => window.print()} className="px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold">
              <Printer className="w-4 h-4 inline mr-1" /> Cetak
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
              <label className="block font-semibold mb-1">Fokus Hubungan & Nilai Kasih</label>
              <input type="text" value={fokusKasih} onChange={(e) => setFokusKasih(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Tema / Konteks Pembelajaran</label>
              <input type="text" value={temaPembelajaran} onChange={(e) => setTemaPembelajaran(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold" />
            </div>

            <button
              type="button"
              disabled={isLoading}
              onClick={handleGenerate}
              className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2"
            >
              {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>{isLoading ? 'Menyusun Perangkat Kasih...' : 'Buat Modul Kasih Sayang (KBC)'}</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between min-h-[500px]">
          {hasilKbc ? (
            <div className="space-y-4">
              <div className="prose dark:prose-invert max-w-none text-xs leading-relaxed whitespace-pre-wrap font-sans text-slate-800 dark:text-slate-200 max-h-[600px] overflow-y-auto">
                {hasilKbc}
              </div>
              <div className="hidden print:block"><PrintSignature /></div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-400">
              <Heart className="w-12 h-12 text-rose-400/50 mb-3" />
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Belum Ada Perangkat KBC</p>
              <p className="text-xs text-slate-500 mt-1">Klik tombol untuk menyusun pembelajaran penuh welas asih.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
