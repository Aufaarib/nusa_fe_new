import FilterComponent from "../../../components/Filter";
import DataTables from "../../../components/DataTables";
import { CustomStylesStatus, CustomStylesModalHapus } from "../../../components/CustomStyles";
import { useState, useEffect } from "react";
import { utils, writeFileXLSX } from 'xlsx';
import { Header } from "../../../components";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import axios from "axios";

export default function ListCostCenter() {
const [data, setData] = useState([]);
const [isOpenStatus, setisOpenStatus] = useState(false);
const [isOpenDelete, setisOpenDelete] = useState(false);
const [deleteId, setDeleteId] = useState("");
const [desc, setDesc] = useState("");
const [filterText, setFilterText] = useState("");
const [sts, setSts] = useState(undefined);

const filteredItems = 
  data.filter(
    item => item.item.toLowerCase().includes(filterText)||
    item.group.toLowerCase().includes(filterText.toLowerCase())
  );

useEffect(() => {
  axios.get("https://63e1c25ff59c591411a61021.mockapi.io/nusa-list-cost-center")
    .then((res) => {
      setData(res.data);
      setSts({ type: 'success' });
    })
    .catch((error) => {
      setSts({ type: 'error', error });
    });
}, []);


const getData = () => {
  axios.get(`https://63e1c25ff59c591411a61021.mockapi.io/nusa-list-cost-center`)
    .then((res) => {
      setData(res.data);
      setSts({ type: 'success' });
    })
    .catch((error) => {
      setSts({ type: 'error', error });
    });
}

const openModalHapus = (id, code) => {
  setisOpenDelete(true);
  setDesc(code);
  setDeleteId(id);
}

const closeModalHapus = () => {
  setisOpenDelete(false);
}

const onDelete = () => {
  axios.delete(`https://63e1c25ff59c591411a61021.mockapi.io/nusa-list-cost-center/${deleteId}`)
      .then(() => {
        setSts({ type: 'success' });
        closeModalHapus();
        setisOpenStatus(true);
        getData();
        })
      .catch((error) => {
          setSts({ type: 'error', error });
      });
}

const columns = [
  {
    name: 'No',
    selector: (_row, i) => i + 1,
    width: "55px"  
  },
  {
    name: "Code",
    selector: (data) => data.code,
    width: "55px"
  },
  { 
    name: "Group",
    selector: (data) => data.group,
  },
  { 
    name: "Sub Group",
    selector: (data) => data.sub_group,
  },
  { 
    name: "Item",
    selector: (data) => data.item,
  },
  { 
    name: "Kredit/Debit",
    selector: (data) => data.debit_kredit,
    width: "99px"
  },
  {
    name: "Aksi",
    cell:(data) =>
    <div>
        <div>
            <button className="btn-action-hijau ml-3 w-auto px-2"><i className="fa fa-play"></i> Aktif</button>
            <button onClick={() => openModalHapus(data.id, data.code)} className="btn-action-pink ml-3"><i className="fa fa-trash"></i> Hapus</button>
        </div>

      {/* {data?.status === 'Aktif' && 
        <div>
          <button className="btn-action-hijau ml-3 w-auto px-2"><i className="fa fa-play"></i> Aktiv</button>
          <button onClick={() => openModalHapus(data.id, data.code)} className="btn-action-pink ml-3"><i className="fa fa-trash"></i> Hapus</button>
        </div>
      } */}
      {/* {data?.status === 'Tidak Aktif' && 
        <div>
          <button className="btn-action-pink ml-3 w-auto px-2"><i className="fa fa-pause"></i> {data.status}</button>
          <button onClick={() => openModalHapus(data.id, data.description)} className="btn-action-pink ml-3"><i className="fa fa-trash"></i> Hapus</button>
        </div>
      } */}
    </div>,
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    width: "183px" 
  },
];

const closeModalStatus = () => {
  setisOpenStatus(false);
  setSts('');
}

const navigate = useNavigate();

const navigateCostCenter = () => {
  // 👇️ navigate to /contacts
    navigate('/admin/tambah-cost-center');
};

const handleDownloadExcel = () => {
  const ws = utils.json_to_sheet(data);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "test");
  writeFileXLSX(wb, `coba.xlsx`);        
};

 return (
  <>
    <Header category="Admin Keuangan" title="Cost Center" />

    <article>
      <FilterComponent
          onDownloadExcel={handleDownloadExcel}
          onClick={navigateCostCenter}
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

    </article>
   </>
 );
}