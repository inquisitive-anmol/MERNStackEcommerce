import React from "react";
import logo from "../../../assets/images/logo.png";
import Brand from "../../ui/Brand";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Link } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

const Footer = () => {
  return (
    <footer
      id="footer"
      className="w-full border-t-2 border-black/10 mt-10 py-7 px-3 flex flex-col justify-start items-center gap-4 h-[96vmax] sm:h-[62vmax] md:h-[50vmax] lg:h-[27vmax]"
    >
      <div className="w-full">
        <div className="w-full flex items-center justify-center flex-col gap-2">
          <Brand
            logo={logo}
            className="h-full w-full text-base flex items-center justify-center"
          />
          <p className="text-wrap text-sm md:text-medium lg:text-lg">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Consequatur dolore sint accusamus est, earum,
          </p>
          <div className="w-full socials flex items-center justify-center gap-3">
            <a href="#">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="#">
              <FacebookRoundedIcon fontSize="large" />
            </a>
            <a href="#">
              <TwitterIcon fontSize="large" />
            </a>
          </div>
        </div>
        <div className="part2 w-full flex flex-col sm:flex-row sm:gap-2 justify-evenly items-start pl-2 py-1 mt-4">
          <div className="text-sm lg:text-lg">
            <h2 className="font-medium mb-2 text-xl">Company</h2>
            <h3 className=" px-2 text-black/70">
              <Link to="/about">About Us</Link>
            </h3>
            <h3 className=" px-2 text-black/70">
              <Link to="/contact">Contact Us</Link>
            </h3>
            <h3 className=" px-2 text-black/70">
              <Link to="/blogs">Blog</Link>
            </h3>
            <h3 className=" px-2 text-black/70">
              <Link to="/career">Career</Link>
            </h3>
          </div>
          <div className="text-sm lg:text-lg">
            <h2 className="font-medium mb-2 text-xl">Customer Services</h2>
            <h3 className="px-2 text-black/70">
              <Link to="/account">My Account</Link>
            </h3>
            <h3 className="px-2 text-black/70">
              <Link to="/myorder/track">Track Your Order</Link>
            </h3>
            <h3 className="px-2 text-black/70">
              <Link to="/return">Return</Link>
            </h3>
            <h3 className="px-2 text-black/70">
              <Link to="/faqs">FAQs</Link>
            </h3>
          </div>

          <div className="text-sm lg:text-lg">
            <h2 className="font-medium mb-2 text-xl">Legal</h2>
            <h3 className="px-2 text-black/70">
              <Link to="/privacy">Privacy</Link>
            </h3>
            <h3 className="px-2 text-black/70">
              <Link to="/terms">User Terms & Conditions</Link>
            </h3>
            <h3 className="px-2 text-black/70">
              <Link to="/return/policy">Return Policy</Link>
            </h3>
          </div>
          <div className="text-sm lg:text-lg">
            <h2 className="font-medium mb-2 text-xl">Contact</h2>
            <h3 className="px-2 text-black/70">
              <Link to="tel:+918439171746" className="">
                <span>
                  <PhoneIcon /> +918439171746
                </span>
              </Link>
            </h3>
            <h3 className="px-2 text-black/70">
              <Link to="mailto:contact@shoocart.in">
                <span>
                  <EmailIcon /> shoocartenterprises@gmail.com
                </span>
              </Link>
            </h3>
            <h3 className="px-2 text-black/70">Address</h3>
          </div>
        </div>
      </div>

      <div className="text-sm text-black/70 px-2 py-2 my-4">
        <p>Copyright &copy;2024 Shoocart Enterprises. All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
