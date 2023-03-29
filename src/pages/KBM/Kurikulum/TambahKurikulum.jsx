import React from 'react'
import TextInput from '../../../components/TextInput'
import { DropdownStatus } from '../../../components/Dropdown';
import { postKurikulum } from '../../../api/Kurikulum';
import { useNavigate } from 'react-router-dom';
import { useState} from 'react';
import { ModalEmpty, ModalStatusTambah } from '../../../components/ModalPopUp';
import { Header } from '../../../components';

export default function TambahKurikulum() {

const [code, setCode] = useState('');
const [name, setName] = useState('');
const [description, setDescription] = useState('');
const [semester, setSemester] = useState('');
const [statusVal, setStatus] = useState('');

const [isOpenStatus, setisOpenStatus] = useState(false);
const [isOpenEmpty, setisOpenEmpty] = useState(false);
const [sts, setSts] = useState(undefined);
const created_by = localStorage.getItem("NAMA")

const postData = (e) => {
    e.preventDefault();

    const semester_id = parseInt(semester)
    const status = statusVal.value


    if (code.length === 0 || name.length === 0 || description.length === 0
    || semester_id.length === 0 ) {

        setisOpenEmpty(true);
    }
    else {
        postKurikulum(setSts, code, name, status, description, semester_id, created_by)
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
                    type="text"
                    id="group"
                    name="code"
                    onChange={(e) => setName(e.target.value)}
                    required={true}
                />
                <TextInput
                    label="Deskripsi"
                    type="text"
                    id="group"
                    name="code"
                    onChange={(e) => setDescription(e.target.value)}
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
                <TextInput
                    label="Semester"
                    type="number"
                    id="group"
                    name="code"
                    onChange={(e) => setSemester(e.target.value)}
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
                    status={sts}
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