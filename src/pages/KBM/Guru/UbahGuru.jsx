import React from "react";
import TextInput from "../../../components/TextInput";
import { updateKelas } from "../../../api/Kelas";
import {
  AlertEmpty,
  ModalEmpty,
  ModalStatusTambah,
} from "../../../components/ModalPopUp";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Header } from "../../../components";
import { updateGuru } from "../../../api/Guru";

export default function UbahGuru() {
  const [fullname, setFullname] = useState("");
  const [gender, setGender] = useState("");
  const [religion, setReligion] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [birthDate, setBirthDate] = useState("");
  // const [isOpenStatus, setisOpenStatus] = useState(false);
  // const [isOpenEmpty, setisOpenEmpty] = useState(false);
  const [sts, setSts] = useState(undefined);
  const location = useLocation();
  const navigate = useNavigate();

  const path = "/admin/list-guru";

  const postData = (e) => {
    e.preventDefault();
    const code = location.state.code;

    if (
      fullname.length === 0 ||
      gender.length === 0 ||
      religion.length === 0 ||
      birthPlace.length === 0 ||
      birthDate.length === 0
    ) {
      AlertEmpty();
    } else {
      updateGuru(
        setSts,
        path,
        code,
        fullname,
        gender,
        religion,
        birthPlace,
        birthDate
      );
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

  const navigateKelas = () => {
    navigate(path);
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <Header
          home="Admin KBM"
          prev="Guru"
          navePrev={path}
          at="Ubah Guru"
          title="Ubah Guru"
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
          Form Ubah Kelas
        </p>
        <article>
          {/* COL 1 */}
          <section>
            <TextInput
              label="Nama Lengkap"
              type="text"
              placeholder={location.state.Fullname}
              onChange={(e) => setFullname(e.target.value)}
              required={true}
            />
            <TextInput
              label="Jenis Kelamin"
              type="text"
              placeholder={location.state.Gender}
              onChange={(e) => setGender(e.target.value)}
              required={true}
            />
            <TextInput
              label="Agama"
              type="text"
              placeholder={location.state.Religion}
              onChange={(e) => setReligion(e.target.value)}
              required={true}
            />
            <TextInput
              label="Tempat Lahir"
              type="text"
              placeholder={location.state.BirthPlace}
              onChange={(e) => setBirthPlace(e.target.value)}
              required={true}
            />
            <TextInput
              label="Tanggal Lahir"
              type="text"
              placeholder={location.state.BirthDate}
              onChange={(e) => setBirthDate(e.target.value)}
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
              onClick={navigateKelas}
            >
              Batal
            </button>
          </div>

          {/* <ModalStatusTambah
            isOpenStatus={isOpenStatus}
            closeModalStatus={closeModalStatus}
            status={sts}
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
