import React from 'react'
import TextInput from '../../../components/TextInput'
import { useNavigate } from 'react-router-dom';
import { useState} from 'react';
import axios from '../../../api/axios';
import { ModalEmpty, ModalStatus } from '../../../components/ModalPopUp';
import { DropdownDebitKredit } from '../../../components/Dropdown';

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

    const payment_type = debitKredit.value

    if (code.length === 0 || group.length === 0 || sub_group.length === 0
    || item.length === 0 || payment_type === "") {

        setisOpenEmpty(true);
    }
    else {
        axios.post('https://nusa.nuncorp.id/golang/api/v1/cost-center/create',{
        code,
        group,
        sub_group,
        item,
        payment_type
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

const navigateCostCenter = () => {
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
            onClick={navigateCostCenter}>
                Batal
            </button>
        </div>

        <ModalStatus 
            isOpenStatus={isOpenStatus}
            closeModalStatus={closeModalStatus}
            status={status}
            navigate={navigateCostCenter}
        />

        <ModalEmpty
            isOpenEmpty={isOpenEmpty}
            closeModalEmpty={closeModalEmpty}
            onRequestCloseEmpty={closeModalEmpty}
        />
        </article>
    </div>
)
}