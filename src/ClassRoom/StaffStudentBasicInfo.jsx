

import React, { useEffect, useState } from 'react';
import Layout from '../Components/Layout/Layout';
import { StaffUserServices } from '../services/authservices';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const StaffStudentBasicInfo = () => {
    const [userDetails, setUserDetails] = useState({});
    const [sub_ids, setSub_ids] = useState([]);
    const [classrooms, setClassrooms] = useState([]);
    const [classrooms1, setClassrooms1] = useState([[]]);
    const [classroomsList, setClassroomsList] = useState([[]]);
    const { id } = useParams();
    const [currentId, setCurrentId] = useState(id);
    const [formData, setFormData] = useState({
        class_id: '',
        staff_id: '',
        sub_id: '',
    });
    const error = useSelector(state => state.error);

    // Fetch user details
    const getUserDetails = async () => {
        try {
            const response = await StaffUserServices.getTeacherDetails(id);
            const id_s = response?.subject?.map(sub => sub.id) || [];
            setSub_ids(id_s);
            setUserDetails(response);
        } catch (error) {
            console.log(error);
        }
    };

    // Get classrooms for the teacher
    const getClassRoomsForTeacher = async (sub_ids) => {
        try {
            const res = await StaffUserServices.GetAssignedTeachers(sub_ids);
            setClassroomsList(res);
        } catch (error) {
            console.log(error);
        }
    };

    // Assign a teacher to a classroom
    const assignTeacherToClassRoom = async (data, id) => {
        try {
            const response = await StaffUserServices.AssignTeacherToClassRoom(data, id);
            if (response.status === 201) {
                toast.success('Staff is assigned for the class successfully', {
                    duration: 5000,
                    style: {
                        marginTop: '100px',
                    },
                });
            }
            if (response.response.status === 400) {
                toast.error(response.response.data.error[0], {
                    duration: 10000,
                    style: {
                        marginTop: '100px',
                    },
                });
            }
        } catch (error) {
            console.log("This is the error", error);
        }
    };

    // Delete assigned classroom for a teacher
    const deleteClassForTeacher = async (data) => {
        try {
            const response = StaffUserServices.DeleleAssignedClassroomForTeacher(data);
        } catch (error) {
            console.log(error);
        }
    };

    // Fetch classrooms and related data
    const fetchData = async (sub_ids) => {
        try {
            if (sub_ids.length !== 0) {
                const response = await StaffUserServices.GetClassRoomsForTeacher(sub_ids, id);
                setClassrooms(response.data1);
                setClassrooms1(response.data2);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUserDetails();
    }, []);

    useEffect(() => {
        fetchData(sub_ids);
        getClassRoomsForTeacher(sub_ids);
    }, [sub_ids]);

    return (
        <Layout>
            <div class="container mx-auto mt-12">
                <div class="bg-indigo-950 p-8">
                    <div class="p-4 md:p-8 bg-white shadow mt-8 md:mt-24">
                        <div class="grid grid-cols-1 md:grid-cols-3">
                            <div class="relative">
                                <div class="w-full h-40 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                                    <img class="h-24 w-24" src={`data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" /></svg>')}`} alt="Default Image" />
                                </div>
                            </div>
                        </div>
                        <div class="md:ml-8 md:mt-8">
                            <div class="mt-8 md:mt-20 w-full mx-auto lg:mt-28">
                                <h1 class="text-2xl md:text-4xl font-medium text-gray-700">
                                    {userDetails?.data1?.staff_details?.first_name} {userDetails?.staff_details?.last_name}
                                    <span class="font-light text-gray-500">{userDetails?.staff_details?.age}</span>
                                </h1>
                            </div>
                            <div class="sm:mt-0 mt-4 border-b pb-6 md:pb-12 flex flex-wrap">
                                <div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 md:mb-0">
                                    <p class="mt-2 text-gray-500">Phone No: {userDetails?.staff_details?.phone_number}</p>
                                    <p class="mt-2 text-gray-500">
                                        Email to:{' '}
                                        <a class="font-bold" href={`mailto:${userDetails?.staff_details?.email}`}>
                                            {userDetails?.staff_details?.email}
                                        </a>
                                    </p>
                                </div>
                                <div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 md:mb-0">
                                    <div class="ml-0 md:ml-4">
                                        <p class="font-bold mb-2">Assigned Subjects</p>
                                        <div class="flex items-start ml-4 md:ml-0">
                                            <ul>
                                                {userDetails?.subject?.map((sub, index) => (
                                                    <li key={index}>{sub.name}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="w-full mt-4 overflow-x-auto">
                                    <table class="w-full">
                                        <thead>
                                            <tr>
                                                <th class="p-2 text-white bg-indigo-950">Available Classrooms</th>
                                                <th class="p-2 text-white bg-indigo-950">Subjects in the classroom</th>
                                                <th class="p-2 text-white bg-indigo-950">Semester</th>
                                                <th class="p-2 text-white bg-indigo-950">Assigned Classrooms</th>
                                                <th class="p-2 text-white bg-indigo-950">Delete Assigned Classrooms</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {classrooms &&
                                                classrooms.map((classItem, index) => (
                                                    <tr class="text-center" key={index}>
                                                        <td class="border p-4 whitespace-nowrap">
                                                            {classItem.name} :- {classItem?.course?.coursename}
                                                        </td>
                                                        <td class="border pl-2 md:pl-12 whitespace-nowrap">
                                                            {classrooms1[classItem.name]?.Subjects.map((item, subIndex) => (
                                                                <tr key={subIndex} class="text-center border">
                                                                    <td class="border p-2 md:p-6 text-center">{item.name}</td>
                                                                </tr>
                                                            ))}
                                                        </td>
                                                        <td class="border p-4 md:p-2 whitespace-nowrap">
                                                            {classrooms1[classItem.name]?.Subjects.map((item, subIndex) => (
                                                                <tr key={subIndex} class="text-center border">
                                                                    <td class="border p-2 md:p-6 text-center">{item.semseter}</td>
                                                                </tr>
                                                            ))}
                                                        </td>
                                                        <td class="border pl-2 md:pl-12 whitespace-nowrap">
                                                            {classrooms1[classItem.name]?.Subjects.map((item, subIndex) => (
                                                                <tr key={subIndex} class="text-center border ">
                                                                    <td className='border p-2 md:p-6 text-center'>
                                                                        <button
                                                                            onClick={() => {
                                                                                assignTeacherToClassRoom({
                                                                                    class_id: classItem.id,
                                                                                    staff_id: item.staff,
                                                                                    sub_id: item.id,
                                                                                }, currentId);
                                                                            }}
                                                                            class="bg-green-500 text-white px-2 md:px-4 py-1 md:py-2 mb-2 md:mb-0 rounded-md sm:px-3 sm:py-1">
                                                                            Assign
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </td>
                                                        <td class="border p-4 whitespace-nowrap">
                                                            {classrooms1[classItem.name]?.Subjects.map((item, subIndex) => (
                                                                <tr key={subIndex} class="text-center">
                                                                    <td class="p-2 md:p-6 text-center">
                                                                        {classroomsList &&
                                                                            classroomsList[item.name] &&
                                                                            classroomsList[item.name][classItem.name] !== undefined ? (
                                                                            <button
                                                                                onClick={() => {
                                                                                    setFormData({
                                                                                        class_id: classItem.id,
                                                                                        staff_id: item.staff,
                                                                                        sub_id: item.id,
                                                                                    });
                                                                                    deleteClassForTeacher(
                                                                                        classroomsList[item.name][classItem.name]
                                                                                    );
                                                                                }}
                                                                                class="bg-red-500 text-white px-2 md:px-4 py-1 md:py-2 mb-2 md:mb-0 rounded-md">
                                                                                Revoke
                                                                            </button>
                                                                        ) : (
                                                                            "Not Assigned Yet"
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="mt-4 md:mt-12 flex flex-col justify-center">
                                <p class="text-gray-600 text-center font-light lg:px-4 md:px-16">
                                    An artist of considerable range, Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes,
                                    performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure. An artist of
                                    considerable range.
                                </p>
                                <button class="text-indigo-500 py-2 px-4 font-medium mt-4">Show more</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    );
};

export default StaffStudentBasicInfo;
