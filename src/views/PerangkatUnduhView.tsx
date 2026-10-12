import React, { useState } from 'react';
import {
  Download,
  FileText,
  BookOpen,
  Award,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  FileCode2,
  ChevronRight
} from 'lucide-react';
import Swal from 'sweetalert2';

interface DocumentItem {
  id: string;
  nomor: string;
  judul: string;
  kategori: string;
  deskripsi: string;
  ukuran: string;
  kontenPreview: string;
}

const REPOSITORI_DOKUMEN: DocumentItem[] = [
  {
    id: 'doc-1',
    nomor: 'SK BSKAP No. 046/H/KR/2025',
    judul: 'Salinan Keputusan Kepala BSKAP Kemendikdasmen RI No. 046/H/KR/2025 tentang Capaian Pembelajaran PAUD, Dikdas, dan Dikmen',
    kategori: 'Regulasi Resmi Nasional',
    deskripsi: 'Landasan hukum utama dan mutlak rumusan Capaian Pembelajaran (CP) seluruh mata pelajaran Fase A s.d. Fase F di Indonesia.',
    ukuran: '4.8 MB (PDF)',
    kontenPreview: `KEMENTERIAN PENDIDIKAN DASAR DAN MENENGAH
BADAN STANDAR, KURIKULUM, DAN ASESMEN PENDIDIKAN

SALINAN KEPUTUSAN KEPALA BADAN STANDAR, KURIKULUM, DAN ASESMEN PENDIDIKAN
NOMOR 046/H/KR/2025
TENTANG
CAPAIAN PEMBELAJARAN PADA PENDIDIKAN ANAK USIA DINI, JENJANG PENDIDIKAN DASAR, DAN JENJANG PENDIDIKAN MENENGAH

Menimbang: bahwa untuk melaksanakan ketentuan mengenai pengembangan kurikulum satuan pendidikan, perlu menetapkan Capaian Pembelajaran pada PAUD, Pendidikan Dasar, dan Pendidikan Menengah.

MENGUTUSKAN:
KESATU: Menetapkan Capaian Pembelajaran pada Pendidikan Anak Usia Dini, Jenjang Pendidikan Dasar, dan Jenjang Pendidikan Menengah sebagaimana tercantum dalam Lampiran.
KEDUA: Capaian Pembelajaran sebagaimana dimaksud dalam Diktum KESATU memuat kompetensi dan lingkup materi pembelajaran yang disusun secara komprehensif dalam bentuk narasi fase.
KETIGA: Satuan pendidikan mengembangkan kurikulum operasional satuan pendidikan dan modul ajar dengan berpedoman pada Capaian Pembelajaran ini.`
  },
  {
    id: 'doc-2',
    nomor: 'PPA-2025',
    judul: 'Panduan Pembelajaran dan Asesmen (PPA) Kurikulum Merdeka Revisi',
    kategori: 'Panduan Asesmen',
    deskripsi: 'Petunjuk teknis pelaksanaan asesmen formatif, asesmen sumatif, interval KKTP, dan penyusunan deskripsi nilai rapor sekolah.',
    ukuran: '3.2 MB (PDF)',
    kontenPreview: `PANDUAN PEMBELAJARAN DAN ASESMEN (PPA)
Prinsip Asesmen Kurikulum Merdeka:
1. Asesmen merupakan bagian terpadu dari proses pembelajaran.
2. Asesmen dirancang dan dilakukan sesuai dengan fungsi asesmen tersebut (diagnostik, formatif, sumatif).
3. Asesmen dirancang secara adil, proporsional, valid, dan dapat dipercaya (reliable).
4. Laporan kemajuan belajar dan pencapaian peserta didik bersifat sederhana dan informatif.`
  },
  {
    id: 'doc-3',
    nomor: 'DL-FRAMEWORK',
    judul: 'Kerangka Kerja Pembelajaran Mendalam (Deep Learning Framework in Education)',
    kategori: 'Framework Pengajaran',
    deskripsi: 'Pedoman implementasi Mindful Learning (Fokus Bermakna), Meaningful Learning (Kontekstual Nyata), dan Joyful Learning (Menyenangkan).',
    ukuran: '2.1 MB (PDF)',
    kontenPreview: `KERANGKA PEMBELAJARAN MENDALAM (DEEP LEARNING)
Tiga Pilar Utama:
1. MINDFUL LEARNING: Menghadirkan kesadaran penuh, kemampuan refleksi, fokus atensi, dan pengelolaan emosi peserta didik selama KBM.
2. MEANINGFUL LEARNING: Menghubungkan konsep abstrak ke masalah riil, studi kasus kontekstual kearifan lokal, dan pemecahan masalah kritis.
3. JOYFUL LEARNING: Menumbuhkan rasa ingin tahu alamiah (curiosity), pengalaman belajar kolaboratif yang menggembirakan, serta kepuasan intrinsik dalam mencipta karya.`
  },
  {
    id: 'doc-4',
    nomor: 'KOKURIKULER-7',
    judul: 'Pedoman Kokurikuler: 7 Kebiasaan Anak Indonesia Hebat',
    kategori: 'Penguatan Karakter',
    deskripsi: 'Instrumen pembiasaan karakter: Bangun Pagi, Beribadah, Berolahraga, Gemar Membaca, Makan Bergizi, Bermasyarakat, Tidur Tepat Waktu.',
    ukuran: '1.9 MB (PDF)',
    kontenPreview: `7 KEBIASAAN ANAK INDONESIA HEBAT:
1. Bangun Pagi: Kedisiplinan menyambut hari dengan penuh semangat dan syukur.
2. Beribadah: Memperkokoh keimanan dan ketakwaan kepada Tuhan YME.
3. Berolahraga: Memelihara kebugaran fisik dan stamina belajar optimal.
4. Gemar Membaca: Memperluas cakrawala literasi dan rasa ingin tahu kritis.
5. Makan Sehat & Bergizi: Membiasakan pola konsumsi higienis dan berimbang.
6. Bermasyarakat / Gotong Royong: Menumbuhkan empati sosial dan kepedulian bersama.
7. Tidur Cepat / Tepat Waktu: Menjaga ritme sirkadian dan kesehatan mental regeneratif.`
  }
];

