import React, { useState } from "react";
import "./Student.css";
import Contact from "../../components/contact/Contact";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "./../../services/userAuthApi";
import { storeToken } from "../../services/LocalStorageService";
import TermsModal from "../../components/modals/TermsModal";

const Student = () => {
  const [formData, setFormData] = useState({
    name: "",
    father_name: "",
    mother_name: "",
    date_of_birth: "",
    gender: "",
    phone_num: "",
    address: "",
    email: "",
    password: "",
    password_confirmation: "",
    tc: false,
  });

  // We'll console.log the error to confirm it's being set
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "", // 'error' or 'success'
  });

  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.name &&
      formData.email &&
      formData.password &&
      formData.password_confirmation &&
      formData.phone_num &&
      formData.tc &&
      formData.father_name &&
      formData.mother_name &&
      formData.date_of_birth &&
      formData.gender &&
      formData.address
    ) {
      if (formData.password === formData.password_confirmation) {
        try {
          // Attempt to register user
          const res = await registerUser(formData).unwrap();

          console.log("Registration Response:", res);

          if (res.token) {
            setError({
              status: true,
              msg: "Registration Successful",
              type: "success", // Show success
            });
            storeToken(res.token);
            navigate("/login");
          } else {
            console.log("Unexpected Response Format:", res);
            setError({
              status: true,
              msg: "Unexpected server response",
              type: "error",
            });
          }
        } catch (err) {
          console.error("Registration API Error:", err);
          setError({
            status: true,
            msg: err?.data?.message || "Registration Failed",
            type: "error",
          });
        }
      } else {
        setError({
          status: true,
          msg: "Password and Confirm Password Don't Match",
          type: "error",
        });
      }
    } else {
      setError({ status: true, msg: "All Fields are Required", type: "error" });
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setError({ status: false, msg: "", type: "" });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeTermsModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="student-reg">
      <div className="student-register-heading">
        <p>STUDENT REGISTRATION FORM</p>
        <p className="warning-text">
          "<span className="star">*</span>" indicates required fields
        </p>
      </div>
      <form className="reg-form" onSubmit={handleSubmit}>
        <p className="field-title">
          Name of the Student <span className="star">*</span>
        </p>
        <div className="applicants-info">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <p className="field-title">
          Father's Name <span className="star">*</span>
        </p>
        <div className="applicants-info">
          <input
            type="text"
            name="father_name"
            value={formData.father_name}
            onChange={handleChange}
            required
          />
        </div>

        <p className="field-title">
          Mother's Name <span className="star">*</span>
        </p>
        <div className="applicants-info">
          <input
            type="text"
            name="mother_name"
            value={formData.mother_name}
            onChange={handleChange}
            required
          />
        </div>

        <p className="field-title">
          Date of Birth <span className="star">*</span>
        </p>
        <div className="applicants-info">
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            required
          />
        </div>

        <p className="field-title">
          Gender <span className="star">*</span>
        </p>
        <div className="applicants-info">
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <p className="field-title">
          Mobile Number <span className="star">*</span>
        </p>
        <div className="single-field">
          <input
            type="text"
            name="phone_num"
            value={formData.phone_num}
            onChange={handleChange}
            required
          />
        </div>

        <p className="field-title">
          Address <span className="star">*</span>
        </p>
        <div className="applicants-info">
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <p className="field-title">Email</p>
        <div className="single-field">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <p className="field-title">Password</p>
        <div className="applicants-info">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <p className="field-title">Confirm Password</p>
        <div className="applicants-info">
          <input
            type="password"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            required
          />
        </div>

        <p className="field-title">Accept Terms & Conditions</p>
        <div className="single-field">
          <label>
            <input
              type="checkbox"
              name="tc"
              checked={formData.tc}
              onChange={(e) => {
                handleChange(e);
                if (!formData.tc) {
                  openModal();
                }
              }}
            />
            <span className="custom-checkbox"></span> I accept the terms and
            conditions
          </label>
        </div>

        <div>
          <input type="submit" className="submit-btn" disabled={isLoading} />
        </div>
      </form>

      {/* Error/Success Message Modal */}
      {error.status && (
        <div className="fixed z-[9999] inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75">
          <div className="inline-block align-middle bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all max-w-md w-full">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              {error.type === "error" ? (
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
              ) : (
                <svg
                  className="h-6 w-6 text-green-600"
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <h3
                className="text-lg leading-6 font-medium text-gray-900"
                id="modal-headline"
              >
                {error.type === "error" ? "Error" : "Success"}
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
      <TermsModal isOpen={isModalOpen} closeModal={closeTermsModal} />
      <Contact />
      <Footer />
    </div>
  );
};

export default Student;
