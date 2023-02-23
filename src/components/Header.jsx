import React from 'react';

const Header = ({ category, title, icon }) => (
  <div className="mb-10 ">
    <h4 className=" text-merah">{category}</h4>
    <h1 className="inline-block xs:text-xl md:text-2xl lg:text-3xl placeholder:tracking-tight text-hitam ">
      <span className='mr-2 xs:hidden md:inline-block'>{icon}</span> 
      {title}
    </h1>
  </div>
);

export default Header;
// 