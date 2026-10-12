import React, { useState } from 'react';
import { dbService } from '../services/dbService';
import { AgendaKbm } from '../types';
import { PrintHeader, PrintSignature } from '../components/PrintHeader';
import {
  BookCheck,
  Plus,
  Trash2,
  Printer,
  Calendar,
  X,
  CheckCircle2,
  Clock
} from 'lucide-react';
import Swal from 'sweetalert2';

export const AgendaView: React.FC = () => {
  const [agendaList, setAgendaList] = useState<AgendaKbm[]>(dbService.getAgendaList());
  const kelasList = dbService.getKelasList();
  const mapelList = dbService.getMapelList();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState<Omit<AgendaKbm, 'id'>>({
    tanggal: new Date().toISOString().split('T')[0],
    kelas: kelasList[0] || 'X-1',
    jamKe: '1 - 3',
    mapelNama: mapelList[0]?.nama || 'Informatika',
    materiTp: '',
    kegiatanKbm: '',
    hambatan: 'Tidak ada hambatan',
    solusi: 'KBM berjalan lancar',
    status: 'Terlaksana'
  });

  const refreshData = () => {
    setAgendaList(dbService.getAgendaList());
  };

  const handleOpenAdd = () => {
    setFormData({
      tanggal: new Date().toISOString().split('T')[0],
      kelas: kelasList[0] || 'X-1',
      jamKe: '1 - 3',
      mapelNama: mapelList[0]?.nama || 'Informatika',
      materiTp: '',
      kegiatanKbm: '',
      hambatan: 'Tidak ada kendala',
      solusi: 'Kegiatan berjalan sesuai rancangan modul ajar',
      status: 'Terlaksana'
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: 'Hapus Agenda?',
      text: 'Catatan agenda KBM ini akan dihapus.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal'
    }).then(res => {
      if (res.isConfirmed) {
        dbService.deleteAgenda(id);
        refreshData();
        Swal.fire('Terhapus', 'Agenda berhasil dihapus.', 'success');
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.materiTp || !formData.kegiatanKbm) {
      Swal.fire('Perhatian', 'Materi TP dan Kegiatan KBM wajib diisi!', 'warning');
      return;
    }
    dbService.addAgenda(formData);
    setIsModalOpen(false);
    refreshData();
    Swal.fire('Berhasil', 'Catatan agenda KBM berhasil ditambahkan.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Print View Header */}
      <div className="hidden print:block">
        <PrintHeader
          title="BUKU AGENDA & JURNAL MENGAJAR HARIAN GURU"
          subtitle="TAHUN AJARAN 2025/2026 - KURIKULUM MERDEKA"
        />
      </div>

      {/* Screen Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-600 text-white rounded-xl shadow-xs">
              <BookCheck className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Jurnal Agenda Mengajar Harian (Buku Kerja 3)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Catatan autentik keterlaksanaan tatap muka di kelas, refleksi pembelajaran mendalam, hambatan, serta solusi praktis.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition shadow-xs"
          >
            <Printer className="w-4 h-4 text-emerald-600" />
            <span>Cetak Jurnal</span>
          </button>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/30 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Catat Agenda KBM</span>
          </button>
        </div>
      </div>

      {/* Agenda Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-emerald-700 text-white border-b-2 border-emerald-800 uppercase tracking-wider text-[11px] font-bold">
                <th className="py-3 px-3 text-center w-10">No</th>
                <th className="py-3 px-3 w-24">Tanggal</th>
                <th className="py-3 px-3 text-center w-20">Kelas / Jam</th>
                <th className="py-3 px-4 min-w-[200px]">Tujuan Pembelajaran / Materi</th>
                <th className="py-3 px-4 min-w-[240px]">Aktivitas KBM (Deep Learning)</th>
                <th className="py-3 px-3 min-w-[150px]">Hambatan Siswa</th>
                <th className="py-3 px-3 min-w-[150px]">Solusi / Tindak Lanjut</th>
                <th className="py-3 px-3 text-center w-24">Status</th>
                <th className="py-3 px-3 text-center print:hidden w-12">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {agendaList.map((a, idx) => (
                <tr key={a.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition">
                  <td className="py-3 px-3 text-center font-bold text-slate-500">
                    {idx + 1}
                  </td>
                  <td className="py-3 px-3 font-mono font-medium text-slate-900 dark:text-slate-200">
                    {a.tanggal}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 block">
                      {a.kelas}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Jam: {a.jamKe}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white leading-relaxed">
                    {a.materiTp}
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                    {a.kegiatanKbm}
                  </td>
                  <td className="py-3 px-3 text-slate-500 italic">
                    {a.hambatan || '-'}
                  </td>
                  <td className="py-3 px-3 text-emerald-700 dark:text-emerald-400">
                    {a.solusi || '-'}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="px-2 py-0.5 rounded-sm text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      {a.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center print:hidden">
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Print Signature Section */}
      <div className="hidden print:block">
        <PrintSignature />
      </div>

      {/* Modal Add Agenda */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative text-slate-900 dark:text-slate-100 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 rounded-xl">
                <BookCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Catat Agenda KBM Harian</h3>
                <p className="text-xs text-slate-500">
                  Refleksi pembelajaran di kelas Kurikulum Merdeka
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Tanggal KBM</label>
                  <input
                    type="date"
                    required
                    value={formData.tanggal}
                    onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Kelas / Rombel</label>
                  <select
                    value={formData.kelas}
                    onChange={(e) => setFormData({ ...formData, kelas: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
                  >
                    {kelasList.map(k => (
                      <option key={k} value={k}>Rombel {k}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Jam Ke-</label>
                  <input
                    type="text"
                    required
                    value={formData.jamKe}
                    onChange={(e) => setFormData({ ...formData, jamKe: e.target.value })}
                    placeholder="1 - 3"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Mata Pelajaran</label>
                <select
                  value={formData.mapelNama}
                  onChange={(e) => setFormData({ ...formData, mapelNama: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
                >
                  {mapelList.map(m => (
                    <option key={m.id} value={m.nama}>{m.nama}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Tujuan Pembelajaran / Materi Pokok *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.materiTp}
                  onChange={(e) => setFormData({ ...formData, materiTp: e.target.value })}
                  placeholder="Contoh: TP 1.1 Menganalisis algoritma pencarian biner dan linear..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Kegiatan KBM (Pendekatan Deep Learning) *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.kegiatanKbm}
                  onChange={(e) => setFormData({ ...formData, kegiatanKbm: e.target.value })}
                  placeholder="Meaningful / Joyful Learning: Siswa mempraktikkan simulasi di lab komputer..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Hambatan / Kendala Siswa</label>
                  <input
                    type="text"
                    value={formData.hambatan}
                    onChange={(e) => setFormData({ ...formData, hambatan: e.target.value })}
                    placeholder="Contoh: 2 siswa belum paham konsep dasar"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Solusi / Pemecahan</label>
                  <input
                    type="text"
                    value={formData.solusi}
                    onChange={(e) => setFormData({ ...formData, solusi: e.target.value })}
                    placeholder="Contoh: Diberi bimbingan tutor sebaya"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Status Keterlaksanaan</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
                >
                  <option value="Terlaksana">Terlaksana</option>
                  <option value="Tertunda">Tertunda</option>
                  <option value="Daring">Daring</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/30"
                >
                  Simpan Agenda
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
