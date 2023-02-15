import React from 'react'
import TextInput from '../../components/TextInput'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from '../../api/axios';
import Modal from 'react-modal';

export default function TambahTipeBank() {

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
            axios.post('https://63e1c25ff59c591411a61021.mockapi.io/nusa-list-bank',{
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

    const customStylesStatus = {
        content: {
          width: '15%',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          border: 'none',
          cursor: 'auto',
          padding: '30px'
        },
        overlay: {
          backgroundColor: 'rgba(0,0,0,.5)',
          cursor: 'pointer'
        }
      };

    const navigate = useNavigate();

    const navigateListBank = () => {
      navigate('/admin/list-bank');
    };

    return (
        <div>
            <p className="text-white-700 text-3xl mb-16 mt-5 font-bold">Form Tambah Tipe Transaksi</p>

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
                            id="code"
                            onChange={(e) => setNamaBank(e.target.value)}
                            required={true}
                        />
                        <br />
                        <TextInput
                            label="Nomor Rekening"
                            type="number"
                            id="code"
                            onChange={(e) => setNomorRekening(e.target.value)}
                            required={true}
                        />
                        <br />
                        <TextInput
                            label="Nama Pemilik"
                            type="text"
                            id="group"
                            onChange={(e) => setNamaPemilik(e.target.value)}
                            required={true}
                        />
                    </section>

                </form>

                <section className='flex mt-12'>
                    <button type="button" className="w-20 btn-hijau flex justify-center mb-5" onClick={postData}>
                        Simpan
                    </button>
                    <button type="button" className="w-20 btn-merah flex justify-center mb-5"
                    onClick={navigateListBank}>
                        Batal
                    </button>
                </section>

                <Modal
                    isOpen={isOpenStatus}
                    onRequestClose={closeModalStatus}
                    style={customStylesStatus}
                    contentLabel="Modal Status"
                    >
                    {status?.type === 'success' && 
                    <div>
                        <h2 className="ml-8">Berhasil</h2>
                        <button className="btn-action-pink w-20 mt-5 ml-10" onClick={closeModalStatus}>Tutup</button>
                    </div>
                    }
                    {status?.type === 'error' && 
                    <div>
                        <h2 className="ml-8">Gagal</h2>
                        <button className="btn-action-pink w-20 mt-5 ml-10" onClick={closeModalStatus}>Tutup</button>
                    </div>
                    } 
                </Modal>

                <Modal
                    isOpen={isOpenEmpty}
                    onRequestClose={closeModalEmpty}
                    style={customStylesStatus}
                    contentLabel="Modal Status"
                    >
                    <div>
                        <h2 className="ml-8 w-2">Data Tidak Lengkap</h2>
                        <button className="btn-action-pink w-20 mt-5 ml-10" onClick={closeModalEmpty}>Tutup</button>
                    </div>
                </Modal>

            </article>


        </div>
    )
}