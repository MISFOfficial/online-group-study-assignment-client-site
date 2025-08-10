import React, { use } from 'react';
import { AuthContext } from '../../Auth/AuthContext';
import { Tooltip } from 'react-tooltip'
import { FaUser } from 'react-icons/fa';

const UserImg = () => {
    const { user } = use(AuthContext)
    // console.log(user.displayName)
    console.log(user.photoURL)
    return (
        <div className='w-8 h-8 md:w-12 md:h-12 lg:w-15 lg:h-15  object-cover rounded-[1000px] '>
            <img
                src={user?.photoURL || '/user.png' }
                alt={user?.displayName}
                className="w-full h-full  object-cover rounded-full"
                data-tooltip-id="my-tooltip"
                data-tooltip-place="left"
                data-tooltip-content={user?.displayName}
            />
            <Tooltip id="my-tooltip" />
        </div>
    );
};

export default UserImg;