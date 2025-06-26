import React, { use } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../../Auth/AuthContext';

const AttemptAssign = () => {

    const{theme}=use(AuthContext)
    const userAssignParticipet = useLoaderData()
    // console.log(userAssignParticipet)

    return (
        <div data-theme={`${theme ? 'dark' : ''}`} className="overflow-x-auto py-16">
            <title>
                Group study || Attempt Assignments
            </title>
            {
                userAssignParticipet && userAssignParticipet.length > 0 ?
                    <table className="table table-xs md:table-sm lg:table-md ">
                        {/* head */}
                        <thead>
                            <tr className={` ${theme ? ' bg-blue-900' : ' bg-blue-500'} text-white`}>
                                <th>Examnee Name</th>
                                <th>Title</th>
                                <th className='text-center'>Status</th>
                                <th className='text-center'>Difficulty</th>
                                <th className='text-center'>Marks</th>
                                <th className='text-center'>Obtained marks</th>
                                <th >Feadback</th>
                            </tr>
                        </thead>
                        {userAssignParticipet.map((data) =>
                            <tbody key={data._id}>
                                {/* row 1 */}
                                <tr className={`border-b ${theme ? 'border-gray-600' : 'border-gray-300'}`}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={data?.examnee_photo}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{data?.examnee_name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {data.title}
                                        {data.index}
                                    </td>
                                    <td className={`text-center font-bold ${data.pending === true ? 'text-red-600' : 'text-green-500'}`}>{data.pending === true ? 'Pending' : 'compleate'}</td>
                                    <td className='text-center'>{data.difficulty}</td>
                                    <td className='text-center'>{data.target_marks}</td>
                                    <td className='text-center'>{data.get_marks ? data.get_marks : 'Not review yet'}</td>
                                    <td>{data.feadback ? data.feadback : 'Not review yet'}</td>
                                </tr>
                            </tbody>
                        )}
                    </table> : <div className='flex items-center justify-center h-[50vh]'>
                        <h1 className='text-lg md:text-3xl'>You don't pertecipet any assignment</h1>
                    </div>
            }
        </div>
    );
};

export default AttemptAssign;