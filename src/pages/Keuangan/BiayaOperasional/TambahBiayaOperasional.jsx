import React from "react";
import {
  getCostCenterOperasional,
  postCostCenter,
} from "../../../api/CostCenter";
import { getBank } from "../../../api/Bank";
import { getTipeTransaksi } from "../../../api/TipeTransaksi";
import { TextInput, TextArea } from "../../../components/TextInput";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { postTransfer, postCash } from "../../../api/Transaction";
import {
  ModalEmpty,
  ModalCostCenter,
  ModalStatusCostCenter,
  ModalStatusTambah,
} from "../../../components/ModalPopUp";
import {
  DropdownCostCenter,
  DropdownJenisTransaksi,
  DropdownBank,
} from "../../../components/Dropdown";
import { FileUpload } from "../../../components/FileUpload";
import { Header } from "../../../components";

export default function TambahBiayaOperasional() {
  const [code, setCode] = useState("");
  const [groupVal, setGroup] = useState("");
  const [sub_group, setSubGroup] = useState("");
  const [item, setItem] = useState("");
  const [debitKredit, setDebitKredit] = useState("");

  const [costCenterData, setCostCenterData] = useState([]);
  const [bankData, setBankData] = useState([]);
  const [transactionTypeData, setTransactionTypeData] = useState([]);
  const [transactionTypeFilter, setTransactionTypeFilter] = useState([]);

  const [costCenter, setCostCenter] = useState("");
  const [jenisTransaksi, setJenisTransaksi] = useState("");
  const [bank, setBank] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [catatan, setCatatan] = useState("");
  const [file_name, setFileName] = useState("");
  const [isOpenCostCenter, setisOpenCostCenter] = useState(false);
  const [isOpenStatusCostCenter, setisOpenStatusCostCenter] = useState(false);
  const [isOpenStatus, setisOpenStatus] = useState(false);
  const [isOpenEmpty, setisOpenEmpty] = useState(false);
  const [status, setStatus] = useState(undefined);
  const created_by = localStorage.getItem("NAMA");

  // fetch function
  const fetchCostCenter = async () => {
    getCostCenterOperasional(setCostCenterData, setStatus);
  };

  const fetchBank = async () => {
    getBank(setBankData, setStatus);
  };

  const fetchTransactionType = async () => {
    getTipeTransaksi(setTransactionTypeData, setStatus);
  };

  useEffect(() => {
    fetchCostCenter();
    fetchBank();
    fetchTransactionType();
  }, []);

  const now = Date.now();
  const date = new Date(now);
  const isoStringWithMs = date.toISOString();

  const postData = (e) => {
    e.preventDefault();

    const postDataTransfer = {
      cost_center_id: costCenter,
      bank_id: bank,
      transaction_type_id: jenisTransaksi,
      total_fee: parseInt(jumlah.replace(/\./g, ""), 10),
      pendaftaran_id: 1,
      note: catatan,
      transaction_date: isoStringWithMs,
      created_by: created_by,
    };

    const postDataCash = {
      cost_center_id: costCenter,
      bank_id: null,
      transaction_type_id: jenisTransaksi,
      total_fee: parseInt(jumlah.replace(/\./g, ""), 10),
      pendaftaran_id: null,
      note: catatan,
      transaction_date: isoStringWithMs,
      created_by: created_by,
    };
    if (transactionTypeFilter === "Transfer") {
      if (
        costCenter.length === 0 ||
        bank.length === 0 ||
        jenisTransaksi.length === 0 ||
        jumlah.length === 0 ||
        file_name.length === 0
      ) {
        setisOpenEmpty(true);
      } else {
        postTransfer(postDataTransfer, setStatus);
        setisOpenStatus(true);
      }
    } else if (transactionTypeFilter === "Cash") {
      if (
        costCenter.length === 0 ||
        jenisTransaksi.length === 0 ||
        jumlah.length === 0 ||
        file_name.length === 0
      ) {
        setisOpenEmpty(true);
      } else {
        postCash(postDataCash, setStatus);
        setisOpenStatus(true);
      }
    } else {
      setisOpenEmpty(true);
    }
  };

  const postDataCostCenter = (e) => {
    e.preventDefault();

    const payment_type = debitKredit.value;
    const group = groupVal.value;

    if (
      code.length === 0 ||
      group.length === 0 ||
      sub_group.length === 0 ||
      item.length === 0 ||
      debitKredit.length === 0
    ) {
      setisOpenEmpty(true);
    } else {
      postCostCenter(
        setStatus,
        code,
        group,
        sub_group,
        item,
        payment_type,
        created_by
      );
      setisOpenStatus(true);
    }
  };

  const onTransactionTypeChange = (e) => {
    setJenisTransaksi(e.value);
    setTransactionTypeFilter(e.description);
  };

  const closeModalEmpty = () => {
    setisOpenEmpty(false);
  };
  const closeModalStatus = () => {
    setisOpenStatus(false);
  };
  const closeModalCostCenter = () => {
    setisOpenCostCenter(false);
  };
  const closeModalStatusCostCenter = () => {
    setisOpenCostCenter(false);
    setisOpenStatusCostCenter(false);
  };
  const navigate = useNavigate();

  const navigateBiayaOperasional = () => {
    navigate("/admin/list-biaya-operasional");
  };

  const handleInputChange = (event) => {
    let inputVal = event.target.value;
    inputVal = inputVal.replace(/\D/g, ""); // Remove all non-numeric characters
    inputVal = inputVal.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Add dots every 3 digits
    setJumlah(inputVal);
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
    description: c.description,
  }));

  return (
    <div>
      <div style={{ marginBottom: "50px" }}>
        <Header
          category="Admin Keuangan / Biaya Operasional / Tambah Biaya Operasional"
          title="Tambah Biaya Operasional"
        />
      </div>
      <div style={{ marginLeft: "60px" }}>
        <p className="text-white-700 text-3xl mb-16 mt-5 font-bold">
          Form Tambah Biaya Operasional
        </p>
        <article>
          <ModalCostCenter
            isOpenCostCenter={isOpenCostCenter}
            closeModalCostCenter={closeModalCostCenter}
            setCode={(e) => setCode(e.target.value)}
            setGroup={setGroup}
            setSubGroup={(e) => setSubGroup(e.target.value)}
            setItem={(e) => setItem(e.target.value)}
            setDebitKredit={setDebitKredit}
            defaultValueDK={debitKredit}
            defaultValueGroup={groupVal}
            post={postDataCostCenter}
          />
          <DropdownCostCenter
            label="Cost Center"
            required={true}
            defaultValue={costCenter}
            // isClearable={true}
            options={costCenterOptions}
            onChange={(e) => setCostCenter(e.value)}
            handleOnClick={() => setisOpenCostCenter(true)}
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
          {transactionTypeFilter === "Transfer" && (
            <DropdownBank
              label="Bank"
              required={true}
              defaultValue={bank}
              isClearable={false}
              options={bankOptions}
              isSearchable={false}
              onChange={(e) => setBank(e.value)}
            />
          )}
          <TextInput
            label="Jumlah"
            type="text"
            required={true}
            onInput={handleInputChange}
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

          <div className="btn-form">
            <button
              type="button"
              className="w-20 btn-hijau flex justify-center mb-5"
              onClick={postData}
            >
              Simpan
            </button>
            <button
              type="button"
              className="w-20 btn-merah flex justify-center mb-5"
              onClick={navigateBiayaOperasional}
            >
              Batal
            </button>
          </div>

          {/* <ModalStatusCostCenter
                    isOpenStatus={isOpenStatusCostCenter}
                    closeModalStatus={() => closeModalStatusCostCenter()}
                    status={status}
                    navigate={navigateBiayaOperasional}
                /> */}

          <ModalStatusTambah
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
    </div>
  );
}