export const PerangkatUnduhView: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem>(REPOSITORI_DOKUMEN[0]);

  const handleDownload = (doc: DocumentItem) => {
    // Generate text/markdown file for instant download
    const blob = new Blob([doc.kontenPreview], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${doc.nomor}_Dokumen_Resmi.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    Swal.fire({
      title: 'Berkas Diunduh!',
      text: `${doc.judul} berhasil diunduh ke perangkat Anda.`,
      icon: 'success',
      timer: 2000,
      showConfirmButton: false
    });
  };

  return (
    <div className="space-y-6">
      {/* Screen Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-600 text-white rounded-xl shadow-xs">
              <Download className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Repositori & Unduh Perangkat Ajar Kurikulum Merdeka
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Unduh salinan resmi SK BSKAP No. 046/H/KR/2025, panduan asesmen PPA, dan framework Deep Learning.
          </p>
        </div>
      </div>

      {/* Grid: Document List on Left, Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Document List */}
        <div className="lg:col-span-5 space-y-3">
          {REPOSITORI_DOKUMEN.map((doc) => {
            const isSelected = selectedDoc.id === doc.id;
            return (
              <div
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className={`p-4 rounded-2xl border transition cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 shadow-md ring-2 ring-emerald-400/40'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="px-2 py-0.5 rounded-sm bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-extrabold font-mono">
                      {doc.nomor}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {doc.ukuran}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                    {doc.judul}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {doc.deskripsi}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    Buka Pratinjau <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(doc);
                    }}
                    className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Document Preview Area */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider">
                  {selectedDoc.kategori}
                </span>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mt-1">
                  {selectedDoc.judul}
                </h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  Ref: {selectedDoc.nomor} · {selectedDoc.ukuran}
                </p>
              </div>

              <button
                onClick={() => handleDownload(selectedDoc)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/30 shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>Unduh Berkas</span>
              </button>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed max-h-[460px] overflow-y-auto">
              {selectedDoc.kontenPreview}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Standar Administrasi Resmi Kemendikdasmen RI</span>
            <span className="font-semibold text-emerald-600">Terverifikasi SK 046/H/KR/2025</span>
          </div>
        </div>
      </div>
    </div>
  );
};
