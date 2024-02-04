import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/Login/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {

    const token = localStorage.getItem('Token')
    const dispath = useDispatch()
    const navigate = useNavigate()


    const logout_session = () => {
        dispath(logout())
        navigate('/')
    }

    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };
    return (
        <nav className="border-gray-200 fixed top-0 w-screen  dark:bg-gray-800 dark:border-gray-700 bg-white z-50">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://guru.cr/images/5149436.png" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Student Connect</span>
                </a>
                <div className='relative'>
                    {token &&

                        <button
                            data-collapse-toggle="navbar-hamburger"
                            type="button"
                            className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-hamburger"
                            aria-expanded={isNavbarOpen}
                            onClick={toggleNavbar}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    }
                    <div className={`absolute top-10 right-0 w-full ${isNavbarOpen ? 'flex justify-end' : 'hidden'}`} id="navbar-hamburger">
                        <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                            <li>
                                <a href="#" className="block py-2 px-3 text-gray-900 rounded
                                 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700
                                 dark:hover:text-white" onClick={logout_session} aria-current="page">Logout</a>
                            </li>
                        </ul >
                    </div >
                </div>
            </div >
        </nav >
    )
}

export default Navbar


