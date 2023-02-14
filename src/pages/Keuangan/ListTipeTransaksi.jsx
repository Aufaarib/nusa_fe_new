import { Paper } from "@mui/material";
import FilterComponent from "../../components/Filter";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import { Header } from '../../components';
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import axios from "axios";

export default function ListTipeTransaksi() {
const [data, setData] = useState([]);
const [isOpenStatus, setisOpenStatus] = useState(false);
const [isOpenDelete, setisOpenDelete] = useState(false);
const [deleteId, setDeleteId] = useState("");
const [desc, setDesc] = useState("");
const [filterText, setFilterText] = useState("");
const [status, setStatus] = useState(undefined);
const filteredItems = data.filter(
  item => item.firstName && item.lastName.toLowerCase().includes(filterText.toLowerCase()),
);
useEffect(() => {
  axios
    .get("https://63e1c25ff59c591411a61021.mockapi.io/nusa-keuangan")
    .then((res) => {
      setData(res.data);
      setStatus({ type: 'success' });
    })
    .catch((error) => {
      setStatus({ type: 'error', error });
    });
}, []);

const getData = () => {
  axios.get(`https://63e1c25ff59c591411a61021.mockapi.io/nusa-keuangan`)
    .then((getData) => {
      setData(getData.data);
      setStatus({ type: 'success' });
    })
    .catch((error) => {
      setStatus({ type: 'error', error });
    });
}

const openModalHapus = (id, firstName) => {
  setisOpenDelete(true);
  setDesc(firstName);
  setDeleteId(id);
}

const closeModalHapus = () => {
  setisOpenDelete(false);
}

const onDelete = () => {
  axios.delete(`https://63e1c25ff59c591411a61021.mockapi.io/nusa-keuangan/${deleteId}`)
      .then(() => {
        setStatus({ type: 'success' });
        closeModalHapus();
        setisOpenStatus(true);
        getData();
        setStatus('');
        })
      .catch((error) => {
          setStatus({ type: 'error', error });
      });
}

const closeModalStatus = () => {
  setisOpenStatus(false);
}

const columns = [
  {
    name: 'No',
    selector: (_row, i) => i + 1,
    width: "37px"  
  },
  {
    name: "Deskripsi",
    selector: (data) => data.firstName,
    width: "387px" 
  },
  { 
    name: "Status",
    selector: (data) => data.lastName,
  },
  {
    name: "Aksi",
    cell:(data) => 
    <div>
      <button className="btn-action-hijau ml-3">Aktif</button>
      <button onClick={() => openModalHapus(data.id, data.firstName)} className="btn-action-pink ml-3">Hapus</button>
    </div>,
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    width: "360px" 
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
    navigate('/admin/tambah-tipe-transaksi');
};

 return (
  <>
    <Header category="Admin PMB" title="Tipe Transaksi" />

    <article>

      <button type="button" className="w-auto btn-ungu flex justify-center mb-5" 
        onClick={navigateTambahTipeTransaksi}>
        Tambah
      </button>

      <FilterComponent
          onFilter={e => setFilterText(e.target.value)}
          filterText={filterText}
        />

      <Paper>
        <DataTable
          pagination
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
          {status?.type === 'success' && <h2>Success</h2>}
          {status?.type !== 'success' && <h2>Mengubah Data..</h2>}
          {status?.type === 'error' && <h2>Failed</h2>}
      </Modal>

      <Modal
          isOpen={isOpenDelete}
          onRequestClose={closeModalHapus}
          style={customStylesModalHapus}
          contentLabel="Modal Hapus"
        >
          <h2 className='mb-2 ml-3'>Hapus Transaksi</h2>
          <h4 className='mb-3 text-merah ml-3'>{desc}?</h4>
          <button className="btn-action-hijau w-20 ml-4" onClick={onDelete}>Hapus</button>
          <button className="btn-action-pink w-20 ml-5" onClick={closeModalHapus}>Batal</button>

      </Modal>

    </article>
   </>
 );
}