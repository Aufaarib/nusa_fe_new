import React from 'react'
import TextInput from '../../../components/TextInput'
import { useNavigate } from 'react-router-dom';
import { useState} from 'react';
import axios from '../../../api/axios';
import Modal from 'react-modal';
import { DropdownDebitKredit } from '../../../components/Dropdown';
import { CustomStylesStatus } from "../../../components/CustomStyles";

export default function TambahCostCenter() {

const [code, setCode] = useState('');
const [group, setGroup] = useState('');
const [sub_group, setSubGroup] = useState('');
const [item, setItem] = useState('');
const [debitKredit, setDebitKredit] = useState('');

const [isOpenStatus, setisOpenStatus] = useState(false);
const [isOpenEmpty, setisOpenEmpty] = useState(false);
const [status, setStatus] = useState(undefined);

const postData = (e) => {
    e.preventDefault();

    const debit_kredit = debitKredit.value

    if (code.length === 0 || group.length === 0 || sub_group.length === 0
    || item.length === 0 || debit_kredit.length === 0) {

        setisOpenEmpty(true);
    }
    else {
        axios.post('https://63e1c25ff59c591411a61021.mockapi.io/nusa-list-cost-center',{
        code,
        group,
        sub_group,
        item,
        debit_kredit
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
    navigate('/admin/list-cost-center');
};

return (    
    <div>
        <p className="text-white-700 text-3xl mb-16 mt-5 font-bold">Form Tambah Cost Center</p>

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
            label="Group"
            type="text"
            id="group"
            onChange={(e) => setGroup(e.target.value)}
            required={true}
        />
        <TextInput
            label="Sub Group"
            type="text"
            id="group"
            onChange={(e) => setSubGroup(e.target.value)}
            required={true}
        />
        <TextInput
            label="Item"
            type="text"
            id="group"
            onChange={(e) => setItem(e.target.value)}
            required={true}
        />
        <DropdownDebitKredit
            label="Debit/Kredit"
            required={true}
            isClearable={true}
            defaultValue={debitKredit}
            isSearchable={false}
            onChange={setDebitKredit}
        />

        <div className='btn-form'>
            <button type="button" className="w-20 btn-hijau flex justify-center mb-5" onClick={postData}>
                Simpan
            </button>
            <button type="button" className="w-20 btn-merah flex justify-center mb-5"
            onClick={navigateListBank}>
                Batal
            </button>
        </div>

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