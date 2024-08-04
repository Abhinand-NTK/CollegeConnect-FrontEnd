import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { jwtDecode } from 'jwt-decode';


const NotFound = () => {
    const [linkssss, setLinkssss] = useState('/'); // Provide an initial value for the state variable

    const token = localStorage.getItem('Token');

    if (token) {
        const data_user = jwtDecode(token);

        if (data_user.user_id === 1) {
            setLinkssss('/admin/landing');
        } else if (data_user.user_id === 2 || data_user.user_id === 3) {
            setLinkssss('/manage');
        }
    }

    return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">404 - Not Found</h2>
                <p className="text-lg text-gray-600 mb-8">
                    Oops! The page you are looking for might be in another castle.
                </p>
                <Link to={linkssss} className="text-blue-500 underline">
                    Go back to home
                </Link>
            </div>
    );
};

export default NotFound;
