import React, { useState } from 'react';
import { dbService } from '../services/dbService';
import { Siswa } from '../types';
import { PrintHeader, PrintSignature } from '../components/PrintHeader';
import {
  Users,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Edit2,
  Trash2,
  Printer,
  X,
  FileSpreadsheet
} from 'lucide-react';
import Swal from 'sweetalert2';

export const SiswaView: React.FC = () => {
  const [siswaList, setSiswaList] = useState<Siswa[]>(dbService.getSiswaList());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKelas, setSelectedKelas] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSiswa, setEditingSiswa] = useState<Siswa | null>(null);

  // Form State
  const [formData, setFormData] = useState<Omit<Siswa, 'id'>>({
    nis: '',
    nisn: '',
    nama: '',
    jenisKelamin: 'L',
    kelas: 'X-1',
    noHpOrtu: '',
    alamat: '',
    status: 'Aktif'
  });

  const refreshData = () => {
    setSiswaList(dbService.getSiswaList());
  };

  const kelasOptions = dbService.getKelasList();

  const filteredSiswa = siswaList.filter(s => {
    const matchSearch =
      s.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nis.includes(searchQuery) ||
      s.nisn.includes(searchQuery);
    const matchKelas = selectedKelas === 'all' || s.kelas === selectedKelas;
    return matchSearch && matchKelas;
  });

  const handleOpenAdd = () => {
    setEditingSiswa(null);
    setFormData({
      nis: '',
      nisn: '',
      nama: '',
      jenisKelamin: 'L',
      kelas: kelasOptions[0] || 'X-1',
      noHpOrtu: '',
      alamat: '',
      status: 'Aktif'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (siswa: Siswa) => {
    setEditingSiswa(siswa);
    setFormData({
      nis: siswa.nis,
      nisn: siswa.nisn,
      nama: siswa.nama,
      jenisKelamin: siswa.jenisKelamin,
      kelas: siswa.kelas,
      noHpOrtu: siswa.noHpOrtu,
      alamat: siswa.alamat,
      status: siswa.status
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, nama: string) => {
    Swal.fire({
      title: 'Hapus Data Siswa?',
      text: `Apakah Anda yakin ingin menghapus siswa "${nama}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal'
    }).then(result => {
      if (result.isConfirmed) {
        dbService.deleteSiswa(id);
        refreshData();
        Swal.fire('Terhapus', 'Data siswa berhasil dihapus.', 'success');
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama || !formData.nis || !formData.nisn) {
      Swal.fire('Perhatian', 'Nama, NIS, dan NISN wajib diisi!', 'warning');
      return;
    }

    if (editingSiswa) {
      dbService.updateSiswa(editingSiswa.id, formData);
      Swal.fire('Berhasil', 'Data siswa berhasil diperbarui.', 'success');
    } else {
      dbService.addSiswa(formData);
      Swal.fire('Berhasil', 'Siswa baru berhasil ditambahkan.', 'success');
    }

    setIsModalOpen(false);
    refreshData();
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'NIS', 'NISN', 'Nama Lengkap', 'Jenis Kelamin', 'Kelas', 'No HP Ortu', 'Alamat', 'Status'];
    const rows = siswaList.map(s => [
      s.id,
      s.nis,
      s.nisn,
      `"${s.nama}"`,
      s.jenisKelamin,
      s.kelas,
      s.noHpOrtu,
      `"${s.alamat}"`,
      s.status
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `data_siswa_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Import CSV Template
  const handleImportCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split('\n').filter(Boolean);
      if (lines.length <= 1) {
        Swal.fire('Gagal', 'File CSV kosong atau format tidak sesuai.', 'error');
        return;
      }

      let count = 0;
      // Skip header
      for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(',').map(c => c.trim().replace(/^"|"$/g, ''));
        if (cols.length >= 4) {
          dbService.addSiswa({
            nis: cols[0] || `230${Date.now().toString().slice(-3)}`,
            nisn: cols[1] || `007${Date.now().toString().slice(-7)}`,
            nama: cols[2] || 'Siswa Baru',
            jenisKelamin: (cols[3] === 'P' ? 'P' : 'L'),
            kelas: cols[4] || 'X-1',
            noHpOrtu: cols[5] || '',
            alamat: cols[6] || '',
            status: 'Aktif'
          });
          count++;
        }
      }

      refreshData();
      Swal.fire('Impor Berhasil', `${count} data siswa berhasil diimpor ke sistem.`, 'success');
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* Print View Header */}
      <div className="hidden print:block">
        <PrintHeader
          title="BUKU INDUK PESERTA DIDIK"
          subtitle={`Kelas / Rombel: ${selectedKelas === 'all' ? 'Semua Rombel' : selectedKelas}`}
        />
      </div>

      {/* Screen Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-cyan-600 text-white rounded-xl shadow-xs">
              <Users className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Kelola Peserta Didik (Data Induk)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Basis data siswa lengkap untuk presensi otomatis, buku nilai rapor, dan pencetakan kartu pelajar QR.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition shadow-xs">
            <Upload className="w-4 h-4 text-cyan-600" />
            <span>Impor CSV</span>
            <input type="file" accept=".csv" onChange={handleImportCSV} className="hidden" />
          </label>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition shadow-xs"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span>Ekspor CSV</span>
          </button>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition shadow-xs"
          >
            <Printer className="w-4 h-4 text-blue-600" />
            <span>Cetak Buku</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold shadow-md shadow-cyan-600/30 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Siswa</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama siswa, NIS, atau NISN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-hidden focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 shrink-0">
            Rombel:
          </span>
          <select
            value={selectedKelas}
            onChange={(e) => setSelectedKelas(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-cyan-500"
          >
            <option value="all">Semua Kelas ({siswaList.length})</option>
            {kelasOptions.map(k => (
              <option key={k} value={k}>
                Kelas {k} ({siswaList.filter(s => s.kelas === k).length})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Siswa Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-cyan-700 text-white border-b-2 border-cyan-800 uppercase tracking-wider text-[11px] font-bold">
                <th className="py-3 px-3 text-center w-12">No</th>
                <th className="py-3 px-3">NIS / NISN</th>
                <th className="py-3 px-4">Nama Peserta Didik</th>
                <th className="py-3 px-3 text-center">L/P</th>
                <th className="py-3 px-3 text-center">Kelas</th>
                <th className="py-3 px-3">Kontak Orang Tua</th>
                <th className="py-3 px-3">Alamat</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-3 text-center print:hidden">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {filteredSiswa.length > 0 ? (
                filteredSiswa.map((siswa, idx) => (
                  <tr
                    key={siswa.id}
                    className="hover:bg-cyan-50/50 dark:hover:bg-slate-800/60 transition"
                  >
                    <td className="py-3 px-3 text-center font-bold text-slate-500">
                      {idx + 1}
                    </td>
                    <td className="py-3 px-3 font-mono">
                      <span className="font-semibold text-slate-900 dark:text-slate-100">{siswa.nis}</span>
                      <span className="block text-[10px] text-slate-400">{siswa.nisn}</span>
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                      {siswa.nama}
                    </td>
                    <td className="py-3 px-3 text-center font-bold">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-sm text-[10px] ${
                          siswa.jenisKelamin === 'L'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                            : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                        }`}
                      >
                        {siswa.jenisKelamin}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-cyan-600 dark:text-cyan-400">
                      {siswa.kelas}
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-600 dark:text-slate-300">
                      {siswa.noHpOrtu || '-'}
                    </td>
                    <td className="py-3 px-3 text-slate-500 truncate max-w-xs">
                      {siswa.alamat || '-'}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="px-2 py-0.5 rounded-sm text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        {siswa.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center print:hidden">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => handleOpenEdit(siswa)}
                          title="Edit Siswa"
                          className="p-1.5 rounded-lg text-slate-600 hover:text-cyan-600 hover:bg-cyan-50 dark:hover:bg-slate-800 transition"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(siswa.id, siswa.nama)}
                          title="Hapus Siswa"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-slate-800 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-400">
                    Tidak ditemukan data siswa sesuai filter pencarian.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Print Signature Section */}
      <div className="hidden print:block">
        <PrintSignature />
      </div>

      {/* Modal Add / Edit Siswa */}
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
              <div className="p-2.5 bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 rounded-xl">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold">
                  {editingSiswa ? 'Ubah Data Siswa' : 'Tambah Peserta Didik Baru'}
                </h3>
                <p className="text-xs text-slate-500">
                  Lengkapi data induk siswa secara akurat
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">NIS (Nomor Induk Siswa) *</label>
                  <input
                    type="text"
                    required
                    value={formData.nis}
                    onChange={(e) => setFormData({ ...formData, nis: e.target.value })}
                    placeholder="Contoh: 230109"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">NISN (10 Digit Nasional) *</label>
                  <input
                    type="text"
                    required
                    value={formData.nisn}
                    onChange={(e) => setFormData({ ...formData, nisn: e.target.value })}
                    placeholder="Contoh: 0078912309"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Nama Lengkap Siswa *</label>
                <input
                  type="text"
                  required
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  placeholder="Nama sesuai akta lahir"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-cyan-500 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Jenis Kelamin</label>
                  <select
                    value={formData.jenisKelamin}
                    onChange={(e) => setFormData({ ...formData, jenisKelamin: e.target.value as 'L' | 'P' })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="L">Laki-laki (L)</option>
                    <option value="P">Perempuan (P)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Kelas / Rombel</label>
                  <input
                    type="text"
                    list="kelasList"
                    required
                    value={formData.kelas}
                    onChange={(e) => setFormData({ ...formData, kelas: e.target.value })}
                    placeholder="Contoh: X-1, XI-IPA"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-cyan-500"
                  />
                  <datalist id="kelasList">
                    {kelasOptions.map(k => (
                      <option key={k} value={k} />
                    ))}
                  </datalist>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">No. WhatsApp / HP Ortu</label>
                  <input
                    type="tel"
                    value={formData.noHpOrtu}
                    onChange={(e) => setFormData({ ...formData, noHpOrtu: e.target.value })}
                    placeholder="Contoh: 081234567890"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Status Keaktifan</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Mutasi">Mutasi</option>
                    <option value="Lulus">Lulus</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Alamat Tempat Tinggal</label>
                <textarea
                  rows={2}
                  value={formData.alamat}
                  onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                  placeholder="Alamat lengkap domisili siswa..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-cyan-500"
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
                  className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold shadow-md shadow-cyan-600/30"
                >
                  {editingSiswa ? 'Simpan Perubahan' : 'Tambahkan Siswa'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
