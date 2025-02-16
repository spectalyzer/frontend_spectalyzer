import React, { useState, useEffect } from "react";
import Contact from "../../components/contact/Contact";
import Footer from "../../components/footer/Footer";
import { useGetUserEntriesQuery } from "../../services/getEntries.js";
import { useGetLoggedUserQuery } from "../../services/userAuthApi";

const DailyData = () => {
  // 1) Retrieve the token from localStorage
  const token = localStorage.getItem("token");

  // 2) Fetch logged user data
  const { data: loggedUserData, isSuccess: isUserSuccess } =
    useGetLoggedUserQuery(token);

  // 3) Store user name
  const [userName, setUserName] = useState("Unknown User");
  useEffect(() => {
    if (loggedUserData && isUserSuccess) {
      setUserName(loggedUserData.user.name);
    }
  }, [loggedUserData, isUserSuccess]);

  // 4) Fetch user entries
  const { data, error, isLoading } = useGetUserEntriesQuery({ token });

  // 5) Date filtering state
  const [filterDate, setFilterDate] = useState("");

  // 6) Filtered entries array
  const [filteredEntries, setFilteredEntries] = useState([]);

  // 7) Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  // 8) On data/filter change, rebuild `filteredEntries` and reset to page 1
  useEffect(() => {
    if (data?.data) {
      let newEntries = data.data;
      if (filterDate) {
        newEntries = data.data.filter((entry) => {
          const recordDate = new Date(entry.dateOfRecord)
            .toISOString()
            .split("T")[0];
          return recordDate === filterDate;
        });
      }
      setFilteredEntries(newEntries);
      setCurrentPage(1); // reset to page 1 if filter changes
    }
  }, [data, filterDate]);

  // 9) Determine which entries to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedEntries = filteredEntries.slice(startIndex, endIndex);

  // 10) Format time object { hour, minute }
  const formatTime = (timeObj) => {
    if (!timeObj) return "N/A";
    const { hour, minute } = timeObj;
    return `${hour}:${minute.toString().padStart(2, "0")}`;
  };

  // 11) Calculate total pages
  const totalPages = Math.ceil(filteredEntries.length / itemsPerPage);

  // Handlers for pagination
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-2">Hello, {userName}</h1>
      <p className="mb-4">Below are your daily data entries.</p>

      {/* Date Filter */}
      <div className="mb-4 flex items-center">
        <label className="mr-2 font-medium">Filter by Date:</label>
        <input
          className="border bg-white rounded-md p-1"
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
        {filterDate && (
          <button
            onClick={() => setFilterDate("")}
            className="ml-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Clear Filter
          </button>
        )}
      </div>

      {/* Loading / Error states */}
      {isLoading && <p className="text-gray-600">Loading user entries...</p>}
      {error && (
        <p className="text-red-500">
          Error fetching user entries. Please try again.
        </p>
      )}

      {/* Responsive Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mb-16">
        {displayedEntries.map((entry, idx) => {
          const localDate = new Date(entry.dateOfRecord).toLocaleDateString(
            "en-CA"
          );
          return (
            <div
              key={idx}
              className="border border-gray-300 rounded-lg p-4 bg-gray-50 "
            >
              <h3 className="font-semibold mb-4">Date: {localDate}</h3>
              <ul className="list-none p-0 m-0 text-gray-700">
                <li className="font-medium mb-4">
                  Wake Up Time:{" "}
                  <span className="font-normal">
                    {formatTime(entry.wakeUpTime)}
                  </span>
                </li>
                <li className="font-medium mb-4">
                  Waking Up:{" "}
                  <span className="font-normal">{entry.wakingUp}</span>
                </li>
                <li className="font-medium mb-4">
                  First Go Out:{" "}
                  <span className="font-normal">{entry.firstGoOut}</span>
                </li>
                <li className="font-medium mb-4">
                  First Screen On:{" "}
                  <span className="font-normal">{entry.firstScreenOn}</span>
                </li>
                <li className="font-medium mb-4">
                  Breakfast:{" "}
                  <span className="font-normal">{entry.breakfast}</span>
                </li>
                <li className="font-medium mb-4">
                  Schooling:{" "}
                  <span className="font-normal">{entry.schooling}</span>
                </li>
                <li className="font-medium mb-4">
                  Class Activity:{" "}
                  <span className="font-normal">{entry.classActivity}</span>
                </li>
                <li className="font-medium mb-4">
                  Outdoor Activity:{" "}
                  <span className="font-normal">{entry.outdoorActivity}</span>
                </li>
                <li className="font-medium mb-4">
                  Therapy At School:{" "}
                  <span className="font-normal">{entry.therapyAtSchool}</span>
                </li>
                <li className="font-medium mb-4">
                  Therapy Type:{" "}
                  <span className="font-normal">{entry.therapyType}</span>
                </li>
                <li className="font-medium mb-4">
                  Lunch: <span className="font-normal">{entry.lunch}</span>
                </li>
                <li className="font-medium mb-4">
                  Evening Snacks:{" "}
                  <span className="font-normal">{entry.eveningSnacks}</span>
                </li>
                <li className="font-medium mb-4">
                  Dinner: <span className="font-normal">{entry.dinner}</span>
                </li>
                <li className="font-medium mb-4">
                  Going To Sleep:{" "}
                  <span className="font-normal">{entry.goingToSleep}</span>
                </li>
                <li className="font-medium mb-4">
                  Go To Bed At:{" "}
                  <span className="font-normal">
                    {formatTime(entry.goToBedAt)}
                  </span>
                </li>
                <li className="font-medium mb-4">
                  Sleep At:{" "}
                  <span className="font-normal">
                    {formatTime(entry.sleepAt)}
                  </span>
                </li>
                <li className="font-medium mb-4">
                  Getting Sleep Time:{" "}
                  <span className="font-normal">{entry.gettingSleepTime}</span>
                </li>
                <li className="font-medium mb-4">
                  Outgoing Tendency:{" "}
                  <span className="font-normal">{entry.outgoingTendency}</span>
                </li>
                <li className="font-medium mb-4">
                  Outgoing Count:{" "}
                  <span className="font-normal">{entry.outgoingCount}</span>
                </li>
                <li className="font-medium mb-4">
                  Screen Time:{" "}
                  <span className="font-normal">{entry.screenTime}</span>
                </li>
                <li className="font-medium mb-4">
                  Junk Food:{" "}
                  <span className="font-normal">{entry.junkFood}</span>
                </li>
                <li className="font-medium mb-4">
                  Making Noise:{" "}
                  <span className="font-normal">{entry.makingNoise}</span>
                </li>
                <li className="font-medium mb-4">
                  Walking: <span className="font-normal">{entry.walking}</span>
                </li>
                <li className="font-medium mb-4">
                  Showing Anger:{" "}
                  <span className="font-normal">{entry.showingAnger}</span>
                </li>
                <li className="font-medium mb-4">
                  Glass Crash Tendency:{" "}
                  <span className="font-normal">
                    {entry.glassCrashTendency}
                  </span>
                </li>
                <li className="font-medium mb-4">
                  Pushing Tendency:{" "}
                  <span className="font-normal">{entry.pushingTendency}</span>
                </li>
                <li className="font-medium mb-4">
                  Item Throw Tendency:{" "}
                  <span className="font-normal">{entry.itemThrowTendency}</span>
                </li>
                <li className="font-medium mb-4">
                  Food/Water Throw Tendency:{" "}
                  <span className="font-normal">
                    {entry.foodWaterThrowTendency}
                  </span>
                </li>
                <li className="font-medium mb-4">
                  Hit With Hand:{" "}
                  <span className="font-normal">{entry.hitWithHand}</span>
                </li>
                <li className="font-medium mb-4">
                  Hit With Head:{" "}
                  <span className="font-normal">{entry.hitWithHead}</span>
                </li>
                <li className="font-medium mb-4">
                  Cooperate At School:{" "}
                  <span className="font-normal">{entry.cooperateAtSchool}</span>
                </li>
                <li className="font-medium mb-4">
                  Cooperate At Home:{" "}
                  <span className="font-normal">{entry.cooperateAtHome}</span>
                </li>
                <li className="font-medium mb-4">
                  Cutting Nails:{" "}
                  <span className="font-normal">{entry.cuttingNails}</span>
                </li>
                <li className="font-medium mb-4">
                  Hair Dressing:{" "}
                  <span className="font-normal">{entry.hairDressing}</span>
                </li>
                <li className="font-medium mb-4">
                  Bedwetting:{" "}
                  <span className="font-normal">{entry.bedwetting}</span>
                </li>
                <li className="font-medium mb-4">
                  Regular Medication:{" "}
                  <span className="font-normal">{entry.regularMedication}</span>
                </li>
                <li className="font-medium mb-4">
                  Other Sickness:{" "}
                  <span className="font-normal">{entry.otherSickness}</span>
                </li>
                <li className="font-medium mb-4">
                  Name Of Sickness:{" "}
                  <span className="font-normal">{entry.nameOfSickness}</span>
                </li>
                <li className="font-medium mb-4">
                  Med Other Sickness:{" "}
                  <span className="font-normal">{entry.medOtherSickness}</span>
                </li>
                <li className="font-medium mb-4">
                  List Of Medicine:{" "}
                  <span className="font-normal">{entry.listOfMedicine}</span>
                </li>
                <li className="font-medium mb-4">
                  Masturbation:{" "}
                  <span className="font-normal">{entry.masturbation}</span>
                </li>
                <li className="font-medium mb-4">
                  Toilet: <span className="font-normal">{entry.toilet}</span>
                </li>
                <li className="font-medium mb-4">
                  Overnight Sleeping:{" "}
                  <span className="font-normal">{entry.overnightSleeping}</span>
                </li>
                <li className="font-medium mb-4">
                  Special Activity:{" "}
                  <span className="font-normal">{entry.specialActivity}</span>
                </li>
              </ul>
            </div>
          );
        })}
      </div>

      {/* If no entries found for the filter */}
      {!isLoading && displayedEntries.length === 0 && (
        <p className="mt-4 text-gray-500">No entries found for that date.</p>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center mt-6 flex-wrap gap-2">
          {/* Previous Button */}
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageClick(pageNumber)}
                className={`px-3 py-1 rounded-md ${
                  pageNumber === currentPage
                    ? "bg-blue-600 text-white"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {pageNumber}
              </button>
            )
          )}

          {/* Next Button */}
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      <Contact />
      <Footer />
    </div>
  );
};

export default DailyData;
