import React from "react";
import TextInput from "../../../components/TextInput";
import { postKelas } from "../../../api/Kelas";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  AlertEmpty,
  ModalEmpty,
  ModalStatusTambah,
} from "../../../components/ModalPopUp";
import { Header } from "../../../components";

export default function TambahKelas() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [isOpenStatus, setisOpenStatus] = useState(false);
  const [isOpenEmpty, setisOpenEmpty] = useState(false);
  const [status, setStatus] = useState(undefined);
  const created_by = localStorage.getItem("NAMA");
  const navigate = useNavigate();
  const path = "/admin/list-kelas";

  const postData = (e) => {
    e.preventDefault();

    if (name.length === 0 || description.length === 0) {
      AlertEmpty();
    } else {
      postKelas(setStatus, path, name, description, created_by);
      // setisOpenStatus(true);
    }
  };

  // const closeModalEmpty = () => {
  //   setisOpenEmpty(false);
  // };

  // const closeModalStatus = () => {
  //   setisOpenStatus(false);
  //   setStatus("");
  // };

  const navigateKelas = () => {
    navigate(path);
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <Header
          home="Admin KBM"
          prev="Kelas"
          navePrev={path}
          at="Tambah Kelas"
          title="Tambah Kelas"
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
          Form Tambah Kelas
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
              onClick={navigateKelas}
            >
              Batal
            </button>
          </div>

          {/* <ModalStatusTambah
            isOpenStatus={isOpenStatus}
            closeModalStatus={closeModalStatus}
            status={status}
            navigate={navigateKelas}
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
