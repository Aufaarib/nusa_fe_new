import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBank } from "../../api/Bank";
import { Header } from "../../components";
import { DataTablesPMB } from "../../components/DataTables";

const DataRegistrasi = () => {
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

  const columns = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Siswa</div>,
      selector: (data) => data.nama_bank,
      cell: (data) => <div>{data.nama_bank}</div>,
      width: "auto",
    },
    {
      name: <div>Orang Tua</div>,
      selector: (data) => data.nomor_rekening,
      cell: (data) => <div>{data.nomor_rekening}</div>,
      width: "auto",
    },
    {
      name: <div>Email</div>,
      selector: (data) => data.nama_pemilik,
      cell: (data) => <div>{data.nama_pemilik}</div>,
      width: "auto",
    },
    {
      name: <div>Approval</div>,
      cell: (data) => (
        <div>
          <input type="checkbox"></input>
        </div>
      ),
      ignoreRowClick: true,
      button: true,
      width: "100px",
    },
    {
      name: <div>Aksi</div>,
      cell: (data) => (
        <div style={{ display: "flex", flexDirection: "row", gap: "1px" }}>
          <button
            className="btn-action-merah ml-3 w-auto px-2"
            title="Bukti Pembayaran"
            // onClick={() => handleActiveStatus(data.id, data.name)}
          >
            <i className="fa fa-file-photo-o" />
          </button>
          <button
            className="btn-action-merah ml-3 w-auto px-2"
            title="Detail Pembayaran"
            // onClick={() => handleNonActiveStatus(data.id, data.name)}
          >
            <i className="fa fa-dollar" />
          </button>
          <button
            // onClick={() => openModalHapus(data.id, data.name)}
            className="btn-action-merah ml-3 w-auto px-2"
            title="Status"
          >
            <i className="fa fa-warning" />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      button: true,
      width: "300px",
    },
  ];

  const navigateTambahGelombang = () => {
    navigate("/admin/gelombang-pmb");
  };

  return (
    <>
      <Header
        home="Admin PMB"
        // prev="Bank"
        // navePrev={path}
        at="Data Registrasi"
        title="Data Registrasi"
      />

      <div style={{ marginTop: "50px" }}>
        <DataTablesPMB
          columns={columns}
          data={filteredItems}
          onClick={navigateTambahGelombang}
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
          buttontxt="Tambah Gelombang"
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
};
export default DataRegistrasi;
