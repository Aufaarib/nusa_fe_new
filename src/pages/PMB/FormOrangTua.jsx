import { useState, useEffect } from "react";
import {
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from "@syncfusion/ej2-react-navigations";
import { FiAlertTriangle } from "react-icons/fi";
import { RiParentFill } from "react-icons/ri";
import FormDaftarOrangTua from "../../components/FormDaftarOrangTua";
import { Header } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";

const FormOrangTua = () => {
  const {
    parents,
    getParentsData,
    setErrMsg,
    errStep,
    stepsPMB,
    getStepsPMBData,
    formCheck,
    getFormCheck,
  } = useStateContext();
  const [indexMurid, setIndexMurid] = useState(0);

  useEffect(() => {
    getStepsPMBData();
    console.log("PARENTS DATA FROM CONTEXT === ", parents);
    getParentsData();
    getFormCheck();
    console.log("getFormCheck === ", formCheck);
  }, []);

  let headertext;
  // Mapping Tab items Header property
  headertext = [
    { text: "Murid 1" },
    { text: "Murid 2" },
    { text: "Murid 3" },
    { text: "Murid 4" },
    { text: "Murid 5" },
    { text: "Murid 6" },
    { text: "Murid 7" },
  ];

  const tabContent = () => {
    return <FormDaftarOrangTua key={indexMurid} indexMurid={indexMurid} />;
  };

  const tabSelected = (e) => {
    setIndexMurid(e.selectedIndex);
    setErrMsg("");
  };

  const verified = stepsPMB.register.details.verified;
  const status = stepsPMB.register_payment.status;
  const message = stepsPMB.register.details.message;

  return (
    <>
      <Header
        home="PMB"
        // prev="Bank"
        // navePrev={path}
        at="Pendataan Orang Tua"
        title="Form Pendataan Orang Tua"
      />

      {/* <Header
        category="PMB"
        title="Form Pendataan Orang Tua"
        icon={<RiParentFill />}
      /> */}

      {/* MESSAGES */}
      {/* <div
        className={
          !verified
            ? "px-4 py-3 mb-3 rounded-md text-merah text-sm bg-red-100 relative"
            : "hidden"
        }
        aria-live="assertive"
        role="alert"
      >
        <p className="flex gap-2">
          <FiAlertTriangle className="my-1" />
          {message}
        </p>
      </div>

      <div
        className={
          errStep
            ? "px-4 py-3 mb-3 rounded-md text-merah text-sm bg-red-100 relative"
            : "hidden"
        }
        aria-live="assertive"
        role="alert"
      >
        <p className="flex gap-2">
          <FiAlertTriangle className="my-1" /> {errStep}
        </p>
      </div> */}

      {/* {verified && status == "Berhasil" ? */}
      <TabComponent heightAdjustMode="None" selected={tabSelected}>
        <TabItemsDirective>
          {parents?.map(({ id }, index) => (
            <TabItemDirective
              key={id}
              header={headertext[index]}
              content={tabContent}
            />
          ))}
        </TabItemsDirective>
      </TabComponent>
      {/* :
        <></>
      } */}
    </>
  );
};
export default FormOrangTua;
