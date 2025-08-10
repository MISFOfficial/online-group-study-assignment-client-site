import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { motion } from 'framer-motion';  // eslint-disable-line no-unused-vars
import { TiThMenuOutline } from 'react-icons/ti';
import { MdOutlineLogout } from "react-icons/md";
import { IoMdClose } from 'react-icons/io';
import Theme from './Theme';
import { AuthContext } from '../../Auth/AuthContext';
import SignBtn from './SignBtn';
import RegisterBtn from './RegisterBtn';
import UserImg from './UserImg';
import Swal from 'sweetalert2';
import { FaFacebook, FaGithub, FaUser, FaYoutube } from 'react-icons/fa';
import { Bounce, toast } from 'react-toastify';

const Navigation = () => {
    const { theme, user, Logout, setLoader } = useContext(AuthContext);
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()

    const links = [
        { name: 'Home', path: '/' },
        { name: 'Assignment', path: '/assignment' },
        ...(user ? [{ name: 'Pending Assignment', path: `/pending/${user.email}` }] : []),
        { name: 'About Us', path: '/about' }
    ];

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleLogOut = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Once you done will be login again",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "LogOut!"
        }).then((result) => {
            if (result.isConfirmed) {
                Logout()
                navigate('/signin')
                setLoader(false)
                toast.success('You are Loged Out', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: `${theme ? 'dark' : 'light'}`,
                    transition: Bounce,
                });
            }
        });
    }

    return (
        <div data-theme={`${theme ? 'dark' : 'light'}`} className='sticky top-0 z-[1000] ' >
            <div className={`${theme ? 'bg-blue-700' : 'bg-green-700'} text-white  items-center justify-between px-5 md:px-10 lg:px-20 hidden lg:flex`}>
                <div className='flex items-center gap-5'>
                    <h1 className=''>follow us</h1>
                    <div className='flex items-center text-xl gap-2 text-white'>
                        <div className=''><FaGithub></FaGithub></div>
                        <div className='text-2xl'><FaYoutube></FaYoutube></div>
                        <div className=''><FaFacebook></FaFacebook></div>
                    </div>
                </div>
                <div className='flex items-center'>
                    <Theme></Theme>
                </div>
            </div>
            {/* Navbar */}
            <nav className={`${theme ? 'dark-theme shadow-2xl' : 'shadow-xl'} flex justify-between  px-5 md:px-10 lg:px-20 py-3 lg:py-0 items-center`}>
                <img className='w-10 md:w-18' src={`${theme ? '/asset/logo_white.png' : '/asset/logo_blue.gif'}`} alt="" />
                {/* Desktop Menu */}
                <div className='hidden lg:flex items-center  gap-10'>
                    <ul className=' flex gap-10'>
                        {links.map((link, index) => (
                            <li key={index} className='relative text-[16px] font-medium'>
                                <Link
                                    to={link.path}
                                    className={` ${location.pathname === link.path
                                        ? `${theme ? 'text-white' : 'text-blue-700'}`
                                        : `${theme ? 'text-blue-300' : 'text-black'}`
                                        }`}>
                                    {link.name}
                                    {location.pathname === link.path && (
                                        <motion.div
                                            layoutId="underline"
                                            className={`${theme ? 'bg-white' : 'bg-blue-700'} absolute left-0 bottom-0 w-full h-[2px] rounded`}
                                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    {
                        !user ? <div className='flex gap-2 '>
                            <Link to='/signin'><SignBtn></SignBtn></Link>
                            <Link to='/register'><RegisterBtn></RegisterBtn></Link>
                        </div> : <div className='flex items-center gap-3'>
                            <div className="dropdown dropdown-bottom dropdown-center">
                                <div tabIndex={0} role="button" className='cursor-pointer'>
                                    <UserImg></UserImg></div>
                                <ul tabIndex={0} className={`${theme ? 'dark-theme' : 'bg-base-100 '} dropdown-content menu rounded-box z-1 w-60 p-2 shadow-sm mt-2 flex items-center`}>
                                    <Link to='/createassignment'><li className='hover:bg-[green] hover:text-white duration-200 rounded-sm'><p>Create Assignments</p></li></Link>
                                    <Link to={`/attemptassignment/${user.email}`}><li className='hover:bg-[green] hover:text-white duration-200 rounded-sm'><p>My Attempted Assignments</p></li></Link>
                                    <Link to='/myprofile'><li className='hover:bg-[green] hover:text-white duration-200 rounded-sm'><p><FaUser></FaUser>My Profile</p></li></Link>
                                </ul>
                            </div>
                            <button onClick={handleLogOut} className={`${theme ? 'bg-green-900 lg:bg-red-600' : 'bg-green-900 text-white '} font-extrabold cursor-pointer  text-white px-5 py-4 text-lg w-full h-full flex items-center `}> 
                            <span className='text-3xl'><MdOutlineLogout /> </span>   Logout</button>
                                
                        </div>
                    }
                </div>

                {/* Hamburger Icon */}
                <div className=' flex lg:hidden  items-center justify-center gap-1.5'>
                    {
                        user && <div className="dropdown dropdown-bottom dropdown-center">
                            <div tabIndex={0} role="button" className='cursor-pointer w-8 md:w-12'><UserImg></UserImg></div>
                            <ul tabIndex={0} className={`${theme ? 'dark-theme' : 'bg-base-100 '} dropdown-content menu rounded-box z-1 w-60 p-2 shadow-sm mt-6 md:mt-7 mr-16 md:mr-7 flex items-center`}>
                                <Link to='/createassignment'><li className='hover:bg-[green] hover:text-white duration-200 rounded-sm'><p>Create Assignments</p></li></Link>
                                <Link to={`/attemptassignment/${user.email}`}><li className='hover:bg-[green] hover:text-white duration-200 rounded-sm'><p>My Attempted Assignments</p></li></Link>
                                <Link to='/myprofile'><li className='hover:bg-[green] hover:text-white duration-200 rounded-sm'><p>My profile</p></li></Link>
                                <button onClick={handleLogOut} className={`${theme ? 'bg-green-900 lg:bg-red-600' : 'bg-green-900 text-white '} font-extrabold cursor-pointer  text-white px-5 py-2 lg:text-lg w-full h-full flex items-center lg:hidden justify-center`}> 
                            <span className='text-xl lg:text-3xl'><MdOutlineLogout /> </span>   Logout</button>
                            </ul>
                        </div>
                    }
                    <TiThMenuOutline onClick={toggleMenu} className=' text-2xl md:text-3xl cursor-pointer' />
                </div>
            </nav>
            {/* Mobile Drawer */}
            {isOpen && (
                <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '-100%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 40 }}
                    className={`${theme ? 'bg-gray-600 text-white' : 'bg-white text-black'} fixed top-0 left-0 h-full w-3/4 sm:w-1/2 p-5 z-[1100] shadow-lg text-center  flex flex-col items-end`}
                >
                    <div className='flex w-full justify-between items-center mb-5'>
                        <Theme></Theme>
                        <IoMdClose onClick={toggleMenu} className='text-2xl cursor-pointer' />
                    </div>

                    <ul className='flex flex-col gap-4 text-lg w-full  items-end'>
                        {links.map((link, index) => (
                            <li key={index}>
                                <Link
                                    to={link.path}
                                    className={` ${location.pathname === link.path
                                        ? `${theme ? 'text-white font-bold' : 'text-orange-600 font-bold'} `
                                        : ''}`}
                                    onClick={toggleMenu}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {
                        !user ? <div className='mt-8 flex flex-col gap-3 w-full '>
                            <Link to={'/signin'} className='font-bold flex items-center justify-end'>
                            <button className=''>Sign In</button>
                            </Link>
                            <Link to={'/register'} className='font-bold flex items-center justify-end'>
                            <button className=''>Register</button>
                            </Link>
                        </div> : <div>

                        </div>
                    }
                </motion.div>
            )}

            {/* Backdrop */}
            {isOpen && (
                <div
                    className='fixed top-0 left-0 w-full h-full hero bg-opacity-30 z-[1050]'
                    onClick={toggleMenu}
                />
            )}
        </div>
    );
};

export default Navigation;
