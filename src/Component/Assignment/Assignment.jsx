import React, { useContext, useState, useEffect } from 'react';
import Navigation from '../Navigation/Navigation';
import { AuthContext } from '../../Auth/AuthContext';
import Footer from '../Footer/Footer';
import { Link, useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const Assignment = () => {
    const { theme, user } = useContext(AuthContext);
    const loadedData = useLoaderData();
    const [assignmentData, setAssignmentData] = useState([]);
    const [search, setSearch] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setAssignmentData(loadedData);
    }, [loadedData]);

    const fetchFilteredAssignments = async () => {
        try {
            const query = new URLSearchParams();
            if (search) query.append('search', search);
            if (difficulty) query.append('difficulty', difficulty);

            const res = await fetch(`http://localhost:3000/assignment?${query.toString()}`);
            const data = await res.json();
            setAssignmentData(data);
        } catch (err) {
            console.error("Error fetching assignments:", err);
        }
    };

    const handleUpdateAssignment = (id, userEmail) => {
        if (user && user.email) {
            if (user.email === userEmail) {
                navigate(`/update/${id}`);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...sorry...",
                    text: "Only the creator can update Assignment",
                });
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "SignIn/Register First",
                text: "You need to SignIn or Register first",
            });
        }
    };

    const handleDeleteAssignment = (id, userEmail) => {
        if (user && user.email) {
            if (user.email === userEmail) {
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: "btn btn-success",
                        cancelButton: "btn btn-danger"
                    },
                    buttonsStyling: false
                });

                swalWithBootstrapButtons.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes, delete it!",
                    cancelButtonText: "No, cancel!",
                    reverseButtons: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        fetch(`http://localhost:3000/assignment/${id}`, {
                            method: 'DELETE',
                        })
                            .then(res => res.json())
                            .then((result) => {
                                if (result.deletedCount) {
                                    setAssignmentData(prev => prev.filter(item => item._id !== id));
                                    swalWithBootstrapButtons.fire({
                                        title: "Deleted!",
                                        text: "Your file has been deleted.",
                                        icon: "success"
                                    });
                                }
                            });
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        swalWithBootstrapButtons.fire({
                            title: "Cancelled",
                            text: "Your assignment is safe :)",
                            icon: "error"
                        });
                    }
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "You Can't Delete",
                    text: "Only the creator can Delete Assignment",
                });
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "SignIn/Register First",
                text: "You need to SignIn or Register first",
            });
        }
    };

    // Theme based colors
    const cardBgGradient = theme
        ? "bg-gradient-to-br from-blue-900 via-blue-700/80 to-blue-500"
        : "bg-gradient-to-br from-green-800 via-green-700 to-green-500";

    const cardBorder = theme ? "border-blue-900" : "border-[#195506]";

    const hoverShadow = theme ? "hover:shadow-blue-500/40" : "hover:shadow-green-500/40";

    const btnBg = theme ? "bg-blue-900" : "bg-green-900";

    const btnBorder = theme ? "border-blue-300/30" : "border-green-300/30";

    const btnHoverBorder = theme ? "hover:border-blue-300/50" : "hover:border-green-300/50";

    const btnHoverShadow = theme ? "hover:shadow-blue-500/20" : "hover:shadow-green-500/20";

    const topRightDotColors = theme
        ? ["bg-blue-300/70", "bg-blue-300/50", "bg-blue-300/30"]
        : ["bg-green-300/50", "bg-green-300/30", "bg-green-300/10"];

    return (
        <div data-theme={theme ? 'dark' : ''} className="">
            <title>Group study || Assignments</title>

            {/* 🔍 Search & Filter Bar */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 px-4 py-6">
                <input
                    type="text"
                    placeholder="Search by title"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input input-bordered w-full md:w-80"
                />
                <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="select select-bordered w-full md:w-60"
                >
                    <option value="">All Difficulties</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
                <button onClick={fetchFilteredAssignments} className={`btn btn-primary w-full md:w-auto ${theme? 'bg-blue-700' : 'bg-green-700'}`}>
                    Search
                </button>
            </div>

            {/* 🧩 Assignment List */}
            {assignmentData && assignmentData.length > 0 ? (
                <div className='py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 px-2 md:px-5 justify-center items-center text-sm md:text-md'>
                    {assignmentData.map(data => (
                        <div
                            key={data._id}
                            className={`relative border-2 rounded-[1.5em] text-white font-nunito p-[1.5em] flex flex-col justify-between gap-[1em] backdrop-blur-[12px] hover:shadow-2xl transition-all duration-500 group/card hover:-translate-y-1 h-full 
                                ${cardBgGradient} ${cardBorder} ${hoverShadow}`}
                        >
                            <div
                                className={`absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-[1.5em]`}
                                style={{
                                    background: theme
                                        ? "linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(37, 99, 235, 0.15), transparent)"
                                        : "linear-gradient(135deg, rgba(25, 85, 6, 0.3), rgba(33, 142, 9, 0.2), transparent)"
                                }}
                            ></div>
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,50,190,0.1),transparent_60%)] group-hover/card:animate-pulse"></div>
                            <div className="absolute top-4 right-4 flex gap-2">
                                <div className={`w-2 h-2 rounded-full ${topRightDotColors[0]}`}></div>
                                <div className={`w-2 h-2 rounded-full ${topRightDotColors[1]}`}></div>
                                <div className={`w-2 h-2 rounded-full ${topRightDotColors[2]}`}></div>
                            </div>

                            <div className="relative z-10 transition-transform duration-300 group-hover/card:translate-y-[-2px] space-y-3">
                                <div className='flex flex-col items-center justify-between mt-3 gap-2'>
                                    <img className='w-full h-50 border rounded-lg object-cover' src={data?.thumbnail} alt="" />
                                    <h1 className="font-bold bg-gradient-to-r text-center text-lg">{data?.title}</h1>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p>Marks: {data?.marks}</p>
                                    <p>{data?.difficulty}</p>
                                </div>
                                <p className='text-[12px]'>
                                    {data?.description?.length > 100
                                        ? `${data.description.slice(0, 100)}...`
                                        : data?.description}..........
                                </p>
                            </div>

                            <div className='flex flex-col gap-5'>
                                <div className='flex justify-between'>
                                    <button
                                        onClick={() => handleUpdateAssignment(data._id, data.user)}
                                        className={`relative h-fit w-fit px-[1.4em] py-[0.7em] mt-2 border-[1px] rounded-full flex justify-center items-center gap-[0.7em] overflow-hidden group/btn transition-all duration-300 backdrop-blur-[12px] cursor-pointer
                                        ${btnBg} ${btnBorder} hover:opacity-90 ${btnHoverBorder} ${btnHoverShadow}`}
                                    >
                                        <p className="relative z-10 font-medium">Update</p>
                                    </button>
                                    <button
                                        onClick={() => handleDeleteAssignment(data._id, data.user)}
                                        className={`relative h-fit w-fit px-[1.4em] py-[0.7em] mt-2 border-[1px] rounded-full flex justify-center items-center gap-[0.7em] overflow-hidden group/btn active:scale-95 transition-all duration-300 backdrop-blur-[12px] cursor-pointer
                                        ${btnBg} ${btnBorder} hover:opacity-90 ${btnHoverBorder} ${btnHoverShadow}`}
                                    >
                                        <p className="relative z-10 font-medium">Delete</p>
                                    </button>
                                </div>

                                <Link to={`/details/${data._id}`}>
                                    <button
                                        className={`relative h-fit w-full px-[1.4em] py-[0.7em] border-[1px] rounded-full flex justify-center items-center gap-[0.7em] overflow-hidden group/btn active:scale-95 transition-all duration-300 backdrop-blur-[12px] cursor-pointer
                                        ${btnBg} ${btnBorder} hover:opacity-90 ${btnHoverBorder} ${btnHoverShadow}`}
                                    >
                                        <p className="relative z-10 font-medium tracking-wide">See more...</p>
                                    </button>
                                </Link>
                            </div>

                            <div className={`absolute bottom-4 left-4 w-8 h-8 rounded-full blur-sm group-hover/card:animate-pulse
                                ${theme ? 'bg-gradient-to-br from-blue-400/20 to-transparent' : 'bg-gradient-to-br from-green-400/20 to-transparent'}`}
                            ></div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='flex items-center justify-center h-[50vh]'>
                    <h1 className='text-lg md:text-3xl'>There Is no Assignment</h1>
                </div>
            )}
        </div>
    );
};

export default Assignment;
