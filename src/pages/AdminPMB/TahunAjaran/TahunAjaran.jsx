import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBank } from "../../../api/Bank";
import { Header } from "../../../components";
import { DataTablesPMB } from "../../../components/DataTables";
import { getAdmission } from "../../../api/SetupPmb";
import { getTahunAjaran } from "../../../api/TahunAjaran";

const TahunAjaran = () => {
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
      data.code.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  useEffect(() => {
    getTahunAjaran(setData, setSts);
  }, []);

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
      name: <div>Tahun</div>,
      selector: (data) => data.year,
      cell: (data) => <div>{data.year}</div>,
      width: "auto",
    },
    {
      name: <div>Nama</div>,
      selector: (data) => data.name,
      cell: (data) => <div>{data.name}</div>,
      width: "auto",
    },
    {
      name: <div>Kurikulum Id</div>,
      selector: (data) => data.curriculumId,
      cell: (data) => <div>{data.curriculumId}</div>,
      width: "auto",
    },
    {
      name: <div>Aksi</div>,
      cell: (data) => (
        <div style={{ display: "flex", flexDirection: "row", gap: "1px" }}>
          <button
            className="btn-action-merah ml-3 w-auto px-2"
            title="Bukti Pembayaran"
            onClick={() =>
              navigateUbahTahunAjaran(
                data.code,
                data.name,
                data.year,
                data.curriculumId,
                data.status
              )
            }
          >
            <i className="fa fa-pencil" /> Ubah
          </button>
        </div>
      ),
      ignoreRowClick: true,
      button: true,
      width: "300px",
    },
  ];

  const navigateTambahTahunAjaran = () => {
    navigate("/admin/tambah-tahun-ajaran");
  };

  const navigateUbahTahunAjaran = (code, name, year, curriculumId, status) => {
    navigate("/admin/ubah-tahun-ajaran", {
      state: {
        code: code,
        name: name,
        year: year,
        curriculumId: curriculumId,
        status: status,
      },
    });
  };

  return (
    <>
      <Header
        home="Admin PMB"
        // prev="Bank"
        // navePrev={path}
        at="Tahun Ajaran"
        title="Tahun Ajaran"
      />

      <div style={{ marginTop: "50px" }}>
        <DataTablesPMB
          columns={columns}
          data={filteredItems}
          onClick={navigateTambahTahunAjaran}
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
          buttontxt="Tambah Tahun Ajaran"
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
export default TahunAjaran;
