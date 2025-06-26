import React, { use, useState } from 'react';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AuthContext } from '../../Auth/AuthContext';
import Swal from 'sweetalert2';
import { Bounce, toast } from 'react-toastify';
import { Link } from 'react-router';

const CreatAssign = () => {

    const { theme, user } = use(AuthContext)
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleCreateAssignement = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const assignData = Object.fromEntries(formData.entries());

        assignData.user = user.email    // mark 0 by default

        // console.log(assignData);

        fetch('https://group-study-platform-backend.vercel.app/assignment', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(assignData)
        })
            .then(res => res.json())
            .then(() => {
                // console.log(data)
                toast.success('Create Successfully', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: `${theme ? 'dark' : 'light'}`,
                    transition: Bounce,
                });
                form.reset();
            })
    };


    return (
        <div data-theme={`${theme ? 'dark' : ''}`}>
            <title>
                Group study || Create Assignment
            </title>
            <div className='CR h-30 md:h-60 '>
                <div className={`${theme ? 'hero-overlay' : 'bg-[#a8632f84]'} flex justify-center items-center w-full h-full`}>
                    <p className={`text-white font-bold text-lg md:text-2xl`}>Create Your Assignment</p>
                </div>
            </div>
            <div className='py-5 md:py-10'>
                <form onSubmit={handleCreateAssignement} className='flex flex-col justify-center items-center gap-3'>
                    {/* Title */}
                    <div className='w-full flex justify-center'>
                        <div className='w-4/5 lg:w-3/5'>
                            <p>Title <span className='text-red-500'>*</span></p>
                            <input
                                className='border border-gray-400 rounded-md p-3 w-full'
                                type="text"
                                name='title'
                                placeholder='Assignment title'
                                required
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className='w-full flex justify-center'>
                        <div className='w-4/5 lg:w-3/5'>
                            <p>Description <span className='text-red-500'>*</span></p>
                            <textarea
                                className='textarea-font border w-full h-40 rounded-md p-3 border-gray-400'
                                name="description"
                                placeholder='Assignment description'
                                minLength={20}
                                required
                            />
                        </div>
                    </div>

                    {/* Marks */}
                    <div className='w-full flex justify-center'>
                        <div className='w-4/5 lg:w-3/5'>
                            <p>Marks <span className='text-red-500'>*</span></p>
                            <input
                                className='border border-gray-400 rounded-md p-3 w-full'
                                type="number"
                                name='marks'
                                placeholder='Assignment Marks'
                                required
                            />
                        </div>
                    </div>

                    {/* Thumbnail */}
                    <div className='w-full flex justify-center'>
                        <div className='w-4/5 lg:w-3/5'>
                            <p>Thumbnail <span className='text-red-500'>*</span></p>
                            <input
                                className='border border-gray-400 rounded-md p-3 w-full'
                                type="text"
                                name='thumbnail'
                                placeholder='Thumbnail URL (e.g., https://example.com/image.jpg)'
                                pattern="https?://.*\.(jpg|jpeg|png|gif|webp)"
                                required
                            />
                        </div>
                    </div>

                    {/* Date and Difficulty */}
                    <div className='w-4/5 lg:w-3/5 flex   gap-3'>
                        {/* Date */}
                        <div className='w-fit h-full '>
                            <p>Due Date <span className='text-red-500'>*</span></p>
                            <div className="w-full">
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={(date) => setSelectedDate(date)}
                                    placeholderText="Select a date"
                                    className='border  border-gray-400 rounded-md p-3 w-full h-14'
                                    dateFormat="yyyy-MM-dd"
                                    name='date'
                                    required
                                />
                            </div>
                        </div>
                        {/* Difficulty Level */}
                        <div className='w-full'>
                            <p>Difficulty Level <span className='text-red-500'>*</span></p>
                            <select
                                name='difficulty'
                                className='border border-gray-400 rounded-md p-3  w-full h-14'
                                required>
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>

                        </div>
                    </div>

                    {/* Submit Button */}
                    <input
                        className='border cursor-pointer duration-200 hover:bg-[green] hover:text-white border-gray-400 rounded-md p-3 w-4/5 lg:w-3/5 mt-10'
                        type="submit"
                        value="Create Assignment"
                    />
                </form>
            </div>
        </div>
    );
};

export default CreatAssign;
