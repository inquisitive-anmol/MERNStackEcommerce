import React, { useState, useEffect } from "react";
import logo from "../../assets/images/logo.png";
import { Link, replace } from "react-router-dom";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../reduxStore/actions/userAction";
import { useAlert } from "react-alert";
import Loader from "../ui/Loader";
import { useNavigate, useLocation } from "react-router-dom";
import MetaData from "../layout/MetaData";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const alert = useAlert();

  const redirect = location.state?.from || "/account";
  
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, alert, navigate, isAuthenticated, redirect]);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center w-full h-screen">
          <Loader />
        </div>
      ) : (
        <div className="absolute top-0 z-13 w-full min-h-screen bg-bgColor flex items-start pt-8 justify-center">
          <MetaData title={`Login to Shoocart`} />
          <div className="form mt-8 bg-white/70 w-[53vmax] sm:w-[60%] md:w-[48%] lg:w-[32%] h-[80%] rounded-xl flex flex-col items-center justify-start py-10">
            <div className="top flex flex-col items-center w-full">
              <div className="logo">
                <img src={logo} alt="logo" className=" w-20 h-20 " />
              </div>
              <p className="mainText font-bold text-lg mt-3">Welcome Back</p>
              <p className="subText text-gray-500 text-sm">
                Please enter your details to login
              </p>
            </div>

            <form
              action=""
              className="w-full flex justify-center mt-10 px-7"
              onSubmit={loginSubmit}
            >
              <div className="w-full email flex flex-col gap-1 w-70%">
                <label htmlFor="email" className="font-semibold">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={loginEmail}
                  placeholder="Enter your Email"
                  className="w-full rounded-md p-2.5 outline-none border"
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
                <label htmlFor="password" className="font-semibold mt-2">
                  Password
                </label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  value={loginPassword}
                  placeholder="Enter your Password"
                  className="w-full rounded-md p-2.5 outline-none border"
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <p className="text-blue-500 text-sm mt-1">
                  <Link to="/password/forgot">Forgot Password?</Link>
                </p>

                <div className="cta">
                  <button
                    type="submit"
                    className="w-full h-full bg-accentColor rounded-xl mt-3 hover:bg-[#FF3C00] p-1.5 font-semibold text-lg text-white"
                  >
                    Login
                  </button>
                </div>
                <div className="linkText mt-3 text-[15px]">
                  Don't have an account?
                  <Link to="/signup" className="text-blue-500 text-base">
                    Register
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
