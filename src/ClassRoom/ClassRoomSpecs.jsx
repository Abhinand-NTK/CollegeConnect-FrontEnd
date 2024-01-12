
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../Components/Layout/Layout';
import Modal from '../Components/Modal/Modal';
import ClassRoomForm from './ClassRoomForm';
import { AuthContext } from '../context/contex';
import { StaffUserServices } from '../services/authservices';

const ClassRoomSpecs = () => {
    const { id } = useParams();
    const { showForm, setShowForm, setEditForm } = useContext(AuthContext);
    const [classroomData, setClassroomData] = useState(null);

    const fetchClassroom = async (classroomId) => {
        try {
            const response = await StaffUserServices.GetClassRoom(classroomId);
            setClassroomData(response);
        } catch (error) {
            console.error('Error fetching classroom:', error);
        }
    };


    useEffect(() => {
        if (id) {
            fetchClassroom(id);
        }
    }, [id]);

    console.log(classroomData)

    if (classroomData) {

        classroomData.map((data) => {
            console.log("data:-data", data)
            data.students.map((data, index) => (
                console.log(data)
            ))

        })

    }

    return (
        <div>
            <Layout />
            <section className='bg-white p-4 md:p-10 lg:p-16 mt-8 md:mt-12 h-auto md:h-[800px]'>
                <div className='flex justify-center mb-8'>
                    {/* <button className='bg-red-500 text-white px-4 py-2 rounded-md' onClick={openModal}>
            Edit A Classroom
          </button> */}
                </div>

                <div>
                    {/* <Modal isOpen={showForm} onClose={closeModal}>
            <div className='sm:w-[400px] md:w-[700px] h-96 overflow-y-scroll overflow-hidden scrollbar-hide'>
              <ClassRoomForm />
            </div>
          </Modal> */}
                </div>

                <div className='flex gap-4 mt-8'>
                    <div className='w-1/3  p-4 md:p-6 text-center'>
                        <table className="min-w-full border text-center text-sm font-light dark:border-neutral-500">
                            <thead className="border-b bg-indigo-950 text-white font-medium dark:border-neutral-500">
                                <tr className='border-b dark:border-neutral-500'>
                                    <th scope="col" className={`border-r px-6 py-4 dark:border-neutral-500`}>
                                        Teachers
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {classroomData &&
                                    classroomData.map((classItem, index) => (
                                        <td key={index} className={`border-r px-6 py-4 dark:border-neutral-500`}>
                                            {classItem.staffs_data.map((staff, index) => (
                                                <div key={index} className='mt-2'>
                                                    {staff.first_name}
                                                </div>
                                            ))}
                                        </td>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='w-1/3  p-4 md:p-6 text-center'>
                        <table className="min-w-full border text-center text-sm font-light dark:border-neutral-500">
                            <thead className="border-b bg-indigo-950 text-white font-medium dark:border-neutral-500">
                                <tr className='border-b dark:border-neutral-500'>
                                    <th scope="col" className={`border-r px-6 py-4 dark:border-neutral-500`}>
                                        Students
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {classroomData &&
                                    classroomData.map((classItem, index) => (
                                        <td key={index} className={`border-r px-6 py-4 dark:border-neutral-500`}>
                                            {classItem.students.map((staff, index) => (
                                                <div key={index} className='mt-2'>
                                                    {staff.first_name}
                                                </div>
                                            ))}
                                        </td>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='w-1/3  p-4 md:p-6 text-center'>
                        <table className="min-w-full border text-center text-sm font-light dark:border-neutral-500">
                            <thead className="border-b bg-indigo-950 text-white font-medium dark:border-neutral-500">
                                <tr className='border-b dark:border-neutral-500'>
                                    {/* <th>
                                    No
                                    </th> */}
                                    <th scope="col" className={`border-r px-6 py-4 dark:border-neutral-500`}>
                                        Subjects
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {classroomData &&
                                    classroomData.map((classItem, index) => (
                                        <td key={index} className={`border-r px-6 py-4 dark:border-neutral-500`}>
                                            {classItem.subjects.map((staff, index) => (
                                                <tr key={index} className='mt-2'>
                                                    {staff.name}
                                                </tr>
                                            ))}
                                        </td>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>


            </section >
        </div >
    );
};

export default ClassRoomSpecs;
