import React, { useState } from "react";
import { useEffect } from "react";
import axios from "../../../api/axios";
import { DropdownCostCenter } from "../../../components/Dropdown";
import { TextInput, TextArea } from "../../../components/TextInput";
import Select from "react-select";
import moment from "moment/moment";

export default function AddBiayaPendidikan() {
  // fetch variable
  const [costCenterData, setCostCenterData] = useState([]);
  const [bankData, setBankData] = useState([]);
  const [transactionTypeData, setTransactionTypeData] = useState([]);
  const [pendaftaranData, setPendaftaranData] = useState([]);

  // onchange variable
  const [costCenter, setCostCenter] = useState(null);
  const [bank, setBank] = useState(null);
  const [transactionType, setTransactionType] = useState(null);
  const [totalFee, setTotalFee] = useState(null);
  const [note, setNote] = useState(null);
  const [pendaftaran, setPendaftaran] = useState(null);
  const [paymentReceipt, setPaymentReceipt] = useState(null);
  //   const [transactionDate, setTransactionDate] = useState();

  // fetch function
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
  }));

  const pendaftaranOptions = pendaftaranData.map((c) => ({
    label: `${c.nama_lengkap_anak} - ${c.jenis_kelamin} `,
    value: c.id,
  }));

  const now = Date.now();
  const date = new Date(now);
  const isoStringWithMs = date.toISOString();

  const onChangeFee = (e) => {
    const data = parseInt(e.target.value);
    setTotalFee(data);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const postData = {
      cost_center_id: costCenter,
      bank_id: bank,
      transaction_type_id: transactionType,
      total_fee: totalFee,
      pendaftaran_id: pendaftaran,
      note: note,
      transaction_date: isoStringWithMs,
    };

    axios
      .post(
        "https://nusa.nuncorp.id/golang/api/v1/transaction/create",
        postData
      )
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCostCenter();
    fetchBank();
    fetchTransactionType();
    fetchPendaftaran();
  }, []);

  return (
    <>
      <p className="text-white-700 text-3xl mb-16 mt-5 font-bold">
        Form Tambah Biaya Pendidikan
      </p>

      <article>
        <div className="grid-container mb-6">
          <label htmlFor={"costCenter"}>
            Cost Center <span className="ml-1 text-merah">*</span>
          </label>
          <span>:</span>
          <div>
            <Select
              className="ml-20"
              isClearable={true}
              //   defaultValue={defaultValue}
              placeholder="Pilih Salah Satu..."
              options={costCenterOptions}
              onChange={(e) => setCostCenter(e.value)}
              //   value={costCenter}
            />
          </div>
        </div>
        <div className="grid-container mb-6">
          <label htmlFor={"bank"}>
            Bank <span className="ml-1 text-merah">*</span>
          </label>
          <span>:</span>
          <div>
            <Select
              className="ml-20"
              isClearable={true}
              //   defaultValue={defaultValue}
              placeholder="Pilih Salah Satu..."
              options={bankOptions}
              onChange={(e) => setBank(e.value)}
              //   value={bank}
            />
          </div>
        </div>
        <div className="grid-container mb-6">
          <label htmlFor={"tipeTransacksi"}>
            Tipe Transaksi <span className="ml-1 text-merah">*</span>
          </label>
          <span>:</span>
          <div>
            <Select
              className="ml-20"
              isClearable={true}
              //   defaultValue={defaultValue}
              placeholder="Pilih Salah Satu..."
              options={transactionTypeOptions}
              onChange={(e) => setTransactionType(e.value)}
              //   value={transactionType}
            />
          </div>
        </div>
        <div className="grid-container mb-6">
          <label htmlFor={"pendaftaran"}>
            Pendaftaran <span className="ml-1 text-merah">*</span>
          </label>
          <span>:</span>
          <div>
            <Select
              className="ml-20"
              isClearable={true}
              //   defaultValue={defaultValue}
              placeholder="Pilih Salah Satu..."
              options={pendaftaranOptions}
              onChange={(e) => setPendaftaran(e.value)}
              //   value={transactionType}
            />
          </div>
        </div>
        <div className="grid mb-6">
          <TextInput
            label="Jumlah"
            type={"number"}
            required={true}
            onInput={onChangeFee}
            value={totalFee}
          />
        </div>
        {/* <div className="grid mb-6">
           <TextInput
             label="Transaction Date"
             type={"text"}
             required={true}
             onInput={dateChange}
             value={transactionDate}
           />
         </div> */}
        <div className="grid mb-6">
          <TextArea
            label="Catatan"
            type="text"
            onChange={(e) => setNote(e.target.value)}
            value={note}
            //   required={false}
          />
        </div>
        <div className="btn-form">
          <button
            type="button"
            className="w-20 btn-hijau flex justify-center mb-5"
            onClick={onSubmit}
          >
            Simpan
          </button>
          <button
            type="button"
            className="w-20 btn-merah flex justify-center mb-5"
            // onClick={navigateBiayaOperasional}
          >
            Batal
          </button>
        </div>
      </article>
    </>
  );
}
