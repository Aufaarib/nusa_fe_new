import { useEffect, useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import TextInput from "./TextInput";

import { useStateContext } from "../contexts/ContextProvider";

import {
  DropdownDatePickers,
  DropdownRadioInputBiological,
  DropdownRadioInputisOneHouse,
} from "./Dropdown";
import Header from "./Header";
import {
  getAdmissionRegistrationParents,
  getAdmissionRegistrationParentsIbu,
} from "../api/Registrasi";

// const PARENTS_URL = "/api/pmb/parent";

const FormDaftarOrangTuaIbu = ({ indexOrtu }) => {
  const token = localStorage.getItem("TOKEN");
  const {
    isLoading,
    setIsLoading,
    errMsg,
    setErrMsg,
    parents,
    setParents,
    setSuccessMsg,
    openForm,
    formCheck,
    getFormCheck,
  } = useStateContext();
  const [parent, setParent] = useState({});
  const [admissionParentsData, setAdmissionParents] = useState({});
  const [sts, setSts] = useState(false);
  // const [duplicateData, setDuplicateData] = useState(false);

  const fetchAdmissonParents = async () => {
    getAdmissionRegistrationParentsIbu(setAdmissionParents, setSts);
  };

  useEffect(() => {
    // console.log("PARENT DATA === ", parent);
    // console.log("PARENTS DATA FROM CONTEXT === ", parents);
    fetchAdmissonParents();
    if (parent.id == "" && parents[indexOrtu].id !== "") {
      setParent(parents[indexOrtu]);
    }
  }, [parent]);

  // useEffect(() => {
  //   setParent(draft => {
  //     draft.step = 1
  //   })
  // },[]);

  const updateParents = (e) => {
    // const fieldParent = e.target.name;
    const fieldName = e.target.id;
    // console.log("existingValues ===> ", existingValues);
    setParent((existingValues) => ({
      ...existingValues,
      [fieldName]: e.target.value,
    }));
    console.log("PARENTS DATA === ", parent);
  };

  const updateParentsRadio = (e) => {
    const fieldName = e.target.name;
    setParent((existingValues) => ({
      // Retain the existing values
      ...existingValues,
      // update the current field
      [fieldName]: e.target.value,
    }));
  };

  // const updateParentsDropDownCal = (e) => {
  //   // console.log("fieldName ===> ", e)
  //   const fieldParent = e.element.ej2_instances[0].htmlattributes.name;
  //   const fieldName = e.element.id;
  //   setParent((draft) => {
  //     draft[fieldParent][fieldName] = e.element.value;
  //   });
  // };

  // console.log("AYAH === ", parent.ayah)
  // console.log("IBU === ", parent.ibu)
  // console.log("WALI === ", parent.wali)
  // console.log("QUESTION === ", parent.question)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const fullName = parent.fullName;
    const familyIdentityNumber = parent.familyIdentityNumber;
    const identityNumber = parent.identityNumber;
    const gender = "female";
    const relationship = "ibu";
    const isBiological = parseInt(parent.isBiological);
    const isOneHouse = parseInt(parent.isOneHouse);
    const phoneNumber1 = parent.phoneNumber1;
    const phoneNumber2 = parent.phoneNumber2;
    const province = parent.province;
    const city = parent.city;
    const subDistrict = parent.subDistrict;
    const village = parent.village;
    const address = parent.address;
    const postalCode = parent.postalCode;
    const birthPlace = parent.birthPlace;
    const birthDate = parent.birthDate;
    const lastEducation = parent.lastEducation;
    const placeOfWork = parent.placeOfWork;
    const occupation = parent.occupation;
    const incomeGrade = parseInt(parent.incomeGrade);

    console.log("PARENT === ", relationship);

    try {
      axios.post(
        process.env.REACT_APP_BASE_URL +
          "/admission/registration/REG00001/parent",
        {
          fullName,
          familyIdentityNumber,
          identityNumber,
          gender,
          relationship,
          isBiological,
          isOneHouse,
          phoneNumber1,
          phoneNumber2,
          province,
          city,
          subDistrict,
          village,
          address,
          postalCode,
          birthPlace,
          birthDate,
          lastEducation,
          occupation,
          incomeGrade,
          placeOfWork,
        },
        {
          headers: { authorization: token },
        }
      );
      setIsLoading(false);
      setSuccessMsg("Data berhasil disimpan");
      setErrMsg("");
      // console.log("RES ==== " + JSON.stringify(response?.data));
      getFormCheck();
      // console.log("getFormCheck === ", formCheck);
    } catch (err) {
      // const errors = err?.response?.data.errors;
      // console.error("errors === ", errors);
      // setErrMsg(errors);
      // console.error("errMsg === ", errMsg);
      setIsLoading(false);
    }
  };

  return (
    <article>
      <Header
        home="PMB"
        prev="Pendataan Orang Tua"
        // navePrev={path}
        at="Pendataan Ibu"
        title="Form Pendataan Orang Tua"
      />
      <div style={{ maxWidth: "140vh", overflow: "auto" }}>
        <form
          onSubmit={handleSubmit}
          style={{ display: "block", gap: "22px", padding: "10px" }}
        >
          <section className="xs:col-span-3 lg:col-span-1 xs:mb-3 lg:mb-0">
            <h1 className="mt-3 text-merah">Pendataan Ibu</h1>
            <p className="text-xs">
              Catatan : Untuk pertanyaan yang terdapat tanda bintang merah (
              <span className="text-merah">*</span>) wajib diisi.
            </p>
          </section>

          {/* COL 2 */}
          <section className="xs:col-span-3 lg:col-span-1 mt-5">
            <TextInput
              label="Nama Lengkap"
              type="text"
              id="fullName"
              onChange={updateParents}
              value={parent.fullName}
              placeholder={admissionParentsData.fullName}
              disable={sts == 200}
              required={true}
            />

            <TextInput
              label="Nomor Kartu Keluarga"
              type="number"
              id="familyIdentityNumber"
              onChange={updateParents}
              value={parent.familyIdentityNumber}
              placeholder={admissionParentsData.familyIdentityNumber}
              disable={sts == 200}
              required={true}
            />
            <TextInput
              label="Nomor Identitas "
              type="number"
              id="identityNumber"
              onChange={updateParents}
              value={parent.identityNumber}
              placeholder={admissionParentsData.identityNumber}
              disable={sts == 200}
              required={true}
            />
            {/* <TextInput
              label="Jenis Kelamin"
              type="text"
              id="gender"
              onChange={updateParents}
              value={parent.gender}
              required={true}
            /> */}
            {/* <TextInput
              label="Hubungan"
              type="text"
              id="relationship"
              onChange={updateParents}
              value={parent.relationship}
              required={true}
            /> */}
            <br />
            {sts === 200 && (
              <TextInput
                label="Hubungan Ibu"
                type="text"
                id="isBiological"
                onChange={updateParents}
                value={parent.isBiological}
                placeholder={admissionParentsData.isBiological}
                disable={sts == 200}
                required={true}
              />
            )}
            {sts !== 200 && (
              <DropdownRadioInputBiological
                required={true}
                label="Hubungan Ibu"
                value1="1"
                value2="0"
                label2="Kandung"
                label3="Tiri"
                onChange={updateParentsRadio}
                checked={parent.isBiological}
              />
            )}
            <br />
            {sts === 200 && (
              <TextInput
                label="Tinggal Bersama"
                type="text"
                id="isOneHouse"
                onChange={updateParents}
                value={parent.isOneHouse}
                placeholder={admissionParentsData.isOneHouse}
                disable={sts == 200}
                required={true}
              />
            )}
            {sts !== 200 && (
              <DropdownRadioInputisOneHouse
                required={true}
                label="Tinggal Bersama"
                value1="1"
                value2="0"
                label2="Ya"
                label3="Tidak"
                onChange={updateParentsRadio}
                checked={parent.isOneHouse}
              />
            )}
            <br />
            <TextInput
              label="Nomor Ponsel 1"
              type="number"
              id="phoneNumber1"
              onChange={updateParents}
              value={parent.phoneNumber1}
              placeholder={admissionParentsData.phoneNumber_1}
              disable={sts == 200}
              required={true}
            />
            <TextInput
              label="Nomor Ponsel 2"
              type="numer"
              id="phoneNumber2"
              onChange={updateParents}
              value={parent.phoneNumber2}
              placeholder={admissionParentsData.phoneNumber_2}
              disable={sts == 200}
              required={true}
            />
            <TextInput
              label="Propinsi"
              type="text"
              id="province"
              onChange={updateParents}
              value={parent.province}
              placeholder={admissionParentsData.province}
              disable={sts == 200}
              required={true}
            />
            <TextInput
              label="Kota"
              type="text"
              id="city"
              onChange={updateParents}
              value={parent.city}
              placeholder={admissionParentsData.city}
              disable={sts == 200}
              required={true}
            />

            <TextInput
              label="Kecamatan"
              type="text"
              id="subDistrict"
              onChange={updateParents}
              value={parent.subDistrict}
              placeholder={admissionParentsData.subDistrict}
              disable={sts == 200}
              required={true}
            />

            <TextInput
              label="Kelurahan"
              type="text"
              id="village"
              onChange={updateParents}
              value={parent.village}
              placeholder={admissionParentsData.village}
              disable={sts == 200}
              required={true}
            />

            <TextInput
              label="Alamat"
              type="text"
              id="address"
              onChange={updateParents}
              value={parent.address}
              placeholder={admissionParentsData.address}
              disable={sts == 200}
              required={true}
            />

            <TextInput
              label="Kode Pos"
              type="number"
              id="postalCode"
              onChange={updateParents}
              value={parent.postalCode}
              placeholder={admissionParentsData.postalCode}
              disable={sts == 200}
              required={true}
            />

            <TextInput
              label="Tempat Lahir"
              type="text"
              id="birthPlace"
              onChange={updateParents}
              value={parent.birthPlace}
              placeholder={admissionParentsData.birthPlace}
              disable={sts == 200}
              required={true}
            />

            <TextInput
              label="Tanggal Lahir"
              type="text"
              id="birthDate"
              onChange={updateParents}
              value={parent.birthDate}
              placeholder={admissionParentsData.birthDate}
              disable={sts == 200}
              required={true}
            />

            {/* <DropdownDatePickers
              label="Tanggal Lahir "
              id="birthDate"
              value={parent.birthDate}
              change={updateParentsDropDownCal.bind(this)}
            /> */}

            {/* <DropdownListComponents
              required={true}
              label="Pendidikan Terakhir"
              placeholder=""
              id="lastEducation"
              dataSource={dropdownData.lastEducation}
              fields={{ value: "text", text: "text" }}
              value={parent.lastEducation}
              change={updateParentsDropDownCal.bind(this)}
            /> */}

            <TextInput
              label="Pendidikan Terakhir"
              type="text"
              id="lastEducation"
              onChange={updateParents}
              value={parent.lastEducation}
              placeholder={admissionParentsData.lastEducation}
              disable={sts == 200}
              required={true}
            />

            <TextInput
              label="Perusahaan Tempat Bekerja"
              type="text"
              id="placeOfWork"
              onChange={updateParents}
              value={parent.placeOfWork}
              placeholder={admissionParentsData.placeOfWork}
              disable={sts == 200}
              required={true}
            />

            <TextInput
              label="Posisi/ Jabatan"
              type="text"
              id="occupation"
              onChange={updateParents}
              value={parent.occupation}
              placeholder={admissionParentsData.occupation}
              disable={sts == 200}
              required={true}
            />

            <TextInput
              label="Penghasilan Tiap Bulan"
              type="number"
              id="incomeGrade"
              onChange={updateParents}
              value={parent.incomeGrade}
              placeholder={admissionParentsData.incomeGrade}
              disable={sts == 200}
              required={true}
              min="1"
            />
          </section>
        </form>
      </div>

      <section className="flex mt-12">
        {sts !== 200 && (
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
        )}
        {sts === 200 && (
          <button type="button" className="w-auto btn-disabled" disabled={true}>
            Data Orang Tua Sudah Didaftarkan
          </button>
        )}

        <div className="flex justify-end w-full">
          <Link
            to={"/pmb/form-data-orang-tua-ayah"}
            className="w-auto pl-0 mx-0 bg-transparent shadow-none btn-merah hover:bg-transparent text-merah hover:text-gelap"
          >
            <BsChevronLeft className="text-xl m-0 mr-2 mt-0.5" /> Pendataan Ayah
          </Link>

          <Link
            to={"/pmb/form-data-orang-tua-wali"}
            className={`${
              openForm == "form_ortu_identitas" &&
              "pointer-events-none text-gray-300"
            } w-auto pr-0 mx-0 bg-transparent shadow-none btn-merah hover:bg-transparent text-merah hover:text-gelap`}
          >
            Pendataan Wali <BsChevronRight className="text-xl ml-2 mt-0.5" />
          </Link>
        </div>
      </section>
    </article>
  );
};
export default FormDaftarOrangTuaIbu;
