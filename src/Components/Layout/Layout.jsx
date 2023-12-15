import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '../NavBar/Navbar';
import Menu from '../Menu/Menu';


const Layout = ({ children, title, content }) => {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={content} />
      </Helmet>
      <Navbar />
      <Menu/>
      <div className='container'>
        {children}
      </div>
    </div>
  );
};

export default Layout;
