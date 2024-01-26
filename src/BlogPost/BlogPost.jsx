
import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useFormik } from 'formik'; // Import useFormik
import * as Yup from 'yup'; // Import Yup for validation
import Layout from '../Components/Layout/Layout';
import BlogPostComponent from './BlogComponet';
import UserDetails from './UserDetails';

const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    postContent: Yup.string().required('Post content is required'),
});

const BlogPost = () => {
    const [showFirstDiv, setShowFirstDiv] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // Use react-spring for animating only the BlogPostComponent
    const contentAnimation = useSpring({
        opacity: showFirstDiv ? 1 : 0,
        transform: showFirstDiv ? 'translateY(0)' : 'translateY(20px)',
    });

    const togglePostForm = () => {
        setShowForm(!showForm);
    };

    const handleImageChange = (event) => {
        // Handle the selected image here
        const file = event.target.files[0];
        setSelectedImage(URL.createObjectURL(file));
    };

    const submitPost = () => {
        // Implement your post submission logic here
        console.log('Post submitted!');
    };

    const formik = useFormik({
        initialValues: {
            title: '',
            postContent: '',
            // Add more fields if needed
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Handle submission logic here, you can access form data in the 'values' object
            console.log('Form data:', values);
            // Add your logic to send data to the server (submitPost function?)
        },
    });

    return (
        <section className='bg-white p-4 md:p-10 lg:p-16 mt-8 md:mt-24 h-auto md:h-[600px]'>
            <Layout />
            <div className='flex ml-12'>
                <div className='lg:w-1/4 h-screen'>
                    <div className='w-full fixed lg:relative'>
                        {showFirstDiv && <UserDetails />}
                    </div>
                </div>
                <div className='w-3/4 h-screen flex flex-col items-center'>
                    <button
                        title="Click To Post"
                        className="group cursor-pointer outline-none hover:rotate-90 duration-300"
                        onClick={togglePostForm}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="50px"
                            height="50px"
                            viewBox="0 0 24 24"
                            className="stroke-zinc-200 fill-none group-hover:fill-indigo-800 group-active:stroke-zinc-200
                             group-active:fill-indigo-950 group-active:duration-0 duration-300"
                        >
                            <path
                                d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                                strokeWidth="1.5"
                            ></path>
                            <path d="M8 12H16" strokeWidth="1.5"></path>
                            <path d="M12 16V8" strokeWidth="1.5"></path>
                        </svg>
                    </button>

                    {showForm && (
                        <div id="blogPostForm" className="mt-8 w-full  lg:w-3/4 md:w-3/4">
                            <label className="custom-file-input-label mb-4">
                                <span>Choose an Image</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="imageInput"
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }}
                                />
                            </label>

                            {selectedImage && (
                                <div className="mt-4">
                                    <img src={selectedImage} alt="Selected" className="max-w-full items-center h-100" />
                                </div>
                            )}

                            <div id="blogPostForm" className="mt-8 w-full ml-4 ">
                                <form onSubmit={formik.handleSubmit} className=''>
                                    <textarea
                                        id="postTextarea"
                                        name="postContent"
                                        className="w-full p-4 border rounded-md mt-4 items-center"
                                        placeholder="Write your post here..."
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.postContent}
                                    ></textarea>

                                    <input
                                        type="text"
                                        id="titleInput"
                                        name="title"
                                        className="w-full p-4 border rounded-md mt-4"
                                        placeholder="Enter the title"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.title}
                                    />

                                    <button type="submit" className="mt-4 bg-indigo-900 text-white p-2 rounded-md hover:bg-indigo-950">
                                        Submit Post
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    <div className='w-full ml-4 lg:w-3/4 md:w-3/4 '>
                        <animated.div style={contentAnimation}>
                            <BlogPostComponent title="Blog Title 1" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
                            <BlogPostComponent title="Blog Title 2" content="Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
                        </animated.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogPost;
