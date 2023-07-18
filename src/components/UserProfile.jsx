import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineCancel, MdVerified } from "react-icons/md";
import { Button } from ".";
import { userProfileData } from "../data/initData";
import { useStateContext } from "../contexts/ContextProvider";
import avatar from "../data/product1.jpg";
import logoSaim from "../data/logo-saim.png";
import useAuth from "../hooks/useAuth";

const UserProfile = () => {
  const { auth, setAuth } = useAuth();
  const verified = JSON.parse(localStorage.getItem("VERIFIED"));
  const {
    setIsClicked,
    initialState,
    setIsLoading,
    setErr,
    setErrStep,
    setErrMsg,
    setOpenForm,
  } = useStateContext();

  const handleLogout = async () => {
    console.log("LOG OUT");
    localStorage.clear();
    setAuth("");
    setIsClicked(initialState);
    setIsLoading(false);
    setErrMsg("");
    setErrStep("");
    setOpenForm("");
  };

  return (
    <div className="nav-item absolute right-6 top-16 bg-white dark:bg-[#42464D] p-7 rounded-lg w-320 drop-shadow-2xl">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold dark:text-gray-200">Profil</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="merah"
          textHoverColor="putih"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex items-center gap-2 pb-6 mt-6 border-color border-b-1">
        <img
          className=" w-16 h-16 rounded-full bg-soft p-1"
          src={logoSaim}
          alt="user-profile"
        />
        <div>
          <p className="text-sm font-bold capitalize break-all dark:text-gray-200">
            {auth.nama}
          </p>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
            {auth.role}
          </p>
          <p className="flex text-xs text-gray-500 break-all dark:text-gray-400">
            {auth.email}
            <MdVerified
              className={`text-green text-md ${
                !verified ? "text-gray-500" : "text-green-500"
              } ml-0.5`}
            />
          </p>
        </div>
      </div>
      <div>
        {userProfileData.map((item, index) => (
          <div
            key={index}
            className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]"
          >
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className="p-3 text-xl rounded-lg hover:bg-light-gray"
            >
              {item.icon}
            </button>

            <div>
              <p className="font-semibold dark:text-gray-200 ">{item.title}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {" "}
                {item.desc}{" "}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Link onClick={handleLogout} className="mt-5 btn-merah">
        Log Out
      </Link>
    </div>
  );
};

export default UserProfile;
