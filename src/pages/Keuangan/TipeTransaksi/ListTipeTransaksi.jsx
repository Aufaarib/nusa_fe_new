import { FilterComponent, DataTables } from "../../../components/DataTables";
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
    name: <div>No</div>,
    selector: (_row, i) => i + 1,
    width: "55px"  
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
      {data?.status === 'Aktif' && 
          <button className="btn-action-hijau ml-3 w-auto px-2"><i className="fa fa-play"></i> {data.status}</button>
      }
      {data?.status === 'Tidak Aktif' && 
          <button className="btn-action-pink ml-3 w-auto px-2"><i className="fa fa-pause"></i> {data.status}</button>
      }
      <button onClick={() => openModalHapus(data.id, data.description)} className="btn-action-pink ml-3"><i className="fa fa-trash"></i> Hapus</button>
    </div>,
    ignoreRowClick: true,
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
    <Header category="Admin Keuangan / Tipe Transaksi" title="Tipe Transaksi" />

    <div style={{ marginTop : "50px" }}>
        <DataTables 
            columns={columns}
            data={filteredItems}
            onClick={navigateTambahTipeTransaksi}
            onFilter={e => setFilterText(e.target.value)}
            filterText={filterText}
        />
          <Modal
              isOpen={isOpenStatus}
              onRequestClose={closeModalStatus}
              style={CustomStylesStatus}
              contentLabel="Modal Status"
              ariaHideApp={false}
              >
              {sts?.type === 'success' && 
              <div style={{ textAlign : "center" }}>
                <h2>Berhasil</h2>
                <button className="btn-form" onClick={closeModalStatus}>Tutup</button>
              </div>
              }
              {sts?.type === 'error' && 
              <div style={{ textAlign : "center" }}>
                <h2>Gagal</h2>
                <button className="btn-form" onClick={closeModalStatus}>Tutup</button>
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
              <div style={{ textAlign : "center" }}>  
                  <h2 className='mb-2'>Hapus Transaksi</h2>
                  <h4 className='mb-3 text-merah'>{desc}?</h4>
                  <button className="btn-action-hijau w-20" onClick={onDelete}>Hapus</button>
                  <button className="btn-action-pink w-20 ml-2" onClick={closeModalHapus}>Batal</button>
              </div>
          </Modal>
    </div>
   </>
 );
}