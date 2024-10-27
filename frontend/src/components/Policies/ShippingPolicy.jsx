import React from "react";
import "./shippingPolicy.css";

const ShippingPolicy = () => {
  return (
    <div className="terms-cond-box">
      <div className="terms-cond-box-title">SHIPPING & DELIVERY</div>
      <div className="terms-cond-body">
        <div className="heading-terms-cond">Order Confirmation</div>
        <div className="content-terms-cond">
          <ul>
            <li>
              Order confirmation emails are sent to the email address and
              Whatsapp number provided by the customer upon placing an order.
            </li>
          </ul>
        </div>
        <div className="heading-terms-cond">Tracking</div>
        <div className="content-terms-cond">
          <ul>
            <li>
              We prefer to keep our customers informed about their orders,
              therefore, tracking information is sent to them via Whatsapp
              within 24-36 hours of placing the order.
            </li>
          </ul>
        </div>
        <div className="heading-terms-cond">Delivery Time</div>
        <div className="content-terms-cond">
          <ul>
            <li>
              We estimate 7-10 working days for delivery. <br />
              Delivery times vary from state to state, area to area, and pincode
              to pincode.
              <br />
              The delivery days are subject to change if there is a weekend in
              between, a festival, a courier strike,a national holiday etc.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
