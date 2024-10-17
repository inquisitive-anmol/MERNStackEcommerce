import React, { useState, useEffect } from "react";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { clearErrors, register } from "../../reduxStore/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "../ui/Loader";
import { useNavigate, useLocation } from "react-router-dom";
import MetaData from "../layout/MetaData";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const alert = useAlert();

  const from = location.state?.from || "/account";
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/images/profile.png");
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;

  const registerDataChange = (e) => {
    if (e.target.name == "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState == 2) {
          console.log(reader.result);
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);

    dispatch(register(myForm));
  };

  useEffect(() => {
    if (error) {
      console.log(error);
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [dispatch, error, alert, navigate, isAuthenticated]);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center w-full h-screen">
          <Loader />
        </div>
      ) : (
        <div className="absolute top-0 z-13 w-full min-h-screen bg-bgColor flex items-start pt-8 justify-center">
          <MetaData title={`Register to Shoocart`} />
          <div className="form mt-8 bg-white/70 w-[53vmax] sm:w-[60%] md:w-[48%] lg:w-[32%] h-[80%] rounded-xl flex flex-col items-center justify-start py-10">
            <div className="top flex flex-col items-center w-full">
              <div className="logo">
                <img src={logo} alt="logo" className=" w-20 h-20 " />
              </div>
              <p className="mainText font-bold text-lg mt-3">
                Create New Account
              </p>
            </div>

            <form
              action=""
              className="w-full flex justify-center mt-7 px-7"
              encType="multipart/form-data"
              onSubmit={registerSubmit}
            >
              <div className="w-full email flex flex-col gap-1 w-70%">
                <label htmlFor="fullName" className="font-semibold">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="Enter your Full Name"
                  value={name}
                  name="name"
                  className="w-full rounded-md p-2.5 outline-none border"
                  onChange={registerDataChange}
                />
                <label htmlFor="email" className="font-semibold">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  placeholder="Enter your Email"
                  value={email}
                  name="email"
                  className="w-full rounded-md p-2.5 outline-none border"
                  onChange={registerDataChange}
                />
                <label htmlFor="password" className="font-semibold mt-2">
                  Password
                </label>
                <input
                  type="text"
                  id="password"
                  placeholder="Enter your Password"
                  value={password}
                  name="password"
                  className="w-full rounded-md p-2.5 outline-none border"
                  onChange={registerDataChange}
                />
                <p className="text-blue-500 text-xs mt">
                  <Link to="/password/forgot">Forgot Password?</Link>
                </p>
                <div className="avatar flex items-center justify-center mt-2">
                  <img
                    src={avatarPreview}
                    alt="Avatar Preview"
                    className="h-16 w-16 object-cover rounded-full"
                  />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                    className="w-full text-sm text-slate-500 block  file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-violet-50 file:text-violet-700
                      file:cursor-pointer
                      hover:file:bg-violet-100"
                  />
                </div>
                <div className="cta">
                  <button
                    type="submit"
                    className="w-full h-full bg-accentColor rounded-xl mt-2 hover:bg-[#FF3C00] p-2 font-semibold text-lg text-white"
                  >
                    Register
                  </button>
                </div>
                <div className="linkText mt-1.5 text-[15px]">
                   Have an account?
                  <Link to="/login" className="text-blue-500 text-base">
                    Login
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

export default SignUp;
