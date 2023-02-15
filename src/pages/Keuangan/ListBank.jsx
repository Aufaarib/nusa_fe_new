import { Paper } from "@mui/material";
import FilterComponent from "../../components/Filter";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import { Header } from '../../components';
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
        <button onClick={() => navigateUbahTipeTransaksi(data.id, data.nama_bank, data.nomor_rekening, data.nama_pemilik)} className="btn-action-ungu"><i class="fa fa-pencil"></i> Ubah</button>
        <button className="btn-action-hijau ml-3"><i class="fa fa-play"></i> Aktif</button>
        <button onClick={() => openModalHapus(data.id, data.nama_pemilik)} className="btn-action-pink ml-3"><i class="fa fa-trash"></i> Hapus</button>
    </div>,
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    width: "360px",
  },
];

const customStylestable = {
  rows: {
      style: {
          justifyContent: 'center',
      },
  },
  headCells: {
      style: {
          paddingLeft: '8px', // override the cell padding for head cells
          paddingRight: '8px',
          justifyContent: 'center',
          backgroundColor: '#8F0D1E',
          color: 'rgb(243 241 241)',
      },
  },
  cells: {
      style: {
          paddingLeft: '8px', // override the cell padding for head cells
          paddingRight: '8px',
          justifyContent: 'center',
          fontWeight: 'bold'
      },
  },
};

const customStylesStatus = {
  content: {
    width: '15%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    cursor: 'auto',
    padding: '30px'
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,.5)',
    cursor: 'pointer'
  }
};

const customStylesModalHapus = {
  content: {
    width: '17%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    cursor: 'auto',
    padding: '18px'
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,.5)',
    cursor: 'pointer'
  }
};

const navigate = useNavigate();

const navigateTambahTipeTransaksi = () => {
  // 👇️ navigate to /contacts
    navigate('/admin/tambah-tipe-bank');
};

const navigateUbahTipeTransaksi = (id, nama_bank, nomor_rekening, nama_pemilik) => {
    // 👇️ navigate to /contacts
      navigate('/admin/ubah-tipe-bank', { 
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
    <Header category="Admin PMB" title="List Bank" />

    <article>

      <button className="w-auto btn-ungu mb-5" onClick={navigateTambahTipeTransaksi}><i class="fa fa-plus-square-o mr-2 mt-1"></i> Tambah</button>

      <FilterComponent
          onFilter={e => setFilterText(e.target.value)}
          filterText={filterText}
        />

      <Paper>
        <DataTable
          pagination
          paginationComponentOptions={{
            rowsPerPageText: 'Tampilkan',
            rangeSeparatorText: 'dari',
          }}
          columns={columns}
          customStyles={customStylestable}
          data={filteredItems}
        />
      </Paper>

      <Modal
          isOpen={isOpenStatus}
          onRequestClose={closeModalStatus}
          style={customStylesStatus}
          contentLabel="Modal Status"
          >
          {status?.type === 'success' && 
          <div>
            <h2 className="ml-8">Berhasil</h2>
            <button className="btn-action-pink w-20 mt-5 ml-10" onClick={closeModalStatus}>Tutup</button>
          </div>
          }
          {status?.type === 'error' && 
          <div>
            <h2 className="ml-8">Gagal</h2>
            <button className="btn-action-pink w-20 mt-5 ml-10" onClick={closeModalStatus}>Tutup</button>
          </div>
          } 
      </Modal>

      <Modal
          isOpen={isOpenDelete}
          onRequestClose={closeModalHapus}
          style={customStylesModalHapus}
          contentLabel="Modal Hapus"
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