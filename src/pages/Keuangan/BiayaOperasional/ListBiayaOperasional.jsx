import { FilterComponent, FilterDate } from "../../../components/Filter";
import DataTables from "../../../components/DataTables";
import { DateRangePicker } from "react-date-range";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { CustomStylesStatus, CustomStylesModalHapus } from "../../../components/CustomStyles";
import { useState, useEffect } from "react";
import { utils, writeFileXLSX } from 'xlsx';
import { Header } from '../../../components';
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import axios from "axios";
import moment from "moment";

export default function ListBiayaOperasional() {
const [data, setData] = useState([]);   
const [allData, setAllData] = useState([]);
const [isOpenStatus, setisOpenStatus] = useState(false);
const [isOpenDelete, setisOpenDelete] = useState(false);
// const [isOpenUbahStatus, setisOpenUbahStatus] = useState(false);
const [status, setStatus] = useState(undefined);
const [deleteId, setDeleteId] = useState('');
const [desc_nama, setDesc_nama] = useState('');
// const [desc_status, setDesc_status] = useState('');
const [filterText, setFilterText] = useState('');
const [startDate,setStartDate]= useState(new Date());
const [endDate,setEndDate]= useState(new Date());

const filteredItems = 
    data.filter(
      data => 
      // new Date(moment(data.created_at).format('DD/MM/YYYY')) >= new Date(startDate) 
      // && new Date(moment(data.created_at).format('DD/MM/YYYY')) <= new Date(endDate) &&
      data.bank.toLowerCase().includes(filterText.toLowerCase())
      ) 

useEffect(() => {
  axios
    .get("https://63f2e9beaab7d091250fb6d3.mockapi.io/nusa-biaya-operasional")
    .then((res) => {
      setData(res.data);
      setAllData(res.data);
      setStatus({ type: 'success' });
    })
    .catch((error) => {
      setStatus({ type: 'error', error });
    });
}, []);

const getData = () => {
  axios.get(`https://63f2e9beaab7d091250fb6d3.mockapi.io/nusa-biaya-operasional`)
      .then((getData) => {
        setData(getData.data);
        setAllData(getData.data);
        setStatus({ type: 'success' });
      })
      .catch((error) => {
        setStatus({ type: 'error', error });
      });
}

const openModalHapus = (id, cost_center) => {
  setisOpenDelete(true);
  setDesc_nama(cost_center);
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
  axios.delete(`https://63f2e9beaab7d091250fb6d3.mockapi.io/nusa-biaya-operasional/${deleteId}`)
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
    width: "55px"  
  },
  {
    name: "Cost Center",
    selector: (data) => data.cost_center,
  },
  {
    name: "Jenis Transaksi",
    selector: (data) => data.jenis_transaksi,
  },
  {
    name: "Bank",
    selector: (data) => data.bank,
  },
  {
    name: "Jumlah",
    selector: (data) => data.jumlah,
  },
  {
    name: "Catatan",
    selector: (data) => data.catatan,
    width: "247px"
  },
  {
    name: "Aksi",
    cell:(data) => 
    <div>
        <button className="btn-action-hijau ml-3"><i className="fa fa-play"></i> Aktif</button>
        <button onClick={() => openModalHapus(data.id, data.cost_center)} className="btn-action-pink ml-3"><i className="fa fa-trash"></i> Hapus</button>
    </div>,
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    width: "194px",
  },
];

const navigate = useNavigate();

const navigateTambahBiayaOperasional = () => {
  // 👇️ navigate to /contacts
    navigate('/admin/tambah-biaya-operasional');
};

const handleDownloadExcel = () => {
  const ws = utils.json_to_sheet(data);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "test");
  writeFileXLSX(wb, `coba.xlsx`);        
};

 return (
  <>
    <Header category="Admin Keuangan" title="List Biaya Operasional" />

    {/* <FilterDate
      selectedStart={startDate}
      onChangeStart={(date) => setStartDate(date)}
      selectedEnd={endDate}
      onChangeEnd={(date) => setEndDate(date)}
      />
    <br/>
    <br/> */}

    <article>

      <button className="btn-ungu float-right mb-5 ml-3" onClick={handleDownloadExcel}><i className="fa fa-plus-square-o mr-2 mt-1"></i>Download Excel</button>

      <FilterComponent
          onClick={navigateTambahBiayaOperasional}
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