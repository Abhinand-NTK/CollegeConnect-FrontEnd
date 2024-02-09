

import React, { useContext, useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Layout from '../Components/Layout/Layout';
import BlogPostComponent from './BlogComponet';
import UserDetails from './UserDetails';
import { AuthContext } from '../context/contex';
import { StudentUserServices } from '../services/authservices';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';
import io from 'socket.io-client';
import { GrSend } from "react-icons/gr";
import { Link, useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from '../Firebase/config';




const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Post content is required'),
});

const BlogPost = () => {
    const [showFirstDiv, setShowFirstDiv] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [datas, setDatas] = useState(null);
    const { setblogpost, blogpost, setreceiver } = useContext(AuthContext);
    const [user_id, setUser_id] = useState(null);
    const [likeCount, setLikeCount] = useState(0);
    const [activeUsers, setActiveUsers] = useState([]);


    // Create the file metadata for any video type
    /** @type {any} */
    const metadata = {
        contentType: 'image/*'
    };

    const contentAnimation = useSpring({
        opacity: showFirstDiv ? 1 : 0,
        transform: showFirstDiv ? 'translateY(0)' : 'translateY(20px)',
    });




    const togglePostForm = () => {
        setShowForm(!showForm);
        setSelectedImage(null)

    };

    let file = ''
    const handleImageChange = (event) => {

        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setSelectedImage(URL.createObjectURL(selectedFile));
            formik.setFieldValue('image_url', selectedFile); // Set the image_url field value in Formik
        }
    };



    const formik = useFormik({
        initialValues: {
            title: blogpost[0]?.title || '',
            content: blogpost[0]?.content || '',
            id: blogpost[0]?.id || '',
            image_url: blogpost[0]?.image_url || '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setblogpost(values);
            submitPost(values);
        },
        enableReinitialize: true,
    });

    const submitPost = async (postData) => {
        let storageRef;
        let uploadTask;

        // Use selectedFile from formik.values.image_url instead of selectedImage
        storageRef = ref(storage, 'blogimages/' + postData.image_url.name);

        // Use selectedFile from formik.values.image_url instead of selectedImage
        uploadTask = uploadBytesResumable(storageRef, postData.image_url, metadata);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');

                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        break;
                    case 'storage/canceled':
                        break;
                    case 'storage/unknown':
                        break;
                }
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    // Saveurl(downloadURL)
                    savepost(postData, downloadURL)
                });
            }
        );

    };

    const savepost = async (postData, url) => {
        postData.image_url = url
        try {
            const response = await StudentUserServices.CreateBlogPost(postData);
            // Rest of your code...
            if (response?.status == 201) {
                setShowForm(false)
                toast.success('This is a success toast message', {
                    position: 'top-right',
                    duration: 3000,
                });
                getAllPost()
                setSelectedImage(null)
            }
            if (response?.status == 205) {
                setShowForm(false)
                toast.success('Your Blog is Updated Sucessfully', {
                    position: 'top-right',
                    duration: 3000,
                });
                getAllPost()
            }
        } catch (error) {
            console.error('Error submitting post:', error);
        }
    }


    const getAllPost = async () => {
        try {
            const response = await StudentUserServices.getBlogPost()

            setDatas(response?.data)

        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        getAllPost()
        StudentUserServices.activeusers()
        const token = localStorage.getItem('Token');

        if (token && !user_id) {
            setUser_id(jwtDecode(token).user_id);
        }
    }, [])


    const token = localStorage.getItem('Token')
    const data_user = jwtDecode(token)
    const activeUserId = jwtDecode(token).user_id;



    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8000/ws/active_users/');
        // const socket = new WebSocket('wss://studentconnect.tech/ws/active_users/');

        socket.onmessage = (event) => {



            const data = JSON.parse(event.data);
            const newActiveUsers = data;


            const updatedActiveUsers = newActiveUsers.filter(newUser => (
                !activeUsers.some(existingUser => existingUser.email == newUser.email && existingUser.id != activeUserId)
            ));


            const uniqueUsersByEmail = Array.from(new Set(activeUsers.map(user => user.email)))
                .map(uniqueEmail => activeUsers.find(user => user.email == uniqueEmail))
                .filter(user => user && user.id != activeUserId);


            setActiveUsers(updatedActiveUsers);

        };


        return () => {
            socket.close();
        };
    }, [activeUsers]);


    useEffect(() => {
        const ws = new WebSocket(`ws://localhost:8000/ws/notifications/${data_user.user_id}/`);
        // const ws = new WebSocket(`wss://studentconnect.tech/ws/notifications/${data_user.user_id}/`);

        ws.onopen = () => {
            console.log('WebSocket connection opened');
        };

        ws.onmessage = (event) => {
            const notification = JSON.parse(event.data);

            const messageToDisplay = notification.notification;
            toast.success(messageToDisplay, {
                position: 'top-right',
                duration: 7000,
            });

        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };


        return () => {
            ws.close();
        };
    }, []);

    const Navigate = useNavigate();

    const handleClick = (id) => {
        setreceiver(id)
        Navigate(`/users/messages/${id}`);
    };


    return (
        <section className='bg-white mt-20 h-auto md:h-[600px]'>
            <Layout />
            <div className='flex ml-12'>
                <div className='lg:w-1/4 h-screen'>
                    <div className='w-full fixed lg:relative'>
                        {showFirstDiv && <UserDetails />}
                        <div className="flex flex-col ml-12">
                            {activeUsers.length > 0 && <h2 className="text-lg font-semibold text-center mb-2">Active Users</h2>}
                            {activeUsers.map((item, index) => (
                                <div key={index} className="bg-white p-4 rounded-md shadow-md mb-4">
                                    <div className="right-0 bg-green-500 rounded-full w-2 h-2"></div>
                                    <div className='flex justify-between items-center'>
                                        <div className='mt-2'>
                                            <p className="font-semibold">{item?.first_name}</p>
                                        </div>
                                        <div>
                                            <button
                                                onClick={() => (handleClick(item.id))}
                                                className="bg-indigo-500 text-white px-2 py-1 rounded">
                                                <GrSend />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <p className="text-gray-500 text-xs">{item?.email}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
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
                                    // accept="image/*"
                                    id="imageInput"
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }}
                                />
                            </label>
                            {/* 
                            {selectedImage || blogpost[0].image_url && (
                                <div className="mt-4">
                                    <img src={blogpost[0].image_url?blogpost[0].image_url:selectedImage}

                                     alt="Selected" className="max-w-full items-center h-100" />
                                </div>
                            )} */}
                            {(selectedImage || (blogpost[0] && blogpost[0].image_url)) && (
                                <div className="mt-4">
                                    <img
                                        src={blogpost[0] && blogpost[0].image_url ? blogpost[0].image_url : selectedImage}  
                                        alt="Selected"
                                        className="max-w-full items-center h-100"
                                    />
                                </div>
                            )}


                            <div id="blogPostForm" className="mt-8 w-full ml-4 ">
                                <form onSubmit={formik.handleSubmit} className='' >
                                    {/* <label className="custom-file-input-label mb-4">

                                        <span>Choose an Image</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            id="imageInput"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.image_url}
                                            style={{ display: 'none' }}
                                        />
                                    </label> */}
                                    <textarea
                                        id="postTextarea"
                                        name="content"
                                        className="w-full p-4 border rounded-md mt-4 items-center"
                                        placeholder="Write your post here..."
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.content}
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
                            {datas && datas.map((item, index) => (
                                <BlogPostComponent
                                    key={index} title={item.title} content={item.content} id={item.id} user_id={item?.user_id} item={item} showForm={showForm} setShowForm={setShowForm} data={datas} setdata={setDatas} />
                            ))}
                        </animated.div>
                    </div>
                </div>
            </div >
        </section >
    );
};

export default BlogPost;
