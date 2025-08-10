import React, { useContext } from "react";
import { FaUserEdit, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { AuthContext } from "../../Auth/AuthContext";

const UserProfile = () => {
  const { user, theme } = useContext(AuthContext);

  return (
    <div className="flex items-center justify-center py-12 px-6">
      <div
        className={`shadow-lg rounded-2xl p-6 w-full max-w-3xl ${
          theme  ? "dark-theme" : "bg-white"
        }`}
      >
        {/* Header Section */}
        <div className="flex flex-col items-center text-center">
          <img
            src={user?.photoURL || "https://via.placeholder.com/150"}
            alt="Profile"
            className={`w-32 h-32 rounded-full border-4 shadow-lg ${
              theme  ? "border-blue-400" : "border-blue-500"
            }`}
          />
          <h2 className="text-2xl font-bold mt-4">{user?.displayName || "John Doe"}</h2>
          <p className={`${theme  ? "text-gray-300" : "text-gray-600"}`}>
            {user?.role || "Member"}
          </p>
        </div>

        {/* User Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: <FaEnvelope className="text-blue-500 text-xl" />,
              value: user?.email || "example@email.com",
            },
            {
              icon: <FaPhoneAlt className="text-blue-500 text-xl" />,
              value: user?.phone || "+880 123 456 789",
            },
            {
              icon: <FaMapMarkerAlt className="text-blue-500 text-xl" />,
              value: user?.location || "Dhaka, Bangladesh",
            },
            {
              icon: <FaCalendarAlt className="text-blue-500 text-xl" />,
              value: `Joined: ${user?.joined || "Jan 1, 2024"}`,
            },
          ].map(({ icon, value }, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 p-4 rounded-lg shadow-sm ${
                theme  ? "bg-gray-700" : "bg-gray-50"
              }`}
            >
              {icon}
              <span>{value}</span>
            </div>
          ))}
        </div>

        {/* Bio Section */}
        <div
          className={`mt-8 p-6 rounded-lg shadow-sm ${
            theme  ? "bg-gray-700" : "bg-gray-50"
          }`}
        >
          <h3 className="text-lg font-semibold mb-2">About Me</h3>
          <p className={`${theme  ? "text-gray-300" : "text-gray-700"}`}>
            {user?.bio ||
              "I am a passionate learner who loves exploring new technologies and solving problems creatively."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
