

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import UsersDashboard from "../Components/ResusableComponets/UsersDashboard";

const PublicRoute = ({ element }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('Token');
  let decode = '';

  useEffect(() => {
    // If the user is logged in, redirect based on user_type
    if (token) {
      decode = jwtDecode(token);
      if (decode.is_super_admin) {
        navigate('/admin/users/');
      } else if (decode.user_type === "1") {
        navigate('/admin/landing');
      } else if (decode.user_type === "2" || decode.user_type === "3") {
        navigate('/manage');
      }
    }
  }, [navigate, token]);

  // If the user is not logged in, render the UsersDashboard component
  return (
    ((decode && (decode.user_type === "1" || decode.user_type === "2" || decode.user_type === "3")) ? (!token && <UsersDashboard />) : element)
  );
};

export default PublicRoute;
