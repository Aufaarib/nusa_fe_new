import { useState, useEffect } from "react";
import {
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from "@syncfusion/ej2-react-navigations";
import { FiAlertTriangle } from "react-icons/fi";
import { AiFillFileText } from "react-icons/ai";
import FormBerkasPendaftaran from "../../components/FormBerkasPendaftaran";
import { Header } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { FileUpload } from "../../components/FileUpload";

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

  const [file_name, setFileName] = useState("");

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
      <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
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
      </div>

      {/* 
      <Header
        category="PMB"
        title="Form Berkas Pendaftaran"
        icon={<AiFillFileText />}
      /> */}
      {/* MESSAGES */}
      {/* <div className={!verified ? "px-4 py-3 mb-3 rounded-md text-merah text-sm bg-red-100 relative" : "hidden"} aria-live="assertive" role="alert">
        <p className="flex gap-2"><FiAlertTriangle className='my-1' />{message}</p>
      </div>

      <div className={errStep ? "px-4 py-3 mb-3 rounded-md text-merah text-sm bg-red-100 relative" : "hidden"} aria-live="assertive" role="alert">
        <p className="flex gap-2"><FiAlertTriangle className='my-1' /> {errStep}</p>
      </div> */}
      {/* {verified && status == "Berhasil" ? */}
      {/* <TabComponent heightAdjustMode="None" selected={tabSelected}>
        <TabItemsDirective>
          {documents?.map(({ id }, index) => (
            <TabItemDirective
              key={id}
              header={headertext[index]}
              content={tabContent}
            />
          ))}
        </TabItemsDirective>
      </TabComponent> */}
      {/* :
        <></>
      } */}
    </>
  );
};
export default BerkasPendaftaran;
