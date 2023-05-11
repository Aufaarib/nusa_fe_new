import { DataTables } from "../../../components/DataTables";
import { CustomStylesModalHapus } from "../../../components/CustomStyles";
import { CustomStylesStatus } from "../../../components/ModalPopUp";
import { getMapel, deleteMapel, updateStatusMapel, updateMapel } from "../../../api/MataPelajaran";
import { useState, useEffect } from "react";
import { Header } from "../../../components";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import { ModalStatusList } from "../../../components/ModalPopUp";

export default function ListMataPelajaran() {
const [data, setData] = useState([]);   
const [status, setStatus] = useState('');
const [isOpenUpdateTidakAktif, setisOpenUpdateTidakAktif] = useState(false);
const [isOpenUpdateAktif, setisOpenUpdateAktif] = useState(false);
const [isOpenStatus, setisOpenStatus] = useState(false);
const [isOpenDelete, setisOpenDelete] = useState(false);
const [sts, setSts] = useState(undefined);
const [updateId, setUpdateId] = useState("");
const [deleteId, setDeleteId] = useState("");
const [desc, setDesc] = useState('');
const [desc_nama, setDesc_nama] = useState('');
const [filterText, setFilterText] = useState('');

let filteredItems = data

if (data !== null) {
  filteredItems = 
    data.filter(
      data => data.course_name.toLowerCase().includes(filterText.toLowerCase())
      )
}

useEffect(() => {getMapel(setData, setSts)}, []);

const handleNonActiveStatus = (id, course_name) => {
  setisOpenUpdateTidakAktif(true);
  setStatus("Aktif");
  setDesc(course_name);
  setUpdateId(id);
}

const closeModalUpdateTidakAktif = () => {
  setisOpenUpdateTidakAktif(false);
}

const handleActiveStatus = (id, course_name) => {
  setisOpenUpdateAktif(true);
  setStatus("Tidak Aktif");
  setDesc(course_name);
  setUpdateId(id);
}

const closeModalUpdateAktif = () => {
  setisOpenUpdateAktif(false);
}

const onUpdateStatus = () => {
  updateStatusMapel(setSts, status, updateId)
  closeModalUpdateAktif();
  closeModalUpdateTidakAktif();
  setisOpenStatus(true);
}

const openModalHapus = (id, course_name) => {
  setisOpenDelete(true);
  setDesc_nama(course_name);
  setDeleteId(id);
}

const closeModalHapus = () => {
  setisOpenDelete(false);
}

const onDelete = () => {
  deleteMapel(setSts, deleteId);
  closeModalHapus();
  setisOpenStatus(true);
}

const closeModalStatus = () => {
  setisOpenStatus(false);
  getMapel(setData, setSts)
  setSts('');
}

const columns = [
  {
    name: <div>No</div>,
    selector: (_row, i) => i + 1,
    width: "55px"  
  },
  {
    name: <div>Code</div>,
    selector: (data) => data.code,
    cell:(data) => <div>{data.code}</div>,
    width: "auto"
  },
  {
    name: <div>Kelompok Mata Pelajaran</div>,
    selector: (data) => data.group_course_id,
    cell:(data) => <div>{data.group_course_id}</div>,
    width: "auto"
  },
  {
    name: <div>Nama Mata Pelajaran</div>,
    selector: (data) => data.course_name,
    cell:(data) => <div>{data.course_name}</div>,
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
        <button style={{ fontSize : "14px" }} onClick={() => navigateUbahMapel(data.id, data.course_name,data.code, data.group_course_id, data.description)} className="btn-action-ungu"><i className="fa fa-pencil"></i> Ubah</button>
        {data?.status === 'Aktif' && 
          <button className="btn-action-hijau ml-3 w-auto px-2" onClick={() => handleActiveStatus(data.id, data.course_name)}><i className="fa fa-play"></i> {data.status}</button>
        }
        {data?.status === 'Tidak Aktif' && 
            <button className="btn-action-pink ml-3 w-auto px-2"  onClick={() => handleNonActiveStatus(data.id, data.course_name)}><i className="fa fa-pause"></i> {data.status}</button>
        }
        <button style={{ fontSize : "14px" }} onClick={() => openModalHapus(data.id, data.course_name)} className="btn-action-pink ml-3"><i className="fa fa-trash"></i> Hapus</button>
    </div>,
    ignoreRowClick: true,
    button: true,
    width: "360px",
  },
];

const navigate = useNavigate();

const navigateTambahMataPelajaran = () => {
    navigate('/admin/tambah-mata-pelajaran');
};

const navigateUbahMapel = (id, course_name, code, group_course_id, description) => {
      navigate('/admin/ubah-mata-pelajaran', { 
        state : {
            id : id,
            course_name : course_name,
            code : code,
            group_course_id : group_course_id,
            description : description
        }
      });
  }; 

 return (
  <>
    <Header category="Admin KBM / Mata Pelajaran" title="List Mata Pelajaran" />

    <div style={{ marginTop : "50px" }}>

      <DataTables
        columns={columns}
        data={filteredItems}
        onClick={navigateTambahMataPelajaran}
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
          style={CustomStylesModalHapus}
          contentLabel="Modal Hapus"
          ariaHideApp={false}
      >
          <div style={{ textAlign : "center" }}>  
              <h2 className='mb-2'>Hapus Mapel</h2>
              <h4 className='mb-3 text-merah'>{desc_nama}?</h4>
              <button className="btn-action-hijau w-20" onClick={onDelete}>Hapus</button>
              <button className="btn-action-pink w-20 ml-2" onClick={closeModalHapus}>Batal</button>
          </div>
      </Modal>
    </div>
  </>
 );
}