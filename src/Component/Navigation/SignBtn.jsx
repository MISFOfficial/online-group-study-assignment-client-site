import React, { use } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../Auth/AuthContext';

const SignBtn = () => {
    const{theme}=use(AuthContext)
    return (
        <div >
            <Link to='/signin'><button className={`${theme ? 'text-white' : 'text-white lg:text-black'} cursor-pointer bg-red-800 lg:bg-transparent  lg:font-extrabold px-5 py-4 h-full text-lg  w-full`}>Sign In</button></Link>
        </div>
    );
};

export default SignBtn;