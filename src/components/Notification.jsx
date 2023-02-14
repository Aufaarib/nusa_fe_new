import React, { useEffect } from 'react';
import { MdOutlineCancel } from 'react-icons/md';

import { Button } from '.';
import { notifData } from '../data/initData';
import { useStateContext } from '../contexts/ContextProvider';

const Notification = ({ notificationData, unreadTotal, newNotif }) => {
  const { currentColor, getNotifications, notifications } = useStateContext();

  useEffect(() => {
    setTimeout(() => getNotifications(1), 500);
  }, []);

  return (
    <div className="nav-item absolute right-6 top-16 bg-white dark:bg-[#42464D] p-7 rounded-lg w-320 drop-shadow-2xl">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <p className="text-lg font-semibold dark:text-gray-200">Notifikasi</p>
          {unreadTotal ? <button type="button" className="w-6 h-6 text-xs rounded-full text-putih bg-merah">{unreadTotal}</button> : ''}
        </div>
        <Button icon={<MdOutlineCancel />} color="rgb(153, 171, 180)" bgHoverColor="merah" textHoverColor="putih" size="2xl" borderRadius="50%" />
      </div>
      <div className="mt-5 ">
        {notificationData?.map((item, index) => (
          <div key={index} className="flex items-center gap-3 p-3 leading-8 border-b-1 border-color">
            {/* <img className="w-12 h-12 rounded-full" src={item.image} alt={item.message} /> */}
            <div>
              <p className={`text-sm ${item.read_at === null ? 'font-bold' : ''} dark:text-gray-200`}>{item.data.title}</p>
              {/* <p className="text-sm text-gray-500 dark:text-gray-400"> {item.data.title} </p> */}
            </div>
          </div>
        ))}
        {/* <div className="mt-5">
          <Button color="white" bgColor={currentColor} text="Lihat semua notifikasi" borderRadius="10px" width="full" />
        </div> */}
      </div>  
    </div>
  );
};

export default Notification;
