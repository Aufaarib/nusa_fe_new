import { useState, useEffect } from 'react';
import { useImmer } from 'use-immer';
import Modal from 'react-modal';
import { Header } from '../../components';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Edit, Toolbar, CommandColumn, columnSelectionComplete } from '@syncfusion/ej2-react-grids';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { MdVerified } from 'react-icons/md';
import { AiOutlineSave } from 'react-icons/ai';
import { CgSpinner } from 'react-icons/cg';
import TextInput from '../../components/TextInput';
import RadioInput from '../../components/RadioInput';
import { L10n } from '@syncfusion/ej2-base';
import axios from '../../api/axios';
import { useStateContext } from '../../contexts/ContextProviderAdminPMB';
import { dropdownData } from '../../data/initData';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const SUBMIT_URL = '/api/pmb/payment-register/';

const HasilTes = () => {
  const token = JSON.parse(localStorage.getItem('TOKEN'));
  const { publishHasilTest, paymentUpload, allHasilTest, setAllHasilTest, getAllHasilTest, getAllPaymentRegister, isLoading, setIsLoading, errMsg, setErrMsg, setSuccessMsg } = useStateContext();
  const [isOpenModalMurid, setIsOpenModalMurid] = useState(false);
  const [isOpenModalStatus, setIsOpenModalStatus] = useState(false);
  const [bulkPublish, setBulkPublish] = useImmer({ids: []})
  const [murid, setMurid] = useState({});
  const [hasilTes, setHasilTes] = useImmer({
    id: null,
    id_tahun_ajaran: null,
    pendaftaran_id: null,
    kategori: "",
    hasil_akhir: "",
    status: "",
    pdf: null,
    publish: false
  });
  const [previewImageBukti, setPreviewImageBukti] = useState("")
  

  const customStyles = {
    content: {
      width: '65%',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: 'none',
      cursor: 'auto',
      padding: '48px'
    },
    overlay: {
      backgroundColor: 'rgba(0,0,0,.5)',
      cursor: 'pointer',
      zIndex: '999'
    }
  };

  const customStylesMurid = {
    content: {
      width: '85%',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: 'none',
      cursor: 'auto',
      padding: '48px'
    },
    overlay: {
      backgroundColor: 'rgba(0,0,0,.5)',
      cursor: 'pointer',
      zIndex: '999'
    }
  };

  useEffect(() => {
    getAllHasilTest();
    console.log("allHasilTest === ", allHasilTest);
  },[]);

  useEffect(() => {
    console.log("bulkPublish === ", bulkPublish);
  },[bulkPublish]);
  
  let grid;
  let gridMurid;
  
  const toolbarOptions = [
    { text: 'Publish', prefixIcon: 'e-eye', id: 'publish', align: 'Right' },
  ];
  const editSettings = { allowEditing: false};

  const commands = [
    // {
    //   buttonOption: {iconCss: ' e-icons e-people', cssClass: 'e-outline', id: 'murid'},
    //   title: "Lihat Calon Murid"
    // },
    {
      buttonOption: {iconCss: ' e-icons e-image', cssClass: 'e-outline', id: 'hasil-tes'},
      title: "Lihat Hasil Tes"
    },
  ];
  const commandClick = (args) =>  {
    const murid = args.rowData;
    const hasil = args.rowData.hasil_test;

    if (args.commandColumn.buttonOption.id == "murid") {
      console.log("args.rowData === ", args.rowData )
      setMurid(murid);
      setIsOpenModalMurid(true);
    }
    if (args.commandColumn.buttonOption.id == "hasil-tes") {
      console.log("args.rowData === ", args.rowData )
      setHasilTes(hasil)
      setIsOpenModalStatus(true);
      console.log("args.rowData hasil === ", hasilTes )
    }
  }
  const onToolbarClick = (args) => {
    // console.log("onToolbarClick === ", args)
    if(args.item.id == "publish"){
      console.log("onToolbarClick bulkPublish === ", bulkPublish)
      publishHasilTest(bulkPublish);
      setBulkPublish(draft => {
        draft["ids"] = []
      })
    }
  }
  const onActionBegin = (args) => {
    // console.log('onActionBegin === ', args.rowData);
  }
  const onActionComplete= (args) => {
    console.log('onActionComplete === ', args.rowData);
  }
  // ON ROW SELECTED
  const onRowSelected = (args) => {
    console.log('onRowSelected === ', args.data);
    setBulkPublish(draft => {
      draft["ids"].push(args.data.hasil_test.id)
    })
  } 

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

  Modal.setAppElement('#root');

  // Uploader component
  let uploadObj;
  let asyncSettings;
  let dropContainerRef;
  let dropContainerEle;
  dropContainerEle = null;
  dropContainerRef = element => {
      dropContainerEle = element;
  };
  asyncSettings = {
      saveUrl: BASE_URL+`/api/pmb/test-result`,
      removeUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Remove'
  };
  function onRemoveFile(args) {
      args.postRawFile = false;
  }
  function onFileUpload(args) {
    console.log("UPLOADING..")
    console.log("onFileUpload === ", args)
    args.customFormData = [
      {pendaftaran_id: hasilTes.pendaftaran_id},
      {status: hasilTes.status},
      // {kategori: hasilTes.kategori},
      // {hasil_akhir: hasilTes.hasil_akhir},
      // {pdf: hasilTes.pdf},
    ];
    (args.currentRequest).setRequestHeader('Authorization', `Bearer ${token}`)

    setPreviewImageBukti(args.fileData.name)
  }
  function onSuccess(args) {
    // getDocumentsData();
    console.log("SUCCESS")
    getAllHasilTest();
    console.log("allHasilTest === ", allHasilTest);
  }

  let minFileSize = 1000;
  let maxFileSize = 1000000;

  useEffect(() => {
    L10n.load({
      "id-BAHASA": {
        "uploader": {
          "Browse": "Cari Berkas",
          "Clear": "Bersihkan",
          "Upload": "Unggah",
          "cancel": "Batal",
          "delete": "Hapus Berkas",
          "dropFilesHint": "/ taruh Berkas disini",
          "inProgress": "Mengunduh",
          "invalidFileType": "Tipe berkas tidak diperbolehkan",
          "invalidMaxFileSize": `Ukuran berkas melebihi ${maxFileSize*0.000001} MB`,
          "invalidMinFileSize": `Ukuran file terlalu kecil! Harap unggah file dengan ukuran minimal ${maxFileSize*0.000001} KB`,
          "readyToUploadMessage": "Siap mengunggah",
          "remove": "Hapus",
          "removedFailedMessage": "Berkas tidak dapat dihapus",
          "removedSuccessMessage": "Berkas berhasil dihapus",
          "uploadFailedMessage": "Gagal mengunggah berkas",
          "uploadSuccessMessage": "Berkas berhasil diunggah",
        }
      }
    });
  },[]); 


  const updateTextInput = e => {
    const fieldName = e.target.name;
    console.log("fieldName === ", fieldName);
    setHasilTes(draft => {
      draft[fieldName] = e.target.value
    })
  }

  const updateDropDownCal = e => {
    const fieldName = e.element.ej2_instances[0].htmlattributes.name
    console.log("fieldName ===> ", fieldName)
    setHasilTes(draft => {
      draft[fieldName] = e.element.value
    })
  }

  const handleCheckbox = e => {
    console.log(e.checked)
    setHasilTes(draft => {
      draft["is_published"] = e.checked
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hasilTes === ", hasilTes)
    paymentUpload(hasilTes.id, hasilTes);
  }

  return(
    <>
      <Header category="Admin PMB" title="Hasil Tes" />

      <article className='relative'>

        <div className='absolute left-2 z-10 top-12 bg-[#f9fafb] w-6 h-10'></div>

        <GridComponent 
          id="adaptivebrowser" 
          dataSource={allHasilTest} 
          rowHeight="50" 
          enableAdaptiveUI={true} 
          // rowRenderingMode={renderingMode} 
          ref={g => grid = g}
          toolbar={toolbarOptions}
          editSettings={editSettings} 
          commandClick={commandClick}
          toolbarClick={onToolbarClick} 
          rowSelected={onRowSelected} 
          actionBegin={onActionBegin}
          actionComplete={onActionComplete}
        >
          <ColumnsDirective>
            <ColumnDirective type='checkbox' checkboxOnly={true} width='30'/>
            <ColumnDirective allowEditing={false} field='id' headerText='ID' width='40' isPrimaryKey={true} visible={false} />
            <ColumnDirective allowEditing={false} field='nama_lengkap_anak' headerText='Nama Lengkap Anak' width='200' />
            <ColumnDirective allowEditing={false} field='ayah.nama_lengkap' headerText='Nama Orang Tua' width='200'/>
            <ColumnDirective allowEditing={false} field='ayah.alamat' headerText='Alamat' width='160' />
            <ColumnDirective allowEditing={false} field='nomor_ponsel' headerText='No. Ponsel' width='80' />
            <ColumnDirective allowEditing={false} field='hasil_test.status' headerText='Status' width='120' textAlign="Center" />
            <ColumnDirective allowEditing={true} field='hasil_test.publish' headerText='Publish' width='60' displayAsCheckBox={true} editType='booleanedit' textAlign="Center" />
            <ColumnDirective headerText='Kelola' width='60' textAlign="Center" commands={commands}/>
          </ColumnsDirective>
          <Inject services={[Page, CommandColumn, Edit, Toolbar]}/>
        </GridComponent>

        {/* MODAL MURID DETAIL */}
        <Modal
          isOpen={isOpenModalMurid}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModalMurid}
          style={customStylesMurid}
          contentLabel="Modal Murid"
        >
          {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Data Murid</h2> */}
          <h2 className='mb-3'>Data Murid</h2>
          <button onClick={closeModalMurid}>close</button>

          <p>DATA: {JSON.stringify(murid)}</p>

          <GridComponent 
            dataSource={murid} 
            editSettings={editSettings} 
            rowHeight="50" 
            enableAdaptiveUI={true} 
            // rowRenderingMode={renderingMode}
          >
            <ColumnsDirective>
              <ColumnDirective field='id' headerText='ID' width='30' isPrimaryKey={true} visible={false} />
              <ColumnDirective field='nama_lengkap_anak' headerText='Name Lengkap' width='120'/>
              <ColumnDirective field='nomor_akta_lahir_anak' headerText='No. Akta Lahir' width='120'/>
              <ColumnDirective field='nama_ayah' headerText='Nama Ayah' width='120'/>
              <ColumnDirective field='alamat_ayah' headerText='Alamat Ayah' width='120'/>
              <ColumnDirective field='nama_ibu' headerText='Nama Ibu' width='120'/>
              <ColumnDirective field='alamat_ibu' headerText='Alamat Ibu' width='120'/>
              <ColumnDirective field='nama_wali' headerText='Nama Wali' width='120'/>
              <ColumnDirective field='alamat_wali' headerText='Alamat Wali' width='120'/>
            </ColumnsDirective>
            <Inject services={[Edit, CommandColumn]}/>
          </GridComponent>

        </Modal>

        <Modal
          isOpen={isOpenModalStatus}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModalStatus}
          style={customStyles}
          contentLabel="Modal Status"
        >
          <h2 className='mb-3'>Hasil Tes</h2>

          {/* <p>STATUS: {JSON.stringify(status)}</p> */}

          <form className='grid mt-3 grid- cols-1 gap-7' >

            <section>
          
              <div className={`flex flex-wrap`}>
                <label htmlFor="nominal_wakaf" className="mt-4 mb-1 form-label">
                  Status <span className="ml-1 text-merah">*</span>
                </label>
                <DropDownListComponent 
                  placeholder=""
                  name="status" 
                  dataSource={dropdownData.status} 
                  fields={ { value: 'text', text: 'text' }} 
                  value={hasilTes.status} 
                  change={updateDropDownCal} 
                  popupHeight="auto" 
                />
              </div>

              
              <label htmlFor="akte_kelahiran" className="block mt-4 mb-1">
                Surat Hasil Tes {!hasilTes.pdf ? <span className="ml-1 text-merah">*</span> : <span><MdVerified className='inline-block text-md text-green-600 ml-0.5 mb-1' /> <strong className='text-green-600 text'>Sudah Diunggah</strong></span>}
              </label>
              {/* <div className="w-full p-3 mb-3 text-center rounded-lg bg-soft h-36">
                <img src={previewImageBukti ? previewImageBukti : hasilTes.pdf} className="h-full m-auto" />
              </div> */}
              <UploaderComponent 
                id='pdf' 
                type='file' 
                ref={(scope) => { uploadObj = scope; }} 
                asyncSettings={asyncSettings} 
                removing={onRemoveFile.bind(this)}
                uploading={onFileUpload.bind(this)} 
                success={onSuccess.bind(this)} 
                locale='id-BAHASA'
                allowedExtensions='.pdf'
                minFileSize={minFileSize}
                maxFileSize={maxFileSize} 
                multiple={false}
                autoUpload={false}
                buttons={{ browse: !hasilTes.pdf ? "Unggah Berkas" : "Ganti Berkas" }}
              >
                {/* <FilesDirective>
                  <UploadedFilesDirective name={name_foto} size={25000} type={foto_extension}></UploadedFilesDirective>
                </FilesDirective> */}
              </UploaderComponent>
              <small className='text-gray-400 '><i>Jenis berkas: .pdf</i></small>

              {/* <div className='mt-3'>
                <CheckBoxComponent change={handleCheckbox.bind(this)} label="Publish" data-name="publish" value={hasilTes.is_published} checked={hasilTes.is_published} cssClass="e-success" />
              </div> */}

            </section>

          </form>

          {/* <section className='flex mt-3'>
            <button className="w-auto btn-merah" onClick={handleSubmit}>
              {isLoading ? <CgSpinner className="mr-2 text-xl animate-spin" /> : <AiOutlineSave className='mr-2 text-2xl' /> }
              Update
            </button>
          </section> */}

        </Modal>

      </article>
    </>
  )
};
export default HasilTes;
