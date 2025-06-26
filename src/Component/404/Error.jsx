import React from 'react';
import Lottie from 'lottie-react';
import ErrorAnimation from './404.json'
import { Link } from 'react-router';

const Error = () => {
    return (
        <section className="bg-white  h-screen flex items-center justify-center">
            <div className="container lg:flex  items-center justify-center px-5 ">
                <div className="">
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-900">404 error</p>
                    <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">Page not found</h1>
                    <p className="mt-4 text-gray-500 dark:text-gray-400">Sorry, the page you are looking for doesn't exist. </p>
                    <div className="flex items-center mt-6 gap-x-3">
                        <Link to='/'>
                            <button className=" px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600 cursor-pointer">
                                Take me home
                            </button></Link>
                    </div>
                </div>

                <div >
                    <Lottie className='lg:w-150' animationData={ErrorAnimation}></Lottie>
                </div>
            </div>
        </section>
    );
};

export default Error;