import React from "react";
import "./about.css";

const About = () => {
  return (
    <div id="about">
      <div className="about-hero">
        <img src="/images/about/1245.jpg" alt="" className="about-hero-img" />
        <div className="overlay"></div>
        <div className="about-hero-box">
          <h2 className="about-hero-title">WHO ARE WE ?</h2>
          <p className="about-hero-title-para">
            Elevate your every step with Shoocart.in - where style meets comfort
          </p>
        </div>
      </div>

      <div className="about-sec">
        <div className="about-sec-cards">
          <div className="about-sec-card-left">
            <h3 className="about-sec-card-left-h3">SHOOCART</h3>
            <p className="about-sec-card-left-p">
              Founded in 2024, Shoocart.in quickly emerged as a trailblazer in
              the online footwear industry. Our platform was created by a team
              of retail and technology experts who saw a need for a more
              user-friendly, diverse, and engaging shoe shopping experience.
              Shoocart.in is not just about selling shoes; it's about defining a
              lifestyle and catering to the unique tastes and needs of shoe
              enthusiasts nationwide. We are committed to delivering quality,
              style, and outstanding customer service, ensuring every visitor
              finds their perfect fit.
            </p>
          </div>
          <div className="about-sec-card-right">
            <img
              src="/images/about/brandss.jpg"
              alt=""
              className="about-sec-right-img"
            />
          </div>
        </div>

        <div className="about-sec-cards">
          <div className="about-sec-card-right">
            <img
              src="/images/about/vission.jpg"
              alt=""
              className="about-sec-right-img"
            />
          </div>
          <div className="about-sec-card-left">
            <h3 className="about-sec-card-left-h3">OUR VISION</h3>
            <p className="about-sec-card-left-p">
              At Shoocart.in, our vision is to redefine the online shoe shopping
              experience. We envision a platform that transcends the
              transactional nature of e-commerce, fostering a vibrant community
              of shoe enthusiasts and fashion-forward individuals. Our goal is
              to curate a diverse collection of footwear that not only caters to
              a wide range of tastes and preferences but also inspires
              creativity and self-expression. We aspire to be more than just a
              marketplace; we strive to be a trusted partner on every step of
              our customers' style journey, providing expert guidance,
              personalized recommendations, and exceptional service. With
              innovation at our core and a passion for footwear driving us
              forward, we aim to set new standards in the world of online shoe
              shopping, making Shoocart.in the ultimate destination for shoe
              lovers everywhere.
            </p>
          </div>
        </div>

        <div className="about-sec-cards">
          <div className="about-sec-card-left">
            <h3 className="about-sec-card-left-h3">CORE VALUES</h3>
            <p className="about-sec-card-left-p">
              At Shoocart.in, our core values are the foundation of our business
              ethos. We prioritize <br />
              <b>Customer Satisfaction</b> by ensuring a seamless shopping
              experience and superior service. <br />
              <b>Integrity</b>
              guides our transactions and relationships, fostering trust and
              reliability. <br />
              <b>Diversity</b> in our product range and respect for all
              customers reflect our commitment to inclusivity. <br />
              <b>Quality</b> underscores everything from our product offerings
              to customer interactions. <br />
              These values empower us to achieve excellence and maintain loyalty
              among our customers, propelling Shoocart.in forward in the
              competitive online footwear industry.
            </p>
            <p>This website is managed by Shoocart Enterprises</p>
          </div>
          <div className="about-sec-card-right">
            <img
              src="/images/about/values.jpg"
              alt=""
              className="about-sec-right-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
