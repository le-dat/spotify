import React, { useState } from "react";
import {
  HiOutlineHashtag,
  HiOutlineHome,
  HiOutlineMenu,
  HiOutlinePhotograph,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { RiCloseLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";

import { logo } from "../assets";

const links = [
  { name: "Discover", to: "/", icon: HiOutlineHome },
  { name: "Around You", to: "/around-you", icon: HiOutlinePhotograph },
  { name: "Top Artists", to: "/top-artists", icon: HiOutlineUserGroup },
  { name: "Top Charts", to: "/top-charts", icon: HiOutlineHashtag },
];

const NavLinks = ({ handleClick }) => (
  <div className="mt-10">
    {links.map((link) => (
      <NavLink
        key={link.name}
        to={link.to}
        end
        onClick={() => handleClick && handleClick()}
        className={({ isActive }) =>
          `flex align-center w-full p-3 font-bold ${
            isActive ? "active" : "text-gray-300"
          } hover:text-cyan-500 cursor-pointer`
        }
      >
        {<link.icon className="w-6 h-6 mr-2" />}
        {link.name}
      </NavLink>
    ))}
  </div>
);

const SideBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="hidden md:flex flex-col w-[12rem] py-10 bg-[#191624]">
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks />
      </div>

      {/* Mobile sidebar */}
      <div className="absolute md:hidden top-4 right-3">
        {mobileMenuOpen ? (
          <RiCloseLine className="cursor-pointer w-6 h-6 mr-2 text-white" onClick={() => setMobileMenuOpen(false)} />
        ) : (
          <HiOutlineMenu className="cursor-pointer w-6 h-6 mr-2 text-white" onClick={() => setMobileMenuOpen(true)} />
        )}
      </div>

      <div
        className={`absolute md:hidden top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483D8B] backdrop-blur-lg z-[100] smooth-transition ${
          mobileMenuOpen ? "left-0" : "-left-full"
        }`}
      >
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks />
      </div>
    </>
  );
};

export default SideBar;
