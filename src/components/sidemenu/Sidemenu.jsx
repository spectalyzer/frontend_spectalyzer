import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHouse,
  faBook,
  faChartLine,
  faGear,
  faRightFromBracket,
  faDatabase,
  faKeyboard,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../../services/LocalStorageService";
import { useGetLoggedUserQuery } from "../../services/userAuthApi";

const Sidemenu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = getToken();
  const { data: user, isLoading, isError } = useGetLoggedUserQuery(token); // Pass token here

  const handleLogout = () => {
    removeToken("token");
    navigate("/");
  };

  return (
    <div
      className={`flex flex-col h-[calc(100vh-90px)] bg-[#F6FAFD] border-r ${
        isMobileMenuOpen ? "w-32" : "w-16"
      } md:w-64 transition-all duration-300`}
    >
      <div className="md:hidden p-4">
        <button
          className="text-gray-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <FontAwesomeIcon icon={faBars} size="" />
        </button>
      </div>

      <div className="flex-grow flex items-center flex-col md:ml-0">
        <nav className="mt-4">
          <NavLink
            to="/studentoverview/profile"
            className={({ isActive }) =>
              isActive
                ? "flex items-center p-3 text-gray-900 bg-gray-200 no-underline"
                : "flex items-center p-3 text-gray-600 hover:bg-gray-200 hover:text-gray-900 no-underline"
            }
          >
            <FontAwesomeIcon icon={faHouse} size="xl" />
            <span
              className={`ml-4 text-sm font-medium ${
                isMobileMenuOpen ? "block" : "hidden"
              } md:block`}
            >
              Home
            </span>
          </NavLink>

          <NavLink
            to="/studentoverview/dashboard"
            className={({ isActive }) =>
              isActive
                ? "flex items-center p-3 text-gray-900 bg-gray-200"
                : "flex items-center p-3 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
            }
          >
            <FontAwesomeIcon icon={faChartLine} size="xl" />
            <span
              className={`ml-4 text-sm font-medium ${
                isMobileMenuOpen ? "block" : "hidden"
              } md:block`}
            >
              Dashboard
            </span>
          </NavLink>

          <NavLink
            to="/studentoverview/dailyreports"
            className={({ isActive }) =>
              isActive
                ? "flex items-center p-3 text-gray-900 bg-gray-200"
                : "flex items-center p-3 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
            }
          >
            <FontAwesomeIcon icon={faBook} size="xl" color="black" />
            <span
              className={`ml-4 text-sm font-medium ${
                isMobileMenuOpen ? "block" : "hidden"
              } md:block`}
            >
              Reports
            </span>
          </NavLink>
          <NavLink
            to="/studentoverview/dataentry"
            className={({ isActive }) =>
              isActive
                ? "flex items-center p-3 text-gray-900 bg-gray-200"
                : "flex items-center p-3 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
            }
          >
            <FontAwesomeIcon icon={faKeyboard} size="xl" />
            <span
              className={`ml-4 text-sm font-medium ${
                isMobileMenuOpen ? "block" : "hidden"
              } md:block`}
            >
              Data Entry
            </span>
          </NavLink>
          <NavLink
            to="/studentoverview/dailydata"
            className={({ isActive }) =>
              isActive
                ? "flex items-center p-3 text-gray-900 bg-gray-200"
                : "flex items-center p-3 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
            }
          >
            <FontAwesomeIcon icon={faDatabase} size="xl" />
            <span
              className={`ml-4 text-sm font-medium ${
                isMobileMenuOpen ? "block" : "hidden"
              } md:block`}
            >
              Daily Entries
            </span>
          </NavLink>

          <p className="mt-12 flex items-center justify-center h-16 border-b"></p>

          <NavLink
            to="/studentoverview/settings"
            className={({ isActive }) =>
              isActive
                ? "flex items-center p-3 text-gray-900 bg-gray-200"
                : "flex items-center p-3 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
            }
          >
            <FontAwesomeIcon icon={faGear} size="xl" />
            <span
              className={`ml-4 text-sm font-medium ${
                isMobileMenuOpen ? "block" : "hidden"
              } md:block`}
            >
              Settings
            </span>
          </NavLink>

          <button
            onClick={handleLogout}
            className="flex items-center p-3 text-gray-600 hover:bg-gray-200 hover:text-gray-900 w-full"
          >
            <FontAwesomeIcon icon={faRightFromBracket} size="xl" />
            <span
              className={`ml-4 text-sm font-medium ${
                isMobileMenuOpen ? "block" : "hidden"
              } md:block`}
            >
              Log out
            </span>
          </button>
        </nav>
      </div>

      {/* Profile Card */}
      <div className="p-3 border-t md:block hidden">
        <div className="flex items-center">
          <div className="ml-3">
            {/* Display user name and email */}
            {isLoading ? (
              <p>Loading...</p>
            ) : isError ? (
              <p>Error loading user data</p>
            ) : (
              <>
                <p className="text-sm font-medium text-gray-800">
                  {user?.user?.name || "John Doe"}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.user?.email || "john.doe@example.com"}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidemenu;
