import React from 'react'
import TextInput from '../../../components/TextInput'
import { postKelas } from '../../../api/Kelas';
import { useNavigate } from 'react-router-dom';
import { useState} from 'react';
import { ModalEmpty, ModalStatusTambah } from '../../../components/ModalPopUp';
import { Header } from '../../../components';

export default function TambahKelas() {

const [name, setName] = useState('');
const [description, setDescription] = useState('');

const [isOpenStatus, setisOpenStatus] = useState(false);
const [isOpenEmpty, setisOpenEmpty] = useState(false);
const [status, setStatus] = useState(undefined);
const created_by = localStorage.getItem("NAMA")

const postData = (e) => {
    e.preventDefault();

    if (name.length === 0 || description.length === 0) {

        setisOpenEmpty(true);
    }
    else {
        postKelas(setStatus, name, description, created_by)
        setisOpenStatus(true)
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
            <Header category="Admin KBM / Kelas / Tambah Kelas" title="Tambah Kelas" />
        </div>
        <div style={{ marginLeft : "60px" }}>
        <p className="text-white-700 text-3xl mb-16 mt-5 font-bold">Form Tambah Kelas</p>
            <article>
                <TextInput
                    label="Nama"
                    type="text"
                    name="code"
                    onChange={(e) => setName(e.target.value)}
                    required={true}
                />
                <TextInput
                    label="Deskripsi"
                    type="text"
                    name="code"
                    onChange={(e) => setDescription(e.target.value)}
                    required={true}
                />

                <div className='btn-form'>
                    <button type="button" className="w-20 btn-hijau flex justify-center mb-5" onClick={postData}>
                        Tambah
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