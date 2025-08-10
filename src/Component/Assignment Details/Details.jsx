import React, { use } from 'react';
import { AuthContext } from '../../Auth/AuthContext';
import Model from './Model';
import { Link, useLoaderData } from 'react-router';

const Details = () => {
    const { theme } = use(AuthContext)

    const assignmentDataId = useLoaderData()

    // console.log(assignmentDataId)

    return (
        <div data-theme={`${theme ? 'dark' : ''}`}>
            <title>
                Group study || Details
            </title>
            <div>
                <div className='dark-theme h-50 md:h-80'>
                    <img className=' w-full h-full flex justify-center items-center object-cover' src={assignmentDataId?.thumbnail} alt="" />
                </div>
                <div className="flex flex-col justify-center items-center py-10">
                    <div className={`${theme ? 'dark-theme' : 'bg-[#f0f0f0]'} relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto  bg-clip-border shadow-3xl shadow-shadow-500  p-3`}>
                        <div className="mt-2 mb-8 w-full ">
                            <h4 className="px-2 text-xl font-bold text-navy-700 ">
                                {assignmentDataId?.title}
                            </h4>
                            <p className="mt-2 px-2 text-base ">
                                {assignmentDataId?.description}
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 px-2 w-full ">
                            <div className={`${theme ? 'bg-gray-600' : 'bg-white'} flex flex-col items-start justify-center rounded-2xl  bg-clip-border px-3 py-4  shadow-md`}>
                                <p className="text-sm ">Defficulty</p>
                                <p className="text-base font-medium text-navy-700 ">
                                    {assignmentDataId?.difficulty}
                                </p>
                            </div>
                            <div className={`${theme ? 'bg-gray-600' : 'bg-white'} flex flex-col items-start justify-center rounded-2xl  bg-clip-border px-3 py-4  shadow-md`}>
                                <p className="text-sm ">Date</p>
                                <p className="text-base font-medium text-navy-700 ">
                                    {assignmentDataId?.date}
                                </p>
                            </div>
                            <div className={`${theme ? 'bg-gray-600' : 'bg-white'} flex flex-col items-start justify-center rounded-2xl  bg-clip-border px-3 py-4  shadow-md`}>
                                <p className="text-sm ">Marks</p>
                                <p className="text-base font-medium text-navy-700 ">
                                    {assignmentDataId?.marks}
                                </p>
                            </div>
                            <div className={`${theme ? 'bg-gray-600' : 'bg-white'} flex flex-col items-start justify-center rounded-2xl  bg-clip-border px-3 py-4  shadow-md`}>
                                <p className="text-sm ">Creator</p>
                                <p className="text-base font-medium text-navy-700 ">
                                    {assignmentDataId?.user}
                                </p>
                            </div>
                        </div>
                    </div>
                    <Model assignmentDataId={assignmentDataId}></Model>
                    <Link to='/assignment'>
                        <button
                            className={`${theme ? 'hover:bg-[green] hover:border-[green]' : 'hover:bg-blue-900 hover:border-blue-900 hover:text-white'} border border-gray-400 mt-2 duration-200  w-[700px] max-w-[100%] mx-auto rounded-[15px]  py-3 font-semibold cursor-pointer`}>Back</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Details;