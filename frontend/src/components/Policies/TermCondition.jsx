import React from "react";
import "./termCondition.css";

const TermCondition = () => {
  return (
    <div className="terms-cond-box">
      <div className="terms-cond-box-title">TERMS & CONDTITIONS</div>
      <div className="terms-cond-body">
        <div className="heading-terms-cond">Terms of Sale:</div>
        <div className="content-terms-cond">
          <ul>
            <li>
              Our platform sells branded shoes and manufactured shoes. We may
              also offer replica shoes.This is a service platform.
            </li>
          </ul>
        </div>
        <div className="heading-terms-cond">Website Use:</div>
        <div className="content-terms-cond">
          <ul>
            <li>
              This website is available for browsing and purchasing shoes.
              Visitors are permitted to use the website in accordance with these
              Terms of Sale. Any prohibited activity, such as hacking or misuse
              of intellectual property, is the sole responsibility of the user
              and may result in legal action.**
            </li>
          </ul>
        </div>
        <div className="heading-terms-cond">Intellectual Property Rights:</div>
        <div className="content-terms-cond">
          <ul>
            <li>
              This shoe website and its content are protected by the
              intellectual property rights of Mrs. Sunita Devi.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TermCondition;
