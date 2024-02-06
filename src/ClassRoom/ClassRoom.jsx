import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Layout from '../Components/Layout/Layout';
import Modal from '../Components/Modal/Modal';
import ClassRoomForm from './ClassRoomForm';
import { AuthContext } from '../context/contex';
import { StaffUserServices } from '../services/authservices';
import { FcDeleteDatabase } from "react-icons/fc";
import toast from 'react-hot-toast';

const ClassRoom = () => {

    const { showForm, setShowForm, editForm, setEditForm, setClassrooms, classrooms } = useContext(AuthContext)

    const openModal = () => {
        setShowForm(true);
        setEditForm(true);
    }

    const closeModal = () => {
        setShowForm(false);
        setEditForm(false);
        setValue("");
    }

    const fetechclassrooms = async () => {
        try {
            const response = await StaffUserServices.GetClassRooms()
            setClassrooms(response)
        } catch (error) {

        }
    }
    const deletelclass = async (id) => {
        try {
            const response = await StaffUserServices.deleteClass(id)
            if (response?.status == 204) {
                toast.success("Deleted Sucessfully")
                const updatedClassrooms = classrooms.filter(item => item.id !== id);
                console.log(updatedClassrooms);
                setClassrooms(updatedClassrooms)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetechclassrooms()
    }, [])

    return (
        <div>
            <Layout />
            <section className='bg-white-950 p-4 md:p-10 lg:p-16 mt-8 md:mt-12 h-auto md:h-[600px]'>
                <div className='flex justify-center mb-8'>
                    <button className='bg-green-500 text-white px-4 py-2 rounded-md' onClick={openModal}>
                        Add A Classroom
                    </button>
                </div>
                <div>
                    <Modal isOpen={showForm} onClose={closeModal}>
                        <div className='sm:w-[400px] md:w-[700px] h-96 overflow-y-scroll overflow-hidden scrollbar-hide'>
                            <ClassRoomForm classroomss={fetechclassrooms} />
                        </div>
                    </Modal>
                </div>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8'>
                    {
                        classrooms.map((classroom, index) => {
                            return (
                                <div key={index}>
                                    <NavLink to={`/users/staff/classroomspecs/${classroom.id}`}>
                                        <div className=' transform transition-transform hover:scale-105 
                                            flex-shrink-0 flex flex-col font-bold text-lg items-center justify-center bg-gray-200 
                                            bg-opacity-70 text-black h-32'>
                                            <div className='items-center text-center flex-col justify-center'>
                                                <p className='font-semibold'>{classroom.name}</p>
                                                <p className='text-sm'>{classroom.departments.map((dep) => (dep.coursename))}</p>
                                            </div>
                                        </div>
                                    </NavLink>
                                    <div
                                        onClick={() => { deletelclass(classroom.id) }}
                                        style={{ cursor: 'pointer' }}
                                        className='flex justify-center items-center h-7 bg-red-500'>
                                        <FcDeleteDatabase />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
        </div>
    );
};

export default ClassRoom;
