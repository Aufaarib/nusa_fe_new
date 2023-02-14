import React from 'react';
import { useStateContext } from '../contexts/ContextProvider';

const Footer = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();
  
  return (
    <div className="dark:text-gray-200 text-white text-center p-3" style={{ backgroundColor: currentColor }}>
      © 2022. PT. Nafisha Universal Network
    </div>
  )
};

export default Footer;
