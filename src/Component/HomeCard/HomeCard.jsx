import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Auth/AuthContext';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const HomeCard = () => {
    const { theme } = useContext(AuthContext);
    const [assignmentData, setAssignmentData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load assignments from server
    useEffect(() => {
        axios.get('http://localhost:3000/assignment') // change to your backend API endpoint
            .then(res => {
                setAssignmentData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error loading assignments:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[50vh]">
                <h1 className="text-lg md:text-3xl">Loading...</h1>
            </div>
        );
    }

    // Define gradient classes based on theme
    const cardBgGradient = theme
        ? "bg-gradient-to-br from-blue-900 via-blue-700/80 to-blue-500 text-white border-blue-900"
        : "bg-gradient-to-br from-green-800 via-green-700 to-green-500 text-white border-green-700";

    const buttonBgClass = theme
        ? "bg-blue-900"
        : "bg-green-800";

    const seeAllBtnGradient = theme
        ? "from-blue-700 to-blue-500"
        : "from-green-800 to-green-600";

    return (
        <div data-theme={`${theme ? 'dark' : ''}`} className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 py-10'>
            <h1 className="text-lg md:text-3xl font-bold leading-tight sm:text-4xl xl:text-5xl mb-10 text-center">
                Assignments
            </h1>
            {
                assignmentData.length > 0 ? (
                    <>
                        {/* Show first 3 assignments */}
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                            {assignmentData.slice(0, 3).map(data => (
                                <div
                                    key={data._id}
                                    className={`relative border-2 rounded-[1.5em] p-[1.5em] flex flex-col gap-[1em] justify-between ${cardBgGradient}`}
                                >
                                    <div className='space-y-3'>
                                        <img className='w-full h-50 border rounded-lg object-cover' src={data?.thumbnail} alt="" />
                                        <h1 className="font-bold text-center text-sm">{data?.title}</h1>
                                        <div className='flex justify-between'>
                                            <p className='text-sm'>Marks: {data?.marks}</p>
                                            <p className='text-sm'>{data?.difficulty}</p>
                                        </div>
                                        <p className='text-[12px]'>
                                            {data?.description?.length > 100
                                                ? `${data.description.slice(0, 100)}...`
                                                : data?.description}
                                        </p>
                                    </div>
                                    <Link to={`/details/${data._id}`}>
                                        <button className={`w-full mt-2 px-4 py-2 rounded-lg ${buttonBgClass} text-white`}>
                                            See more...
                                        </button>
                                    </Link>
                                </div>
                            ))}
                        </div>

                        {/* See All Assignments Button */}
                        {assignmentData.length > 3 && (
                            <div className='mt-6 flex justify-center'>
                                <Link to="/assignment">
                                    <button className={`px-6 py-2 bg-gradient-to-r ${seeAllBtnGradient} text-white rounded-lg shadow-lg hover:opacity-90 transition`}>
                                        See All Assignments
                                    </button>
                                </Link>
                            </div>
                        )}
                    </>
                ) : (
                    <div className='flex items-center justify-center h-[50vh]'>
                        <h1 className='text-lg md:text-3xl'>There is no assignment</h1>
                    </div>
                )
            }
        </div>
    );
};

export default HomeCard;
