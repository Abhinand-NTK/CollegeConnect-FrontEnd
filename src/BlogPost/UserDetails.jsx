import React from 'react';
import { Link } from 'react-router-dom';

const UserDetails = () => {
    const user = {
        profilePic: 'URL_TO_PROFILE_PIC',
        username: 'Abhinand Ntk',
    };

    return (
        <div className='w-full lg:w-3/4 rounded-xl md:w-1/4 ml-8 h-52 bg-white p-6'>
            <div className='flex flex-col items-center'>
                <img src={user.profilePic} alt='Profile Pic' className='w-20 h-20 rounded-full border-4 border-gray-300 mb-4' />
                <p className='text-center font-bold text-gray-800 text-lg mb-2'>{user.username}</p>
                {/* Add more user details as needed */}
                <div className='flex space-x-4'>

                    <Link to="/users/message" className="bg-indigo-500 text-white px-4 py-2 rounded-md inline-block">
                        Follow
                    </Link>
                    <Link to="/users/message" className="bg-indigo-500 text-white px-4 py-2 rounded-md inline-block">
                        Message
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
