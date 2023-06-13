import { Routes, Route } from "react-router-dom";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import TahapanPMB from "./pages/PMB/TahapanPMB";
import FormMurid from "./pages/PMB/FormMurid";
import FormOrangTua from "./pages/PMB/FormOrangTua";
import FormPernyataanOrangTua from "./pages/PMB/FormPernyataanOrangTua";
import BerkasPendaftaran from "./pages/PMB/BerkasPendaftaran";
import SetupPMB from "./pages/AdminPMB/SetupPMB";
import KonfirmasiPembayaran from "./pages/AdminPMB/KonfirmasiPembayaran";
import HasilTes from "./pages/AdminPMB/HasilTes";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import RequireAuthAdmin from "./components/RequireAuthAdmin";

import UbahMataPelajaran from "./pages/KBM/Mapel/UbahMataPelajaran";
import UbahKurikulum from "./pages/KBM/Kurikulum/UbahKurikulum";
import UbahListBank from "./pages/Keuangan/Bank/UbahListBank";
import UbahKelompokMapel from "./pages/KBM/KelompokMapel/UbahKelompokMapel";
import UbahKelas from "./pages/KBM/Kelas/UbahKelas";
import UbahSemester from "./pages/KBM/Semester/UbahSemester";

import DashboardKeuangan from "./pages/Keuangan/DashboardKeuangan/DashboardKeuangan";

import ListJadwalMataPelajaran from "./pages/KBM/JadwalMapel/ListJadwalMapel";
import ListMataPelajaran from "./pages/KBM/Mapel/ListMataPelajaran";
import ListKurikulum from "./pages/KBM/Kurikulum/ListKurikulum";
import ListSemester from "./pages/KBM/Semester/ListSemester";
import ListKelas from "./pages/KBM/Kelas/ListKelas";
import ListKelompokMapel from "./pages/KBM/KelompokMapel/ListKelompokMapel";
import ListBank from "./pages/Keuangan/Bank/ListBank";
import ListCostCenter from "./pages/Keuangan/CostCenter/ListCostCenter";
import ListBiayaOperasional from "./pages/Keuangan/BiayaOperasional/ListBiayaOperasional";
import ListTipeTransaksi from "./pages/Keuangan/TipeTransaksi/ListTipeTransaksi";
import ListBiayaPendidikan from "./pages/Keuangan/BiayaPendidikan/ListBiayaPendidikan";

import TambahJadwalMataPelajaran from "./pages/KBM/JadwalMapel/TambahJadwalMapel";
import TambahMataPelajaran from "./pages/KBM/Mapel/TambahMataPelajaran";
import TambahKurikulum from "./pages/KBM/Kurikulum/TambahKurikulum";
import TambahSemester from "./pages/KBM/Semester/TambahSemester";
import TambahKelas from "./pages/KBM/Kelas/TambahKelas";
import TambahKelompokMapel from "./pages/KBM/KelompokMapel/TambahKelompokMapel";
import TambahTipeTransaksi from "./pages/Keuangan/TipeTransaksi/TambahTipeTransaksi";
import TambahCostCenter from "./pages/Keuangan/CostCenter/TambahCostCenter";
import TambahBiayaOperasional from "./pages/Keuangan/BiayaOperasional/TambahBiayaOperasional";
import TambahBiayaPendidikan from "./pages/Keuangan/BiayaPendidikan/TambahBiayaPendidikan";
import TambahListBank from "./pages/Keuangan/Bank/TambahListBank";

