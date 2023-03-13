import { FilterComponentSaring, DataTablesSaring } from "../../../components/DataTables";
import { getBiayaOperasional, getBiayaOperasionalByDate} from "../../../api/BiayaOperasional";
import { CustomStylesStatus } from "../../../components/CustomStyles";
import { useState, useEffect } from "react";
import { utils, writeFileXLSX } from 'xlsx';
import { Header } from '../../../components';
import { ModalFilter } from "../../../components/ModalPopUp";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import moment from "moment/moment";

export default function ListBiayaOperasional() {
const [data, setData] = useState([]);
const [isOpenStatus, setisOpenStatus] = useState(false);
const [isOpenFilter, setisOpenFilter] = useState(false);
const [sts, setSts] = useState(undefined);
const [startDateInput, setStartDateInput] = useState(new Date());
const [endDateInput, setEndDateInput] = useState(new Date());
const [startDate, setStartDate] = useState('');
const [endDate, setEndDate] = useState('');
const [filterText, setFilterText] = useState('');

console.log(startDate)
console.log(endDate)

const filteredItems = 
    data.filter(
      data => data.bank.toLowerCase().includes(filterText)||
      data.note.toLowerCase().includes(filterText.toLowerCase())
      ) 

useEffect(() => {getBiayaOperasional(setData, setSts)}, []);

// const closeModalStatus = () => {
//   setisOpenStatus(false);
//   setSts('');
// }
const openModalFilter = () => {
  setisOpenFilter(true);
}
const closeModalFilter = () => {
  setisOpenFilter(false);
}
const handleChangeStart = (date) => {
  setStartDateInput(date);
  setStartDate(moment(date).format("yyyy-MM-DD"));
}
const handleChangeEnd = (date) => {
  setEndDateInput(date);
  setEndDate(moment(date).format("yyyy-MM-DD"));
}
const FilterDateHandler = () => {
  setisOpenFilter(false)
  getBiayaOperasionalByDate(setData, setSts, startDate, endDate)
}

const columns = [
  {
    name: 'No',
    selector: (_row, i) => i + 1,
    width: "55px"
  },
  {
    name: <div>Jenis Biaya</div>,
    selector:(data) => data.payment_type,
    cell:(data) => <div>{data.payment_type}</div>,
    width: "130px",
    sortable: true
  },
  {
    id: "tanggalTransaksi",
    name: <div>Tanggal Transaksi</div>,
    selector:(data) => data.transaction_date,
    cell:(data) => moment(data.transaction_date).format("DD/MM/YYYY"),
    width: "110px",
    sortable: true
  },
  {
    name: <div>Nama Bank</div>,
    selector:(data) => data.bank,
    cell:(data) => <div>{data.bank}</div>,
    width: "160px",
    sortable: true
  },
  {
    name: <div>Jenis Transaksi</div>,
    selector:(data) => data.transaction_type,
    cell:(data) => <div>{data.transaction_type}</div>,
    width: "100px",
    sortable: true
  },
  {
    name: <div>Catatan</div>,
    selector:(data) => data.note,
    cell:(data) => <div>{data.note}</div>,
    width: "auto",
    sortable: true
  },
  {
    name: <div>Jumlah</div>,
    selector:(data) => data.total_fee,
    cell:(data) => <div>{new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR", minimumFractionDigits: 0}).format(data.total_fee)}</div>,
    width: "170px",
    sortable: true
  },
  // {
  //   name: "Aksi",
  //   cell:(data) => 
  //   <div>
  //       <button className="btn-action-hijau ml-3"><i className="fa fa-play"></i> Aktif</button>
  //       <button className="btn-action-pink ml-3"><i className="fa fa-trash"></i> Hapus</button>
  //   </div>,
  //   ignoreRowClick: true,
  //   allowOverflow: true,
  //   button: true,
  //   width: "265px",
  // },
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
    <Header category="Admin Keuangan / Biaya Operasional" title="List Biaya Operasional" />

    <div style={{ display : "block", overflow : "auto"}}>
      <div style={{ display : "flex", gap : "10px", float : "right", padding : "5px 14px" }}>
        <button style={{ fontSize : "12px", width : "175px" }} className="btn-mrh" onClick={handleDownloadExcel}><i className="fa fa-file-text-o mr-2 mt-1"></i>Download Format Excel</button>
        <button style={{ fontSize : "12px" }} className="btn-mrh" onClick={navigateTambahBiayaOperasional}><i className="fa fa-plus mr-2 mt-1"></i>Tambah</button>
      </div>
    </div>

    <div style={{ marginTop : "15px" }}>
        <DataTablesSaring
            columns={columns}
            data={filteredItems}
            defaultSortFieldId="tanggalTransaksi"
            onClick={() => openModalFilter()}
            onFilter={e => setFilterText(e.target.value)}
            filterText={filterText}
        />
        <ModalFilter
            onChangeStart={handleChangeStart}
            onChangeEnd={handleChangeEnd}
            selectedStart={startDateInput}
            selectedEnd={endDateInput}
            isOpenFilter={isOpenFilter}
            onClickFilterDate={FilterDateHandler}
            closeModalFilter={closeModalFilter}
        />
        {/* <Modal
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
        </Modal> */}
    </div>
   </>
 );
}