import React from "react";
import specContactLogo from "../../assets/images/spectalyzer-logo-26_bg-removeb.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMobileScreen,
  faEnvelope,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

const Contact = () => {
  return (
    <div className="">
      <div
        className="bg-gray-900 font-montserrat pt-4 md:p-0 p-4"
        id="contact-us"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-screen-xl mx-auto">
          <div className="spec-info">
            <img
              className="h-24"
              src={specContactLogo}
              alt="Spectalyzer Logo"
            />
            <p className="text-gray-400 text-sm leading-7 mt-4 text-justify">
              This is a web based application to track down all possible
              activities of an autistic child and with the help of factor
              analysis and time series analysis, make a graphical presentation
              of the activities. Based on the graphical presentation of all the
              activities, it will make it easy to track the all activities of
              the children and help the therapist to make their decision about
              the applied therapy and behavior analysis.
            </p>
          </div>
          <div className="contact-info-section mt-4 ">
            <p className="text-gray-300 text-sm">CONTACT INFO</p>
            <p className="flex  gap-2 items-center text-gray-400 text-sm">
              <FontAwesomeIcon
                icon={faMobileScreen}
                size="lg"
                className="text-gray-400"
              />
              <span className="ml-2">+ 880 1711 505413</span>
            </p>
            <button className="flex  gap-2 items-center mt-4 text-gray-400 text-sm">
              <FontAwesomeIcon
                icon={faEnvelope}
                size="lg"
                className="text-gray-400"
              />
              <span className="ml-2">spectalyzer@gmail.com</span>
            </button>
            <p className="flex gap-2 items-center mt-4 text-gray-400 text-sm">
              <FontAwesomeIcon
                icon={faLocationDot}
                size="lg"
                className="text-gray-400"
              />
              <span className="ml-2">1/1-B, Subhanbag, Savar, Dhaka-1340</span>
            </p>
          </div>
          <div className="contact-field">
            <p className="text-gray-300 text-sm">CONTACT US</p>
            <input
              className="block mt-4 w-3/5 md:w-full h-12 px-3 rounded-md bg-transparent border border-gray-500 text-sm text-gray-400 outline-none"
              type="text"
              placeholder="Name"
            />
            <input
              className="block mt-4 w-4/5 md:w-full h-12 px-3 rounded-md bg-transparent border border-gray-500 text-sm text-gray-400 outline-none"
              type="text"
              placeholder="Email"
            />
            <textarea
              className="block mt-4 w-4/5 md:w-full h-28 px-3 rounded-md bg-transparent border border-gray-500 text-sm text-gray-400 outline-none"
              placeholder="Message"
            />
            <button className="mt-4 mb-4 w-32 h-10 rounded-md bg-gray-500 text-white hover:bg-teal-400">
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
