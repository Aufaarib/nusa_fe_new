import { DataTables } from "../../../components/DataTables";
import { CustomStylesModalHapus } from "../../../components/CustomStyles";
import { getJadwalMapel } from "../../../api/JadwalMataPelajaran";
import { useState, useEffect } from "react";
import { Header } from "../../../components";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import { ModalStatusList } from "../../../components/ModalPopUp";
const moment = require('moment');

export default function ListJadwalMataPelajaran() {
const [data, setData] = useState([]);
const [isOpenStatus, setisOpenStatus] = useState(false);
const [isOpenDelete, setisOpenDelete] = useState(false);
const [sts, setSts] = useState(undefined);
const [deleteId, setDeleteId] = useState("");
const [desc, setDesc] = useState("");
const [desc_nama, setDesc_nama] = useState('');
const [filterText, setFilterText] = useState('');

let filteredItems = data

if (data !== null) {
  filteredItems = 
    data.filter(
      data => data.day.toLowerCase().includes(filterText.toLowerCase())
      )
}

useEffect(() => {getJadwalMapel(setData, setSts)}, []);

const openModalHapus = (id, day) => {
  setisOpenDelete(true);
  setDesc_nama(day);
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
  getJadwalMapel(setData, setSts)
  setSts('');
}

const columns = [
  {
    name: <div>No</div>,
    selector: (_row, i) => i + 1,
    width: "55px"  
  },
  {
    name: <div>Kelas</div>,
    selector: (data) => data.class_id,
    cell:(data) => <div>{data.class_id}</div>,
    width: "auto"
  },
  {
    name: <div>Mata Pelajaran</div>,
    selector: (data) => data.course_id,
    cell:(data) => <div>{data.course_id}</div>,
    width: "auto"
  },
  {
    name: <div>Hari</div>,
    selector: (data) => data.day,
    cell:(data) => <div>{data.day}</div>,
    width: "auto"
  },
  {
    name: <div>Jam Mulai</div>,
    selector: (data) => data.start_time,
    cell:(data) => <div>{moment.parseZone(data.start_time).format('hh:mm a')}</div>,
    width: "auto"
  },
  {
    name: <div>Jam Selesai</div>,
    selector: (data) => data.end_time,
    cell:(data) => <div>{moment.parseZone(data.end_time).format('hh:mm a')}</div>,
    width: "auto"
  },
  {
    name: <div>Aksi</div>,
    cell:(data) => 
    <div>
        <button style={{ fontSize : "14px" }} onClick={() => navigateUbahMapel(data.id, data.day)} className="btn-action-ungu"><i className="fa fa-pencil"></i> Ubah</button>
        <button style={{ fontSize : "14px" }} onClick={() => openModalHapus(data.id, data.day)} className="btn-action-pink ml-3"><i className="fa fa-trash"></i> Hapus</button>
    </div>,
    ignoreRowClick: true,
    button: true,
    width: "360px",
  },
];

const navigate = useNavigate();

const navigateTambahMataPelajaran = () => {
    navigate('/admin/tambah-jadwal-mata-pelajaran');
};

const navigateUbahMapel = (id, course_name) => {
      navigate('/admin/ubah-mata-pelajaran', { 
        state : {
            id : id,
            course_name : course_name,
        }
      });
  }; 

 return (
  <>
    <Header category="Admin KBM / Jadwal Mata Pelajaran" title="List Jadwal Mata Pelajaran" />

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
          isOpen={isOpenDelete}
          onRequestClose={closeModalHapus}
          style={CustomStylesModalHapus}
          contentLabel="Modal Hapus"
          ariaHideApp={false}
      >
          <div style={{ textAlign : "center" }}>  
              <h2 className='mb-2'>Hapus Transaksi</h2>
              <h4 className='mb-3 text-merah'>{desc_nama}?</h4>
              <button className="btn-action-hijau w-20" onClick={onDelete}>Hapus</button>
              <button className="btn-action-pink w-20 ml-2" onClick={closeModalHapus}>Batal</button>
          </div>
      </Modal>
    </div>
  </>
 );
}