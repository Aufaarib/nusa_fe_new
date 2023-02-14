import { useState, useEffect } from 'react';
import { useImmer } from 'use-immer';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Edit, Toolbar, CommandColumn } from '@syncfusion/ej2-react-grids';
import { AiOutlineSave, AiOutlinePlus } from 'react-icons/ai';
import { FaCheckCircle, FaTimesCircle, FaInfoCircle, FaRegCheckCircle, FaCommentsDollar } from 'react-icons/fa';
import { CgSpinner } from 'react-icons/cg';
import { useStateContext } from '../../contexts/ContextProviderAdminPMB';
import { v4 as uuidv4 } from 'uuid';


const GelombangPMB = ({ indexGelombang }) => {
  const timeStamp = Math.ceil((new Date().getTime()));
  const { updateBiayaById, selectedTahunAjaran, gelombang, updateGelombang, postGelombang, setPostGelombang, getBiayaById, isLoading, setIsLoading, errMsg, setErrMsg, setSuccessMsg } = useStateContext();
  const [gelombangData, setGelombangData] = useImmer({})
  const [gridFeesData, setGridFeesData] = useState([])
  const [gridDocsData, setGridDocsData] = useState([])
  const [readyToUpdate, setReadyToUpdate] = useState(false)

  useEffect(() => {
    // setGelombangData({...gelombang[indexGelombang]})
    setGelombangData({
      id: gelombang[indexGelombang].id,
      tahun_ajaran_id: gelombang[indexGelombang].tahun_ajaran_id,
      nama: gelombang[indexGelombang].nama,
      step_register_start: gelombang[indexGelombang].step_register_start,
      step_register_end: gelombang[indexGelombang].step_register_end,
      step_payment_registration_start: gelombang[indexGelombang].step_payment_registration_start,
      step_payment_registration_end: gelombang[indexGelombang].step_payment_registration_end,
      step_eform_start: gelombang[indexGelombang].step_eform_start,
      step_eform_end: gelombang[indexGelombang].step_eform_end,
      step_test_start: gelombang[indexGelombang].step_test_start,
      step_test_end: gelombang[indexGelombang].step_test_end,
      step_daftar_ulang_start: gelombang[indexGelombang].step_daftar_ulang_start,
      step_daftar_ulang_end: gelombang[indexGelombang].step_daftar_ulang_end,
      step_payment_education_start: gelombang[indexGelombang].step_payment_education_start,
      step_payment_education_end: gelombang[indexGelombang].step_payment_education_end,
    })
    setGridFeesData([...gelombang[indexGelombang].fees])
    setGridDocsData([...gelombang[indexGelombang].syarat_dokumen])
    // fees = Object.assign([], gridFeesData);
    // console.log("GELOMBANG: DATA ==== " + JSON.stringify(gelombangData));
    // console.log("GELOMBANG: FEES ==== " + JSON.stringify(fees));
    // console.log("GELOMBANG: DOCS ==== " + JSON.stringify(gridDocsData));
  }, [])

  useEffect(() => {
    // console.log("GELOMBANG: TAHUN AJARAN BY ID ==== " + JSON.stringify(tahunAjaranById));
    console.log("GELOMBANG: GELOMBANG ==== " + JSON.stringify(gelombang));
    // console.log("GELOMBANG: POST TAHUN AJARAN === ", postTahunAjaran)
    // console.log("GELOMBANG: POST GELOMBANG === ", postGelombang)
    // console.log("GELOMBANG: DATA ==== " + JSON.stringify(gelombangData));
    // console.log("GELOMBANG: GRID FEES ==== " + JSON.stringify(gridFeesData));
    // console.log("GELOMBANG: GRID DOCS ==== " + JSON.stringify(gridDocsData));
  }, [gelombangData, gridFeesData, gridDocsData, postGelombang])

  useEffect(() => {
    if(readyToUpdate == true){
      updateGelombang(gelombang[indexGelombang].id);
      setReadyToUpdate(false)
    }
  }, [postGelombang])

  const handleSubmit = async (e) => {
    e.preventDefault();
    collectGelombangData();
    setReadyToUpdate(true)
  }

  // NGUMPULIN DATA GELOMBANG, FEES & DOCS UNTUK DIUPDATE
  const collectGelombangData = () => {
    setPostGelombang(draft => {
      draft["id"]                               = gelombangData.id
      draft["tahun_ajaran_id"]                  = gelombangData.tahun_ajaran_id
      draft["nama"]                             = gelombangData.nama
      draft["step_register_start"]              = gelombangData.step_register_start
      draft["step_register_end"]                = gelombangData.step_register_end
      draft["step_payment_registration_start"]  = gelombangData.step_payment_registration_start
      draft["step_payment_registration_end"]    = gelombangData.step_payment_registration_end
      draft["step_eform_start"]                 = gelombangData.step_eform_start
      draft["step_eform_end"]                   = gelombangData.step_eform_end
      draft["step_test_start"]                  = gelombangData.step_test_start
      draft["step_test_end"]                    = gelombangData.step_test_end
      draft["step_daftar_ulang_start"]          = gelombangData.step_daftar_ulang_start
      draft["step_daftar_ulang_end"]            = gelombangData.step_daftar_ulang_end
      draft["step_payment_education_start"]     = gelombangData.step_payment_education_start
      draft["step_payment_education_end"]       = gelombangData.step_payment_education_end
      draft["fees"]                             = gridFees.currentViewData;
      draft["syarat_dokumen"]                   = gridDocs.currentViewData;
    })
  }

  const getBiaya = async (e) => {
    e.preventDefault();
    getBiayaById(gelombang[indexGelombang].id)
  }

  const updateBiaya = async (e) => {
    e.preventDefault();
    updateBiayaById(gridFeesData[4])
  }

  const updateGelombangCal = e => {
    const fieldName = e.element.id
    setGelombangData(draft => {
      draft[fieldName] = e.element.value
    })
  }

  // GRID
  let gridGelombang;
  let gridFees;
  let gridDocs;

  const toolbarOptions = [
    { text: '', prefixIcon: 'e-add', id: 'tambah' },
    { text: '', prefixIcon: 'e-edit', id: 'ubah' },
    { text: '', prefixIcon: 'e-cancel', id: 'batal' },
    { text: '', prefixIcon: 'e-update', id: 'simpan' },
    { text: 'Hapus', prefixIcon: 'e-delete', id: 'hapus', align: 'Right' },
  ];
  const toolbarOptionsDokumen = [
    { text: 'Ubah', prefixIcon: 'e-edit', id: 'ubah' },
    { text: 'Batal', prefixIcon: 'e-cancel', id: 'batal' },
    { text: 'Simpan', prefixIcon: 'e-update', id: 'simpan' },
  ];
  const editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, allowEditOnDblClick: true, newRowPosition: 'Bottom', 
                          // showConfirmDialog: true, showDeleteConfirmDialog: true, 
                        };
  const editSettingsFalse = { allowEditing: false, allowAdding: false, allowDeleting: false, allowEditOnDblClick: false };

  const commands = [
    // { type: 'Edit', buttonOption: { cssClass: 'e-flat', iconCss: 'e-edit e-icons' } },
    // { type: 'Delete', buttonOption: { cssClass: 'e-flat', iconCss: 'e-delete e-icons' } },
    { type: 'Save', buttonOption: { cssClass: 'e-flat', iconCss: 'e-update e-icons' } },
    { type: 'Cancel', buttonOption: { cssClass: 'e-flat', iconCss: 'e-cancel-icon e-icons' } }
];

  const selectionSettings = { persistSelection: true };
  const verifiedParams = { params: { checked: false } };
  const numericParams = { params: { decimals: 2 } };
  const idParams = { params: { id: timeStamp } };

  // const created = () => {
  //   let toolbar = grid.element.querySelector('.e-toolbar');
  //   grid.element.appendChild(toolbar);
  // };

  const onToolbarClickFees = (args) => {
    // console.log("onToolbarClick === ", args)
    // console.log("gridFees.currentViewData === ", gridFees.currentViewData)
    if(args.item.id == "tambah"){
      gridFees.addRecord();
    }
    else if(args.item.id == "ubah"){
      gridFees.startEdit();
    }
    else if(args.item.id == "hapus"){
      gridFees.deleteRecord(gridFees.getSelectedRows()[0]);
    }
    else if(args.item.id == "batal"){
      gridFees.closeEdit();
    }
    else if(args.item.id == "simpan"){
      gridFees.endEdit();
      // console.log( "onToolbarClickFees === ", gridFeesData);
    }
  }
  const onToolbarClickDocs = (args) => {
    if(args.item.id == "ubah"){
      gridDocs.startEdit();
    }
    else if(args.item.id == "batal"){
      gridDocs.closeEdit();
    }
    else if(args.item.id == "simpan"){
      gridDocs.endEdit();
      // console.log( "onToolbarClickDocs === ", gridDocsData);
    }
  }

  // ROW SELECTED FEES
  const onRowSelectedFees = (args) => {
    console.log('onRowSelected === ', args.data);
    
    if(args.data.id == "0"){
      console.log("KOSONG")
      args.data.id = uuidv4();
      args.data.group_id = uuidv4();
    }
    setGridFeesData(gridFees.currentViewData);
    // console.log("ROW SELECTED: GRID FEES ==== " + JSON.stringify(gridFeesData));
  } 

  // ROW SELECTED DOCS
  const onRowSelectedDocs = (args) => {
    if(args.data.id == "0"){
      console.log("KOSONG")
      args.data.id = uuidv4();
      args.data.group_id = uuidv4();
    }
    setGridDocsData(gridDocs.currentViewData);
    // console.log("ROW SELECTED: GRID DOCS ==== " + JSON.stringify(gridDocsData));
  } 

  const commandClick = (args) =>  {
    // alert(args.rowData)
  }

  const onActionBegin = (args) => {
    // RESET DATA POST GELOMBANG
    // setPostGelombang({});
  }
  const onActionComplete= (args) => {
    // console.log('onActionComplete === ', args.data);
  }

  return(
    <article className='relative'>   

      <form>
        <div className='grid mt-4 xs:gap-3 md:gap-7 xs:grid-cols-1 md:grid-cols-3'>
          {/* STEP 1 */}
          <div className='py-2'>1. Pendaftaran Akun</div>
          <div>
            <DatePickerComponent 
              name="groups"
              id="step_register_start"
              value={gelombangData.step_register_start} 
              change={updateGelombangCal.bind(this)}  
              format="dd MMMM yyyy"              />
          </div>
          <div>
            <DatePickerComponent 
              name="groups"
              id="step_register_end"
              value={gelombangData.step_register_end} 
              change={updateGelombangCal.bind(this)}  
              format="dd MMMM yyyy"
            />
          </div>
        </div>

        {/* STEP 2 */}
        <div className='grid mt-4 xs:gap-3 md:gap-7 xs:grid-cols-1 md:grid-cols-3'>
          <div className='py-2'>2. Pembayaran Registrasi PMB</div>
          <div>
            <DatePickerComponent 
              name="groups"
              id="step_payment_registration_start"
              value={gelombangData.step_payment_registration_start} 
              change={updateGelombangCal.bind(this)}  
              format="dd MMMM yyyy"              />
          </div>
          <div>
            <DatePickerComponent 
              name="groups"
              id="step_payment_registration_end"
              value={gelombangData.step_payment_registration_end} 
              change={updateGelombangCal.bind(this)}  
              format="dd MMMM yyyy"              />
          </div>
        </div>

        {/* STEP 3 */}
        <div className='grid mt-4 xs:gap-3 md:gap-7 xs:grid-cols-1 md:grid-cols-3'>
          <div className='py-2'>3. Pengisian Formulir</div>
          <div>
            <DatePickerComponent 
              name="groups"
              id="step_eform_start"
              value={gelombangData.step_eform_start} 
              change={updateGelombangCal.bind(this)}  
              format="dd MMMM yyyy"              />
          </div>
          <div>
            <DatePickerComponent 
              name="groups"
              id="step_eform_end"
              value={gelombangData.step_eform_end} 
              change={updateGelombangCal.bind(this)}  
              format="dd MMMM yyyy"              />
          </div>
        </div>

        {/* STEP 4 */}
        <div className='grid mt-4 xs:gap-3 md:gap-7 xs:grid-cols-1 md:grid-cols-3'>
          <div className='py-2'>4. Tes & Hasil Tes</div>
          <div>
            <DatePickerComponent 
              name="groups"
              id="step_test_start"
              value={gelombangData.step_test_start} 
              change={updateGelombangCal.bind(this)}  
              format="dd MMMM yyyy"              />
          </div>
          <div>
            <DatePickerComponent 
              name="groups"
              id="step_test_end"
              value={gelombangData.step_test_end} 
              change={updateGelombangCal.bind(this)}  
              format="dd MMMM yyyy"              />
          </div>
        </div>

        {/* STEP 5 */}
        <div className='grid mt-4 xs:gap-3 md:gap-7 xs:grid-cols-1 md:grid-cols-3'>
          <div className='py-2'>5. Daftar Ulang</div>
          <div>
            <DatePickerComponent 
              name="groups"
              id="step_daftar_ulang_start"
              value={gelombangData.step_daftar_ulang_start} 
              change={updateGelombangCal.bind(this)}  
              format="dd MMMM yyyy"              />
          </div>
          <div>
            <DatePickerComponent 
              name="groups"
              id="step_daftar_ulang_end"
              value={gelombangData.step_daftar_ulang_end} 
              change={updateGelombangCal.bind(this)}  
              format="dd MMMM yyyy"              />
          </div>
        </div>

        {/* STEP 6 */}
        <div className='grid mt-4 xs:gap-3 md:gap-7 xs:grid-cols-1 md:grid-cols-3'>
          <div className='py-2'>6. Pembayaran Biaya Pendidikan</div>
          <div>
            <DatePickerComponent 
              name="groups"
              id="step_payment_education_start"
              value={gelombangData.step_payment_education_start} 
              change={updateGelombangCal.bind(this)}  
              format="dd MMMM yyyy"              />
          </div>
          <div>
            <DatePickerComponent 
              name="groups"
              id="step_payment_education_end"
              value={gelombangData.step_payment_education_end} 
              change={updateGelombangCal.bind(this)}  
              format="dd MMMM yyyy"              />
          </div>
        </div>

        {/* BIAYA DAN BESARAN */}
        <section className='rounded-lg shadow-lg xs:mt-7 lg:mt-12 p-7 mb-7'>
          <h4 className='p-2 rounded-tl-lg rounded-tr-lg px-7 text-putih bg-merah -mx-7 -mt-7 mb-7'>Biaya & Besaran</h4>
          <GridComponent
            // created={created} 
            // dataSource={gelombang[indexGelombang].fees} 
            dataSource={gridFeesData}
            ref={(gf) => (gridFees=gf)} 
            toolbarClick={onToolbarClickFees} 
            toolbar={!selectedTahunAjaran.publish && toolbarOptions} 
            editSettings={!selectedTahunAjaran.publish ? editSettings : editSettingsFalse} 
            commandClick={commandClick}
            selectionSettings={selectionSettings}
            rowSelected={onRowSelectedFees} 
            actionBegin={onActionBegin}
            actionComplete={onActionComplete}
          >
            <ColumnsDirective>
              <ColumnDirective defaultValue='0' field='id' headerText='ID' isPrimaryKey={true} visible={false} />
              <ColumnDirective field='group_id' headerText='Gel ID' width={50} visible={true} />
              <ColumnDirective field='untuk_registrasi' headerText='Reg' width={40} displayAsCheckBox={true} editType='booleanedit' textAlign="Center" />
              <ColumnDirective field='is_enabled' headerText='Aktif' width={50} displayAsCheckBox={true} editType='booleanedit' textAlign="Right" />
              <ColumnDirective field='nama' headerText='Item'/>
              <ColumnDirective field='biaya' headerText='Biaya' format='Rp 000,000' editType='numericedit' edit={numericParams} textAlign="Right"/>
              {/* <ColumnDirective headerText='Kelola' commands={commands} textAlign="Center"/> */}
            </ColumnsDirective>
            <Inject services={[Page, CommandColumn, Edit, Toolbar]}/>
          </GridComponent>
        </section>

        {/* SYARAT DOKUMEN */}
        <section className='rounded-lg shadow-lg xs:mt-7 lg:mt-12 p-7 mb-7'>
          <h4 className='p-2 rounded-tl-lg rounded-tr-lg px-7 text-putih bg-merah -mx-7 -mt-7 mb-7'>Syarat Dokumen</h4>
          <GridComponent
            // created={created} 
            // dataSource={gelombang[indexGelombang].syarat_dokumen}
            dataSource={gridDocsData}
            ref={(g) => (gridDocs = g)} 
            // toolbarClick={onToolbarClickDocs} 
            // toolbar={!selectedTahunAjaran.publish && toolbarOptionsDokumen} 
            editSettings={!selectedTahunAjaran.publish ? editSettings : editSettingsFalse} 
            commandClick={commandClick}
            selectionSettings={selectionSettings}
            rowSelected={onRowSelectedDocs} 
            actionBegin={onActionBegin}
            actionComplete={onActionComplete}
          >
            <ColumnsDirective>
              <ColumnDirective defaultValue='0' field='id' headerText='ID' isPrimaryKey={true} visible={false} />
              <ColumnDirective field='wajib' headerText='Wajib' width={50} displayAsCheckBox={true} editType='booleanedit' textAlign="Center"/>
              <ColumnDirective field='nama' headerText='Nama Berkas'/>
              <ColumnDirective headerText='' width='120' commands={commands}/>
            </ColumnsDirective>
            <Inject services={[Page, CommandColumn]}/>
          </GridComponent>
        </section>
          
        <button className="w-auto btn-merah" onClick={handleSubmit}>
          {isLoading ? <CgSpinner className="mr-2 text-xl animate-spin" /> : <AiOutlineSave className='mr-2 text-2xl' /> }
          Simpan Gelombang {indexGelombang+1}
        </button>

      </form>
    </article>
  )
};
export default GelombangPMB;
