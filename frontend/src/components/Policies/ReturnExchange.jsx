import React from "react";
import "./returnExchange.css";

const ReturnExchange = () => {
  return (
    <div className="cancel-policy-box">
      <div className="cancel-policy-box-title">RETURN & EXCHANGE</div>
      <div className="cancel-policy-body">
        <div className="heading-cancel">CANCELLATION POLICY</div>
        <div className="content-cancel">
          <ul>
            <li>
              Customers have the right to cancel their orders anytime before the
              items are dispatched.Once the order is dispatched (shipped),
              cancellations are generally not allowed.
            </li>
            <li>
              In some cases, customers may not be able to cancel their orders
              for free after a specific time has passed. A cancellation fee will
              then be charged
            </li>
          </ul>
        </div>
        <div className="heading-cancel">RETURN POLICY</div>
        <div className="content-cancel">
          <ul>
            <li>
              Our return policy is divided into two sections. Please read all
              sections carefully to understand the conditions under which
              returns will be accepted.
            </li>
            <li>
              Condition 1: Items with damages or size mismatches can be returned
              within 2-7 days. Refunds will be issued within 7-10 working days.
            </li>
            <li>
              Condition 2: For damaged items, size mismatches, or color
              discrepancies, take a picture of the issue and upload it on the
              return form on our website. Alternatively, you can send the
              picture via WhatsApp to 9958574456. Once we receive the picture,
              Condition 1 (return within 2-7 days and refund within 7-10 working
              days) applies.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReturnExchange;
