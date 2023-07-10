import React from "react";
import TextInput from "../../../components/TextInput";
import { DropdownJenisTransaksi } from "../../../components/Dropdown";
import { getSemester } from "../../../api/Semester";
import { updateKurikulum } from "../../../api/Kurikulum";
import {
  AlertEmpty,
  ModalEmpty,
  ModalStatusTambah,
} from "../../../components/ModalPopUp";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Header } from "../../../components";

export default function UbahKurikulum() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [semester_id, setSemesterId] = useState("");
  const [isOpenStatus, setisOpenStatus] = useState(false);
  const [isOpenEmpty, setisOpenEmpty] = useState(false);
  const [sts, setSts] = useState(undefined);
  const location = useLocation();
  const [semesterData, setSemesterData] = useState([]);
  const navigate = useNavigate();

  const path = "/admin/list-kurikulum";

  const navigateKurikulum = () => {
    navigate(path);
  };

  const fetchSemester = async () => {
    getSemester(setSemesterData, setSts);
  };

  useEffect(() => {
    fetchSemester();
  }, []);

  const postData = (e) => {
    e.preventDefault();
    const code = location.state.code;

    if (
      // code.trim().length === 0 ||
      name.length === 0 ||
      description.length === 0
      // semester_id.length === 0
    ) {
      AlertEmpty();
    } else {
      updateKurikulum(setSts, path, code, name, description);
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

  // const SemesterOptions = semesterData.map((c) => ({
  //   label: c.name + " - " + c.status,
  //   value: c.id,
  // }));

  return (
    <div>
      <div style={{ marginBottom: "50px" }}>
        <Header
          category="Admin KBM / Kurikulum / Ubah Kurikulum"
          title="Ubah Kurikulum"
        />
      </div>
      <div style={{ marginLeft: "60px" }}>
        <p className="text-3xl mb-16 mt-5 font-bold">Form Ubah Kurikulum</p>
        <article>
          {/* COL 1 */}
          <section>
            {/* <TextInput
              label="Code"
              type="text"
              placeholder={location.state.code}
              onChange={(e) => setCode(e.target.value)}
              required={true}
            /> */}
            <TextInput
              label="Nama"
              type="text"
              placeholder={location.state.name}
              onChange={(e) => setName(e.target.value)}
              required={true}
            />
            <TextInput
              label="Deskripsi"
              type="text"
              placeholder={location.state.description}
              onChange={(e) => setDescription(e.target.value)}
              required={true}
            />
            {/* <DropdownJenisTransaksi
              label="Semester"
              required={true}
              defaultValue={semester_id}
              isClearable={false}
              options={SemesterOptions}
              isSearchable={false}
              onChange={(e) => setSemesterId(e.value)}
            /> */}
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
