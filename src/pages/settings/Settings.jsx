import React, { useState, useEffect } from "react";
import { getToken } from "../../services/LocalStorageService";
import {
  useGetLoggedUserQuery,
  useChangePasswordMutation,
} from "../../services/userAuthApi";
import logo from "../../assets/images/favicon.jpg"; // Adjust path if needed

const Settings = () => {
  // Local state for user profile form
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    address: "",
  });

  // Local state for password form
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // UI states
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Get token from localStorage
  const token = getToken();

  // 1) Fetch user data with `useGetLoggedUserQuery`
  const {
    data: userDataResponse,
    isLoading: userLoading,
    isError: userError,
  } = useGetLoggedUserQuery(token);

  // 2) Password change mutation
  const [
    changePassword,
    { isLoading: isChanging, isError: changeError, isSuccess: changeSuccess },
  ] = useChangePasswordMutation();

  // 3) Handle success/error for password change
  useEffect(() => {
    if (changeSuccess) {
      // Show success modal
      setShowSuccessModal(true);
      // Reset password fields
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
    if (changeError) {
      setShowErrorModal(true);
    }
  }, [changeSuccess, changeError]);

  // 4) Fake "progress bar" effect while user data is loading
  useEffect(() => {
    let interval;
    if (userLoading) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => (prev < 100 ? prev + 10 : 100));
      }, 200);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [userLoading]);

  // 5) Once we have user data, fill the form
  useEffect(() => {
    if (userDataResponse?.user) {
      setFormData({
        fullName: userDataResponse.user.name || "",
        phoneNumber: userDataResponse.user.phone_num || "",
        email: userDataResponse.user.email || "",
        address: userDataResponse.user.address || "",
      });
      setIsLoading(false);
    }
  }, [userDataResponse]);

  // 6) Handlers for the profile form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 7) Handlers for password form
  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match");
      return;
    }
    await changePassword({
      token,
      oldPassword: passwordData.oldPassword,
      newPassword: passwordData.newPassword,
      confirmPassword: passwordData.confirmPassword,
    });
  };

  // 8) If still loading user data, show a "loading" screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-50 z-50">
        <div className="text-center">
          <img
            src={logo}
            alt="Loading Logo"
            className="mx-auto mb-4 w-48 h-auto"
          />
          <div className="relative w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute top-0 h-full bg-blue-600 transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  // 9) If there's an error fetching user data
  if (userError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="text-7xl font-bold text-gray-800">404</h1>
          <p className="text-6xl text-gray-600 mt-2">Not Found</p>
        </div>
      </div>
    );
  }

  // 10) Render the Settings page
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 m-16">
      {/* Left Side: Personal Information */}
      <div className="bg-white pl-8 pr-8 pb-8 pt-4 shadow-lg rounded-md">
        <h3 className="text-lg font-semibold text-gray-700 border-b pb-4 mb-4">
          Personal Information
        </h3>
        <form>
          <div>
            <label className="block text-base font-bold text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mt-4">
            <label className="block text-base font-bold text-gray-600">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mt-4">
            <label className="block text-base font-bold text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mt-4">
            <label className="block text-base font-bold text-gray-600">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="1"
            ></textarea>
          </div>

          <div className="mt-8">
            <input
              value="Update"
              type="submit"
              className="font-semibold bg-blue-600 px-5 py-2 text-base font-medium text-white hover:bg-opacity-90 w-2/6 rounded-md transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            />
          </div>
        </form>
      </div>

      {/* Right Side: Change Password Section */}
      <div className="space-y-6">
        <div className="bg-white pl-8 pr-8 pb-8 pt-4 mt-4 shadow-lg rounded-md">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-4 mb-4">
            Change Password
          </h3>
          <form onSubmit={handlePasswordSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-600 mb-2">
                Current Password
              </label>
              <input
                type="password"
                name="oldPassword"
                value={passwordData.oldPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-600 mb-2">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-600 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="tracking-wide font-semibold bg-blue-600 px-5 py-2 text-base font-medium text-white hover:bg-opacity-90 w-2/6 rounded-md transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-semibold text-gray-700">
              Password Changed Successfully
            </h3>
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => setShowSuccessModal(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-semibold text-gray-700">
              Current Password Invalid
            </h3>
            <button
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
              onClick={() => setShowErrorModal(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
