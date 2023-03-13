import { DataTables } from "../../../components/DataTables";
import getCostCenter from "../../../api/CostCenter";
import { CustomStylesStatus, CustomStylesModalHapus } from "../../../components/CustomStyles";
import { useState, useEffect } from "react";
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

useEffect(() => { getCostCenter(setData, setSts); }, []);

const openModalHapus = (id, item) => {
  setisOpenDelete(true);
  setDesc(item);
  setDeleteId(id);
}

const closeModalHapus = () => {
  setisOpenDelete(false);
}

const onDelete = () => {
  axios.delete(`https://nusa.nuncorp.id/golang/api/v1/cost-center/delete/${deleteId}`)
      .then(() => {
          setSts({ type: 'success' });
          closeModalHapus();
          setisOpenStatus(true);
          getCostCenter(setData, setSts);
        })
      .catch((error) => {
          setSts({ type: 'error', error });
      });
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
    width: "auto",
    sortable: true
  },
  { 
    name: <div>Group</div>,
    selector: (data) => data.group,
    cell:(data) => <div>{data.group}</div>,
    width: "auto",
    sortable: true
  },
  { 
    name: <div>Sub Group</div>,
    selector: (data) => data.sub_group,
    cell:(data) => <div>{data.sub_group}</div>,
    width: "auto",
    sortable: true
  },
  { 
    name: <div>Item</div>,
    selector: (data) => data.item,
    cell:(data) => <div>{data.item}</div>,
    width: "auto",
    sortable: true
  },
  { 
    name: <div>Payment Type</div>,
    selector: (data) => data.payment_type,
    cell:(data) => <div>{data.payment_type}</div>,
    width: "auto",
    sortable: true
  },
  {
    name: <div>Aksi</div>,
    cell:(data) =>
      <div>
          <button style={{ fontSize : "14px" }} className="btn-action-hijau"><i className="fa fa-play"></i> Aktif</button>
          <button style={{ fontSize : "14px", marginLeft : "5px" }} onClick={() => openModalHapus(data.id, data.item)} className="btn-action-pink"><i className="fa fa-trash"></i> Hapus</button>
      </div>,
    ignoreRowClick: true,
    button: true,
    width: "360px" 
  },
];

const closeModalStatus = () => {
  setisOpenStatus(false);
  setSts('');
}

const navigate = useNavigate();

const navigateTambahCostCenter = () => {
    navigate('/admin/tambah-cost-center');
};

return (
  <>
    <Header category="Admin Keuangan / Cost Center" title="Cost Center" />

    <div style={{ marginTop : "50px" }}>

          <DataTables
              columns={columns}
              data={filteredItems}
              onClick={navigateTambahCostCenter}
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