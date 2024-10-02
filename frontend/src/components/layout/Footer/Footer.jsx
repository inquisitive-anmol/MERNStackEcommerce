import React from "react";
import logo from "../../../assets/images/logo.png";
import Brand from "../../ui/brand";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";

const Footer = () => {
  
  return (
    <footer id="footer" className="w-full h-[30%] bg-sky-200 flex flex-col items-center justify-center py-6 px-4">
      <div className="top flex w-full">
        <div className="part1 w-[25%] flex flex-col gap-4 items-center justify-center">
          <Brand logo={logo} className="flex items-center justify-center" />
          <p className="text-wrap">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Consequatur dolore sint accusamus est, earum,
          </p>
          <div className="socials flex items-center justify-center gap-3">
            <a href="#">
              <InstagramIcon fontSize="large"/>
            </a>
            <a href="#">
              <FacebookRoundedIcon fontSize="large"/>
            </a>
            <a href="#">
              <TwitterIcon fontSize="large"/>
            </a>
          </div>
        </div>
        <div className="part2 w-[25%]">
        <h2>
          Company
        </h2>
        </div>
        <div className="part3 w-[25%]">
          <h2>
            Customer Services
          </h2>
        </div>
        <div className="part4 w-[25%]">
          Legal
        </div>
        <div className="part5 w-[25%]">
          Contact Info.
        </div>
      </div>

      <div className="w-[87%] flex items-center justify-center mt-8  bottom border-t-2 border-gray-400 pt-7 pb-10">
<p>
  Copyright &copy;2024 Shoocart Enterprises. All Rights Reserved
</p>
      </div>
    </footer>
  );
};

export default Footer;
