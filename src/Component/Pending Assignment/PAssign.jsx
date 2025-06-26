import React, { use } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { AuthContext } from '../../Auth/AuthContext';
import Swal from 'sweetalert2';

const PAssign = () => {

    const { theme, user } = use(AuthContext)
    const takeassignmentList = useLoaderData()

    const navigate = useNavigate()

    // console.log(takeassignmentList)

    const handleGiveMarks = (e, data) => {
        e.preventDefault()
        // console.log(data)
        const form = e.target
        const formData = new FormData(form)
        // console.log(formData.entries())
        const checked = Object.fromEntries(formData.entries())
        checked.pending = false
        checked.pending = false
        // console.log(checked)

        fetch(`https://group-study-platform-backend.vercel.app/takeassignment/${data._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(checked)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.modifiedCount) {
                    Swal.fire({
                        icon: "success",
                        title: "Successfully marked",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate(`/pending/${user.email}`)
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Somthing is wrong",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })

    }

    return (
        <div data-theme={`${theme ? 'dark' : ''}`} className="overflow-x-auto py-16">
            <title>
                Group study || Pending Assignments
            </title>
            {
                takeassignmentList && takeassignmentList.length > 0 ?
                    <table className="table table-xs md:table-sm lg:table-md ">
                        {/* head */}
                        <thead>
                            <tr className={`${theme ? ' bg-blue-900' : ' bg-blue-500'} text-white`}>
                                <th>Examnee Name</th>
                                <th>Title</th>
                                <th className='text-center'>Difficulty</th>
                                <th className='text-center'>On Marks</th>
                                <th>Complete Date</th>
                                <th className='text-center'>Give Mark</th>
                            </tr>
                        </thead>
                        {takeassignmentList.map((data) =>
                            <tbody key={data._id}>
                                {/* row 1 */}
                                <tr className={`border-b ${theme ? 'border-gray-600' : 'border-gray-300'}`}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={data.examnee_photo}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{data.examnee_name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {data.title}
                                        {data.index}
                                    </td>
                                    <td className='text-center'>{data.difficulty}</td>
                                    <td className='text-center'>{data.target_marks}</td>
                                    <td>{data.complete_date}</td>
                                    <th>
                                        <button disabled={user.email === data.email}
                                            className={`p-1 md:p-3 text-white  ${theme ? 'bg-purple-700' : 'bg-[green]'} ${user.email === data.email ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} w-full`}
                                            onClick={() => document.getElementById(`${data._id}`).showModal()}>{user.email === data.email ? 'Dont' : 'Mark'}

                                        </button>

                                        <dialog id={`${data._id}`} className="modal">
                                            <div className="modal-box">
                                                <form method="dialog">
                                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                </form>

                                                <form onSubmit={(e) => handleGiveMarks(e, data)}
                                                    className='flex flex-col gap-2 mt-5'>
                                                    <div className='flex flex-col gap-5'>
                                                        <div>
                                                            <p>Google Doc Link_</p>
                                                            <a
                                                                href={data.google_link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-blue-600 underline"
                                                            >
                                                                {data.google_link}
                                                            </a>
                                                        </div>
                                                        <p className='font-medium'><span className='font-bold'>Notes:</span> {data.quick_note}</p>
                                                    </div>
                                                    <input
                                                        className="border border-gray-400 rounded-md p-2 w-full"
                                                        type="number"
                                                        name="get_marks"
                                                        placeholder="Give Mark"
                                                        required
                                                        min="0"
                                                        max={data.target_marks}
                                                    />

                                                    <textarea
                                                        className='textarea-font border w-full h-30 rounded-md p-3 border-gray-400'
                                                        name="feadback"
                                                        placeholder='feedback'
                                                    />
                                                    <button
                                                        type='submit'
                                                        // disabled={hasSubmitted}
                                                        className={`${theme ? 'bg-green-800' : 'bg-purple-800'} mt-5 w-[700px] max-w-[100%] mx-auto rounded-[15px] text-white py-3 font-semibold cursor-pointer`
                                                        }>Give Mark
                                                    </button>
                                                    <p className="py-4 text-center text-blue-500">Press ESC key or click on ✕ to close</p>
                                                </form>
                                            </div>
                                        </dialog>
                                    </th>
                                </tr>
                            </tbody>
                        )}
                    </table> : <div className='flex items-center justify-center h-[50vh]'>
                        <h1 className='text-lg md:text-3xl'>There Is no examnee data</h1>
                    </div>
            }
        </div>
    );
};

export default PAssign;