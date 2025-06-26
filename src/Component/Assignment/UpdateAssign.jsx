import React, { use, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { AuthContext } from '../../Auth/AuthContext';
import DatePicker from 'react-datepicker';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';
import Swal from 'sweetalert2';
import { Bounce, toast } from 'react-toastify';

const UpdateAssign = () => {
    const { theme } = use(AuthContext)
    const [selectedDate, setSelectedDate] = useState(new Date());
    const assignmentData = useLoaderData()
    const { _id } = assignmentData
    const navigate = useNavigate()
    // console.log(assignmentData)
    // console.log(_id)
    // console.log(assignmentData._id)

    const handleUpdateAssignment = (e) => {
        e.preventDefault()
        // console.log('worked')
        const form = e.target
        const formData = new FormData(form)
        // console.log(formData.entries())
        const updatedAssignment = Object.fromEntries(formData.entries())
        // console.log(updatedAssignment)

        fetch(`https://group-study-platform-backend.vercel.app/assignment/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedAssignment)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.modifiedCount) {
                    toast.success('Updated Successfully', {
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
                    navigate('/assignment')
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Please change somthing first!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    return (
        <div data-theme={`${theme ? 'dark' : ''}`}>
            <title>
                Group study || Update Assignments
            </title>
            <div className='CR h-30 md:h-60 '>
                <div className={`${theme ? 'hero-overlay' : 'bg-[#a8632f84]'} flex justify-center items-center w-full h-full`}>
                    <p className={`text-white font-bold text-lg md:text-2xl`}>Update Your Assignment</p>
                </div>
            </div>
            <div className='py-5 md:py-10'>
                <form onSubmit={handleUpdateAssignment} className='flex flex-col justify-center items-center gap-3'>
                    {/* Title */}
                    <div className='w-full flex justify-center'>
                        <div className='w-4/5 lg:w-3/5'>
                            <p>Title <span className='text-red-500'>*</span></p>
                            <input
                                className='border border-gray-400 rounded-md p-3 w-full'
                                type="text"
                                name='title'
                                placeholder='Assignment title'
                                defaultValue={assignmentData.title}
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
                                defaultValue={assignmentData.description}
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
                                defaultValue={assignmentData.marks}
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
                                defaultValue={assignmentData.thumbnail}
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
                                defaultValue={assignmentData.difficulty}
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
                        value="Update Assignment"
                    />
                </form>
            </div>
        </div>
    );
};

export default UpdateAssign;