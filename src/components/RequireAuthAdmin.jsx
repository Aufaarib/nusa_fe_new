import React, { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { FaTimesCircle, FaRegCheckCircle } from "react-icons/fa";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { ToastComponent } from "@syncfusion/ej2-react-notifications";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ThemeSettings from "./ThemeSettings";

import { useStateContext } from "../contexts/ContextProvider";
import useAuth from "../hooks/useAuth";

const RequireAuthAdmin = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
    errMsg,
    setErrMsg,
    successMsg,
    setSuccessMsg,
    successMsgSendVerify,
    setSuccessMsgSendVerify,
  } = useStateContext();

  const { auth, setAuth } = useAuth();
  const location = useLocation();

  // const nama = JSON.parse(localStorage.getItem('NAMA'));
  // const role = JSON.parse(localStorage.getItem('ROLE'));
  // const email = JSON.parse(localStorage.getItem('EMAIL'));
  // const token = JSON.parse(localStorage.getItem('TOKEN'));
  // const verified = localStorage.getItem('VERIFIED');
  const nama = localStorage.getItem("NAMA");
  const role = localStorage.getItem("ROLE");
  const email = localStorage.getItem("EMAIL");

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
    // setAuth({ nama, role, email, token, verified });
    setAuth({ nama, role, email });
  }, []);

  useEffect(() => {
    setTimeout(
      function () {
        setSuccessMsg("");
        setSuccessMsgSendVerify("");
      }.bind(this),
      7000
    );
  }, [successMsg, successMsgSendVerify]);

  // console.log("AUTH TOKEN === ", token)

  // let toastObj;
  // let position = { X: 'Center', Y: 'Bottom' };
  // function create() {
  //   setTimeout(function () {
  //     toastObj.show({
  //         title: 'Adaptive Tiles Meeting', content: 'Conference Room 01 / Building 135 10:00 AM',
  //         icon: <FaTimesCircle/>
  //     });
  //   }.bind(this), 200);
  // }
  // function hideBtnClick() {
  //   toastObj.hide('All');
  // }
  // function showBtnClick() {
  //   toastObj.show();
  // }
  // function onclose(e) {
  //   if (e.toastContainer.childElementCount === 0) {
  //       toastBtnHide.element.style.display = 'none';
  //   }
  // }
  // function onbeforeOpen() {
  //   toastBtnHide.element.style.display = 'inline-block';
  // }
  // function rendereComplete() {
  //   document.addEventListener('click', function (e) {
  //       if (!isNullOrUndefined(toastObj) && e.target !== toastBtnShow.element) {
  //           toastObj.hide('All');
  //       }
  //   }.bind(this));
  // }

  // useEffect(() => {
  //   toastObj.show({
  //     title: 'Adaptive Tiles Meeting',
  //     content: 'Conference Room 01 / Building 135 10:00 AM',
  //   });
  // }, [toastShow]);

  return role === "Admin PMB" ? (
    <div
      className={currentMode === "Dark" ? "dark" : " min-h-screen bg-slate-500"}
    >
      <div className="relative flex min-h-screen dark:bg-gelap bg-slate-500">
        <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
          <TooltipComponent content="Pengaturan" position="Top">
            <button
              type="button"
              onClick={() => setThemeSettings(true)}
              style={{ background: currentColor, borderRadius: "50%" }}
              className="p-3 text-3xl text-white hover:drop-shadow-xl hover:bg-soft"
            >
              <FiSettings />
            </button>
          </TooltipComponent>
        </div>

        {activeMenu ? (
          <div className="fixed bg-white w-72 sidebar dark:bg-terang ">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-terang">
            <Sidebar />
          </div>
        )}

        <div
          className={
            activeMenu
              ? "dark:bg-gelap  bg-krem min-h-screen md:ml-72 w-full  "
              : "bg-krem dark:bg-gelap  w-full min-h-screen flex-2 "
          }
        >
          <div className="fixed w-full md:static bg-krem dark:bg-gelap navbar ">
            <Navbar />
          </div>

          {themeSettings && <ThemeSettings />}

          <div className="p-10 mb-7 mx-7 bg-white rounded-lg min-h-[80vh]">
            <Outlet />

            {/* <div
              className={
                errMsg
                  ? "px-4 py-3 mt-3 rounded-md text-merah text-sm bg-red-100 relative"
                  : "hidden"
              }
              aria-live="assertive"
              role="alert"
            >
              {Object.entries(errMsg).map(([, fieldErrors]) =>
                fieldErrors.map((fieldError, index) => (
                  <p key={index} className="flex gap-2">
                    <FaTimesCircle className="my-1" /> {fieldError}
                  </p>
                ))
              )}
            </div> */}

            {/* <div
              className={
                successMsg
                  ? "px-4 py-3 mt-3 rounded-md text-green-700 text-sm bg-green-100 relative"
                  : "hidden"
              }
              aria-live="assertive"
              role="alert"
            >
              <p className="flex gap-2">
                <FaRegCheckCircle className="my-1" /> {successMsg}
              </p>
            </div> */}

            {/* <ToastComponent ref={(toast) => { toastObj = toast; }} id='toast_default' position={position} created={create.bind(this)} close={onclose.bind(this)} beforeOpen={onbeforeOpen.bind(this)}></ToastComponent> */}
          </div>

          <Footer />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuthAdmin;
