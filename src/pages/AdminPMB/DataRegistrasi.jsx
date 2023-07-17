import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBank } from "../../api/Bank";
import { Header } from "../../components";
import {
  DataTablesPMB,
  DataTablesPMBWithoutButton,
} from "../../components/DataTables";
import {
  ApprovedRegistration,
  approvedRegistration,
  getAdmissionRegistration,
  getPaymentInvoice,
} from "../../api/Registrasi";
import { AlertValidateRegistration } from "../../components/ModalPopUp";

const DataRegistrasi = () => {
  const [data, setData] = useState([]);
  const [dataInvoice, setDataInvoice] = useState([]);
  const [isOpenStatus, setisOpenStatus] = useState(false);
  const [isOpenDelete, setisOpenDelete] = useState(false);
  const [sts, setSts] = useState(undefined);
  const [deleteId, setDeleteId] = useState("");
  const [desc_nama, setDesc_nama] = useState("");
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();
  // const path = "/admin/admission/registration";
  let filteredItems = data;

  // console.log("KAKAAAAA === ", data[0].isValidated);
  const domain = process.env.REACT_APP_BASE_STATIC_FILE;

  if (data !== null) {
    filteredItems = data.filter((data) =>
      data.regNumber.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  const ApproveRegistrasi = (code) => {
    // const url = dataInvoice.paymentRecipt;
    // console.
    // getPaymentInvoice(setDataInvoice, setSts, code);
    AlertValidateRegistration(code, onValidate);
  };

  const onValidate = (code) => {
    approvedRegistration(setData, setSts, code);
  };

  useEffect(() => {
    getAdmissionRegistration(setData, setSts);
  }, []);

  const columns = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Nomor Registrasi</div>,
      selector: (data) => data.regNumber,
      cell: (data) => <div>{data.regNumber}</div>,
      width: "auto",
    },
    {
      name: <div>User Id</div>,
      selector: (data) => data.userId,
      cell: (data) => <div>{data.userId}</div>,
      width: "auto",
    },
    {
      name: <div>Admission Phase Id</div>,
      selector: (data) => data.admissionPhaseId,
      cell: (data) => <div>{data.admissionPhaseId}</div>,
      width: "auto",
    },
    {
      name: <div>Approval</div>,
      selector: (data) => data.isValidated,
      cell: (data) => (
        <div>{data.isValidated == 1 ? "Validated" : "Un-validated"}</div>
      ),
      width: "auto",
    },
    {
      name: <div>Aksi</div>,
      cell: (data) => (
        <div style={{ display: "flex", flexDirection: "row", gap: "1px" }}>
          <button
            className="btn-mrh ml-3 w-auto px-2"
            title="Bukti Pembayaran"
            onClick={() => ApproveRegistrasi(data.regNumber)}
          >
            <i className="fa fa-check"> Approve</i>
          </button>
          <button
            className="btn-mrh ml-3 w-auto px-2"
            title="Detail Pembayaran"
            // onClick={() => handleNonActiveStatus(data.id, data.name)}
          >
            <i className="fa fa-dollar"> Detail Pembayaran</i>
          </button>
          <button
            // onClick={() => openModalHapus(data.id, data.name)}
            className="btn-mrh ml-3 w-auto px-2"
            title="Status"
          >
            <i className="fa fa-warning"> Upload Nilai Hasil Test</i>
          </button>
        </div>
      ),
      ignoreRowClick: true,
      button: true,
      width: "450px",
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
        <DataTablesPMBWithoutButton
          columns={columns}
          data={filteredItems}
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
};
export default DataRegistrasi;
