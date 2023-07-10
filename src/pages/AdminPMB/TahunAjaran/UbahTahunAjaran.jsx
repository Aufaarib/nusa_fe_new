import React from "react";
import TextInput from "../../../components/TextInput";
import { updateBank } from "../../../api/Bank";
import {
  AlertEmpty,
  ModalEmpty,
  ModalStatusTambah,
} from "../../../components/ModalPopUp";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Header } from "../../../components";
import { updateTahunAjaran } from "../../../api/TahunAjaran";

export default function UbahTahunAjaran() {
  const [year, setYear] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState(undefined);
  const location = useLocation();
  const navigate = useNavigate();
  const path = "/admin/list-tahun-ajaran";

  const postData = (e) => {
    e.preventDefault();
    const code = location.state.code;
    const status = location.state.status;
    const curriculumId = location.state.curriculumId;

    if (year.length === 0 || name.length === 0) {
      AlertEmpty();
    } else {
      updateTahunAjaran(
        setStatus,
        path,
        year,
        name,
        status,
        curriculumId,
        code
      );
    }
  };

  //   const closeModalEmpty = () => {
  //     setisOpenEmpty(false);
  //   };

  //   const closeModalStatus = () => {
  //     setisOpenStatus(false);
  //     setStatus("");
  //   };

  const navigateListBank = () => {
    // 👇️ navigate to /contacts
    navigate(path);
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <Header
          home="Admin Keuangan"
          prev="List Bank"
          navePrev={path}
          at="Ubah List Bank"
          title="Ubah List Bank"
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
          Form Ubah List Bank
        </p>
        <article>
          <form
            className="grid mt-3 xs:grid-cols-1 
                    md:grid-cols-2 lg:grid-cols-3 gap-7"
            style={{ zIndex: -1 }}
          >
            {/* COL 1 */}
            <section>
              <TextInput
                label="Tahun"
                type="number"
                placeholder={location.state.year}
                onChange={(e) => setYear(e.target.value)}
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
                label="Id Kurikulum"
                type="text"
                placeholder={location.state.curriculumId}
                // onChange={(e) => set(e.target.value)}
                // required={true}
              />
            </section>
          </form>

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
              onClick={navigateListBank}
            >
              Batal
            </button>
          </div>

          {/* <ModalStatusTambah
            isOpenStatus={isOpenStatus}
            closeModalStatus={closeModalStatus}
            status={status}
            navigate={navigateListBank}
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
