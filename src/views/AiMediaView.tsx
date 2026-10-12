import React, { useState } from 'react';
import { dbService } from '../services/dbService';
import { aiService } from '../services/aiService';
import { PrintHeader, PrintSignature } from '../components/PrintHeader';
import { MonitorPlay, Sparkles, Copy, Printer, Save, RefreshCw, Check } from 'lucide-react';
import Swal from 'sweetalert2';

export const AiMediaView: React.FC = () => {
  const mapelList = dbService.getMapelList();
  const kelasList = dbService.getKelasList();
  const [mapelNama, setMapelNama] = useState(mapelList[0]?.nama || 'Informatika');
  const [kelas, setKelas] = useState(kelasList[0] || 'X-1');
  const [topik, setTopik] = useState('Struktur Logika Percabangan & Perulangan');
  const [jenisMedia, setJenisMedia] = useState('Simulasi Game Edukatif Interaktif');
  const [sarana, setSarana] = useState('Smartphone Siswa / Lab Komputer');

  const [isLoading, setIsLoading] = useState(false);
  const [hasilMedia, setHasilMedia] = useState<string>('');

  const handleGenerate = async () => {
    setIsLoading(true);
    setHasilMedia('');

    const prompt = `Rancanglah sebuah PANDUAN DAN BLUEPRINT MEDIA PEMBELAJARAN INTERAKTIF (Deep Learning & Joyful Learning) berbasis Kurikulum Merdeka (SK BSKAP No. 046/H/KR/2025) untuk:
- Mata Pelajaran: ${mapelNama}
- Kelas: ${kelas}
- Topik / Materi: ${topik}
- Bentuk Media: ${jenisMedia}
- Ketersediaan Sarana: ${sarana}

Struktur Dokumen Desain Media:
1. IDENTITAS & TUJUAN MEDIA (Berbasis CP SK 046/H/KR/2025)
2. KONSEP PEDAGOGIS JOYFUL & MEANINGFUL LEARNING
3. SKENARIO ALUR PENGGUNAAN MEDIA DI KELAS (Langkah demi langkah guru & siswa)
4. NASKAH / PROMPT / ATURAN MAIN / KONTEN KUIS INTERAKTIF
5. RUBRIK EVALUASI EFEKTIVITAS MEDIA TERHADAP PEMAHAMAN KONSEP.

Sajikan dalam format Markdown terstruktur, praktis, kreatif, dan aplikatif.`;

    try {
      const res = await aiService.generateContent(prompt);
      setHasilMedia(res);
    } catch {
      setHasilMedia(`# RANCANGAN MEDIA PEMBELAJARAN INTERAKTIF
## SK BSKAP KEMENDIKDASMEN NO. 046/H/KR/2025

### 1. IDENTITAS MEDIA
- **Mata Pelajaran**: ${mapelNama} (Kelas ${kelas})
- **Topik**: ${topik}
- **Format Media**: ${jenisMedia}

### 2. KONSEP JOYFUL LEARNING
Media dirancang berbasis gamifikasi logika dengan sistem tantangan berjenjang (Level 1: Konsep Dasar, Level 2: Studi Kasus, Level 3: Kreasi Solusi Mandiri).

### 3. ALUR IMPLEMENTASI DI KELAS
1. **Pemanasan (5 Menit)**: Siswa mengakses tautan permainan interaktif atau simulasi fisik dengan perangkat '${sarana}'.
2. **Eksplorasi (20 Menit)**: Mengerjakan tantangan kelompok (peer-challenge) dengan aturan interaktif.
3. **Refleksi (10 Menit)**: Mendiskusikan konsep yang diperoleh dari umpan balik game.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(hasilMedia);
    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Teks disalin!', timer: 1500, showConfirmButton: false });
  };

  return (
    <div className="space-y-6">
      <div className="hidden print:block">
        <PrintHeader title="RANCANGAN MEDIA PEMBELAJARAN INTERAKTIF DEEP LEARNING" subtitle={`Mata Pelajaran: ${mapelNama} · Kelas: ${kelas}`} />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-600 text-white rounded-xl shadow-xs">
              <MonitorPlay className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              Media Pembelajaran Interaktif AI
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-sm bg-emerald-600 text-white">
                BARU
              </span>
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Generator blueprint media visual, simulasi edukatif, game logic, dan aktivitas interaktif (Joyful Learning).
          </p>
        </div>

        {hasilMedia && (
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
              <label className="block font-semibold mb-1">Topik / Materi Pokok</label>
              <input type="text" value={topik} onChange={(e) => setTopik(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Bentuk Media yang Diharapkan</label>
              <select value={jenisMedia} onChange={(e) => setJenisMedia(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <option value="Simulasi Game Edukatif Interaktif">Simulasi Game Edukatif Interaktif</option>
                <option value="Lembar Aktivitas Visual Interaktif (Infografis Tantangan)">Lembar Aktivitas Visual Interaktif</option>
                <option value="Kuis Interaktif Berbasis Studi Kasus Nyata">Kuis Interaktif Berbasis Studi Kasus</option>
                <option value="Projek Prototipe Roleplay Kolaboratif">Projek Prototipe Roleplay Kolaboratif</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1">Sarana Pembelajaran yang Tersedia</label>
              <input type="text" value={sarana} onChange={(e) => setSarana(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700" />
            </div>

            <button
              type="button"
              disabled={isLoading}
              onClick={handleGenerate}
              className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2"
            >
              {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>{isLoading ? 'Menyusun Blueprint Media...' : 'Buat Rancangan Media AI'}</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between min-h-[500px]">
          {hasilMedia ? (
            <div className="space-y-4">
              <div className="prose dark:prose-invert max-w-none text-xs leading-relaxed whitespace-pre-wrap font-sans text-slate-800 dark:text-slate-200 max-h-[600px] overflow-y-auto">
                {hasilMedia}
              </div>
              <div className="hidden print:block"><PrintSignature /></div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-400">
              <MonitorPlay className="w-12 h-12 text-orange-400/50 mb-3" />
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Rancangan Media Belum Dibuat</p>
              <p className="text-xs text-slate-500 mt-1">Tentukan parameter media dan klik "Buat Rancangan Media AI".</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
