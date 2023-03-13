import React from 'react'
import TextInput from '../../../components/TextInput'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from '../../../api/axios';
import { ModalEmpty, ModalStatus } from '../../../components/ModalPopUp';

export default function TambahTipeTransaksi() {

    const [description, setDesc] = useState('');
    const [status, setStatus] = useState('');
    const [isOpenStatus, setisOpenStatus] = useState(false);
    const [isOpenEmpty, setisOpenEmpty] = useState(false);
    const [sts, setSts] = useState(undefined);

    const postData = (e) => {
        e.preventDefault();

        if (description.trim().length === 0 || status.trim().length === 0) {
            setisOpenEmpty(true);
        }
        else {
            axios.post('https://nusa.nuncorp.id/golang/api/v1/transaction-type/create',{
            description,
            status
        })
        .then(() => {
            setSts({ type: 'success' });
            setisOpenStatus(true);
        })
        .catch((error) => {
            setSts({ type: 'error', error });
        });
    }
}

const closeModalEmpty = () => {
    setisOpenEmpty(false);
}

const closeModalStatus = () => {
    setisOpenStatus(false);
    setSts('');
}
    const navigate = useNavigate();

    const navigateListTipeTransaksi = () => {
      navigate('/admin/list-tipe-transaksi');
    };

    return (
        <div>
            <p className="text-white-700 text-3xl mb-16 mt-5 font-bold">Form Tambah Tipe Transaksi</p>

            <article>

                <TextInput
                    label="Deskrisi"
                    type="text"
                    name="deskripsi"
                    onChange={(e) => setDesc(e.target.value)}
                    required={true}
                />
                <TextInput
                    label="Status"
                    type="text"
                    name="status"
                    onChange={(e) => setStatus(e.target.value)}
                    required={true}
                />

                <div className='btn-form'>
                    <button type="button" className="w-20 btn-hijau flex justify-center mb-5" onClick={postData}>
                        Simpan
                    </button>
                    <button type="button" className="w-20 btn-merah flex justify-center mb-5"
                    onClick={navigateListTipeTransaksi}>
                        Batal
                    </button>
                </div>

                <ModalStatus 
                    isOpenStatus={isOpenStatus}
                    closeModalStatus={closeModalStatus}
                    status={sts}
                    navigate={navigateListTipeTransaksi}
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