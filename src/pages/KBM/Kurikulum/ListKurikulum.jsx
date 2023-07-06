import { DataTables } from "../../../components/DataTables";
import {
  AlertDelete,
  AlertUbahStatus,
  AlertUpdateStatusAktif,
  AlertUpdateStatusNonAktif,
  CustomStylesStatus,
} from "../../../components/ModalPopUp";
import {
  getKurikulum,
  updateStatusKurikulum,
  deleteKurikulum,
} from "../../../api/Kurikulum";
import { useState, useEffect } from "react";
import { Header } from "../../../components";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { ModalStatusList } from "../../../components/ModalPopUp";

export default function ListKurikulum() {
  const [data, setData] = useState([]);
  // const [status, setStatus] = useState("");
  const statusAktif = "Aktif";
  const statusNonAktif = "Tidak Aktif";
  const [isOpenUpdateTidakAktif, setisOpenUpdateTidakAktif] = useState(false);
  const [isOpenUpdateAktif, setisOpenUpdateAktif] = useState(false);
  const [isOpenStatus, setisOpenStatus] = useState(false);
  const [isOpenDelete, setisOpenDelete] = useState(false);
  const [sts, setSts] = useState(undefined);
  const [updateId, setUpdateId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [desc, setDesc] = useState("");
  const [desc_nama, setDesc_nama] = useState("");
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();

  const path = "/admin/tambah-kurikulum";

  let filteredItems = data;

  if (data !== null) {
    filteredItems = data.filter((data) =>
      data.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  useEffect(() => {
    getKurikulum(setData, setSts);
  }, []);

  const handleStatus = (code, description, status) => {
    AlertUbahStatus(description, code, status, onUpdateStatus);
    // setisOpenUpdateTidakAktif(true);
    // setStatus("Aktif");
    // setDesc(description);
    // setUpdateId(id);
  };

  // const closeModalUpdateTidakAktif = () => {
  //   setisOpenUpdateTidakAktif(false);
  // };

  // const handleActiveStatus = (id, description) => {
  //   // setisOpenUpdateAktif(true);
  //   // setStatus("Tidak Aktif");
  //   // setDesc(description);
  //   // setUpdateId(id);
  //   AlertUpdateStatusAktif(description, statusNonAktif, id, onUpdateStatus);
  // };

  // const closeModalUpdateAktif = () => {
  //   setisOpenUpdateAktif(false);
  // };

  const onUpdateStatus = (code) => {
    updateStatusKurikulum(setSts, code, setData);
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
    deleteKurikulum(setSts, id, setData);
    // closeModalHapus();
    // setisOpenStatus(true);
  };

  // const closeModalStatus = () => {
  //   setisOpenStatus(false);
  //   getKurikulum(setData, setSts);
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
    },
    {
      name: <div>Nama</div>,
      selector: (data) => data.name,
      cell: (data) => <div>{data.name}</div>,
      width: "auto",
    },
    {
      name: <div>Deskripsi</div>,
      selector: (data) => data.description,
      cell: (data) => <div>{data.description}</div>,
      width: "auto",
    },
    // {
    //   name: <div>Semester</div>,
    //   selector: (data) => data.semester_id,
    //   cell: (data) => <div>{data.semester_id}</div>,
    //   width: "auto",
    // },
    {
      name: <div>Status</div>,
      selector: (data) => data.status,
      cell: (data) => <div>{data.status == 1 ? "Aktif" : "Tidak Aktif"}</div>,
      width: "auto",
    },
    {
      name: <div>Aksi</div>,
      cell: (data) => (
        <div>
          <button
            style={{ fontSize: "14px" }}
            onClick={() =>
              navigateUbahKurikulum(
                data.id,
                data.code,
                data.name,
                data.description,
                data.semester_id
              )
            }
            className="btn-action-ungu"
          >
            <i className="fa fa-pencil"></i> Ubah
          </button>
          {data?.status === 1 && (
            <button
              className="btn-action-hijau ml-3 w-auto px-2"
              onClick={() => handleStatus(data.code, data.name, data.status)}
            >
              <i className="fa fa-play"></i> Aktif
            </button>
          )}
          {data?.status === 0 && (
            <button
              className="btn-action-pink ml-3 w-auto px-2"
              onClick={() => handleStatus(data.code, data.name, data.status)}
            >
              <i className="fa fa-pause"></i> Tidak Aktif
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

  const navigateTambahKurikulum = () => {
    navigate(path);
  };

  const navigateUbahKurikulum = (id, code, name, description, semester_id) => {
    navigate("/admin/ubah-kurikulum", {
      state: {
        id: id,
        code: code,
        name: name,
        description: description,
        semester_id: semester_id,
      },
    });
  };

  return (
    <>
      <Header
        home="Admin KBM"
        // prev="Bank"
        // navePrev={path}
        at="Kurikulum"
        title="List Kurikulum"
      />

      <div style={{ marginTop: "50px" }}>
        <DataTables
          columns={columns}
          data={filteredItems}
          onClick={navigateTambahKurikulum}
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
        />
        {/* <ModalStatusList
          isOpen={isOpenStatus}
          onRequestClose={closeModalStatus}
          status={sts}
        />
        <Modal
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
            <h2 className="mb-2">Hapus Kurikulum</h2>
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
