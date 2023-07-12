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

  // const verified = stepsPMB.register.details.verified;
  // const status = stepsPMB.register_payment.status;
  // const message = stepsPMB.register.details.message;

  return (
    <>
      <FormDaftarOrangTua key={indexMurid} indexMurid={indexMurid} />
      {/* {verified && status == "Berhasil" ? */}
      {/* <TabComponent heightAdjustMode="None" selected={tabSelected}>
        <TabItemsDirective>
          {parents?.map(({ id }, index) => (
            <TabItemDirective
              key={id}
              header={headertext[index]}
              content={tabContent}
            />
          ))}
        </TabItemsDirective>
      </TabComponent> */}
    </>
  );
};
export default FormOrangTua;
