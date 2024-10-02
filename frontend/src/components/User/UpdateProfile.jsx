import React, { useState, useEffect } from "react";
import logo from "../../assets/images/logo.png";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  updateProfile,
  loadUser,
} from "../../reduxStore/actions/userAction";
import { useAlert } from "react-alert";
import Loader from "../ui/Loader";
import { useNavigate, useLocation } from "react-router-dom";
import { UPDATE_PROFILE_RESET } from "../../reduxStore/constants/userConstants";
import MetaData from "../layout/MetaData";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { error, loading, isUpdated } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/images/profile.png");

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState == 2) {
        console.log(reader.result);
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);

    dispatch(updateProfile(myForm));
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      console.log(error);
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());
      navigate("/account", { replace: true });
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, navigate, isUpdated, user]);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center w-full h-screen">
          <Loader />
        </div>
      ) : (
        <>
        <MetaData title="Update Profile" />
        <div className="absolute top-0 z-13 w-full h-screen bg-bgColor flex items-start pt-8 justify-center">
          <div className="form bg-white/70 w-[30%] h-[90%] rounded-xl flex flex-col items-center justify-start pt-8">
            <div className="top flex flex-col items-center w-full">
              <div className="logo">
                <img src={logo} alt="logo" className=" w-20 h-20 " />
              </div>
              <p className="mainText font-bold text-lg mt-3">Update Profile</p>
            </div>

            <form
              action=""
              className="w-full flex justify-center mt-7 px-7"
              encType="multipart/form-data"
              onSubmit={updateProfileSubmit}
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
                  onChange={(e) => setName(e.target.value)}
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
                  onChange={(e) => setEmail(e.target.value)}
                />

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
                    onChange={updateProfileDataChange}
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
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        </>
      )}
    </>
  );
};

export default UpdateProfile;
