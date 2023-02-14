import { useState, useEffect, useRef } from 'react';
import { BsBarChartSteps } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { Header } from '../../components';
import InfoTahapanPMB from '../../components/InfoTahapanPMB';
import ModalTahapanPMB from '../../components/ModalTahapanPMB';
import { useStateContext } from '../../contexts/ContextProvider';

const TahapanPMB = () => {
  const { stepsPMB, setStepsPMB, getStepsPMBData, errStep, formCheck, getFormCheck } = useStateContext();

  useEffect(() => {
    getStepsPMBData();
    console.log("STEPS PMB DATA FROM CONTEXT === ", stepsPMB)
    getFormCheck();
    console.log("getFormCheck === ", formCheck)
  },[])

  const [selected, setSelected] = useState({
    step: "",
    status: "",
    details: {}
  });
  
  const handleSelected = (index, keyName, details) => {
    console.log("DETAILS === ", details)
    setSelected({
      step: index,
      status: keyName,
      details: details
    });
  }

  return (
    <div id="target" className='relative'>
      <Header category="PMB" title={`Tahapan Penerimaan Murid Baru`} icon={<BsBarChartSteps />} />

      {/* MESSAGES */}
      {/* <div className={stepsPMB.register.details.message ? "px-4 py-3 mb-3 rounded-md text-merah text-sm bg-red-100 relative" : "hidden"} aria-live="assertive" role="alert">
        <p className="flex gap-2"><FaTimesCircle className='my-1' /> {stepsPMB.register.details.message}</p>
      </div> */}

      <div>
        <article className='grid grid-rows-3 gap-6 md:grid-flow-col xs:grid-cols-1 md:grid-cols-2 mt-7'>
          {Object.keys(stepsPMB).map((keyName, index) => (
            <motion.div 
              layoutId={index+1} 
              key={index+1}
            >
              <InfoTahapanPMB 
                onClick={() => {handleSelected(index+1, stepsPMB[keyName].status, stepsPMB[keyName].details)}} 
                step={index+1} 
                status={stepsPMB[keyName].status} 
              />
            </motion.div>
          ))}
        </article>
        <ModalTahapanPMB selected={selected.step} setSelected={setSelected} step={selected.step} status={selected.status} details={selected.details} />
      </div>
    </div>
  )
};
export default TahapanPMB;