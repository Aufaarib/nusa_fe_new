import React from "react";
import TextInput from "../../../components/TextInput";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { postTipeTransaksi } from "../../../api/TipeTransaksi";
import { ModalEmpty, ModalStatusTambah } from "../../../components/ModalPopUp";
import { Header } from "../../../components";
import {
  DropdownStatus,
  DropdownTipeTransaksi,
} from "../../../components/Dropdown";

export default function TambahTipeTransaksi() {
  const [descriptionVal, setDescVal] = useState("");
  const [statusVal, setStatus] = useState("");
  const [isOpenStatus, setisOpenStatus] = useState(false);
  const [isOpenEmpty, setisOpenEmpty] = useState(false);
  const [sts, setSts] = useState(undefined);
  const created_by = localStorage.getItem("NAMA");

  const postData = (e) => {
    e.preventDefault();

    const status = statusVal.value;
    const description = descriptionVal.value;

    if (descriptionVal.length === 0 || statusVal.length === 0) {
      setisOpenEmpty(true);
    } else {
      postTipeTransaksi(description, status, created_by, setSts);
      setisOpenStatus(true);
    }
  };

  const closeModalEmpty = () => {
    setisOpenEmpty(false);
  };

  const closeModalStatus = () => {
    setisOpenStatus(false);
    setSts("");
  };
  const navigate = useNavigate();

  const navigateListTipeTransaksi = () => {
    navigate("/admin/list-tipe-transaksi");
  };

  return (
    <div>
      <div style={{ marginBottom: "50px" }}>
        <Header
          category="Admin Keuangan  / Tipe Transaksi / Tambah Tipe Transaksi"
          title="Tambah Tipe Transaksi"
        />
      </div>
      <div style={{ marginLeft: "60px" }}>
        <p className="text-white-700 text-3xl mb-16 mt-5 font-bold">
          Form Tambah Tipe Transaksi
        </p>
        <article>
          <DropdownTipeTransaksi
            label="Tipe Transaksi"
            required={true}
            isClearable={true}
            defaultValue={descriptionVal}
            isSearchable={false}
            onChange={setDescVal}
          />
          <DropdownStatus
            label="Status"
            required={true}
            isClearable={true}
            defaultValue={statusVal}
            isSearchable={false}
            onChange={setStatus}
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
              onClick={navigateListTipeTransaksi}
            >
              Batal
            </button>
          </div>
          <ModalStatusTambah
            isOpenStatus={isOpenStatus}
            closeModalStatus={closeModalStatus}
            status={sts}
            navigate={navigateListTipeTransaksi}
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
