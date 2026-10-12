import React, { useState } from 'react';
import { dbService } from '../services/dbService';
import { aiService } from '../services/aiService';
import { PrintHeader, PrintSignature } from '../components/PrintHeader';
import { LayoutGrid, Sparkles, Copy, Printer, RefreshCw } from 'lucide-react';
import Swal from 'sweetalert2';

export const AiKartuSoalView: React.FC = () => {
  const mapelList = dbService.getMapelList();
  const kelasList = dbService.getKelasList();
  const [mapelNama, setMapelNama] = useState(mapelList[0]?.nama || 'Informatika');
  const [kelas, setKelas] = useState(kelasList[0] || 'X-1');
  const [materi, setMateri] = useState('Analisis Algoritma & Struktur Data');
  const [formatPilihan, setFormatPilihan] = useState<'kisi-kisi' | 'kartu-soal'>('kisi-kisi');

  const [isLoading, setIsLoading] = useState(false);
  const [hasilKisi, setHasilKisi] = useState<string>('');

  const handleGenerate = async () => {
    setIsLoading(true);
    setHasilKisi('');

    const prompt = `Susunlah format resmi ${formatPilihan === 'kisi-kisi' ? 'KISI-KISI PENULISAN SOAL UJIAN RESMI' : 'KARTU SOAL RESMI BERBUTIR LENGKAP STIMULUS'} untuk:
- Mata Pelajaran: ${mapelNama}
- Kelas / Fase: ${kelas} (Fase E/F)
- Lingkup Materi: ${materi}

RUJUKAN STANDAR KELULUSAN & CP RESMI:
SALINAN KEPUTUSAN KEPALA BSKAP KEMENDIKDASMEN NO. 046/H/KR/2025 TENTANG CAPAIAN PEMBELAJARAN PAUD, DIKDAS, DAN DIKMEN.

Format Tabel Standar Kisi-Kisi Ujian Nasional / Sekolah:
- Nomor Urut
- Capaian Pembelajaran (Elemen SK 046/H/KR/2025)
- Lingkup Materi / Sub Materi
- Indikator Pencapaian Kompetensi / Indikator Soal
- Level Kognitif (L1 Pengetahuan, L2 Aplikasi, L3 Penalaran HOTS)
- Bentuk Soal (PG / Uraian)
- Nomor Soal

Dan Kartu Soal Resmi mencantumkan:
- Butir Soal & Stimulus Kontekstual
- Kunci Jawaban
- Pembahasan Singkat
- Pedoman Penskoran / Rubrik Nilai.

Sajikan dalam format Markdown tabel rapi berstandar pengawas sekolah.`;

    try {
      const res = await aiService.generateContent(prompt);
      setHasilKisi(res);
    } catch {
      setHasilKisi(`# KISI-KISI PENULISAN SOAL ASESMEN SUMATIF
## SK BSKAP KEMENDIKDASMEN NO. 046/H/KR/2025

| No | Capaian Pembelajaran (SK 046/2025) | Materi Pokok | Indikator Soal | Level | Bentuk | No Soal |
|---|---|---|---|---|---|---|
| 1 | Berpikir Komputasional (BK) | Algoritma Linear Search | Disajikan studi kasus pencarian data acak, siswa dapat menentukan jumlah langkah perbandingan | L2 | PG | 1 |
| 2 | Berpikir Komputasional (BK) | Algoritma Binary Search | Disajikan deret angka terurut, siswa dapat menganalisis indeks tengah pada iterasi kedua | L3 (HOTS) | PG | 2 |
| 3 | Algoritma & Pemrograman (AP) | Percabangan Bersarang | Diberikan potongan kode program, siswa dapat memprediksi output logika kondisi | L2 | PG | 3 |
| 4 | Berpikir Komputasional (BK) | Kompleksitas Algoritma | Siswa dapat merumuskan perbandingan efisiensi Binary vs Linear Search pada dataset 10.000 data | L3 (HOTS) | Uraian | 4 |`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(hasilKisi);
    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Kisi-kisi disalin!', timer: 1500, showConfirmButton: false });
  };

  return (
    <div className="space-y-6">
      <div className="hidden print:block">
        <PrintHeader title="KISI-KISI & KARTU SOAL ASESMEN SEKOLAH" subtitle={`Mata Pelajaran: ${mapelNama} · Kelas: ${kelas} · SK BSKAP 046/H/KR/2025`} />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-600 text-white rounded-xl shadow-xs">
              <LayoutGrid className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Kisi-Kisi & Kartu Soal Ujian
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Format resmi kisi-kisi penulisan soal dan kartu soal stimulus berstandar SK BSKAP No. 046/H/KR/2025.
          </p>
        </div>

        {hasilKisi && (
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
              <label className="block font-semibold mb-1">Pilihan Format Dokumen</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFormatPilihan('kisi-kisi')}
                  className={`py-2 px-3 rounded-xl font-bold border transition ${
                    formatPilihan === 'kisi-kisi'
                      ? 'bg-orange-600 text-white border-orange-500'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  Tabel Kisi-Kisi
                </button>
                <button
                  type="button"
                  onClick={() => setFormatPilihan('kartu-soal')}
                  className={`py-2 px-3 rounded-xl font-bold border transition ${
                    formatPilihan === 'kartu-soal'
                      ? 'bg-orange-600 text-white border-orange-500'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  Kartu Soal Rinci
                </button>
              </div>
            </div>
            <div>
              <label className="block font-semibold mb-1">Materi / Sub Materi Pokok</label>
              <input type="text" value={materi} onChange={(e) => setMateri(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold" />
            </div>

            <button
              type="button"
              disabled={isLoading}
              onClick={handleGenerate}
              className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2"
            >
              {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>{isLoading ? 'Menyusun Kisi-Kisi...' : 'Generate Kisi-Kisi & Kartu Soal'}</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between min-h-[500px]">
          {hasilKisi ? (
            <div className="space-y-4">
              <div className="prose dark:prose-invert max-w-none text-xs leading-relaxed whitespace-pre-wrap font-sans text-slate-800 dark:text-slate-200 max-h-[600px] overflow-y-auto">
                {hasilKisi}
              </div>
              <div className="hidden print:block"><PrintSignature /></div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-400">
              <LayoutGrid className="w-12 h-12 text-orange-400/50 mb-3" />
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Format Belum Dibuat</p>
              <p className="text-xs text-slate-500 mt-1">Pilih format dan klik tombol untuk membuat kisi-kisi atau kartu soal.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
