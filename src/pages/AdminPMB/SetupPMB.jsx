import { useState, useEffect } from 'react';
import { TabComponent, TabItemDirective, TabItemsDirective } from '@syncfusion/ej2-react-navigations';
import { FaCheckCircle, FaTimesCircle, FaInfoCircle, FaRegCheckCircle } from 'react-icons/fa';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Edit, Toolbar, CommandColumn } from '@syncfusion/ej2-react-grids';
import GelombangPMB from '../../components/admin-pmb/GelombangPMB';
import { AiOutlinePlus } from 'react-icons/ai';
import { CgSpinner } from 'react-icons/cg';
import { Header } from '../../components';
import { useStateContext } from '../../contexts/ContextProviderAdminPMB';

const SetupPMB = () => {
  const { archiveTahunAjaran, publishTahunAjaran, gelombang, getGelombangById, postGelombang, createInitialGelombang, updateGelombang, selectedTahunAjaran, setSelectedTahunAjaran, hapusTahunAjaran, tambahTahunAjaran, indexGelombang, setIndexGelombang, gridFeesData, gridDocsData, postTahunAjaran, currentTahunAjaran, setCurrentTahunAjaran, tahunAjaran, setTahunAjaran, tahunAjaranById, getTahunAjaranByPublish, allTahunAjaran, getAllTahunAjaran, isLoading, setIsLoading, errMsg, setErrMsg, successMsg, setSuccessMsg } = useStateContext();

  useEffect(() => {
    getAllTahunAjaran();
    getTahunAjaranByPublish(1);
  }, []);

  const tabContent = () => {
    return (
      <GelombangPMB key={indexGelombang.toString()} indexGelombang={indexGelombang} />
    )
  }

  const tabSelected = (e) => {
    setIndexGelombang(e.selectedIndex)
    setErrMsg('');
  }

  const tambahGelombang = (e) => {
    e.preventDefault();
    createInitialGelombang(selectedTahunAjaran.id);
    console.log("tahunAjaranById.groups === ", tahunAjaranById)
  }

  let grid;

  const toolbarOptions = [
    { text: '', prefixIcon: 'e-add', id: 'tambah' },
    { text: '', prefixIcon: 'e-edit', id: 'ubah' },
    { text: '', prefixIcon: 'e-cancel', id: 'batal' },
    { text: '', prefixIcon: 'e-update', id: 'simpan' },
    { text: 'Arsip', prefixIcon: 'e-folder', id: 'arsip', align: 'Right' },
    { text: 'Publish', prefixIcon: 'e-eye', id: 'publish', align: 'Right' },
    { text: 'Hapus', prefixIcon: 'e-delete', id: 'hapus', align: 'Right' },
  ];
  const editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, showConfirmDialog: true, showDeleteConfirmDialog: true, newRowPosition: 'Top'};
  const commands = [
    // { 
    //   buttonOption: { iconCss: ' e-icons e-eye', cssClass: 'e-flat', id: 'publish' }, 
    //   title: "Publish Tahun Ajaran"
    // },
    { 
      buttonOption: { iconCss: ' e-icons e-settings', cssClass: 'e-flat', id: 'setup' }, 
      title: "Setup Tahun Ajaran"
    }
  ];
  const onToolbarClick = (args) => {
    // console.log("onToolbarClick === ", args)
    if(args.item.id == "tambah"){
      grid.addRecord();
    }
    else if(args.item.id == "ubah"){
      grid.startEdit();
    }
    else if(args.item.id == "batal"){
      grid.closeEdit();
    }
    else if(args.item.id == "simpan"){
      grid.endEdit();
    }
    else if(args.item.id == "arsip"){
      archiveTahunAjaran(selectedTahunAjaran.id)
    }
    else if(args.item.id == "publish"){
      publishTahunAjaran(selectedTahunAjaran.id)
    }
    else if(args.item.id == "hapus"){
      console.log("hapus === ", args)
      // grid.deleteRecord(grid.getSelectedRows()[0]);
      console.log("selectedTahunAjaran === ", selectedTahunAjaran)
      if(!selectedTahunAjaran.publish){
        hapusTahunAjaran(selectedTahunAjaran.id);
      }
    }
  }
  const onActionBegin = (args) => {
    // console.log('onActionBegin === ', args.rowData);
  }
  const onActionComplete= (args) => {
    console.log('onActionComplete === ', args.rowData);
  }
  const onRowSelected = (args) => {
    console.log('onRowSelected === ', args.data);
    // setSelectedTahunAjaran(args.data)
    // console.log('onRowSelected: selectedTahunAjaran === ', selectedTahunAjaran);
    if( args.data.id == 0){
      tambahTahunAjaran(args.data.tahun_ajaran);
    }
  } 
  const onColumnSelected = (args) => {
    // console.log('onColumnSelected', args.data);
  } 

  const commandClick = (args) =>  {
    console.log('commandClick === ', args.rowData);

    setSelectedTahunAjaran(args.rowData)
    console.log('commandClick: selectedTahunAjaran === ', selectedTahunAjaran);

    if (args.commandColumn.buttonOption.id == "setup") {
      setIndexGelombang(0);
      getGelombangById(args.rowData.id);
    }
    else if(args.commandColumn.buttonOption.id == "publish") {
      publishTahunAjaran(args.rowData.id);
    }
  }


  return(
  <>
    <Header category="Admin PMB" title="Setup PMB" />

    <article>
      <form>
        <section className='rounded-lg mb-7 px-7 pb-7 bg-soft'>
          <div className='relative p-2 mb-3 -mt-4 rounded-tl-lg rounded-tr-lg px-7 text-putih bg-merah -mx-7'>
            <h4>Daftar Tahun Ajaran</h4>
          </div>

          <div className='mt-7'>
            <GridComponent 
              dataSource={allTahunAjaran} 
              ref={(g) => (grid=g)}
              toolbar={toolbarOptions}
              editSettings={editSettings} 
              height={120} 
              commandClick={commandClick}
              toolbarClick={onToolbarClick} 
              rowSelected={onRowSelected} 
              columnSelected={onColumnSelected} 
              actionBegin={onActionBegin}
              actionComplete={onActionComplete}
              enablePersistence={false}
            >
              <ColumnsDirective>
                <ColumnDirective defaultValue='0' field='id' headerText='ID' width={50} isPrimaryKey={true} visible={false} />
                <ColumnDirective field='tahun_ajaran' headerText='Tahun Ajaran' width={'auto'} />
                <ColumnDirective allowEditing={false} field='archived_at' headerText='Tgl. Arsip' width={200} textAlign="Center" visible={true} />
                <ColumnDirective allowEditing={false} field='pengarsipan' headerText='Arsip' width={60} textAlign="Center" displayAsCheckBox={true} editType='booleanedit' />
                <ColumnDirective allowEditing={false} field='publish' headerText='Tayang' width={60} textAlign="Center" displayAsCheckBox={true} editType='booleanedit' />
                <ColumnDirective headerText='Kelola' width={60} commands={commands} textAlign="Center"  />
              </ColumnsDirective>
              <Inject services={[Page, CommandColumn, Edit, Toolbar]}/>
            </GridComponent>
          </div>
          
        </section>

        {/* AKTIFITAS */}
        <section className='relative rounded-lg p-7 bg-soft mb-7'>
          <h4 className='p-2 rounded-tl-lg rounded-tr-lg px-7 text-putih bg-merah -mx-7 -mt-7 mb-7'>Tahun Ajaran {selectedTahunAjaran.tahun_ajaran}</h4>

          {gelombang.length !== 0 &&
            <>
              {!selectedTahunAjaran.publish &&
                <button onClick={tambahGelombang} 
                  className={`${gelombang.length >= 3 && 'hidden'} absolute top-0 right-0 w-auto px-3 py-1 m-1.5 btn-merah bg-green-700 hover:bg-green-600`}
                >
                  {isLoading ? <CgSpinner className="text-xl animate-spin" /> : <AiOutlinePlus className='text-2xl' /> }
                  <span className='md:ml-2 md:inline-block xs:hidden'>Tambah Gelombang</span>
                </button>
              }
            </>
          }

          <TabComponent heightAdjustMode='None' selected={tabSelected} >
            <TabItemsDirective>
              {gelombang?.map(( { id }, index ) => (
                <TabItemDirective 
                  key={index.toString()} 
                  header={{ text: "Gelombang "+(index+1) }}
                  content={tabContent} 
                />
              ))}
            </TabItemsDirective>
          </TabComponent>
          
          { !gelombang.length  &&
            <div className="relative px-4 py-3 mt-3 text-sm text-yellow-900 bg-yellow-100 rounded-md" aria-live="assertive" role="alert">
              <p className="flex gap-2"><FaInfoCircle className='mt-1' />Silahkan memilih Tahun Ajaran atau tambah Tahun Ajaran untuk dikelola.</p>
            </div>
          }
          

        </section>
        
        {/* <div className={successMsg ? "px-4 py-3 mt-3 rounded-md text-green-700 text-sm bg-green-100 relative" : "hidden"} aria-live="assertive" role="alert">
          <p className="flex gap-2"><FaRegCheckCircle className='my-1' /> {successMsg}</p>
        </div> */}

      </form>

    </article>
  </>
  )
};
export default SetupPMB;
