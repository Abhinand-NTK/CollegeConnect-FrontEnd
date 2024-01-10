import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Layout from '../Components/Layout/Layout';
import Modal from '../Components/Modal/Modal';
import ClassRoomForm from './ClassRoomForm';
import { AuthContext } from '../context/contex';



const ClassRoom = () => {
    // const [showForm, setShowForm] = useState(false);
    // const [editForm, setEditForm] = useState(false);
    // const [value, setValue] = useState("");

    const {showForm,setShowForm,editForm,setEditForm} = useContext(AuthContext)

    const openModal = () => {
        setShowForm(true);
        setEditForm(true);
    }

    const closeModal = () => {
        setShowForm(false);
        setEditForm(false);
        setValue("");
    }

    return (
        <div>
            <Layout />
            <section className='bg-indigo-950 p-4 md:p-10 lg:p-16 mt-8 md:mt-12 h-auto md:h-[800px]'>
                <div className='flex justify-center mb-8'>
                    <button className='bg-green-500 text-white px-4 py-2 rounded-md' onClick={openModal}>
                        Add A Classroom
                    </button>
                </div>
                <div>
                    <Modal isOpen={showForm} onClose={closeModal}>
                        <div className='sm:w-[400px] md:w-[700px] h-96 overflow-y-scroll overflow-hidden scrollbar-hide'>
                            <ClassRoomForm />
                        </div>
                    </Modal>
                </div>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8'>
                    <NavLink to='/your-classroom-path'>
                        <div className=' flex-col transform transition-transform hover:scale-105 flex-shrink-0 flex font-bold text-lg items-center justify-center bg-white p-4 md:p-6 h-32 rounded-xl'>
                            <div className='items-center text-center'>
                                <p className='font-semibold'>Mechanical Engineering</p>
                                <p className='text-sm'>Semester - 2</p>
                            </div>
                        </div>
                    </NavLink>
                    {/* Add more grid items for additional classrooms if needed */}
                </div>
            </section>
        </div>
    );
};

export default ClassRoom;
