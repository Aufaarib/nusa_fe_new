import React from 'react'
import TextInput from '../../../components/TextInput';
import { updateSemester } from '../../../api/Semester';
import { ModalEmpty, ModalStatusTambah } from '../../../components/ModalPopUp';
import { useLocation, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { Header } from '../../../components';


export default function UbahSemester() {

const [name, setName] = useState('');
const [description, setDescription] = useState('');
const [status, setStatus] = useState('');
const [isOpenStatus, setisOpenStatus] = useState(false);
const [isOpenEmpty, setisOpenEmpty] = useState(false);
const [sts, setSts] = useState(undefined);
const location = useLocation();

const postData = (e) => {
    e.preventDefault();
    const id = location.state.id

    if (name.trim().length === 0 || description.trim().length === 0 ) {
        setisOpenEmpty(true);
    }
    else {
        updateSemester(setSts, name, description, status, id)
        setisOpenStatus(true);
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
    navigate('/admin/list-semester');
};

return (
    <div>
        <div style={{ marginBottom : "50px" }}>
            <Header category="Admin KBM / Semester / Ubah Semester" title="Ubah Semester" />
        </div>
        <div style={{ marginLeft : "60px" }}>
            <p className="text-3xl mb-16 mt-5 font-bold">Form Ubah Semester</p>
            <article>
                {/* COL 1 */}
                <section>
                    <TextInput
                        label="Nama"
                        type="text"
                        placeholder={location.state.name}
                        onChange={(e) => setName(e.target.value)}
                        required={true}
                    />
                    <TextInput
                        label="Deskripsi"
                        type="text"
                        placeholder={location.state.description}
                        onChange={(e) => setDescription(e.target.value)}
                        required={true}
                    />
                </section>

                <div className='btn-form'>
                    <button type="button" className="w-20 btn-hijau flex justify-center mb-5" onClick={postData}>
                        Ubah
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