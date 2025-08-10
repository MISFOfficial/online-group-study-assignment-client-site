import React, { use } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../Auth/AuthContext';

const RegisterBtn = () => {
    const {theme}=use(AuthContext)
    return (
        <Link to='/register'><button className={`${theme ? 'lg:bg-red-600' : 'bg-green-700 text-white '} font-extrabold cursor-pointer  text-white px-5 py-4 text-lg w-full h-full`}>Register</button></Link>
    );
};

export default RegisterBtn;