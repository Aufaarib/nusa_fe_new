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
    console.log("fieldName ===> ", fieldName);
    // console.log("existingValues ===> ", existingValues);
    setStudent((existingValues) => ({
      // Retain the existing values
      ...existingValues,
      // update the current field
      [fieldName]: e.target.value,
    }));
    console.log("STUDENT DATA === ", student);
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

  // console.log("STUDENTS DATA", students);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log("STUDENT POST === ", student)
    setIsLoading(true);

    // const newArray = () => {
    //   return {
    const firstName = student.firstName;
    const middleName = student.middleName;
    const religion = student.religion;
    const lastName = student.lastName;
    const childStatus = student.childStatus;
    const childNumber = parseInt(student.childNumber);
    const height = parseInt(student.height);
    const birthPlace = student.birthPlace;
    const birthDate = student.birthDate;
    const gender = student.gender;
    const bloodType = student.bloodType;
    const hobby = student.hobby;
    const weight = parseInt(student.weight);
    const familyIdentityNumber = student.familyIdentityNumber;
    const distanceFromHome = parseInt(student.distanceFromHome);
    const transportation = student.transportation;
    const schoolOriginClass = student.schoolOriginClass;
    const schoolOriginName = student.schoolOriginName;
    const characteristic = student.characteristic;
    const healthRecord = student.healthRecord;
    const identityNumber = student.identityNumber;
    //   };
    // };

    console.log("HEIGHT === ", height);

    // setStudents(newArray);
    // console.log("STUDENT newArray === ", newArray)

    try {
      axios.post(
        process.env.REACT_APP_BASE_URL +
          "/admission/registration/REG00002/applicant",
        {
          firstName,
          middleName,
          lastName,
          childStatus,
          childNumber,
          height,
          religion,
          birthPlace,
          birthDate,
          gender,
          bloodType,
          hobby,
          weight,
          familyIdentityNumber,
          distanceFromHome,
          transportation,
          schoolOriginClass,
          schoolOriginName,
          characteristic,
          healthRecord,
          identityNumber,
        },
        {
          headers: { authorization: token },
        }
      );
      setIsLoading(false);
      setSuccessMsg("Data berhasil disimpan");
      setErrMsg("");
      // console.log("RESPONSE ==== " + response?.data.body);
      getFormCheck();
      console.log("getFormCheck === ", formCheck);
    } catch (err) {
      // const errors = err?.response?.data.errors;
      // console.error("ERROR === ", errors);
      // setErrMsg(errors);
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
              id="firstName"
              onChange={updateStudents}
              value={student.firstName}
              required={true}
            />

            <TextInput
              label="Agama"
              type="text"
              id="religion"
              onChange={updateStudents}
              value={student.religion}
              required={true}
            />

            <TextInput
              label="Nama Tengah"
              type="text"
              id="middleName"
              onChange={updateStudents}
              value={student.middleName}
              required={false}
            />

            <TextInput
              label="Nama Belakang"
              type="text"
              id="lastName"
              onChange={updateStudents}
              value={student.lastName}
              required={true}
            />

            <TextInput
              label="Status Anak"
              type="text"
              id="childStatus"
              onChange={updateStudents}
              value={student.childStatus}
              required={true}
            />

            {/* <DropdownListComponents
              required={true}
              label="Status Anak"
              placeholder=""
              id="status_anak"
              dataSource={dropdownData.statusAnak}
              fields={{ value: "text", text: "text" }}
              value={student.status_anak}
              change={updateStudentDropDownCal.bind(this)}
              // popupHeight="auto"
            /> */}

            <TextInput
              label="Anak ke"
              type="number"
              id="childNumber"
              onChange={updateStudents}
              value={student.childNumber}
              required={true}
              min="1"
            />

            <TextInput
              label="Tinggi Badan Anak (cm)"
              type="number"
              id="height"
              onChange={updateStudents}
              value={student.height}
              required={true}
              min="1"
            />

            {/* <DropdownListComponents
              required={true}
              label="Tinggal Bersama"
              placeholder=""
              id="tinggal_bersama"
              dataSource={dropdownData.tinggalBersama}
              value={student.tinggal_bersama}
              change={updateStudentDropDownCal.bind(this)}
            /> */}

            <TextInput
              label="Tempat Lahir"
              type="text"
              id="birthPlace"
              onChange={updateStudents}
              value={student.birthPlace}
              required={true}
            />

            <TextInput
              label="Tanggal Lahir"
              type="text"
              id="birthDate"
              onChange={updateStudents}
              value={student.birthDate}
              required={true}
            />
            {/* <DropdownDatePickers
              label="Tanggal Lahir"
              id="birthDate"
              value={student.birthDate}
              change={updateStudents}
            /> */}

            <DropdownRadioInputGender
              required={true}
              label="Jenis Kelamin"
              value1="female"
              value2="male"
              label2="Perempuan"
              label3="Laki-Laki"
              onChange={updateStudentRadio}
              checked={student.gender}
            />

            <DropdownRadioInputBloodType
              required={true}
              label="Golongan Darah"
              onChange={updateStudentRadio}
              checked={student.bloodType}
            />
          </section>
          <section>
            <TextInput
              label="Hobi Anak"
              type="text"
              id="hobby"
              onChange={updateStudents}
              value={student.hobby}
              required={true}
            />
            <TextInput
              label="Berat Badan Anak (Kg)"
              type="number"
              id="weight"
              onChange={updateStudents}
              value={student.weight}
              required={true}
              min="1"
            />
            <TextInput
              label="Nomor Kartu Keluarga"
              type="text"
              id="familyIdentityNumber"
              onChange={updateStudents}
              value={student.familyIdentityNumber}
              required={true}
            />
            <TextInput
              label="Jarak Rumah ke Sekolah (Km)"
              type="number"
              id="distanceFromHome"
              onChange={updateStudents}
              value={student.distanceFromHome}
              required={false}
              min="1"
            />

            <DropdownListComponents
              required={true}
              label="Transportasi ke Sekolah"
              placeholder=""
              id="transportation"
              dataSource={dropdownData.transportasiSekolah}
              // fields={{ value: "text", text: "text" }}
              value={student.transportation}
              change={updateStudentDropDownCal.bind(this)}
              popupHeight="auto"
            />

            <TextInput
              label="Kelas Pada Saat Mendaftar"
              type="number"
              id="schoolOriginClass"
              onChange={updateStudents}
              value={student.schoolOriginClass}
              required={true}
              min="1"
              max="6"
            />
            <TextInput
              label="Asal Sekolah"
              type="text"
              id="schoolOriginName"
              onChange={updateStudents}
              value={student.schoolOriginName}
              required={true}
            />
            <TextInput
              label="Sifat Dominan Anak"
              type="text"
              id="characteristic"
              onChange={updateStudents}
              value={student.characteristic}
              required={true}
            />
            <TextInput
              label="Penyakit Berat yang Pernah Diderita"
              type="text"
              id="healthRecord"
              onChange={updateStudents}
              value={student.healthRecord}
              required={true}
            />
            <TextInput
              label="Nomor Akta Lahir Anak"
              type="text"
              id="identityNumber"
              onChange={updateStudents}
              value={student.identityNumber}
              required={true}
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
