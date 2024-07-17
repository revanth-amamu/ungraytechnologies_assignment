import React from "react";
import { NavLink } from "react-router-dom";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { IoIosStats } from "react-icons/io";
import { GrFlows } from "react-icons/gr";
import { FaPlug } from "react-icons/fa";
import { AiOutlineBars } from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";
import useAuth from "../../hooks/useAuth";

const dashboard_sidebar_links = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    icon: <TbLayoutDashboardFilled />,
  },
  {
    key: "campaigns",
    label: "Campaigns",
    path: "/dashboard",
    icon: <IoIosStats />,
  },
  {
    key: "flows",
    label: "Flows",
    path: "/dashboard",
    icon: <GrFlows />,
  },
  {
    key: "integrations",
    label: "Integrations",
    path: "/dashboard",
    icon: <FaPlug />,
  },
  {
    key: "customers",
    label: "Customers",
    path: "/dashboard",
    icon: <AiOutlineBars />,
  },
];

const SidebarLink = ({ link }) => {
  return (
    <NavLink
      to={link.path}
      className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 group"
    >
      {link.icon}
      {/* className='w-5 h-5 text-gray-500 transition duration-75 group-hover:text-blue-600' */}
      <span className="ml-3">{link.label}</span>
    </NavLink>
  );
};

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {

  const { user, logout } = useAuth();

  function handleLogout () {
    logout();
  }
  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 z-40 w-60 h-screen transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-200">
          <NavLink to="/dashboard" className="flex items-center ps-2.5 mb-5">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-6 me-3 sm:h-7"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap ">
              Salesway
            </span>
          </NavLink>
          <div className="flex flex-col justify-between">
          <ul className="space-y-2 font-medium">
            <li>
              {dashboard_sidebar_links.map((link) => (
                <SidebarLink key={link.key} link={link} />
              ))}
            </li>
          </ul>
          <div className="flex justify-between mt-2">
            <div className="font-bold text-xl mb-2">{user}</div>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-500 transition duration-300 text-xl font-bold"
            >
              <LuLogOut />
            </button>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Sidebar;
