import { FilterComponent, FilterDate } from "../../../components/Filter";
import DataTables from "../../../components/DataTables";
import getBiayaPendidikan from "../../../api/BiayaPendidikan";
import { CustomStylesStatus, CustomStylesModalHapus } from "../../../components/CustomStyles";
import { useState, useEffect } from "react";
import { utils, writeFileXLSX } from 'xlsx';
import { Header } from '../../../components';
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import moment from "moment";

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
    width: "110px",
    sortable: true
  },
  {
    id: "tanggalTransaksi",
    name: "Tanggal Transaksi",
    selector: (data) => moment(data.transaction_date).format("MM-DD-YYYY"),
    width: "170px",
    sortable: true
  },
  {
    name: "Nama Bank",
    selector: (data) => data.bank,
    width: "195px",
    sortable: true
  },
  {
    name: "Jenis Transaksi",
    selector: (data) => data.transaction_type,
    width: "140px",
    sortable: true
  },
  {
    name: "Catatan",
    selector: (data) => data.note,
    width: "210px",
    sortable: true
  },
  {
    name: "Jumlah",
    selector: (data) => data.total_fee,
    width: "100px",
    sortable: true
  },
  {
    name: "Nama Siswa",
    selector: (data) => data.nama_lengkap_anak,
    width: "200px",
    sortable: true
  },
  {
    name: "Kelas",
    selector: (data) => data.class,
    width: "90px"
  },
  {
    name: "Aksi",
    cell:(data) => 
    <div>
        <button className="btn-action-hijau ml-3"><i className="fa fa-play"></i> Aktif</button>
        <button className="btn-action-pink ml-3"><i className="fa fa-trash"></i> Hapus</button>
    </div>,
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    width: "194px",
  },
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
    <Header category="Keuangan / Biaya Pendidikan" title="List Biaya Pendidikan" />

    <div style={{ display : "flex", float : "right", marginBottom : "5px", gap : "10px", padding : "0px 14px" }}>
        <button style={{ fontSize : "12px", width : "175px" }} className="btn-mrh" onClick={handleDownloadExcel}><i className="fa fa-file-text-o mr-2 mt-1"></i>Download Format Excel</button>
        <button style={{ fontSize : "12px" }} className="btn-mrh" onClick={navigateTambahBiayaPendidikan}><i className="fa fa-plus mr-2 mt-1"></i>Tambah</button>
    </div>

    <div style={{ marginTop : "65px" }}>
        <FilterComponent
            onClick={navigateTambahBiayaPendidikan}
            onFilter={e => setFilterText(e.target.value)}
            filterText={filterText}
        />
        <DataTables
            columns={columns}
            data={filteredItems}
            defaultSortFieldId="tanggalTransaksi"
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
    </div>
   </>
 );
}