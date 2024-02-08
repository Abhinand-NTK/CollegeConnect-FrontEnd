import React from 'react';
import { Helmet } from 'react-helmet';
import Menu from '../Menu/Menu';
import { useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Navbar from "../NavBar/NavBar"



const Layout = ({ children, title, content }) => {
  const location = useLocation()
  const token = localStorage.getItem('Token')
  let decodedToken = ''
  if (token){
     decodedToken = jwtDecode(token)
  }
  
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={content} />
      </Helmet>
      <Navbar />
       { decodedToken  ? <Menu/> : '' }
      <div className='container'>
        {children}
      </div>
    </div>
  );
};

export default Layout;
