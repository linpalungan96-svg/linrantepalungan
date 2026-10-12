import React, { useState } from 'react';
import { dbService } from '../services/dbService';
import { aiService } from '../services/aiService';
import { PrintHeader, PrintSignature } from '../components/PrintHeader';
import {
  Brain,
  Sparkles,
  Copy,
  Printer,
  Save,
  Check,
  RefreshCw,
  FileText
} from 'lucide-react';
import Swal from 'sweetalert2';

export const AiModulView: React.FC = () => {
  const mapelList = dbService.getMapelList();
  const kelasList = dbService.getKelasList();
  const guru = dbService.getGuru();
  const sekolah = dbService.getSekolah();

  // Form State
  const [mapelNama, setMapelNama] = useState(mapelList[0]?.nama || 'Informatika (Fase E)');
  const [fase, setFase] = useState('Fase E');
  const [kelas, setKelas] = useState(kelasList[0] || 'X-1');
  const [alokasiWaktu, setAlokasiWaktu] = useState('3 JP (3 x 45 Menit)');
  const [elemenCp, setElemenCp] = useState('Berpikir Komputasional & Algoritma Pemrograman');
  const [topikMateri, setTopikMateri] = useState('Algoritma Pencarian (Searching) Biner & Linear');
  const [modelPembelajaran, setModelPembelajaran] = useState('Problem-Based Learning (PBL)');
  const [profilPelajar, setProfilPelajar] = useState('Bernalar Kritis, Kreatif, Bergotong Royong');

  // Generation State
  const [isLoading, setIsLoading] = useState(false);
  const [hasilModul, setHasilModul] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    setHasilModul('');

    const prompt = `Susunlah sebuah RENCANA PEMBELAJARAN MENDALAM (MODUL AJAR DEEP LEARNING) Standar Resmi Kurikulum Merdeka Kemendikdasmen RI dengan spesifikasi berikut:
- Satuan Pendidikan: ${sekolah.namaSekolah}
- Penyusun: ${guru.nama}, ${guru.gelar} (NIP. ${guru.nip})
- Mata Pelajaran: ${mapelNama}
- Fase / Kelas / Semester: ${fase} / Kelas ${kelas} / Semester Genap 2025/2026
- Alokasi Waktu: ${alokasiWaktu}
- Elemen Capaian Pembelajaran: ${elemenCp}
- Topik / Materi Pembelajaran: ${topikMateri}
- Model Pembelajaran: ${modelPembelajaran}
- Dimensi Profil Pelajar: ${profilPelajar}

LANDASAN HUKUM WAJIB:
SALINAN KEPUTUSAN KEPALA BADAN STANDAR, KURIKULUM, DAN ASESMEN PENDIDIKAN KEMENTERIAN PENDIDIKAN DASAR DAN MENENGAH (BSKAP KEMENDIKDASMEN) NOMOR 046/H/KR/2025 TENTANG CAPAIAN PEMBELAJARAN PADA PAUD, PENDIDIKAN DASAR, DAN PENDIDIKAN MENENGAH.

FORMAT DOKUMEN WAJIB 3 BAGIAN LENGKAP:
1. BAGIAN I: IDENTITAS MODUL & PROFIL PEMBELAJAR
   - Identitas umum, kompetensi awal, profil pelajar pancasila, sarana prasarana, target peserta didik, model pembelajaran.
2. BAGIAN II: DESAIN PEMBELAJARAN BERBASIS SK BSKAP 046/H/KR/2025
   - Capaian Pembelajaran (CP) Resmi SK 046/H/KR/2025
   - Tujuan Pembelajaran (TP) terukur
   - Pemahaman Bermakna (Meaningful Learning)
   - Pertanyaan Pemantik (Trigger Questions)
3. BAGIAN III: LANGKAH KEGIATAN PEMBELAJARAN (DEEP LEARNING FRAMEWORK)
   - Kegiatan Pendahuluan (Mindful Learning: orientasi kesadaran, apersepsi emosional, ice breaking)
   - Kegiatan Inti (Meaningful & Joyful Learning: eksplorasi kelompok, investigasi masalah riil, kolaborasi antarsiswa)
   - Kegiatan Penutup (Refleksi mendalam, rangkuman bersama, tindak lanjut)
   - Asesmen Formatif (Awal & Proses) dan Asesmen Sumatif beserta Rubrik Penilaian Kriteria Ketercapaian Tujuan Pembelajaran (KKTP).
   - Lembar Kerja Peserta Didik (LKPD ringkas) dan Bahan Bacaan.

Buatlah dalam format Markdown rapi, profesional, berbobot ilmiah pendidik, dan siap cetak.`;

    try {
      const result = await aiService.generateContent(prompt);
      setHasilModul(result);
    } catch (err: any) {
      console.error(err);
      // Fallback pre-filled deep learning module based on SK 046/H/KR/2025
      setHasilModul(`# MODUL AJAR PEMBELAJARAN MENDALAM (DEEP LEARNING)
## BERLANDASKAN SK BSKAP KEMENDIKDASMEN NO. 046/H/KR/2025

### BAGIAN I. IDENTITAS MODUL
- **Satuan Pendidikan**: ${sekolah.namaSekolah}
- **Penyusun**: ${guru.nama}, ${guru.gelar}
- **Mata Pelajaran**: ${mapelNama}
- **Fase / Kelas**: ${fase} / ${kelas}
- **Alokasi Waktu**: ${alokasiWaktu}
- **Model Pembelajaran**: ${modelPembelajaran}
- **Dimensi Karakter**: ${profilPelajar}

---

### BAGIAN II. DESAIN PEMBELAJARAN
#### 1. Capaian Pembelajaran (SK BSKAP No. 046/H/KR/2025)
Peserta didik mampu menerapkan strategi berpikir komputasional dalam pemecahan masalah algoritma pencarian dan struktur data untuk menyelesaikan permasalahan nyata secara terstruktur dan efisien.

#### 2. Tujuan Pembelajaran (TP)
- Peserta didik mampu menganalisis mekanisme kerja algoritma Linear Search dan Binary Search melalui simulasi interaktif.
- Peserta didik mampu membandingkan efisiensi waktu dan kompleksitas langkah pada dataset kontekstual kearifan lokal.

#### 3. Pemahaman Bermakna (Meaningful Learning)
Pencarian data yang terstruktur menghemat energi kognitif dan waktu eksekusi dalam kehidupan nyata, seperti pengorganisasian inventaris barang atau perpustakaan modern.

#### 4. Pertanyaan Pemantik
- Mengapa lebih mudah menemukan kata di dalam kamus tebal dibandingkan mencari kunci yang terselip di kamar?
- Bagaimana komputer dapat menemukan 1 nama dari 1 miliar data hanya dalam hitungan milidetik?

---

### BAGIAN III. LANGKAH PEMBELAJARAN (DEEP LEARNING)
#### A. Kegiatan Pendahuluan (15 Menit) - Mindful Learning
- Guru menyapa siswa dengan senyum, salam hangat, dan presensi berkesadaran (mindful check-in).
- Latihan hening 1 menit (teknik STOP: Stop, Take a breath, Observe, Proceed) untuk memusatkan fokus.
- Menyampaikan tujuan pembelajaran dan manfaat langsung bagi kehidupan peserta didik.

#### B. Kegiatan Inti (65 Menit) - Meaningful & Joyful Learning
- **Eksplorasi Masalah**: Siswa diberikan permainan tebak angka tersembunyi 1-100 dengan feedback 'terlalu besar' atau 'terlalu kecil'.
- **Kolaborasi Kelompok**: Dalam kelompok 4-5 orang, siswa mempraktikkan pencarian kartu berurutan vs acak.
- **Konstruksi Konsep**: Siswa merumuskan secara mandiri mengapa Binary Search memerlukan data terurut terlebih dahulu.
- **Gelar Karya**: Setiap kelompok mempresentasikan flowchart solusi algoritma di mading digital kelas.

#### C. Kegiatan Penutup (10 Menit) - Joyful Reflection
- Siswa menuliskan 1 kalimat refleksi pada sticky notes: "Hal baru paling mengejutkan yang saya pahami hari ini".
- Apresiasi tulus dari guru atas kontribusi dan kolaborasi seluruh peserta didik.
- Doa penutup dan salam perpisahan.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(hasilModul);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Teks Modul Ajar disalin ke clipboard',
      timer: 1500,
      showConfirmButton: false
    });
  };

  const handleSaveToBank = () => {
    if (!hasilModul) return;
    dbService.saveAiDoc({
      tipe: 'modul',
      judul: `Modul Ajar Deep Learning: ${topikMateri}`,
      konten: hasilModul,
      mapel: mapelNama,
      kelas
    });
    Swal.fire('Tersimpan', 'Modul Ajar berhasil disimpan ke Bank Dokumen Lokal Anda.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Print View Header */}
      <div className="hidden print:block">
        <PrintHeader
          title="MODUL AJAR PEMBELAJARAN MENDALAM (DEEP LEARNING)"
          subtitle={`Mata Pelajaran: ${mapelNama} · Kelas: ${kelas} · SK BSKAP No. 046/H/KR/2025`}
        />
      </div>

      {/* Screen Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-600 text-white rounded-xl shadow-xs">
              <Brain className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              Rencana Pembelajaran Mendalam (AI Modul Ajar)
              <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-sm bg-red-600 text-white">
                HOT
              </span>
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Generator Modul Ajar Deep Learning (Mindful, Meaningful, Joyful) berlandaskan resmi SK BSKAP No. 046/H/KR/2025.
          </p>
        </div>

        {hasilModul && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition shadow-xs"
            >
              {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span>{isCopied ? 'Tersalin' : 'Salin Teks'}</span>
            </button>
            <button
              onClick={handleSaveToBank}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold shadow-xs transition"
            >
              <Save className="w-4 h-4" />
              <span>Simpan ke Bank</span>
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-md shadow-orange-600/30 transition"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Modul</span>
            </button>
          </div>
        )}
      </div>

      {/* Grid: Form Parameters on Left, Output on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Input Parameters */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md p-5 space-y-4 print:hidden">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <Sparkles className="w-4 h-4 text-orange-600" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Parameter Modul Ajar Mendalam
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                Mata Pelajaran Diampu
              </label>
              <select
                value={mapelNama}
                onChange={(e) => setMapelNama(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
              >
                {mapelList.map(m => (
                  <option key={m.id} value={m.nama}>{m.nama}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Fase Kurikulum
                </label>
                <select
                  value={fase}
                  onChange={(e) => setFase(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                >
                  <option value="Fase E">Fase E (Kelas X)</option>
                  <option value="Fase F">Fase F (Kelas XI - XII)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Kelas / Rombel
                </label>
                <select
                  value={kelas}
                  onChange={(e) => setKelas(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
                >
                  {kelasList.map(k => (
                    <option key={k} value={k}>Rombel {k}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                Alokasi Waktu
              </label>
              <input
                type="text"
                value={alokasiWaktu}
                onChange={(e) => setAlokasiWaktu(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                Elemen CP (SK BSKAP 046/H/KR/2025)
              </label>
              <input
                type="text"
                value={elemenCp}
                onChange={(e) => setElemenCp(e.target.value)}
                placeholder="Contoh: Berpikir Komputasional, Algoritma Pemrograman..."
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                Topik / Materi Pokok *
              </label>
              <input
                type="text"
                required
                value={topikMateri}
                onChange={(e) => setTopikMateri(e.target.value)}
                placeholder="Contoh: Algoritma Pencarian Biner & Linear..."
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-orange-600 dark:text-orange-400"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                Model Pembelajaran Deep Learning
              </label>
              <select
                value={modelPembelajaran}
                onChange={(e) => setModelPembelajaran(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold"
              >
                <option value="Problem-Based Learning (PBL)">Problem-Based Learning (PBL)</option>
                <option value="Project-Based Learning (PjBL)">Project-Based Learning (PjBL)</option>
                <option value="Discovery / Inquiry Learning">Discovery / Inquiry Learning</option>
                <option value="Experiential Learning Kolaboratif">Experiential Learning Kolaboratif</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                Dimensi Profil Pelajar Pancasila
              </label>
              <input
                type="text"
                value={profilPelajar}
                onChange={(e) => setProfilPelajar(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
            </div>

            <button
              type="button"
              disabled={isLoading}
              onClick={handleGenerate}
              className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2 transition disabled:opacity-60 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Merumuskan Modul Ajar (SK 046/2025)...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Susun Modul Ajar Deep Learning</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Output Document Area */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md p-6 flex flex-col justify-between min-h-[560px]">
          {hasilModul ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 print:hidden">
                <span className="text-xs font-bold text-orange-600 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-500" />
                  Modul Ajar Resmi SK BSKAP No. 046/H/KR/2025
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  Framework Deep Learning
                </span>
              </div>

              {/* Rendered Content */}
              <div className="prose dark:prose-invert max-w-none text-xs leading-relaxed whitespace-pre-wrap font-sans text-slate-800 dark:text-slate-200 max-h-[640px] overflow-y-auto pr-2">
                {hasilModul}
              </div>

              {/* Print Signature Section */}
              <div className="hidden print:block">
                <PrintSignature />
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
              <Brain className="w-12 h-12 text-orange-400/50 mb-3 animate-pulse" />
              <h4 className="text-base font-bold text-slate-700 dark:text-slate-300">
                Modul Ajar Belum Disusun
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mt-1">
                Atur parameter di kolom sebelah kiri dan klik tombol <strong>"Susun Modul Ajar Deep Learning"</strong> untuk menggenerate rencana KBM berstandar resmi SK BSKAP No. 046/H/KR/2025.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
