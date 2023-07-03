import { DataTables } from "../../../components/DataTables";
import {
  getTipeTransaksi,
  deleteTipeTransaksi,
  updateTipeTransaksi,
} from "../../../api/TipeTransaksi";
import {
  AlertDelete,
  AlertUpdateStatus,
  AlertUpdateStatusAktif,
  AlertUpdateStatusNonAktif,
  // CustomStylesStatus,
} from "../../../components/ModalPopUp";
// import { ModalStatusList } from "../../../components/ModalPopUp";
import { useState, useEffect } from "react";
import { Header } from "../../../components";
import { useNavigate } from "react-router-dom";
// import Modal from "react-modal";

export default function ListTipeTransaksi() {
  const [data, setData] = useState([]);
  // const [status, setStatus] = useState("");
  const statusAktif = "Aktif";
  const statusNonAktif = "Tidak Aktif";
  // const [isOpenUpdateTidakAktif, setisOpenUpdateTidakAktif] = useState(false);
  // const [isOpenUpdateAktif, setisOpenUpdateAktif] = useState(false);
  // const [isOpenStatus, setisOpenStatus] = useState(false);
  // const [isOpenDelete, setisOpenDelete] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [desc, setDesc] = useState("");
  const [filterText, setFilterText] = useState("");
  const [sts, setSts] = useState(undefined);
  const navigate = useNavigate();

  let filteredItems = data;

  if (data !== null) {
    filteredItems = data.filter((data) =>
      data.description.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  useEffect(() => {
    getTipeTransaksi(setData, setSts);
  }, []);

  const handleNonActiveStatus = (id, description) => {
    // setisOpenUpdateTidakAktif(true);
    // setStatus("Aktif");
    // setDesc(description);
    // setUpdateId(id);
    AlertUpdateStatusNonAktif(description, statusAktif, id, onUpdateStatus);
  };

  // const closeModalUpdateTidakAktif = () => {
  //   setisOpenUpdateTidakAktif(false);
  // };

  const handleActiveStatus = (id, description) => {
    // setisOpenUpdateAktif(true);
    // setStatus("Tidak Aktif");
    // setDesc(description);
    // setUpdateId(id);
    AlertUpdateStatusAktif(description, statusNonAktif, id, onUpdateStatus);
  };

  // const closeModalUpdateAktif = () => {
  //   setisOpenUpdateAktif(false);
  // };

  const openModalHapus = (id, description) => {
    // setisOpenDelete(true);
    setDesc(description);
    setDeleteId(id);
    AlertDelete(description, id, onDelete);
  };

  // const closeModalHapus = () => {
  //   setisOpenDelete(false);
  // };

  const onUpdateStatus = (id, status) => {
    updateTipeTransaksi(setSts, status, id, setData);
    // closeModalUpdateAktif();
    // closeModalUpdateTidakAktif();
  };

  const onDelete = (id) => {
    deleteTipeTransaksi(setSts, id, setData);
    // closeModalHapus();
  };

  // const closeModalStatus = () => {
  //   setisOpenStatus(false);
  //   getTipeTransaksi(setData, setSts)
  //   setSts('');
  // }

  const columns = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Deskripsi</div>,
      selector: (data) => data.description,
      cell: (data) => <div>{data.description}</div>,
      width: "auto",
    },
    {
      name: <div>Status</div>,
      selector: (data) => data.status,
      cell: (data) => <div>{data.status}</div>,
      width: "auto",
    },
    {
      name: <div>Aksi</div>,
      cell: (data) => (
        <div>
          {data?.status === "Aktif" && (
            <button
              className="btn-action-hijau ml-3 w-auto px-2"
              onClick={() => handleActiveStatus(data.id, data.description)}
            >
              <i className="fa fa-play"></i> {data.status}
            </button>
          )}
          {data?.status === "Tidak Aktif" && (
            <button
              className="btn-action-pink ml-3 w-auto px-2"
              onClick={() => handleNonActiveStatus(data.id, data.description)}
            >
              <i className="fa fa-pause"></i> {data.status}
            </button>
          )}
          <button
            onClick={() => openModalHapus(data.id, data.description)}
            className="btn-action-pink ml-3"
          >
            <i className="fa fa-trash"></i> Hapus
          </button>
        </div>
      ),
      ignoreRowClick: true,
      button: true,
      width: "360px",
    },
  ];

  const navigateTambahTipeTransaksi = () => {
    navigate("/admin/tambah-tipe-transaksi");
  };

  return (
    <>
      <Header
        category="Admin Keuangan / Tipe Transaksi"
        title="List Tipe Transaksi"
      />

      <div style={{ marginTop: "50px" }}>
        <DataTables
          columns={columns}
          data={filteredItems}
          onClick={navigateTambahTipeTransaksi}
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
        />
        {/* <ModalStatusList
          isOpen={isOpenStatus}
          onRequestClose={closeModalStatus}
          status={sts}
        /> */}
        {/* <Modal
          isOpen={isOpenUpdateTidakAktif}
          onRequestClose={closeModalUpdateTidakAktif}
          style={CustomStylesStatus}
          contentLabel="Modal Hapus"
          ariaHideApp={false}
        >
          <div style={{ textAlign: "center" }}>
            <h2 className="mb-2">Aktifkan</h2>
            <h4 className="mb-3 text-merah">{desc}?</h4>
            <button className="btn-action-hijau w-20" onClick={onUpdateStatus}>
              Aktifkan
            </button>
            <button
              className="btn-action-pink w-20 ml-2"
              onClick={closeModalUpdateTidakAktif}
            >
              Batal
            </button>
          </div>
        </Modal>
        <Modal
          isOpen={isOpenUpdateAktif}
          onRequestClose={closeModalUpdateAktif}
          style={CustomStylesStatus}
          contentLabel="Modal Hapus"
          ariaHideApp={false}
        >
          <div style={{ textAlign: "center" }}>
            <h2 style={{ marginBottom: "10px" }}>Non-Aktifkan</h2>
            <h4 className="text-merah" style={{ marginBottom: "10px" }}>
              {desc}?
            </h4>
            <button
              style={{ padding: "0 5px", marginBottom: "10px", width: "auto" }}
              className="btn-action-hijau"
              onClick={onUpdateStatus}
            >
              Non-Aktifkan
            </button>
            <button
              style={{
                padding: "0 5px",
                marginBottom: "10px",
                width: "auto",
                marginLeft: "10px",
              }}
              className="btn-action-pink"
              onClick={closeModalUpdateAktif}
            >
              Batal
            </button>
          </div>
        </Modal> */}
        {/* <Modal
          isOpen={isOpenDelete}
          onRequestClose={closeModalHapus}
          style={CustomStylesStatus}
          contentLabel="Modal Hapus"
          ariaHideApp={false}
        >
          <div style={{ textAlign: "center" }}>
            <h2 className="mb-2">Hapus Tipe Transaksi</h2>
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
