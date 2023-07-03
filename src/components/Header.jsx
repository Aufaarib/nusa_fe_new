import { Breadcrumbs, Link, Typography } from "@mui/material";
import React from "react";

const Header = ({ home, prev, at, navHome, navePrev, title, icon }) => (
  <div style={{ borderBottom: "1px solid gray", marginBottom: "10px" }}>
    <div style={{ marginBottom: "20px" }}>
      <Breadcrumbs>
        <Typography fontSize="14px" color="gray" href={navHome}>
          {home}
        </Typography>
        {prev && (
          <Link fontSize="14px" underline="hover" color="gray" href={navePrev}>
            {prev}
          </Link>
        )}
        {at && (
          <Typography fontSize="14px" color="gray">
            {at}
          </Typography>
        )}
      </Breadcrumbs>
      <h1 className=" mt-3 xs:text-xl md:text-2xl lg:text-3xl placeholder:tracking-tight text-hitam ">
        <span className="xs:hidden md:inline-block">{icon}</span>
        {title}
      </h1>
    </div>
  </div>
);

export default Header;
