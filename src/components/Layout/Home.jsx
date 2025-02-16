import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar.jsx";
import About from "../about/About.jsx";
import Hero from "../hero/Hero.jsx";
import HowWorks from "../howitworks/HowWorks";
import Testimonials from "../Testimonials.jsx";
import Contact from "../contact/Contact";
import Footer from "../footer/Footer.jsx";

const Home = () => {
  return (
    <div>
      <div>
        <Hero></Hero>
      </div>
      <div className="">
        {" "}
        <About></About>
      </div>
      <div>
        <HowWorks></HowWorks>
      </div>
      <div>
        {" "}
        <Testimonials></Testimonials>
      </div>
      <div>
        {" "}
        <Contact></Contact>
      </div>
      <div>
        {" "}
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Home;
