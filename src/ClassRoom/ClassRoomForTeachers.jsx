import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Layout from '../Components/Layout/Layout';
import Modal from '../Components/Modal/Modal';
import ClassRoomForm from './ClassRoomForm';
import { AuthContext } from '../context/contex';
import { StaffUserServices } from '../services/authservices';



const ClassRoomForTeachers = () => {



    const [classrooms, setClassrooms] = useState([])

    const { showForm, setShowForm, editForm, setEditForm } = useContext(AuthContext)

    const [id, setId] = useState(null)



    const userdetails = async () => {
        try {
            const response = await StaffUserServices.UserDetails()
            console.log(response)
            setId(response?.id)
        } catch (error) {
            console.log(error)
        }
    }

    const fetechclassrooms = async () => {
        try {
            if (id != null) {
                const response = await StaffUserServices.GetClassroomsForTeachers(id)
                console.log(response)
                setClassrooms(response)
            }

        } catch (error) {

        }
    }

    useEffect(() => {
        if (id !== null) {
            fetechclassrooms(id);
        }
        userdetails();

    }, [id])





    useEffect(() => {
        fetechclassrooms(id)
        userdetails()
    }, [])


    return (
        <div>
            <Layout />
            <section className='bg-white p-4 md:p-10 lg:p-16 mt-8 md:mt-12 h-auto md:h-[600px]'>
                {/* <div className='grid ml-20 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8 justify-center items-center'>
                    {classrooms.map((classroom, index) => (
                        <div
                            key={index}
                            className='transform transition-transform hover:scale-105 
                                        flex-shrink-0 flex flex-col font-bold text-lg items-center 
                                        justify-center bg-gradient-to-br from-gray-300 to-gray-200 
                                        bg-opacity-80 text-black h-52 rounded-md shadow-md'
                        >
                            <div className='items-center text-center'>
                                <p className='font-light text-lg mb-2'><span className='font-semibold text-xl'>Class Name:</span> {classroom.class_id?.name}</p>
                                <p className='font-light text-sm mb-2'><span className='font-semibold text-md'>Subject:</span> {classroom?.sub_id?.name}</p>
                                <p className='font-light text-sm mb-2'><span className='font-semibold text-md'>Semester:</span> {classroom?.sub_id?.semester}</p>
                                <p className='font-light text-sm'><span className='font-semibold text-md'>Course:</span> {classroom?.class_id?.course?.coursename}</p>
                            </div>

                            <div className="flex flex-col mt-2 items-center">
                                <NavLink className='text-black-300 hover:underline transition-all duration-300' to={`/users/staffs/classroomspecs/${classroom?.class_id?.id}`} key={index} >Go to Attendance</NavLink>
                                <NavLink className='text-black-300 hover:underline transition-all duration-300' to={`/users/staffs/classroomspecs/${classroom?.class_id?.id}`} key={index} >Go to Modules</NavLink>
                            </div>
                        </div>
                    ))}
                </div> */}
                {/* <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8 justify-center items-center'>
                    {classrooms.map((classroom, index) => (
                        <div
                            key={index}
                            className='transform transition-transform hover:scale-105 
                flex-shrink-0 flex flex-col font-bold text-lg items-center justify-center bg-gray-300 
                bg-opacity-80 text-black h-48 rounded-md shadow-md'
                        >
                            <div className='items-center text-center'>
                                <p className='font-light text-lg mb-2'><span className='font-semibold text-xl'>Class Name:</span> {classroom.class_id?.name}</p>
                                <p className='font-light text-sm mb-2'><span className='font-semibold text-md'>Subject:</span> {classroom?.sub_id?.name}</p>
                                <p className='font-light text-sm mb-2'><span className='font-semibold text-md'>Semester:</span> {classroom?.sub_id?.semester}</p>
                                <p className='font-light text-sm'><span className='font-semibold text-md'>Course:</span> {classroom?.class_id?.course?.coursename}</p>
                            </div>

                            <div className="flex flex-col mt-4 items-center">
                                <NavLink className='text-blue-300 hover:underline transition-all duration-300' to={`/users/staffs/classroomspecs/${classroom?.class_id?.id}`} key={index} >Go to Modules</NavLink>
                                <a href="/attendance" className="text-blue-300 hover:underline mt-2 transition-all duration-300">Go to Attendance</a>
                            </div>
                        </div>
                    ))}
                </div> */}
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8 ml-12
                justify-center items-center'>
                    {classrooms.map((classroom, index) => (
                        <div
                            key={index}
                            className='transform transition-transform hover:scale-105 
                                flex-shrink-0 flex flex-col font-bold text-lg items-center 
                                justify-center bg-gradient-to-br from-blue-600 to-blue-900 
                                bg-opacity-80 text-white h-48 rounded-md shadow-md
                                 '
                        >
                            <div className='items-center text-center'>
                                <p className='font-light text-lg mb-2'><span className='font-semibold text-sm'>Class Name:</span> {classroom.class_id?.name}</p>
                                <p className='font-light text-sm mb-2'><span className='font-semibold text-sm'>Subject:</span> {classroom?.sub_id?.name}</p>
                                <p className='font-light text-sm mb-2'><span className='font-semibold text-sm'>Semester:</span> {classroom?.sub_id?.semester}</p>
                                <p className='font-light text-sm'><span className='font-semibold text-md'>Course:</span> {classroom?.class_id?.course?.coursename}</p>
                            </div>

                            <div className="flex flex-col mt-4 items-center">       
                                <div className="flex justify-between w-full gap-10">
                                    <NavLink className='text-blue-300 hover:underline transition-all duration-300' to={`/users/staff/subjects/modules/${classroom?.id}`} key={index} >Go to Modules</NavLink>
                                    <NavLink className='text-blue-300 hover:underline transition-all duration-300' to={`/users/staffs/attendence/${classroom?.id}`} key={index} >Go to Attendance</NavLink>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </section>

        </div>
    );
};

export default ClassRoomForTeachers;