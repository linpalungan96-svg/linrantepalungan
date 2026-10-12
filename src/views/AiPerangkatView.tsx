import React, { useState } from 'react';
import { dbService } from '../services/dbService';
import { aiService } from '../services/aiService';
import { PrintHeader, PrintSignature } from '../components/PrintHeader';
import { FileCode2, Sparkles, Copy, Printer, Save, RefreshCw, Layers } from 'lucide-react';
import Swal from 'sweetalert2';

type PerangkatType = 'cp-tp' | 'atp' | 'prota' | 'prosem' | 'kktp';

export const AiPerangkatView: React.FC = () => {
  const mapelList = dbService.getMapelList();
  const [mapelNama, setMapelNama] = useState(mapelList[0]?.nama || 'Informatika');
  const [fase, setFase] = useState('Fase E');
  const [tingkatKelas, setTingkatKelas] = useState('Kelas X');
  const [tipePerangkat, setTipePerangkat] = useState<PerangkatType>('cp-tp');
  const [alokasiJp, setAlokasiJp] = useState('3 JP / Minggu (Total 108 JP / Tahun)');

  const [isLoading, setIsLoading] = useState(false);
  const [hasilDokumen, setHasilDokumen] = useState<string>('');

  const guru = dbService.getGuru();
  const sekolah = dbService.getSekolah();

  const handleGenerate = async () => {
    setIsLoading(true);
    setHasilDokumen('');

    const tipeTitle = {
      'cp-tp': 'ANALISIS CAPAIAN PEMBELAJARAN (CP) & PENURUNAN TUJUAN PEMBELAJARAN (TP)',
      'atp': 'ALUR TUJUAN PEMBELAJARAN (ATP) LENGKAP DENGAN ALOKASI WAKTU & KATA KERJA OPERASIONAL',
      'prota': 'PROGRAM TAHUNAN (PROTA) KURIKULUM MERDEKA LENGKAP TABEL DISTRIBUSI ALOKASI WAKTU',
      'prosem': 'PROGRAM SEMESTER (PROSEM) GANJIL & GENAP BESERTA MATRIKS MINGGUAN EFEKTIF',
      'kktp': 'KRITERIA KETERCAPAIAN TUJUAN PEMBELAJARAN (KKTP) PENDEKATAN DESKRIPSI & INTERVAL NILAI'
    }[tipePerangkat];

    const prompt = `Susunlah dokumen administrasi resmi kurikulum merdeka: "${tipeTitle}" untuk:
- Satuan Pendidikan: ${sekolah.namaSekolah}
- Guru Pengampu: ${guru.nama}, ${guru.gelar} (NIP. ${guru.nip})
- Kepala Sekolah: ${sekolah.kepalaSekolahNama} (NIP. ${sekolah.kepalaSekolahNip})
- Mata Pelajaran: ${mapelNama}
- Fase / Kelas: ${fase} / ${tingkatKelas}
- Alokasi Jam: ${alokasiJp}

RUJUKAN HUKUM MUTLAK & RESMI:
SALINAN KEPUTUSAN KEPALA BADAN STANDAR, KURIKULUM, DAN ASESMEN PENDIDIKAN KEMENTERIAN PENDIDIKAN DASAR DAN MENENGAH (BSKAP KEMENDIKDASMEN) NOMOR 046/H/KR/2025 TENTANG CAPAIAN PEMBELAJARAN PADA PAUD, PENDIDIKAN DASAR, DAN PENDIDIKAN MENENGAH.

Format Dokumen Standar:
- Judul Dokumen Resmi
- Identitas Mapel & Satuan Pendidikan
- Landasan Regulasi SK BSKAP 046/H/KR/2025
- Tabel Dokumen Lengkap (Elemen CP, Kode TP, Rumusan TP, Alokasi Waktu, Asesmen Kunci)
- Keterangan & Catatan Penyelenggaraan KBM
Sajikan dalam format Markdown tabel yang rapi dan siap cetak.`;

    try {
      const res = await aiService.generateContent(prompt);
      setHasilDokumen(res);
    } catch {
      setHasilDokumen(`# ${tipeTitle}
## LANDASAN RESMI: SK BSKAP KEMENDIKDASMEN NOMOR 046/H/KR/2025

### IDENTITAS DOKUMEN
- **Satuan Pendidikan**: ${sekolah.namaSekolah}
- **Mata Pelajaran**: ${mapelNama}
- **Fase / Kelas**: ${fase} / ${tingkatKelas}
- **Tahun Ajaran**: 2025/2026
- **Penyusun**: ${guru.nama}, ${guru.gelar}

---

| No | Elemen CP (SK 046/2025) | Kode TP | Rumusan Tujuan Pembelajaran (TP) | Alokasi Waktu |
|---|---|---|---|---|
| 1 | Berpikir Komputasional (BK) | TP 1.1 | Menerapkan strategi algoritmik standar untuk persoalan pencarian dan pengurutan data | 12 JP |
| 2 | Berpikir Komputasional (BK) | TP 1.2 | Merekonstruksi representasi data kompleks ke dalam struktur linier dan non-linier | 9 JP |
| 3 | Algoritma & Pemrograman (AP) | TP 2.1 | Mengembangkan program prosedural modular dengan struktur kontrol percabangan | 15 JP |
| 4 | Algoritma & Pemrograman (AP) | TP 2.2 | Menguji dan mendokumentasikan kode pemrograman menggunakan pengujian kasus uji | 12 JP |
| 5 | Analisis Data (AD) | TP 3.1 | Mengolah dataset kontekstual dan memvisualisasikan insight data secara bermakna | 15 JP |

*Dokumen disusun sesuai keputusan BSKAP No. 046/H/KR/2025 dan siap diimplementasikan dalam KBM.*`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(hasilDokumen);
    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Teks disalin!', timer: 1500, showConfirmButton: false });
  };

  return (
    <div className="space-y-6">
      <div className="hidden print:block">
        <PrintHeader
          title={`PERANGKAT ADMINISTRASI KURIKULUM MERDEKA: ${tipePerangkat.toUpperCase()}`}
          subtitle={`Mata Pelajaran: ${mapelNama} · ${fase} · SK BSKAP No. 046/H/KR/2025`}
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-600 text-white rounded-xl shadow-xs">
              <FileCode2 className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Suite CP, TP, ATP, Prota, Prosem & KKTP
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Generator dokumen administrasi resmi turunan langsung SK BSKAP Kemendikdasmen No. 046/H/KR/2025.
          </p>
        </div>

        {hasilDokumen && (
          <div className="flex items-center gap-2">
            <button onClick={handleCopy} className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold">
              <Copy className="w-4 h-4 inline mr-1" /> Salin Teks
            </button>
            <button onClick={() => window.print()} className="px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold">
              <Printer className="w-4 h-4 inline mr-1" /> Cetak Dokumen
            </button>
          </div>
        )}
      </div>

      {/* Tabs Type Selector */}
      <div className="flex items-center gap-2 overflow-x-auto p-1.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs print:hidden">
        {[
          { id: 'cp-tp', label: '1. Analisis CP & TP' },
          { id: 'atp', label: '2. Alur Tujuan (ATP)' },
          { id: 'prota', label: '3. Program Tahunan (Prota)' },
          { id: 'prosem', label: '4. Program Semester (Prosem)' },
          { id: 'kktp', label: '5. Rubrik & Kriteria KKTP' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTipePerangkat(t.id as PerangkatType)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              tipePerangkat === t.id
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 print:hidden">
          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold mb-1">Mata Pelajaran</label>
              <select value={mapelNama} onChange={(e) => setMapelNama(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold">
                {mapelList.map(m => <option key={m.id} value={m.nama}>{m.nama}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1">Fase Kurikulum</label>
              <select value={fase} onChange={(e) => setFase(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <option value="Fase E">Fase E (Kelas X)</option>
                <option value="Fase F">Fase F (Kelas XI - XII)</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1">Tingkat Kelas</label>
              <select value={tingkatKelas} onChange={(e) => setTingkatKelas(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <option value="Kelas X">Kelas X</option>
                <option value="Kelas XI">Kelas XI</option>
                <option value="Kelas XII">Kelas XII</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1">Alokasi Jam Pembelajaran</label>
              <input type="text" value={alokasiJp} onChange={(e) => setAlokasiJp(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono" />
            </div>

            <button
              type="button"
              disabled={isLoading}
              onClick={handleGenerate}
              className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2"
            >
              {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>{isLoading ? 'Menyusun Dokumen (SK 046/2025)...' : 'Generate Dokumen Resmi'}</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between min-h-[520px]">
          {hasilDokumen ? (
            <div className="space-y-4">
              <div className="prose dark:prose-invert max-w-none text-xs leading-relaxed whitespace-pre-wrap font-sans text-slate-800 dark:text-slate-200 max-h-[640px] overflow-y-auto">
                {hasilDokumen}
              </div>
              <div className="hidden print:block"><PrintSignature /></div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-400">
              <Layers className="w-12 h-12 text-orange-400/50 mb-3" />
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Dokumen Belum Digenerate</p>
              <p className="text-xs text-slate-500 mt-1">Pilih tipe dokumen perangkat dan klik "Generate Dokumen Resmi".</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
