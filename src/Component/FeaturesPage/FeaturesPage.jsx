import React, { useContext } from "react";
import { FaRocket, FaShieldAlt, FaMobileAlt, FaUsers, FaChartPie, FaCog } from "react-icons/fa";
import { AuthContext } from "../../Auth/AuthContext";
import { motion } from "framer-motion";

const featuresList = [
    {
        icon: <FaRocket />,
        title: "Fast & Reliable",
        description:
            "Experience blazing fast performance and 99.9% uptime with our optimized platform.",
    },
    {
        icon: <FaShieldAlt />,
        title: "More Secure & Private",
        description:
            "Your data is protected with industry-leading security measures and privacy protocols.",
    },
    {
        icon: <FaUsers />,
        title: "Collaborative Tools",
        description:
            "Work together in real-time with integrated chat, shared documents, and group sessions.",
    },
    {
        icon: <FaChartPie />,
        title: "Insightful Analytics",
        description:
            "Track your progress and get detailed insights with advanced dashboards and reports.",
    },
    {
        icon: <FaCog />,
        title: "Customizable Settings",
        description:
            "Tailor the platform to your needs with flexible preferences and integrations.",
    },
];

const FeaturesPage = () => {
    const { theme } = useContext(AuthContext);

    const cardBg = theme ? "bg-blue-800" : "bg-green-700";
    const cardHoverShadow = theme
        ? "hover:shadow-blue-500/50"
        : "hover:shadow-green-500/50";

    return (
        <div className={`py-16 px-6 `}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.header
                    className="text-center mb-16 max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-5xl font-extrabold mb-4">
                        Why Choose Our Platform?
                    </h1>
                    <p className="text-lg">
                        Discover the powerful features that make our website stand out and
                        help you succeed.
                    </p>
                </motion.header>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {featuresList.map(({ icon, title, description }, i) => (
                        <motion.div
                            key={title}
                            className={`p-8 rounded-xl ${cardBg} shadow-lg cursor-default ${cardHoverShadow} transition-transform duration-300 hover:-translate-y-3 flex flex-col items-center text-center`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.15 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="text-5xl mb-5 text-white">{icon}</div>
                            <h3 className="text-2xl font-semibold mb-3 text-white">{title}</h3>
                            <p className="text-white/80">{description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturesPage;
