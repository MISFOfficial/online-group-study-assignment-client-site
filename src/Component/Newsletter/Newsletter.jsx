import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter a valid email");
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <div className="relative bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 text-white py-12 px-6 rounded-2xl shadow-xl overflow-hidden">
      {/* Animated glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_60%)] animate-pulse"></div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Stay Updated with Our Latest News 🚀
        </motion.h2>

        <motion.p
          className="text-white/80 mb-6 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Subscribe to our newsletter and never miss exciting updates, exclusive offers, and the latest trends!
        </motion.p>

        {/* Subscription Form */}
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <div className="relative w-full sm:w-auto">
            <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:w-80 pl-12 pr-4 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-blue-300"
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-semibold shadow-lg hover:opacity-90 transition"
          >
            Subscribe
          </motion.button>
        </form>

        {/* Small text */}
        <p className="mt-4 text-xs text-white/60">
          We care about your privacy. No spam, ever. ✨
        </p>
      </div>
    </div>
  );
};

export default Newsletter;
