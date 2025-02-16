import React from "react";
import Navbar from "../navbar/Navbar";
import Sidemenu from "../sidemenu/Sidemenu";
import { Outlet } from "react-router-dom";

const StudentLayout = () => {
  return (
    <div>
      <Navbar></Navbar>

      <div style={{ display: "flex", maxHeight: "100vh", marginTop: "5rem" }}>
        <Sidemenu></Sidemenu>
        <div className="content w-full bg-white overflow-y-auto">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default StudentLayout;
