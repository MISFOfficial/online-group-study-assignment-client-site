import React, { use } from "react";
import { motion } from "framer-motion";
import { FaUsers, FaBook, FaLaptopCode } from "react-icons/fa";
import { AuthContext } from "../../Auth/AuthContext";

const About = () => {
  const { theme } = use(AuthContext)

  return (
    <div
      className={`min-h-screen py-12 px-6 transition-colors duration-500 ${
        theme
          ? "bg-gray-900 text-gray-200"
          : "bg-gradient-to-b from-blue-50 to-white text-gray-800"
      }`}
    >
      {/* Page Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`text-4xl font-bold text-center mb-4 ${
          theme ? "text-blue-400" : "text-blue-700"
        }`}
      >
        About Us
      </motion.h1>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className={`text-lg text-center max-w-2xl mx-auto ${
          theme ? "text-gray-300" : "text-gray-600"
        }`}
      >
        <span
          className={`font-semibold ${
            theme ? "text-blue-300" : "text-blue-600"
          }`}
        >
          Online Group Study & Assignment
        </span>{" "}
        is your digital hub for collaborative learning, sharing knowledge, and
        excelling together.
      </motion.p>

      {/* Content Section */}
      <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
        {/* Card 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className={`shadow-lg rounded-2xl p-6 text-center hover:shadow-2xl transition-all ${
            theme ? "bg-gray-800" : "bg-white"
          }`}
        >
          <FaUsers
            className={`text-5xl mx-auto mb-4 ${
              theme ? "text-blue-400" : "text-blue-500"
            }`}
          />
          <h3
            className={`text-xl font-bold mb-2 ${
              theme ? "text-gray-100" : "text-gray-800"
            }`}
          >
            Learn Together
          </h3>
          <p className={theme ? "text-gray-300" : "text-gray-600"}>
            Connect with peers, form study groups, and share insights for better
            understanding.
          </p>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className={`shadow-lg rounded-2xl p-6 text-center hover:shadow-2xl transition-all ${
            theme ? "bg-gray-800" : "bg-white"
          }`}
        >
          <FaBook
            className={`text-5xl mx-auto mb-4 ${
              theme ? "text-green-400" : "text-green-500"
            }`}
          />
          <h3
            className={`text-xl font-bold mb-2 ${
              theme ? "text-gray-100" : "text-gray-800"
            }`}
          >
            Share Knowledge
          </h3>
          <p className={theme ? "text-gray-300" : "text-gray-600"}>
            Post and answer questions, exchange study materials, and grow your
            academic skills.
          </p>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className={`shadow-lg rounded-2xl p-6 text-center hover:shadow-2xl transition-all ${
            theme ? "bg-gray-800" : "bg-white"
          }`}
        >
          <FaLaptopCode
            className={`text-5xl mx-auto mb-4 ${
              theme ? "text-purple-400" : "text-purple-500"
            }`}
          />
          <h3
            className={`text-xl font-bold mb-2 ${
              theme ? "text-gray-100" : "text-gray-800"
            }`}
          >
            Work on Assignments
          </h3>
          <p className={theme ? "text-gray-300" : "text-gray-600"}>
            Collaborate on group projects and assignments with real-time
            updates.
          </p>
        </motion.div>
      </div>

      {/* Mission Statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-16 max-w-3xl mx-auto text-center"
      >
        <h2
          className={`text-2xl font-bold mb-4 ${
            theme ? "text-blue-400" : "text-blue-700"
          }`}
        >
          Our Mission
        </h2>
        <p
          className={`leading-relaxed ${
            theme ? "text-gray-300" : "text-gray-600"
          }`}
        >
          At Online Group Study & Assignment, our mission is to make learning a
          team effort. We believe education is more impactful when shared. Our
          platform bridges the gap between students, encouraging a culture of
          helping, guiding, and inspiring one another to achieve academic
          excellence.
        </p>
      </motion.div>
    </div>
  );
};

export default About;
