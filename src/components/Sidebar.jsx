import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { BsChevronDown } from "react-icons/bs";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { sidebarMenus, sidebarMenusAdmin } from "../data/initData";
import { useStateContext } from "../contexts/ContextProvider";
import logoSaim from "../data/logo-saim.png";

const Sidebar = () => {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    screenSize,
    stepsPMB,
    formCheck,
    openForm,
    setOpenForm,
    setFormCheck,
    getFormCheck,
  } = useStateContext();
  const [submenuOpen, setSubmenuOpen] = useState(false);
  // const role = JSON.parse(localStorage.getItem('ROLE'));
  const role = localStorage.getItem("ROLE");
  const [currentSidebarMenus, setCurrentSidebarMenus] = useState(sidebarMenus);

  const activeLinkTitle =
    "flex items-center gap-3 pl-3 pt-2.5 pb-2.5 rounded-md text-black text-md m-0 font-bold bg-krem ";
  const normalLinkTitle =
    "flex items-center gap-3 pl-3 pt-2.5 pb-2.5 rounded-md text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-soft m-0 font-semibold  peer-checked:text-merah";
  const activeLink =
    "flex items-center gap-3 pl-10 rounded-md text-sm font-semibold mx-0 bg-soft";
  const normalLink =
    "flex items-center gap-3 pl-10 rounded-md text-sm mx-0 text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-soft hover:text-merah";

  const handleCloseSideBar = (stepName) => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  useEffect(() => {
    if (role === "Admin PMB") {
      setCurrentSidebarMenus(sidebarMenusAdmin);
    } else {
      getFormCheck();
      // console.log("getFormCheck === ", formCheck);
      setCurrentSidebarMenus(sidebarMenus);
    }
  }, [stepsPMB]);

  return (
    <div className="h-screen pb-10 overflow-auto md:overflow-hidden md:hover:overflow-auto w-72">
      {activeMenu && (
        <>
          <div className="flex items-center justify-center w-72 ">
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="flex items-center gap-3 text-xl font-extrabold tracking-tight mt-7 dark:text-white text-slate-900"
            >
              <img className="w-32 h-32" src={logoSaim} alt="SAIM" />
            </Link>
            {/* <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="absolute top-0 block p-3 mt-4 text-xl rounded-full right-3 hover:bg-soft md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent> */}
          </div>
          <div className="p-3 mt-7 w-72">
            {currentSidebarMenus.map((item, index) => (
              <div key={item.title} className="relative overflow-hidden">
                {item.links.length ? (
                  <input
                    defaultChecked={true}
                    type="checkbox"
                    className="absolute inset-x-0 top-0 z-10 w-full h-10 opacity-0 cursor-pointer peer"
                  />
                ) : (
                  ""
                )}
                {formCheck[item.step] ||
                item.step == "register_payment" ||
                item.step == openForm ||
                role == "Admin PMB" ? (
                  <NavLink
                    to={`/${item.path}`}
                    key={item.title}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      color: isActive ? currentColor : "",
                    })}
                    className={({ isActive }) =>
                      isActive ? activeLinkTitle : normalLinkTitle
                    }
                  >
                    <span>{item.icon}</span>
                    <span className="w-full capitzalize">{item.title}</span>
                  </NavLink>
                ) : (
                  <NavLink
                    to={`/${item.path}`}
                    key={item.title}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      color: isActive ? currentColor : "",
                      pointerEvents: "none",
                    })}
                    className={({ isActive }) =>
                      isActive ? activeLinkTitle : normalLinkTitle
                    }
                  >
                    <span>{item.icon}</span>
                    <span className="w-full capitalize">{item.title}</span>
                  </NavLink>
                )}
                {item.links.length ? (
                  <BsChevronDown className="absolute right-0 mr-6 rotate-0 top-4 peer-checked:-rotate-180" />
                ) : (
                  ""
                )}

                <div className="h-0 mt-1 transition-all duration-500 peer-checked:h-auto ">
                  {item.links.map((link, index) =>
                    // console.log("LINK === ", link.step +" !== "+openForm),
                    formCheck[link.step] ||
                    link.step == "register_payment" ||
                    openForm == "" ||
                    link.step == openForm ||
                    role == "Admin PMB" ? (
                      <NavLink
                        id=""
                        to={`/${link.path}`}
                        key={link.name}
                        onClick={handleCloseSideBar}
                        style={({ isActive }) => ({
                          color: isActive ? currentColor : "",
                        })}
                        className={({ isActive }) =>
                          isActive ? activeLink : normalLink
                        }
                      >
                        <span className="py-2 capitalize ">{link.name}</span>
                      </NavLink>
                    ) : (
                      <NavLink
                        id=""
                        to={`/${link.path}`}
                        key={link.name}
                        onClick={handleCloseSideBar}
                        style={({ isActive }) => ({
                          color: isActive ? currentColor : "",
                          pointerEvents: "none",
                        })}
                        className={({ isActive }) =>
                          isActive ? activeLink : normalLink
                        }
                      >
                        <span className="py-2 text-gray-300 capitalize">
                          {link.name}
                        </span>
                      </NavLink>
                    )
                  )}
                </div>

                {/* <div className='h-0 transition-all duration-500 peer-checked:h-auto '>
                  {item.links.map((link, index) => (
                    <NavLink
                      id=''
                      to={`/${link.path}`}
                      key={link.name}
                      onClick={handleCloseSideBar}
                      style={({ isActive }) => ({
                        color: isActive ? currentColor : '',
                      })}
                      className={({ isActive }) => (isActive ? activeLink : normalLink)}
                    >
                      {(formCheck[link.step] || link.step == "register_payment") ?
                        <span className="py-2 capitalize ">
                          {link.name}
                        </span>
                        // <span className="relative py-2 pl-4 capitalize border-gray-300 border-solid border-l-1 ">
                        //   {index > 0 && <smal className="absolute -left-2 top-2.5 flex items-center justify-center inline-block w-4 h-4 rounded-full bg-merah text-white text-center text-xs">{index}</smal>}
                        //   {link.name}
                        // </span>
                        :
                        <span className="py-2 text-gray-300 capitalize">
                          {link.name}
                        </span>
                        // <span className="relative py-2 pl-4 text-gray-300 capitalize border-gray-300 border-solid border-l-1">
                        //   <smal className="absolute -left-2 top-2.5 flex items-center justify-center inline-block w-4 h-4 rounded-full bg-gray-300 text-white text-center text-xs">{index}</smal> 
                        //   {link.name}
                        // </span>
                      }
                    </NavLink>
                  ))}
                </div> */}
              </div>
            ))}

            {/* <div className="fixed bottom-0 block px-5 py-3 font-bold text-center" style={{ color: currentColor }}>
              v2.0
            </div> */}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
