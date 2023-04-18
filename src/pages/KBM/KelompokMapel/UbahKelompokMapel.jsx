import React from 'react'
import TextInput from '../../../components/TextInput';
import { updateKelompokMapel } from '../../../api/KelompokMataPelajaran';
import { ModalEmpty, ModalStatusTambah } from '../../../components/ModalPopUp';
import { useLocation, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { Header } from '../../../components';


export default function UbahKelompokMapel() {

const [name, setName] = useState('');
const [isOpenStatus, setisOpenStatus] = useState(false);
const [isOpenEmpty, setisOpenEmpty] = useState(false);
const [status, setStatus] = useState(undefined);
const location = useLocation();

const postData = (e) => {
    e.preventDefault();
    const id = location.state.id

    if (name.trim().length === 0) {
        setisOpenEmpty(true);
    }
    else {
        updateKelompokMapel(setStatus, name, status, id)
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

const navigateKelompokMapel = () => {
    navigate('/admin/list-kelompok-mapel');
};

return (
    <div>
        <div style={{ marginBottom : "50px" }}>
            <Header category="Admin KBM / Kelompok Mapel / Ubah Kelompok Mata Pelajaran" title="Ubah Kelompok Mata Pelajaran" />
        </div>
        <div style={{ marginLeft : "60px" }}>
            <p className="text-3xl mb-16 mt-5 font-bold">Form Ubah Kelompok Mata Pelajaran</p>
            <article>
                {/* COL 1 */}
                <section>
                    <TextInput
                        label="Kelompok"
                        type="text"
                        placeholder={location.state.name}
                        onChange={(e) => setName(e.target.value)}
                        required={true}
                    />
                </section>

                <div className='btn-form'>
                    <button type="button" className="w-20 btn-hijau flex justify-center mb-5" onClick={postData}>
                        Ubah
                    </button>
                    <button type="button" className="w-20 btn-merah flex justify-center mb-5"
                    onClick={navigateKelompokMapel}>
                        Batal
                    </button>
                </div>

                <ModalStatusTambah
                    isOpenStatus={isOpenStatus}
                    closeModalStatus={closeModalStatus}
                    status={status}
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