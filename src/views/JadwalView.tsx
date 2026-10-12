import React, { useState } from 'react';
import { dbService } from '../services/dbService';
import { Jadwal } from '../types';
import { PrintHeader, PrintSignature } from '../components/PrintHeader';
import {
  CalendarDays,
  Plus,
  Edit2,
  Trash2,
  Printer,
  Clock,
  MapPin,
  X,
  BookOpen
} from 'lucide-react';
import Swal from 'sweetalert2';

const DAYS: Jadwal['hari'][] = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

export const JadwalView: React.FC = () => {
  const [jadwalList, setJadwalList] = useState<Jadwal[]>(dbService.getJadwalList());
  const [selectedHari, setSelectedHari] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJadwal, setEditingJadwal] = useState<Jadwal | null>(null);

  const mapelList = dbService.getMapelList();
  const kelasList = dbService.getKelasList();

  const [formData, setFormData] = useState<Omit<Jadwal, 'id'>>({
    hari: 'Senin',
    jamMulai: '07:30',
    jamSelesai: '09:45',
    jamKe: '1 - 3',
    mapelId: mapelList[0]?.id || '',
    mapelNama: mapelList[0]?.nama || '',
    kelas: kelasList[0] || 'X-1',
    ruang: 'Lab Komputer 1'
  });

  const refreshData = () => {
    setJadwalList(dbService.getJadwalList());
  };

  const handleOpenAdd = () => {
    setEditingJadwal(null);
    setFormData({
      hari: 'Senin',
      jamMulai: '07:30',
      jamSelesai: '09:45',
      jamKe: '1 - 3',
      mapelId: mapelList[0]?.id || '',
      mapelNama: mapelList[0]?.nama || '',
      kelas: kelasList[0] || 'X-1',
      ruang: 'Lab Komputer 1'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (jadwal: Jadwal) => {
    setEditingJadwal(jadwal);
    setFormData({
      hari: jadwal.hari,
      jamMulai: jadwal.jamMulai,
      jamSelesai: jadwal.jamSelesai,
      jamKe: jadwal.jamKe,
      mapelId: jadwal.mapelId,
      mapelNama: jadwal.mapelNama,
      kelas: jadwal.kelas,
      ruang: jadwal.ruang
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: 'Hapus Sesi Jadwal?',
      text: 'Sesi jadwal KBM ini akan dihapus dari daftar.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal'
    }).then(res => {
      if (res.isConfirmed) {
        dbService.deleteJadwal(id);
        refreshData();
        Swal.fire('Terhapus', 'Jadwal berhasil dihapus.', 'success');
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedMapel = mapelList.find(m => m.id === formData.mapelId);
    const dataToSave = {
      ...formData,
      mapelNama: selectedMapel ? selectedMapel.nama : formData.mapelNama
    };

    if (editingJadwal) {
      dbService.updateJadwal(editingJadwal.id, dataToSave);
      Swal.fire('Berhasil', 'Jadwal berhasil diperbarui.', 'success');
    } else {
      dbService.addJadwal(dataToSave);
      Swal.fire('Berhasil', 'Sesi jadwal baru berhasil ditambahkan.', 'success');
    }

    setIsModalOpen(false);
    refreshData();
  };

  const filteredJadwal = jadwalList.filter(j =>
    selectedHari === 'all' ? true : j.hari === selectedHari
  );

  return (
    <div className="space-y-6">
      {/* Print View Header */}
      <div className="hidden print:block">
        <PrintHeader
          title="JADWAL MENGAJAR GURU TAHUN AJARAN 2025/2026"
          subtitle="SMA NEGERI 1 TANA TORAJA - KURIKULUM MERDEKA"
        />
      </div>

      {/* Screen Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-rose-600 text-white rounded-xl shadow-xs">
              <CalendarDays className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Jadwal Pelajaran KBM Mingguan
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Penetapan jam mengajar dengan form dropdown dinamis untuk kelas & rombel terintegrasi.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition shadow-xs"
          >
            <Printer className="w-4 h-4 text-rose-600" />
            <span>Cetak Jadwal</span>
          </button>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/30 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Sesi Jadwal</span>
          </button>
        </div>
      </div>

      {/* Days Tabs Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs print:hidden">
        <button
          onClick={() => setSelectedHari('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            selectedHari === 'all'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Semua Hari ({jadwalList.length})
        </button>
        {DAYS.map((hari) => {
          const count = jadwalList.filter(j => j.hari === hari).length;
          return (
            <button
              key={hari}
              onClick={() => setSelectedHari(hari)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedHari === hari
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {hari} ({count})
            </button>
          );
        })}
      </div>

      {/* Weekly Schedule Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredJadwal.length > 0 ? (
          filteredJadwal.map((j) => (
            <div
              key={j.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-3 hover:border-rose-400 transition"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-xs font-bold">
                  {j.hari}
                </span>
                <span className="font-mono text-xs font-bold text-slate-500">
                  Jam Ke: {j.jamKe}
                </span>
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                  {j.mapelNama}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-black text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-md border border-rose-200 dark:border-rose-800">
                    Kelas {j.kelas}
                  </span>
                  <span className="text-slate-400 text-xs">·</span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {j.ruang}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-1.5 font-mono">
                  <Clock className="w-3.5 h-3.5 text-rose-500" />
                  <span>{j.jamMulai} - {j.jamSelesai}</span>
                </div>

                <div className="flex items-center gap-1 print:hidden">
                  <button
                    onClick={() => handleOpenEdit(j)}
                    className="p-1 rounded-lg text-slate-500 hover:text-rose-600 transition"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(j.id)}
                    className="p-1 rounded-lg text-slate-400 hover:text-red-600 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-6 text-slate-400">
            <CalendarDays className="w-10 h-10 mx-auto mb-2 text-slate-300" />
            <p className="text-sm font-semibold">Tidak ada jadwal KBM pada hari ini.</p>
            <button
              onClick={handleOpenAdd}
              className="mt-3 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold"
            >
              Tambah Sesi Sekarang
            </button>
          </div>
        )}
      </div>

      {/* Print Signature Section */}
      <div className="hidden print:block">
        <PrintSignature />
      </div>

      {/* Modal Add / Edit Jadwal with Dynamic Dropdown for Kelas/Rombel */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl relative text-slate-900 dark:text-slate-100">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 bg-rose-100 dark:bg-rose-950/60 text-rose-600 rounded-xl">
                <CalendarDays className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold">
                  {editingJadwal ? 'Edit Sesi Jadwal' : 'Tambah Sesi Jadwal KBM'}
                </h3>
                <p className="text-xs text-slate-500">
                  Dropdown kelas otomatis disinkronkan dengan data siswa
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Hari Pelaksanaan</label>
                  <select
                    value={formData.hari}
                    onChange={(e) => setFormData({ ...formData, hari: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-rose-500 font-semibold"
                  >
                    {DAYS.map(h => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>

                {/* MANDATORY DYNAMIC DROPDOWN FOR KELAS / ROMBEL */}
                <div>
                  <label className="block font-semibold mb-1 text-rose-600 dark:text-rose-400">
                    Kelas / Rombel (Dropdown Dinamis) *
                  </label>
                  <select
                    required
                    value={formData.kelas}
                    onChange={(e) => setFormData({ ...formData, kelas: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border-2 border-rose-300 dark:border-rose-700 bg-rose-50/50 dark:bg-rose-950/40 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-rose-500 font-bold"
                  >
                    {kelasList.map(k => (
                      <option key={k} value={k}>
                        Rombel {k}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Mata Pelajaran</label>
                <select
                  value={formData.mapelId}
                  onChange={(e) => setFormData({ ...formData, mapelId: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-rose-500 font-bold"
                >
                  {mapelList.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.nama} ({m.fase} - {m.kode})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Jam Mulai</label>
                  <input
                    type="time"
                    required
                    value={formData.jamMulai}
                    onChange={(e) => setFormData({ ...formData, jamMulai: e.target.value })}
                    className="w-full px-2 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-rose-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Jam Selesai</label>
                  <input
                    type="time"
                    required
                    value={formData.jamSelesai}
                    onChange={(e) => setFormData({ ...formData, jamSelesai: e.target.value })}
                    className="w-full px-2 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-rose-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Jam Ke-</label>
                  <input
                    type="text"
                    required
                    value={formData.jamKe}
                    onChange={(e) => setFormData({ ...formData, jamKe: e.target.value })}
                    placeholder="1 - 3"
                    className="w-full px-2 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-rose-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Ruang / Laboratorium</label>
                <input
                  type="text"
                  required
                  value={formData.ruang}
                  onChange={(e) => setFormData({ ...formData, ruang: e.target.value })}
                  placeholder="Contoh: Lab Komputer 1, Ruang Kelas X-1"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-rose-500"
                />
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
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-md shadow-rose-600/30"
                >
                  {editingJadwal ? 'Simpan Perubahan' : 'Tambahkan Jadwal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
