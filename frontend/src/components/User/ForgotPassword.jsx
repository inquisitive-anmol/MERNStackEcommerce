import React, { useState, useEffect } from "react";
import logo from "../../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  forgotPassword,
} from "../../reduxStore/actions/userAction";
import { toast } from 'react-toastify';
import Loader from "../ui/Loader";
import MetaData from "../layout/MetaData";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const { error, loading, message } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, toast, message]);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center w-full h-screen">
          <Loader />
        </div>
      ) : (
        <div className="absolute top-0 z-13 w-full min-h-screen bg-bgColor flex items-start pt-8 justify-center">
          <MetaData title={`Forgot Password`} />
          <div className="form mt-8 bg-white/70 w-[53vmax] sm:w-[60%] md:w-[48%] lg:w-[32%] h-[80%] rounded-xl flex flex-col items-center justify-start py-10">
            <div className="top flex flex-col items-center w-full">
              <div className="logo">
                <img src={logo} alt="logo" className=" w-20 h-20 " />
              </div>
              <p className="mainText font-bold text-lg mt-3">Welcome Back</p>
              <p className="subText text-gray-500 text-sm">Enter email to reset Password</p>
            </div>

            <form
              action=""
              className="w-full flex justify-center mt-10 px-7"
              onSubmit={forgotPasswordSubmit}
            >
              <div className="w-full email flex flex-col gap-1 w-70%">
                <label htmlFor="email" className="font-semibold mt-2">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  placeholder="Enter your email"
                  className="w-full rounded-md p-2.5 outline-none border"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <div className="cta">
                  <button
                    type="submit"
                    className="w-full h-full bg-accentColor rounded-xl mt-8 hover:bg-[#FF3C00] font-semibold text-lg text-white"
                  >
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
