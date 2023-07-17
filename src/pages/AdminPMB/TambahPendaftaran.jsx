import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postGuru } from "../../api/Guru";
import { Header } from "../../components";
import { AlertEmpty } from "../../components/ModalPopUp";
import TextInput from "../../components/TextInput";
import { DropdownSiswa } from "../../components/Dropdown";
import { getTahunAjaran } from "../../api/TahunAjaran";
import { postAdmission } from "../../api/SetupPmb";
import { BsHandIndexThumbFill } from "react-icons/bs";

export default function TambahPendaftaran() {
  const [sts, setSts] = useState(undefined);
  const [formFields, setFormFields] = useState([
    {
      name: "",
      increment: 0,
      startDate: "",
      endDate: "",
      amount: 0,
    },
  ]);
  const [academicYearData, setAcademicYearData] = useState([]);
  const [academicYearId, setacAdemicYearId] = useState("");
  const [name, setName] = useState("");
  const [increment, setIncrement] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [amount, setAmount] = useState("");
  // const [academicYear, setAcademicYear] = useState("");

  // const [isOpenEmpty, setisOpenEmpty] = useState(false);
  // const created_by = localStorage.getItem("NAMA");

  const navigate = useNavigate();

  const fetchAcademicYear = () => {
    getTahunAjaran(setAcademicYearData, setSts);
  };

  console.log("KAKAAAAAAAA", formFields);

  useEffect(() => {
    fetchAcademicYear();
  }, []);

  // const handleChange = (index, field, value) => {
  //   const updatedFields = [...formFields];
  //   const intFields = ["increment", "amount"];

  //   if (intFields.includes(field)) {
  //     updatedFields[index][field] = parseInt(value, 0);
  //   } else {
  //     updatedFields[index][field] = value;
  //   }
  //   setFormFields(updatedFields);
  // };

  // const addField = () => {
  //   setFormFields([
  //     ...formFields,
  //     {
  //       name: "",
  //       increment: 0,
  //       startDate: "",
  //       endDate: "",
  //       amount: 0,
  //     },
  //   ]);
  // };

  // const removeField = (index) => {
  //   const updatedFields = formFields.filter((field, i) => i !== index);
  //   setFormFields(updatedFields);
  // };

  const academicYearOptions = academicYearData.map((c) => ({
    label: `${c.name} : ${c.curriculum.code}`,
    value: c.id,
  }));

  const path = "/admin/list-setup-pmb";

  const postData = (e) => {
    e.preventDefault();

    // formFields.forEach((field) => {
    // const { name, increment, startDate, endDate, amount } = field;

    const gelombang_ke = parseInt(increment);
    const jumlah = parseInt(amount);

    if (
      academicYearId === 0 ||
      name === "" ||
      gelombang_ke === 0 ||
      startDate === "" ||
      endDate === "" ||
      jumlah === 0
    ) {
      AlertEmpty();
    } else {
      // console.log("academicYearId:", academicYearId);
      // console.log("name:", name);
      // console.log("increment:", increment);
      // console.log("startDate:", startDate);
      // console.log("endDate:", endDate);
      // console.log("amount:", amount);
      postAdmission(
        setSts,
        path,
        academicYearId,
        name,
        gelombang_ke,
        startDate,
        endDate,
        jumlah
      );
      //   setisOpenStatus(true);
    }
    // });
  };

  const navigateKurikulum = () => {
    navigate(path);
  };

  // const handleAmountChange = (e) => {
  //   const value = parseInt(e.target.value);
  //   setAmount(value);
  // };

  // const handleIncrementChange = (e) => {
  //   const value = parseInt(e.target.value);
  //   setIncrement(value);
  // };

  // const onAcademicYearChange = (index, e) => {
  //   setAcademicYear(e.value);
  // };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <Header
          home="Admin PMB"
          prev="Setup PMB"
          navePrev={path}
          at="Pendaftaran"
          title="Tambah Pendaftaran"
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
          Form Tambah Pendaftaran
        </p>
        <article>
          <DropdownSiswa
            label="Tahun Ajaran"
            required={true}
            defaultValue={academicYearId}
            isClearable={false}
            options={academicYearOptions}
            isSearchable={false}
            onChange={(e) => setacAdemicYearId(e.value)}
          />

          <TextInput
            label="Gelombang Ke"
            type="number"
            onChange={(e) => setIncrement(e.target.value)}
            required={true}
          />
          <TextInput
            label="Nama Gelombang"
            type="text"
            onChange={(e) => setName(e.target.value)}
            required={true}
          />
          <TextInput
            label="Tanggal Mulai"
            type="text"
            id="group"
            name="code"
            onChange={(e) => setStartDate(e.target.value)}
            required={true}
          />
          <TextInput
            label="Tanggal Selesai"
            type="text"
            id="group"
            name="code"
            onChange={(e) => setEndDate(e.target.value)}
            required={true}
          />
          <TextInput
            label="Amount"
            type="text"
            id="group"
            name="code"
            onChange={(e) => setAmount(e.target.value)}
            required={true}
          />
          {/* {formFields.map((field, index) => (
            <div style={{ marginTop: "20px" }} key={index}>
              <TextInput
                label="Gelombang Ke"
                type="number"
                onChange={(e) =>
                  handleChange(index, "increment", e.target.value)
                }
                required={true}
              />
              <TextInput
                label="Nama Gelombang"
                type="text"
                id="group"
                name="code"
                onChange={(e) => handleChange(index, "name", e.target.value)}
                required={true}
              />
              <TextInput
                label="Tanggal Mulai"
                type="text"
                id="group"
                name="code"
                onChange={(e) =>
                  handleChange(index, "startDate", e.target.value)
                }
                required={true}
              />
              <TextInput
                label="Tanggal Selesai"
                type="text"
                id="group"
                name="code"
                onChange={(e) => handleChange(index, "endDate", e.target.value)}
                required={true}
              />
              <TextInput
                label="Amount"
                type="text"
                id="group"
                name="code"
                onChange={(e) => handleChange(index, "amount", e.target.value)}
                required={true}
              />

              <div style={{ marginRight: "255px" }}>
                <button
                  className="btn-putih"
                  onClick={() => removeField(index)}
                >
                  Hapus Form
                </button>
              </div>
            </div>
          ))}
          <div style={{ marginRight: "255px" }}>
            <button className="btn-merah" onClick={addField}>
              Tambah Form
            </button>
          </div> */}

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
              onClick={navigateKurikulum}
            >
              Batal
            </button>
          </div>
          {/* <ModalStatusTambah
            isOpenStatus={isOpenStatus}
            closeModalStatus={closeModalStatus}
            status={sts}
            navigate={navigateKurikulum}
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
