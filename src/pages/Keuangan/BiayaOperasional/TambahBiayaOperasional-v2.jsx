import React from 'react'
import {TextInput, TextArea} from '../../../components/TextInput'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from '../../../api/axios';
import { ModalEmpty, ModalStatus, ModalCostCenter, ModalStatusCostCenter } from '../../../components/ModalPopUp';
import {DropdownCostCenter, DropdownJenisTransaksi} from '../../../components/Dropdown';
import { FileUpload } from '../../../components/FileUpload';

export default function TambahBiayaOperasional() {

const [code, setCode] = useState('');
const [group, setGroup] = useState('');
const [sub_group, setSubGroup] = useState('');
const [item, setItem] = useState('');
const [debitKredit, setDebitKredit] = useState('');

const [data, setData] = useState([]);
const [costCenter, setCostCenter] = useState('');
const [jenisTransaksi, setJenisTransaksi] = useState('');
const [bank, setBank] = useState('');
const [jumlah, setJumlah] = useState('');
const [catatan, setCatatan] = useState('');
const [file_name, setFileName] = useState('');
const [isOpenCostCenter, setisOpenCostCenter] = useState(false);
const [isOpenStatusCostCenter, setisOpenStatusCostCenter] = useState(false);
const [isOpenStatus, setisOpenStatus] = useState(false);
const [isOpenEmpty, setisOpenEmpty] = useState(false);
const [status, setStatus] = useState(undefined);

useEffect(() => {
    axios
        .get("https://nusa.nuncorp.id/golang/api/v1/cost-center/fetch")
        .then((res) => {
        setData(res.data.data);
        setStatus({ type: 'success' });
        })
        .catch((error) => {
        setStatus({ type: 'error', error });
        });
    }, []);


const postData = (e) => {
    e.preventDefault();

    const cost_center = costCenter.value;
    const jenis_transaksi = jenisTransaksi.value;

    const post = () => {
        axios.post('https://63f2e9beaab7d091250fb6d3.mockapi.io/nusa-biaya-operasional',{
            cost_center,
            jenis_transaksi,
            bank,
            jumlah,
            catatan
        })
        .then(() => {
            setStatus({ type: 'success' });
            setisOpenStatus(true);
        })
        .catch((error) => {
            setStatus({ type: 'error', error });
        });
    }
    if (jenisTransaksi.value === 'Transfer') {
        if (costCenter.length === 0 || jenisTransaksi.length === 0|| bank.length === 0 || jumlah.length === 0 || file_name.length === 0) {
            setisOpenEmpty(true);
        }
        else {
            post()
        }
    }else if (jenisTransaksi.value === 'Cash') {
        if (costCenter.length === 0 || jenisTransaksi.length === 0|| jumlah.length === 0 || file_name.length === 0) {
            setisOpenEmpty(true);
        }
        else {
            post()
        }
    }else {
        setisOpenEmpty(true);
    }
}

const postDataCostCenter = (e) => {
    e.preventDefault();

    const payment_type = debitKredit.value

    if (code.length === 0 || group.length === 0 || sub_group.length === 0
    || item.length === 0 || debitKredit.length === 0) {

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
        setisOpenStatusCostCenter(true);
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
}
const closeModalCostCenter = () => {
    setisOpenCostCenter(false);
}
const closeModalStatusCostCenter = () => {
    setisOpenCostCenter(false);
    setisOpenStatusCostCenter(false)
}
const navigate = useNavigate();

const navigateBiayaOperasional = () => {
    navigate('/admin/list-biaya-operasional');
};

const navigateCostCenter = () => {
    navigate('/admin/list-cost-center');
};

const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const removeNonNumeric = num => num.toString().replace(/[^0-9]/g, "");

const handleChange = event =>
    setJumlah(addCommas(removeNonNumeric(event.target.value)));

const options = data.map((c) => (
    {label: c.item, value: c.code}
    ));

return (    
    <div>
        <p className="text-white-700 text-3xl mb-16 mt-5 font-bold">Form Tambah Biaya Operasional</p>

        <article>

            <TextInput
                label="Jenis Biaya"
                required={true}
                type="text"
                onChange={(e) => setBank(e.target.value)}
            />
            <br/>
            <TextInput
                label="Tanggal Transaksi"
                required={true}
                type="text"
                onChange={(e) => setBank(e.target.value)}
            />
            <br/>
            <DropdownJenisTransaksi
                label="Jenis Transaksi"
                required={true}
                defaultValue={jenisTransaksi}
                isClearable={false}
                isSearchable={false}
                onChange={setJenisTransaksi}
            />
            <br/>
            {jenisTransaksi.value === 'Transfer' && 
                <TextInput
                label="Bank"
                type="text"
                required={true}
                onChange={(e) => setBank(e.target.value)}
                />
            }
            {jenisTransaksi.value === 'Transfer' && 
                <br/>
            }
            <TextInput
                label="Jumlah"
                required={true}
                onInput={handleChange}
                value={jumlah}
            />
            <br/>
            <TextArea
                label="Catatan"
                type="text"
                onChange={(e) => setCatatan(e.target.value)}
                required={false}
            />
            <FileUpload 
                required={true}
                onChange={(e) => setFileName(e.target.value)}
                label="Tarik File Kesini"
                type="file"
            />

            <div className='btn-form'>
                <button type="button" className="w-20 btn-hijau flex justify-center mb-5" onClick={postData}>
                    Simpan
                </button>
                <button type="button" className="w-20 btn-merah flex justify-center mb-5"
                onClick={navigateBiayaOperasional}>
                    Batal
                </button>
            </div>

            <ModalStatus 
                isOpenStatus={isOpenStatus}
                closeModalStatus={closeModalStatus}
                status={status}
                navigate={navigateBiayaOperasional}
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