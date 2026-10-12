import React, { useState } from 'react';
import { dbService } from '../services/dbService';
import { aiService } from '../services/aiService';
import { PrintHeader, PrintSignature } from '../components/PrintHeader';
import { Smile, Sparkles, Copy, Printer, Save, RefreshCw, CheckCircle2 } from 'lucide-react';
import Swal from 'sweetalert2';

export const AiKokurikulerView: React.FC = () => {
  const kelasList = dbService.getKelasList();
  const [kelas, setKelas] = useState(kelasList[0] || 'X-1');
  const [fokusKebiasaan, setFokusKebiasaan] = useState<string>('Semua 7 Kebiasaan Terpadu');
  const [durasiProgram, setDurasiProgram] = useState('Program Kokurikuler 4 Pekan (1 Bulan)');
  const [bentukAktivitas, setBentukAktivitas] = useState('Jurnal Harian, Tantangan Bersama & Aksi Nyata');

  const [isLoading, setIsLoading] = useState(false);
  const [hasilKokurikuler, setHasilKokurikuler] = useState<string>('');

  const KEBIASAAN_LIST = [
    '1. Bangun Pagi',
    '2. Beribadah',
    '3. Berolahraga',
    '4. Gemar Membaca',
    '5. Makan Sehat & Bergizi',
    '6. Bermasyarakat / Gotong Royong',
    '7. Tidur Cepat / Tepat Waktu'
  ];

  const handleGenerate = async () => {
    setIsLoading(true);
    setHasilKokurikuler('');

    const prompt = `Susunlah sebuah MODUL DAN PANDUAN KEGIATAN KOKURIKULER PENGUATAN KARAKTER "7 KEBIASAAN ANAK INDONESIA HEBAT" untuk:
- Sasaran: Siswa Kelas ${kelas} SMA
- Fokus Kebiasaan: ${fokusKebiasaan}
- Durasi: ${durasiProgram}
- Bentuk Aktivitas: ${bentukAktivitas}

REFERENSI KEBIASAAN WAJIB (7 KEBIASAAN ANAK INDONESIA HEBAT):
1. Bangun Pagi
2. Beribadah
3. Berolahraga
4. Gemar Membaca
5. Makan Sehat & Bergizi
6. Bermasyarakat / Gotong Royong
7. Tidur Cepat / Tepat Waktu

STRUKTUR DOKUMEN RESMI:
1. LATAR BELAKANG & TUJUAN KOKURIKULER (Karakter Pancasila & Pembelajaran Mendalam)
2. MATRIKS PROGRAM MINGGUAN (Aksi nyata per kebiasaan)
3. PETUNJUK PELAKSANAAN BAGI GURU PEMBIMBING & ORANG TUA
4. LEMBAR JURNAL & RUBRIK OBSERVASI HARIAN SISWA (Format tabel siap cetak dengan kriteria skor)
5. MEKANISME APRESIASI DAN REFLEKSI AKHIR PROGRAM.

Sajikan dalam format Markdown terstruktur, inspiratif, dan siap digunakan.`;

    try {
      const res = await aiService.generateContent(prompt);
      setHasilKokurikuler(res);
    } catch {
      setHasilKokurikuler(`# MODUL KOKURIKULER: 7 KEBIASAAN ANAK INDONESIA HEBAT
## PENGUATAN PROFIL PELAJAR & PEMBELAJARAN MENDALAM

### 1. TUJUAN UMUM
Menumbuhkan ekosistem pembiasaan positif yang berakar kuat dalam rutinitas harian peserta didik menuju generasi unggul, bugar, dan berkarakter mulia.

### 2. MATRIKS IMPLEMENTASI 7 KEBIASAAN
1. **Bangun Pagi**: Membangun ritme sirkadian sehat sebelum pukul 05.30.
2. **Beribadah**: Sholat/doa tepat waktu dan refleksi syukur harian.
3. **Berolahraga**: Gerak badan minimal 20 menit per hari.
4. **Gemar Membaca**: Membaca buku non-pelajaran 15 menit per hari.
5. **Makan Sehat**: Membawa bekal bergizi dan minum air putih cukup.
6. **Bermasyarakat**: Aksi bersih lingkungan kelas atau gotong royong warga.
7. **Tidur Tepat Waktu**: Mematikan gadget sebelum pukul 22.00.

### 3. LEMBAR OBSERVASI HARIAN (TABEL PENILAIAN)
| Hari | Bangun Pagi | Beribadah | Olahraga | Membaca | Makan Sehat | Gotong Royong | Tidur Cepat | Paraf Ortu |
|---|---|---|---|---|---|---|---|---|
| Senin | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | ______ |
| Selasa | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | ______ |
| Rabu | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | ______ |
| Kamis | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | ______ |
| Jumat | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | ______ |
| Sabtu | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | ______ |
| Minggu | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | ______ |`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(hasilKokurikuler);
    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Teks disalin!', timer: 1500, showConfirmButton: false });
  };

  return (
    <div className="space-y-6">
      <div className="hidden print:block">
        <PrintHeader title="PANDUAN KOKURIKULER: 7 KEBIASAAN ANAK INDONESIA HEBAT" subtitle={`Kelas: ${kelas} · Penguatan Karakter Profil Pelajar`} />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-500 text-slate-950 rounded-xl shadow-xs">
              <Smile className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              Kokurikuler 7 Kebiasaan Anak Indonesia Hebat
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-sm bg-amber-500 text-slate-950">
                7 HEBAT
              </span>
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Panduan kokurikuler, rubrik observasi harian, dan lembar komitmen pembiasaan karakter peserta didik.
          </p>
        </div>

        {hasilKokurikuler && (
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
              <label className="block font-semibold mb-1">Kelas / Rombel Sasaran</label>
              <select value={kelas} onChange={(e) => setKelas(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold">
                {kelasList.map(k => <option key={k} value={k}>Rombel {k}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1">Fokus Kebiasaan</label>
              <select value={fokusKebiasaan} onChange={(e) => setFokusKebiasaan(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <option value="Semua 7 Kebiasaan Terpadu">Semua 7 Kebiasaan Terpadu</option>
                {KEBIASAAN_LIST.map(k => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1">Durasi Program Kokurikuler</label>
              <input type="text" value={durasiProgram} onChange={(e) => setDurasiProgram(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Bentuk Pelaksanaan & Instrumen</label>
              <input type="text" value={bentukAktivitas} onChange={(e) => setBentukAktivitas(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700" />
            </div>

            <button
              type="button"
              disabled={isLoading}
              onClick={handleGenerate}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
            >
              {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>{isLoading ? 'Menyusun Modul 7 Kebiasaan...' : 'Generate Panduan 7 Kebiasaan'}</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between min-h-[500px]">
          {hasilKokurikuler ? (
            <div className="space-y-4">
              <div className="prose dark:prose-invert max-w-none text-xs leading-relaxed whitespace-pre-wrap font-sans text-slate-800 dark:text-slate-200 max-h-[600px] overflow-y-auto">
                {hasilKokurikuler}
              </div>
              <div className="hidden print:block"><PrintSignature /></div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-400">
              <Smile className="w-12 h-12 text-amber-400/50 mb-3" />
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Modul Belum Disusun</p>
              <p className="text-xs text-slate-500 mt-1">Pilih parameter dan klik tombol generate untuk membuat modul.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
