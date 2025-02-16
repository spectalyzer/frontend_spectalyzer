import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import bgImg from "../../assets/images/hero-original2.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Hero = () => {
  useEffect(() => {
    AOS.init({ duration: "2000" });
  }, []);

  return (
    <div
      className="relative h-screen w-full overflow-hidden bg-cover bg-center "
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "",
        backgroundPosition: "",
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      <div className="relative flex flex-col items-center justify-center text-center h-full px-6 sm:px-12 md:px-24 lg:px-32">
        <p
          className="text-white text-5xl sm:text-6xl lg:text-7xl font-semibold"
          data-aos="fade-down"
        >
          Spectalyzer, <span className="text-yellow-500">Spectrum </span>
          Analyzer
        </p>
        <p
          className="text-white italic text-lg sm:text-xl mt-6"
          data-aos="fade-up"
        >
          Based on the graphical representation of all activities, <br />
          it will make it easy to track all the activities of the children.
        </p>
        <button
          className="px-4 py-3 text-white text-xs font-semibold bg-teal-500  hover:bg-gray-700 focus:outline-none"
          data-aos="fade-down"
        >
          JOIN NOW <FontAwesomeIcon className="" icon={faHeart} />
        </button>
      </div>
    </div>
  );
};

export default Hero;
