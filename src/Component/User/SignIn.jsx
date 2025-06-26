import React, { use, useState } from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { FaEye, FaEyeSlash, FaGithub, FaGoogle } from 'react-icons/fa';
import Theme from '../Navigation/Theme';
import { AuthContext } from '../../Auth/AuthContext';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const SignIn = () => {
    const { theme, google, signIn } = use(AuthContext)

    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState(null)
    const [showPass, setShowPass] = useState(false)

    const from = location.state?.from?.pathname || '/'

    const handleGoogle = (e) => {
        e.preventDefault()
        google()
            .then(() => {
                navigate('/')
            })
            .catch(() => {
                alert('somthing Is wrong')
            })
    }

    const handleSignin = (e) => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value
        // console.log(email, password)

        setErrorMessage(null)
        signIn(email, password)
            .then(() => {
                // console.log(r)
                Swal.fire({
                    icon: "success",
                    title: "Your account is created",
                    showConfirmButton: true,
                    timer: 1500
                });
                navigate(from, { replace: true });
            })
            .catch(() => {
                setErrorMessage('invalid email or password')
            })
    }

    return (
        <div className="h-screen w-full">
            <div className="flex flex-col lg:flex-row h-full sr">
                {/* Left section (text) */}

                <div className={`hidden lg:flex flex-col justify-center flex-1 px-20  text-white ${theme ? 'hero-overlay' : ''}`}>
                    <motion.div
                        initial={{ y: 0, opacity: 0 }}
                        animate={{
                            y: -10,
                            opacity: 1,
                            transition: { duration: 1 }

                        }}
                    >
                        <h1 className="text-4xl font-bold mb-4 ">Online Group Study</h1>
                        <p className="text-lg">
                            Welcome to Our Online Study Group — A Space Where Curious Minds Come Together, Share Ideas, Tackle Challenges, and Succeed as One!
                        </p>
                    </motion.div>
                </div>


                {/* Right section (form) */}
                <div data-theme={`${theme ? 'dark' : 'light'}`} className={`flex flex-col justify-center items-center flex-1  px-6 sm:px-10 lg:px-20 py-10 relative ${theme ? 'dark-theme' : 'bg-white'}`}>
                    <div className='absolute top-5 right-5 md:top-20 md:right-20 '>
                        <Theme></Theme>
                    </div>
                    <motion.form
                        initial={{ x: 0, opacity: 0 }}
                        animate={{
                            x: -40,
                            opacity: 1,
                            transition: { duration: 1 }

                        }}
                        onSubmit={handleSignin}
                        className="w-full max-w-sm ml-21">
                        <h1 className="text-2xl font-semibold mb-6">Sign In......</h1>

                        <button onClick={handleGoogle} type='button'
                            className="mt-6 border font-medium py-2 px-4 rounded-md w-full  cursor-pointer transition flex items-center gap-5 justify-center ">
                            <FaGoogle className='text-2xl '></FaGoogle>
                            Sign in with Google
                        </button>
                        <button type='button'
                            className="mt-6 bg-black text-white font-medium py-2 px-4 rounded-md w-full cursor-pointer transition flex items-center gap-5 justify-center">
                            <FaGithub className='text-2xl'></FaGithub>
                            Sign in with GitHUB
                        </button>
                        <div className={`divider ${theme ? 'before:bg-gray-400 after:bg-gray-400' : ''}`}>or</div>
                        <div className="flex flex-col gap-4">
                            <input
                                className="border rounded-md p-2 w-full"
                                type="email"
                                name='email'
                                placeholder="Email Address" />
                            <div className='relative'>
                                <input
                                    className="border rounded-md p-2 w-full"
                                    type={showPass? 'text' : 'password'}
                                    name='password'
                                    placeholder="Password" />
                                <div onClick={()=>setShowPass(!showPass)} className={`absolute top-3 right-3 ${theme ? 'text-gray-300' : 'text-gray-500'} cursor-pointer`}>
                                    {
                                        showPass ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>
                                    }
                                </div>
                            </div>
                        </div>
                        <p className='text-red-500 mt-3'>{errorMessage}</p>
                        <button
                            type="submit"
                            className="mt-6 bg-[#d28d8d] text-white font-medium py-2 px-4 rounded-md w-full hover:bg-[#b66d6d] cursor-pointer transition">Sign In
                        </button>
                        <p className='mt-3 flex justify-between'>Don't have an account? <Link to='/register'><span className={`${theme ? 'text-blue-300' : 'text-blue-500'} underline`}>Register Now</span></Link></p>
                        <div className={`divider ${theme ? 'before:bg-gray-400 after:bg-gray-400' : ''}`}>or</div>
                        <Link to='/'><button
                            className="mt-6 border font-medium py-2 px-4 rounded-md w-full  transition cursor-pointer hover:bg-[green] hover:text-white ">Back To Home
                        </button></Link>
                    </motion.form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
