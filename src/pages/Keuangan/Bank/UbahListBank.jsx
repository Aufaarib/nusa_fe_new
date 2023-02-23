import React from 'react'
import TextInput from '../../../components/TextInput'
import { CustomStylesStatus } from "../../../components/CustomStyles";
import { useLocation, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import axios from '../../../api/axios';
import Modal from 'react-modal';

export default function UbahListBank() {

const [nama_bank, setNamaBank] = useState('');
const [nomor_rekening, setNomorRekening] = useState('');
const [nama_pemilik, setNamaPemilik] = useState('');
const [isOpenStatus, setisOpenStatus] = useState(false);
const [isOpenEmpty, setisOpenEmpty] = useState(false);
const [status, setStatus] = useState(undefined);
const location = useLocation();

const postData = (e) => {
    e.preventDefault();

    if (nama_bank.trim().length === 0 || nomor_rekening.trim().length === 0 || nama_pemilik.trim().length === 0) {
        setisOpenEmpty(true);
    }
    else {
        axios.put(`https://63e1c25ff59c591411a61021.mockapi.io/nusa-list-bank/${location.state.id}`, {
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
    // 👇️ navigate to /contacts
    navigate('/admin/list-bank');
};

return (
    <div>
        <p className="text-3xl mb-16 mt-5 font-bold">Form Ubah List Bank</p>

        <article>

            <form
                className='grid mt-3 xs:grid-cols-1 
                md:grid-cols-2 lg:grid-cols-3 gap-7'
                style={{ zIndex: -1 }}>

                {/* COL 1 */}
                <section>
                    <TextInput
                        label="Nama Bank"
                        type="text"
                        onChange={(e) => setNamaBank(e.target.value)}
                        required={true}
                    />
                    <p className='mt-3'>Data Sebelumnya :</p>
                    <p className='text-merah font-bold'>{location.state.nama_bank}</p>
                    <br />
                    <TextInput
                        label="Nomor Rekening"
                        type="number"
                        onChange={(e) => setNomorRekening(e.target.value)}
                        required={true}
                    />
                    <p className='mt-3'>Data Sebelumnya :</p>
                    <p className='text-merah font-bold'>{location.state.nomor_rekening}</p>
                    <br />
                    <TextInput
                        label="Nama Pemilik"
                        type="text"
                        onChange={(e) => setNamaPemilik(e.target.value)}
                        required={true}
                    />
                    <p className='mt-3'>Data Sebelumnya :</p>
                    <p className='text-merah font-bold'>{location.state.nama_pemilik}</p>
                </section>

            </form>

            <section className='flex mt-12'>
                <button type="button" className="w-20 btn-hijau flex justify-center mb-5" onClick={postData}>
                    Ubah
                </button>
                <button type="button" className="w-20 btn-merah flex justify-center mb-5"
                onClick={navigateListBank}>
                    Batal
                </button>
            </section>

            <Modal
                isOpen={isOpenStatus}
                onRequestClose={closeModalStatus}
                style={CustomStylesStatus}
                contentLabel="Modal Status"
                ariaHideApp={false}
                >
                {status?.type === 'success' && 
                <div>
                    <h2>Berhasil</h2>
                    <button className="btn-action-pink w-20 mt-5" onClick={closeModalStatus}>Tutup</button>
                </div>
                }
                {status?.type === 'error' && 
                <div>
                    <h2>Gagal</h2>
                    <button className="btn-action-pink w-20 mt-5" onClick={closeModalStatus}>Tutup</button>
                </div>
                } 
            </Modal>

            <Modal
                isOpen={isOpenEmpty}
                onRequestClose={closeModalEmpty}
                style={CustomStylesStatus}
                contentLabel="Modal Status"
                ariaHideApp={false}
                >
                <div>
                    <h2>Data Tidak Lengkap</h2>
                    <button className="btn-action-pink w-20 mt-5" onClick={closeModalEmpty}>Tutup</button>
                </div>
            </Modal>

        </article>


    </div>
)
}