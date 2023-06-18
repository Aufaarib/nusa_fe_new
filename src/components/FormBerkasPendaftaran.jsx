import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineSave } from "react-icons/ai";
import { CgSpinner } from "react-icons/cg";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import { L10n } from "@syncfusion/ej2-base";
import {
  UploaderComponent,
  FilesDirective,
  UploadedFilesDirective,
} from "@syncfusion/ej2-react-inputs";
import axios from "../api/axios";

import { useStateContext } from "../contexts/ContextProvider";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const SUBMIT_URL = "/api/pmb/submit";

const FormBerkasPendaftaran = ({ id, indexMurid }) => {
  const token = JSON.parse(localStorage.getItem("TOKEN"));
  const {
    documents,
    setDocuments,
    getDocumentsData,
    errMsg,
    setErrMsg,
    setSuccessMsg,
    formCheck,
    getFormCheck,
  } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);

  // Uploader component
  let uploadObj;
  let asyncSettings;
  let dropContainerRef;
  let dropContainerEle;
  dropContainerEle = null;
  dropContainerRef = (element) => {
    dropContainerEle = element;
  };
  asyncSettings = {
    saveUrl: BASE_URL + `/api/pmb/document`,
    removeUrl: "https://ej2.syncfusion.com/services/api/uploadbox/Remove",
  };
  function onRemoveFile(args) {
    args.postRawFile = false;
  }
  function onFileUpload(args) {
    console.log("UPLOADING..");
    args.customFormData = [{ id: documents[indexMurid].id }];
    args.currentRequest.setRequestHeader("Authorization", `Bearer ${token}`);
  }
  function onSuccess(args) {
    getDocumentsData();
    console.log("SUCCESS");
  }

  let minFileSize = 1000;
  let maxFileSize = 1000000;

  useEffect(() => {
    L10n.load({
      "id-BAHASA": {
        uploader: {
          Browse: "Cari Berkas",
          Clear: "Bersihkan",
          Upload: "Unggah",
          cancel: "Batal",
          delete: "Hapus Berkas",
          dropFilesHint: "atau taruh Berkas disini",
          inProgress: "Mengunduh",
          invalidFileType: "Tipe berkas tidak diperbolehkan",
          invalidMaxFileSize: `Ukuran berkas melebihi ${
            maxFileSize * 0.000001
          } MB`,
          invalidMinFileSize: `Ukuran file terlalu kecil! Harap unggah file dengan ukuran minimal ${
            maxFileSize * 0.000001
          } KB`,
          readyToUploadMessage: "Siap mengunggah",
          remove: "Hapus",
          removedFailedMessage: "Berkas tidak dapat dihapus",
          removedSuccessMessage: "Berkas berhasil dihapus",
          uploadFailedMessage: "Gagal mengunggah berkas",
          uploadSuccessMessage: "Berkas berhasil diunggah",
        },
      },
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(SUBMIT_URL, null, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setIsLoading(false);
      setSuccessMsg("Data berhasil disimpan");
      setErrMsg("");
      console.log("RESPONSE ==== " + JSON.stringify(response?.data));
      getFormCheck();
      console.log("getFormCheck === ", formCheck);
    } catch (err) {
      const errors = err?.response?.data.errors;
      console.error("ERROR === ", errors);
      setErrMsg(errors);
      setIsLoading(false);
    }
  };

  function getExtension(filename) {
    return filename.split(".").pop();
  }

  let akte_kelahiran = documents[indexMurid].akte_kelahiran;
  let kartu_keluarga = documents[indexMurid].kartu_keluarga;
  let rapor = documents[indexMurid].rapor;
  let foto = documents[indexMurid].foto;

  let name_akte_kelahiran = akte_kelahiran.replace(/\.[^/.]+$/, "");
  let name_kartu_keluarga = kartu_keluarga.replace(/\.[^/.]+$/, "");
  let name_rapor = rapor.replace(/\.[^/.]+$/, "");
  let name_foto = foto.replace(/\.[^/.]+$/, "");

  let foto_extension = getExtension(documents[indexMurid].foto);

  return (
    <article>
      <div className="grid mt-3 xs:grid-cols-1 md:grid-cols-2 gap-7">
        {/* COL 1 */}
        <section>
          <label htmlFor="akte_kelahiran" className="block mt-4 mb-1">
            Akte Kelahiran{" "}
            {!akte_kelahiran ? (
              <span className="ml-1 text-merah">*</span>
            ) : (
              <span>
                <MdVerified className="inline-block text-md text-green-600 ml-0.5 mb-1" />{" "}
                <strong className="text-green-600 text">Sudah Diunggah</strong>
              </span>
            )}
          </label>
          {/* <div className="flex items-center justify-center e-upload e-control-wrapper e-lib e-keyboard h-14">
              THUMBNAIL
            </div> */}
          <UploaderComponent
            id="akte_kelahiran"
            type="file"
            ref={(scope) => {
              uploadObj = scope;
            }}
            asyncSettings={asyncSettings}
            removing={onRemoveFile.bind(this)}
            uploading={onFileUpload.bind(this)}
            success={onSuccess.bind(this)}
            locale="id-BAHASA"
            allowedExtensions=".pdf"
            minFileSize={minFileSize}
            maxFileSize={maxFileSize}
            multiple={false}
            buttons={{
              browse: !akte_kelahiran ? "Unggah Berkas" : "Ganti Berkas",
            }}
          >
            {/* <FilesDirective>
								<UploadedFilesDirective name={akte_kelahiran} size={25000} type=".pdf"></UploadedFilesDirective>
							</FilesDirective> */}
          </UploaderComponent>
          <small className=" text-gray-400">
            <i>Jenis berkas: .pdf</i>
          </small>
        </section>

        {/* COL 2 */}
        <section>
          <label htmlFor="akte_kelahiran" className="block mt-4 mb-1">
            Kartu Keluarga{" "}
            {!kartu_keluarga ? (
              <span className="ml-1 text-merah">*</span>
            ) : (
              <span>
                <MdVerified className="inline-block text-md text-green-600 ml-0.5 mb-1" />{" "}
                <strong className="text-green-600 text">Sudah Diunggah</strong>
              </span>
            )}
          </label>
          <UploaderComponent
            id="kartu_keluarga"
            type="file"
            ref={(scope) => {
              uploadObj = scope;
            }}
            asyncSettings={asyncSettings}
            removing={onRemoveFile.bind(this)}
            uploading={onFileUpload.bind(this)}
            success={onSuccess.bind(this)}
            locale="id-BAHASA"
            allowedExtensions=".pdf"
            minFileSize={minFileSize}
            maxFileSize={maxFileSize}
            multiple={false}
            buttons={{
              browse: !kartu_keluarga ? "Unggah Berkas" : "Ganti Berkas",
            }}
          >
            {/* <FilesDirective>
								<UploadedFilesDirective name={kartu_keluarga} size={25000} type=".pdf"></UploadedFilesDirective>
							</FilesDirective> */}
          </UploaderComponent>
          <small className=" text-gray-400">
            <i>Jenis berkas: .pdf</i>
          </small>
        </section>

        {/* COL 3 */}
        <section>
          <label htmlFor="akte_kelahiran" className="block mt-4 mb-1">
            Rapor{" "}
            {!rapor ? (
              <span className="ml-1 text-merah">*</span>
            ) : (
              <span>
                <MdVerified className="inline-block text-md text-green-600 ml-0.5 mb-1" />{" "}
                <strong className="text-green-600 text">Sudah Diunggah</strong>
              </span>
            )}
          </label>
          <UploaderComponent
            id="rapor"
            type="file"
            ref={(scope) => {
              uploadObj = scope;
            }}
            asyncSettings={asyncSettings}
            removing={onRemoveFile.bind(this)}
            uploading={onFileUpload.bind(this)}
            success={onSuccess.bind(this)}
            locale="id-BAHASA"
            allowedExtensions=".pdf"
            minFileSize={minFileSize}
            maxFileSize={maxFileSize}
            multiple={false}
            buttons={{
              browse: !akte_kelahiran ? "Unggah Berkas" : "Ganti Berkas",
            }}
          >
            {/* <FilesDirective>
								<UploadedFilesDirective name={rapor} size={25000} type=".pdf"></UploadedFilesDirective>
							</FilesDirective> */}
          </UploaderComponent>
          <small className=" text-gray-400">
            <i>Jenis berkas: .pdf</i>
          </small>
        </section>

        {/* COL 4 */}
        <section>
          <label htmlFor="akte_kelahiran" className="block mt-4 mb-1">
            Pas Foto 3x4{" "}
            {!foto ? (
              <span className="ml-1 text-merah">*</span>
            ) : (
              <span>
                <MdVerified className="inline-block text-md text-green-600 ml-0.5 mb-1" />{" "}
                <strong className="text-green-600 text">Sudah Diunggah</strong>
              </span>
            )}
          </label>
          <UploaderComponent
            id="foto"
            type="file"
            ref={(scope) => {
              uploadObj = scope;
            }}
            asyncSettings={asyncSettings}
            removing={onRemoveFile.bind(this)}
            uploading={onFileUpload.bind(this)}
            success={onSuccess.bind(this)}
            locale="id-BAHASA"
            allowedExtensions=".jpg,.png,.jpeg"
            minFileSize={minFileSize}
            maxFileSize={maxFileSize}
            multiple={false}
            buttons={{ browse: !foto ? "Unggah Berkas" : "Ganti Berkas" }}
          >
            {/* <FilesDirective>
								<UploadedFilesDirective name={name_foto} size={25000} type={foto_extension}></UploadedFilesDirective>
							</FilesDirective> */}
          </UploaderComponent>
          <small className=" text-gray-400">
            <i>Jenis berkas: .jpg, .png</i>
          </small>
        </section>
      </div>

      <section className="flex mt-12">
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

        <div className="flex justify-end w-full">
          <Link
            to={"/pmb/form-pernyataan"}
            className="w-auto pl-0 mx-0 bg-transparent shadow-none btn-merah hover:bg-transparent text-merah hover:text-gelap"
          >
            <BsChevronLeft className="text-xl m-0 mr-2 mt-0.5" /> Kembali
          </Link>

          {/* <Link to={"/berkas-pendaftaran"} className="w-auto pr-0 mx-0 bg-transparent shadow-none btn-merah hover:bg-transparent text-merah hover:text-gelap">
              Selanjutnya <BsChevronRight className='text-xl ml-2 mt-0.5' />
            </Link> */}
        </div>
      </section>
    </article>
  );
};
export default FormBerkasPendaftaran;
