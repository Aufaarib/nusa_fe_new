import React from 'react'
import TextInput from '../../../components/TextInput'
import { postCostCenter } from '../../../api/CostCenter';
import { useNavigate } from 'react-router-dom';
import { useState} from 'react';
import { ModalEmpty, ModalStatusTambah } from '../../../components/ModalPopUp';
import { Header } from '../../../components';

export default function TambahKurikulum() {

const [code, setCode] = useState('');
const [group, setGroup] = useState('');
const [sub_group, setSubGroup] = useState('');
const [item, setItem] = useState('');
const [debitKredit, setDebitKredit] = useState('');

const [isOpenStatus, setisOpenStatus] = useState(false);
const [isOpenEmpty, setisOpenEmpty] = useState(false);
const [status, setStatus] = useState(undefined);
const created_by = localStorage.getItem("NAMA")

const postData = (e) => {
    e.preventDefault();

    const payment_type = debitKredit.value

    if (code.length === 0 || group.length === 0 || sub_group.length === 0
    || item.length === 0 || payment_type === "") {

        setisOpenEmpty(true);
    }
    else {
       postCostCenter(setStatus, code, group, sub_group, item, payment_type, created_by)
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

const navigateSemester = () => {
    navigate('/admin/list-kurikulum');
};

return (    
    <div>
        <div style={{ marginBottom : "50px" }}>
            <Header category="Admin KBM / Kurikulum / Tambah Kurikulum" title="Tambah Kurikulum" />
        </div>
        <div style={{ marginLeft : "60px" }}>
        <p className="text-white-700 text-3xl mb-16 mt-5 font-bold">Form Tambah Kurikulum</p>
            <article>
                <TextInput
                    label="Code"
                    type="number"
                    id="group"
                    name="code"
                    onChange={(e) => setCode(e.target.value)}
                    required={true}
                />
                <TextInput
                    label="Nama"
                    type="number"
                    id="group"
                    name="code"
                    onChange={(e) => setCode(e.target.value)}
                    required={true}
                />
                <TextInput
                    label="Deskripsi"
                    type="number"
                    id="group"
                    name="code"
                    onChange={(e) => setCode(e.target.value)}
                    required={true}
                />

                <div className='btn-form'>
                    <button type="button" className="w-20 btn-hijau flex justify-center mb-5" onClick={postData}>
                        Tambah
                    </button>
                    <button type="button" className="w-20 btn-merah flex justify-center mb-5"
                    onClick={navigateSemester}>
                        Batal
                    </button>
                </div>
                <ModalStatusTambah 
                    isOpenStatus={isOpenStatus}
                    closeModalStatus={closeModalStatus}
                    status={status}
                    navigate={navigateSemester}
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