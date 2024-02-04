import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { is_logged, loading } from '../features/Login/AuthSlice';
import { jwtDecode } from 'jwt-decode';
import { StaffUserServices } from '../services/authservices';


const PrivateRoute = ({ role, hods }) => {
  const isLoggedIn = useSelector(is_logged);
  const load = useSelector(loading);
  const navigate = useNavigate();
  const [showLoading, setShowLoading] = useState(true);
  const [hod, sethod] = useState('')
  console.log("object", role)
  let token = ''
  token = localStorage.getItem('Token')
  let decode_token = ''
  if (token) {
    decode_token = jwtDecode(token)
    console.log(decode_token)

  }
  console.log("The role of the users is ::---", role)
  console.log("The role of user_type ::---", decode_token.user_type)

  const user = async () => {
    try {
      const response = await StaffUserServices.UserDetails()
      sethod(response?.is_hod)
    } catch (error) {
      console.log(error)
    }
  }



  useEffect(() => {
    user()
    const delayTimeout = setTimeout(() => {
      setShowLoading(false);
    }, 2000);

    return () => clearTimeout(delayTimeout);
  }, []);

  useEffect(() => {

    // let user_ids = decode_token?.user_type

    if (!token) {
      // Navigate only if not in a loading state

      if (!load && !showLoading) {
        // if(decode_token)
        navigate("/");
      }
    }
    if (role) {
      const user_ids = decode_token?.user_type;
      let set = true
      for (let i = 0; i < role.length; i++) {
        console.log(role[i]);
        if (role[i] == user_ids) {
          set = false
        }
      }
      if (set) {
        navigate("/*")
      }
    }
    if (hod) {
      if (hods && hod){
        navigate('/*')
      }
    }
  }, [isLoggedIn, load, navigate, showLoading, role, decode_token]);


  if (showLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="bg-white">
          <div role="status">
            <div className="flex flex-row gap-2">
              <div className="w-4 h-4 rounded-full bg-red-700 animate-bounce [animation-delay:.7s]"></div>
              <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
              <div className="w-4 h-4 rounded-full bg-green-700 animate-bounce [animation-delay:.7s]"></div>
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
