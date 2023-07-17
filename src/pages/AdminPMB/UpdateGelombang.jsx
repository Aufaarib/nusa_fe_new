import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { postGuru } from "../../api/Guru";
import { Header } from "../../components";
import { AlertEmpty } from "../../components/ModalPopUp";
import TextInput from "../../components/TextInput";
import { DropdownDatePickers } from "../../components/Dropdown";
import DatePicker from "react-date-picker";
import { Date } from "../../components/DataTables";
import { postAdmissionPhase, updateAdmissionPhase } from "../../api/Gelombang";

export default function UbahGelombang() {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [amount, setAmount] = useState();
  const [increment, setIncrement] = useState();
  // const created_by = localStorage.getItem("NAMA");
  const [sts, setSts] = useState(undefined);
  const location = useLocation();
  const navigate = useNavigate();
  const path = "/admin/list-setup-pmb";
  const id = location.state.id;
  const code = location.state.code;

  console.log(code);

  const postData = (e) => {
    e.preventDefault();

    // const semester_id = parseInt(semester);
    // const status = statusVal.value;

    if (
      name.length === 0 ||
      increment === 0 ||
      startDate.length === 0 ||
      endDate.length === 0 ||
      amount === 0
    ) {
      AlertEmpty();
    } else {
      updateAdmissionPhase(
        setSts,
        path,
        id,
        code,
        increment,
        name,
        startDate,
        endDate,
        amount
      );
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

  const addField = () => {
    setFormFields([...formFields, ""]);
  };

  const removeField = (index) => {
    const updatedFields = [...formFields];
    updatedFields.splice(index, 1);
    setFormFields(updatedFields);
  };

  const handleChange = (index, value) => {
    const updatedFields = [...formFields];
    updatedFields[index] = value;
    setFormFields(updatedFields);
  };

  const handleAmountChange = (e) => {
    const value = parseInt(e.target.value);
    setAmount(value);
  };

  const handleIncrementChange = (e) => {
    const value = parseInt(e.target.value);
    setIncrement(value);
  };

  // const SemesterOptions = semesterData.map((c) => ({
  //   label: c.name + " - " + c.status,
  //   value: c.id,
  // }));

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <Header
          home="Admin PMB"
          prev="Admission Details"
          navePrev={path}
          at="Gelombang"
          title="Ubah Gelombang"
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
          Form Ubah Gelombang
        </p>
        <article>
          <TextInput
            label="Gelombang Ke"
            type="number"
            placeholder={location.state.increment}
            onChange={handleIncrementChange}
            required={true}
          />

          <TextInput
            label="Nama"
            type="text"
            placeholder={location.state.name}
            onChange={(e) => setName(e.target.value)}
            required={true}
          />

          <TextInput
            label="Tanggal Mulai"
            type="text"
            placeholder={location.state.startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required={true}
          />

          <TextInput
            label="Tanggal Selesai"
            type="text"
            placeholder={location.state.endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required={true}
          />

          <TextInput
            label="Amount"
            type="number"
            placeholder={location.state.amount}
            onChange={handleAmountChange}
            required={true}
          />

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
