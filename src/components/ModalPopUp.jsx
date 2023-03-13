import Modal from 'react-modal';
import TextInput from "./TextInput";
import { DropdownDebitKredit } from './Dropdown';
import { FilterDate } from './DataTables';

const CustomStylesStatus = {
    content: {
      width: 'auto',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: 'none',
      cursor: 'auto',
      padding: '30px'
    },
    overlay: {
      backgroundColor: 'rgba(0,0,0,.5)',
      cursor: 'pointer'
    }
  };

  export const ModalFilter = ({isOpenFilter, closeModalFilter, onChangeStart, onChangeEnd, selectedEnd, selectedStart, onClickFilterDate, setDebitKredit, post, status}) => {

    return(
        <Modal
            isOpen={isOpenFilter}
            onRequestClose={closeModalFilter}
            style={CustomStylesStatus}
            contentLabel="Modal Status"
            ariaHideApp={false}
            >
            <p className="text-white-700 text-3xl mb-16 mt-5 font-bold">Filter</p>
            <FilterDate
                selectedStart={selectedStart}
                onChangeStart={onChangeStart}
                selectedEnd={selectedEnd}
                onChangeEnd={onChangeEnd}
            />
            <div className='btn-form'>
                <button type="button" style={{width : "auto", }} className="btn-hijau flex justify-center mb-5" onClick={onClickFilterDate}>
                    Terapkan
                </button>
                <button type="button" className="w-20 btn-merah flex justify-center mb-5" onClick={closeModalFilter}>
                    Batal
                </button>
            </div>
        </Modal>
    );
}

export const ModalCostCenter = ({isOpenCostCenter, closeModalCostCenter, setCode, setGroup, setSubGroup, setItem, defaultValueDK, setDebitKredit, post, status}) => {

    return(
        <Modal
            isOpen={isOpenCostCenter}
            onRequestClose={closeModalCostCenter}
            style={CustomStylesStatus}
            contentLabel="Modal Status"
            ariaHideApp={false}
            >
            <p className="text-white-700 text-3xl mb-16 mt-5 font-bold">Form Tambah Cost Center</p>
            <article>
                <TextInput
                    label="Code"
                    type="number"
                    id="group"
                    name="code"
                    onChange={setCode}
                    required={true}
                />
                <TextInput
                    label="Group"
                    type="text"
                    id="group"
                    onChange={setGroup}
                    required={true}
                />
                <TextInput
                    label="Sub Group"
                    type="text"
                    id="group"
                    onChange={setSubGroup}
                    required={true}
                />
                <TextInput
                    label="Item"
                    type="text"
                    id="group"
                    onChange={setItem}
                    required={true}
                />
                <DropdownDebitKredit
                    label="Debit/Kredit"
                    required={true}
                    isClearable={true}
                    defaultValue={defaultValueDK}
                    isSearchable={false}
                    onChange={setDebitKredit}
                />

                <div className='btn-form'>
                    <button type="button" className="w-20 btn-hijau flex justify-center mb-5" onClick={post}>
                        Simpan
                    </button>
                    <button type="button" className="w-20 btn-merah flex justify-center mb-5" onClick={closeModalCostCenter}>
                        Batal
                    </button>
                </div>
            </article>
        </Modal>
    );
}

export const ModalStatusCostCenter = ({closeModalStatus, isOpenStatus, status, navigate}) => {

    return(
        <Modal
            isOpen={isOpenStatus}
            onRequestClose={closeModalStatus}
            style={CustomStylesStatus}
            contentLabel="Modal Status"
            ariaHideApp={false}
            >
            {status?.type === 'success' && 
            <div style={{ textAlign : "center" }}>
                <h2>Berhasil</h2>
                <button style={{ padding : "5px" }} className="btn-action-pink w-auto mt-5" onClick={closeModalStatus}>Kembali Ke Tambah Biaya</button>
                <button style={{ padding : "5px" }} className="btn-action-pink w-auto mt-5 ml-5" onClick={navigate}>Lihat Halaman List</button>
            </div>
            }
            {status?.type === 'error' && 
            <div>
                <h2>Gagal</h2>
                <button className="btn-action-pink w-20 mt-5" onClick={closeModalStatus}>Tutup</button>
            </div>
            } 
        </Modal>
        
    );
}


export const ModalStatus = ({closeModalStatus, isOpenStatus, status, navigate}) => {

    return(
        <Modal
            isOpen={isOpenStatus}
            onRequestClose={closeModalStatus}
            style={CustomStylesStatus}
            contentLabel="Modal Status"
            ariaHideApp={false}
            >
            {status?.type === 'success' && 
            <div style={{ textAlign : "center" }}>
                <h2>Berhasil</h2>
                <button style={{ padding : "5px" }} className="btn-action-pink w-auto mt-5" onClick={navigate}>Kembali Ke Halaman List</button>
            </div>
            }
            {status?.type === 'error' && 
            <div>
                <h2>Gagal</h2>
                <button className="btn-action-pink w-20 mt-5" onClick={closeModalStatus}>Tutup</button>
            </div>
            } 
        </Modal>
        
    );
}

export const ModalEmpty = ({isOpenEmpty, closeModalEmpty, onRequestCloseEmpty}) => {

    return(
        <Modal
            isOpen={isOpenEmpty}
            onRequestClose={onRequestCloseEmpty}
            style={CustomStylesStatus}
            contentLabel="Modal Status"
            ariaHideApp={false}
            >
            <div>
                <h2>Data Tidak Lengkap</h2>
                <button className="btn-action-pink w-20 mt-5" onClick={closeModalEmpty}>Tutup</button>
            </div>
        </Modal>
    );

}