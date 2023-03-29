import { DataTables } from "../../../components/DataTables";
import { CustomStylesStatus } from "../../../components/ModalPopUp";
import { getSemester } from "../../../api/Semester";
import { useState, useEffect } from "react";
import { Header } from "../../../components";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import { ModalStatusList } from "../../../components/ModalPopUp";

export default function ListSemester() {
const [data, setData] = useState([]);
const [status, setStatus] = useState(false);
const [isOpenUpdateTidakAktif, setisOpenUpdateTidakAktif] = useState(false);
const [isOpenUpdateAktif, setisOpenUpdateAktif] = useState(false);
const [isOpenStatus, setisOpenStatus] = useState(false);
const [isOpenDelete, setisOpenDelete] = useState(false);
const [sts, setSts] = useState(undefined);
const [updateId, setUpdateId] = useState("");
const [deleteId, setDeleteId] = useState("");
const [desc, setDesc] = useState("");
const [desc_nama, setDesc_nama] = useState('');
const [filterText, setFilterText] = useState('');

let filteredItems = data

if (data !== null) {
  filteredItems = 
    data.filter(
      data => data.name.toLowerCase().includes(filterText.toLowerCase())
      )
}

useEffect(() => {getSemester(setData, setSts)}, []);

const handleNonActiveStatus = (id, description) => {
  setisOpenUpdateTidakAktif(true);
  setStatus("Aktif");
  setDesc(description);
  setUpdateId(id);
}

const closeModalUpdateTidakAktif = () => {
  setisOpenUpdateTidakAktif(false);
}

const handleActiveStatus = (id, description) => {
  setisOpenUpdateAktif(true);
  setStatus("Tidak Aktif");
  setDesc(description);
  setUpdateId(id);
}

const closeModalUpdateAktif = () => {
  setisOpenUpdateAktif(false);
}

const onUpdateStatus = () => {
  // updateTipeTransaksi(setSts, status, updateId)
  closeModalUpdateAktif();
  closeModalUpdateTidakAktif();
  setisOpenStatus(true);
}

const openModalHapus = (id, name) => {
  setisOpenDelete(true);
  setDesc_nama(name);
  setDeleteId(id);
}

const closeModalHapus = () => {
  setisOpenDelete(false);
}

const onDelete = () => {
  // deleteBank(setSts, deleteId);
  closeModalHapus();
  setisOpenStatus(true);
}

const closeModalStatus = () => {
  setisOpenStatus(false);
  getSemester(setData, setSts)
  setSts('');
}

const columns = [
  {
    name: <div>No</div>,
    selector: (_row, i) => i + 1,
    width: "55px"  
  },
  {
    name: <div>Nama</div>,
    selector: (data) => data.name,
    cell:(data) => <div>{data.name}</div>,
    width: "auto"
  },
  {
    name: <div>Deskripsi</div>,
    selector: (data) => data.description,
    cell:(data) => <div>{data.description}</div>,
    width: "auto"
  },
  {
    name: <div>Status</div>,
    selector: (data) => data.status,
    cell:(data) => <div>{data.status}</div>,
    width: "auto"
  },
  {
    name: <div>Aksi</div>,
    cell:(data) => 
    <div>
        <button style={{ fontSize : "14px" }} onClick={() => navigateUbahKelas(data.id, data.name)} className="btn-action-ungu"><i className="fa fa-pencil"></i> Ubah</button>
        {data?.status === 'Aktif' && 
          <button className="btn-action-hijau ml-3 w-auto px-2" onClick={() => handleActiveStatus(data.id, data.name)}><i className="fa fa-play"></i> {data.status}</button>
        }
        {data?.status === 'Tidak Aktif' && 
            <button className="btn-action-pink ml-3 w-auto px-2"  onClick={() => handleNonActiveStatus(data.id, data.name)}><i className="fa fa-pause"></i> {data.status}</button>
        }
        <button style={{ fontSize : "14px" }} onClick={() => openModalHapus(data.id, data.name)} className="btn-action-pink ml-3"><i className="fa fa-trash"></i> Hapus</button>
    </div>,
    ignoreRowClick: true,
    button: true,
    width: "360px",
  },
];

const navigate = useNavigate();

const navigateTambahSemester = () => {
    navigate('/admin/tambah-semester');
};

const navigateUbahKelas = (id, name) => {
      navigate('/admin/ubah-semester', { 
        state : {
            id : id,
            name : name,
        }
      });
  }; 

 return (
  <>
    <Header category="Admin KBM / Semester" title="List Semester" />

    <div style={{ marginTop : "50px" }}>

    <DataTables
        columns={columns}
        data={filteredItems}
        onClick={navigateTambahSemester}
        onFilter={e => setFilterText(e.target.value)}
        filterText={filterText}
      />
      <ModalStatusList
          isOpen={isOpenStatus}
          onRequestClose={closeModalStatus}
          status={sts}
      />
      <Modal
          isOpen={isOpenUpdateTidakAktif}
          onRequestClose={closeModalUpdateTidakAktif}
          style={CustomStylesStatus}
          contentLabel="Modal Hapus"
          ariaHideApp={false}
      >
          <div style={{ textAlign : "center" }}>  
              <h2 className='mb-2'>Aktifkan</h2>
              <h4 className='mb-3 text-merah'>{desc}?</h4>
              <button className="btn-action-hijau w-20" onClick={onUpdateStatus}>Aktifkan</button>
              <button className="btn-action-pink w-20 ml-2" onClick={closeModalUpdateTidakAktif}>Batal</button>
          </div>
      </Modal>
      <Modal
          isOpen={isOpenUpdateAktif}
          onRequestClose={closeModalUpdateAktif}
          style={CustomStylesStatus}
          contentLabel="Modal Hapus"
          ariaHideApp={false}
      >
          <div style={{ textAlign : "center" }}>  
              <h2 style={{ marginBottom : "10px" }}>Non-Aktifkan</h2>
              <h4 className='text-merah' style={{ marginBottom : "10px" }}>{desc}?</h4>
              <button style={{ padding : "0 5px", marginBottom : "10px", width : "auto" }}className="btn-action-hijau" onClick={onUpdateStatus}>Non-Aktifkan</button>
              <button style={{ padding : "0 5px", marginBottom : "10px", width : "auto", marginLeft : "10px" }} className="btn-action-pink" onClick={closeModalUpdateAktif}>Batal</button>
          </div>
      </Modal>
      <Modal
          isOpen={isOpenDelete}
          onRequestClose={closeModalHapus}
          style={CustomStylesStatus}
          contentLabel="Modal Hapus"
          ariaHideApp={false}
      >
          <div style={{ textAlign : "center" }}>  
              <h2 className='mb-2'>Hapus</h2>
              <h4 className='mb-3 text-merah'>{desc_nama}?</h4>
              <button className="btn-action-hijau w-20" onClick={onDelete}>Hapus</button>
              <button className="btn-action-pink w-20 ml-2" onClick={closeModalHapus}>Batal</button>
          </div>
      </Modal>
    </div>
  </>
 );
}