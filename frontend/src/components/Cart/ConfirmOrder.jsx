import React from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import logo from "../../assets/images/logo.png";
import axios from "axios";
import { createOrder, clearErrors } from "../../reduxStore/actions/orderAction";
import { useEffect } from "react";

const ConfirmOrder = ({ razorpayApiKey }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const getOrderId = async (paymentData) => {
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
      toast.error(error.message);
    }
  };

  const verifyPayment = async (response) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://localhost:4000/api/v1/payment/verify",
      response,
      { withCredentials: true },
      config
    );
    return data;
  };

  const proceedToPayment = async (e) => {
    e.preventDefault();
    console.log("button is working");
    const orderData = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };
    // sessionStorage.setItem("orderInfo", JSON.stringify(orderData));

    const paymentData = {
      amount: Math.round(orderData.totalPrice * 100),
    };

    const order = {
      shippingInfo,
      orderItems: cartItems,
      itemsPrice: orderData.subtotal,
      taxPrice: orderData.tax,
      shippingPrice: orderData.shippingCharges,
      totalPrice: orderData.totalPrice,
    };

    // navigate("/process/payment");
    const orderId = await getOrderId(paymentData);
    if (orderId) {
      displayRazorpay(orderId, paymentData, order);
    }
  };

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

  async function displayRazorpay(orderId, paymentData, order) {
    try {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        throw new Error("Error in payment processing!");
      }
    } catch (cError) {
      toast.error("Error in payment processing!");
    }

    const options = {
      key: razorpayApiKey, 
      amount: paymentData.amount, 
      currency: "INR",
      name: "Shoocart Enterprises",
      description: "Test Transaction",
      image: logo,
      order_id: orderId.order_id, 
      handler: function (response) {
        handlePayResCreateOrder(orderId, paymentData, order, response);
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

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
    });
  }

  const handlePayResCreateOrder = async (orderId, paymentData, order, response) => {
    response.orderId = orderId.order_id;
    const verifyData = await verifyPayment(response);
    if (verifyData.success) {
      order.paymentInfo = {
        orderId: orderId.order_id,
        razorpayPaymentId: response.razorpay_payment_id,
        razorpayOrderId: response.razorpay_order_id,
        status: "success"
      }
      dispatch(createOrder(order));
     if(!error) {
      toast.success("payment successful");
      navigate("/success");
     } else {
      toast.error(error);
     }
    }
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, toast]);

  return (
    <>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
