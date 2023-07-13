import { useState, useEffect } from "react";
import { useImmer } from "use-immer";
import { Link } from "react-router-dom";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { AiOutlineSave } from "react-icons/ai";
import { CgSpinner } from "react-icons/cg";
import TextInput from "./TextInput";
import RadioInput from "./RadioInput";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import axios from "../api/axios";

import { useStateContext } from "../contexts/ContextProvider";

import { dropdownData } from "../data/initData";
import { DropdownListComponents, DropdownRadioInputGender } from "./Dropdown";
import { getAdmissionStatement } from "../api/Registrasi";
import Header from "./Header";

const PARENTS_URL = "/api/pmb/parent";

const FormPernyataan = ({ indexMurid }) => {
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
  const [admissionStatementData, setAdmissionStatement] = useState([]);
  const [sts, setSts] = useState(false);
  const [formData, setFormData] = useState({});

  const handleInputChange = (e, itemId) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [itemId]: value,
    }));
    console.log("FORM DATA === ", formData);
  };

  const fetchAdmissonStatement = async () => {
    getAdmissionStatement(setAdmissionStatement, setSts);
  };

  useEffect(() => {
    fetchAdmissonStatement();
  }, []);

  return (
    <article>
      <Header
        home="PMB"
        // prev="Bank"
        // navePrev={path}
        at="Pernyataan Orang Tua"
        title="Form Pernyataan Orang Tua"
      />
      <div style={{ maxWidth: "140vh", overflow: "auto" }}>
        <form
          // onSubmit={handleSubmit}
          style={{ display: "block", gap: "22px", padding: "20px" }}
        >
          {/* COL 1 */}
          <section>
            {admissionStatementData.map((item) => (
              <div key={item.id}>
                <TextInput
                  label={item.question}
                  type="textarea"
                  name="answers"
                  value={formData[item.id] || ""}
                  onChange={(e) => handleInputChange(e, item.id)}
                  required={true}
                  rows="4"
                />
              </div>
            ))}
          </section>
        </form>
      </div>
      <section className="flex mt-12">
        <button className="w-auto btn-merah">
          {isLoading ? (
            <CgSpinner className="mr-2 text-xl animate-spin" />
          ) : (
            <AiOutlineSave className="mr-2 text-2xl" />
          )}
          Simpan
        </button>

        <div className="flex justify-end w-full">
          <Link
            to={"/pmb/form-data-orang-tua-wali"}
            className="w-auto pl-0 mx-0 bg-transparent shadow-none btn-merah hover:bg-transparent text-merah hover:text-gelap"
          >
            <BsChevronLeft className="text-xl m-0 mr-2 mt-0.5" /> Pendataan Wali
          </Link>

          <Link
            to={"/pmb/berkas-pendaftaran"}
            className={`${
              openForm == "form_ortu_pernyataan" &&
              "pointer-events-none text-gray-300"
            } w-auto pr-0 mx-0 bg-transparent shadow-none btn-merah hover:bg-transparent text-merah hover:text-gelap`}
          >
            Berkas Pendaftaran
            <BsChevronRight className="text-xl ml-2 mt-0.5" />
          </Link>
        </div>
      </section>
    </article>
  );
};
export default FormPernyataan;
