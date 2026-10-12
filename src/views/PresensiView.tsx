import React, { useState, useEffect } from 'react';
import { dbService } from '../services/dbService';
import { PresensiRecord, PresensiItem, PresensiStatus } from '../types';
import { PrintHeader, PrintSignature } from '../components/PrintHeader';
import {
  CheckCircle2,
  Calendar,
  Save,
  Printer,
  Sparkles,
  Search,
  UserCheck,
  Percent,
  Check
} from 'lucide-react';
import Swal from 'sweetalert2';

export const PresensiView: React.FC = () => {
  const kelasList = dbService.getKelasList();
  const mapelList = dbService.getMapelList();
  const [selectedKelas, setSelectedKelas] = useState(kelasList[0] || 'X-1');
  const [selectedMapelId, setSelectedMapelId] = useState(mapelList[0]?.id || '');
  const [tanggal, setTanggal] = useState(new Date().toISOString().split('T')[0]);
  const [jamKe, setJamKe] = useState('1 - 3');
  const [catatanKbm, setCatatanKbm] = useState('');

  // Items per student
  const siswaListInKelas = dbService.getSiswaList().filter(s => s.kelas === selectedKelas);
  const [items, setItems] = useState<PresensiItem[]>([]);

  // Load existing presensi record if exists
  useEffect(() => {
    const presensiRecords = dbService.getPresensiList();
    const existing = presensiRecords.find(
      p => p.tanggal === tanggal && p.kelas === selectedKelas && p.mapelId === selectedMapelId
    );

    if (existing) {
      setJamKe(existing.jamKe);
      setCatatanKbm(existing.catatanKbm || '');
      // Map existing status or default 'H'
      const mapped = siswaListInKelas.map(s => {
        const item = existing.items.find(i => i.siswaId === s.id);
        return {
          siswaId: s.id,
          status: item ? item.status : ('H' as PresensiStatus),
          keterangan: item ? item.keterangan : ''
        };
      });
      setItems(mapped);
    } else {
      // Default all Hadir
      const defaultItems = siswaListInKelas.map(s => ({
        siswaId: s.id,
        status: 'H' as PresensiStatus,
        keterangan: ''
      }));
      setItems(defaultItems);
    }
  }, [tanggal, selectedKelas, selectedMapelId]);

  const handleStatusChange = (siswaId: string, status: PresensiStatus) => {
    setItems(prev =>
      prev.map(it => (it.siswaId === siswaId ? { ...it, status } : it))
    );
  };

  const handleKeteranganChange = (siswaId: string, ket: string) => {
    setItems(prev =>
      prev.map(it => (it.siswaId === siswaId ? { ...it, keterangan: ket } : it))
    );
  };

  const handleSetSemuaHadir = () => {
    setItems(prev => prev.map(it => ({ ...it, status: 'H' })));
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Semua siswa diatur Hadir (H)',
      showConfirmButton: false,
      timer: 1500
    });
  };

  const handleSave = () => {
    dbService.saveOrUpdatePresensi({
      tanggal,
      kelas: selectedKelas,
      mapelId: selectedMapelId,
      jamKe,
      catatanKbm,
      items
    });

    Swal.fire({
      title: 'Presensi Disimpan!',
      text: `Presensi kelas ${selectedKelas} tanggal ${tanggal} berhasil diperbarui.`,
      icon: 'success',
      confirmButtonColor: '#059669'
    });
  };

  // Stats calculation
  const totalH = items.filter(i => i.status === 'H').length;
  const totalS = items.filter(i => i.status === 'S').length;
  const totalI = items.filter(i => i.status === 'I').length;
  const totalA = items.filter(i => i.status === 'A').length;
  const totalSiswa = items.length;
  const persenHadir = totalSiswa > 0 ? Math.round((totalH / totalSiswa) * 100) : 100;

  return (
    <div className="space-y-6">
      {/* Print View Header */}
      <div className="hidden print:block">
        <PrintHeader
          title="REKAPITULASI PRESENSI KEHADIRAN KBM SISWA"
          subtitle={`Kelas: ${selectedKelas} · Tanggal: ${tanggal} · Jam Ke: ${jamKe}`}
        />
      </div>

      {/* Screen Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-600 text-white rounded-xl shadow-xs">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Presensi & Kehadiran Siswa KBM
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Pencatatan real-time kehadiran harian dengan fitur cepat "Set Semua Hadir" dan rekapitulasi persentase.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSetSemuaHadir}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 hover:bg-emerald-200 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-300 dark:border-emerald-700 transition"
          >
            <UserCheck className="w-4 h-4" />
            <span>Set Semua Hadir</span>
          </button>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition shadow-xs"
          >
            <Printer className="w-4 h-4 text-emerald-600" />
            <span>Cetak Rekap</span>
          </button>

          <button
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/30 transition"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Presensi</span>
          </button>
        </div>
      </div>

      {/* Selectors Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm grid grid-cols-1 sm:grid-cols-4 gap-3 print:hidden">
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
            Kelas / Rombel
          </label>
          <select
            value={selectedKelas}
            onChange={(e) => setSelectedKelas(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold focus:ring-2 focus:ring-emerald-500"
          >
            {kelasList.map(k => (
              <option key={k} value={k}>Rombel {k}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
            Tanggal KBM
          </label>
          <input
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
            Mata Pelajaran
          </label>
          <select
            value={selectedMapelId}
            onChange={(e) => setSelectedMapelId(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
          >
            {mapelList.map(m => (
              <option key={m.id} value={m.id}>{m.nama}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
            Jam Ke- (Sesi)
          </label>
          <input
            type="text"
            value={jamKe}
            onChange={(e) => setJamKe(e.target.value)}
            placeholder="Contoh: 1 - 3"
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 font-mono"
          />
        </div>
      </div>

      {/* Attendance Stats Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center">
          <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 uppercase">Hadir (H)</span>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">{totalH}</p>
        </div>
        <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-center">
          <span className="text-[11px] font-bold text-blue-800 dark:text-blue-300 uppercase">Sakit (S)</span>
          <p className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-0.5">{totalS}</p>
        </div>
        <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-center">
          <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 uppercase">Izin (I)</span>
          <p className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-0.5">{totalI}</p>
        </div>
        <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-center">
          <span className="text-[11px] font-bold text-rose-800 dark:text-rose-300 uppercase">Alpa (A)</span>
          <p className="text-2xl font-black text-rose-600 dark:text-rose-400 mt-0.5">{totalA}</p>
        </div>
        <div className="col-span-2 sm:col-span-1 p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
          <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase">% Kehadiran</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{persenHadir}%</p>
        </div>
      </div>

      {/* Attendance Form Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-emerald-700 text-white border-b-2 border-emerald-800 uppercase tracking-wider text-[11px] font-bold">
                <th className="py-3 px-3 text-center w-12">No</th>
                <th className="py-3 px-3">NISN</th>
                <th className="py-3 px-4">Nama Siswa</th>
                <th className="py-3 px-3 text-center">L/P</th>
                <th className="py-3 px-3 text-center w-48">Status Kehadiran</th>
                <th className="py-3 px-4">Catatan Kedisiplinan / Keterangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {siswaListInKelas.map((siswa, idx) => {
                const item = items.find(it => it.siswaId === siswa.id) || {
                  siswaId: siswa.id,
                  status: 'H' as PresensiStatus,
                  keterangan: ''
                };

                return (
                  <tr
                    key={siswa.id}
                    className="hover:bg-emerald-50/40 dark:hover:bg-slate-800/60 transition"
                  >
                    <td className="py-3 px-3 text-center font-bold text-slate-500">
                      {idx + 1}
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-500">
                      {siswa.nisn}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                      {siswa.nama}
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-slate-500">
                      {siswa.jenisKelamin}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center justify-center gap-1.5">
                        {(['H', 'S', 'I', 'A'] as PresensiStatus[]).map(st => {
                          const isSelected = item.status === st;
                          let activeClass = 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400';
                          if (isSelected) {
                            if (st === 'H') activeClass = 'bg-emerald-600 text-white font-black shadow-xs scale-105';
                            if (st === 'S') activeClass = 'bg-blue-600 text-white font-black shadow-xs scale-105';
                            if (st === 'I') activeClass = 'bg-amber-600 text-white font-black shadow-xs scale-105';
                            if (st === 'A') activeClass = 'bg-rose-600 text-white font-black shadow-xs scale-105';
                          }
                          return (
                            <button
                              key={st}
                              type="button"
                              onClick={() => handleStatusChange(siswa.id, st)}
                              className={`w-8 h-8 rounded-lg font-bold text-xs transition ${activeClass}`}
                            >
                              {st}
                            </button>
                          );
                        })}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="text"
                        value={item.keterangan || ''}
                        onChange={(e) => handleKeteranganChange(siswa.id, e.target.value)}
                        placeholder="Contoh: Izin acara keluarga, Terlambat 10 menit..."
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-1 focus:ring-emerald-500"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Catatan KBM Harian Guru */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          Jurnal Ringkas Dinamika Kelas / Catatan Khusus KBM
        </label>
        <textarea
          rows={2}
          value={catatanKbm}
          onChange={(e) => setCatatanKbm(e.target.value)}
          placeholder="Catatan keaktifan siswa, kondisi sarana lab, atau kejadian khusus selama jam tatap muka..."
          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Print Signature Section */}
      <div className="hidden print:block">
        <PrintSignature />
      </div>
    </div>
  );
};
