import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const [message, setMessage] = useState('');
    const Navigate = useNavigate();

    const handleCollegeRegisterClick = () => {
        // Add logic to navigate to the college registration page
        Navigate('/signin/');
    };

    const handleUserRegisterClick = () => {
        // Add logic to navigate to the user registration page
        Navigate('/signin/');
    };

    return (
        <>
        <Layout title='Home | Welcome ' content=' Admin Landing page'></Layout>
            <div className=' w-full'>

            </div>
            <div className="mx-auto overflow-y-hidden  p-20 pt-32 max-w-2xl lg:mx-0 lg:max-w-none pl-20 bg-opacity-90 pr-20">
                <img

                    src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
                    alt=""
                    className="absolute  inset-0 -z-10   w-full object-cover object-right md:object-center"
                />
                <div className="grid grid-cols-1 gap-y-6 text-base font-semibold sm:text-xl leading-7 text-white md:grid-cols-2 lg:gap-x-10">
                    <div>
                        <h6 className="text-4xl font-bold tracking-tight text-white sm:text-4xl">
                            Unlock a world of possibilities in student management with our app! 🎓✨
                        </h6>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            Why Choose Our Student Management App?
                            🚀 **Seamless Connectivity**: Connect with students and staff across multiple colleges effortlessly.
                            💼 **Efficient Management**: Manage student details, schedules, and activities with ease.
                            💡 **Innovative Solutions**: Stay ahead with innovative features tailored for modern educational needs.
                        </p>
                        <div className='mt-3'>
                            <button
                                onClick={()=>Navigate('/signin')}
                                className="px-6 py-3 bg-blue-400 bg-opacity-30 hover:bg-opacity-30 text-white rounded-md hover:bg-blue-500 focus:outline-none
                                 focus:ring focus:border-blue-300"
                            >
                                Login into your Account
                            </button>

                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-4">

                        <div className='flex flex-col justify-between  '>
                            <div className='text-white underline'>
                                <button className='bg-transparent'
                                onClick={()=>{Navigate('collegregister')}}
                                >
                                Register Your College →
                                </button>
                            </div>
                            <div className='text-white underline mt-5'>
                                <button className='bg-transparent'
                                onClick={()=>{Navigate('signup')}}
                                >
                                Register As Studnet →
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            </>
    );
};

export default LandingPage;
