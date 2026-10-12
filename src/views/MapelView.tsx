import React, { useState } from 'react';
import { dbService } from '../services/dbService';
import { Mapel } from '../types';
import { PrintHeader, PrintSignature } from '../components/PrintHeader';
import { BookOpen, Plus, Edit2, Trash2, Layers, CheckCircle2, X, Printer } from 'lucide-react';
import Swal from 'sweetalert2';

export const MapelView: React.FC = () => {
  const [mapelList, setMapelList] = useState<Mapel[]>(dbService.getMapelList());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMapel, setEditingMapel] = useState<Mapel | null>(null);

  const [formData, setFormData] = useState<Omit<Mapel, 'id'>>({
    kode: '',
    nama: '',
    fase: 'Fase E',
    tingkatKelas: 'Kelas X',
    alokasiJp: 3,
    capaianUmum: '',
    elemenList: []
  });

  const [newElemen, setNewElemen] = useState('');

  const refreshData = () => {
    setMapelList(dbService.getMapelList());
  };

  const handleOpenAdd = () => {
    setEditingMapel(null);
    setFormData({
      kode: '',
      nama: '',
      fase: 'Fase E',
      tingkatKelas: 'Kelas X',
      alokasiJp: 3,
      capaianUmum: '',
      elemenList: ['Elemen 1', 'Elemen 2']
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (mapel: Mapel) => {
    setEditingMapel(mapel);
    setFormData({
      kode: mapel.kode,
      nama: mapel.nama,
      fase: mapel.fase,
      tingkatKelas: mapel.tingkatKelas,
      alokasiJp: mapel.alokasiJp,
      capaianUmum: mapel.capaianUmum,
      elemenList: [...mapel.elemenList]
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, nama: string) => {
    Swal.fire({
      title: 'Hapus Mata Pelajaran?',
      text: `Hapus mata pelajaran "${nama}" dari daftar?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal'
    }).then(res => {
      if (res.isConfirmed) {
        dbService.deleteMapel(id);
        refreshData();
        Swal.fire('Terhapus', 'Mata pelajaran dihapus.', 'success');
      }
    });
  };

  const handleAddElemen = () => {
    if (!newElemen.trim()) return;
    setFormData({
      ...formData,
      elemenList: [...formData.elemenList, newElemen.trim()]
    });
    setNewElemen('');
  };

  const handleRemoveElemen = (index: number) => {
    setFormData({
      ...formData,
      elemenList: formData.elemenList.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama || !formData.kode) {
      Swal.fire('Perhatian', 'Kode dan Nama Mapel wajib diisi!', 'warning');
      return;
    }

    if (editingMapel) {
      dbService.updateMapel(editingMapel.id, formData);
      Swal.fire('Berhasil', 'Mata pelajaran berhasil diperbarui.', 'success');
    } else {
      dbService.addMapel(formData);
      Swal.fire('Berhasil', 'Mata pelajaran baru ditambahkan.', 'success');
    }

    setIsModalOpen(false);
    refreshData();
  };

  return (
    <div className="space-y-6">
      {/* Print View Header */}
      <div className="hidden print:block">
        <PrintHeader
          title="DAFTAR MATA PELAJARAN & LINGKUP ELEMEN CAPAIAN PEMBELAJARAN"
          subtitle="SK BSKAP KEMENDIKDASMEN NO. 046/H/KR/2025"
        />
      </div>

      {/* Screen Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-600 text-white rounded-xl shadow-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Materi & Mata Pelajaran Diampu
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Pengorganisasian Capaian Pembelajaran (CP) dan Alokasi Jam Tatap Muka resmi SK BSKAP Kemendikdasmen No. 046/H/KR/2025.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition shadow-xs"
          >
            <Printer className="w-4 h-4 text-purple-600" />
            <span>Cetak Dokumen</span>
          </button>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-600/30 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Mapel</span>
          </button>
        </div>
      </div>

      {/* Mapel Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mapelList.map((mapel) => (
          <div
            key={mapel.id}
            className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md p-5 flex flex-col justify-between hover:border-purple-300 transition"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-block px-2 py-0.5 rounded-sm bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-[10px] font-extrabold uppercase font-mono">
                    {mapel.kode}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                    {mapel.nama}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {mapel.tingkatKelas} · <span className="font-semibold text-purple-600">{mapel.fase}</span>
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-lg font-black text-purple-600 dark:text-purple-400">
                    {mapel.alokasiJp} JP
                  </span>
                  <span className="block text-[10px] text-slate-400">/ minggu</span>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Capaian Pembelajaran (CP 046/H/KR/2025):
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                  {mapel.capaianUmum || 'Peserta didik menguasai kompetensi dasar sesuai regulasi kurikulum merdeka.'}
                </p>
              </div>

              <div>
                <p className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-purple-500" />
                  Elemen Materi ({mapel.elemenList.length})
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {mapel.elemenList.map((elm, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-700 dark:text-slate-300 font-medium border border-slate-200 dark:border-slate-700"
                    >
                      {elm}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 print:hidden">
              <button
                onClick={() => handleOpenEdit(mapel)}
                className="p-1.5 rounded-lg text-slate-600 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-slate-800 transition"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(mapel.id, mapel.nama)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-slate-800 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Print Signature Section */}
      <div className="hidden print:block">
        <PrintSignature />
      </div>

      {/* Modal Add / Edit */}
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
              <div className="p-2.5 bg-purple-100 dark:bg-purple-950/60 text-purple-600 rounded-xl">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold">
                  {editingMapel ? 'Edit Mata Pelajaran' : 'Tambah Mata Pelajaran Baru'}
                </h3>
                <p className="text-xs text-slate-500">
                  Konfigurasi materi & alokasi waktu kurikulum
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Kode Mapel *</label>
                  <input
                    type="text"
                    required
                    value={formData.kode}
                    onChange={(e) => setFormData({ ...formData, kode: e.target.value })}
                    placeholder="Contoh: INF-X"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Alokasi Waktu (JP/Minggu) *</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    required
                    value={formData.alokasiJp}
                    onChange={(e) => setFormData({ ...formData, alokasiJp: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Nama Mata Pelajaran *</label>
                <input
                  type="text"
                  required
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  placeholder="Contoh: Informatika (Fase E)"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-purple-500 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Fase Kurikulum</label>
                  <select
                    value={formData.fase}
                    onChange={(e) => setFormData({ ...formData, fase: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="Fase E">Fase E (Kelas X)</option>
                    <option value="Fase F">Fase F (Kelas XI - XII)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Tingkat Kelas</label>
                  <select
                    value={formData.tingkatKelas}
                    onChange={(e) => setFormData({ ...formData, tingkatKelas: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="Kelas X">Kelas X</option>
                    <option value="Kelas XI">Kelas XI</option>
                    <option value="Kelas XII">Kelas XII</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Capaian Pembelajaran (SK No. 046/H/KR/2025)</label>
                <textarea
                  rows={3}
                  value={formData.capaianUmum}
                  onChange={(e) => setFormData({ ...formData, capaianUmum: e.target.value })}
                  placeholder="Rumusan capaian pembelajaran umum mapel pada fase ini..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Elemen Capaian Pembelajaran</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newElemen}
                    onChange={(e) => setNewElemen(e.target.value)}
                    placeholder="Tambah nama elemen (misal: Algoritma dan Pemrograman)"
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddElemen}
                    className="px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold"
                  >
                    Tambah
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {formData.elemenList.map((el, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-purple-50 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 rounded-lg border border-purple-200 dark:border-purple-800 font-medium"
                    >
                      {el}
                      <button
                        type="button"
                        onClick={() => handleRemoveElemen(idx)}
                        className="hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
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
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-md shadow-purple-600/30"
                >
                  {editingMapel ? 'Simpan Perubahan' : 'Tambahkan Mapel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
