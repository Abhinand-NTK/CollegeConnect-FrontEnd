
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Layout from '../Components/Layout/Layout';
import { StaffUserServices } from '../services/authservices';
import { FaUser } from "react-icons/fa";
import { MdLibraryBooks } from "react-icons/md";


const ClassRoomSpecs = () => {
    const { id } = useParams();
    const [classroomData, setClassroomData] = useState(null);
    const Navigate = useNavigate()

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
            // staffdetails(id)
        }
    }, [id]);



    const staffdetails = (id) => {
        console.log(id);
        Navigate(`/users/profilecard/${id}`);
    };

    console.log("This is the data that i have?????",classroomData)

    // if (classroomData) {

    //     classroomData.map((data) => {
    //         data.students.map((data, index) => (
    //             console.log(":-data",data)
    //         ))

    //     })

    // }

    return (
        <div>
            <Layout />
            <section className='bg-white p-4 md:p-10 lg:p-16 mt-8 md:mt-12 h-auto md:h-[800px]'>
                <div className='flex flex-wrap'>
                    <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-4 md:p-6 text-center'>
                        <table className="min-w-full border border-solid text-center text-sm font-light ">
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
                                        <td key={index} className={`border border-solid px-6 py-4`}>
                                            {classItem.staffs_data.map((staff, index) => (
                                                <div key={index} className='mt-2 border border-solid border-gray-500 p-2 flex justify-between'>
                                                    <div className='flex items-center'>
                                                        <p className='font-bold'>
                                                            {index + 1},
                                                        </p>
                                                        <p className='font-bold ml-2'>
                                                            {staff.first_name} {staff.last_name}
                                                        </p>
                                                    </div>
                                                    <div className='flex items-center'>
                                                        <button
                                                            onClick={() => staffdetails(staff.id)}
                                                            className="cursor-pointer w-9 h-6 shadow-[0_4px_10px_rgba(0,0,0,0.03)] text-sm font-normal transition-colors rounded-lg
                                                                    bg-white  hover:text-indigo-400"
                                                        >
                                                            <FaUser size="1rem" />
                                                        </button>
                                                    </div>
                                                </div>

                                            ))}
                                        </td>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-4 md:p-6 text-center'>
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
                                                <div key={index} className='mt-2 flex justify-between items-center border border-solid border-gray-500 p-2'>
                                                    <p className='font-bold'>
                                                        {index + 1},
                                                    </p>
                                                    <p className='font-bold'>
                                                        {staff.first_name} {staff.last_name}
                                                    </p>
                                                    <div className='ml-2 flex items-center'>
                                                        <button
                                                            onClick={() => staffdetails(staff.id)}
                                                            className="cursor-pointer w-9 h-6 shadow-[0_4px_10px_rgba(0,0,0,0.03)] text-sm font-normal transition-colors rounded-lg
                                                                    bg-white  hover:text-indigo-400"
                                                        >
                                                            <FaUser size="1rem" />
                                                        </button>
                                                        {/* <Link
                                                            to={`/user/`}
                                                            className="cursor-pointer w-9 h-4 shadow-[0_4px_10px_rgba(0,0,0,0.03)] text-sm font-normal transition-colors rounded-lg
                                                            bg-white  hover:text-indigo-400"
                                                        >
                                                            <FaUser size="1rem" />
                                                        </Link> */}
                                                    </div>
                                                </div>

                                            ))}
                                        </td>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/ p-4 md:p-6 text-center'>
                        <table className="min-w-full border text-center text-sm font-light dark:border-neutral-500">
                            <thead className="border-b bg-indigo-950 text-white font-medium dark:border-neutral-500">
                                <tr className='border-b dark:border-neutral-500'>

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
                                                <div key={index} className='mt-2 flex justify-between items-center border border-solid border-gray-500 p-2'>
                                                    <p className='font-bold'>
                                                        {index + 1},
                                                    </p>
                                                    <p className='font-bold'>
                                                        {staff.name}
                                                    </p>
                                                    <div className='ml-2 flex items-center'>
                                                        <Link
                                                            to={`/user/`}
                                                            className="cursor-pointer w-9 h-4 shadow-[0_4px_10px_rgba(0,0,0,0.03)] text-sm font-normal transition-colors rounded-lg
                                                        bg-white  hover:text-indigo-400"
                                                        >
                                                            <MdLibraryBooks />
                                                        </Link>
                                                    </div>
                                                </div>
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
