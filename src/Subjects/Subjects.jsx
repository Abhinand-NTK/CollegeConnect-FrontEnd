import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MdSubject, MdAssignmentAdd } from 'react-icons/md';
import { FaPhotoVideo } from 'react-icons/fa';
import Layout from '../Components/Layout/Layout';
import { StaffUserServices, StudentUserServices } from '../services/authservices';
import DropDown from './DropDown';

const Subjects = () => {

    const [subjects, setSubjects] = useState([]);
    const [classroom, setClassroom] = useState([]);
    const [links, setlinks] = useState([]);

    const GetSubjects = async () => {
        try {
            const response = await StudentUserServices.GetSubjectsStudents();
            setSubjects(response?.data?.subjects);
            setClassroom(response?.data?.classroom);
            console.log("This is the response",response);
        } catch (error) {
            console.log(error);
        }
    };

   

    const GetMedia = async(class_room_staff_id,sub_id)=>{
        // setlinks(null)
        try {
            const response =  await StudentUserServices.GetMedia(class_room_staff_id,sub_id)
            console.log(response)
            setlinks(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        GetSubjects();
    }, []);

    

    return (
        <div>
            <Layout />
            <section className='bg-white-950 p-4 md:p-10 lg:p-16 mt-8 md:mt-18 lg:mt-18 h-auto md:h-[600px]'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {subjects.map((item, index) => (
                       <DropDown key={index} item={item} cls={classroom} index={index} GetMedia={GetMedia} links={links} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Subjects;
