import React from "react";
import {
  useGetFoodBarChartDataQuery,
  useGetSleepingLineChartDataQuery,
  useGetscreenTimeBarChartDataQuery,
  useGetmakingNoiseBarChartDataQuery,
  useGetwalkingLineChartDataQuery,
  useGetwakingUpBarChartDataQuery,
  useGetgoingToSleepBarChartDataQuery,
  useGetclassActivityLineChartDataQuery,
  useGetoutdoorActivityLineChartDataQuery,
  useGetjunkFoodLineChartDataQuery,
  useGetShowingAngerAverageCardQuery,
  useGethitWithHandAverageCardQuery,
  useGetoutgoingTendencyAverageCardQuery,
  useGetbedwettingAverageCardQuery,
  useGetcooperateAtSchoolAverageCardQuery,
  useGetschoolingCountCardQuery,
  useGettherapyAtSchoolCountCardQuery,
  // ADD THIS if you have a dedicated endpoint for the pie chart:
  useGetschoolingPieChartDataQuery,
} from "../../services/graphDataService";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  // ADD PIE IMPORTS:
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import "./DailyResults.css";

const transformBarChartData = (data) => {
  const labels = data.labels;
  const datasets = data.datasets;

  return labels.map((label, index) => {
    const entry = { date: label };
    datasets.forEach((dataset) => {
      entry[dataset.label] = dataset.data[index];
    });
    return entry;
  });
};

const transformLineChartData = (data) => {
  const labels = data.labels;
  const dataset = data.datasets[0];

  return labels.map((label, index) => ({
    date: label,
    value: dataset.data[index],
  }));
};

