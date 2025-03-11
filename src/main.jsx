import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
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
import { LoaderProvider } from "./components/loader/Loader.jsx"; // Import the LoaderProvider
import PrivacyPolicy from "./components/privacypolicy/PrivacyPolicy.jsx";

const token = localStorage.getItem("token");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/student",
        element: !token ? <Student /> : <Navigate to="/profile" />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/privacypolicy",
        element: <PrivacyPolicy />,
      },
    ],
  },
  {
    path: "/studentoverview",
    element: <StudentLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "dailyreports",
        element: <DailyResults />,
      },
      {
        path: "dailydata",
        element: <DailyData />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "dataentry",
        element: <DataEntry />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <LoaderProvider>
        <RouterProvider router={router} />
      </LoaderProvider>
    </Provider>
  </React.StrictMode>
);
