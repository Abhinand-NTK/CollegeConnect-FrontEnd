import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const PrivateRoute = () => {
  const isLoggedIn = true
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/")
    }

  }, [])


  return <Outlet />
}

export default PrivateRoute
