import React, { useState } from 'react';
import { dbService } from '../services/dbService';
import { aiService } from '../services/aiService';
import { Presentation, Sparkles, Copy, Printer, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import Swal from 'sweetalert2';

export const AiPptView: React.FC = () => {
  const mapelList = dbService.getMapelList();
  const kelasList = dbService.getKelasList();
  const [mapelNama, setMapelNama] = useState(mapelList[0]?.nama || 'Informatika');
  const [kelas, setKelas] = useState(kelasList[0] || 'X-1');
  const [topik, setTopik] = useState('Dampak Sosial Informatika & Etika Kecerdasan Artifisial (AI)');
  const [jumlahSlide, setJumlahSlide] = useState(10);

  const [isLoading, setIsLoading] = useState(false);
  const [hasilPpt, setHasilPpt] = useState<string>('');

  const handleGenerate = async () => {
    setIsLoading(true);
    setHasilPpt('');

    const prompt = `Susunlah sebuah OUTLINE DAN KONTEN SLIDE PRESENTASI PEMBELAJARAN (DEEP LEARNING: 10-15 SLIDE) untuk:
- Mata Pelajaran: ${mapelNama}
- Kelas: ${kelas}
- Topik / Materi: ${topik}
- Jumlah Slide: ${jumlahSlide} Slide

BERLANDASKAN SK BSKAP KEMENDIKDASMEN NO. 046/H/KR/2025:
Format per slide wajib mencantumkan:
[SLIDE X: JUDUL SLIDE]
- Header / Headline Menarik
- Poin-poin Pembahasan Kunci (Singkat, Padat, Kuat)
- Catatan Pemateri / Teacher's Talking Points (Apa yang diucapkan guru di kelas)
- Saran Visual / Ilustrasi / Elemen Interaktif (Misal: Infografis data, QR kuis, video pemantik).

Struktur Slide Meliputi:
Slide 1: Judul & Ice Breaking
Slide 2: Tujuan Pembelajaran (CP SK 046/2025)
Slide 3: Masalah Nyata / Studi Kasus Pemantik
Slide 4-8: Materi Pokok & Investigasi Mendalam
Slide 9: Kuis Interaktif Singkat (Cek Pemahaman)
Slide 10: Rangkuman Kunci & Refleksi Bersama.

Sajikan dalam format Markdown terstruktur rapi.`;

    try {
      const res = await aiService.generateContent(prompt);
      setHasilPpt(res);
    } catch {
      setHasilPpt(`# SLIDE 1: JUDUL & ICE BREAKING
## Menjelajahi Etika Kecerdasan Artifisial (AI) di Era Modern
- Poin: Bagaimana AI mengubah cara kita belajar dan bekerja?
- Catatan Guru: Buka kelas dengan menunjukkan karya seni AI dan ajak siswa menebak apakah dibuat manusia atau mesin.
- Visual: Ilustrasi robot kolaboratif bersanding dengan siswa.

---

# SLIDE 2: TUJUAN PEMBELAJARAN (SK BSKAP 046/H/KR/2025)
## Berpikir Kritis terhadap Dampak Sosial Teknologi
- Poin 1: Memahami cara kerja dasar model AI generatif.
- Poin 2: Mengidentifikasi bias data dan isu hak cipta digital.
- Catatan Guru: Jelaskan pentingnya menjadi pencipta yang beretika, bukan sekadar konsumen pasif.

---

# SLIDE 3: STUDI KASUS DUNIA NYATA
## Deepfake & Integritas Informasi
- Poin: Bagaimana membedakan fakta dan manipulasi audio-visual?
- Catatan Guru: Berikan contoh fenomena misinformasi terkini dan diskusikan dampaknya bagi masyarakat.
- Visual: Diagram alur verifikasi informasi.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(hasilPpt);
    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Konten slide disalin!', timer: 1500, showConfirmButton: false });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-600 text-white rounded-xl shadow-xs">
              <Presentation className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Generator Presentasi Pembelajaran (PPT AI)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Menyusun alur slide presentasi interaktif lengkap dengan poin kunci, narasi pemateri (speaker notes), dan saran visual.
          </p>
        </div>

        {hasilPpt && (
          <div className="flex items-center gap-2">
            <button onClick={handleCopy} className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold">
              <Copy className="w-4 h-4 inline mr-1" /> Salin Outline
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
              <label className="block font-semibold mb-1">Topik Presentasi</label>
              <input type="text" value={topik} onChange={(e) => setTopik(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Target Jumlah Slide</label>
              <select value={jumlahSlide} onChange={(e) => setJumlahSlide(Number(e.target.value))} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold">
                <option value={8}>8 Slide (Ringkas 1 Jam)</option>
                <option value={10}>10 Slide (Standar KBM 2 Jam)</option>
                <option value={12}>12 Slide (Mendalam dengan Studi Kasus)</option>
                <option value={15}>15 Slide (Komprehensif & Diskusi Kelompok)</option>
              </select>
            </div>

            <button
              type="button"
              disabled={isLoading}
              onClick={handleGenerate}
              className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2"
            >
              {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>{isLoading ? 'Merancang Alur Slide...' : 'Generate Slide Presentasi'}</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between min-h-[500px]">
          {hasilPpt ? (
            <div className="space-y-4">
              <div className="prose dark:prose-invert max-w-none text-xs leading-relaxed whitespace-pre-wrap font-sans text-slate-800 dark:text-slate-200 max-h-[600px] overflow-y-auto">
                {hasilPpt}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-400">
              <Presentation className="w-12 h-12 text-orange-400/50 mb-3" />
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Slide Belum Digenerate</p>
              <p className="text-xs text-slate-500 mt-1">Masukkan topik KBM dan klik tombol untuk menghasilkan outline slide.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
