import React, { useState } from 'react';
import { dbService } from '../services/dbService';
import { NilaiRecord, KktpConfig, Siswa } from '../types';
import { PrintHeader, PrintSignature } from '../components/PrintHeader';
import {
  GraduationCap,
  Save,
  Printer,
  Sparkles,
  Sliders,
  CheckCircle,
  FileSpreadsheet
} from 'lucide-react';
import Swal from 'sweetalert2';

export const NilaiView: React.FC = () => {
  const kelasList = dbService.getKelasList();
  const mapelList = dbService.getMapelList();
  const [selectedKelas, setSelectedKelas] = useState(kelasList[0] || 'X-1');
  const [selectedMapelId, setSelectedMapelId] = useState(mapelList[0]?.id || '');
  const [kktpConfig, setKktpConfig] = useState<KktpConfig>(dbService.getKktp());
  const [nilaiList, setNilaiList] = useState<NilaiRecord[]>(dbService.getNilaiList());
  const [isKktpModalOpen, setIsKktpModalOpen] = useState(false);

  const siswaListInKelas = dbService.getSiswaList().filter(s => s.kelas === selectedKelas);
  const currentMapel = mapelList.find(m => m.id === selectedMapelId);

  // Calculate predicate & narratives
  const getPredikat = (na: number): 'A' | 'B' | 'C' | 'D' => {
    if (na >= kktpConfig.rangeA) return 'A';
    if (na >= kktpConfig.rangeB) return 'B';
    if (na >= kktpConfig.rangeC) return 'C';
    return 'D';
  };

  const generateNarasi = (nama: string, na: number, mapelNama: string) => {
    if (na >= kktpConfig.rangeA) {
      return {
        tinggi: `Menunjukkan penguasaan sangat istimewa dalam seluruh tujuan pembelajaran ${mapelNama}, penalaran kritis mendalam, dan kreativitas solusi di atas rata-rata.`,
        rendah: `Pertahankan dan kembangkan konsistensi prestasi belajar ini.`
      };
    } else if (na >= kktpConfig.rangeB) {
      return {
        tinggi: `Menunjukkan penguasaan yang baik dalam mengidentifikasi konsep dan mengaplikasikan materi pembelajaran ${mapelNama}.`,
        rendah: `Perlu meningkatkan ketelitian dalam asesmen pemecahan masalah kompleks.`
      };
    } else if (na >= kktpConfig.rangeC) {
      return {
        tinggi: `Cukup menguasai kompetensi dasar pada tujuan pembelajaran ${mapelNama}.`,
        rendah: `Perlu bimbingan dan pendampingan mandiri dalam memperdalam pemahaman konsep fundamental.`
      };
    } else {
      return {
        tinggi: `Mulai menunjukkan pemahaman dalam beberapa aktivitas belajar sederhana.`,
        rendah: `Membutuhkan program bimbingan remedial intensif pada pencapaian tujuan pembelajaran.`
      };
    }
  };

  const handleScoreChange = (
    siswaId: string,
    field: 'f1' | 'f2' | 'f3' | 'mid' | 'akhir',
    value: number
  ) => {
    const val = Math.max(0, Math.min(100, isNaN(value) ? 0 : value));
    const existing = nilaiList.find(
      n => n.siswaId === siswaId && n.mapelId === selectedMapelId && n.kelas === selectedKelas
    );

    const f1 = field === 'f1' ? val : (existing?.formatif[0]?.nilai ?? 80);
    const f2 = field === 'f2' ? val : (existing?.formatif[1]?.nilai ?? 80);
    const f3 = field === 'f3' ? val : (existing?.formatif[2]?.nilai ?? 80);
    const mid = field === 'mid' ? val : (existing?.sumatifMid ?? 80);
    const akhir = field === 'akhir' ? val : (existing?.sumatifAkhir ?? 80);

    // NA Formula: (Avg Formatif * 40%) + (Mid * 30%) + (Akhir * 30%)
    const avgFormatif = (f1 + f2 + f3) / 3;
    const na = Math.round(avgFormatif * 0.4 + mid * 0.3 + akhir * 0.3);
    const predikat = getPredikat(na);

    const siswa = siswaListInKelas.find(s => s.id === siswaId);
    const narasi = generateNarasi(siswa?.nama || 'Siswa', na, currentMapel?.nama || 'Mapel');

    const updatedRecord: NilaiRecord = {
      id: existing ? existing.id : 'nil-' + Date.now() + '-' + siswaId,
      siswaId,
      mapelId: selectedMapelId,
      kelas: selectedKelas,
      semester: 'Genap',
      tahunAjaran: '2025/2026',
      formatif: [
        { tpId: 'tp-1', tpJudul: 'TP 1', nilai: f1 },
        { tpId: 'tp-2', tpJudul: 'TP 2', nilai: f2 },
        { tpId: 'tp-3', tpJudul: 'TP 3', nilai: f3 }
      ],
      sumatifMid: mid,
      sumatifAkhir: akhir,
      nilaiAkhir: na,
      predikat,
      capaianTinggi: narasi.tinggi,
      capaianRendah: narasi.rendah
    };

    dbService.saveNilaiRecord(updatedRecord);
    setNilaiList(dbService.getNilaiList());
  };

  const handleSaveKktp = (e: React.FormEvent) => {
    e.preventDefault();
    dbService.saveKktp(kktpConfig);
    setIsKktpModalOpen(false);
    Swal.fire('Tersimpan', 'Interval KKTP berhasil diperbarui.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Print View Header */}
      <div className="hidden print:block">
        <PrintHeader
          title="LEGER ASESMEN & CAPAIAN KOMPETENSI RAPOR KURIKULUM MERDEKA"
          subtitle={`Mata Pelajaran: ${currentMapel?.nama || ''} · Kelas: ${selectedKelas}`}
        />
      </div>

      {/* Screen Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-600 text-white rounded-xl shadow-xs">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Buku Nilai Digital & Leger Raport
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Penilaian Formatif, Sumatif (STS & SAS), Nilai Akhir (NA), dan Otomatisasi Narasi Deskripsi Rapor Kurikulum Merdeka (SK BSKAP 046/H/KR/2025).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsKktpModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition shadow-xs"
          >
            <Sliders className="w-4 h-4 text-emerald-600" />
            <span>Atur KKTP (Min: {kktpConfig.kktpMinimal})</span>
          </button>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/30 transition"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Leger Nilai</span>
          </button>
        </div>
      </div>

      {/* Selectors Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
              Kelas / Rombel
            </label>
            <select
              value={selectedKelas}
              onChange={(e) => setSelectedKelas(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold"
            >
              {kelasList.map(k => (
                <option key={k} value={k}>Rombel {k}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
              Mata Pelajaran
            </label>
            <select
              value={selectedMapelId}
              onChange={(e) => setSelectedMapelId(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold"
            >
              {mapelList.map(m => (
                <option key={m.id} value={m.id}>{m.nama}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> A: ≥{kktpConfig.rangeA}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> B: ≥{kktpConfig.rangeB}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> C: ≥{kktpConfig.rangeC}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> D: &lt;{kktpConfig.rangeC}
          </span>
        </div>
      </div>

      {/* Leger Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-emerald-800 text-white border-b-2 border-emerald-900 uppercase tracking-wider text-[11px] font-bold">
                <th className="py-3 px-3 text-center w-10">No</th>
                <th className="py-3 px-3">NISN</th>
                <th className="py-3 px-4 min-w-[160px]">Nama Siswa</th>
                <th className="py-3 px-2 text-center w-14">F1 (TP1)</th>
                <th className="py-3 px-2 text-center w-14">F2 (TP2)</th>
                <th className="py-3 px-2 text-center w-14">F3 (TP3)</th>
                <th className="py-3 px-2 text-center w-14">STS Mid</th>
                <th className="py-3 px-2 text-center w-14">SAS Akhir</th>
                <th className="py-3 px-2 text-center w-14 bg-emerald-900">NA</th>
                <th className="py-3 px-2 text-center w-10">Pred</th>
                <th className="py-3 px-4 min-w-[240px]">Deskripsi Capaian Kompetensi (Rapor)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {siswaListInKelas.map((siswa, idx) => {
                const record = nilaiList.find(
                  n => n.siswaId === siswa.id && n.mapelId === selectedMapelId && n.kelas === selectedKelas
                );
                const f1 = record?.formatif[0]?.nilai ?? 80;
                const f2 = record?.formatif[1]?.nilai ?? 80;
                const f3 = record?.formatif[2]?.nilai ?? 80;
                const mid = record?.sumatifMid ?? 80;
                const akhir = record?.sumatifAkhir ?? 80;
                const na = record?.nilaiAkhir ?? 80;
                const pred = record?.predikat ?? 'B';
                const narasiTinggi = record?.capaianTinggi || `Menunjukkan penguasaan kompetensi dengan sangat baik.`;

                return (
                  <tr
                    key={siswa.id}
                    className="hover:bg-emerald-50/30 dark:hover:bg-slate-800/60 transition"
                  >
                    <td className="py-3 px-3 text-center font-bold text-slate-500">
                      {idx + 1}
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-400">
                      {siswa.nisn}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                      {siswa.nama}
                    </td>
                    {/* Formatif Inputs */}
                    <td className="py-2 px-1 text-center">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={f1}
                        onChange={(e) => handleScoreChange(siswa.id, 'f1', Number(e.target.value))}
                        className="w-12 text-center py-1 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-semibold"
                      />
                    </td>
                    <td className="py-2 px-1 text-center">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={f2}
                        onChange={(e) => handleScoreChange(siswa.id, 'f2', Number(e.target.value))}
                        className="w-12 text-center py-1 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-semibold"
                      />
                    </td>
                    <td className="py-2 px-1 text-center">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={f3}
                        onChange={(e) => handleScoreChange(siswa.id, 'f3', Number(e.target.value))}
                        className="w-12 text-center py-1 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-semibold"
                      />
                    </td>
                    {/* Sumatif Inputs */}
                    <td className="py-2 px-1 text-center">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={mid}
                        onChange={(e) => handleScoreChange(siswa.id, 'mid', Number(e.target.value))}
                        className="w-12 text-center py-1 rounded border border-slate-200 dark:border-slate-700 bg-blue-50/50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-mono font-bold"
                      />
                    </td>
                    <td className="py-2 px-1 text-center">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={akhir}
                        onChange={(e) => handleScoreChange(siswa.id, 'akhir', Number(e.target.value))}
                        className="w-12 text-center py-1 rounded border border-slate-200 dark:border-slate-700 bg-blue-50/50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-mono font-bold"
                      />
                    </td>
                    {/* Nilai Akhir & Predikat */}
                    <td className="py-3 px-2 text-center font-black font-mono text-emerald-600 dark:text-emerald-400 text-sm bg-emerald-50/50 dark:bg-emerald-950/30">
                      {na}
                    </td>
                    <td className="py-3 px-2 text-center font-black">
                      <span
                        className={`inline-block px-1.5 py-0.5 rounded text-[10px] ${
                          pred === 'A'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : pred === 'B'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                            : pred === 'C'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                            : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        }`}
                      >
                        {pred}
                      </span>
                    </td>
                    {/* Narasi Rapor */}
                    <td className="py-3 px-4 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                      {narasiTinggi}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Print Signature Section */}
      <div className="hidden print:block">
        <PrintSignature />
      </div>

      {/* Modal KKTP Settings */}
      {isKktpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl relative text-slate-900 dark:text-slate-100">
            <h3 className="text-base font-bold mb-4 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-emerald-600" />
              Kriteria Ketercapaian Tujuan Pembelajaran (KKTP)
            </h3>
            <form onSubmit={handleSaveKktp} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">KKTP Batas Tuntas Minimal</label>
                <input
                  type="number"
                  min={50}
                  max={90}
                  value={kktpConfig.kktpMinimal}
                  onChange={(e) => setKktpConfig({ ...kktpConfig, kktpMinimal: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Ambang Predikat A</label>
                  <input
                    type="number"
                    value={kktpConfig.rangeA}
                    onChange={(e) => setKktpConfig({ ...kktpConfig, rangeA: Number(e.target.value) })}
                    className="w-full px-2 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Ambang Predikat B</label>
                  <input
                    type="number"
                    value={kktpConfig.rangeB}
                    onChange={(e) => setKktpConfig({ ...kktpConfig, rangeB: Number(e.target.value) })}
                    className="w-full px-2 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Ambang Predikat C</label>
                  <input
                    type="number"
                    value={kktpConfig.rangeC}
                    onChange={(e) => setKktpConfig({ ...kktpConfig, rangeC: Number(e.target.value) })}
                    className="w-full px-2 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsKktpModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold"
                >
                  Simpan KKTP
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
