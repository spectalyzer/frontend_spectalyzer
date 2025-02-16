import React, { useState } from "react";
import "./Login.css";
import Contact from "../../components/contact/Contact";
import Footer from "../../components/footer/Footer";
import { NavLink, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../services/userAuthApi";
import { storeToken } from "../../services/LocalStorageService";

const Login = () => {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    if (actualData.email && actualData.password) {
      try {
        const res = await loginUser(actualData).unwrap();
        console.log("Login Response:", res);

        if (res.status === "success") {
          document.getElementById("login-form").reset();
          setError({ status: true, msg: "Login Success", type: "success" });
          storeToken(res.token);
          navigate("/studentoverview/profile");
        } else {
          setError({
            status: true,
            msg: res.message || "Login Failed",
            type: "error",
          });
        }
      } catch (err) {
        console.error("Login Error:", err);
        setError({
          status: true,
          msg: "You are not a Registered User",
          type: "error",
        });
      }
    } else {
      setError({ status: true, msg: "All Fields are Required", type: "error" });
    }
  };

  const closeModal = () => {
    setError({ status: false, msg: "", type: "" });
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit} id="login-form">
        <div className="login-sec">
          <p className="login-title">Username or E-mail</p>
          <input className="name-field" name="email" type="email" required />
          <p className="login-title">Password</p>
          <input
            className="pass-field"
            name="password"
            type="password"
            required
          />
        </div>

        <div className="btn-section">
          <input type="submit" className="login-btn" disabled={isLoading} />
        </div>
        <NavLink to="/sendpasswordresetemail" className="forgot_pass">
          Forgot Password?
        </NavLink>
        {error.status && (
          <p className={`error-msg ${error.type}`}>{error.msg}</p>
        )}
      </form>

      <Contact />
      <Footer />

      {/* Error Message Modal */}
      {error.status && (
        <div className="fixed z-50 inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75">
          <div className="inline-block align-middle bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all max-w-md w-full">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <svg
                className="h-6 w-6 text-red-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <h3
                className="text-lg leading-6 font-medium text-gray-900"
                id="modal-headline"
              >
                Error
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">{error.msg}</p>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                onClick={closeModal}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
