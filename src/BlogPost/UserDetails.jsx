

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserPen } from 'react-icons/fa6';
import { StaffUserServices } from '../services/authservices';

const UserDetails = () => {

    const [userInfo, setUserInfo] = useState({
        profilePic: 'URL_TO_PROFILE_PIC',
        username: 'Abhinand Ntk',
        email: 'abhinandntk@gmail.com',
        CollegeName: 'Govt.College',
    });
    const user = {
        profilePic: 'URL_TO_PROFILE_PIC',
        username: 'Abhinand Ntk',
    };

    const UserDetail = async () => {
        try {
            const response = await StaffUserServices.UserDetails();

            setUserInfo(prevUserInfo => ({
                ...prevUserInfo,
                profilePic: response?.staff?.user_image || `http://127.0.0.1:8000${response?.student?.user_image}`,
                username: `${response?.staff?.first_name || response?.student?.first_name} ${response?.staff?.last_name || response.student?.last_name}`,
                email: response?.staff?.email || response?.student?.email,
                CollegeName: response?.staff?.collge_id?.collegename || response?.student?.collge_id?.collegename
            }));


            console.log("User Details:", response);
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    console.log(user)

    useEffect(() => {
        UserDetail()
    }, [])

    return (
        <div className='w-full lg:w-3/4 rounded-xl ml-4 lg:ml-8 lg:flex lg:items-center'>


            <div className='lg:flex lg:flex-col lg:items-center lg:text-center bg-white p-10 rounded-lg shadow-md'>
                <img
                    src={userInfo.profilePic}
                    alt='Profile Pic'
                    className='w-20 h-20 rounded-full border-4 mb-4 lg:mb-0'
                />
                <p className='font-bold text-gray-800 text-lg mb-2'>{userInfo.username}</p>
                <p className=' text-gray-800 text-sm mb-2'>{userInfo.CollegeName}</p>
                <p className=' text-gray-800 text-sm mb-2'>{userInfo.email}</p>

                {/* Additional user details for a blog app */}
                <p className='text-gray-600 mb-4'>{userInfo.bio}</p>

                <div className='flex space-x-4 mb-4'>
                    <button className='bg-indigo-900 text-white px-4 py-2 rounded-md inline-block'>
                        Follow
                    </button>
                    <button className='bg-indigo-900 text-white px-4 py-2 rounded-md inline-block'>
                        Message
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
