import React from "react";
import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom"; // Ensure Navigate is imported
import "./index.css";
import Home from "./components/Layout/Home.jsx";
import Main from "./components/Layout/Main.jsx";
import Student from "./pages/register/Student.jsx";

import Login from "./pages/login/Login.jsx";
import Profile from "./pages/profile/Profile.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import DataEntry from "./pages/data_entry/DataEntry.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import DailyResults from "./pages/dailyResults/DailyResults.jsx";
import StudentLayout from "./components/Layout/StudentLayout.jsx";
import DailyData from "./pages/dailydata/DailyData.jsx";
import Settings from "./pages/settings/Settings.jsx";

const token = localStorage.getItem("token");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/student",
        element: !token ? <Student /> : <Navigate to="/profile" />,
      },

      {
        path: "/login",
        element: <Login></Login>,
      },
    ],
  },

  {
    path: "/studentoverview",
    element: <StudentLayout></StudentLayout>,
    children: [
      {
        path: "dashboard", // This is an absolute path, which is invalid
        element: <Dashboard></Dashboard>,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "dailyreports",
        element: <DailyResults></DailyResults>,
      },
      {
        path: "dailydata",
        element: <DailyData></DailyData>,
      },
      {
        path: "dataentry",
        element: <DataEntry></DataEntry>,
      },
      {
        path: "settings",
        element: <Settings></Settings>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
