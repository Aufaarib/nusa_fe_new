import { Routes, Route } from 'react-router-dom';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import ListBank from './pages/Keuangan/ListBank';
import ListTipeTransaksi from './pages/Keuangan/ListTipeTransaksi';
import TambahTipeTransaksi from './pages/Keuangan/TambahTipeTransaksi';
import UbahTipeBank from './pages/Keuangan/UbahTipeBank';
import TambahTipeBank from './pages/Keuangan/TambahTipeBank';
import TahapanPMB from './pages/PMB/TahapanPMB';
import FormMurid from './pages/PMB/FormMurid';
import FormOrangTua from './pages/PMB/FormOrangTua';
import FormPernyataanOrangTua from './pages/PMB/FormPernyataanOrangTua';
import BerkasPendaftaran from './pages/PMB/BerkasPendaftaran';
import SetupPMB from './pages/AdminPMB/SetupPMB';
import KonfirmasiPembayaran from './pages/AdminPMB/KonfirmasiPembayaran';
import HasilTes from './pages/AdminPMB/HasilTes';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import RequireAuthAdmin from './components/RequireAuthAdmin';

import './App.css';

const App = () => {

  return (

    <Routes>
      <Route path="/" element={<Layout />}>
          {/* AUTH */}
          <Route path="/" element={(<Login />)} />
          <Route path="/register" element={(<Register />)} />
          <Route path="/login" element={(<Login />)} />
          
          {/* PROTECTED ROUTES */}
          <Route element={<RequireAuthAdmin />}>
            <Route path="/admin/pmb" element={(<SetupPMB />)} />
            <Route path="/admin/setup-pmb" element={(<SetupPMB />)} />
            <Route path="/admin/konfirmasi-pembayaran" element={(<KonfirmasiPembayaran />)} />
            <Route path="/admin/hasil-tes" element={(<HasilTes />)} />
            <Route path="/admin/list-bank" element={(<ListBank />)} />
            <Route path="/admin/tambah-tipe-bank" element={(<TambahTipeBank />)} />
            <Route path="/admin/ubah-tipe-bank" element={(<UbahTipeBank />)} />
            <Route path="/admin/tipe-transaksi" element={(<ListTipeTransaksi />)} />
            <Route path="/admin/tambah-tipe-transaksi" element={(<TambahTipeTransaksi />)} />

          </Route>

          {/* PROTECTED ROUTES */}
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={(<Dashboard />)} />
            <Route path="/pmb?verified=1" element={(<TahapanPMB />)} />
            <Route path="/pmb/tahapan-pmb?verified=1" element={(<TahapanPMB />)} />
            <Route path="/pmb" element={(<TahapanPMB />)} />
            <Route path="/pmb/tahapan-pmb" element={(<TahapanPMB />)} />
            <Route path="/pmb/form-data-murid" element={(<FormMurid />)} />
            <Route path="/pmb/form-data-orang-tua" element={(<FormOrangTua />)} />
            <Route path="/pmb/form-pernyataan" element={(<FormPernyataanOrangTua />)} />
            <Route path="/pmb/berkas-pendaftaran" element={(<BerkasPendaftaran />)} />
          </Route>
          
      </Route>
    </Routes>

  );
};

export default App;
