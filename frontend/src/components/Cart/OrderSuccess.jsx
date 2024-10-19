import React, { useEffect } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./orderSuccess.css";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";
import MetaData from "../layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';


const OrderSuccess = () => {
  const { error } = useSelector((state) => state.newOrder);
  const navigate = useNavigate();

  if (error) {
    navigate("/order/failed");
  }

  return (
    <>
      <MetaData title="Order Placed" />
      <CheckoutSteps activeStep={2} />
      <div className="orderSuccess">
        <CheckCircleIcon />
        <Typography>Your Order has been Placed successfully </Typography>
        <Link to="/orders">View Orders</Link>
      </div>
    </>
  );
};

export default OrderSuccess;
