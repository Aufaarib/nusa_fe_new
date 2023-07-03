import React from "react";
import TextInput from "../../../components/TextInput";
import { updateSemester } from "../../../api/Semester";
import {
  AlertEmpty,
  ModalEmpty,
  ModalStatusTambah,
} from "../../../components/ModalPopUp";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Header } from "../../../components";

export default function UbahSemester() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [isOpenStatus, setisOpenStatus] = useState(false);
  const [isOpenEmpty, setisOpenEmpty] = useState(false);
  const [sts, setSts] = useState(undefined);
  const location = useLocation();
  const navigate = useNavigate();
  const path = "/admin/list-semester";

  const postData = (e) => {
    e.preventDefault();
    const id = location.state.id;

    if (name.trim().length === 0 || description.trim().length === 0) {
      AlertEmpty();
    } else {
      updateSemester(setSts, path, name, description, status, id);
      // setisOpenStatus(true);
    }
  };

  // const closeModalEmpty = () => {
  //   setisOpenEmpty(false);
  // };

  const closeModalStatus = () => {
    setisOpenStatus(false);
    setSts("");
  };

  const navigateSemester = () => {
    navigate(path);
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
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
          Form Tambah Kelompok Mata Pelajaran
        </p>
        <article>
          {/* COL 1 */}
          <section>
            <TextInput
              label="Nama"
              type="text"
              placeholder={location.state.name}
              onChange={(e) => setName(e.target.value)}
              required={true}
            />
            <TextInput
              label="Deskripsi"
              type="text"
              placeholder={location.state.description}
              onChange={(e) => setDescription(e.target.value)}
              required={true}
            />
          </section>

          <div className="btn-form">
            <button
              type="button"
              className="w-20 btn-merah flex justify-center mb-5"
              onClick={postData}
            >
              Ubah
            </button>
            <button
              type="button"
              className="w-20 btn-putih flex justify-center mb-5"
              onClick={navigateSemester}
            >
              Batal
            </button>
          </div>

          <ModalStatusTambah
            isOpenStatus={isOpenStatus}
            closeModalStatus={closeModalStatus}
            status={sts}
            navigate={navigateSemester}
          />

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
