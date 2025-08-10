import React, { use } from 'react';
import { motion } from "motion/react" //eslint-disable-line no-unused-vars
import { AuthContext } from '../../Auth/AuthContext';

const GetApp = () => {
    const{theme}=use(AuthContext)
    return (
        < div className={`${theme ? '' : 'bg-orange-500'}  text-white md:py-30  primary-text flex items-center justify-center`}>
            <motion.div
                initial={{ y: 0, opacity: 0 }}
                whileInView={{y:-30, opacity:1}}
                transition={{duration: 2}}
                viewport={{once: true}}
                className=' space-y-10 md:space-y-15 lg:space-y-20 pt-15 flex flex-col items-center justify-center'
            >
                <h1 className='text-xl md:text-3xl lg:text-5xl text-center '>What are you waiting for?
                    <br /> Join the study Group!</h1>
                <button className='btn bg-[green] text-white border-none px-10 md:px-20 rounded-4xl text-[10px] md:text-[16px]'>Go To app</button>
            </motion.div>
        </div >
    );
};

export default GetApp;