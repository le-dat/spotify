import React from "react";
import { loader } from "../assets";

const Loader = ({ title = "Loading..." }) => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <img src={loader} alt="loader" className="w-32 h-32 object-contain" />
      <h1 className="font-bold text-2xl text-white mt-4">{title}</h1>
    </div>
  );
};

export default Loader;