import "./App.css";
import UbahJadwalMapel from "./pages/KBM/JadwalMapel/UbahJadwalMapel";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* AUTH */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* PROTECTED ROUTES */}
        <Route element={<RequireAuthAdmin />}>
          <Route path="/admin/pmb" element={<SetupPMB />} />
          <Route path="/admin/setup-pmb" element={<SetupPMB />} />
          <Route
            path="/admin/konfirmasi-pembayaran"
            element={<KonfirmasiPembayaran />}
          />
          <Route path="/admin/hasil-tes" element={<HasilTes />} />
          {/* lists */}
          <Route
            path="/admin/list-jadwal-mata-pelajaran"
            element={<ListJadwalMataPelajaran />}
          />
          <Route
            path="/admin/list-mata-pelajaran"
            element={<ListMataPelajaran />}
          />
          <Route path="/admin/list-kurikulum" element={<ListKurikulum />} />
          <Route path="/admin/list-semester" element={<ListSemester />} />
          <Route path="/admin/list-kelas" element={<ListKelas />} />
          <Route
            path="/admin/list-kelompok-mapel"
            element={<ListKelompokMapel />}
          />
          <Route path="/admin/list-bank" element={<ListBank />} />
          <Route
            path="/admin/list-cost-center"
            element={<ListCostCenter />}
          ></Route>
          <Route
            path="/admin/list-biaya-operasional"
            element={<ListBiayaOperasional />}
          />
          <Route
            path="/admin/list-tipe-transaksi"
            element={<ListTipeTransaksi />}
          />
          <Route
            path="/admin/list-biaya-pendidikan"
            element={<ListBiayaPendidikan />}
          />
          {/* ubah */}
          <Route
            path="/admin/ubah-mata-pelajaran"
            element={<UbahMataPelajaran />}
          />
          <Route
            path="/admin/ubah-jadwal-mata-pelajaran"
            element={<UbahJadwalMapel />}
          />
          <Route path="/admin/ubah-kurikulum" element={<UbahKurikulum />} />
          <Route path="/admin/ubah-list-bank" element={<UbahListBank />} />
          <Route
            path="/admin/ubah-kelompok-mapel"
            element={<UbahKelompokMapel />}
          />
          <Route path="/admin/ubah-kelas" element={<UbahKelas />} />
          <Route path="/admin/ubah-semester" element={<UbahSemester />} />
          {/* tambah */}
          <Route
            path="/admin/tambah-jadwal-mata-pelajaran"
            element={<TambahJadwalMataPelajaran />}
          />
          <Route
            path="/admin/tambah-mata-pelajaran"
            element={<TambahMataPelajaran />}
          />
          <Route path="/admin/tambah-kurikulum" element={<TambahKurikulum />} />
          <Route path="/admin/tambah-semester" element={<TambahSemester />} />
          <Route path="/admin/tambah-kelas" element={<TambahKelas />} />
          <Route
            path="/admin/tambah-kelompok-mapel"
            element={<TambahKelompokMapel />}
          />
          <Route path="/admin/tambah-list-bank" element={<TambahListBank />} />
          <Route
            path="/admin/tambah-cost-center"
            element={<TambahCostCenter />}
          />
          <Route
            path="/admin/tambah-biaya-pendidikan"
            element={<TambahBiayaPendidikan />}
          />
          <Route
            path="/admin/tambah-biaya-operasional"
            element={<TambahBiayaOperasional />}
          />
          <Route
            path="/admin/tambah-tipe-transaksi"
            element={<TambahTipeTransaksi />}
          />
        </Route>

        {/* PROTECTED ROUTES */}
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<DashboardKeuangan />} />
          <Route path="/pmb?verified=1" element={<TahapanPMB />} />
          <Route path="/pmb/tahapan-pmb?verified=1" element={<TahapanPMB />} />
          <Route path="/pmb" element={<TahapanPMB />} />
          <Route path="/pmb/tahapan-pmb" element={<TahapanPMB />} />
          <Route path="/pmb/form-data-murid" element={<FormMurid />} />
          <Route path="/pmb/form-data-orang-tua" element={<FormOrangTua />} />
          <Route
            path="/pmb/form-pernyataan"
            element={<FormPernyataanOrangTua />}
          />
          <Route
            path="/pmb/berkas-pendaftaran"
            element={<BerkasPendaftaran />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
