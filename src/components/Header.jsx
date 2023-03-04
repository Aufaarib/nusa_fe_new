import React from 'react';

const Header = ({ category, title, icon }) => (
  <div style={{ borderBottom : "2px solid gray", marginBottom : "20px" }}>
    <div className="mb-2">
      <p className="text-merah">{category}</p>
      <h1 className="inline-block xs:text-xl md:text-2xl lg:text-3xl placeholder:tracking-tight text-hitam ">
        <span className='mr-2 xs:hidden md:inline-block'>{icon}</span> 
        {title}
      </h1>
    </div>
  </div>
);

export default Header;
