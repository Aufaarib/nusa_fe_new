import React from 'react'
import TextInput from '../../components/TextInput'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from '../../api/axios';
import Modal from 'react-modal';

export default function UbahTipeBank() {
    const [nama_bank, setNamaBank] = useState('');
    const [nomor_rekening, setNomorRekening] = useState('');
    const [nama_pemilik, setNamaPemilik] = useState('');
    const [isOpenSuccess, setisOpenSuccess] = useState(false);
    const [status, setStatus] = useState(undefined);
    const location = useLocation();

    const postData = (e) => {
        e.preventDefault();

        if (nama_bank.trim().length === 0 || nomor_rekening.trim().length === 0 || nama_pemilik.trim().length === 0) {
            console.log('values cannot be empty');
        }
        else {
            axios.put(`https://63e1c25ff59c591411a61021.mockapi.io/nusa-list-bank/${location.state.id}`, {
                nama_bank,
                nomor_rekening,
                nama_pemilik
            })
            .then(() => {
                setStatus({ type: 'success' });
            })
            .catch((error) => {
                setStatus({ type: 'error', error });
            });

        openModalSuccess();
        }
    }

    const openModalSuccess = () => {
        setisOpenSuccess(true);
        setStatus('');
    }
    
    const closeModalSuccess = () => {
        setisOpenSuccess(false);
    }

    const customStyles = {
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
      // 👇️ navigate to /contacts
      navigate('/admin/list-bank');
    };

    return (
        <div>
            <p className="text-3xl mb-16 mt-5 font-bold">Form Ubah Tipe Transaksi</p>

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
                        <p className='mt-3'>Data Sebelumnya :</p>
                        <p className='text-merah font-bold'>{location.state.nama_bank}</p>
                        <br />
                        <TextInput
                            label="Nomor Rekening"
                            type="number"
                            id="code"
                            onChange={(e) => setNomorRekening(e.target.value)}
                            required={true}
                        />
                        <p className='mt-3'>Data Sebelumnya :</p>
                        <p className='text-merah font-bold'>{location.state.nomor_rekening}</p>
                        <br />
                        <TextInput
                            label="Nama Pemilik"
                            type="text"
                            id="group"
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
                    isOpen={isOpenSuccess}
                    onRequestClose={closeModalSuccess}
                    style={customStyles}
                    contentLabel="Modal Ubah"
                    >
                    {status?.type === 'success' && <h2>Success</h2>}
                    {status?.type !== 'success' && <h2>Mengubah Data..</h2>}
                    {status?.type === 'error' && <h2>Failed</h2>}

                </Modal>

            </article>


        </div>
    )
}