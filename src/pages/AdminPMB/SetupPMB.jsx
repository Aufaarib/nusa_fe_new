import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBank } from "../../api/Bank";
import { Header } from "../../components";
import { DataTablesPMB } from "../../components/DataTables";
import { getAdmission, updateStatusAdmission } from "../../api/SetupPmb";
import { AlertUbahStatus } from "../../components/ModalPopUp";

const SetupPMB = () => {
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
    getAdmission(setData, setSts);
  }, []);

  const handleStatus = (code, status) => {
    AlertUbahStatus(code, code, status, onUpdateStatus);
    // setisOpenUpdateTidakAktif(true);
    // setStatus("Aktif");
    // setDesc(description);
    // setUpdateId(id);
  };

  const onUpdateStatus = (code) => {
    updateStatusAdmission(setSts, code, setData);
    // closeModalUpdateAktif();
    // closeModalUpdateTidakAktif();
    // setisOpenStatus(true);
  };

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
      name: <div>Tahun Ajaran</div>,
      selector: (data) => data.academicYear.name,
      cell: (data) => <div>{data.academicYear.name}</div>,
      width: "auto",
    },
    {
      name: <div>Status</div>,
      selector: (data) => data.status,
      cell: (data) => <div>{data.status == 1 ? "Aktif" : "Tidak Aktif"}</div>,
      width: "auto",
    },
    {
      name: <div>Aksi</div>,
      cell: (data) => (
        <div style={{ display: "flex", flexDirection: "row", gap: "1px" }}>
          <button
            className="btn-mrh ml-3 w-auto px-2"
            title="Detail Pembayaran"
            onClick={() => navigateAdmissionDetails(data.code)}
          >
            <i className="fa fa-warning" /> Detail
          </button>
          {data?.status === 1 && (
            <button
              className="btn-mrh ml-3 w-auto px-2"
              onClick={() => handleStatus(data.code, data.status)}
            >
              <i className="fa fa-play mt-1 mr-1"></i> Aktif
            </button>
          )}
          {data?.status === 0 && (
            <button
              className="btn-mrh ml-3 w-auto px-2"
              onClick={() => handleStatus(data.code, data.status)}
            >
              <i className="fa fa-pause mt-1 mr-1"></i> Tidak Aktif
            </button>
          )}
        </div>
      ),
      ignoreRowClick: true,
      button: true,
      width: "300px",
    },
  ];

  // const navigateTambahGelombang = () => {
  //   navigate("/admin/tambah-gelombang-pmb");
  // };

  const navigateAdmissionDetails = (code) => {
    navigate("/admin/admission-detail", {
      state: {
        code: code,
      },
    });
  };

  const navigateTambahPendaftaran = () => {
    navigate("/admin/tambah-pendaftaran");
  };

  return (
    <>
      <Header
        home="Admin PMB"
        // prev="Bank"
        // navePrev={path}
        at="Setup PMB"
        title="Setup PMB"
      />

      <div style={{ marginTop: "50px" }}>
        <DataTablesPMB
          columns={columns}
          data={filteredItems}
          onClick={navigateTambahPendaftaran}
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
          buttontxt="Tambah Pendaftaran"
        />
      </div>
    </>
  );
};
export default SetupPMB;
