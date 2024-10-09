import React, { useEffect, useRef } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";
import Razorpay from "razorpay";
import axios from "axios";
import "./Payment.css";
import logo from "../../assets/images/logo.png";
import { replace, useNavigate } from "react-router-dom";
import { createOrder, clearErrors } from "../../reduxStore/actions/orderAction";

const Payment = ({ razorpayApiKey }) => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  // const { error } = useSelector((state) => state.newOrder);
  const alert = useAlert();
  const navigate = useNavigate();

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  // ==============razorpay script =================
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  // ================ rzp script ends here ===============

  const getOrderId = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/payment/process",
        paymentData,
        { withCredentials: true },
        config
      );

      if (data.success) {
        return data;
      } else {
        throw new Error("Internal Server Error", 500);
      }
    } catch (error) {
      alert.error(error.message);
      console.log("error in getting api: ", error);
    }
  };
  // ==========razorpay display ==============
  async function displayRazorpay() {
    try {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        throw new Error("Error in payment processing!");
      }
    } catch (cError) {
      alert.error("Error in payment processing!");
    }
    // =============razorpay display ============

    const data = getOrderId();

    // ================= options  ===============
    const options = {
      key: razorpayApiKey, // Enter the Key ID generated from the Dashboard
      amount: paymentData, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Shoocart Enterprises",
      description: "Test Transaction",
      image: logo,
      order_id: data.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature)
        alert.success("payment successful");
        console.log("response: ", response);
        navigate("/success");
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: shippingInfo.phoneNo,
      },
      notes: {
        address: shippingInfo.address,
      },
      theme: {
        color: "#ff6f00",
      },
    };
    //  ================ ends here ==================

    // ============== payment opening =============
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
      // alert(response.error.code);
      // alert(response.error.description);
      // alert(response.error.source);
      // alert(response.error.step);
      // alert(response.error.reason);
      // alert(response.error.metadata.order_id);
      // alert(response.error.metadata.payment_id);
      console.log("response: ", response);
    });
  }

  // ==================== payment opening ===============

  useEffect(() => {
    if (razorpayApiKey) {
      displayRazorpay();
    }

    // if (error) {
    //   alert.error(error);
    //   dispatch(clearErrors());
    // }
  }, []);

  return (
    <>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      {/* <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div> */}
    </>
  );
};

export default Payment;
