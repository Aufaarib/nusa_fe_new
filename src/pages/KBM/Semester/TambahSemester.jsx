import React from "react";
import TextInput from "../../../components/TextInput";
import { DropdownStatus } from "../../../components/Dropdown";
import { postSemester } from "../../../api/Semester";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  AlertEmpty,
  ModalEmpty,
  ModalStatusTambah,
} from "../../../components/ModalPopUp";
import { Header } from "../../../components";

export default function TambahSemester() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [statusVal, setStatus] = useState("");

  const [isOpenStatus, setisOpenStatus] = useState(false);
  const [isOpenEmpty, setisOpenEmpty] = useState(false);
  const [sts, setSts] = useState(undefined);
  const created_by = localStorage.getItem("NAMA");
  const navigate = useNavigate();

  const path = "/admin/list-semester";

  const postData = (e) => {
    e.preventDefault();

    const status = statusVal.value;

    if (name.length === 0 || description.length === 0) {
      AlertEmpty();
    } else {
      postSemester(setSts, path, name, description, status, created_by);
      // setisOpenStatus(true);
    }
  };

  // const closeModalEmpty = () => {
  //   setisOpenEmpty(false);
  // };

  // const closeModalStatus = () => {
  //   setisOpenStatus(false);
  //   setSts("");
  // };

  const navigateSemester = () => {
    navigate(path);
  };

  return (
    <div>
      <div style={{ marginBottom: "50px" }}>
        <Header
          home="Admin KBM"
          prev="Semester"
          navePrev={path}
          at="Tambah Semester"
          title="Tambah Semester"
        />
      </div>
      <div style={{ marginLeft: "60px" }}>
        <p
          style={{
            fontSize: "24px",
            marginBottom: "50px",
            marginTop: "50px",
          }}
          className="ml-1 font-bold text-merah"
        >
          Form Tambah Semester
        </p>
        <article>
          <TextInput
            label="Nama"
            type="text"
            name="code"
            onChange={(e) => setName(e.target.value)}
            required={true}
          />
          <TextInput
            label="Deskripsi"
            type="text"
            name="code"
            onChange={(e) => setDescription(e.target.value)}
            required={true}
          />
          <DropdownStatus
            label="Deskripsi"
            required={true}
            isClearable={true}
            defaultValue={statusVal}
            isSearchable={false}
            onChange={setStatus}
          />

          <div className="btn-form">
            <button
              type="button"
              className="w-20 btn-merah flex justify-center mb-5"
              onClick={postData}
            >
              Tambah
            </button>
            <button
              type="button"
              className="w-20 btn-putih flex justify-center mb-5"
              onClick={navigateSemester}
            >
              Batal
            </button>
          </div>
          {/* 
          <ModalStatusTambah
            isOpenStatus={isOpenStatus}
            closeModalStatus={closeModalStatus}
            status={sts}
            navigate={navigateSemester}
          />

          <ModalEmpty
            isOpenEmpty={isOpenEmpty}
            closeModalEmpty={closeModalEmpty}
            onRequestCloseEmpty={closeModalEmpty}
          /> */}
        </article>
      </div>
    </div>
  );
}
