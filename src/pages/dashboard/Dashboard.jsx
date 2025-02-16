import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../dashboard/Dashboard.css";
import Footer from "../../components/footer/Footer";
import Contact from "../../components/contact/Contact";

// Updated to accept { token, selectedDate }:
import { useGetFinalScoreQuery } from "../../services/finalScoreService";
import { useGetLoggedUserQuery } from "../../services/userAuthApi";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Retrieve token
  const token = localStorage.getItem("token");

  // Single date state
  const [selectedDate, setSelectedDate] = useState("");

  // Fetch final score data from server
  // If `selectedDate` is non-empty, it calls /getFinalScore?selectedDate=YYYY-MM-DD
  // If empty, /getFinalScore
  const {
    data: scoreData,
    error,
    isLoading,
    isFetching,
  } = useGetFinalScoreQuery({ token, selectedDate });

  // Fetch user info
  const { data: loggedUserData, isSuccess } = useGetLoggedUserQuery(token);

  // Local state for user
  const [userData, setUserData] = useState({
    id: "",
    name: "",
  });

  // Once we have user info, store it
  useEffect(() => {
    if (loggedUserData && isSuccess) {
      setUserData({
        id: loggedUserData.user._id,
        name: loggedUserData.user.name,
      });
    }
  }, [loggedUserData, isSuccess]);

  // Convert the server data into chart data
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    if (scoreData?.data && scoreData.status === "success") {
      // If the server returns { status: "success", data: [...] }
      const mapped = scoreData.data.map((item) => ({
        date: item.date, // "YYYY-MM-DD"
        score: item.finalScore, // numeric
      }));
      setChartData(mapped);
    } else {
      // Clear chart if no success data
      setChartData([]);
    }
  }, [scoreData]);

  // --- RENDER ---

  return (
    <>
      <div className="dashboard">
        {/* -- Header Section -- */}
        <div className="dashboard-header">
          <h1>Hello {userData.name || "User"}</h1>
          <p>Today is {new Date().toLocaleDateString()}</p>
        </div>

        {/* -- Single Date Input -- */}
        <div
          className="single-date-select bg-white"
          style={{ marginBottom: "1rem" }}
        >
          <label
            className="font-semibold"
            htmlFor="selectedDate"
            style={{ marginRight: "8px" }}
          >
            Select Date:
          </label>
          <input
            id="selectedDate"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{ padding: "4px 8px" }}
            className="border rounded-md"
          />
        </div>

        {/* -- Static Cards -- */}
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>Student</h3>
            <p className="text-lg">ID: {userData.id}</p>
            <span>Name: {userData.name}</span>
          </div>
          <div className="dashboard-card">
            <h3>Supervisor</h3>
            <p>NA</p>
          </div>
        </div>

        {/* -- Chart Section -- */}
        <div className="dashboard-charts-container">
          <div className="chart-card">
            <div className="chart-title">
              <h2>Daily Score of last 30 days</h2>
            </div>

            {/* 1) LOADING / FETCHING STATES */}
            {isLoading && <p>Loading...</p>}
            {isFetching && <p>Fetching updated data...</p>}

            {/* 2) HARD ERROR (e.g. 404/500) */}
            {error && (
              <div
                style={{ color: "red", textAlign: "center", marginTop: "1rem" }}
              >
                {error.data?.message ||
                  "An error occurred. Please try again later."}
              </div>
            )}

            {/* 3) STATUS === "FAILED" from the server (e.g. no data) */}
            {!error && scoreData?.status === "failed" && (
              <div
                className="chart-container"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "300px",
                  color: "red",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {scoreData.message}
              </div>
            )}

            {/* 4) ACTUAL CHART IF WE HAVE DATA */}
            {!error &&
              scoreData?.status === "success" &&
              chartData.length > 0 && (
                <div className="chart-container">
                  <ResponsiveContainer>
                    <LineChart
                      data={chartData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        angle={-45}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#007bff"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}

            {/* 5) IF STATUS === "success" BUT NO DATA */}
            {!error &&
              scoreData?.status === "success" &&
              chartData.length === 0 && (
                <div
                  className="chart-container"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "300px",
                    color: "red",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  No data found for this date.
                </div>
              )}
          </div>
        </div>
      </div>

      {/* -- Contact & Footer -- */}
      <Contact />
      <Footer />
    </>
  );
};

export default Dashboard;
