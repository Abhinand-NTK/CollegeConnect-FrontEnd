import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MdSubject, MdAssignmentAdd } from 'react-icons/md';
import { FaPhotoVideo } from 'react-icons/fa';
import Layout from '../Components/Layout/Layout';
// import CanvasJSReact from '@canvasjs/react-charts';
import { StudentUserServices } from '../services/authservices';
import DropDown from './DropDown';



// const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Subjects = () => {
    const [subjects, setSubjects] = useState([]);

    const GetSubjects = async () => {
        try {
            const response = await StudentUserServices.GetSubjectsStudents();
            setSubjects(response?.data?.subjects);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        GetSubjects();
    }, []);

    

    return (
        <div>
            <Layout />
            <section className='bg-white-950 p-4 md:p-10 lg:p-16 mt-8 md:mt-18 lg:mt-18 h-auto md:h-[600px]'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {subjects.map((item, index) => (
                       <DropDown item={item} index={index}/>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Subjects;
