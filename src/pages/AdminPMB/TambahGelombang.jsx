import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { postGuru } from "../../api/Guru";
import { Header } from "../../components";
import { AlertEmpty } from "../../components/ModalPopUp";
import TextInput from "../../components/TextInput";
import { DropdownDatePickers } from "../../components/Dropdown";
import DatePicker from "react-date-picker";
import { Date } from "../../components/DataTables";
import { postAdmissionPhase } from "../../api/Gelombang";
import moment from "moment/moment";

export default function TambahGelombang() {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [amount, setAmount] = useState();
  const [increment, setIncrement] = useState();
  // const [birthDate, setBirthDate] = useState("");
  // const [semesterData, setSemesterData] = useState([]);
  // const [isOpenStatus, setisOpenStatus] = useState(false);
  // const [isOpenEmpty, setisOpenEmpty] = useState(false);
  // const created_by = localStorage.getItem("NAMA");
  const [sts, setSts] = useState(undefined);
  const location = useLocation();
  const navigate = useNavigate();
  const path = "/admin/list-setup-pmb";
  const code = location.state.code;

  const postData = (e) => {
    e.preventDefault();

    const jumlah = parseInt(amount.replace(/\./g, ""), 10);

    if (
      name.length === 0 ||
      increment === 0 ||
      startDate.length === 0 ||
      endDate.length === 0 ||
      amount === 0
    ) {
      AlertEmpty();
    } else {
      postAdmissionPhase(
        setSts,
        path,
        code,
        increment,
        name,
        startDate,
        endDate,
        jumlah
      );
      //   setisOpenStatus(true);
    }
  };

  const navigateAdmissionDetails = () => {
    navigate("/admin/admission-detail", {
      state: {
        code: code,
      },
    });
  };

  const [formFields, setFormFields] = useState([]);

  // const addField = () => {
  //   setFormFields([...formFields, ""]);
  // };

  // const removeField = (index) => {
  //   const updatedFields = [...formFields];
  //   updatedFields.splice(index, 1);
  //   setFormFields(updatedFields);
  // };

  // const handleChange = (index, value) => {
  //   const updatedFields = [...formFields];
  //   updatedFields[index] = value;
  //   setFormFields(updatedFields);
  // };

  const handleIncrementChange = (e) => {
    const value = parseInt(e.target.value);
    setIncrement(value);
  };

  // const SemesterOptions = semesterData.map((c) => ({
  //   label: c.name + " - " + c.status,
  //   value: c.id,
  // }));

  const handleInputChange = (event) => {
    let inputVal = event.target.value;
    inputVal = inputVal.replace(/\D/g, ""); // Remove all non-numeric characters
    inputVal = inputVal.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Add dots every 3 digits
    // const value = parseInt(inputVal);
    setAmount(inputVal);
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <Header
          home="Admin PMB"
          prev="Setup PMB"
          navePrev={path}
          at="Gelombang"
          title="Tambah Gelombang"
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
          Form Tambah Gelombang
        </p>
        <article>
          <TextInput
            label="Gelombang Ke"
            type="number"
            onChange={handleIncrementChange}
            required={true}
          />

          <TextInput
            label="Nama"
            type="text"
            id="group"
            name="code"
            onChange={(e) => setName(e.target.value)}
            required={true}
          />

          <TextInput
            label="Tanggal Mulai"
            type="text"
            placeholder="Format YYYY-MM-DD"
            onChange={(e) => setStartDate(e.target.value)}
            required={true}
          />

          <TextInput
            label="Tanggal Selesai"
            type="text"
            placeholder="Format YYYY-MM-DD"
            onChange={(e) => setEndDate(e.target.value)}
            required={true}
          />

          <TextInput
            label="Amount"
            type="text"
            onChange={handleInputChange}
            value={amount}
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
              onClick={navigateAdmissionDetails}
            >
              Batal
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
