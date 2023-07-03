import { DataTables } from "../../../components/DataTables";
import {
  AlertDelete,
  AlertUpdateStatusAktif,
  AlertUpdateStatusNonAktif,
  CustomStylesStatus,
} from "../../../components/ModalPopUp";
import {
  getKelompokMapel,
  updateStatusKelompokMapel,
  deleteKelompokMapel,
} from "../../../api/KelompokMataPelajaran";
import { useState, useEffect } from "react";
import { Header } from "../../../components";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { ModalStatusList } from "../../../components/ModalPopUp";

export default function ListKelompokMapel() {
  const [data, setData] = useState([]);
  // const [status, setStatus] = useState("");
  const statusAktif = "Aktif";
  const statusNonAktif = "Tidak Aktif";
  const [isOpenUpdateTidakAktif, setisOpenUpdateTidakAktif] = useState(false);
  const [isOpenUpdateAktif, setisOpenUpdateAktif] = useState(false);
  // const [isOpenStatus, setisOpenStatus] = useState(false);
  // const [isOpenDelete, setisOpenDelete] = useState(false);
  const [sts, setSts] = useState(undefined);
  const [updateId, setUpdateId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [desc, setDesc] = useState("");
  const [desc_nama, setDesc_nama] = useState("");
  const [filterText, setFilterText] = useState("");

  let filteredItems = data;

  if (data !== null) {
    filteredItems = data.filter((data) =>
      data.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  useEffect(() => {
    getKelompokMapel(setData, setSts);
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

  const onUpdateStatus = (id, status) => {
    updateStatusKelompokMapel(setSts, status, id, setData);
    // closeModalUpdateAktif();
    // closeModalUpdateTidakAktif();
    // setisOpenStatus(true);
  };

  const openModalHapus = (id, name) => {
    // setisOpenDelete(true);
    setDesc_nama(name);
    setDeleteId(id);
    AlertDelete(name, id, onDelete);
  };

  // const closeModalHapus = () => {
  //   setisOpenDelete(false);
  // };

  const onDelete = (id) => {
    deleteKelompokMapel(setSts, id, setData);
    // closeModalHapus();
    // setisOpenStatus(true);
  };

  // const closeModalStatus = () => {
  //   setisOpenStatus(false);
  //   getKelompokMapel(setData, setSts);
  //   setSts("");
  // };

  const columns = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Nama</div>,
      selector: (data) => data.name,
      cell: (data) => <div>{data.name}</div>,
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
          <button
            style={{ fontSize: "14px" }}
            onClick={() => navigateUbahKelompokMapel(data.id, data.name)}
            className="btn-action-ungu"
          >
            <i className="fa fa-pencil"></i> Ubah
          </button>
          {data?.status === "Aktif" && (
            <button
              className="btn-action-hijau ml-3 w-auto px-2"
              onClick={() => handleActiveStatus(data.id, data.name)}
            >
              <i className="fa fa-play"></i> {data.status}
            </button>
          )}
          {data?.status === "Tidak Aktif" && (
            <button
              className="btn-action-pink ml-3 w-auto px-2"
              onClick={() => handleNonActiveStatus(data.id, data.name)}
            >
              <i className="fa fa-pause"></i> {data.status}
            </button>
          )}
          <button
            style={{ fontSize: "14px" }}
            onClick={() => openModalHapus(data.id, data.name)}
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

  const navigate = useNavigate();

  const navigateTambahKelompokMapel = () => {
    navigate("/admin/tambah-kelompok-mapel");
  };

  const navigateUbahKelompokMapel = (id, name) => {
    navigate("/admin/ubah-kelompok-mapel", {
      state: {
        id: id,
        name: name,
      },
    });
  };

  return (
    <>
      <Header
        category="Admin KBM / Kelompok Mapel"
        title="List Kelompok Mata Pelajaran"
      />
      <div style={{ marginTop: "50px" }}>
        <DataTables
          columns={columns}
          data={filteredItems}
          onClick={navigateTambahKelompokMapel}
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
            <h2 className="mb-2">Hapus Kelompok</h2>
            <h4 className="mb-3 text-merah">{desc_nama}?</h4>
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
