import React from "react";

const Brand = ({logo, className}) => {
  return (
    <div className={className}>
      <img src={logo} alt="Shoocart" className="w-16 h-16 ml-1" />
      <p className="ml-2 font-extrabold text-3xl text-inherit">
        Shoo<span className="text-accentColor">c</span>art
      </p>
    </div>
  );
};

export default Brand;
