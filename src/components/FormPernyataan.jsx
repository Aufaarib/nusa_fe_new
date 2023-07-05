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

const PARENTS_URL = "/api/pmb/parent";

const FormPernyataan = ({ indexMurid }) => {
  const token = JSON.parse(localStorage.getItem("TOKEN"));
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
  const [parent, setParent] = useImmer({
    id: "",
    step: 2,
    ayah: {},
    ibu: {},
    wali: {},
    question: {},
  });

  useEffect(() => {
    console.log("PARENT DATA === ", parent);
    if (parent.id == "") {
      setParent(parents[indexMurid]);
      // console.warn("XXXXX === ", parent)
    }
  }, [parent]);

  useEffect(() => {
    setParent((draft) => {
      draft.step = 2;
    });
  }, []);

  const updateParents = (e) => {
    const fieldParent = e.target.name;
    const fieldName = e.target.id;
    setParent((draft) => {
      draft[fieldParent][fieldName] = e.target.value;
    });
  };

  const updateParentsDropDownCal = (e) => {
    console.log("fieldName ===> ", e);
    const fieldParent = e.element.ej2_instances[0].htmlattributes.name;
    const fieldName = e.element.id;
    setParent((draft) => {
      draft[fieldParent][fieldName] = e.element.value;
    });
  };

  const updateParentsRadio = (e) => {
    console.log("fieldName ===> ", e);
    const fieldParent = e.target.id;
    const fieldName = e.target.name;
    setParent((draft) => {
      draft[fieldParent][fieldName] = e.target.value;
    });

    console.log("PARENT QUESTION === ", parent.question);
    console.log("WAKAF === ", parent.question.wakaf);
    console.log("INFAK === ", parent.question.komitmen_infak);

    if (parent.question.wakaf == "0") {
      setParent((draft) => {
        draft["question"]["nominal_wakaf"] = "0";
      });
    }
    if (parent.question.komitmen_infak == "0") {
      setParent((draft) => {
        draft["question"]["nominal_infak"] = "0";
      });
    }
  };

  console.log("QUESTION === ", parent.question);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newArray = parents.map((item, i) => {
      if (indexMurid === i) {
        return {
          ...item,
          id: parent.id,
          step: parent.step,
          question: {
            wakaf: parent.question.wakaf,
            nominal_wakaf: parent.question.nominal_wakaf,
            komitmen_infak: parent.question.komitmen_infak,
            nominal_infak: parent.question.nominal_infak,
            harapan_ayah_ibu: parent.question.harapan_ayah_ibu,
            potensi_ayah_ibu: parent.question.potensi_ayah_ibu,
          },
        };
      } else {
        return item;
      }
    });
    setParents(newArray);
    console.log("PARENTS newArray === ", newArray);

    try {
      const response = await axios.post(PARENTS_URL, JSON.stringify(parent), {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setIsLoading(false);
      setSuccessMsg("Data berhasil disimpan");
      setErrMsg("");
      console.log("RES ==== " + JSON.stringify(response?.data));
      getFormCheck();
      console.log("getFormCheck === ", formCheck);
    } catch (err) {
      const errors = err?.response?.data.errors;
      console.error("errors === ", errors);
      setErrMsg(errors);
      console.error("errMsg === ", errMsg);
      setIsLoading(false);
    }
  };

  return (
    <article>
      <div style={{ maxWidth: "140vh", overflow: "auto" }}>
        <form
          onSubmit={handleSubmit}
          style={{ display: "block", gap: "22px", padding: "20px" }}
        >
          {/* COL 1 */}
          <section>
            <DropdownRadioInputGender
              required={true}
              label="Apakah Ayah dan Bunda bersedia untuk wakaf di Sekolah Adab Insan
              Mulia"
              value1="1"
              value2="0"
              label2="Ya"
              label3="Tidak"
              onChange={updateParentsRadio}
              checked={String(parent.question.wakaf)}
            />

            <DropdownRadioInputGender
              required={true}
              label="Apakah Ayah dan Bunda bersedia berkomitmen untuk berinfak setiap
              bulan kepada Sekolah Adab Insan Mulia"
              value1="1"
              value2="0"
              label2="Ya"
              label3="Tidak"
              onChange={updateParentsRadio}
              checked={String(parent.question.komitmen_infak)}
            />

            <DropdownListComponents
              label="Jika Ayah dan Bunda bersedia, berapakah nilai nominal yang ingin
            diwakafkan"
              required={true}
              name="question"
              id="nominal_wakaf"
              dataSource={dropdownData.nominalWakaf}
              value={String(parent.question.nominal_infak)}
              change={updateParentsDropDownCal.bind(this)}
            />

            <DropdownListComponents
              label="Jika Ayah dan Bunda bersedia berinfak setiap bulan, berapakah
            nilai nominal yang akan diberikan"
              required={true}
              name="question"
              id="nominal_infak"
              dataSource={dropdownData.nominalWakaf}
              value={String(parent.question.nominal_infak)}
              change={updateParentsDropDownCal.bind(this)}
            />
          </section>
          <section>
            <TextInput
              label="Jelaskan harapan Ayah dan Bunda mendaftarkan Ananda ke Sekolah Adab Insan Mulia"
              type="textarea"
              name="question"
              id="harapan_ayah_ibu"
              onChange={updateParents}
              value={parent.question.harapan_ayah_ibu}
              required={true}
              rows="4"
            />

            <TextInput
              label="Apa potensi/kelebihan yang dimiliki ayah/bunda?Bersediakah jika ayah/bunda memberikan kontribusi dengan potensi tersebut untuk beramal jama'i membangun Sekolah Adab Insan Mulia"
              type="textarea"
              name="question"
              id="potensi_ayah_ibu"
              onChange={updateParents}
              value={parent.question.potensi_ayah_ibu}
              required={true}
              rows="4"
            />
          </section>
        </form>
      </div>

      <section className="flex mt-12">
        <button className="w-auto btn-merah" onClick={handleSubmit}>
          {isLoading ? (
            <CgSpinner className="mr-2 text-xl animate-spin" />
          ) : (
            <AiOutlineSave className="mr-2 text-2xl" />
          )}
          Simpan
        </button>

        <div className="flex justify-end w-full">
          <Link
            to={"/pmb/form-data-orang-tua"}
            className="w-auto pl-0 mx-0 bg-transparent shadow-none btn-merah hover:bg-transparent text-merah hover:text-gelap"
          >
            <BsChevronLeft className="text-xl m-0 mr-2 mt-0.5" /> Kembali
          </Link>

          <Link
            to={"/pmb/berkas-pendaftaran"}
            className={`${
              openForm == "form_ortu_pernyataan" &&
              "pointer-events-none text-gray-300"
            } w-auto pr-0 mx-0 bg-transparent shadow-none btn-merah hover:bg-transparent text-merah hover:text-gelap`}
          >
            Selanjutnya
            <BsChevronRight className="text-xl ml-2 mt-0.5" />
          </Link>
        </div>
      </section>
    </article>
  );
};
export default FormPernyataan;
