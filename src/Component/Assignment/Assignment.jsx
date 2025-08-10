import React, { use, useState, useEffect } from 'react';
import Navigation from '../Navigation/Navigation';
import { AuthContext } from '../../Auth/AuthContext';
import Footer from '../Footer/Footer';
import { Link, useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const Assignment = () => {
    const { theme, user } = use(AuthContext);
    const loadedData = useLoaderData();
    const [assignmentData, setAssignmentData] = useState([]);
    const [search, setSearch] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setAssignmentData(loadedData);
    }, [loadedData]);

    //  Fetch filtered assignments
    const fetchFilteredAssignments = async () => {
        try {
            const query = new URLSearchParams();
            if (search) query.append('search', search);
            if (difficulty) query.append('difficulty', difficulty);

            // const res = await fetch(`https://group-study-platform-backend.vercel.app/assignment?${query.toString()}`);
            const res = await fetch(`http://localhost:3000/assignment?${query.toString()}`);
            const data = await res.json();
            // console.log(data)
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
                        // fetch(`https://group-study-platform-backend.vercel.app/assignment/${id}`, {
                        //     method: 'DELETE',
                        // })
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

    return (
        <div data-theme={`${theme ? 'dark' : ''}`}>
             <title>
                Group study || Assignments
            </title>

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
                <button onClick={fetchFilteredAssignments} className="btn btn-primary w-full md:w-auto">
                    Search
                </button>
            </div>

            {/* 🧩 Assignment List */}
            {
                assignmentData && assignmentData.length > 0 ? (
                    <div className='py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 px-2 md:px-5 justify-center items-center text-sm md:text-md '>
                        {
                            assignmentData.map(data =>
                                <div key={data._id}
                                    className="relative border-2 border-blue-900 rounded-[1.5em] bg-gradient-to-br from-blue-900 via-blue-700/80 to-blue-500 text-white font-nunito p-[1.5em] flex justify-between items-left flex-col gap-[1em] backdrop-blur-[12px] hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-500 group/card hover:-translate-y-1 h-full"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-800/30 via-blue-900/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-[1.5em]"></div>
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,50,190,0.1),transparent_60%)] group-hover/card:animate-pulse"></div>
                                    <div className="absolute top-4 right-4 flex gap-2">
                                        <div className="w-2 h-2 rounded-full bg-blue-300/70"></div>
                                        <div className="w-2 h-2 rounded-full bg-blue-300/50"></div>
                                        <div className="w-2 h-2 rounded-full bg-blue-300/30"></div>
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
                                            <button onClick={() => handleUpdateAssignment(data._id, data.user)}
                                                className="relative h-fit w-fit px-[1.4em] py-[0.7em] mt-2 border-[1px] border-blue-300/30 rounded-full flex justify-center items-center gap-[0.7em] overflow-hidden group/btn hover:border-blue-300/50 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 backdrop-blur-[12px] bg-blue-900 cursor-pointer"
                                            >
                                                <div className="absolute bg-gradient-to-r from-blue-600/40 via-blue-500/40 to-blue-600/40 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                                                <p className="relative z-10 font-medium">Update</p>
                                            </button>
                                            <button onClick={() => handleDeleteAssignment(data._id, data.user)}
                                                className="relative h-fit w-fit px-[1.4em] py-[0.7em] mt-2 border-[1px] border-blue-300/30 rounded-full flex justify-center items-center gap-[0.7em] overflow-hidden group/btn hover:border-blue-300/50 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 transition-all duration-300 backdrop-blur-[12px] bg-blue-900 cursor-pointer"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-red-600/40 via-red-500/40 to-red-600/40 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                                                <p className="relative z-10 font-medium">Delete</p>
                                            </button>
                                        </div>

                                        <Link to={`/details/${data._id}`}>
                                            <button className="relative h-fit w-full px-[1.4em] py-[0.7em] border-[1px] border-blue-300/30 rounded-full flex justify-center items-center gap-[0.7em] overflow-hidden group/btn hover:border-blue-300/50 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 transition-all duration-300 backdrop-blur-[12px] bg-blue-900 cursor-pointer">
                                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/40 via-blue-500/40 to-blue-600/40 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                                                <p className="relative z-10 font-medium tracking-wide">See more...</p>
                                            </button>
                                        </Link>
                                    </div>

                                    <div className="absolute bottom-4 left-4 w-8 h-8 rounded-full bg-gradient-to-br from-blue-400/20 to-transparent blur-sm group-hover/card:animate-pulse"></div>
                                </div>
                            )
                        }
                    </div>
                ) : (
                    <div className='flex items-center justify-center h-[50vh]'>
                        <h1 className='text-lg md:text-3xl'>There Is no Assignment</h1>
                    </div>
                )
            }
        </div>
    );
};

export default Assignment;
