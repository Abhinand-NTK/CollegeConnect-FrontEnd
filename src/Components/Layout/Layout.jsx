import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '../NavBar/Navbar';

const Layout = ({ children, title, content }) => {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={content} />
      </Helmet>
      <Navbar />
      <div className='container'>
        {children}
      </div>
    </div>
  );
};

export default Layout;
