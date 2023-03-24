import React from 'react'
import TextInput from '../../../components/TextInput';
import { updateBank } from '../../../api/Bank';
import { ModalEmpty, ModalStatusTambah } from '../../../components/ModalPopUp';
import { useLocation, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { Header } from '../../../components';


export default function UbahKelas() {

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

const navigateKelas = () => {
    navigate('/admin/list-kelas');
};

return (
    <div>
        <div style={{ marginBottom : "50px" }}>
            <Header category="Admin KBM / Kelas / Ubah Kelas" title="Ubah Kelas" />
        </div>
        <div style={{ marginLeft : "60px" }}>
            <p className="text-3xl mb-16 mt-5 font-bold">Form Ubah Kelas</p>
            <article>
                {/* COL 1 */}
                <section>
                <TextInput
                    label="Nama"
                    type="number"
                    id="group"
                    name="code"
                    onChange={(e) => setNamaBank(e.target.value)}
                    required={true}
                />
                <p className='mt-3'>Data Sebelumnya :</p>
                <p className='text-merah font-bold'>{location.state.nama_pemilik}</p>
                <TextInput
                    label="Deskripsi"
                    type="number"
                    id="group"
                    name="code"
                    onChange={(e) => setNamaBank(e.target.value)}
                    required={true}
                />
                <p className='mt-3'>Data Sebelumnya :</p>
                <p className='text-merah font-bold'>IV</p>
                </section>

                <div className='btn-form'>
                    <button type="button" className="w-20 btn-hijau flex justify-center mb-5" onClick={postData}>
                        Ubah
                    </button>
                    <button type="button" className="w-20 btn-merah flex justify-center mb-5"
                    onClick={navigateKelas}>
                        Batal
                    </button>
                </div>

                <ModalStatusTambah
                    isOpenStatus={isOpenStatus}
                    closeModalStatus={closeModalStatus}
                    status={status}
                    navigate={navigateKelas}
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