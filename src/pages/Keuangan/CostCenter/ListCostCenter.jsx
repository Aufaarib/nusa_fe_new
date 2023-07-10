import { DataTables } from "../../../components/DataTables";
import { getCostCenter, deleteCostCenter } from "../../../api/CostCenter";
import {
  CustomStylesStatus,
  CustomStylesModalHapus,
} from "../../../components/CustomStyles";
import { useState, useEffect } from "react";
import { Header } from "../../../components";
import { useNavigate } from "react-router-dom";
import { AlertDelete, ModalStatusList } from "../../../components/ModalPopUp";
import Swal from "sweetalert2";
import Modal from "react-modal";

export default function ListCostCenter() {
  const [data, setData] = useState([]);
  const [isOpenStatus, setisOpenStatus] = useState(false);
  const [isOpenDelete, setisOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [desc, setDesc] = useState("");
  const [filterText, setFilterText] = useState("");
  const [sts, setSts] = useState(undefined);

  let filteredItems = data;

  if (data !== null) {
    filteredItems = data.filter((data) =>
      data.group.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  useEffect(() => {
    getCostCenter(setData, setSts);
  }, []);

  const openModalHapus = (id, item) => {
    setDesc(item);
    setDeleteId(id);
    AlertDelete(item, id, onDelete);
  };

  // const closeModalHapus = () => {
  //   setisOpenDelete(false);
  // };

  const onDelete = (id) => {
    deleteCostCenter(setSts, id, setData);
    // closeModalHapus();
    // setisOpenStatus(true);
  };

  // const closeModalStatus = () => {
  //   setisOpenStatus(false);
  //   getCostCenter(setData, setSts);
  //   setSts("");
  // };

  const columns = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Code</div>,
      selector: (data) => data.code,
      cell: (data) => <div>{data.code}</div>,
      width: "auto",
      sortable: true,
    },
    {
      name: <div>Group</div>,
      selector: (data) => data.group,
      cell: (data) => <div>{data.group}</div>,
      width: "auto",
      sortable: true,
    },
    {
      name: <div>Sub Group</div>,
      selector: (data) => data.sub_group,
      cell: (data) => <div>{data.sub_group}</div>,
      width: "auto",
      sortable: true,
    },
    {
      name: <div>Item</div>,
      selector: (data) => data.item,
      cell: (data) => <div>{data.item}</div>,
      width: "auto",
      sortable: true,
    },
    {
      name: <div>Payment Type</div>,
      selector: (data) => data.payment_type,
      cell: (data) => <div>{data.payment_type}</div>,
      width: "auto",
      sortable: true,
    },
    {
      name: <div>Aksi</div>,
      cell: (data) => (
        <div>
          <button
            style={{ fontSize: "14px", marginLeft: "5px" }}
            onClick={() => openModalHapus(data.id, data.item)}
            className="btn-mrh"
          >
            <i className="fa fa-trash mt-1 mr-1"></i> Hapus
          </button>
        </div>
      ),
      ignoreRowClick: true,
      button: true,
      width: "160px",
    },
  ];

  const navigate = useNavigate();

  const navigateTambahCostCenter = () => {
    navigate("/admin/tambah-cost-center");
  };

  return (
    <>
      <Header
        home="Admin Keuangan"
        // prev="Bank"
        // navePrev={path}
        at="Cost Center"
        title="List Cost Center"
      />

      <div style={{ marginTop: "50px" }}>
        <DataTables
          status={sts}
          columns={columns}
          data={filteredItems}
          onClick={navigateTambahCostCenter}
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
        />
        {/* <ModalStatusList
          isOpen={isOpenStatus}
          onRequestClose={closeModalStatus}
          status={sts}
        /> */}
        {/* <Modal
          isOpen={isOpenDelete}
          onRequestClose={closeModalHapus}
          style={CustomStylesModalHapus}
          contentLabel="Modal Hapus"
          ariaHideApp={false}
        >
          <div style={{ textAlign: "center" }}>
            <h2 className="mb-2">Hapus</h2>
            <h4 className="mb-3 text-merah">{desc}?</h4>
            <button className="btn-action-hijau w-20" onClick={onDelete}>
              Hapus
            </button>
            <button
              className="btn-action-pink w-20 ml-2"
              onClick={closeModalHapus}
            >
              Batal
            </button>
          </div>
        </Modal> */}
      </div>
    </>
  );
}
