
import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import { StaffUserServices } from '../../services/authservices';
import { ImProfile } from "react-icons/im";
import toast from 'react-hot-toast';
import { defaultProPic } from '../../assets/ProfilePicDefault/Propic';


const UserProfileCard = () => {

    const [userDetails, setUserDetails] = useState({})
    const [studentUserDetails, setStudentUserDetails] = useState({})
    const [image, setImage] = useState(null);
    const [sendImage, setsendImage] = useState(null);





    const userdetails = async () => {
        try {
            const response = await StaffUserServices.UserDetails()
            console.log(response)
            if (response?.staff) {
                setUserDetails(response?.staff)
                setImage(response?.staff?.user_image)
            }
            else {
                response.student.user_image = `http://127.0.0.1:8000${response.student.user_image}`;
                setStudentUserDetails(response?.student)
                setImage(response?.student?.user_image)
            }
            console.log(response?.staff?.user_image)
            console.log("The response for get furntion:----", response)
        } catch (error) {
            console.log(error)
        }
    }

    console.log("This is the image url for the respected image", image)
    useEffect(() => {
        userdetails()
    }, [])

    const handleImageChange = async (e) => {
        const file = e.target.files[0];

        // You can use the 'file' variable to upload the image to your server or storage.
        // For simplicity, let's just set it in the state.
        // setImage(URL.createObjectURL(c(file));
        setImage(URL.createObjectURL(file));
        setsendImage(file);


        // Optionally, you can also preview the selected image.
        // This step is not required for uploading.
        const reader = new FileReader();
        reader.onload = () => {
            const previewUrl = reader.result;
            console.log('Preview URL:', previewUrl);
        };
        reader.readAsDataURL(file);
        let formData
        upload_image(formData)

    }



    const upload_image = async (formData) => {
        if (sendImage) {
            // Create a FormData object and append the image file
            console.log("This is the image i have:---", image)
            formData = new FormData();
            formData.append('image', sendImage);
        };
        if (formData) {
            try {
                const response = await StaffUserServices.EditUserDetails(formData)
                console.log(response)
                if (response.status == 200) {
                    toast.success("Profile Picture updated Sucessfully")
                    userdetails()
                }
            } catch (error) {
                console.log(error)
            }
        }

    }

    const handleImageTouch = () => {
        // Trigger the file input when the image is touched
        document.getElementById('fileInput').click();
    };

    console.log('CollegeName',userDetails)



    return (
        <Layout>
            <div className="bg-indigo-950 p-8 md:p-28">
                <div className="p-4 md:p-8 bg-white shadow mt-44 md:mt-24">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        <div className="grid grid-cols-3 text-center order-last md:order-first mt-6 md:mt-0">
                            <div>
                                <p className="font-bold text-gray-700 text-xl">22</p>
                                <p className="text-gray-400">Friends</p>
                            </div>
                            <div>
                                <p className="font-bold text-gray-700 text-xl">10</p>
                                <p className="text-gray-400">Photos</p>
                            </div>
                            <div>
                                <p className="font-bold text-gray-700 text-xl">89</p>
                                <p className="text-gray-400">Comments</p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500 overflow-hidden">
                                <img
                                    className="h-50 w-50 cursor-pointer rounded-full"
                                    src={image ? image : defaultProPic}
                                    alt="Preview"
                                    onClick={handleImageTouch}
                                    style={{ objectFit: 'cover' }}
                                />

                                {/* Hidden file input */}
                                <input
                                    type="file"
                                    id="fileInput"
                                    style={{ display: 'none' }}
                                    onChange={handleImageChange}
                                />
                            </div>

                        </div>
                        <div className="space-x-8 flex justify-between mt-28 md:mt-0 md:justify-center">
                            <button className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                                Edit Email
                            </button>
                            <button className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                                Message
                            </button>
                        </div>
                    </div>
                    <div className='ml-20'>
                        <div className="mt-6  md:mt-20">
                            <h1 className="text-2xl md:text-4xl font-medium text-gray-700">
                                {
                                    Object.values(studentUserDetails).some(value => value) ? (
                                        <div>
                                            {studentUserDetails.first_name} {studentUserDetails.last_name} <span className="font-light text-gray-500">{studentUserDetails.age}</span>
                                        </div>
                                    ) : (
                                        userDetails ? (
                                            <div>
                                                {userDetails.first_name} {userDetails.last_name}, <span className="font-light text-gray-500">{userDetails.age}</span>
                                            </div>
                                        ) : null
                                    )
                                }
                            </h1>{
                                Object.values(studentUserDetails).some(value => value) ? (
                                    <div>
                                        <p className="text-gray-500">Student - {studentUserDetails?.collge_id?.collegename}</p>
                                        <p className="font-semibold text-gray-600">Kerala, India</p>
                                    </div>
                                ) : (
                                    userDetails ? (
                                        <div>
                                            <p className="text-gray-500">Staff - {userDetails?.collge_id?.collegename}</p>
                                            <p className="font-semibold text-gray-600">Kerala, India</p>
                                        </div>
                                    ) : null
                                )
                            }

                            {/* <p className="mt-2 text-gray-500">APJ Abdul Kalam Technological University (KTU)</p> */}
                        </div>
                        <div className="sm:mt-0 mt-2 border-b pb-6 md:pb-12">
                            {
                                Object.values(studentUserDetails).some(value => value) ? (
                                    <div>
                                        <p className="mt-2 text-gray-500">Phone No: {studentUserDetails.phone_number}</p>
                                        <p className="mt-2 text-gray-500">Email: {studentUserDetails.email}</p>
                                    </div>
                                ) : (
                                    userDetails ? (
                                        <div>
                                            <p className="mt-2 text-gray-500">Phone No: {userDetails.phone_number}</p>
                                            <p className="mt-2 text-gray-500">Email: {userDetails.email}</p>
                                        </div>
                                    ) : (
                                        <p className="mt-2 text-gray-500">User details not available</p>
                                    )
                                )
                            }


                            {/* <h1 className="text-2xl md:text-4xl font-medium text-gray-700">
                                Personal Info<span className="font-light text-gray-500"></span>
                            </h1> */}
                            {/* <p className=" text-gray-500 mt-2 md:mt-3">Department :- Mechanical</p> */}
                            {/* <p className="mt-2 text-gray-500">Acadamic Year - 2019 :- 2022</p>
                            <p className="mt-2 text-gray-500">Register No :- 201987</p>
                            <p className="mt-2 text-gray-500">Date of birth :- 19/10/1997</p> */}
                            {/* <p className="mt-2 text-gray-500">Address :- Kunchipuriyil (ho)</p>
                            <p className="mt-2 text-gray-500">Po :- Champad</p>
                            <p className="mt-2 text-gray-500">Pin :- 670694</p> */}
                        </div>
                    </div>

                    <div className="mt-4 md:mt-12 flex flex-col justify-center">
                        <p className="text-gray-600 text-center font-light lg:px-4 md:px-16">
                            An artist of considerable range, Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes,
                            performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure. An artist of
                            considerable range.
                        </p>
                        <button className="text-indigo-500 py-2 px-4 font-medium mt-4">Show more</button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default UserProfileCard;

