import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Testimonials.css";
import reviewerImg from "../assets/images/testimonial.jpg";
import Join from "../components/join/Join.jsx";

const Testimonials = () => {
  const testimonials = [
    {
      comment:
        "Spectalyzer has been a game-changer for our therapy sessions! Its data-driven insights and graphical presentations offer a comprehensive view of our client's activities. With this powerful tool, we make more informed decisions, resulting in personalized interventions and remarkable progress. Highly recommended!",
      reviewerName: "SAMIN RAIYAN",
    },
    {
      comment:
        "Spectalyzer has been a game-changer for our therapy sessions! Its data-driven insights and graphical presentations offer a comprehensive view of our client's activities. With this powerful tool, we make more informed decisions, resulting in personalized interventions and remarkable progress. Highly recommended!",
      reviewerName: "SAMIN RAIYAN",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="testimonials" id="testimonials">
      <div className="testimonial-title-sec">
        <p className="testimonials-title">
          WHAT OUR <span className="light-title-test">CLIENTS</span> SAY
        </p>
        <hr className="hr-line" />
      </div>
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div key={index}>
            <div className="comment-section">
              <p>&#8220;{testimonial.comment}&#8221;</p>
            </div>
            <div className="rev-img-sec">
              <img className="reviewer-img" src={reviewerImg} alt="" />
              <p className="reviewer-name">{testimonial.reviewerName}</p>
              <i className="extented-rev">Review By</i>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonials;
