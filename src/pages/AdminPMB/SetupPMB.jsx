import { useState, useEffect } from "react";
import {
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from "@syncfusion/ej2-react-navigations";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
  FaRegCheckCircle,
} from "react-icons/fa";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Page,
  Edit,
  Toolbar,
  CommandColumn,
} from "@syncfusion/ej2-react-grids";
import GelombangPMB from "../../components/admin-pmb/GelombangPMB";
import { AiOutlinePlus } from "react-icons/ai";
import { CgSpinner } from "react-icons/cg";
import { Header } from "../../components";
import { useStateContext } from "../../contexts/ContextProviderAdminPMB";
import { DataTables } from "../../components/DataTables";

const SetupPMB = () => {
  const {
    archiveTahunAjaran,
    publishTahunAjaran,
    gelombang,
    getGelombangById,
    postGelombang,
    createInitialGelombang,
    updateGelombang,
    selectedTahunAjaran,
    setSelectedTahunAjaran,
    hapusTahunAjaran,
    tambahTahunAjaran,
    indexGelombang,
    setIndexGelombang,
    gridFeesData,
    gridDocsData,
    postTahunAjaran,
    currentTahunAjaran,
    setCurrentTahunAjaran,
    tahunAjaran,
    setTahunAjaran,
    tahunAjaranById,
    getTahunAjaranByPublish,
    allTahunAjaran,
    getAllTahunAjaran,
    isLoading,
    setIsLoading,
    errMsg,
    setErrMsg,
    successMsg,
    setSuccessMsg,
  } = useStateContext();

  useEffect(() => {
    getAllTahunAjaran();
    getTahunAjaranByPublish(1);
  }, []);

  const tabContent = () => {
    return (
      <GelombangPMB
        key={indexGelombang.toString()}
        indexGelombang={indexGelombang}
      />
    );
  };

  const tabSelected = (e) => {
    setIndexGelombang(e.selectedIndex);
    setErrMsg("");
  };

  const tambahGelombang = (e) => {
    e.preventDefault();
    createInitialGelombang(selectedTahunAjaran.id);
    console.log("tahunAjaranById.groups === ", tahunAjaranById);
  };

  let grid;

  const toolbarOptions = [
    { text: "", prefixIcon: "e-add", id: "tambah" },
    { text: "", prefixIcon: "e-edit", id: "ubah" },
    { text: "", prefixIcon: "e-cancel", id: "batal" },
    { text: "", prefixIcon: "e-update", id: "simpan" },
    { text: "Arsip", prefixIcon: "e-folder", id: "arsip", align: "Right" },
    { text: "Publish", prefixIcon: "e-eye", id: "publish", align: "Right" },
    { text: "Hapus", prefixIcon: "e-delete", id: "hapus", align: "Right" },
  ];
  const editSettings = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    showConfirmDialog: true,
    showDeleteConfirmDialog: true,
    newRowPosition: "Top",
  };
  const commands = [
    // {
    //   buttonOption: { iconCss: ' e-icons e-eye', cssClass: 'e-flat', id: 'publish' },
    //   title: "Publish Tahun Ajaran"
    // },
    {
      buttonOption: {
        iconCss: " e-icons e-settings",
        cssClass: "e-flat",
        id: "setup",
      },
      title: "Setup Tahun Ajaran",
    },
  ];
  const onToolbarClick = (args) => {
    // console.log("onToolbarClick === ", args)
    if (args.item.id == "tambah") {
      grid.addRecord();
    } else if (args.item.id == "ubah") {
      grid.startEdit();
    } else if (args.item.id == "batal") {
      grid.closeEdit();
    } else if (args.item.id == "simpan") {
      grid.endEdit();
    } else if (args.item.id == "arsip") {
      archiveTahunAjaran(selectedTahunAjaran.id);
    } else if (args.item.id == "publish") {
      publishTahunAjaran(selectedTahunAjaran.id);
    } else if (args.item.id == "hapus") {
      console.log("hapus === ", args);
      // grid.deleteRecord(grid.getSelectedRows()[0]);
      console.log("selectedTahunAjaran === ", selectedTahunAjaran);
      if (!selectedTahunAjaran.publish) {
        hapusTahunAjaran(selectedTahunAjaran.id);
      }
    }
  };
  const onActionBegin = (args) => {
    // console.log('onActionBegin === ', args.rowData);
  };
  const onActionComplete = (args) => {
    console.log("onActionComplete === ", args.rowData);
  };
  const onRowSelected = (args) => {
    console.log("onRowSelected === ", args.data);
    // setSelectedTahunAjaran(args.data)
    // console.log('onRowSelected: selectedTahunAjaran === ', selectedTahunAjaran);
    if (args.data.id == 0) {
      tambahTahunAjaran(args.data.tahun_ajaran);
    }
  };
  const onColumnSelected = (args) => {
    // console.log('onColumnSelected', args.data);
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
        at="Setup PMB"
        title="Setup PMB"
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
export default SetupPMB;
