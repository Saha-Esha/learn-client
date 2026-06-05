import React from "react";
import { useAuth } from "../../../Provider/AuthContext.jsx";

const Profile = () => {
  const { student } = useAuth();

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        No profile data found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-6 text-center">
          <div
            className="w-20 h-20 mx-auto rounded-full bg-white text-blue-600 
                          flex items-center justify-center text-3xl font-bold"
          >
            {student.studentname?.charAt(0).toUpperCase()}
          </div>
          <h2 className="mt-4 text-xl font-semibold">{student.studentname}</h2>
          <p className="text-sm opacity-90 capitalize">{student.role}</p>
        </div>

        {/* Details */}
        <div className="p-6 space-y-4">
          <ProfileRow label="User ID" value={student.id} />
          <ProfileRow label="Mobile Number" value={student.mobile} />
          <ProfileRow label="Address" value={student.studentaddress} />
          {student.role === "student" ? (
            <ProfileRow label="Guardian Name" value={student.gurdianname} />
          ) : (
            <></>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <button
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
            onClick={() => {
              localStorage.removeItem("student");
              window.location.reload();
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

const ProfileRow = ({ label, value }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium text-gray-800">{value}</span>
  </div>
);

export default Profile;
