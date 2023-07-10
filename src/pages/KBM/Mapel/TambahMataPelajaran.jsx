import React from "react";
import TextInput from "../../../components/TextInput";
import { getKelompokMapel } from "../../../api/KelompokMataPelajaran";
import { postMapel } from "../../../api/MataPelajaran";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  AlertEmpty,
  ModalEmpty,
  ModalStatusTambah,
} from "../../../components/ModalPopUp";
import { Header } from "../../../components";
import {
  DropdownStatus,
  DropdownJenisTransaksi,
} from "../../../components/Dropdown";

export default function TambahMataPelajaran() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [statusVal, setStatus] = useState("");

  // const [groupcourseData, setGroupCourseData] = useState([]);

  // const [isOpenStatus, setisOpenStatus] = useState(false);
  // const [isOpenEmpty, setisOpenEmpty] = useState(false);
  const [sts, setSts] = useState(undefined);
  // const created_by = localStorage.getItem("NAMA");
  const navigate = useNavigate();

  const path = "/admin/list-mata-pelajaran";

  // fetch function
  // const fetchGroupCourse = async () => {
  //   getKelompokMapel(setGroupCourseData, setSts);
  // };

  // useEffect(() => {
  //   fetchGroupCourse();
  // }, []);

  const postData = (e) => {
    e.preventDefault();

    // const status = statusVal.value;

    if (
      name.length === 0 ||
      description.length === 0 ||
      type.length === 0
      // statusVal.length === 0 ||
      // group_course_id.length === 0
    ) {
      AlertEmpty();
    } else {
      postMapel(setSts, path, name, description, type);
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

  // const groupCourseOptions = groupcourseData.map((c) => ({
  //   label: c.name + " - " + c.status,
  //   value: c.id,
  // }));

  return (
    <div>
      <div style={{ marginBottom: "50px" }}>
        <Header
          category="Admin KBM / Mata Pelajaran / Tambah Mata Pelajaran"
          title="Tambah Mata Pelajaran"
        />
      </div>
      <div style={{ marginLeft: "60px" }}>
        <p className="text-white-700 text-3xl mb-16 mt-5 font-bold">
          Form Tambah Mata Pelajaran
        </p>
        <article>
          <TextInput
            label="Nama"
            type="text"
            onChange={(e) => setName(e.target.value)}
            required={true}
          />
          <TextInput
            label="Deskripsi"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            required={true}
          />
          <TextInput
            label="Tipe"
            type="text"
            onChange={(e) => setType(e.target.value)}
            required={true}
          />
          {/* <DropdownJenisTransaksi
            label="Kelompok Mata Pelajaran"
            required={true}
            defaultValue={group_course_id}
            isClearable={false}
            options={groupCourseOptions}
            isSearchable={false}
            onChange={(e) => setGroupCourseId(e.value)}
          /> */}
          {/* <DropdownStatus
            label="Status"
            required={true}
            isClearable={true}
            defaultValue={statusVal}
            isSearchable={false}
            onChange={setStatus}
          /> */}

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
          {/* <ModalStatusTambah
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
