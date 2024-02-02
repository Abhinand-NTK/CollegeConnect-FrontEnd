
import React from 'react';
import Layout from '../Components/Layout/Layout';


const ChatComponent = () => {
    return (
        <section className='bg-white p-4 md:p-10 lg:p-16 mt-8 md:mt-24 h-auto md:h-[600px]'>
            <Layout />
            <div className='flex ml-20'>
                <div

                    className='flex-1 scrollNone p-2 w-full sm:w-1/2  sm:p-6 overflow-y-scroll items-center border-4  flex flex-col h-screen'>
                    <div className='w-full  p-4   shadow-md shadow-gray-600 rounded-sm '>
                        <img
                            className='h-5 w-5'
                            src="https://t3.ftcdn.net/jpg/05/17/79/88/360_F_517798849_WuXhHTpg2djTbfNf0FQAjzFEoluHpnct.jpg" alt="" />
                        test
                    </div>

                    <div className='w-full  p-4   shadow-md shadow-gray-600 rounded-sm '>
                        <img
                            className='h-5 w-5'
                            src="https://t3.ftcdn.net/jpg/05/17/79/88/360_F_517798849_WuXhHTpg2djTbfNf0FQAjzFEoluHpnct.jpg" alt="" />
                        test
                    </div>

                </div>

                <div className="flex-1 p-2 w-full sm:w-1/2 border-4 sm:p-6 justify-between items-center flex flex-col h-screen">
                    <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
                        <div className="relative flex items-center space-x-4">
                            <div className="relative">
                                <span className="absolute text-green-500 right-0 bottom-0">
                                    <svg width="20" height="20">
                                        <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                                    </svg>
                                </span>
                                <img
                                    src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                                    alt=""
                                    className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
                                />
                            </div>
                            <div className="flex flex-col leading-tight">
                                <div className="text-2xl mt-1 flex items-center">
                                    <span className="text-gray-700 mr-3">Anderson Vanhron</span>
                                </div>
                                <span className="text-lg text-gray-600">Junior Developer</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                    </div>
                    <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                        <div className="relative flex">
                            <span className="absolute inset-y-0 flex items-center">
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                                        ></path>
                                    </svg>
                                </button>
                            </span>
                            <input
                                type="text"
                                placeholder="Write your message!"
                                className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
                            />
                            <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </section>
    );
};

export default ChatComponent;
