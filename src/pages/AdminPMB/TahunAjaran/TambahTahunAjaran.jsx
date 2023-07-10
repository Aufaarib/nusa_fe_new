import React from "react";
import TextInput from "../../../components/TextInput";
import { postCostCenter } from "../../../api/CostCenter";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AlertEmpty } from "../../../components/ModalPopUp";
import {
  DropdownDebitKredit,
  DropdownGroup,
  DropdownKurikulum,
} from "../../../components/Dropdown";
import { Header } from "../../../components";
import { Typography } from "@mui/material";
import { postTahunAjaran } from "../../../api/TahunAjaran";
import { getKurikulum } from "../../../api/Kurikulum";
import { useEffect } from "react";

export default function TambahTahunAjaran() {
  const [year, setYear] = useState("");
  const [name, setName] = useState("");
  const [curriculum, setKurikulum] = useState("");
  const [status] = useState(1);
  const [sts, setSts] = useState(undefined);
  const [curriculumData, setCurriculumData] = useState([]);
  const path = "/admin/list-tahun-ajaran";

  const postData = (e) => {
    e.preventDefault();

    const curriculumId = curriculum.value;
    // const group = groupVal.value;

    if (path.length === 0 || year.length === 0 || name.length === 0) {
      AlertEmpty();
    } else {
      postTahunAjaran(setSts, path, year, name, status, curriculumId);
    }
  };

  //   const closeModalEmpty = () => {
  //     setisOpenEmpty(false);
  //   };

  //   const closeModalStatus = () => {
  //     setisOpenStatus(false);
  //     setStatus("");
  //   };

  const navigate = useNavigate();

  const navigateCostCenter = () => {
    navigate(path);
  };

  const fetchCurriculum = async () => {
    getKurikulum(setCurriculumData, setSts);
  };

  useEffect(() => {
    fetchCurriculum();
    // console.log(status);
  }, []);

  const curriculumOptions = curriculumData.map((c) => ({
    label: `${c.name} - ${c.description}`,
    value: c.id,
  }));

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <Header
          home="Admin PMB"
          prev="List Tahun Ajaran"
          navePrev={path}
          at="Tahun Ajaran"
          title="Tambah Tahun Ajaran"
        />
      </div>
      <div style={{ marginLeft: "60px" }}>
        <article>
          <p
            style={{
              fontSize: "24px",
              marginBottom: "50px",
              marginTop: "50px",
            }}
            className="ml-1 font-bold text-merah"
          >
            Form Tambah Tahun Ajaran
          </p>
          <TextInput
            label="Tahun"
            type="number"
            id="group"
            name="code"
            onChange={(e) => setYear(e.target.value)}
            required={true}
          />
          <TextInput
            label="Nama"
            type="text"
            id="group"
            onChange={(e) => setName(e.target.value)}
            required={true}
          />
          {/* <TextInput
            label="Status"
            type="number"
            id="group"
            onChange={(e) => setStatus(e.target.value)}
            required={true}
          /> */}
          <DropdownKurikulum
            label="Kurikulum"
            required={true}
            isClearable={true}
            defaultValue={curriculum}
            isSearchable={false}
            options={curriculumOptions}
            onChange={setKurikulum}
          />

          <div className="btn-form">
            <button
              type="button"
              className="w-20 btn-merah flex justify-center mb-5"
              onClick={postData}
            >
              Simpan
            </button>
            <button
              type="button"
              className="w-20 btn-putih flex justify-center mb-5"
              onClick={navigateCostCenter}
            >
              Batal
            </button>
          </div>

          {/* <ModalStatusTambah
                isOpenStatus={isOpenStatus}
                closeModalStatus={closeModalStatus}
                status={status}
                navigate={navigateCostCenter}
            /> */}

          {/* <ModalEmpty
                isOpenEmpty={isOpenEmpty}
                closeModalEmpty={closeModalEmpty}
                onRequestCloseEmpty={closeModalEmpty}
            /> */}
        </article>
      </div>
    </div>
  );
}
