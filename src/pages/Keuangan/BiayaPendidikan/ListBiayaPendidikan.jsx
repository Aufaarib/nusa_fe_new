import { FilterComponent, FilterDate } from "../../../components/Filter";
import DataTables from "../../../components/DataTables";
import getBiayaPendidikan from "../../../api/BiayaPendidikan";
import { CustomStylesStatus, CustomStylesModalHapus } from "../../../components/CustomStyles";
import { useState, useEffect } from "react";
import { utils, writeFileXLSX } from 'xlsx';
import { Header } from '../../../components';
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import axios from "axios";

export default function ListBiayaPendidikan() {
const [data, setData] = useState([]);
const [isOpenStatus, setisOpenStatus] = useState(false);
const [isOpenDelete, setisOpenDelete] = useState(false);
// const [isOpenUbahStatus, setisOpenUbahStatus] = useState(false);
const [sts, setSts] = useState(undefined);
const [deleteId, setDeleteId] = useState('');
const [desc_nama, setDesc_nama] = useState('');
// const [desc_status, setDesc_status] = useState('');
const [filterText, setFilterText] = useState('');

const filteredItems = 
    data.filter(
      data => 
      // new Date(moment(data.created_at).format('DD/MM/YYYY')) >= new Date(startDate) 
      // && new Date(moment(data.created_at).format('DD/MM/YYYY')) <= new Date(endDate) &&
      data.bank.toLowerCase().includes(filterText.toLowerCase())
      )

useEffect(() => {getBiayaPendidikan(setData, setSts)}, []);

const openModalHapus = (id, siswa) => {
  setisOpenDelete(true);
  setDesc_nama(siswa);
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
  axios.delete(`https://63f2e9beaab7d091250fb6d3.mockapi.io/nusa-biaya-pendidikan/${deleteId}`)
      .then(() => {
        setSts({ type: 'success' });
        closeModalHapus();
        setisOpenStatus(true);
        getBiayaPendidikan(setData, setSts);
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
    width: "55px"  
  },
  {
    name: "Jenis Biaya",
    selector: (data) => data.payment_type,
  },
  {
    name: "Tanggal Transaksi",
    selector: (data) => data.transaction_date,
  },
  {
    name: "Nama Bank",
    selector: (data) => data.bank,
  },
  {
    name: "Jenis Transaksi",
    selector: (data) => data.transaction_type,
  },
  {
    name: "Catatan",
    selector: (data) => data.note,
    width: "247px"
  },
  // {
  //   name: "Aksi",
  //   cell:(data) => 
  //   <div>
  //       <button className="btn-action-hijau ml-3"><i className="fa fa-play"></i> Aktif</button>
  //       <button onClick={() => openModalHapus(data.id, data.siswa)} className="btn-action-pink ml-3"><i className="fa fa-trash"></i> Hapus</button>
  //   </div>,
  //   ignoreRowClick: true,
  //   allowOverflow: true,
  //   button: true,
  //   width: "194px",
  // },
];
const navigate = useNavigate();

const navigateTambahBiayaPendidikan = () => {
    navigate('/admin/tambah-biaya-pendidikan');
};

const handleDownloadExcel = () => {
  const ws = utils.json_to_sheet(data);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "test");
  writeFileXLSX(wb, `coba.xlsx`);        
};

 return (
  <>
    <Header category="Admin Keuangan" title="List Biaya Pendidikan" />

    {/* <FilterDate
      selectedStart={startDate}
      onChangeStart={(date) => setStartDate(date)}
      selectedEnd={endDate}
      onChangeEnd={(date) => setEndDate(date)}
      />
    <br/>
    <br/> */}


    <article>

      <button className="btn-mrh float-right mb-5 ml-3" onClick={handleDownloadExcel}><i className="fa fa fa-file-text-o mr-2 mt-1"></i>Download Excel</button>

      <FilterComponent
          onClick={navigateTambahBiayaPendidikan}
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
          {sts?.type === 'success' && 
          <div>
            <h2>Berhasil</h2>
            <button className="btn-action-pink w-20 mt-5" onClick={closeModalStatus}>Tutup</button>
          </div>
          }
          {sts?.type === 'error' && 
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