const DailyResults = () => {
  const token = localStorage.getItem("token");

  // Existing queries
  const { data: foodData, isLoading: isFoodLoading } =
    useGetFoodBarChartDataQuery(token);
  const { data: sleepingData, isLoading: isSleepingLoading } =
    useGetSleepingLineChartDataQuery(token);
  const { data: screenTimeData, isLoading: isScreenTimeLoading } =
    useGetscreenTimeBarChartDataQuery(token);
  const { data: noiseData, isLoading: isNoiseLoading } =
    useGetmakingNoiseBarChartDataQuery(token);
  const { data: walkingData, isLoading: isWalkingLoading } =
    useGetwalkingLineChartDataQuery(token);
  const { data: wakingUpData, isLoading: isWakingUpLoading } =
    useGetwakingUpBarChartDataQuery(token);
  const { data: goingToSleepData, isLoading: isGoingToSleepLoading } =
    useGetgoingToSleepBarChartDataQuery(token);

  // NEW: Pie chart data query
  const { data: schoolingPieData, isLoading: isPieLoading } =
    useGetschoolingPieChartDataQuery(token);

  // Transform the data for your charts
  const transformedFoodData =
    foodData && transformBarChartData(foodData.data.last7day);
  const transformedSleepingData =
    sleepingData && transformLineChartData(sleepingData.data.last7day);
  const transformedScreenTimeData =
    screenTimeData && transformBarChartData(screenTimeData.data.last7day);
  const transformedNoiseData =
    noiseData && transformBarChartData(noiseData.data.last7day);
  const transformedWalkingData =
    walkingData && transformLineChartData(walkingData.data.last7day);
  const transformedWakingUpData =
    wakingUpData && transformBarChartData(wakingUpData.data.last7day);
  const transformedGoingToSleepData =
    goingToSleepData && transformBarChartData(goingToSleepData.data.last7day);

  // Pie Chart data transformation
  const pieChartData = schoolingPieData?.data?.labels.map((label, index) => ({
    name: label,
    value: schoolingPieData.data.datasets[0].data[index],
    backgroundColor: schoolingPieData.data.datasets[0].backgroundColor[index],
  }));

  const { data: classActivityData } =
    useGetclassActivityLineChartDataQuery(token);
  const { data: outdoorActivityData } =
    useGetoutdoorActivityLineChartDataQuery(token);
  const { data: junkFoodData } = useGetjunkFoodLineChartDataQuery(token);
  const transformedClassActivityData =
    classActivityData &&
    transformLineChartData(classActivityData.data.last7day);
  const transformedOutdoorActivityData =
    outdoorActivityData &&
    transformLineChartData(outdoorActivityData.data.last7day);
  const transformedJunkFoodData =
    junkFoodData && transformLineChartData(junkFoodData.data.last7day);

  const { data: angerData } = useGetShowingAngerAverageCardQuery(token);
  const { data: hitHandData } = useGethitWithHandAverageCardQuery(token);
  const { data: outgoingTendencyData } =
    useGetoutgoingTendencyAverageCardQuery(token);
  const { data: bedwettingData } = useGetbedwettingAverageCardQuery(token);
  const { data: cooperateAtSchoolData } =
    useGetcooperateAtSchoolAverageCardQuery(token);
  const { data: schoolingCountData } = useGetschoolingCountCardQuery(token);
  const { data: therapyAtSchoolCountData } =
    useGettherapyAtSchoolCountCardQuery(token);

  return (
    <div className="daily-results">
      {/* Food Chart Card */}
      <div className="results-card">
        <h3>Food Consumption</h3>
        {isFoodLoading ? (
          <p>Loading...</p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={transformedFoodData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Breakfast" fill="#4CAF50" />
              <Bar dataKey="Lunch" fill="#FF5733" />
              <Bar dataKey="Dinner" fill="#FFC300" />
              <Bar dataKey="Evening Snacks" fill="#900C3F" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Sleeping Chart Card */}
      <div className="results-card">
        <h3>Sleeping Patterns</h3>
        {isSleepingLoading ? (
          <p>Loading...</p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={transformedSleepingData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#4CAF50" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Screen Time Chart Card */}
      <div className="results-card">
        <h3>Screen Time</h3>
        {isScreenTimeLoading ? (
          <p>Loading...</p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={transformedScreenTimeData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Screen Time (Last 7 Entries)" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Noise Levels Chart Card */}
      <div className="results-card">
        <h3>Noise Levels</h3>
        {isNoiseLoading ? (
          <p>Loading...</p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={transformedNoiseData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Making Noise (Last 7 Entries)" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Additional Walking Chart Card */}
      <div className="results-card">
        <h3>Walking</h3>
        {isWalkingLoading ? (
          <p>Loading...</p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={transformedWalkingData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#4CAF50" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Additional Waking Up Chart Card */}
      <div className="results-card">
        <h3>Waking Up</h3>
        {isWakingUpLoading ? (
          <p>Loading...</p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={transformedWakingUpData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Waking Up (Last 7 Entries)" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Additional Going to Sleep Chart Card */}
      <div className="results-card">
        <h3>Going to Sleep</h3>
        {isGoingToSleepLoading ? (
          <p>Loading...</p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={transformedGoingToSleepData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Going to Sleep (Last 7 Entries)" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Class Activity */}
      <div className="results-card">
        <h3>Class Activity</h3>
        {classActivityData && (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={transformedClassActivityData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line dataKey="value" stroke="#4CAF50" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Outdoor Activity */}
      <div className="results-card">
        <h3>Outdoor Activity</h3>
        {outdoorActivityData && (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={transformedOutdoorActivityData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line dataKey="value" stroke="#4CAF50" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Junk Food Consumption */}
      <div className="results-card">
        <h3>Junk Food Consumption</h3>
        {junkFoodData && (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={transformedJunkFoodData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line dataKey="value" stroke="#4CAF50" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* NEW PIE CHART CARD */}
      <div className="results-card">
        <h3>School and Off Day Ratio</h3>
        {isPieLoading ? (
          <p>Loading...</p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieChartData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.backgroundColor} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Average Cards */}
      <div className="results-card">
        <h3>Showing Anger</h3>
        <p>Last 7 Days: {angerData?.data.last7day.count || "N/A"}</p>
        <p>Previous 7 Days: {angerData?.data.previous7day.count || "N/A"}</p>
      </div>

      <div className="results-card">
        <h3>Hit With Hand</h3>
        <p>Last 7 Days: {hitHandData?.data.last7day.count || "N/A"}</p>
        <p>Previous 7 Days: {hitHandData?.data.previous7day.count || "N/A"}</p>
      </div>

      <div className="results-card">
        <h3>Outgoing Tendency</h3>
        <p>Last 7 Days: {outgoingTendencyData?.data.last7day.count || "N/A"}</p>
        <p>
          Previous 7 Days:{" "}
          {outgoingTendencyData?.data.previous7day.count || "N/A"}
        </p>
      </div>

      <div className="results-card">
        <h3>Bedwetting</h3>
        <p>Last 7 Days: {bedwettingData?.data.last7day.count || "N/A"}</p>
        <p>
          Previous 7 Days: {bedwettingData?.data.previous7day.count || "N/A"}
        </p>
      </div>

      <div className="results-card">
        <h3>Cooperation at School</h3>
        <p>
          Last 7 Days: {cooperateAtSchoolData?.data.last7day.count || "N/A"}
        </p>
        <p>
          Previous 7 Days:{" "}
          {cooperateAtSchoolData?.data.previous7day.count || "N/A"}
        </p>
      </div>

      <div className="results-card">
        <h3>Schooling Count</h3>
        <p>Last 7 Days: {schoolingCountData?.data.last7days.Count || "N/A"}</p>
        <p>
          Previous 7 Days:{" "}
          {schoolingCountData?.data.previous7days.Count || "N/A"}
        </p>
      </div>

      <div className="results-card">
        <h3>Therapy at School</h3>
        <p>
          Last 7 Days: {therapyAtSchoolCountData?.data.last7day.Count || "N/A"}
        </p>
        <p>
          Previous 7 Days:{" "}
          {therapyAtSchoolCountData?.data.previous7day.Count || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default DailyResults;
