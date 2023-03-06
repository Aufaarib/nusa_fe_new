import { FilterComponent } from "../../../components/Filter";
import DataTables from "../../../components/DataTables";
import getTipeTransaksi from "../../../api/TipeTransaksi";
import { CustomStylesModalHapus, CustomStylesStatus } from "../../../components/CustomStyles";
import { useState, useEffect } from "react";
import { utils, writeFileXLSX } from 'xlsx';
import { Header } from "../../../components";
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
const [sts, setSts] = useState(undefined);

const filteredItems = 
  data.filter(
    item => item.description.toLowerCase().includes(filterText.toLowerCase())||
    item.status.toLowerCase().includes(filterText.toLowerCase())
  );

useEffect(() => {getTipeTransaksi(setData, setSts)}, []);

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
        getTipeTransaksi(setData, setSts)
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
          <button className="btn-action-hijau ml-3 w-auto px-2"><i className="fa fa-play"></i> {data.status}</button>
      }
      {data?.status === 'Tidak Aktif' && 
          <button className="btn-action-pink ml-3 w-auto px-2"><i className="fa fa-pause"></i> {data.status}</button>
      }
      <button onClick={() => openModalHapus(data.id, data.description)} className="btn-action-pink ml-3"><i className="fa fa-trash"></i> Hapus</button>
    </div>,
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    width: "360px" 
  },
];

const navigate = useNavigate();

const navigateTambahTipeTransaksi = () => {
    navigate('/admin/tambah-tipe-transaksi');
};

const handleDownloadExcel = () => {
  const ws = utils.json_to_sheet(data);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "test");
  writeFileXLSX(wb, `coba.xlsx`);        
};

 return (
  <>
    <Header category="Keuangan / Tipe Transaksi" title="Tipe Transaksi" />

    <div style={{ marginTop : "35px" }}>
        <FilterComponent
          onDownloadExcel={handleDownloadExcel}
          onClick={navigateTambahTipeTransaksi}
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
            <h4 className='mb-3 text-merah ml-3'>{desc}?</h4>
            <button className="btn-action-hijau w-20 ml-4" onClick={onDelete}>Hapus</button>
            <button className="btn-action-pink w-20 ml-5" onClick={closeModalHapus}>Batal</button>

        </Modal>
    </div>
   </>
 );
}