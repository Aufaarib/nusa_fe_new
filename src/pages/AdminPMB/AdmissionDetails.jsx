import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getBank } from "../../api/Bank";
import { Header } from "../../components";
import { DataTablesPMB } from "../../components/DataTables";
import { getAdmission, getAdmissionDetails } from "../../api/SetupPmb";
import { BsChevronBarLeft, BsChevronBarRight } from "react-icons/bs";
import moment from "moment/moment";

const AdmissionDetails = () => {
  const [data, setData] = useState([]);
  const [isOpenStatus, setisOpenStatus] = useState(false);
  const [isOpenDelete, setisOpenDelete] = useState(false);
  const [sts, setSts] = useState(undefined);
  const [deleteId, setDeleteId] = useState("");
  const [desc_nama, setDesc_nama] = useState("");
  const [filterText, setFilterText] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const path = "/admin/list-setup-pmb";
  const code = location.state.code;

  let filteredItems = data;

  //   if (data !== null) {
  //     filteredItems = data.filter((data) =>
  //       data.code.toLowerCase().includes(filterText.toLowerCase())
  //     );
  //   }

  useEffect(() => {
    getAdmissionDetails(setData, setSts, code);
  }, []);

  const columns = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Gelombang Ke</div>,
      selector: (data) => data.increment,
      cell: (data) => <div>{data.increment}</div>,
      width: "auto",
    },
    {
      name: <div>Nama</div>,
      selector: (data) => data.name,
      cell: (data) => <div>{data.name}</div>,
      width: "auto",
    },
    {
      name: <div>Tanggal Mulai</div>,
      selector: (data) => data.startDate,
      cell: (data) => moment(data.startDate).format("DD-MM-YYYY"),
      width: "auto",
    },
    {
      name: <div>Tanggal Selesai</div>,
      selector: (data) => data.endDate,
      cell: (data) => moment(data.endDate).format("DD-MM-YYYY"),
      width: "auto",
    },
    {
      name: <div>Amount</div>,
      selector: (data) => data.amount,
      cell: (data) => <div>{data.amount}</div>,
      width: "auto",
    },
    {
      name: <div>Aksi</div>,
      cell: (data) => (
        <div style={{ display: "flex", flexDirection: "row", gap: "1px" }}>
          <button
            className="btn-mrh ml-3 w-auto px-2"
            title="Detail Pembayaran"
            onClick={() =>
              navigateUbahGelombang(
                data.id,
                data.increment,
                data.name,
                data.startDate,
                data.endDate,
                data.amount
              )
            }
          >
            <i className="fa fa-warning" /> Ubah
          </button>
        </div>
      ),
      ignoreRowClick: true,
      button: true,
      width: "300px",
    },
  ];

  const navigateTambahGelombang = () => {
    navigate("/admin/tambah-gelombang-pmb", {
      state: {
        code: code,
      },
    });
  };

  const navigateUbahGelombang = (
    id,
    increment,
    name,
    startDate,
    endDate,
    amount
  ) => {
    navigate("/admin/ubah-gelombang", {
      state: {
        id: id,
        code: code,
        increment: increment,
        name: name,
        startDate: moment(startDate).format("DD-MM-YYYY"),
        endDate: moment(endDate).format("DD-MM-YYYY"),
        amount: amount,
      },
    });
  };

  //   const navigateTambahPendaftaran = () => {
  //     navigate("/admin/list-setup-pmb");
  //   };

  return (
    <>
      <Header
        home="Admin PMB"
        prev="Setup PMB"
        navePrev={path}
        at="Detail Pendaftaran"
        title={code}
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
      </div>
      <div className="flex justify-start w-full">
        <Link
          to={path}
          className="w-auto pl-0 mx-0 bg-transparent shadow-none btn-merah hover:bg-transparent text-merah hover:text-gelap"
        >
          <BsChevronBarLeft className="text-xl m-0 mr-2 mt-0.5" /> Kembali
        </Link>
      </div>
    </>
  );
};
export default AdmissionDetails;
