import FilterComponent from "../../../components/Filter";
import { CustomStylesTable, CustomStylesStatus, CustomStylesModalHapus } from "../../../components/CustomStyles";
import DataTables from "../../../components/DataTables";
import { useState, useEffect } from "react";
import { Header } from '../../../components';
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import axios from "axios";

export default function ListBank() {
const [data, setData] = useState([]);   
const [isOpenStatus, setisOpenStatus] = useState(false);
const [isOpenDelete, setisOpenDelete] = useState(false);
// const [isOpenUbahStatus, setisOpenUbahStatus] = useState(false);
const [status, setStatus] = useState(undefined);
const [deleteId, setDeleteId] = useState('');
const [desc_nama, setDesc_nama] = useState('');
// const [desc_status, setDesc_status] = useState('');
const [filterText, setFilterText] = useState('');

const filteredItems = 
  data.filter(
    item => item.nama_pemilik.toLowerCase().includes(filterText.toLowerCase())||
    item.nomor_rekening.toLowerCase().includes(filterText.toLowerCase())||
    item.nama_bank.toLowerCase().includes(filterText.toLowerCase())
  );

useEffect(() => {
  axios
    .get("https://63e1c25ff59c591411a61021.mockapi.io/nusa-list-bank")
    .then((res) => {
      console.log(res.data)
      setData(res.data);
      setStatus({ type: 'success' });
    })
    .catch((error) => {
      setStatus({ type: 'error', error });
    });
}, []);

const getData = () => {
  axios.get(`https://63e1c25ff59c591411a61021.mockapi.io/nusa-list-bank`)
      .then((getData) => {
        setData(getData.data);
        setStatus({ type: 'success' });
      })
      .catch((error) => {
        setStatus({ type: 'error', error });
      });
}

const openModalHapus = (id, nama_pemilik) => {
  setisOpenDelete(true);
  setDesc_nama(nama_pemilik);
  setDeleteId(id);
}

const closeModalHapus = () => {
  setisOpenDelete(false);
}

// const openModalUbahStatus = (id, nama_pemilik) => {
//   setisOpenUbahStatus(true);
//   setDesc_nama(nama_pemilik);
//   setDeleteId(id);
// }

// const closeModalUbahStatus = () => {
//   setisOpenUbahStatus(false);
// }

const onDelete = () => {
  axios.delete(`https://63e1c25ff59c591411a61021.mockapi.io/nusa-list-bank/${deleteId}`)
      .then(() => {
        setStatus({ type: 'success' });
        closeModalHapus();
        setisOpenStatus(true);
        getData();
        })
      .catch((error) => {
          setStatus({ type: 'error', error });
      });
}

const closeModalStatus = () => {
  setisOpenStatus(false);
  setStatus('');
}

const columns = [
  {
    name: 'No',
    selector: (_row, i) => i + 1,
    width: "37px"  
  },
  {
    name: "Nama Bank",
    selector: (data) => data.nama_bank,
  },
  {
    name: "Nomor Rekening",
    selector: (data) => data.nomor_rekening,
  },
  {
    name: "Nama Pemilik",
    selector: (data) => data.nama_pemilik,
  },
  {
    name: "Aksi",
    cell:(data) => 
    <div>
        <button onClick={() => navigateUbahListBank(data.id, data.nama_bank, data.nomor_rekening, data.nama_pemilik)} className="btn-action-ungu"><i className="fa fa-pencil"></i> Ubah</button>
        <button className="btn-action-hijau ml-3"><i className="fa fa-play"></i> Aktif</button>
        <button onClick={() => openModalHapus(data.id, data.nama_pemilik)} className="btn-action-pink ml-3"><i className="fa fa-trash"></i> Hapus</button>
    </div>,
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    width: "360px",
  },
];

const navigate = useNavigate();

const navigateTambahListBank = () => {
    navigate('/admin/tambah-list-bank');
};

const navigateUbahListBank = (id, nama_bank, nomor_rekening, nama_pemilik) => {
      navigate('/admin/ubah-list-bank', { 
        state : {
            id : id,
            nama_bank : nama_bank,
            nomor_rekening : nomor_rekening,
            nama_pemilik : nama_pemilik
        }
      });
  }; 

 return (
  <>
    <Header category="Admin Keuangan" title="List Bank" />

    <article>

      <FilterComponent
          onClick={navigateTambahListBank}
          onFilter={e => setFilterText(e.target.value)}
          filterText={filterText}
        />

      <DataTables
          columns={columns}
          data={filteredItems}
      
      />

      <Modal
          isOpen={isOpenStatus}
          onRequestClose={closeModalStatus}
          style={CustomStylesStatus}
          contentLabel="Modal Status"
          ariaHideApp={false}
          >
          {status?.type === 'success' && 
          <div>
            <h2>Berhasil</h2>
            <button className="btn-action-pink w-20 mt-5" onClick={closeModalStatus}>Tutup</button>
          </div>
          }
          {status?.type === 'error' && 
          <div>
            <h2>Gagal</h2>
            <button className="btn-action-pink w-20 mt-5" onClick={closeModalStatus}>Tutup</button>
          </div>
          } 
      </Modal>

      <Modal
          isOpen={isOpenDelete}
          onRequestClose={closeModalHapus}
          style={CustomStylesModalHapus}
          contentLabel="Modal Hapus"
          ariaHideApp={false}
        >
          <h2 className='mb-2 ml-3'>Hapus Transaksi</h2>
          <h4 className='mb-3 text-merah ml-3'>{desc_nama}?</h4>
          <button className="btn-action-ungu w-20 ml-4" onClick={onDelete}>Hapus</button>
          <button className="btn-action-pink w-20 ml-5" onClick={closeModalHapus}>Batal</button>
      </Modal>

      {/* <Modal
          isOpen={isOpenUbahStatus}
          onRequestClose={closeModalUbahStatus}
          style={customStylesModalHapus}
          contentLabel="Modal Ubah Status"
        >
          <h2 className='mb-2 ml-3'>Ubah Status </h2>
          <h4 className='mb-3 text-merah ml-3'>{desc_nama}?</h4>
          <h2 className='mb-2 ml-3'>Menjadi</h2>
          <h4 className='mb-3 text-merah ml-3'>{desc_status}?</h4>
          <button className="btn-action-ungu w-20 ml-4" onClick={onUbahStatus}>Ubah</button>
          <button className="btn-action-pink w-20 ml-5" onClick={closeModalHapus}>Batal</button>

      </Modal> */}

    </article>
   </>
 );
}