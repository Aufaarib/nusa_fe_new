import React from 'react'
import TextInput from '../../../components/TextInput'
import { DropdownStatus } from '../../../components/Dropdown';
import { postKelompokMapel } from '../../../api/KelompokMataPelajaran';
import { useNavigate } from 'react-router-dom';
import { useState} from 'react';
import { ModalEmpty, ModalStatusTambah } from '../../../components/ModalPopUp';
import { Header } from '../../../components';

export default function TambahKelompokMapel() {

const [name, setName] = useState('');
const [statusVal, setStatus] = useState('');

const [isOpenStatus, setisOpenStatus] = useState(false);
const [isOpenEmpty, setisOpenEmpty] = useState(false);
const [sts, setSts] = useState(undefined);
const created_by = localStorage.getItem("NAMA")

console.log(created_by)

const postData = (e) => {
    e.preventDefault();

    const status = statusVal.value

    if (name.length === 0 || status.length === 0) {

        setisOpenEmpty(true);
    }
    else {
        postKelompokMapel(setSts, name, status, created_by)
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

const navigateKelompokMapel = () => {
    navigate('/admin/list-kelompok-mapel');
};

return (    
    <div>
        <div style={{ marginBottom : "50px" }}>
            <Header category="Admin KBM / Kelompok Mapel / Tambah Kelompok Mata Pelajaran" title="Tambah Kelompok Mata Pelajaran" />
        </div>
        <div style={{ marginLeft : "60px" }}>
        <p className="text-white-700 text-3xl mb-16 mt-5 font-bold">Form Tambah Kelompok Mata Pelajaran</p>
            <article>
                <TextInput
                    label="Nama"
                    type="text"
                    name="code"
                    onChange={(e) => setName(e.target.value)}
                    required={true}
                />
                <DropdownStatus
                    label="Status"
                    required={true}
                    isClearable={true}
                    defaultValue={statusVal}
                    isSearchable={false}
                    onChange={setStatus}
                />

                <div className='btn-form'>
                    <button type="button" className="w-20 btn-hijau flex justify-center mb-5" onClick={postData}>
                        Tambah
                    </button>
                    <button type="button" className="w-20 btn-merah flex justify-center mb-5"
                    onClick={navigateKelompokMapel}>
                        Batal
                    </button>
                </div>

                <ModalStatusTambah 
                    isOpenStatus={isOpenStatus}
                    closeModalStatus={closeModalStatus}
                    status={sts}
                    navigate={navigateKelompokMapel}
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