import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import kidPicture from "../../assets/images/cute-boy-plays-wooden-game-tangram-creative-educational-games-quarantine-copy-space_251358-239.jpg";
import plannedLogo from "../../assets/icon/planned.png";
import visionLogo from "../../assets/icon/vision.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnchor } from "@fortawesome/free-solid-svg-icons";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <div className="bg-gray-100 w-full py-16 flex justify-center h-auto md:max-h-[70vh] ">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-16 items-center px-6 md:mb-0 mb-4">
        {/* Left Column - Text Content */}
        <div className="text-left md:mt-0 mt-4 p-4 md:p-0">
          <h2 className="text-4xl font-semibold mb-3">
            Autistic <span className="text-teal-500">Spectrum</span> Analyzer
          </h2>
          <p className="text-lg text-gray-500 italic mb-8">
            Graphical Presentation Makes It Easy
          </p>

          {/* Planned Way of Therapy */}
          <div className="flex items-start gap-4 mb-8" data-aos="fade-up">
            <img className="h-12 w-12 " src={plannedLogo} alt="Planned" />
            <div>
              <h3 className="text-xl  font-semibold">
                A PLANNED WAY OF THERAPY
              </h3>
              <p className="text-gray-600 leading-7">
                Based on the graphical presentation of all activities, it will
                be easy to track children’s activities and assist therapists in
                making informed decisions regarding applied therapy and behavior
                analysis.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="flex items-start mb-8 gap-4" data-aos="fade-up">
            <img className="h-12 w-12 mr-4" src={visionLogo} alt="Vision" />
            <div>
              <h3 className="text-xl font-semibold">VISION</h3>
              <p className="text-gray-600 leading-7">
                Our vision is to empower parents, therapists, and caregivers
                with a powerful tool that enhances the understanding and
                management of autistic children’s activities.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="flex items-start gap-4" data-aos="fade-up">
            <FontAwesomeIcon
              icon={faAnchor}
              size="2xl"
              className="text-teal-500"
            />
            <div className="ml-6">
              <h3 className="text-xl font-semibold">MISSION</h3>
              <p className="text-gray-600 leading-7">
                Our mission is to provide a comprehensive web-based application
                that effectively tracks and analyzes the activities of autistic
                children.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Image */}
        <div
          className="flex justify-center lg:justify-end md:p-0 mb-4 p-4"
          data-aos="fade-up"
        >
          <img
            className="w-full max-w-md  rounded-xl shadow-lg"
            src={kidPicture}
            alt="Kid playing with blocks"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
