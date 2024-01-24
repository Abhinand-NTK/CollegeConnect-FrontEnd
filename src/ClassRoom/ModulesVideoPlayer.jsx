import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player'
import Layout from '../Components/Layout/Layout';
import { storage } from '../Firebase/config';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { FaUpload } from "react-icons/fa";
import { StaffUserServices } from '../services/authservices';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';




const ModulesVideoPlayer = () => {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [selectedVideoname, setSelectedVideoName] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const { id____ } = useParams()
    const { M_no } = useParams()
    const [urlData, setDataUrl] = useState([])

    console.log("Thi is hte id u have:--", id____)

    const Token = localStorage.getItem('Token')

    const decoded = jwtDecode(Token);

    console.log("The User Type Is :---", decoded.user_type)




    // Create the file metadata for any video type
    /** @type {any} */
    const metadata = {
        contentType: 'video/*'
    };

    const GetdataOfModule = async () => {
        try {
            const response = await StaffUserServices.GetModuleVideo(M_no)
            console.log("This is the response ::-----", response)
            setDataUrl(response.module_video_url)
        } catch (error) {
            console.log(error)

        }
    }

    const handleFileChange = (event) => {
        // Handle video file selection
        const file = event.target.files[0];
        if (file) {
            setSelectedVideo(URL.createObjectURL(file));
            setSelectedVideoName(file);
        }
    };

    useEffect(() => {
        GetdataOfModule()
    }, [])

    // console.log("this is the uploded file :--", selectedVideoname.name)


    // Upload file and metadata to the object 'images/mountains.jpg'
    let storageRef;
    let uploadTask;




    const handleUpload = () => {
        if (selectedVideoname) {
            // console.log('This is the video name :--', selectedVideoname.name)
            storageRef = ref(storage, 'SubjectModuleVideos/' + selectedVideoname.name);
            uploadTask = uploadBytesResumable(storageRef, selectedVideoname, metadata);

            // Listen for state changes, errors, and completion of the upload.
            // Handle video upload
            // Add your upload logic here
            console.log('Video uploaded!');

            uploadTask.on('state_changed',
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                    console.log('Upload is ' + progress + '% done');
                    // if(progress == 100){
                    //     setUploadProgress(0)
                    // }
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
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;
                        case 'storage/canceled':
                            // User canceled the upload
                            break;

                        // ...

                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            break;
                    }
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        Saveurl(downloadURL)
                    });
                }
            );
        }

    };

    const Saveurl = async (downloadURL) => {
        try {
            const response = await StaffUserServices.UpdateModuleClassroom(M_no, {
                'class_room_staff_id': id____,
                'module_video_url': downloadURL,
                'assignment_url': null
            })

            console.log('this is the response :--', response)
            if (response.status == 200) {
                console.log('The Video is saved successfully!!!!')
                toast.success('Module is Saved  successfully', {
                    duration: 5000,
                    style: {
                        marginTop: '1000px',
                    },
                })
            }

        } catch (error) {

        }
    }


    async function deleteVideo(url, SubjectModuleVideos) {

        const pathArray = url.split("/");
        const filePath = pathArray.slice(3).join("/");

        // Create a reference to the file to delete
        const fileRef = ref(storage, filePath);


        console.log("This is the reference to the file to me :--", fileRef)

        // Check if the file exists
        getDownloadURL(fileRef)
            .then((url) => {
                console.log('File exists:', url);
                deleteObject(fileRef).then(() => {
                    // File deleted successfully
                    console.log('File deleted successfully');
                }).catch((error) => {
                    // Uh-oh, an error occurred!
                    console.error('Error deleting file:', error);
                });
            })
            .catch((error) => {
                if (error.code === 'storage/object-not-found') {
                    console.log('File does not exist');
                    toast.error('The file is not exist in the storage')
                } else {
                    console.error('Error checking file existence:', error);
                }
            });



    }





    const handleEdit = () => {
        // Handle video edit
        // Add your edit logic here
        console.log('Video edited!');
    };

    const handleDelete = () => {
        // Handle video delete
        setSelectedVideo(null);
        if (urlData) {
            deleteVideo(urlData, 'SubjectModuleVideos');
        }
        console.log('Video deleted!');
    };

    useEffect(() => {
        // Set a default video URL when the component mounts
        setSelectedVideo('https://youtu.be/uaQjDvFPwPY?si=tF8_TXEUkuEkvy_i');
    }, []);

    const customStyles = 'border-2 border-blue-500 w-3/4 rounded-md shadow-md';

    return (
        <div>
            <Layout />
            <section className="bg-white p-4 md:p-10  lg:p-16 mt-8 md:mt-12 h-auto md:h-[800px]">
                <div className="flex h-80 w-full">
                    {/* Left Side - Empty Screen */}
                    <div className={customStyles}>
                        <div className="w-full h-full bg-white flex items-center justify-center">
                            <ReactPlayer
                                url={urlData ? urlData : selectedVideo}
                                playing={false}
                                loop={false}
                                controls={true}
                                light={false}
                                volume={1}
                                muted={false}
                                playbackRate={1}
                                width="840px"
                                height="300px"
                                style={{}}
                                progressInterval={1000}
                                playsinline={false}
                                pip={false}
                                stopOnUnmount={true}
                                fallback={null}
                                wrapper="div"
                                playIcon={null}
                                previewTabIndex={0}

                            />
                            {/* <ReactPlayer controls={true} volume={true} playIcon={true} url='https://www.youtube.com/watch?v=LXb3EKWsInQ' /> */}
                        </div>
                    </div>
                    {/* Right Side - Options */}
                    {
                        decoded.user_type && decoded.user_type == 2 &&

                        <div className="w-1/4 bg-white p-4">
                            <div className="flex flex-col space-y-4">
                                {/* File input */}
                                <input
                                    className='bg-gradient-to-r from-indigo-200 to-indigo-700 text-white py-2 px-4 rounded flex items-center justify-center'
                                    type="file"
                                    accept="video/*"
                                    onChange={handleFileChange}
                                />

                                {/* Upload Button */}
                                <button
                                    className='bg-gradient-to-r from-indigo-200 to-indigo-700 text-white py-2 px-4 rounded flex items-center justify-center'
                                    onClick={handleUpload}
                                >
                                    <span className="mr-2 font-bold">Upload</span>
                                    <FaUpload />
                                </button>
                                <div className="relative pt-1">
                                    <div className="flex mb-2 items-center justify-between">
                                        <div>
                                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                                                Upload Progress
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs font-semibold inline-block text-indigo-600">
                                                {uploadProgress.toFixed(2)}%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="w-full bg-gray-200 rounded-full">
                                            <div
                                                className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-xs leading-none py-1 text-center text-white rounded-full"
                                                style={{ width: `${uploadProgress}%` }}
                                            >
                                                {uploadProgress > 0 && uploadProgress < 100 && `${uploadProgress.toFixed(2)}%`}
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                {/* Edit Button */}
                                <button
                                    className="bg-gradient-to-r from-indigo-200 to-indigo-700 text-white py-2 px-4 rounded flex items-center justify-center"
                                    onClick={handleEdit}
                                >
                                    Edit
                                </button>

                                {/* Delete Button */}
                                <button
                                    className="bg-gradient-to-r from-indigo-200 to-indigo-700 text-white py-2 px-4 rounded flex items-center justify-center"
                                    onClick={handleDelete}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </section>
        </div>

    );
};

export default ModulesVideoPlayer;



// {
//     {
//         selectedVideo && (
//             <div>
//                 <h2>Uploaded Video:</h2>
//                 <video controls width="400" height="300">
//                     <source src={selectedVideo} type="video/mp4" />
//                     Your browser does not support the video tag.
//                 </video>
//             </div>
//         )
//     }
// }