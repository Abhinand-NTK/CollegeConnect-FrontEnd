import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Layout from '../Components/Layout/Layout';
import { StaffUserServices } from '../services/authservices';
import toast from 'react-hot-toast';


const Modules = ({ classroom, index }) => {
    const [showDiv, setShowDiv] = useState(false);
    const { id__ } = useParams()
    const [moduels, setModuels] = useState([])



    console.log("This is the id of this classroom ::---", id__)

    const handleButtonClick = async () => {
        const response = await StaffUserServices.CreateModulesForClassRoom({ class_room_staff_id: id__ })

        console.log('This is the response', response)
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
            console.log(response)
            setModuels(response)
        } catch (error) {

        }
    }

    const DeleteModule = async (item_id) => {
        console.log("The funtion is calling for delete :--")
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

    console.log("This is the data in the back end", moduels)

    useEffect(() => {
        getModules()
    }, [])

    return (
        <div>
            <Layout />
            <section className='bg-white p-4 md:p-10 lg:p-16 mt-8 md:mt-12 h-auto md:h-[500px]'>
                <button
                    onClick={handleButtonClick}
                    className="bg-indigo-950 text-white rounded-md px-4 py-2 transition-all duration-300"
                >
                    Create a module for the class and the subject
                </button>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8 ml-12 justify-center items-center'>
                    {moduels.map((item, index) => (
                        <div
                            key={index}
                            className='relative transform transition-transform hover:scale-105 
                          flex-shrink-0 flex flex-col font-bold text-lg items-center
                          justify-center bg-gradient-to-br from-indigo-700 to-indigo-950 
                          bg-opacity-80 text-white h-48 rounded-md shadow-md'
                        >
                            {/* Delete Button in the Top-Left Corner */}
                            <div className="absolute top-2 left-2">
                                <button
                                    type="button"
                                    className="text-yellow-950"
                                    onClick={() => {
                                        DeleteModule(item.id);
                                    }}
                                >
                                    Delete
                                </button>
                            </div>

                            <div className="flex flex-col mt-4 items-center">
                                <h1>Module :- {index + 1} </h1>
                                <div className="flex justify-between w-full gap-10">
                                    <NavLink
                                        className='text-blue-300 hover:underline transition-all
                              duration-300 text-center'
                                        to={'/users/staff/subjects/modules'}
                                        key={index}
                                    >
                                        Upload Assignment
                                    </NavLink>
                                    <NavLink
                                        className='text-blue-300 hover:underline transition-all 
                              duration-300 text-center'
                                        to={`/users/staff/subjects/modules/videoplayer/${id__}/${item.id}`}
                                        key={index}
                                    >
                                        Upload VideoClass
                                    </NavLink>
                                </div>
                            </div>
                        </div>

                    ))
                    }
                    <div
                        key={index}
                        className='transform transition-transform hover:scale-105 
                        flex-shrink-0 flex flex-col font-bold text-lg items-center
                        justify-center bg-gradient-to-br from-indigo-700 to-indigo-950 
                        bg-opacity-80 text-white h-48 rounded-md shadow-md'
                    >
                        <div className="flex flex-col mt-4 items-center">
                            <h1>Testing </h1>
                            <div className="flex justify-between w-full gap-10">
                                <NavLink className='text-blue-300 hover:underline transition-all
                                 duration-300 text-center' to={'/users/staff/subjects/modules'} key={index} >Upload Assignment</NavLink>
                                <NavLink className='text-blue-300 hover:underline transition-all 
                                duration-300 text-center' to={`/users/staff/subjects/modules/videoplayer`} key={index} >Upload VideoClass</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Modules;
