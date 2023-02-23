import { Routes, Route } from 'react-router-dom';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard/Dashboard';
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

import UbahListBank from './pages/Keuangan/Bank/UbahListBank';

import ListBank from './pages/Keuangan/Bank/ListBank';
import ListCostCenter from './pages/Keuangan/CostCenter/ListCostCenter';
import ListBiayaOperasional from './pages/Keuangan/BiayaOperasional/ListBiayaOperasional';
import ListTipeTransaksi from './pages/Keuangan/TipeTransaksi/ListTipeTransaksi';
import ListBiayaPendidikan from './pages/Keuangan/BiayaPendidikan/ListBiayaPendidikan';

import TambahTipeTransaksi from './pages/Keuangan/TipeTransaksi/TambahTipeTransaksi';
import TambahCostCenter from './pages/Keuangan/CostCenter/TambahCostCenter';
import TambahBiayaOperasional from './pages/Keuangan/BiayaOperasional/TambahBiayaOperasional';
import TambahBiayaPendidikan from './pages/Keuangan/BiayaPendidikan/TambahBiayaPendidikan';
import TambahListBank from './pages/Keuangan/Bank/TambahListBank';

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
            <Route path="/admin/list-cost-center" element={(<ListCostCenter />)}></Route>
            <Route path="/admin/list-biaya-operasional" element={(<ListBiayaOperasional />)} />
            <Route path="/admin/list-tipe-transaksi" element={(<ListTipeTransaksi />)} />
            <Route path="/admin/list-biaya-pendidikan" element={(<ListBiayaPendidikan />)} />

            <Route path="/admin/ubah-list-bank" element={(<UbahListBank />)} />

            <Route path="/admin/tambah-list-bank" element={(<TambahListBank />)} />
            <Route path="/admin/tambah-cost-center" element={(<TambahCostCenter />)} />
            <Route path="/admin/tambah-biaya-pendidikan" element={(<TambahBiayaPendidikan />)} />
            <Route path="/admin/tambah-biaya-operasional" element={(<TambahBiayaOperasional />)} />
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
