import React from 'react'
import TextInput from '../../../components/TextInput';
import { updateBank } from '../../../api/Bank';
import { ModalEmpty, ModalStatusTambah } from '../../../components/ModalPopUp';
import { useLocation, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { Header } from '../../../components';


export default function UbahKurikulum() {

const [nama_bank, setNamaBank] = useState('');
const [nomor_rekening, setNomorRekening] = useState('');
const [nama_pemilik, setNamaPemilik] = useState('');
const [isOpenStatus, setisOpenStatus] = useState(false);
const [isOpenEmpty, setisOpenEmpty] = useState(false);
const [status, setStatus] = useState(undefined);
const location = useLocation();

const postData = (e) => {
    e.preventDefault();
    const id = location.state.id

    if (nama_bank.trim().length === 0 || nomor_rekening.trim().length === 0 || nama_pemilik.trim().length === 0) {
        setisOpenEmpty(true);
    }
    else {
        updateBank(setStatus, nama_bank, nomor_rekening, nama_pemilik, id)
        setisOpenStatus(true);
    }
}

const closeModalEmpty = () => {
    setisOpenEmpty(false);
}

const closeModalStatus = () => {
    setisOpenStatus(false);
    setStatus('');
}

const navigate = useNavigate();

const navigateKurikulum = () => {
    navigate('/admin/list-kurikulum');
};

return (
    <div>
        <div style={{ marginBottom : "50px" }}>
            <Header category="Admin KBM / Kurikulum / Ubah Kurikulum" title="Ubah Kurikulum" />
        </div>
        <div style={{ marginLeft : "60px" }}>
            <p className="text-3xl mb-16 mt-5 font-bold">Form Ubah Kurikulum</p>
            <article>
                {/* COL 1 */}
                <section>
                    <TextInput
                        label="Code"
                        type="text"
                        onChange={(e) => setNamaBank(e.target.value)}
                        required={true}
                    />
                    <p className='mt-3'>Data Sebelumnya :</p>
                    <p className='text-merah font-bold'>{location.state.nama_pemilik}</p>

                    <TextInput
                        label="Nama"
                        type="text"
                        onChange={(e) => setNamaBank(e.target.value)}
                        required={true}
                    />
                    <p className='mt-3'>Data Sebelumnya :</p>
                    <p className='text-merah font-bold'>{location.state.nama_pemilik}</p>

                    <TextInput
                        label="Deskripsi"
                        type="text"
                        onChange={(e) => setNamaBank(e.target.value)}
                        required={true}
                    />
                    <p className='mt-3'>Data Sebelumnya :</p>
                    <p className='text-merah font-bold'>{location.state.nama_pemilik}</p>
                </section>

                <div className='btn-form'>
                    <button type="button" className="w-20 btn-hijau flex justify-center mb-5" onClick={postData}>
                        Ubah
                    </button>
                    <button type="button" className="w-20 btn-merah flex justify-center mb-5"
                    onClick={navigateKurikulum}>
                        Batal
                    </button>
                </div>

                <ModalStatusTambah
                    isOpenStatus={isOpenStatus}
                    closeModalStatus={closeModalStatus}
                    status={status}
                    navigate={navigateKurikulum}
                />

                <ModalEmpty
                    isOpenEmpty={isOpenEmpty}
                    closeModalEmpty={closeModalEmpty}
                    onRequestCloseEmpty={closeModalEmpty}
                />
            </article>
        </div>
    </div>
)
}