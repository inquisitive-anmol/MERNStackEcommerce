import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../reduxStore/actions/cartAction";
import MetaData from "../layout/MetaData";
// import { Country, State } from "country-state-city";
import { Country, State, City } from "country-state-city";
import { useAlert } from "react-alert";
import CheckoutSteps from "./CheckoutSteps";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import Loader from "../ui/Loader";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const countryItem = Country.getCountryByCode("IN");

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error("Phone Number should be 10 digits Long");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    navigate("/order/confirm");
  };

  useEffect(() => {
    <div className="flex items-center justify-center w-full h-screen">
      <Loader />
    </div>;
  }, []);
  return (
    <>
      <MetaData title="Shipping Details" />
      <div className="absolute top-0 w-full z-[1]  bg-bgColor flex flex-col items-center pt-7  pb-8 justify-start">
        <CheckoutSteps activeStep={0} />
        <div className="form bg-white/70 w-[40%] rounded-xl flex flex-col items-center justify-start pt-3  pb-7 mt-8">
          <div className="logo">
            <img src={logo} alt="logo" className=" w-16 h-16 " />
          </div>
          <p className="mainText font-bold text-lg mt-1">Welcome Back</p>
          <p className="subText text-gray-500 text-sm">
            Please enter your Shipping Details
          </p>
          <form
            className="w-full flex justify-center mt-7 px-11"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div className="w-full flex flex-col items-start justify-center gap-2 w-70%">
              <div className="w-full flex flex-col gap-[0.5]">
                <label htmlFor="address" className="font-semibold">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Enter Address"
                  required
                  id="address"
                  value={address}
                  className="w-full rounded-md p-2.5 outline-none border"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="w-full flex flex-col gap-[0.5]">
                <label htmlFor="pinCode" className="font-semibold">
                  Pin Code
                </label>
                <input
                  className="w-full rounded-md p-2.5 outline-none border"
                  type="number"
                  placeholder="Pin Code"
                  id="pinCode"
                  required
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                />
              </div>

              <div className="w-full flex flex-col gap-[0.5]">
                <label htmlFor="city" className="font-semibold">
                  City
                </label>
                <input
                  type="text"
                  placeholder="Enter City"
                  required
                  id="city"
                  value={city}
                  className="w-full rounded-md p-2.5 outline-none border"
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="w-full flex flex-col gap-[0.5]">
                <label htmlFor="phoneNo" className="font-semibold">
                  Phone Number
                </label>
                <input
                  type="number"
                  placeholder="Phone Number"
                  id="phoneNo"
                  required
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  size="10"
                  className="w-full rounded-md p-2.5 outline-none border"
                />
              </div>

              <div className="w-full flex flex-col gap-[0.5]">
                <label htmlFor="country" className="font-semibold">
                  Country
                </label>
                <select
                  required
                  id="country"
                  value={country}
                  className="w-full rounded-md p-2.5 outline-none border"
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="">Select Country</option>
                  {Country && (
                    <option value={countryItem.isoCode}>
                      {countryItem.name}
                    </option>
                  )}
                </select>
              </div>

              {country && (
                <div className="w-full flex flex-col gap-[0.5]">
                  <label htmlFor="state" className="font-semibold">
                    State
                  </label>
                  <select
                    id="state"
                    required
                    value={state}
                    className="w-full rounded-md p-2.5 outline-none border"
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option value="">Select State</option>
                    {State &&
                      State.getStatesOfCountry(country).map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
              )}

              <input
                type="submit"
                value="Continue"
                disabled={state ? false : true}
                className="w-full h-full bg-accentColor rounded-xl mt-4 hover:bg-[#FF3C00] py-3 font-semibold text-lg text-white"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
