
import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import { StaffUserServices } from '../../services/authservices';

const UserProfileCard = () => {


    const [userDetails, setUserDetails] = useState({})


    const userdetails = async () => {
        try {
            const response = await StaffUserServices.UserDetails()
            console.log(response)
            setUserDetails(response.staff)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        userdetails()
    }, [])



    return (
        <Layout>
            <div className="bg-indigo-950 p-8 md:p-28">
                <div className="p-4 md:p-8 bg-white shadow mt-44 md:mt-24">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        <div className="grid grid-cols-3 text-center order-last md:order-first mt-6 md:mt-0">
                            <div>
                                <p className="font-bold text-gray-700 text-xl">22</p>
                                <p className="text-gray-400">Friends</p>
                            </div>
                            <div>
                                <p className="font-bold text-gray-700 text-xl">10</p>
                                <p className="text-gray-400">Photos</p>
                            </div>
                            <div>
                                <p className="font-bold text-gray-700 text-xl">89</p>
                                <p className="text-gray-400">Comments</p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                                {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg> */}
                                <img className="h-24 w-24"
                                    src={`data:image/svg+xml,${encodeURIComponent(
                                        '<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" /></svg>'
                                    )}`}
                                    alt="Default Image"
                                />

                            </div>
                        </div>
                        <div className="space-x-8 flex justify-between mt-28 md:mt-0 md:justify-center">
                            <button className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                                Edit Email
                            </button>
                            <button className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                                Message
                            </button>
                        </div>
                    </div>
                    <div className='ml-20'>
                        <div className="mt-6  md:mt-20">
                            <h1 className="text-2xl md:text-4xl font-medium text-gray-700">
                                {userDetails.first_name} {userDetails.last_name}, <span className="font-light text-gray-500">{userDetails.age}</span>
                            </h1>
                            <p className="font-semibold text-gray-600">Kerala, India</p>
                            <p className=" text-gray-500">Student - {userDetails?.collge_id?.collegename}</p>
                            {/* <p className="mt-2 text-gray-500">APJ Abdul Kalam Technological University (KTU)</p> */}
                        </div>
                        <div className="sm:mt-0 mt-2 border-b pb-6 md:pb-12">
                            {/* <h1 className="text-2xl md:text-4xl font-medium text-gray-700">
                                Personal Info<span className="font-light text-gray-500"></span>
                            </h1> */}
                            {/* <p className=" text-gray-500 mt-2 md:mt-3">Department :- Mechanical</p> */}
                            {/* <p className="mt-2 text-gray-500">Acadamic Year - 2019 :- 2022</p>
                            <p className="mt-2 text-gray-500">Register No :- 201987</p>
                            <p className="mt-2 text-gray-500">Date of birth :- 19/10/1997</p> */}
                            <p className="mt-2 text-gray-500">Phone No :- {userDetails?.phone_number}</p>
                            <p className="mt-2 text-gray-500">Email :- {userDetails?.email}</p>
                            {/* <p className="mt-2 text-gray-500">Address :- Kunchipuriyil (ho)</p>
                            <p className="mt-2 text-gray-500">Po :- Champad</p>
                            <p className="mt-2 text-gray-500">Pin :- 670694</p> */}
                        </div>
                    </div>

                    <div className="mt-4 md:mt-12 flex flex-col justify-center">
                        <p className="text-gray-600 text-center font-light lg:px-4 md:px-16">
                            An artist of considerable range, Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes,
                            performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure. An artist of
                            considerable range.
                        </p>
                        <button className="text-indigo-500 py-2 px-4 font-medium mt-4">Show more</button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default UserProfileCard;

