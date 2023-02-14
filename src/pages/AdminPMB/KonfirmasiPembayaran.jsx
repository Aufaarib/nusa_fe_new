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

const KonfirmasiPembayaran = () => {
  const token = JSON.parse(localStorage.getItem('TOKEN'));
  const { paymentUpload, allPaymentRegister, setAllPaymentRegister, getAllPaymentRegister, isLoading, setIsLoading, errMsg, setErrMsg, setSuccessMsg } = useStateContext();
  const [isOpenModalMurid, setIsOpenModalMurid] = useState(false);
  const [isOpenModalStatus, setIsOpenModalStatus] = useState(false);
  const [murid, setMurid] = useState([{}]);
  const [status, setStatus] = useImmer(
    {
      id: null,
      bukti: "",
      tgl_bayar: "",
      jenis_bayar: "",
      total: null,
      status_bukti: "",
      jumlah_anak: null,
      is_published: null,
      user_id: null
    }
  );
  const [previewImageBukti, setPreviewImageBukti] = useState("")

  const customStyles = {
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
      cursor: 'pointer'
    }
  };

  useEffect(() => {
    getAllPaymentRegister();
    console.log("allPaymentRegister === ", allPaymentRegister);
  },[]);

  let subtitle;

  const renderingMode = 'Vertical';
  const editOptions = { allowEditing: false, allowDeleting: false };
  const commands = [
    {
      buttonOption: {iconCss: ' e-icons e-people', cssClass: 'e-outline', id: 'murid'},
      title: "Lihat Murid"
    },
    {
      buttonOption: {iconCss: ' e-icons e-image', cssClass: 'e-outline', id: 'status-pembayaran'},
      title: "Status Pembayaran"
    },
  ];

  let grid;
  const load = () => {
      grid = document.getElementById('adaptivebrowser').ej2_instances[0];
      grid.adaptiveDlgTarget = document.getElementsByClassName('e-mobile-content')[0];
  };

  const commandClick = (args) =>  {
    const murid = args.rowData.students;
    const status = args.rowData.status_pembayaran;

    if (args.commandColumn.buttonOption.id == "murid") {
      console.log("args.rowData === ", args.rowData )
      setMurid(murid);
      setIsOpenModalMurid(true);
    }
    if (args.commandColumn.buttonOption.id == "status-pembayaran") {
      console.log("args.rowData === ", args.rowData )
      setStatus(status)
      setIsOpenModalStatus(true);
    }
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
      saveUrl: BASE_URL+`/api/pmb/payment-register/${status.user_id}`,
      removeUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Remove'
  };
  const uploadAll = () => {
    uploadObj.upload();
  }
  function onRemoveFile(args) {
      args.postRawFile = false;
  }
  function onFileUpload(args) {
    console.log("UPLOADING..")
    console.log("onFileUpload === ", args)
    
    // const sizeInBytes = args.fileData.size;
    // alert("File size is: " + uploadObj.bytesToSize(sizeInBytes));

    args.customFormData = [
      {id: status.id},
      {bukti: status.bukti},
      {tgl_bayar: status.tgl_bayar},
      {jenis_bayar: status.jenis_bayar},
      {total: status.total},
      {status_bukti: status.status_bukti},
      {jumlah_anak: status.jumlah_anak},
      {publish: status.is_published},
      {user_id: status.user_id}
    ];
    (args.currentRequest).setRequestHeader('Authorization', `Bearer ${token}`)

    setPreviewImageBukti(args.fileData.name)
  }
  function onSuccess(args) {
    // getDocumentsData();
    console.log("SUCCESS")
    getAllPaymentRegister();
    console.log("AFTER UPLOAD: allPaymentRegister === ", allPaymentRegister);
    // const newBukti = allPaymentRegister.map((item, index) => {
    //   if(item.id == status.user_id){
    //     return item.status_pembayaran.bukti
    //   }
    // })

    // setStatus((draft) => {
    //   const data = draft.find((data) => data.id === status.user_id);
    //   status.bukti = data.status_pembayaran.bukti;
    // });
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
    setStatus(draft => {
      draft[fieldName] = e.target.value
    })
  }

  const updateDropDownCal = e => {
    const fieldName = e.element.ej2_instances[0].htmlattributes.name
    console.log("fieldName ===> ", fieldName)
    setStatus(draft => {
      draft[fieldName] = e.element.value
    })
  }

  const handleCheckbox = e => {
    console.log(e.checked)
    setStatus(draft => {
      draft["is_published"] = e.checked
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    uploadAll();
    // console.log("status === ", status)
    // paymentUpload(status.user_id, status);
  }

  return(
    <>
      <Header category="Admin PMB" title="Konfirmasi Pembayaran" />

      <article>

        <GridComponent 
          id="adaptivebrowser" 
          dataSource={allPaymentRegister} 
          editSettings={editOptions} 
          rowHeight="50" 
          commandClick={commandClick} 
          enableAdaptiveUI={true} 
          rowRenderingMode={renderingMode} 
          ref={g => grid = g}
        >
          <ColumnsDirective>
            <ColumnDirective field='id' headerText='ID' width='40' isPrimaryKey={true} visible={false}/>
            <ColumnDirective field='nama_lengkap' headerText='Name Lengkap' width='40'/>
            <ColumnDirective field='email' headerText='Email' width='200'/>
            <ColumnDirective field='nomor_ponsel' headerText='No. Ponsel' width='120'/>
            <ColumnDirective field='status_pembayaran.status_bukti' headerText='Status Bukti' width='120' textAlign="Center"/>
            <ColumnDirective field='status_pembayaran.is_published' headerText='Publish' width='60' displayAsCheckBox={true} editType='booleanedit' textAlign="Center" />
            <ColumnDirective headerText='Kelola' width='120' textAlign="Center" commands={commands}/>
          </ColumnsDirective>
          <Inject services={[Edit, CommandColumn]}/>
        </GridComponent>

        {/* MODAL MURID DETAIL */}
        <Modal
          isOpen={isOpenModalMurid}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModalMurid}
          style={customStyles}
          contentLabel="Modal Murid"
        >
          {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Data Murid</h2> */}
          <h2 className='mb-3'>Data Murid</h2>
          {/* <button onClick={closeModalMurid}>close</button> */}

          <GridComponent 
            dataSource={murid} 
            editSettings={editOptions} 
            rowHeight="50" 
            enableAdaptiveUI={true} 
            rowRenderingMode={renderingMode}
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
          <h2 className='mb-3'>Konfirmasi Pembayaran</h2>

          {/* <p>STATUS: {JSON.stringify(status)}</p> */}

          <form className='grid mt-3 xs:grid-cols-1 md:grid-cols-2 gap-7' >

            <section>
              <TextInput 
                label="Total Bayar"
                type="number"
                name="total"
                onChange={updateTextInput}
                value={status.total}
                required={true}
                min="1"
              />

              <div className={`flex flex-wrap`}>
                <label htmlFor="nominal_wakaf" className="mt-4 mb-1 form-label">
                  Jenis Bayar <span className="ml-1 text-merah">*</span>
                </label>
                <DropDownListComponent 
                  placeholder=""
                  name="jenis_bayar" 
                  dataSource={dropdownData.jenisBayar} 
                  fields={ { value: 'text', text: 'text' }} 
                  value={status.jenis_bayar} 
                  change={updateDropDownCal} 
                  popupHeight="auto" 
                />
              </div>

              <div className="flex flex-wrap">
                <label htmlFor="tanggal_lahir" className="flex w-full mt-4 mb-1 form-label">
                  Tanggal Bayar<span className="ml-1 text-merah">*</span>
                </label>
                <DatePickerComponent 
                  name="tgl_bayar"
                  value={status.tgl_bayar} 
                  change={updateDropDownCal}  
                  format="dd MMMM yyyy"
                />
              </div>

              <div className={`flex flex-wrap`}>
                <label htmlFor="nominal_wakaf" className="mt-4 mb-1 form-label">
                  Status Bukti <span className="ml-1 text-merah">*</span>
                </label>
                <DropDownListComponent 
                  placeholder=""
                  name="status_bukti" 
                  dataSource={dropdownData.statusBukti} 
                  fields={ { value: 'text', text: 'text' }} 
                  value={status.status_bukti} 
                  change={updateDropDownCal} 
                  popupHeight="auto" 
                />
              </div>
            </section>

            <section>
              <label htmlFor="akte_kelahiran" className="block mt-4 mb-1">
                Bukti Pembayaran {!status.bukti ? <span className="ml-1 text-merah">*</span> : <span><MdVerified className='inline-block text-md text-green-600 ml-0.5 mb-1' /> <strong className='text-green-600 text'>Sudah Diunggah</strong></span>}
              </label>
              <div className="w-full h-48 p-3 mb-3 text-center rounded-lg bg-soft">
                <img src={status.bukti} className="h-full m-auto" />
                {/* <img src={previewImageBukti ? previewImageBukti : status.bukti} className="h-full m-auto" /> */}
              </div>
              {/* {!status.is_published && */}
              <>
                <UploaderComponent 
                  id='bukti' 
                  type='file' 
                  ref={upload => { uploadObj = upload; }}
                  asyncSettings={asyncSettings} 
                  removing={onRemoveFile.bind(this)}
                  uploading={onFileUpload.bind(this)} 
                  success={onSuccess.bind(this)} 
                  locale='id-BAHASA'
                  allowedExtensions='.jpg,.png,.jpeg'
                  minFileSize={minFileSize}
                  maxFileSize={maxFileSize} 
                  multiple={false}
                  autoUpload={false}
                  buttons={{ browse: !status.bukti ? "Unggah Berkas" : "Ganti Berkas" }}
                >
                  {/* <FilesDirective>
                    <UploadedFilesDirective name={name_foto} size={25000} type={foto_extension}></UploadedFilesDirective>
                  </FilesDirective> */}
                </UploaderComponent>
                <small className='text-gray-400 '><i>Jenis berkas: .jpg, .png</i></small>
                </>
              {/* } */}

            </section>

          </form>

          <section className='mt-3'>
            <div className='mt-6'>
              <CheckBoxComponent change={handleCheckbox.bind(this)} label="Publish" data-name="publish" value={status.is_published} checked={status.is_published} cssClass="e-success" />
            </div>
            
            {/* <button className="w-auto btn-merah" onClick={uploadAll}>
              {isLoading ? <CgSpinner className="mr-2 text-xl animate-spin" /> : <AiOutlineSave className='mr-2 text-2xl' /> }
              Update
            </button> */}
          </section>

        </Modal>

      </article>
    </>
  )
};
export default KonfirmasiPembayaran;
