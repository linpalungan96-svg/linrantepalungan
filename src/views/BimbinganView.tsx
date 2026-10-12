import React, { useState } from 'react';
import { dbService } from '../services/dbService';
import { BimbinganRecord, Siswa } from '../types';
import { PrintHeader, PrintSignature } from '../components/PrintHeader';
import {
  HeartHandshake,
  Plus,
  Trash2,
  Printer,
  ShieldCheck,
  X,
  Award,
  AlertTriangle
} from 'lucide-react';
import Swal from 'sweetalert2';

export const BimbinganView: React.FC = () => {
  const [bimbinganList, setBimbinganList] = useState<BimbinganRecord[]>(dbService.getBimbinganList());
  const siswaList = dbService.getSiswaList();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState<Omit<BimbinganRecord, 'id' | 'siswaNama' | 'kelas'>>({
    tanggal: new Date().toISOString().split('T')[0],
    siswaId: siswaList[0]?.id || '',
    kategori: 'Kedisiplinan',
    uraianMasalah: '',
    tindakLanjut: 'Konseling Mandiri',
    hasilTindakLanjut: '',
    statusKasus: 'Selesai'
  });

  const refreshData = () => {
    setBimbinganList(dbService.getBimbinganList());
  };

  const handleOpenAdd = () => {
    setFormData({
      tanggal: new Date().toISOString().split('T')[0],
      siswaId: siswaList[0]?.id || '',
      kategori: 'Kedisiplinan',
      uraianMasalah: '',
      tindakLanjut: 'Konseling Mandiri',
      hasilTindakLanjut: '',
      statusKasus: 'Dalam Proses'
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: 'Hapus Catatan Bimbingan?',
      text: 'Catatan kasus/konseling ini akan dihapus dari arsip.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal'
    }).then(res => {
      if (res.isConfirmed) {
        dbService.deleteBimbingan(id);
        refreshData();
        Swal.fire('Terhapus', 'Catatan bimbingan dihapus.', 'success');
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const siswa = siswaList.find(s => s.id === formData.siswaId);
    if (!siswa || !formData.uraianMasalah) {
      Swal.fire('Perhatian', 'Pilih siswa dan isi uraian masalah!', 'warning');
      return;
    }

    dbService.addBimbingan({
      ...formData,
      siswaNama: siswa.nama,
      kelas: siswa.kelas
    });

    setIsModalOpen(false);
    refreshData();
    Swal.fire('Berhasil', 'Catatan bimbingan berhasil disimpan.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Print View Header */}
      <div className="hidden print:block">
        <PrintHeader
          title="BUKU CATATAN BIMBINGAN KONSELING & PRESTASI SISWA"
          subtitle="DOKUMEN RAHASIA WALI KELAS & GURU MAPEL"
        />
      </div>

      {/* Screen Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-600 text-white rounded-xl shadow-xs">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Buku Bimbingan Wali Kelas & BK
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Rekam jejak konseling individual, pembinaan kedisiplinan, home visit, dan catatan apresiasi prestasi siswa.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition shadow-xs"
          >
            <Printer className="w-4 h-4 text-emerald-600" />
            <span>Cetak Buku Kasus</span>
          </button>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/30 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Catat Bimbingan</span>
          </button>
        </div>
      </div>

      {/* Security Banner */}
      <div className="p-3.5 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-2xl flex items-center gap-3 text-xs text-blue-900 dark:text-blue-200 print:hidden">
        <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
        <span>
          <strong>Kerahasiaan Data Terlindungi:</strong> Informasi konseling dan kasus siswa bersifat rahasia profesional untuk kepentingan tumbuh kembang peserta didik.
        </span>
      </div>

      {/* Bimbingan Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-emerald-700 text-white border-b-2 border-emerald-800 uppercase tracking-wider text-[11px] font-bold">
                <th className="py-3 px-3 text-center w-10">No</th>
                <th className="py-3 px-3 w-24">Tanggal</th>
                <th className="py-3 px-4 min-w-[150px]">Nama Peserta Didik</th>
                <th className="py-3 px-3 text-center w-20">Kelas</th>
                <th className="py-3 px-3 text-center w-28">Kategori</th>
                <th className="py-3 px-4 min-w-[200px]">Uraian Kasus / Prestasi</th>
                <th className="py-3 px-3 min-w-[140px]">Tindak Lanjut</th>
                <th className="py-3 px-4 min-w-[180px]">Hasil / Solusi</th>
                <th className="py-3 px-3 text-center w-24">Status</th>
                <th className="py-3 px-3 text-center print:hidden w-12">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {bimbinganList.map((b, idx) => (
                <tr key={b.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition">
                  <td className="py-3 px-3 text-center font-bold text-slate-500">
                    {idx + 1}
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-900 dark:text-slate-200">
                    {b.tanggal}
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    {b.siswaNama}
                  </td>
                  <td className="py-3 px-3 text-center font-bold text-emerald-600">
                    {b.kelas}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-sm text-[10px] font-bold ${
                        b.kategori === 'Prestasi'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : b.kategori === 'Kedisiplinan'
                          ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                      }`}
                    >
                      {b.kategori}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-700 dark:text-slate-300 leading-relaxed">
                    {b.uraianMasalah}
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-900 dark:text-white">
                    {b.tindakLanjut}
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                    {b.hasilTindakLanjut || '-'}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`px-2 py-0.5 rounded-sm text-[10px] font-bold ${
                        b.statusKasus === 'Selesai'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}
                    >
                      {b.statusKasus}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center print:hidden">
                    <button
                      onClick={() => handleDelete(b.id)}
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

      {/* Modal Add Bimbingan */}
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
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Catat Rekam Bimbingan Siswa</h3>
                <p className="text-xs text-slate-500">
                  Konseling, pemantauan karakter, atau catatan apresiasi prestasi
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Tanggal</label>
                  <input
                    type="date"
                    required
                    value={formData.tanggal}
                    onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Pilih Siswa *</label>
                  <select
                    value={formData.siswaId}
                    onChange={(e) => setFormData({ ...formData, siswaId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
                  >
                    {siswaList.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.nama} ({s.kelas})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Kategori Catatan</label>
                  <select
                    value={formData.kategori}
                    onChange={(e) => setFormData({ ...formData, kategori: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold"
                  >
                    <option value="Kedisiplinan">Kedisiplinan</option>
                    <option value="Akademik">Akademik</option>
                    <option value="Sosial/Pribadi">Sosial/Pribadi</option>
                    <option value="Prestasi">Prestasi / Bakat</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Bentuk Tindak Lanjut</label>
                  <select
                    value={formData.tindakLanjut}
                    onChange={(e) => setFormData({ ...formData, tindakLanjut: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold"
                  >
                    <option value="Konseling Mandiri">Konseling Mandiri</option>
                    <option value="Bimbingan Khusus">Bimbingan Khusus</option>
                    <option value="Panggilan Orang Tua">Panggilan Orang Tua</option>
                    <option value="Home Visit">Home Visit</option>
                    <option value="Apresiasi Prestasi">Apresiasi Prestasi</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Uraian Kasus / Kejadian / Prestasi *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.uraianMasalah}
                  onChange={(e) => setFormData({ ...formData, uraianMasalah: e.target.value })}
                  placeholder="Uraikan kondisi siswa secara objektif dan mendalam..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Hasil Tindak Lanjut & Komitmen Siswa</label>
                <textarea
                  rows={2}
                  value={formData.hasilTindakLanjut}
                  onChange={(e) => setFormData({ ...formData, hasilTindakLanjut: e.target.value })}
                  placeholder="Kesepakatan siswa, perkembangan sikap, atau tindak lanjut berkala..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Status Penanganan</label>
                <select
                  value={formData.statusKasus}
                  onChange={(e) => setFormData({ ...formData, statusKasus: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
                >
                  <option value="Dalam Proses">Dalam Proses (Pemantauan)</option>
                  <option value="Selesai">Selesai (Tuntas)</option>
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
                  Simpan Catatan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
