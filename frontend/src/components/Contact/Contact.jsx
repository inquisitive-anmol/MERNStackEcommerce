import React from "react";
import "./contact.css";


const Contact = () => {
  return (
    <div id="main-contact-page">
      <section id="contact-page">
        <div class="section-header">
          <div class="container-contact">
            <h2>Get in Touch</h2>
            <p>
              We at ShooCart.in are always eager to hear from you! Whether you
              have questions about our products, feedback on our services, or
              any inquiries, our dedicated team is here to assist you. Feel free
              to drop us a message using the contact form below or reach out
              directly at support@shoocart.in. If you prefer a more personal
              touch, our customer service hotline is available at
              +91-945-857-4456 from 9 AM to 6 PM IST, Monday through Sunday. Let
              us know how we can help you step into comfort and style today!
            </p>
          </div>
        </div>

        <div class="container">
          <div class="row">
            <div class="contact-info">
              <div class="contact-info-item">
                <div class="contact-info-icon">
                  <i class="fas fa-home"></i>
                </div>

                <div class="contact-info-content">
                  <h4>Address</h4>
                  <p>
                    01/05 Garhi Vanshi Gorai
                    <br />
                    Aligarh, 202145
                  </p>
                </div>
              </div>

              <div class="contact-info-item">
                <div class="contact-info-icon">
                  <i class="fas fa-phone"></i>
                </div>

                <div class="contact-info-content">
                  <h4>Phone</h4>
                  <p>+91-945-857-4456</p>
                </div>
              </div>

              <div class="contact-info-item">
                <div class="contact-info-icon">
                  <i class="fas fa-envelope"></i>
                </div>

                <div class="contact-info-content">
                  <h4>Email</h4>
                  <p>support@shoocart.in</p>
                </div>
              </div>
            </div>

            <div class="contact-form">
              <form action="" id="contact-form">
                <h2>Send Message</h2>
                <div class="input-box">
                  <input type="text" required="true" name="" />
                  <span>&nbsp;Full Name</span>
                </div>

                <div class="input-box">
                  <input type="email" required="true" name="" />
                  <span>&nbsp;Email</span>
                </div>

                <div class="input-box">
                  <textarea required="true" name=""></textarea>
                  <span>&nbsp;Type your Message...</span>
                </div>

                <div class="input-box">
                  <input type="submit" value="Send" name="" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
