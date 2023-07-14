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
import { getAdmissionAnswer, getAdmissionStatement } from "../api/Registrasi";
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
  const [admissionAnswerData, setAdmissionAnswer] = useState([]);
  const [sts, setSts] = useState("");
  const [stsStatement, setStsStatement] = useState("");
  const [stsAnswer, setStsAnswer] = useState("");
  const [formData, setFormData] = useState([]);

  const handleInputChange = (e, itemId) => {
    const value = e.currentTarget.value; // Retrieve the latest value

    const itemIndex = formData.findIndex((item) => item.statementId === itemId);

    if (itemIndex !== -1) {
      const updatedFormData = [...formData];
      updatedFormData[itemIndex] = { statementId: itemId, answer: value };
      setFormData(updatedFormData);
    } else {
      setFormData((prevData) => [
        ...prevData,
        { statementId: itemId, answer: value },
      ]);
    }
  };

  const fetchAdmissonStatement = async () => {
    getAdmissionStatement(setAdmissionStatement, setStsStatement);
  };

  const fetchAdmissonAnswer = async () => {
    getAdmissionAnswer(setAdmissionAnswer, setStsAnswer);
  };

  useEffect(() => {
    fetchAdmissonStatement();
    fetchAdmissonAnswer();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const answers = formData.map((i) => ({
      statementId: i.statementId,
      answer: i.answer,
    }));

    axios
      .post(
        process.env.REACT_APP_BASE_URL +
          `/admission/registration/REG00001/statement`,
        {
          answers,
        },
        { headers: { authorization: localStorage.getItem("TOKEN") } }
      )
      .then(() => {
        setSts({ type: "success" });
        // AlertStatusTambahSuccess(path);
      })
      .catch((error) => {
        setSts({ type: "error", error });
        // AlertStatusTambahFailed();
      });
    setIsLoading(false);
  };

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
          onSubmit={handleSubmit}
          style={{ display: "block", gap: "22px", padding: "20px" }}
        >
          <section className="xs:col-span-3 lg:col-span-1 xs:mb-3 lg:mb-0">
            <h1 className="mt-3 text-merah">Pernyataan</h1>
            <p className="text-xs">
              Catatan : Untuk pertanyaan yang terdapat tanda bintang merah (
              <span className="text-merah">*</span>) wajib diisi.
            </p>
          </section>
          {/* COL 1 */}
          <section className="xs:col-span-3 lg:col-span-1 mt-5">
            {stsAnswer !== 200
              ? admissionStatementData.map((item) => (
                  <div key={item.id}>
                    <TextInput
                      label={item.question}
                      type="textarea"
                      name="answers"
                      value={
                        (
                          formData.find(
                            (data) => data.statementId === item.id
                          ) || {}
                        ).answer || ""
                      }
                      onChange={(e) => handleInputChange(e, item.id)}
                      required={true}
                      rows="4"
                    />
                  </div>
                ))
              : admissionAnswerData.map((item) => (
                  <div key={item.id}>
                    <TextInput
                      label={item.statement.question}
                      type="textarea"
                      name="answers"
                      placeholder={item.answer}
                      // value={item.answer}
                      // onChange={(e) => handleInputChange(e, item.id)}
                      disable={true}
                      required={true}
                      rows="4"
                    />
                  </div>
                ))}
          </section>
        </form>
      </div>
      <section className="flex mt-12">
        {stsAnswer !== 200 && (
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
        {stsAnswer === 200 && (
          <button type="button" className="w-auto btn-disabled" disabled={true}>
            Data Pernyataan Selesai Di Input
          </button>
        )}

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
