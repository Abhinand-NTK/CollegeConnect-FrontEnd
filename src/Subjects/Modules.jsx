import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Layout from '../Components/Layout/Layout';
import { StaffUserServices } from '../services/authservices';
import toast from 'react-hot-toast';
import { FcDeleteColumn } from "react-icons/fc";
import { FcVideoFile } from "react-icons/fc";
import { MdAssignmentAdd } from "react-icons/md";

const Modules = ({ classroom, index }) => {
    const [showDiv, setShowDiv] = useState(false);
    const { id__ } = useParams()
    const [moduels, setModuels] = useState([])
    const handleButtonClick = async () => {
        const response = await StaffUserServices.CreateModulesForClassRoom({ class_room_staff_id: id__ })

        if (response.status == 201) {
            toast.success('Moduels is creted', {
                duration: 5000,
                style: {
                    marginTop: '100px',
                },
            });
            getModules()
        }
    };

    const getModules = async () => {
        try {
            const response = await StaffUserServices.GetTheModulesofclassroom(id__)
            setModuels(response)
        } catch (error) {

        }
    }

    const DeleteModule = async (item_id) => {
        try {
            const response = await StaffUserServices.DeleteModule(item_id)
            if (response.status == 204) {
                toast.success('Module is deleted successfully', {
                    duration: 5000,
                    style: {
                        marginTop: '1000px',
                    },
                })
                getModules()
            }
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getModules()
    }, [])

    return (
        <div>
            <Layout />
            <section className='bg-white p-4 md:p-10 lg:p-16 mt-8 md:mt-12 h-auto md:h-[500px]'>
                <button
                    onClick={handleButtonClick}
                    className="bg-indigo-600 text-white rounded-md px-4 py-2 transition-all duration-300"
                >
                    Create a module for the class and the subject
                </button>
                <div className='grid grid-cols-1  gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8 ml-12 justify-center items-center'>
                    {moduels.map((item, index) => (
                        <div>
                            <div
                                key={index}
                                className='
                            relative 
                          flex-shrink-0 flex flex-col font-bold text-lg items-center
                          justify-center bg-gray-200 
                          bg-opacity-80 text-white h-28 '
                            >
                                {/* Delete Button in the Top-Left Corner */}
                                <div className="absolute w-7 top-2 left-2">
                                    <button
                                        type="button"
                                        className="text-yellow-950"
                                        onClick={() => {
                                            DeleteModule(item.id);
                                        }}
                                    >
                                        <FcDeleteColumn />
                                    </button>
                                </div>

                                <div className="flex flex-col mt-4 items-center">
                                    <h1 className='text-black font-semibold'>Module :- {index + 1} </h1>

                                </div>
                            </div>
                            <div className="flex justify-between w-full">
                                <NavLink
                                    className='text-black text-sm bg-red-500  font-semibold w-1/2 hover:underline transition-all
                              duration-300 text-center flex justify-center items-center'
                                    to={'/users/staff/subjects/modules'}
                                    key={index}
                                >
                                    <MdAssignmentAdd />
                                    {/* Upload Assignment */}
                                </NavLink>
                                <NavLink
                                    className='text-black bg-gray-400 h-12 flex items-center justify-center text-sm font-semibold w-1/2 hover:underline transition-all 
                              duration-300 text-center'
                                    to={`/users/staff/subjects/modules/videoplayer/${id__}/${item.id}`}
                                    key={index}
                                >
                                    <FcVideoFile />
                                    {/* Upload VideoClass */}
                                </NavLink>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </section>
        </div>
    );
};

export default Modules;
