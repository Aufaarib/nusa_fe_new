import React from 'react'
import {TextInput, TextArea} from '../../../components/TextInput'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from '../../../api/axios';
import { ModalEmpty, ModalStatus, ModalCostCenter, ModalStatusCostCenter } from '../../../components/ModalPopUp';
import {DropdownCostCenter, DropdownJenisTransaksi, DropdownPendaftaran, DropdownBank} from '../../../components/Dropdown';
import { FileUpload } from '../../../components/FileUpload';

export default function TambahBiayaPendidikan() {

const [code, setCode] = useState('');
const [group, setGroup] = useState('');
const [sub_group, setSubGroup] = useState('');
const [item, setItem] = useState('');
const [debitKredit, setDebitKredit] = useState('');

const [costCenterData, setCostCenterData] = useState([]);
const [bankData, setBankData] = useState([]);
const [transactionTypeData, setTransactionTypeData] = useState([]);
const [transactionTypeFilter, setTransactionTypeFilter] = useState([]);
const [pendaftaranData, setPendaftaranData] = useState([]);


const [costCenter, setCostCenter] = useState('');
const [pendaftaran, setPendaftaran] = useState(null);
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

const fetchCostCenter = async () => {
    try {
      const fetchData = await axios.get(
        "https://nusa.nuncorp.id/golang/api/v1/cost-center/fetch"
      );
      const data = fetchData.data.data.filter(
        (e) => e.group === "Biaya Pendidikan"
      );
      setCostCenterData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBank = async () => {
    try {
      const fetchData = await axios.get(
        "https://nusa.nuncorp.id/golang/api/v1/bank/fetch"
      );
      setBankData(fetchData.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTransactionType = async () => {
    try {
      const fetchData = await axios.get(
        "https://nusa.nuncorp.id/golang/api/v1/transaction-type/fetch"
      );
      const data = fetchData.data.data.filter((e) => e.status === "Aktif");
      setTransactionTypeData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPendaftaran = async () => {
    try {
      const fetchData = await axios.get(
        "https://nusa.nuncorp.id/golang/api/v1/pendaftaran/fetch"
      );
      const data = fetchData.data.data.filter(
        (e) => e.nama_lengkap_anak !== ""
      );
      setPendaftaranData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCostCenter();
    fetchBank();
    fetchTransactionType();
    fetchPendaftaran();
  }, []);

  const now = Date.now();
  const date = new Date(now);
  const isoStringWithMs = date.toISOString();

const postData = (e) => {
    e.preventDefault();

    const postDataCash = {
        cost_center_id: costCenter,
        transaction_type_id: jenisTransaksi,
        total_fee: parseInt(jumlah.replace(".", "")),
        pendaftaran_id: pendaftaran,
        note: catatan,
        transaction_date: isoStringWithMs,
    };

    const postDataTransfer = {
        cost_center_id: costCenter,
        bank_id: bank,
        transaction_type_id: jenisTransaksi,
        total_fee: parseInt(jumlah.replace(".", "")),
        pendaftaran_id: pendaftaran,
        note: catatan,
        transaction_date: isoStringWithMs,
    };

    const postTransfer = () => {
        axios
        .post('https://nusa.nuncorp.id/golang/api/v1/transaction/create',
            postDataTransfer
        )
        .then((response) => {
            setStatus({ type: 'success' });
            setisOpenStatus(true);
            console.log(response.data);
        })
        .catch((error) => {
            setStatus({ type: 'error', error });
            console.log(error);
        });
    }

    const postCash = () => {
        axios
        .post('https://nusa.nuncorp.id/golang/api/v1/transaction/create',
            postDataCash
        )
        .then((response) => {
            setStatus({ type: 'success' });
            setisOpenStatus(true);
            console.log(response.data);
        })
        .catch((error) => {
            setStatus({ type: 'error', error });
            console.log(error);
        });
    }

    if (transactionTypeFilter === 'Transfer') {
        if (costCenter.length === 0 || bank.length === 0|| jenisTransaksi.length === 0 || jumlah.length === 0 || file_name.length === 0 || pendaftaran.length === 0) {
            setisOpenEmpty(true);
        }
        else {
            postTransfer()
        }
    }else if (transactionTypeFilter === 'Cash') {
        if (costCenter.length === 0 || jenisTransaksi.length === 0|| jumlah.length === 0 || file_name.length === 0 || pendaftaran.length === 0) {
            setisOpenEmpty(true);
        }
        else {
            postCash()
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

const onTransactionTypeChange = (e) => {
    setJenisTransaksi(e.value);
    setTransactionTypeFilter(e.description);
  };

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

const navigateBiayaPendidikan = () => {
    navigate('/admin/list-biaya-pendidikan');
};

const navigateCostCenter = () => {
    navigate('/admin/list-cost-center');
};

const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const removeNonNumeric = num => num.toString().replace(/[^0-9]/g, "");

const handleChange = event => {
    setJumlah(addCommas(removeNonNumeric(event.target.value)));
}

  // options
const costCenterOptions = costCenterData.map((c) => ({
    label: c.group + " - " + c.item,
    value: c.id,
}));

const bankOptions = bankData.map((c) => ({
    label: `${c.nama_bank} : ${c.nama_pemilik} - ${c.nomor_rekening}`,
    value: c.id,
}));

const transactionTypeOptions = transactionTypeData.map((c) => ({
    label: `${c.description} - ${c.status} `,
    value: c.id,
    description: c.description,
}));

const pendaftaranOptions = pendaftaranData.map((c) => ({
    label: `${c.nama_lengkap_anak} - ${c.jenis_kelamin} `,
    value: c.id,
}));

return (  
    <div>
        <p className="text-white-700 text-3xl mb-16 mt-5 font-bold">Form Tambah Biaya Pendidikan</p>
        
        <article>

            <ModalCostCenter
                isOpenCostCenter={isOpenCostCenter}
                closeModalCostCenter={closeModalCostCenter}
                setCode={(e) => setCode(e.target.value)}
                setGroup={(e) => setGroup(e.target.value)}
                setSubGroup={(e) => setSubGroup(e.target.value)}
                setItem={(e) => setItem(e.target.value)}
                setDebitKredit={setDebitKredit}
                defaultValueDK={debitKredit}
                post={postDataCostCenter}
            />

            <DropdownCostCenter
                label="Cost Center"
                required={true}
                defaultValue={costCenter}
                isClearable={true}
                options={costCenterOptions}
                onChange={(e) => setCostCenter(e.value)}
                handleOnClick={() => setisOpenCostCenter(true)}
            />
            <DropdownPendaftaran
                label="Siswa"
                required={true}
                defaultValue={costCenter}
                isClearable={true}
                options={pendaftaranOptions}
                onChange={(e) => setPendaftaran(e.value)}
            />
            <DropdownJenisTransaksi
                label="Jenis Transaksi"
                required={true}
                defaultValue={jenisTransaksi}
                isClearable={false}
                options={transactionTypeOptions}
                isSearchable={false}
                onChange={onTransactionTypeChange}
            />
            {transactionTypeFilter === "Transfer" && 
                <DropdownBank
                    label="Bank"
                    required={true}
                    defaultValue={bank}
                    isClearable={false}
                    options={bankOptions}
                    isSearchable={false}
                    onChange={(e) => setBank(e.value)}
                />
            }
            <TextInput
                label="Jumlah"
                type="text"
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

            <ModalStatusCostCenter
                isOpenStatus={isOpenStatusCostCenter}
                closeModalStatus={() => closeModalStatusCostCenter()}
                status={status}
                navigate={navigateCostCenter}
            />

            <ModalStatus 
                isOpenStatus={isOpenStatus}
                closeModalStatus={closeModalStatus}
                status={status}
                navigate={navigateBiayaPendidikan}
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