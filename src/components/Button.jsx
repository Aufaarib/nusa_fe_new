import React from 'react';

import { useStateContext } from '../contexts/ContextProvider';

const Button = ({ icon, bgColor, color, bgHoverColor, textHoverColor, size, text, borderRadius, width, mt, mb, ml, mr }) => {
  const { setIsClicked, initialState } = useStateContext();

  return (
    <button
      type="button"
      onClick={() => setIsClicked(initialState)}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={`text-${size} mt-${mt} mb-${mb} mt-${ml} mb-${mr} p-2.5 w-${width} rounded-md text-putih hover:text-${textHoverColor} hover:drop-shadow-xl hover:bg-gelap hover:bg-${bgHoverColor}`}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
