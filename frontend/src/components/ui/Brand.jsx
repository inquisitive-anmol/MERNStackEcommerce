import React from "react";

const Brand = ({logo, className}) => {
  return (
    <div className={className}>
      <img src={logo} alt="Lake" className="w-14 h-14 ml-1" />
      <p className="ml-1 font-bold text-2xl ">
        Lake
      </p>
    </div>
  );
};

export default Brand;
