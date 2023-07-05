import { DataTables } from "../../../components/DataTables";
import { CustomStylesModalHapus } from "../../../components/CustomStyles";
import { AlertDelete, ModalStatusList } from "../../../components/ModalPopUp";
import { getBank, deleteBank } from "../../../api/Bank";
import { useState, useEffect } from "react";
import { Header } from "../../../components";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

export default function ListBank() {
  const [data, setData] = useState([]);
  const [isOpenStatus, setisOpenStatus] = useState(false);
  const [isOpenDelete, setisOpenDelete] = useState(false);
  const [sts, setSts] = useState(undefined);
  const [deleteId, setDeleteId] = useState("");
  const [desc_nama, setDesc_nama] = useState("");
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();
  const path = "/admin/list-bank";

  let filteredItems = data;

  if (data !== null) {
    filteredItems = data.filter((data) =>
      data.nama_pemilik.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  useEffect(() => {
    getBank(setData, setSts);
  }, []);

  const openModalHapus = (id, nama_pemilik) => {
    // setisOpenDelete(true);
    setDesc_nama(nama_pemilik);
    setDeleteId(id);
    AlertDelete(nama_pemilik, id, onDelete);
  };

  // const closeModalHapus = () => {
  //   setisOpenDelete(false);
  // };

  const onDelete = (id) => {
    deleteBank(setSts, id, setData);
    // closeModalHapus();
    // setisOpenStatus(true);
  };

  // const closeModalStatus = () => {
  //   setisOpenStatus(false);
  //   getBank(setData, setSts)
  //   setSts('');
  // }

  const columns = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Nama Bank</div>,
      selector: (data) => data.nama_bank,
      cell: (data) => <div>{data.nama_bank}</div>,
      width: "auto",
    },
    {
      name: <div>Nomor Rekening</div>,
      selector: (data) => data.nomor_rekening,
      cell: (data) => <div>{data.nomor_rekening}</div>,
      width: "auto",
    },
    {
      name: <div>Nama Pemilik</div>,
      selector: (data) => data.nama_pemilik,
      cell: (data) => <div>{data.nama_pemilik}</div>,
      width: "auto",
    },
    {
      name: <div>Aksi</div>,
      cell: (data) => (
        <div>
          <button
            style={{ fontSize: "14px" }}
            onClick={() =>
              navigateUbahListBank(
                data.id,
                data.nama_bank,
                data.nomor_rekening,
                data.nama_pemilik
              )
            }
            className="btn-action-ungu"
          >
            <i className="fa fa-pencil"></i> Ubah
          </button>
          <button
            style={{ fontSize: "14px" }}
            onClick={() => openModalHapus(data.id, data.nama_pemilik)}
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

  const navigateTambahListBank = () => {
    navigate("/admin/tambah-list-bank");
  };

  const navigateUbahListBank = (
    id,
    nama_bank,
    nomor_rekening,
    nama_pemilik
  ) => {
    navigate("/admin/ubah-list-bank", {
      state: {
        id: id,
        nama_bank: nama_bank,
        nomor_rekening: nomor_rekening,
        nama_pemilik: nama_pemilik,
      },
    });
  };

  return (
    <>
      <Header
        home="Admin Keuangan"
        // prev="Bank"
        // navePrev={path}
        at="Bank"
        title="List Bank"
      />

      <div style={{ marginTop: "50px" }}>
        <DataTables
          columns={columns}
          data={filteredItems}
          onClick={navigateTambahListBank}
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
            <h2 className="mb-2">Hapus Data Bank</h2>
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
