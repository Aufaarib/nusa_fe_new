import { Paper } from "@mui/material";
import FilterComponent from "../../components/Filter";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import { Header } from '../../components';
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import axios from "axios";

export default function ListTipeTransaksi() {
const [items, setItems] = useState([]);
const [isOpenStatus, setisOpenStatus] = useState(false);
const [isOpenDelete, setisOpenDelete] = useState(false);
const [deleteId, setDeleteId] = useState("");
const [desc, setDesc] = useState("");
const [filterText, setFilterText] = useState("");
const [sts, setSts] = useState(undefined);

const filteredItems = 
  items.filter(
    item => item.description.toLowerCase().includes(filterText.toLowerCase())||
    item.status.toLowerCase().includes(filterText.toLowerCase())
  );

useEffect(() => {
  axios.get("https://nusa.nuncorp.id/golang/api/v1/transaction-type/fetch")
    .then((response) => {
      setItems(response.data.data);
      setSts({ type: 'success' });
    })
    .catch((error) => {
      setSts({ type: 'error', error });
    });
}, []);


const getData = () => {
  axios.get(`https://nusa.nuncorp.id/golang/api/v1/transaction-type/fetch`)
    .then((response) => {
      setItems(response.data.data);
      setSts({ type: 'success' });
    })
    .catch((error) => {
      setSts({ type: 'error', error });
    });
}

const openModalHapus = (id, description) => {
  setisOpenDelete(true);
  setDesc(description);
  setDeleteId(id);
}

const closeModalHapus = () => {
  setisOpenDelete(false);
}

const onDelete = () => {
  axios.delete(`https://nusa.nuncorp.id/golang/api/v1/transaction-type/delete/${deleteId}`)
      .then(() => {
        setSts({ type: 'success' });
        closeModalHapus();
        setisOpenStatus(true);
        getData();
        })
      .catch((error) => {
          setSts({ type: 'error', error });
      });
}

const closeModalStatus = () => {
  setisOpenStatus(false);
  setSts('');
}

const columns = [
  {
    name: 'No',
    selector: (_row, i) => i + 1,
    width: "37px"  
  },
  {
    name: "Deskripsi",
    selector: (data) => data.description,
    width: "387px" 
  },
  { 
    name: "Status",
    selector: (data) => data.status,
  },
  {
    name: "Aksi",
    cell:(data) =>
    <div>
      {data?.status === 'Aktif' && 
        <div>
          <button className="btn-action-hijau ml-3 w-auto px-2"><i className="fa fa-play"></i> {data.status}</button>
          <button onClick={() => openModalHapus(data.id, data.description)} className="btn-action-pink ml-3"><i class="fa fa-trash"></i> Hapus</button>
        </div>
      }
      {data?.status === 'Tidak Aktif' && 
        <div>
          <button className="btn-action-pink ml-3 w-auto px-2"><i className="fa fa-pause"></i> {data.status}</button>
          <button onClick={() => openModalHapus(data.id, data.description)} className="btn-action-pink ml-3"><i class="fa fa-trash"></i> Hapus</button>
        </div>
      }
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

    <button className="w-auto btn-ungu mb-5" onClick={navigateTambahTipeTransaksi}><i className="fa fa-plus-square-o mr-2 mt-1"></i> Tambah</button>

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
          {sts?.type === 'success' && 
          <div>
            <h2 className="ml-8">Berhasil</h2>
            <button className="btn-action-pink w-20 mt-5 ml-10" onClick={closeModalStatus}>Tutup</button>
          </div>
          }
          {sts?.type === 'error' && 
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
          <h4 className='mb-3 text-merah ml-3'>{desc}?</h4>
          <button className="btn-action-hijau w-20 ml-4" onClick={onDelete}>Hapus</button>
          <button className="btn-action-pink w-20 ml-5" onClick={closeModalHapus}>Batal</button>

      </Modal>

    </article>
   </>
 );
}