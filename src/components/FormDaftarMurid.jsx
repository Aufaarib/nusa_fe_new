import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { AiOutlineSave } from "react-icons/ai";
import { CgSpinner } from "react-icons/cg";
import TextInput from "./TextInput";
import RadioInput from "./RadioInput";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import {
  DropdownDatePickers,
  DropdownListComponents,
  DropdownRadioInputBloodType,
  DropdownRadioInputGender,
} from "./Dropdown";
import axios from "../api/axios";

import { useStateContext } from "../contexts/ContextProvider";

import { dropdownData } from "../data/initData";
import { DropdownBank, DropdownStatus } from "./Dropdown";

const STUDENT_URL = "/api/pmb/student";

const FormDaftarMurid = ({ indexMurid }) => {
  const token = localStorage.getItem("TOKEN");
  const {
    students,
    setStudents,
    errMsg,
    setErrMsg,
    setSuccessMsg,
    openForm,
    formCheck,
    getFormCheck,
  } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [student, setStudent] = useState({});

  useEffect(() => {
    // console.log("STUDENT DATA === ", student)

    if (Object.keys(student).length == 0) {
      setStudent(students[indexMurid]);
      // console.log("STUDENT DATA LENGTH === ", student)
    }
  }, [student]);

  const updateStudents = (e) => {
    const fieldName = e.target.id;
    // console.log("fieldName ===> ", fieldName)
    setStudent((existingValues) => ({
      // Retain the existing values
      ...existingValues,
      // update the current field
      [fieldName]: e.target.value,
    }));
    // console.log("STUDENT DATA === ", student)
  };

  const updateStudentDropDownCal = (e) => {
    const fieldName = e.element.id;
    // console.log("fieldName ===> ", e)
    setStudent((existingValues) => ({
      // Retain the existing values
      ...existingValues,
      // update the current field
      [fieldName]: e.value,
    }));
  };

  const updateStudentCal = (e) => {
    const fieldName = e.element.id;
    // console.log("fieldName ===> ", e)
    setStudent((existingValues) => ({
      // Retain the existing values
      ...existingValues,
      // update the current field
      [fieldName]: e.element.value,
    }));
  };

  const updateStudentRadio = (e) => {
    const fieldName = e.target.name;
    setStudent((existingValues) => ({
      // Retain the existing values
      ...existingValues,
      // update the current field
      [fieldName]: e.target.value,
    }));
  };

  // console.log("STUDENTS DATA", students)

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log("STUDENT POST === ", student)
    setIsLoading(true);

    const newArray = students.map((item, i) => {
      if (indexMurid === i) {
        return {
          ...item,
          id: student.id,
          nama_depan: student.nama_depan,
          nama_tengah: student.nama_tengah,
          nama_belakang: student.nama_belakang,
          status_anak: student.status_anak,
          anak_ke: student.anak_ke,
          tinggi_badan_anak: student.tinggi_badan_anak,
          tinggal_bersama: student.tinggal_bersama,
          tempat_lahir: student.tempat_lahir,
          tanggal_lahir: student.tanggal_lahir,
          jenis_kelamin: student.jenis_kelamin,
          golongan_darah: student.golongan_darah,
          hobby_anak: student.hobby_anak,
          berat_badan_anak: student.berat_badan_anak,
          nomor_kartu_keluarga: student.nomor_kartu_keluarga,
          jarak_rumah_ke_sekolah: student.jarak_rumah_ke_sekolah,
          transportasi_ke_sekolah: student.transportasi_ke_sekolah,
          kelas_saat_mendaftar: student.kelas_saat_mendaftar,
          asal_sekolah: student.asal_sekolah,
          sifat_dominan_anak: student.sifat_dominan_anak,
          penyakit_pernah_diderita: student.penyakit_pernah_diderita,
          nomor_akta_lahir_anak: student.nomor_akta_lahir_anak,
        };
      } else {
        return item;
      }
    });
    setStudents(newArray);
    // console.log("STUDENT newArray === ", newArray)

    try {
      const response = await axios.post(STUDENT_URL, JSON.stringify(student), {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setIsLoading(false);
      setSuccessMsg("Data berhasil disimpan");
      setErrMsg("");
      // console.log("RESPONSE ==== " + JSON.stringify(response?.data));
      getFormCheck();
      console.log("getFormCheck === ", formCheck);
    } catch (err) {
      const errors = err?.response?.data.errors;
      console.error("ERROR === ", errors);
      setErrMsg(errors);
      setIsLoading(false);
    }
  };

  return (
    <article>
      <div style={{ maxWidth: "145vh", overflow: "auto" }}>
        <form
          onSubmit={handleSubmit}
          style={{ display: "block", gap: "22px", padding: "20px" }}
        >
          <section>
            <TextInput
              label="Nama Depan"
              type="text"
              id="nama_depan"
              onChange={updateStudents}
              value={student.nama_depan}
              required={true}
            />

            <TextInput
              label="Nama Tengah"
              type="text"
              id="nama_tengah"
              onChange={updateStudents}
              value={student.nama_tengah}
              required={false}
            />

            <TextInput
              label="Nama Belakang"
              type="text"
              id="nama_belakang"
              onChange={updateStudents}
              value={student.nama_belakang}
              required={true}
            />

            <DropdownListComponents
              required={true}
              label="Status Anak"
              placeholder=""
              id="status_anak"
              dataSource={dropdownData.statusAnak}
              fields={{ value: "text", text: "text" }}
              value={student.status_anak}
              change={updateStudentDropDownCal.bind(this)}
              // popupHeight="auto"
            />

            <TextInput
              label="Anak ke"
              type="number"
              id="anak_ke"
              onChange={updateStudents}
              value={student.anak_ke}
              required={true}
              min="1"
            />

            <TextInput
              label="Tinggi Badan Anak (cm)"
              type="number"
              id="tinggi_badan_anak"
              onChange={updateStudents}
              value={student.tinggi_badan_anak}
              required={true}
              min="1"
            />

            <DropdownListComponents
              required={true}
              label="Tinggal Bersama"
              placeholder=""
              id="tinggal_bersama"
              dataSource={dropdownData.tinggalBersama}
              value={student.tinggal_bersama}
              change={updateStudentDropDownCal.bind(this)}
            />

            <TextInput
              label="Tempat Lahir"
              type="text"
              id="tempat_lahir"
              onChange={updateStudents}
              value={student.tempat_lahir}
              required={true}
            />

            <DropdownDatePickers
              label="Tanggal Lahir"
              id="tanggal_lahir"
              value={student.tanggal_lahir}
              change={updateStudentCal.bind(this)}
            />
            <DropdownRadioInputGender
              required={true}
              label="Jenis Kelamin"
              value1="Perempuan"
              value2="Laki-Laki"
              label2="Perempuan"
              label3="Laki-Laki"
              onChange={updateStudentRadio}
              checked={student.jenis_kelamin}
            />

            <DropdownRadioInputBloodType
              required={true}
              label="Golongan Darah"
              onChange={updateStudentRadio}
              checked={student.golongan_darah}
            />
          </section>
          <section>
            <TextInput
              label="Hobi Anak"
              type="text"
              id="hobby_anak"
              onChange={updateStudents}
              value={student.hobby_anak}
              required={true}
            />
            <TextInput
              label="Berat Badan Anak (Kg)"
              type="number"
              id="berat_badan_anak"
              onChange={updateStudents}
              value={student.berat_badan_anak}
              required={true}
              min="1"
            />
            <TextInput
              label="Nomor Kartu Keluarga"
              type="text"
              id="nomor_kartu_keluarga"
              onChange={updateStudents}
              value={student.nomor_kartu_keluarga}
              required={true}
            />
            <TextInput
              label="Jarak Rumah ke Sekolah (Km)"
              type="number"
              id="jarak_rumah_ke_sekolah"
              onChange={updateStudents}
              value={student.jarak_rumah_ke_sekolah}
              required={false}
              min="1"
            />

            <DropdownListComponents
              required={true}
              label="Transportasi ke Sekolah"
              placeholder=""
              id="transportasi_ke_sekolah"
              dataSource={dropdownData.transportasiSekolah}
              fields={{ value: "text", text: "text" }}
              value={student.transportasi_ke_sekolah}
              change={updateStudentDropDownCal.bind(this)}
              popupHeight="auto"
            />

            <TextInput
              label="Kelas Pada Saat Mendaftar"
              type="number"
              id="kelas_saat_mendaftar"
              onChange={updateStudents}
              value={student.kelas_saat_mendaftar}
              required={true}
              min="1"
              max="6"
            />
            <TextInput
              label="Asal Sekolah"
              type="text"
              id="asal_sekolah"
              onChange={updateStudents}
              value={student.asal_sekolah}
              required={true}
            />
            <TextInput
              label="Sifat Dominan Anak"
              type="text"
              id="sifat_dominan_anak"
              onChange={updateStudents}
              value={student.sifat_dominan_anak}
              required={true}
            />
            <TextInput
              label="Penyakit Berat yang Pernah Diderita"
              type="text"
              id="penyakit_pernah_diderita"
              onChange={updateStudents}
              value={student.penyakit_pernah_diderita}
              required={true}
            />
            <TextInput
              label="Nomor Akta Lahir Anak"
              type="text"
              id="nomor_akta_lahir_anak"
              onChange={updateStudents}
              value={student.nomor_akta_lahir_anak}
              required
            />
          </section>
        </form>
      </div>

      <section className="flex mt-12">
        <button
          type="button"
          className="w-auto btn-merah"
          onClick={handleSubmit}
        >
          {isLoading ? (
            <CgSpinner className="mr-2 text-xl animate-spin" />
          ) : (
            <AiOutlineSave className="mr-2 text-2xl" />
          )}
          Simpan
        </button>

        <div className="flex justify-end w-full">
          <Link
            to={"/pmb/tahapan-pmb"}
            className="w-auto pl-0 mx-0 bg-transparent shadow-none btn-merah hover:bg-transparent text-merah hover:text-gelap"
          >
            <BsChevronLeft className="text-xl m-0 mr-2 mt-0.5" /> Kembali
          </Link>

          <Link
            to={"/pmb/form-data-orang-tua"}
            className={`${
              openForm == "form_murid" && "pointer-events-none text-gray-300"
            } w-auto pr-0 mx-0 bg-transparent shadow-none btn-merah hover:bg-transparent text-merah hover:text-gelap`}
          >
            Selanjutnya <BsChevronRight className="text-xl ml-2 mt-0.5" />
          </Link>
        </div>
      </section>
    </article>
  );
};
export default FormDaftarMurid;
