import React from 'react'
import TextInput from '../../../components/TextInput'
import { ModalEmpty, ModalStatus } from '../../../components/ModalPopUp';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from '../../../api/axios';

export default function TambahListBank() {

const [nama_bank, setNamaBank] = useState('');
const [nomor_rekening, setNomorRekening] = useState('');
const [nama_pemilik, setNamaPemilik] = useState('');
const [isOpenStatus, setisOpenStatus] = useState(false);
const [isOpenEmpty, setisOpenEmpty] = useState(false);
const [status, setStatus] = useState(undefined);


const postData = (e) => {
    e.preventDefault();

    if (nama_bank.trim().length === 0 || nomor_rekening.trim().length === 0 || nama_pemilik.trim().length === 0) {
        setisOpenEmpty(true);
    }
    else {
        axios.post('https://nusa.nuncorp.id/golang/api/v1/bank/create',{
        nama_bank,
        nomor_rekening,
        nama_pemilik
    })
    .then(() => {
        setStatus({ type: 'success' });
        setisOpenStatus(true);
    })
    .catch((error) => {
        setStatus({ type: 'error', error });
    });
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

const navigateListBank = () => {
    navigate('/admin/list-bank');
};

return (
    <div>
        <p className="text-white-700 text-3xl mb-16 mt-5 font-bold">Form Tambah List Bank</p>

        <article>

            <TextInput
                label="Nama Bank"
                type="text"
                id="code"
                onChange={(e) => setNamaBank(e.target.value)}
                required={true}
            />
            <TextInput
                label="Nomor Rekening"
                type="number"
                id="code"
                onChange={(e) => setNomorRekening(e.target.value)}
                required={true}
            />
            <TextInput
                label="Nama Pemilik"
                type="text"
                id="group"
                onChange={(e) => setNamaPemilik(e.target.value)}
                required={true}
            />

            <div className='btn-form'>
                <button type="button" className="w-20 btn-hijau flex justify-center mb-5" onClick={postData}>
                    Simpan
                </button>
                <button type="button" className="w-20 btn-merah flex justify-center mb-5"
                onClick={navigateListBank}>
                    Batal
                </button>
            </div>

            <ModalStatus 
                isOpenStatus={isOpenStatus}
                closeModalStatus={closeModalStatus}
                status={status}
                navigate={navigateListBank}
            />

            <ModalEmpty
                isOpenEmpty={isOpenEmpty}
                closeModalEmpty={closeModalEmpty}
                onRequestCloseEmpty={closeModalEmpty}
            />

        </article>


    </div>
)
}