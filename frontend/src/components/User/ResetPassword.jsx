import React, { useState, useEffect } from "react";
import logo from "../../assets/images/logo.png";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  resetPassword,
  loadUser,
} from "../../reduxStore/actions/userAction";
import { toast } from 'react-toastify';
import Loader from "../ui/Loader";
import { useNavigate, useLocation } from "react-router-dom";
import { UPDATE_PASSWORD_RESET } from "../../reduxStore/constants/userConstants";
import MetaData from "../layout/MetaData";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading, success } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(token, myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Password Reset Successfully");
      navigate("/login", { replace: true });
    }
  }, [dispatch, error, toast, navigate, success, token]);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center w-full h-screen">
          <Loader />
        </div>
      ) : (
        <div className="absolute top-0 z-13 w-full min-h-screen bg-bgColor flex items-start pt-8 justify-center">
          <MetaData title={`Reset Password`} />
          <div className="form mt-8 bg-white/70 w-[53vmax] sm:w-[60%] md:w-[48%] lg:w-[32%] h-[80%] rounded-xl flex flex-col items-center justify-start py-10">
            <div className="top flex flex-col items-center w-full">
              <div className="logo">
                <img src={logo} alt="logo" className=" w-20 h-20 " />
              </div>
              <p className="mainText font-bold text-lg mt-3">Welcome Back</p>
              <p className="subText text-gray-500 text-sm">Change Password</p>
            </div>

            <form
              action=""
              className="w-full flex justify-center mt-10 px-7"
              onSubmit={resetPasswordSubmit}
            >
              <div className="w-full email flex flex-col gap-1 w-70%">
                <label htmlFor="new-password" className="font-semibold mt-2">
                  New Password
                </label>
                <input
                  type="text"
                  id="new-password"
                  value={password}
                  placeholder="Enter New Password"
                  className="w-full rounded-md p-2.5 outline-none border"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label
                  htmlFor="confirm-password"
                  className="font-semibold mt-2"
                >
                  Confirm Password
                </label>
                <input
                  type="text"
                  id="confirm-password"
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  className="w-full rounded-md p-2.5 outline-none border"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <div className="cta">
                  <button
                    type="submit"
                    className="w-full h-full bg-accentColor rounded-xl mt-3 hover:bg-[#FF3C00] p-1.5 font-semibold text-lg text-white"
                  >
                    Reset
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

export default ResetPassword;
