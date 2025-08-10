import React, { use } from 'react';
import { AuthContext } from '../../Auth/AuthContext';
import { Typewriter } from 'react-simple-typewriter';
import { motion } from "motion/react" //eslint-disable-line no-unused-vars

const Banner = () => {
    const { theme } = use(AuthContext)
    return (
        <div data-theme={`${theme ? 'dark' : 'light'}`} className='bg h-[230px] md:h-[350px] lg:h-[700px] relative'>
            <div className={`hero-overlay h-full ${theme ? 'bg-[#3c0b0bb2] text-gray-200' : 'bg-[#2d0f64c0] text-yellow-100'} `}>
                <motion.h1
                    initial={{ y: 0, opacity: 0 }}
                    animate={{
                        y: -50,
                        opacity: 1,
                        transition: { duration: 1 }
                    }}
                    className=' md:text-3xl lg:text-7xl primary-text font-extrabold pl-5 pr-2 pt-20 md:pl-20 md:pt-30 md:pr-0 lg:pl-30 lg:pt-50'>Collaborate & Learn: Online Group <br /> Study - Can -
                    <Typewriter
                        words={[' Create Assignment', ' Rewiew Assignment', ' Attempt Assignment']}
                        loop={0}
                        cursor
                        cursorStyle='|'
                        typeSpeed={75}
                        delaySpeed={1000}
                        deleteSpeed={75}
                    ></Typewriter></motion.h1>
                <motion.div
                    initial={{ y: 0, opacity: 0 }}
                    animate={{
                        y: -50,
                        opacity: 1,
                        transition: { duration: 1 }
                    }}
                    className='ml-5 mt-10 md:ml-20 md:mt-10 lg:ml-30 lg:mt-20 flex gap-10'>
                    <button className={`btn h-auto text-[10px] lg:text-[16px] primary-text border-none ${theme ? 'bg-red-500 text-white' : 'bg-[#184f18] text-white'}`}>Get Start</button>
                    <div>
                        <h1 className='primary-text text-yellow-300 text-[10px] lg:text-[16px]'>100k+</h1>
                        <p className='primary-text text-[10px] lg:text-[16px]'>Hours Comleted</p>
                    </div>
                    <div>
                        <h1 className='primary-text text-yellow-300 text-[10px] lg:text-[16px] '>10k+</h1>
                        <p className='primary-text text-[10px] lg:text-[16px]'>Task Completed</p>
                    </div>

                </motion.div>

            </div>
        </div>
    );
};

export default Banner;