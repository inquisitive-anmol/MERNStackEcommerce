import React, { useEffect } from "react";
import "./orderSuccess.css";
import ErrorIcon from "@mui/icons-material/Error";
import { Typography } from "@mui/material";
import MetaData from "../layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import CheckoutSteps from "./CheckoutSteps";
import { toast } from 'react-toastify';
import { clearErrors } from "../../reduxStore/actions/OrderAction";

const OrderFailed = () => {
  const { error } = useSelector((state) => state.newOrder);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [ error, dispatch]);
  return (
    <>
    <MetaData title="Order Failed" />
<CheckoutSteps activeStep={1} />
    <div className="orderSuccess">
      <ErrorIcon/>
    <Typography>Your payment was successful, but there was an issue placing your order. We're looking into it and will update you shortly. If you need immediate assistance, please contact our support team.</Typography>
      <p>Details of support team!</p>
    </div>
    </>
  );
};

export default OrderFailed;
