import { useState, useEffect } from "react";
import { useImmer } from "use-immer";
import Modal from "react-modal";
import { Header } from "../../components";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Page,
  Edit,
  Toolbar,
  CommandColumn,
  columnSelectionComplete,
} from "@syncfusion/ej2-react-grids";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { UploaderComponent } from "@syncfusion/ej2-react-inputs";
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
import { MdVerified } from "react-icons/md";
import { AiOutlineSave } from "react-icons/ai";
import { CgSpinner } from "react-icons/cg";
import TextInput from "../../components/TextInput";
import RadioInput from "../../components/RadioInput";
import { L10n } from "@syncfusion/ej2-base";
import axios from "../../api/axios";
import { useStateContext } from "../../contexts/ContextProviderAdminPMB";
import { dropdownData } from "../../data/initData";
import { DataTables } from "../../components/DataTables";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const SUBMIT_URL = "/api/pmb/payment-register/";

const HasilTes = () => {
  const token = localStorage.getItem("TOKEN");
  const {
    publishHasilTest,
    paymentUpload,
    allHasilTest,
    setAllHasilTest,
    getAllHasilTest,
    getAllPaymentRegister,
    isLoading,
    setIsLoading,
    errMsg,
    setErrMsg,
    setSuccessMsg,
  } = useStateContext();
  const [isOpenModalMurid, setIsOpenModalMurid] = useState(false);
  const [isOpenModalStatus, setIsOpenModalStatus] = useState(false);
  const [bulkPublish, setBulkPublish] = useImmer({ ids: [] });
  const [murid, setMurid] = useState({});
  const [hasilTes, setHasilTes] = useImmer({
    id: null,
    id_tahun_ajaran: null,
    pendaftaran_id: null,
    kategori: "",
    hasil_akhir: "",
    status: "",
    pdf: null,
    publish: false,
  });
  const [previewImageBukti, setPreviewImageBukti] = useState("");

  const customStyles = {
    content: {
      width: "65%",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "none",
      cursor: "auto",
      padding: "48px",
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,.5)",
      cursor: "pointer",
      zIndex: "999",
    },
  };

  const customStylesMurid = {
    content: {
      width: "85%",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "none",
      cursor: "auto",
      padding: "48px",
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,.5)",
      cursor: "pointer",
      zIndex: "999",
    },
  };

  useEffect(() => {
    getAllHasilTest();
    console.log("allHasilTest === ", allHasilTest);
  }, []);

  useEffect(() => {
    console.log("bulkPublish === ", bulkPublish);
  }, [bulkPublish]);

  let grid;
  let gridMurid;

  const toolbarOptions = [
    { text: "Publish", prefixIcon: "e-eye", id: "publish", align: "Right" },
  ];
  const editSettings = { allowEditing: false };

  const commands = [
    // {
    //   buttonOption: {iconCss: ' e-icons e-people', cssClass: 'e-outline', id: 'murid'},
    //   title: "Lihat Calon Murid"
    // },
    {
      buttonOption: {
        iconCss: " e-icons e-image",
        cssClass: "e-outline",
        id: "hasil-tes",
      },
      title: "Lihat Hasil Tes",
    },
  ];
  const commandClick = (args) => {
    const murid = args.rowData;
    const hasil = args.rowData.hasil_test;

    if (args.commandColumn.buttonOption.id == "murid") {
      console.log("args.rowData === ", args.rowData);
      setMurid(murid);
      setIsOpenModalMurid(true);
    }
    if (args.commandColumn.buttonOption.id == "hasil-tes") {
      console.log("args.rowData === ", args.rowData);
      setHasilTes(hasil);
      setIsOpenModalStatus(true);
      console.log("args.rowData hasil === ", hasilTes);
    }
  };
  const onToolbarClick = (args) => {
    // console.log("onToolbarClick === ", args)
    if (args.item.id == "publish") {
      console.log("onToolbarClick bulkPublish === ", bulkPublish);
      publishHasilTest(bulkPublish);
      setBulkPublish((draft) => {
        draft["ids"] = [];
      });
    }
  };
  const onActionBegin = (args) => {
    // console.log('onActionBegin === ', args.rowData);
  };
  const onActionComplete = (args) => {
    console.log("onActionComplete === ", args.rowData);
  };
  // ON ROW SELECTED
  const onRowSelected = (args) => {
    console.log("onRowSelected === ", args.data);
    setBulkPublish((draft) => {
      draft["ids"].push(args.data.hasil_test.id);
    });
  };

  function closeModalMurid() {
    setIsOpenModalMurid(false);
  }

  function closeModalStatus() {
    setIsOpenModalStatus(false);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  Modal.setAppElement("#root");

  // Uploader component
  let uploadObj;
  let asyncSettings;
  let dropContainerRef;
  let dropContainerEle;
  dropContainerEle = null;
  dropContainerRef = (element) => {
    dropContainerEle = element;
  };
  asyncSettings = {
    saveUrl: BASE_URL + `/api/pmb/test-result`,
    removeUrl: "https://ej2.syncfusion.com/services/api/uploadbox/Remove",
  };
  function onRemoveFile(args) {
    args.postRawFile = false;
  }
  function onFileUpload(args) {
    console.log("UPLOADING..");
    console.log("onFileUpload === ", args);
    args.customFormData = [
      { pendaftaran_id: hasilTes.pendaftaran_id },
      { status: hasilTes.status },
      // {kategori: hasilTes.kategori},
      // {hasil_akhir: hasilTes.hasil_akhir},
      // {pdf: hasilTes.pdf},
    ];
    args.currentRequest.setRequestHeader("Authorization", `Bearer ${token}`);

    setPreviewImageBukti(args.fileData.name);
  }
  function onSuccess(args) {
    // getDocumentsData();
    console.log("SUCCESS");
    getAllHasilTest();
    console.log("allHasilTest === ", allHasilTest);
  }

  let minFileSize = 1000;
  let maxFileSize = 1000000;

  useEffect(() => {
    L10n.load({
      "id-BAHASA": {
        uploader: {
          Browse: "Cari Berkas",
          Clear: "Bersihkan",
          Upload: "Unggah",
          cancel: "Batal",
          delete: "Hapus Berkas",
          dropFilesHint: "/ taruh Berkas disini",
          inProgress: "Mengunduh",
          invalidFileType: "Tipe berkas tidak diperbolehkan",
          invalidMaxFileSize: `Ukuran berkas melebihi ${
            maxFileSize * 0.000001
          } MB`,
          invalidMinFileSize: `Ukuran file terlalu kecil! Harap unggah file dengan ukuran minimal ${
            maxFileSize * 0.000001
          } KB`,
          readyToUploadMessage: "Siap mengunggah",
          remove: "Hapus",
          removedFailedMessage: "Berkas tidak dapat dihapus",
          removedSuccessMessage: "Berkas berhasil dihapus",
          uploadFailedMessage: "Gagal mengunggah berkas",
          uploadSuccessMessage: "Berkas berhasil diunggah",
        },
      },
    });
  }, []);

  const updateTextInput = (e) => {
    const fieldName = e.target.name;
    console.log("fieldName === ", fieldName);
    setHasilTes((draft) => {
      draft[fieldName] = e.target.value;
    });
  };

  const updateDropDownCal = (e) => {
    const fieldName = e.element.ej2_instances[0].htmlattributes.name;
    console.log("fieldName ===> ", fieldName);
    setHasilTes((draft) => {
      draft[fieldName] = e.element.value;
    });
  };

  const handleCheckbox = (e) => {
    console.log(e.checked);
    setHasilTes((draft) => {
      draft["is_published"] = e.checked;
    });
  };

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
            // onClick={() =>
            //   navigateUbahListBank(
            //     data.id,
            //     data.nama_bank,
            //     data.nomor_rekening,
            //     data.nama_pemilik
            //   )
            // }
            className="btn-action-ungu"
          >
            <i className="fa fa-pencil"></i> Ubah
          </button>
          <button
            style={{ fontSize: "14px" }}
            // onClick={() => openModalHapus(data.id, data.nama_pemilik)}
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

  return (
    <>
      <Header
        home="Admin PMB"
        // prev="Bank"
        // navePrev={path}
        at="Hasil Test"
        title="Hasil Test"
      />

      <div style={{ marginTop: "50px" }}>
        <DataTables
          columns={columns}
          // data={filteredItems}
          // onClick={navigateTambahListBank}
          // onFilter={(e) => setFilterText(e.target.value)}
          // filterText={filterText}
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
export default HasilTes;
