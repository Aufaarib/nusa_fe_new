import { useState, useEffect } from "react";
import { useImmer } from "use-immer";
import { Link } from "react-router-dom";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { AiOutlineSave } from "react-icons/ai";
import { CgSpinner, CgCopy } from "react-icons/cg";
import TextInput from "./TextInput";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
import axios from "../api/axios";

import { useStateContext } from "../contexts/ContextProvider";

import { dropdownData } from "../data/initData";
import { DropdownDatePickers, DropdownListComponents } from "./Dropdown";

const PARENTS_URL = "/api/pmb/parent";

const FormDaftarOrangTua = ({ indexMurid }) => {
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
    duplicate_data: false,
    id: "",
    step: 1,
    ayah: {},
    ibu: {},
    wali: {},
  });
  const [duplicateData, setDuplicateData] = useState(false);

  useEffect(() => {
    // console.log("PARENT DATA === ", parent)
    if (parent.id == "" && parents[indexMurid].id !== "") {
      setParent(parents[indexMurid]);
      // console.log("PARENTS DATA FROM CONTEXT === ", parents)
    }
  }, []);

  // useEffect(() => {
  //   setParent(draft => {
  //     draft.step = 1
  //   })
  // },[]);

  const updateParents = (e) => {
    const fieldParent = e.target.name;
    const fieldName = e.target.id;
    setParent((draft) => {
      draft[fieldParent][fieldName] = e.target.value;
    });
  };

  const updateParentsDropDownCal = (e) => {
    // console.log("fieldName ===> ", e)
    const fieldParent = e.element.ej2_instances[0].htmlattributes.name;
    const fieldName = e.element.id;
    setParent((draft) => {
      draft[fieldParent][fieldName] = e.element.value;
    });
  };

  // console.log("AYAH === ", parent.ayah)
  // console.log("IBU === ", parent.ibu)
  // console.log("WALI === ", parent.wali)
  // console.log("QUESTION === ", parent.question)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newArray = parents.map((item, i) => {
      if (indexMurid === i) {
        return {
          ...item,
          duplicate_data: parent.duplicate_data,
          id: parent.id,
          step: 1,
          ayah: {
            nama_lengkap: parent.ayah.nama_lengkap,
            nomor_ponsel: parent.ayah.nomor_ponsel,
            alamat: parent.ayah.alamat,
            tempat_lahir: parent.ayah.tempat_lahir,
            tanggal_lahir: parent.ayah.tanggal_lahir,
            pendidikan_terakhir: parent.ayah.pendidikan_terakhir,
            perusahaan_tempat_bekerja: parent.ayah.perusahaan_tempat_bekerja,
            posisi_jabatan: parent.ayah.posisi_jabatan,
            penghasilan_per_bulan: parent.ayah.penghasilan_per_bulan,
          },
          ibu: {
            nama_lengkap: parent.ibu.nama_lengkap,
            nomor_ponsel: parent.ibu.nomor_ponsel,
            alamat: parent.ibu.alamat,
            tempat_lahir: parent.ibu.tempat_lahir,
            tanggal_lahir: parent.ibu.tanggal_lahir,
            pendidikan_terakhir: parent.ibu.pendidikan_terakhir,
            perusahaan_tempat_bekerja: parent.ibu.perusahaan_tempat_bekerja,
            posisi_jabatan: parent.ibu.posisi_jabatan,
            penghasilan_per_bulan: parent.ibu.penghasilan_per_bulan,
          },
          wali: {
            nama_lengkap: parent.wali.nama_lengkap,
            nomor_ponsel: parent.wali.nomor_ponsel,
            alamat: parent.wali.alamat,
            tempat_lahir: parent.wali.tempat_lahir,
            tanggal_lahir: parent.wali.tanggal_lahir,
            pendidikan_terakhir: parent.wali.pendidikan_terakhir,
            perusahaan_tempat_bekerja: parent.wali.perusahaan_tempat_bekerja,
            posisi_jabatan: parent.wali.posisi_jabatan,
            penghasilan_per_bulan: parent.wali.penghasilan_per_bulan,
          },
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

  const handleDuplicateData = (e) => {
    const newArray = parents.map((item, i) => {
      if (indexMurid === i) {
        return { ...item, duplicate_data: e.checked };
      } else {
        return item;
      }
    });
    setParents(newArray);
    console.log("parent === ", parent);
  };

  const handleCheckbox = (e) => {
    console.log(e.checked);
    // setDuplicateData(e.checked);
    setParent((draft) => {
      draft.duplicate_data = e.checked;
    });
    console.log("parents === ", parents);
    // handleDuplicateData(e);

    if (e.checked) {
      setParent({
        duplicate_data: parents[0].duplicate_data,
        id: parents[indexMurid].id,
        step: 1,
        ayah: {
          nama_lengkap: parents[0].ayah.nama_lengkap,
          nomor_ponsel: parents[0].ayah.nomor_ponsel,
          alamat: parents[0].ayah.alamat,
          tempat_lahir: parents[0].ayah.tempat_lahir,
          tanggal_lahir: parents[0].ayah.tanggal_lahir,
          pendidikan_terakhir: parents[0].ayah.pendidikan_terakhir,
          perusahaan_tempat_bekerja: parents[0].ayah.perusahaan_tempat_bekerja,
          posisi_jabatan: parents[0].ayah.posisi_jabatan,
          penghasilan_per_bulan: parents[0].ayah.penghasilan_per_bulan,
        },
        ibu: {
          nama_lengkap: parents[0].ibu.nama_lengkap,
          nomor_ponsel: parents[0].ibu.nomor_ponsel,
          alamat: parents[0].ibu.alamat,
          tempat_lahir: parents[0].ibu.tempat_lahir,
          tanggal_lahir: parents[0].ibu.tanggal_lahir,
          pendidikan_terakhir: parents[0].ibu.pendidikan_terakhir,
          perusahaan_tempat_bekerja: parents[0].ibu.perusahaan_tempat_bekerja,
          posisi_jabatan: parents[0].ibu.posisi_jabatan,
          penghasilan_per_bulan: parents[0].ibu.penghasilan_per_bulan,
        },
        wali: {
          nama_lengkap: parents[0].wali.nama_lengkap,
          nomor_ponsel: parents[0].wali.nomor_ponsel,
          alamat: parents[0].wali.alamat,
          tempat_lahir: parents[0].wali.tempat_lahir,
          tanggal_lahir: parents[0].wali.tanggal_lahir,
          pendidikan_terakhir: parents[0].wali.pendidikan_terakhir,
          perusahaan_tempat_bekerja: parents[0].wali.perusahaan_tempat_bekerja,
          posisi_jabatan: parents[0].wali.posisi_jabatan,
          penghasilan_per_bulan: parents[0].wali.penghasilan_per_bulan,
        },
        question: {
          wakaf: parents[0].question.wakaf,
          nominal_wakaf: parents[0].question.nominal_wakaf,
          komitmen_infak: parents[0].question.komitmen_infak,
          nominal_infak: parents[0].question.nominal_infak,
          harapan_ayah_ibu: parents[0].question.harapan_ayah_ibu,
          potensi_ayah_ibu: parents[0].question.potensi_ayah_ibu,
        },
      });
    }
  };

  return (
    <article>
      {/* <h1>{JSON.stringify(parents[0].duplicate_data)}</h1> */}

      {/* {(!parents[indexMurid].duplicate_data && parents[indexMurid].ayah.nama_lengkap == "" ) && ( */}
      {/* {indexMurid > 0 && parents[0].ayah.nama_lengkap !== "" && (
        <CheckBoxComponent
          label="Duplikat Data"
          data-name="duplicateDataOrtu"
          value={parents[indexMurid].duplicate_data}
          checked={parents[indexMurid].duplicate_data}
          cssClass="e-danger absolute -top-[42px] right-0"
          change={handleCheckbox.bind(this)}
        />
      )} */}

      {/* {(indexMurid > 0 && parents[0].ayah.nama_lengkap !== "" ) && (
          <button className="w-auto btn-merah" onClick={handleSubmit}>
            <CgCopy className='mr-2 text-2xl' />
            Duplikat Data
          </button>
        )} */}
      <div style={{ maxWidth: "140vh", overflow: "auto" }}>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", gap: "22px", padding: "10px" }}
        >
          {/* AYAH */}
          {/* COL 1 */}
          <section className="xs:col-span-3 lg:col-span-1 xs:mb-3 lg:mb-0">
            <h1 className="mt-3 text-merah">Pendataan Ayah</h1>
            <p className="text-xs">
              Catatan : Untuk pertanyaan yang terdapat tanda bintang merah (
              <span className="text-merah">*</span>) wajib diisi.
            </p>
          </section>

          {/* COL 2 */}
          <section className="xs:col-span-3 lg:col-span-1 mt-5">
            <TextInput
              label="Nama Lengkap Ayah"
              type="text"
              name="ayah"
              id="nama_lengkap"
              onChange={updateParents}
              value={parent.ayah.nama_lengkap}
              required={true}
            />

            <TextInput
              label="Nomor Ponsel Ayah"
              type="text"
              name="ayah"
              id="nomor_ponsel"
              onChange={updateParents}
              value={parent.ayah.nomor_ponsel}
              required={true}
            />

            <TextInput
              label="Alamat Tempat Tinggal Ayah"
              type="text"
              name="ayah"
              id="alamat"
              onChange={updateParents}
              value={parent.ayah.alamat}
              required={true}
            />

            <TextInput
              label="Tempat Lahir Ayah"
              type="text"
              name="ayah"
              id="tempat_lahir"
              onChange={updateParents}
              value={parent.ayah.tempat_lahir}
              required={true}
            />

            <DropdownDatePickers
              label="Tanggal Lahir Ayah"
              name="ayah"
              id="tanggal_lahir"
              value={parent.ayah.tanggal_lahir}
              change={updateParentsDropDownCal.bind(this)}
            />

            <DropdownListComponents
              required={true}
              name="ayah"
              label="Pendidikan Terakhir"
              placeholder=""
              id="pendidikan_terakhir"
              dataSource={dropdownData.pendidikanTerakhir}
              fields={{ value: "text", text: "text" }}
              value={parent.ayah.pendidikan_terakhir}
              change={updateParentsDropDownCal.bind(this)}
            />

            <TextInput
              label="Perusahaan Tempat Bekerja"
              type="text"
              name="ayah"
              id="perusahaan_tempat_bekerja"
              onChange={updateParents}
              value={parent.ayah.perusahaan_tempat_bekerja}
              required={true}
            />

            <TextInput
              label="Posisi/ Jabatan"
              type="text"
              name="ayah"
              id="posisi_jabatan"
              onChange={updateParents}
              value={parent.ayah.posisi_jabatan}
              required={true}
            />

            <TextInput
              label="Penghasilan Tiap Bulan"
              type="number"
              name="ayah"
              id="penghasilan_per_bulan"
              onChange={updateParents}
              value={parent.ayah.penghasilan_per_bulan}
              required={true}
              min="1"
            />
          </section>

          {/* IBU */}
          {/* COL 1 */}
          <section className="mt-12 xs:col-span-3 lg:col-span-1 xs:mb-3 lg:mb-0 lg:mt-0">
            <h1 className="mt-3 text-merah">Pendataan Ibu</h1>
            <p className="text-xs">
              Catatan : Untuk pertanyaan yang terdapat tanda bintang merah (
              <span className="text-merah">*</span>) wajib diisi.
            </p>
          </section>

          {/* COL 2 */}
          <section className="xs:col-span-3 lg:col-span-1 mt-5">
            <TextInput
              label="Nama Lengkap Ibu"
              type="text"
              name="ibu"
              id="nama_lengkap"
              onChange={updateParents}
              value={parent.ibu.nama_lengkap}
              required={true}
            />

            <TextInput
              label="Nomor Ponsel Ibu"
              type="text"
              name="ibu"
              id="nomor_ponsel"
              onChange={updateParents}
              value={parent.ibu.nomor_ponsel}
              required={true}
            />

            <TextInput
              label="Alamat Tempat Tinggal Ibu"
              type="text"
              name="ibu"
              id="alamat"
              onChange={updateParents}
              value={parent.ibu.alamat}
              required={true}
            />

            <TextInput
              label="Tempat Lahir Ibu"
              type="text"
              name="ibu"
              id="tempat_lahir"
              onChange={updateParents}
              value={parent.ibu.tempat_lahir}
              required={true}
            />

            <DropdownDatePickers
              label="Tanggal Lahir Ibu"
              name="ibu"
              id="tanggal_lahir"
              value={parent.ibu.tanggal_lahir}
              change={updateParentsDropDownCal.bind(this)}
            />

            <DropdownListComponents
              required={true}
              name="ibu"
              label="Pendidikan Terakhir"
              placeholder=""
              id="pendidikan_terakhir"
              dataSource={dropdownData.pendidikanTerakhir}
              fields={{ value: "text", text: "text" }}
              value={parent.ibu.pendidikan_terakhir}
              change={updateParentsDropDownCal.bind(this)}
            />

            <TextInput
              label="Perusahaan Tempat Bekerja"
              type="text"
              name="ibu"
              id="perusahaan_tempat_bekerja"
              onChange={updateParents}
              value={parent.ibu.perusahaan_tempat_bekerja}
              required={true}
            />

            <TextInput
              label="Posisi/ Jabatan"
              type="text"
              name="ibu"
              id="posisi_jabatan"
              onChange={updateParents}
              value={parent.ibu.posisi_jabatan}
              required={true}
            />

            <TextInput
              label="Penghasilan Tiap Bulan"
              type="text"
              name="ibu"
              id="penghasilan_per_bulan"
              onChange={updateParents}
              value={parent.ibu.penghasilan_per_bulan}
              required={true}
              min="1"
            />
          </section>

          {/* WALI */}
          {/* COL 1 */}
          <section className="mt-12 xs:col-span-3 lg:col-span-1 xs:mb-3 lg:mb-0 lg:mt-0">
            <h1 className="mt-3 text-merah">Pendataan Wali</h1>
            <p className="text-xs">
              Catatan : Untuk pertanyaan yang terdapat tanda bintang merah (
              <span className="text-merah">*</span>) wajib diisi.
            </p>
          </section>

          {/* COL 2 */}
          <section className="xs:col-span-3 lg:col-span-1 mt-5">
            <TextInput
              label="Nama Lengkap Wali"
              type="text"
              name="wali"
              id="nama_lengkap"
              onChange={updateParents}
              value={parent.wali.nama_lengkap}
              required={true}
            />

            <TextInput
              label="Nomor Ponsel Wali"
              type="text"
              name="wali"
              id="nomor_ponsel"
              onChange={updateParents}
              value={parent.wali.nomor_ponsel}
              required={true}
            />

            <TextInput
              label="Alamat Tempat Tinggal Wali"
              type="text"
              name="wali"
              id="alamat"
              onChange={updateParents}
              value={parent.wali.alamat}
              required={true}
            />

            <TextInput
              label="Tempat Lahir Wali"
              type="text"
              name="wali"
              id="tempat_lahir"
              onChange={updateParents}
              value={parent.wali.tempat_lahir}
              required={true}
            />

            <DropdownDatePickers
              label="Tanggal Lahir Wali"
              id="tanggal_lahir"
              value={parent.wali.tanggal_lahir}
              change={updateParentsDropDownCal.bind(this)}
            />

            <DropdownListComponents
              required={true}
              name="wali"
              label="Pendidikan Terakhir"
              placeholder=""
              id="pendidikan_terakhir"
              dataSource={dropdownData.pendidikanTerakhir}
              fields={{ value: "text", text: "text" }}
              value={parent.wali.pendidikan_terakhir}
              change={updateParentsDropDownCal.bind(this)}
            />

            <TextInput
              label="Perusahaan Tempat Bekerja"
              type="text"
              name="wali"
              id="perusahaan_tempat_bekerja"
              onChange={updateParents}
              value={parent.wali.perusahaan_tempat_bekerja}
              required={true}
            />

            <TextInput
              label="Posisi/ Jabatan"
              type="text"
              name="wali"
              id="posisi_jabatan"
              onChange={updateParents}
              value={parent.wali.posisi_jabatan}
              required={true}
            />

            <TextInput
              label="Penghasilan Tiap Bulan"
              type="text"
              name="wali"
              id="penghasilan_per_bulan"
              onChange={updateParents}
              value={parent.wali.penghasilan_per_bulan}
              required={true}
              min="1"
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
            to={"/pmb/form-data-murid"}
            className="w-auto pl-0 mx-0 bg-transparent shadow-none btn-merah hover:bg-transparent text-merah hover:text-gelap"
          >
            <BsChevronLeft className="text-xl m-0 mr-2 mt-0.5" /> Kembali
          </Link>

          <Link
            to={"/pmb/form-pernyataan"}
            className={`${
              openForm == "form_ortu_identitas" &&
              "pointer-events-none text-gray-300"
            } w-auto pr-0 mx-0 bg-transparent shadow-none btn-merah hover:bg-transparent text-merah hover:text-gelap`}
          >
            Selanjutnya <BsChevronRight className="text-xl ml-2 mt-0.5" />
          </Link>
        </div>
      </section>
    </article>
  );
};
export default FormDaftarOrangTua;
