import React, { useContext } from 'react';
import { FaUsers, FaCalendarAlt, FaBookOpen, FaSearch, FaUserGraduate, FaBrain, FaChartLine, FaGlobe, FaBell } from 'react-icons/fa';
import { AuthContext } from '../../Auth/AuthContext';

const Feature = () => {
    const { theme } = useContext(AuthContext);

    const features = [
        {
            icon: <FaUsers className="text-white text-3xl" />,
            title: "Collaborative Study Rooms",
            description: "Join or create real-time group study sessions. Collaborate via live chat, shared whiteboards, and topic-specific channels."
        },
        {
            icon: <FaCalendarAlt className="text-white text-3xl" />,
            title: "Smart Study Scheduling",
            description: "Plan and organize group study sessions with an integrated calendar. Set reminders, recurring sessions, and deadlines for tasks or exams."
        },
        {
            icon: <FaBookOpen className="text-white text-3xl" />,
            title: "Resource Sharing",
            description: "Upload and share PDFs, notes, links, and videos with your group. All materials are stored in one place for easy access."
        },
        {
            icon: <FaSearch className="text-white text-3xl" />,
            title: "Topic-Based Discussion Boards",
            description: "Participate in topic-specific forums where you can ask questions, get answers, and discuss with peers outside your immediate study group."
        },
        {
            icon: <FaUserGraduate className="text-white text-3xl" />,
            title: "Expert Mentor Access",
            description: "Connect with verified tutors or mentors for guidance on tough topics during live Q&A hours or private sessions."
        },
        {
            icon: <FaBrain className="text-white text-3xl" />,
            title: "Focus Mode with Timer",
            description: "Use Pomodoro timers and noise-free zones to keep you and your group focused during study time."
        },
        {
            icon: <FaChartLine className="text-white text-3xl" />,
            title: "Progress Tracking",
            description: "Monitor your group's progress with visual dashboards showing study time, task completion, and individual contributions."
        },
        {
            icon: <FaGlobe className="text-white text-3xl" />,
            title: "Cross-Platform Support",
            description: "Access your study group anytime, anywhere—available on web, tablet, and mobile."
        },
        {
            icon: <FaBell className="text-white text-3xl" />,
            title: "Real-Time Notifications",
            description: "Stay updated with instant notifications for upcoming sessions, shared resources, or group messages so you never miss a thing."
        }
    ];

    // Define dynamic classes based on theme
    const cardBgGradient = theme
        ? "bg-gradient-to-br from-blue-900 via-blue-700/80 to-blue-500"
        : "bg-gradient-to-br from-green-800 via-green-700 to-green-500";

    const borderColor = theme ? "border-blue-700" : "border-[#195506]";
    const shadowColor = theme ? "hover:shadow-blue-500/40" : "hover:shadow-green-500/40";

    const topRightDotColors = theme
        ? ["bg-blue-300/70", "bg-blue-300/50", "bg-blue-300/30"]
        : ["bg-green-300/50", "bg-green-300/30", "bg-green-300/10"];

    return (
        <section className={`${theme ? 'dark-theme' : ''} py-12 sm:py-12 lg:py-16`}>
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="max-w-xl mx-auto text-center xl:max-w-2xl">
                    <h2 className="text-lg md:text-3xl font-bold leading-tight sm:text-4xl xl:text-5xl mb-6">
                        We are just getting started!
                    </h2>
                    <p className="mb-4 text-sm md:text-lg">
                        We are creating a tool that helps you be more productive and efficient when creating an assignment and mark on it.
                    </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-center items-center text-sm md:text-md lg:text-lg'>
                    {features.map((data, idx) => (
                        <div
                            key={idx}
                            className={`relative border-2 rounded-[1.5em] text-white font-nunito p-[1.5em] flex flex-col gap-[1em] justify-center backdrop-blur-[12px] hover:shadow-2xl transition-all duration-500 group/card hover:-translate-y-1 h-full
              ${cardBgGradient} ${borderColor} ${shadowColor}`}
                        >
                            <div
                                className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-[1.5em]"
                                style={{
                                    backgroundImage: theme
                                        ? "linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(37, 99, 235, 0.15), transparent)"
                                        : "linear-gradient(135deg, rgba(25, 85, 6, 0.3), rgba(33, 142, 9, 0.2), transparent)"
                                }}
                            ></div>
                            <div
                                className={`absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,50,190,0.1),transparent_60%)] group-hover/card:animate-pulse`}
                            ></div>

                            <div className="absolute top-4 right-4 flex gap-2">
                                <div className={`w-2 h-2 rounded-full ${topRightDotColors[0]}`}></div>
                                <div className={`w-2 h-2 rounded-full ${topRightDotColors[1]}`}></div>
                                <div className={`w-2 h-2 rounded-full ${topRightDotColors[2]}`}></div>
                            </div>

                            <div className="relative z-10 transition-transform duration-300 group-hover/card:translate-y-[-2px] space-y-6">
                                <div className='flex items-center gap-2 mt-4 text-lg justify-center'>
                                    {data.icon}
                                    <p>{data.title}</p>
                                </div>
                                <p className="text-[0.9em] text-white/90 leading-relaxed font-light">
                                    {data.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Feature;
