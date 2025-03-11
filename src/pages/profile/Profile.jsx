import React, { useEffect, useState } from "react";
import { getToken } from "../../services/LocalStorageService";
import { useGetLoggedUserQuery } from "../../services/userAuthApi";

const Profile = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const token = getToken();
  const { data, isSuccess } = useGetLoggedUserQuery(token);

  const [userData, setUserData] = useState({
    name: "",
    father_name: "",
    mother_name: "",
    date_of_birth: "",
    gender: "",
    phone_num: "",
    address: "",
    email: "",
  });

  useEffect(() => {
    if (data && isSuccess) {
      setUserData({
        name: data.user.name,
        father_name: data.user.father_name,
        mother_name: data.user.mother_name,
        date_of_birth: new Date(data.user.date_of_birth).toLocaleDateString(),
        gender: data.user.gender,
        phone_num: data.user.phone_num,
        address: data.user.address,
        email: data.user.email,
      });
    }
  }, [data, isSuccess]);

  return (
    <div className="container mx-auto py-16 px-4">
      {/* Profile Information Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-12">
        <h1 className="text-3xl font-bold">Your Profile</h1>
        <br />
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-6 items-center">
            <div>
              <h2 className="text-2xl font-semibold">{userData.name}</h2>
              <p className="text-lg text-gray-600">Email: {userData.email}</p>
              <p className="text-lg text-gray-600">
                Phone: {userData.phone_num}
              </p>
              <p className="text-lg text-gray-600">
                Address: {userData.address}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* User Details Card */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">User Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="font-semibold">Full Name:</p>
            <p>{userData.name}</p>
          </div>
          <div>
            <p className="font-semibold">Father's Name:</p>
            <p>{userData.father_name}</p>
          </div>
          <div>
            <p className="font-semibold">Mother's Name:</p>
            <p>{userData.mother_name}</p>
          </div>
          <div>
            <p className="font-semibold">Date of Birth:</p>
            <p>{userData.date_of_birth}</p>
          </div>
          <div>
            <p className="font-semibold">Gender:</p>
            <p>{userData.gender}</p>
          </div>
          <div>
            <p className="font-semibold">Phone Number:</p>
            <p>{userData.phone_num}</p>
          </div>
          <div>
            <p className="font-semibold">Address:</p>
            <p>{userData.address}</p>
          </div>
          <div>
            <p className="font-semibold">Email:</p>
            <p>{userData.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
