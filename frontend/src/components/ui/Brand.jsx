import React from "react";

const Brand = ({logo, className}) => {
  return (
    <div className={className}>
      <img src={logo} alt="Shoocart" className="w-14 h-14 ml-1" />
      <p className="ml-1 font-bold text-2xl ">
        Shoo<span className="text-accentColor">c</span>art
      </p>
    </div>
  );
};

export default Brand;
