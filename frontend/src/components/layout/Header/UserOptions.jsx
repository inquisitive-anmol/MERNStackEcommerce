import React, { useState } from "react";
import { SpeedDial, SpeedDialAction, Backdrop } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../reduxStore/actions/userAction";
import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";

const UserOptions = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <AccountCircleRoundedIcon />, name: "Profile", func: account },
    {
      icon: (
        <LocalMallRoundedIcon
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart${cartItems.length}`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }

  function orders() {
    navigate("/orders");
  }

  function account() {
    navigate("/account");
  }

  function cart() {
    navigate("/cart");
  }

  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully!");
  }

  return (
    <>
      <Backdrop open={open} style={{ zIndex: "11" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        className="fixed top-3 right-5"
        style={{ zIndex: "12" }}
        icon={
          <img
            src={
              user.avatar.url === "no url"
                ? "/images/profile.png"
                : user.avatar.url
            }
            alt="Profile"
            className="w-full h-full object-cover rounded-full bg-bgColor"
          />
        }
        direction="down"
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default UserOptions;
