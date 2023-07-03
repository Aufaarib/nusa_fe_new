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
  const [code, setCode] = useState("");
  const [course_name, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [group_course_id, setGroupCourseId] = useState("");
  const [statusVal, setStatus] = useState("");

  const [groupcourseData, setGroupCourseData] = useState([]);

  const [isOpenStatus, setisOpenStatus] = useState(false);
  const [isOpenEmpty, setisOpenEmpty] = useState(false);
  const [sts, setSts] = useState(undefined);
  const created_by = localStorage.getItem("NAMA");

  // fetch function
  const fetchGroupCourse = async () => {
    getKelompokMapel(setGroupCourseData, setSts);
  };

  useEffect(() => {
    fetchGroupCourse();
  }, []);

  const postData = (e) => {
    e.preventDefault();

    const status = statusVal.value;

    if (
      code.length === 0 ||
      course_name.length === 0 ||
      description.length === 0 ||
      statusVal.length === 0 ||
      group_course_id.length === 0
    ) {
      AlertEmpty();
    } else {
      postMapel(
        setSts,
        code,
        course_name,
        description,
        group_course_id,
        status,
        created_by
      );
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

  const navigateSemester = () => {
    navigate("/admin/list-mata-pelajaran");
  };

  const groupCourseOptions = groupcourseData.map((c) => ({
    label: c.name + " - " + c.status,
    value: c.id,
  }));

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
            label="Code"
            type="number"
            id="group"
            name="code"
            onChange={(e) => setCode(e.target.value)}
            required={true}
          />
          <TextInput
            label="Nama Mata Pelajaran"
            type="text"
            id="group"
            name="code"
            onChange={(e) => setCourseName(e.target.value)}
            required={true}
          />
          <TextInput
            label="Deskripsi"
            type="text"
            id="group"
            name="code"
            onChange={(e) => setDescription(e.target.value)}
            required={true}
          />
          <DropdownJenisTransaksi
            label="Kelompok Mata Pelajaran"
            required={true}
            defaultValue={group_course_id}
            isClearable={false}
            options={groupCourseOptions}
            isSearchable={false}
            onChange={(e) => setGroupCourseId(e.value)}
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
          />
        </article>
      </div>
    </div>
  );
}
