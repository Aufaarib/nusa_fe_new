import React from 'react'
import TextInput from '../../../components/TextInput'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { postTipeTransaksi } from '../../../api/TipeTransaksi';
import { ModalEmpty, ModalStatusTambah } from '../../../components/ModalPopUp';
import { Header } from '../../../components';

export default function TambahTipeTransaksi() {

    const [description, setDesc] = useState('');
    const [status, setStatus] = useState('');
    const [isOpenStatus, setisOpenStatus] = useState(false);
    const [isOpenEmpty, setisOpenEmpty] = useState(false);
    const [sts, setSts] = useState(undefined);
    const created_by = localStorage.getItem("NAMA")


    const postData = (e) => {
        e.preventDefault();

        if (description.trim().length === 0 || status.trim().length === 0) {
            setisOpenEmpty(true);
        }
        else {
            postTipeTransaksi(description, status, created_by, setSts)
            setisOpenStatus(true)
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
            <div style={{ marginBottom : "50px" }}>
                <Header category="Admin Keuangan  / Tipe Transaksi / Tambah Tipe Transaksi" title="Tambah Tipe Transaksi" />
            </div>
            <div style={{ marginLeft : "60px" }}>
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
                    <ModalStatusTambah
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
        </div>
    )
}