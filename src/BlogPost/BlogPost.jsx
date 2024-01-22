import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import Layout from '../Components/Layout/Layout';
import BlogPostComponent from './BlogComponet';
import UserDetails from './UserDetails';


const BlogPost = () => {
    const [showFirstDiv, setShowFirstDiv] = useState(true);

    // Use react-spring for animating only the BlogPostComponent
    const contentAnimation = useSpring({
        opacity: showFirstDiv ? 1 : 0,
        transform: showFirstDiv ? 'translateY(0)' : 'translateY(20px)',
    });

    return (
        <section className='bg-white p-4 md:p-10 lg:p-16 mt-8 md:mt-24 h-auto md:h-[600px]'>
            <Layout />
            <div className='flex ml-52'>
                <div className='lg:w-1/4 h-screen'>
                    <div className='w-full fixed lg:relative'>
                        {showFirstDiv && <UserDetails />}
                    </div>
                </div>
                <div className='w-3/4 h-screen'>
                    <animated.div style={contentAnimation} className='w-full ml-12 lg:w-3/4 md:w-3/4 '>
                        <BlogPostComponent title="Blog Title 1" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
                        <BlogPostComponent title="Blog Title 2" content="Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
                    </animated.div>
                </div>
            </div>
        </section>
    );
};

export default BlogPost;
