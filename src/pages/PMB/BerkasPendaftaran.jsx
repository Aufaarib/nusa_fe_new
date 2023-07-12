import { useState, useEffect } from "react";
import {
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from "@syncfusion/ej2-react-navigations";
import { FiAlertTriangle } from "react-icons/fi";
import { AiFillFileText, AiOutlineSave } from "react-icons/ai";
import FormBerkasPendaftaran from "../../components/FormBerkasPendaftaran";
import { Header } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { FileUpload } from "../../components/FileUpload";
import { MdVerified } from "react-icons/md";
import { UploaderComponent } from "@syncfusion/ej2-react-inputs";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";
import { BsChevronLeft } from "react-icons/bs";

const BerkasPendaftaran = () => {
  // const {
  //   documents,
  //   getDocumentsData,
  //   setErrMsg,
  //   errStep,
  //   stepsPMB,
  //   getStepsPMBData,
  //   formCheck,
  //   getFormCheck,
  // } = useStateContext();
  // const [indexMurid, setIndexMurid] = useState(0);

  // const [file_name, setFileName] = useState("");
  const token = localStorage.getItem("TOKEN");
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
    // saveUrl: BASE_URL + `/api/pmb/document`,
    removeUrl: "https://ej2.syncfusion.com/services/api/uploadbox/Remove",
  };
  function onRemoveFile(args) {
    args.postRawFile = false;
  }
  function onFileUpload(args) {
    console.log("UPLOADING..");
    // args.customFormData = [{ id: documents.id }];
    args.currentRequest.setRequestHeader("Authorization", `Bearer ${token}`);
  }
  function onSuccess(args) {
    getDocumentsData();
    console.log("SUCCESS");
  }

  let minFileSize = 1000;
  let maxFileSize = 1000000;

  // useEffect(() => {
  //   L1io.load({
  //     "id-BAHASA": {
  //       uploader: {
  //         Browse: "Cari Berkas",
  //         Clear: "Bersihkan",
  //         Upload: "Unggah",
  //         cancel: "Batal",
  //         delete: "Hapus Berkas",
  //         dropFilesHint: "atau taruh Berkas disini",
  //         inProgress: "Mengunduh",
  //         invalidFileType: "Tipe berkas tidak diperbolehkan",
  //         invalidMaxFileSize: `Ukuran berkas melebihi ${
  //           maxFileSize * 0.000001
  //         } MB`,
  //         invalidMinFileSize: `Ukuran file terlalu kecil! Harap unggah file dengan ukuran minimal ${
  //           maxFileSize * 0.000001
  //         } KB`,
  //         readyToUploadMessage: "Siap mengunggah",
  //         remove: "Hapus",
  //         removedFailedMessage: "Berkas tidak dapat dihapus",
  //         removedSuccessMessage: "Berkas berhasil dihapus",
  //         uploadFailedMessage: "Gagal mengunggah berkas",
  //         uploadSuccessMessage: "Berkas berhasil diunggah",
  //       },
  //     },
  //   });
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // try {
    //   const response = await axios.post(SUBMIT_URL, null, {
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
    //   setIsLoading(false);
    //   setSuccessMsg("Data berhasil disimpan");
    //   setErrMsg("");
    //   console.log("RESPONSE ==== " + JSON.stringify(response?.data));
    //   getFormCheck();
    //   console.log("getFormCheck === ", formCheck);
    // } catch (err) {
    //   const errors = err?.response?.data.errors;
    //   console.error("ERROR === ", errors);
    //   setErrMsg(errors);
    //   setIsLoading(false);
    // }
  };

  function getExtension(filename) {
    return filename.split(".").pop();
  }

  let akte_kelahiran = documents.akte_kelahiran;
  let kartu_keluarga = documents.kartu_keluarga;
  let rapor = documents.rapor;
  let foto = documents.foto;

  // let name_akte_kelahiran = akte_kelahiran.replace(/\.[^/.]+$/, "");
  // let name_kartu_keluarga = kartu_keluarga.replace(/\.[^/.]+$/, "");
  // let name_rapor = rapor.replace(/\.[^/.]+$/, "");
  // let name_foto = foto.replace(/\.[^/.]+$/, "");

  // let foto_extension = getExtension(documents.foto);

  // useEffect(() => {
  //   getStepsPMBData();
  //   console.log("DOCUMENTS DATA FROM CONTEXT === ", documents);
  //   getDocumentsData();
  //   getFormCheck();
  //   console.log("getFormCheck === ", formCheck);
  // }, []);

  // let headertext;
  // // Mapping Tab items Header property
  // headertext = [{ text: "Murid 1" }, { text: "Murid 2" }, { text: "Murid 3" }];

  // const tabContent = () => {
  //   return (
  //     <FormBerkasPendaftaran
  //       key={indexMurid.toString()}
  //       indexMurid={indexMurid}
  //     />
  //   );
  // };

  // const tabSelected = (e) => {
  //   console.log(e);
  //   setIndexMurid(e.selectedIndex);
  //   setErrMsg("");
  // };

  // const verified = stepsPMB.register.details.verified;
  // const status = stepsPMB.register_payment.status;
  // const message = stepsPMB.register.details.message;

  return (
    <>
      <Header
        home="PMB"
        // prev="Bank"
        // navePrev={path}
        at="Berkas Pendaftaran"
        title="Form Berkas Pendaftaran"
      />
      {/* <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <span>
            Akta Kelahiran <span className="ml-1 text-merah mr-4">*</span>
          </span>
          <input
            type="file"
            id="images"
            name="Cari File"
            accept="pdf/*"
            required={true}
            onChange={(e) => setFileName(e.target.value)}
          />

          <span>
            Kartu Keluarga <span className="ml-1 text-merah mr-4">*</span>
          </span>
          <input
            type="file"
            id="images"
            name="Cari File"
            accept="pdf/*"
            required={true}
            onChange={(e) => setFileName(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginLeft: "100px",
          }}
        >
          <span>
            Rapor <span className="ml-1 text-merah mr-4">*</span>
          </span>
          <input
            type="file"
            id="images"
            name="Cari File"
            accept="pdf/*"
            required={true}
            onChange={(e) => setFileName(e.target.value)}
          />
          <span>
            Foto 3x4 <span className="ml-1 text-merah mr-4">*</span>
          </span>
          <input
            type="file"
            id="images"
            name="Cari File"
            accept="pdf/*"
            required={true}
            onChange={(e) => setFileName(e.target.value)}
          />
        </div>
      </div> */}

      <article>
        <div className="grid mt-3 xs:grid-cols-1 md:grid-cols-2 gap-7">
          {/* COL 1 */}
          <section>
            <label htmlFor="akte_kelahiran" className="block mt-4 mb-1">
              Akte Kelahiran{" "}
              {/* {!akte_kelahiran ? (
                <span className="ml-1 text-merah">*</span>
              ) : (
                <span>
                  <MdVerified className="inline-block text-md text-green-600 ml-0.5 mb-1" />{" "}
                  <strong className="text-green-600 text">
                    Sudah Diunggah
                  </strong>
                </span>
              )} */}
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
              {/* {!kartu_keluarga ? (
                <span className="ml-1 text-merah">*</span>
              ) : (
                <span>
                  <MdVerified className="inline-block text-md text-green-600 ml-0.5 mb-1" />{" "}
                  <strong className="text-green-600 text">
                    Sudah Diunggah
                  </strong>
                </span>
              )} */}
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
                  <strong className="text-green-600 text">
                    Sudah Diunggah
                  </strong>
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
                  <strong className="text-green-600 text">
                    Sudah Diunggah
                  </strong>
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
    </>
  );
};
export default BerkasPendaftaran;
