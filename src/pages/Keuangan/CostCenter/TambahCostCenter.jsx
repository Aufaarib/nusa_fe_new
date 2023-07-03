import React from "react";
import TextInput from "../../../components/TextInput";
import { postCostCenter } from "../../../api/CostCenter";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AlertEmpty } from "../../../components/ModalPopUp";
import {
  DropdownDebitKredit,
  DropdownGroup,
} from "../../../components/Dropdown";
import { Header } from "../../../components";
import { Typography } from "@mui/material";

export default function TambahCostCenter() {
  const [code, setCode] = useState("");
  const [groupVal, setGroup] = useState("");
  const [sub_group, setSubGroup] = useState("");
  const [item, setItem] = useState("");
  const [debitKredit, setDebitKredit] = useState("");

  //   const [isOpenStatus, setisOpenStatus] = useState(false);
  //   const [isOpenEmpty, setisOpenEmpty] = useState(false);
  const [status, setStatus] = useState(undefined);
  const created_by = localStorage.getItem("NAMA");
  const path = "/admin/list-cost-center";

  const postData = (e) => {
    e.preventDefault();

    const payment_type = debitKredit.value;
    const group = groupVal.value;

    if (
      code.length === 0 ||
      groupVal.length === 0 ||
      sub_group.length === 0 ||
      item.length === 0 ||
      debitKredit.length === 0
    ) {
      AlertEmpty();
    } else {
      postCostCenter(
        setStatus,
        path,
        code,
        group,
        sub_group,
        item,
        payment_type,
        created_by
      );
    }
  };

  //   const closeModalEmpty = () => {
  //     setisOpenEmpty(false);
  //   };

  //   const closeModalStatus = () => {
  //     setisOpenStatus(false);
  //     setStatus("");
  //   };

  const navigate = useNavigate();

  const navigateCostCenter = () => {
    navigate(path);
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <Header
          home="Admin Keuangan"
          prev="Cost Center"
          navePrev={path}
          at="Tambah Cost Center"
          title="Tambah Cost Center"
        />
      </div>
      <div style={{ marginLeft: "60px" }}>
        <article>
          <p
            style={{
              fontSize: "24px",
              marginBottom: "50px",
              marginTop: "50px",
            }}
            className="ml-1 font-bold text-merah"
          >
            Form Tambah Cost Center
          </p>
          <TextInput
            label="Code"
            type="number"
            id="group"
            name="code"
            onChange={(e) => setCode(e.target.value)}
            required={true}
          />
          <DropdownGroup
            label="Group"
            required={true}
            isClearable={true}
            defaultValue={groupVal}
            isSearchable={false}
            onChange={setGroup}
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

          <div className="btn-form">
            <button
              type="button"
              className="w-20 btn-merah flex justify-center mb-5"
              onClick={postData}
            >
              Simpan
            </button>
            <button
              type="button"
              className="w-20 btn-putih flex justify-center mb-5"
              onClick={navigateCostCenter}
            >
              Batal
            </button>
          </div>

          {/* <ModalStatusTambah
                isOpenStatus={isOpenStatus}
                closeModalStatus={closeModalStatus}
                status={status}
                navigate={navigateCostCenter}
            /> */}

          {/* <ModalEmpty
                isOpenEmpty={isOpenEmpty}
                closeModalEmpty={closeModalEmpty}
                onRequestCloseEmpty={closeModalEmpty}
            /> */}
        </article>
      </div>
    </div>
  );
}
