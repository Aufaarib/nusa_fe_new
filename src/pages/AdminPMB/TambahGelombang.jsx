import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postGuru } from "../../api/Guru";
import { Header } from "../../components";
import { AlertEmpty } from "../../components/ModalPopUp";
import TextInput from "../../components/TextInput";
import { DropdownDatePickers } from "../../components/Dropdown";
import DatePicker from "react-date-picker";
import { Date } from "../../components/DataTables";
import { postAdmissionPhase } from "../../api/Gelombang";

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
  const [sts, setSts] = useState(undefined);
  // const created_by = localStorage.getItem("NAMA");

  const navigate = useNavigate();

  const path = "/admin/list-setup-pmb";

  //   const fetchSemester = async () => {
  //     getSemester(setSemesterData, setSts);
  //   };

  //   useEffect(() => {
  //     fetchSemester();
  //   }, []);

  const postData = (e) => {
    e.preventDefault();

    // const semester_id = parseInt(semester);
    // const status = statusVal.value;

    if (
      name.length === 0
      // gender.length === 0 ||
      // religion.length === 0 ||
      // birthPlace.length === 0 ||
      // birthDate.length === 0
    ) {
      AlertEmpty();
    } else {
      postAdmissionPhase(
        setSts,
        path,
        increment,
        name,
        startDate,
        endDate,
        amount
      );
      //   setisOpenStatus(true);
    }
  };

  // const closeModalEmpty = () => {
  //   AlertEmpty();
  // };

  // const closeModalStatus = () => {
  //   setisOpenStatus(false);
  //   setSts("");
  // };

  const navigateKurikulum = () => {
    navigate(path);
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
            label="Increment"
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
            label="Mulai"
            type="text"
            id="group"
            name="code"
            onChange={(e) => setStartDate(e.target.value)}
            required={true}
          />

          <TextInput
            label="Selesai"
            type="text"
            id="group"
            name="code"
            onChange={(e) => setEndDate(e.target.value)}
            required={true}
          />

          <TextInput
            label="Amount"
            type="number"
            onChange={handleAmountChange}
            required={true}
          />
          {/* <DropdownStatus
            label="Status"
            required={true}
            isClearable={true}
            defaultValue={statusVal}
            isSearchable={false}
            onChange={setStatus}
          /> */}
          {/* <DropdownJenisTransaksi
            label="Semester"
            required={true}
            defaultValue={semester}
            isClearable={false}
            options={SemesterOptions}
            isSearchable={false}
            onChange={(e) => setSemester(e.value)}
          /> */}

          <div style={{ marginRight: "255px" }}>
            <button className="btn-merah" onClick={addField}>
              Tambah Form
            </button>
          </div>

          {formFields.map((field, index) => (
            <div style={{ marginTop: "20px" }} key={index}>
              <TextInput
                label="Nama"
                type="text"
                id="group"
                name="code"
                onChange={(e) => setName(e.target.value)}
                required={true}
              />
              <TextInput
                label="Mulai"
                type="text"
                onChange={(e) => setStartDate(e.target.value)}
                required={true}
              />

              <TextInput
                label="Selesai"
                type="text"
                onChange={(e) => setEndDate(e.target.value)}
                required={true}
              />

              <TextInput
                label="Amount"
                type="text"
                onChange={(e) => setAmount(e.target.value)}
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
