import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { BsSearch } from 'react-icons/bs';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import avatar from '../data/product1.jpg';
import logoSaim from '../data/logo-saim.png';

import { Notification, UserProfile } from '.';
import { useStateContext } from '../contexts/ContextProvider';
import useAuth from "../hooks/useAuth";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative p-3 text-xl rounded-full hover:bg-soft"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex w-2 h-2 rounded-full right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const role = JSON.parse(localStorage.getItem('ROLE'));
  const { auth, setAuth } = useAuth();
  const { currentColor, activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize, getNotifications, notifications, notificationNew, notificationUnreadLength, listenBroadcast } = useStateContext();
  const notifDotColor = notificationNew ? currentColor : '';

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  useEffect(() => {
    getNotifications();
    // console.log("getNotifications === ", notifications);
    listenBroadcast();
  }, []);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="relative flex justify-between p-4 pr-7 ">
      <NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu />} />
      {/* <div className='flex items-center w-full px-4 ml-3 mr-3 bg-white rounded-md'>
        <BsSearch className='mr-3' />
        <input type={"search"} placeholder="Pencarian..." className='w-full text-base text-black bg-transparent focus:outline-none' />
      </div> */}

      <div className="flex">
        {role !== "Admin PMB" && (<NavButton title="Notifikasi" dotColor={notifDotColor} customFunc={() => handleClick('notification')} color={currentColor} icon={<RiNotification3Line />} />)}
        <TooltipComponent content="Profil" position="BottomCenter">
          <div
            className="flex items-center w-full h-12 gap-2 p-1 rounded-full cursor-pointer lg:pr-4 hover:bg-soft "
            onClick={() => handleClick('userProfile')}
          >
            <img
              className="w-10 h-10 p-1 bg-white rounded-full "
              src={logoSaim}
              alt="user-profile"
            />
            <p className='w-full font-bold text-black capitalize xs:hidden lg:block bloxk text-14 whitespace-nowrap'><span className='text-merah'>Ahlan, </span> {auth.nama}</p>
            {/* <MdKeyboardArrowDown className="text-gray-400 text-14" /> */}
          </div>
        </TooltipComponent>

        {isClicked.notification && (<Notification notificationData={notifications} unreadTotal={notificationUnreadLength} newNotif={notificationNew} />)}
        {isClicked.userProfile && (<UserProfile />)}
      </div>
    </div>
  );
};

export default Navbar;
