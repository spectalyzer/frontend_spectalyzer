import React from "react";
import dataCollectionIcon from "../../assets/animated icon/database-table.gif";
import dataAnalysisicon from "../../assets/animated icon/gears.gif";
import graphIcon from "../../assets/animated icon/line-bars.gif";
import planningIcon from "../../assets/animated icon/stethoscope.gif";
import observationLogo from "../../assets/animated icon/search-file.gif";
import dataCollectionIcon2 from "../../assets/animated icon/database-table2.gif";

const HowWorks = () => {
  return (
    <div className="">
      <div className="mt-4 " id="how-works">
        <div className="text-center ">
          <p className="text-3xl font-semibold">
            STEPS OF <span className="text-teal-500">SPECTALYZER</span>
          </p>
          <p className=" text-lg italic text-gray-500">How It Works</p>
          <hr className="w-20 bg-gray-500 mx-auto  h-[3px] border-0" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10  mb-32">
          <div className="text-center">
            <img
              className="mx-auto h-[10vh] w-[10vh]"
              src={dataCollectionIcon2}
              alt="Data Collection"
            />
            <p className=" text-xl font-semibold">DATA COLLECTION</p>
            <hr className="w-20 bg-gray-500 mx-auto  h-[2px] border-0" />
            <p className=" text-gray-600 text-lg">
              Every day we will get a set of data. Usually, the <br />
              Parents are the Main Data Collector.
            </p>
          </div>

          <div className="text-center">
            <img
              className="mx-auto h-[10vh] w-[10vh]"
              src={dataAnalysisicon}
              alt="Data Analysis"
            />
            <p className=" text-xl font-semibold">DATA ANALYSIS</p>
            <hr className="w-20 bg-gray-500 mx-auto  h-[2px] border-0" />
            <p className=" text-gray-600 text-lg">
              Expert personnel will analyze the data. With the <br /> help of
              factor analysis, we will get a Score for Each Day.
            </p>
          </div>

          <div className="text-center">
            <img
              className="mx-auto h-[10vh] w-[10vh]"
              src={graphIcon}
              alt="Graphical Presentation"
            />
            <p className=" text-xl font-semibold">GRAPHICAL PRESENTATION</p>
            <hr className="w-20 bg-gray-500 mx-auto h-[2px] border-0" />
            <p className=" text-gray-600 text-lg">
              Based on the analysis, the result will be shown by some graph.
            </p>
          </div>

          <div className="text-center">
            <img
              className="mx-auto h-[10vh] w-[10vh]"
              src={planningIcon}
              alt="Therapy Planning"
            />
            <p className=" text-xl font-semibold">THERAPY PLANNING</p>
            <hr className="w-20 bg-gray-500 mx-auto  h-[2px] border-0" />
            <p className=" text-gray-600 text-lg">
              Therapist will plan for the therapy and other <br />
              activities based on the analysis.
            </p>
          </div>

          <div className="text-center">
            <img
              className="mx-auto h-[10vh] w-[10vh]"
              src={observationLogo}
              alt="Observation"
            />
            <p className=" text-xl font-semibold">OBSERVATION</p>
            <hr className="w-20 bg-gray-500 mx-auto  h-[2px] border-0" />
            <p className="text-gray-600 text-lg">
              Observe the condition of the student and collect <br /> data.
            </p>
          </div>

          <div className="text-center">
            <img
              className="mx-auto h-[10vh] w-[10vh]"
              src={dataCollectionIcon2}
              alt="Data Collection"
            />
            <p className=" text-xl font-semibold">DATA COLLECTION</p>
            <hr className="w-20 bg-gray-500 mx-auto  h-[2px] border-0" />
            <p className=" text-gray-600 text-lg">
              Based on the observation collect data for further analysis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowWorks;
