import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Layout from '../Components/Layout/Layout';


const Modules = ({ classroom, index }) => {
    const [showDiv, setShowDiv] = useState(false);

    const handleButtonClick = () => {
        setShowDiv(true);
    };

    return (
        <div>
            <Layout />
            <section className='bg-white p-4 md:p-10 lg:p-16 mt-8 md:mt-12 h-auto md:h-[600px]'>
                <button
                    onClick={handleButtonClick}
                    className="bg-indigo-950 text-white rounded-md px-4 py-2 transition-all duration-300"
                >
                    Create a module for the class and the subject
                </button>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8 ml-12 justify-center items-center'>
                    <div
                        key={index}
                        className='transform transition-transform hover:scale-105 
                        flex-shrink-0 flex flex-col font-bold text-lg items-center
                        justify-center bg-gradient-to-br from-indigo-700 to-indigo-950 
                        bg-opacity-80 text-white h-48 rounded-md shadow-md'
                    >
                        <div className="flex flex-col mt-4 items-center">
                            <div className="flex justify-between w-full gap-10">
                                <NavLink className='text-blue-300 hover:underline transition-all duration-300 text-center' to={'/users/staff/subjects/modules'} key={index} >Upload Assignment</NavLink>
                                <NavLink className='text-blue-300 hover:underline transition-all duration-300 text-center' to={`/users/staffs/classroomspecs/${classroom?.class_id?.id}`} key={index} >Upload VideoClass</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Modules;
