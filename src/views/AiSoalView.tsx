import React, { useState } from 'react';
import { dbService } from '../services/dbService';
import { aiService } from '../services/aiService';
import { PrintHeader, PrintSignature } from '../components/PrintHeader';
import { FileSpreadsheet, Sparkles, Copy, Printer, Save, RefreshCw, CheckCircle2 } from 'lucide-react';
import Swal from 'sweetalert2';

export const AiSoalView: React.FC = () => {
  const mapelList = dbService.getMapelList();
  const kelasList = dbService.getKelasList();
  const [mapelNama, setMapelNama] = useState(mapelList[0]?.nama || 'Informatika');
  const [kelas, setKelas] = useState(kelasList[0] || 'X-1');
  const [lingkupMateri, setLingkupMateri] = useState('Berpikir Komputasional & Algoritma');
  const [jumlahSoal, setJumlahSoal] = useState('10 Soal (5 PG, 2 PG Kompleks, 1 Menjodohkan, 2 Uraian HOTS)');
  const [levelKognitif, setLevelKognitif] = useState('HOTS (Level 3 - Penalaran & Analisis)');

  const [isLoading, setIsLoading] = useState(false);
  const [hasilSoal, setHasilSoal] = useState<string>('');

  const handleGenerate = async () => {
    setIsLoading(true);
    setHasilSoal('');

    const prompt = `Susunlah sebuah PAKET NASKAH SOAL UJIAN & LEMBAR JAWABAN SISWA (LJS) BERBASIS HOTS untuk:
- Mata Pelajaran: ${mapelNama}
- Kelas: ${kelas}
- Lingkup Materi: ${lingkupMateri}
- Komposisi Butir: ${jumlahSoal}
- Tingkat Kognitif: ${levelKognitif}

RUJUKAN CAPAIAN PEMBELAJARAN RESMI:
SALINAN KEPUTUSAN KEPALA BSKAP KEMENDIKDASMEN NO. 046/H/KR/2025 TENTANG CAPAIAN PEMBELAJARAN PAUD, DIKDAS, DAN DIKMEN.

STRUKTUR NASKAH WAJIB LENGKAP:
1. PETUNJUK UMUM PENGERJAAN UJIAN
2. BAGIAN A: NASKAH SOAL LENGKAP DENGAN STIMULUS KONTEKSTUAL (Wacana kasus, data, atau tabel nyata)
   - Pilihan Ganda (Pilihan A s.d. E)
   - Pilihan Ganda Kompleks (Pilihan lebih dari satu jawaban benar)
   - Menjodohkan (Premis & Respon)
   - Uraian HOTS (Studi kasus pemecahan masalah)
3. BAGIAN B: KUNCI JAWABAN & PEMBAHASAN KOMPREHENSIF LENGKAP
4. BAGIAN C: LEMBAR JAWABAN SISWA (LJS) FORMAT CETAK (Dilengkapi kotak identitas, tabel pilihan ganda hitam/silang, dan kolom uraian bergaris).

Format Markdown terstruktur, rapi dan siap cetak.`;

    try {
      const res = await aiService.generateContent(prompt);
      setHasilSoal(res);
    } catch {
      setHasilSoal(`# NASKAH SOAL PENILAIAN SUMATIF BERBASIS HOTS
## SK BSKAP KEMENDIKDASMEN NO. 046/H/KR/2025

### PETUNJUK UMUM
1. Berdoalah sebelum mengerjakan soal.
2. Periksa dan bacalah setiap stimulus kasus dengan seksama.
3. Kerjakan pada Lembar Jawaban Siswa (LJS) yang telah disediakan.

---

### BAGIAN A: BUTIR SOAL
**Stimulus Kasus 1**:
Di sebuah perpustakaan digital daerah dengan 1.000.000 koleksi buku terdaftar, sistem katalog memerlukan waktu rata-rata 0.001 detik untuk menemukan buku dengan Binary Search. Namun suatu hari koleksi buku belum diurutkan berdasarkan nomor induk.

**Soal 1 (Pilihan Ganda - L3)**:
Manakah pernyataan berikut yang paling tepat mengenai konsekuensi pencarian jika data belum terurut?
A. Binary Search tetap dapat berjalan optimal tanpa kesalahan.
B. Sistem wajib melakukan pengurutan (sorting) terlebih dahulu atau beralih ke Linear Search.
C. Waktu pencarian akan selalu bernilai konstan O(1).
D. Data akan otomatis terhapus oleh memori sistem.
E. Indeks pencarian melompat langsung ke elemen tengah.
*(Kunci: B)*

---

### BAGIAN B: LEMBAR JAWABAN SISWA (LJS)
Nama Siswa: ______________________  Kelas: ________  No. Ujian: ________
| No | A | B | C | D | E |
|---|---|---|---|---|---|
| 1 | ( ) | ( ) | ( ) | ( ) | ( ) |
| 2 | ( ) | ( ) | ( ) | ( ) | ( ) |
| 3 | ( ) | ( ) | ( ) | ( ) | ( ) |
| 4 | ( ) | ( ) | ( ) | ( ) | ( ) |
| 5 | ( ) | ( ) | ( ) | ( ) | ( ) |`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(hasilSoal);
    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Naskah soal disalin!', timer: 1500, showConfirmButton: false });
  };

  return (
    <div className="space-y-6">
      <div className="hidden print:block">
        <PrintHeader title="NASKAH SOAL ASESMEN SUMATIF & LEMBAR JAWABAN SISWA" subtitle={`Mata Pelajaran: ${mapelNama} · Kelas: ${kelas}`} />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-600 text-white rounded-xl shadow-xs">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Paket Soal Ujian HOTS & Lembar Jawaban (LJS)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Generator soal PG, PG Kompleks, Menjodohkan, Uraian, Pembahasan mendalam, dan format LJS siap cetak.
          </p>
        </div>

        {hasilSoal && (
          <div className="flex items-center gap-2">
            <button onClick={handleCopy} className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold">
              <Copy className="w-4 h-4 inline mr-1" /> Salin Soal
            </button>
            <button onClick={() => window.print()} className="px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold">
              <Printer className="w-4 h-4 inline mr-1" /> Cetak Naskah
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
              <label className="block font-semibold mb-1">Lingkup Materi</label>
              <input type="text" value={lingkupMateri} onChange={(e) => setLingkupMateri(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Bentuk & Jumlah Soal</label>
              <input type="text" value={jumlahSoal} onChange={(e) => setJumlahSoal(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Level Kognitif</label>
              <select value={levelKognitif} onChange={(e) => setLevelKognitif(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold">
                <option value="HOTS (Level 3 - Penalaran & Analisis)">HOTS (Level 3 - Penalaran & Analisis)</option>
                <option value="MOTS (Level 2 - Aplikasi Konseptual)">MOTS (Level 2 - Aplikasi Konseptual)</option>
                <option value="Kombinasi Seimbang L1, L2, L3 (20:50:30)">Kombinasi Seimbang L1, L2, L3</option>
              </select>
            </div>

            <button
              type="button"
              disabled={isLoading}
              onClick={handleGenerate}
              className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2"
            >
              {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>{isLoading ? 'Menyusun Soal & Pembahasan...' : 'Generate Paket Soal & LJS'}</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between min-h-[500px]">
          {hasilSoal ? (
            <div className="space-y-4">
              <div className="prose dark:prose-invert max-w-none text-xs leading-relaxed whitespace-pre-wrap font-sans text-slate-800 dark:text-slate-200 max-h-[600px] overflow-y-auto">
                {hasilSoal}
              </div>
              <div className="hidden print:block"><PrintSignature /></div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-400">
              <FileSpreadsheet className="w-12 h-12 text-orange-400/50 mb-3" />
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Naskah Soal Belum Disusun</p>
              <p className="text-xs text-slate-500 mt-1">Atur parameter dan klik tombol untuk menyusun soal HOTS.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
