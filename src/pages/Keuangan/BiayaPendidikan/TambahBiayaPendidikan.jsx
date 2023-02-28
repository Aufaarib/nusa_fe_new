import React from 'react'
import {TextInput, TextArea} from '../../../components/TextInput'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from '../../../api/axios';
import Modal from 'react-modal';
import {DropdownCostCenter, DropdownJenisTransaksi, DropdownSiswa} from '../../../components/Dropdown';
import { CustomStylesStatus } from "../../../components/CustomStyles";
import { FileUpload } from '../../../components/FileUpload';

export default function TambahBiayaPendidikan() {

const [code, setCode] = useState('');
const [group, setGroup] = useState('');
const [sub_group, setSubGroup] = useState('');
const [item, setItem] = useState('');
const [debitKredit, setDebitKredit] = useState('');

const [data, setData] = useState([]);
const [costCenter, setCostCenter] = useState('');
const [siswa, setSiswa] = useState('');
const [jenisTransaksi, setJenisTransaksi] = useState('');
const [bank, setBank] = useState('');
const [jumlah, setJumlah] = useState('');
const [catatan, setCatatan] = useState('');
const [file_name, setFileName] = useState('');
const [isOpenStatus, setisOpenStatus] = useState(false);
const [isOpenEmpty, setisOpenEmpty] = useState(false);
const [status, setStatus] = useState(undefined);

// console.log(code);
// console.log(group);
// console.log(sub_group);
// console.log(item);
// console.log(debitKredit);


useEffect(() => {
    axios
        .get("https://63e1c25ff59c591411a61021.mockapi.io/nusa-list-cost-center")
        .then((res) => {
        setData(res.data);
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
        axios.post('https://63f2e9beaab7d091250fb6d3.mockapi.io/nusa-biaya-pendidikan',{
            cost_center,
            siswa,
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
        if (costCenter.length === 0 || siswa.length === 0 || jenisTransaksi.length === 0|| bank.length === 0 || jumlah.length === 0 || file_name.length === 0) {
            setisOpenEmpty(true);
        }
        else {
            post()
        }
    }else if (jenisTransaksi.value === 'Cash') {
        if (costCenter.length === 0 || siswa.length === 0 || jenisTransaksi.length === 0|| jumlah.length === 0 || file_name.length === 0) {
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

    const debit_kredit = debitKredit.value

    if (code.length === 0 || group.length === 0 || sub_group.length === 0
    || item.length === 0 || debitKredit.length === 0) {

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

const navigateBiayaPendidikan = () => {
    navigate('/admin/list-biaya-pendidikan');
};

const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const removeNonNumeric = num => num.toString().replace(/[^0-9]/g, "");

const handleChange = event =>
    setJumlah(addCommas(removeNonNumeric(event.target.value)));

const options = data.map((c) => (
    {value: c.code, label: c.item}
    ));

return (  
    <div>
        <p className="text-white-700 text-3xl mb-16 mt-5 font-bold">Form Tambah Biaya Pendidikan</p>
        
        <article>
            <DropdownCostCenter
                setCode={(e) => setCode(e.target.value)}
                setGroup={(e) => setGroup(e.target.value)}
                setSubGroup={(e) => setSubGroup(e.target.value)}
                setItem={(e) => setItem(e.target.value)}
                setDebitKredit={setDebitKredit}
                defaultValueDK={debitKredit}
                post={postDataCostCenter}
                label="Cost Center"
                required={true}
                defaultValue={costCenter}
                isClearable={true}
                options={options}
                onChange={setCostCenter}
            />
            <TextInput
                label="Siswa"
                required={true}
                type="text"
                onChange={(e) => setSiswa(e.target.value)}
            />
            <DropdownJenisTransaksi
                label="Jenis Transaksi"
                required={true}
                defaultValue={jenisTransaksi}
                isClearable={false}
                isSearchable={false}
                onChange={setJenisTransaksi}
            />
            {jenisTransaksi.value === 'Transfer' && 
                <TextInput
                label="Bank"
                type="text"
                required={true}
                onChange={(e) => setBank(e.target.value)}
                />
            }
            <TextInput
                label="Jumlah"
                required={true}
                onInput={handleChange}
                value={jumlah}
            />
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
                onClick={navigateBiayaPendidikan}>
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