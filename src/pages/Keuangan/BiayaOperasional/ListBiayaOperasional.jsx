import { FilterComponent, FilterDate } from "../../../components/Filter";
import DataTables from "../../../components/DataTables";
import getBiayaOperasional from "../../../api/BiayaOperasional";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { CustomStylesStatus, CustomStylesModalHapus } from "../../../components/CustomStyles";
import { useState, useEffect } from "react";
import { utils, writeFileXLSX } from 'xlsx';
import { Header } from '../../../components';
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import moment from "moment/moment";

export default function ListBiayaOperasional() {
const [data, setData] = useState([]);
const [isOpenStatus, setisOpenStatus] = useState(false);
const [sts, setSts] = useState(undefined);
const [filterText, setFilterText] = useState('');

const filteredItems = 
    data.filter(
      // new Date(moment(data.created_at).format('DD/MM/YYYY')) >= new Date(startDate) 
      // && new Date(moment(data.created_at).format('DD/MM/YYYY')) <= new Date(endDate) &&
      data => data.bank.toLowerCase().includes(filterText)||
      data.note.toLowerCase().includes(filterText.toLowerCase())
      ) 

useEffect(() => {getBiayaOperasional(setData, setSts)}, []);

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
    width: "140px",
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
    width: "305px",
    sortable: true
  },
  {
    name: "Jumlah",
    selector: (data) => data.total_fee,
    width: "100px",
    sortable: true
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
    width: "315px",
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
    <Header category="Keuangan / Biaya Operasional" title="List Biaya Operasional" />

    <div style={{ display : "flex", float : "right", marginBottom : "5px", gap : "10px", padding : "0px 14px" }}>
        <button style={{ fontSize : "12px", width : "175px" }} className="btn-mrh" onClick={handleDownloadExcel}><i className="fa fa-file-text-o mr-2 mt-1"></i>Download Format Excel</button>
        <button style={{ fontSize : "12px" }} className="btn-mrh" onClick={navigateTambahBiayaOperasional}><i className="fa fa-plus mr-2 mt-1"></i>Tambah</button>
    </div>

    <div style={{ marginTop : "65px" }}>
        <FilterComponent
            onClick={navigateTambahBiayaOperasional}
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