import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { is_logged, loading } from '../features/Login/AuthSlice';
import { jwtDecode } from 'jwt-decode';


const PrivateRoute = () => {
  const isLoggedIn = useSelector(is_logged);
  const load = useSelector(loading);
  const navigate = useNavigate();
  const [showLoading, setShowLoading] = useState(true);

  let token = ''
  token = localStorage.getItem('Token')
  let decode_token = ''
  if (token) {
    decode_token = jwtDecode(token)
    console.log(decode_token)

  }


  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      setShowLoading(false);
    }, 2000);

    return () => clearTimeout(delayTimeout);
  }, []);

  useEffect(() => {
    // If the user is not logged in, redirect to the login page ('/admin/' route)
    if (!token) {
      // Navigate only if not in a loading state
      if (!load && !showLoading) {
        // if(decode_token)
        navigate("/");
      }
    }
  }, [isLoggedIn, load, navigate, showLoading]);

  if (showLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="bg-white">
          <div role="status">
            <div class="flex flex-row gap-2">
              <div class="w-4 h-4 rounded-full bg-red-700 animate-bounce [animation-delay:.7s]"></div>
              <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
              <div class="w-4 h-4 rounded-full bg-green-700 animate-bounce [animation-delay:.7s]"></div>
            </div>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    )
  }

  return <Outlet />;
};

export default PrivateRoute;
