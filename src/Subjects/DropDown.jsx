import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MdSubject, MdAssignmentAdd } from 'react-icons/md';
import { FaPhotoVideo } from 'react-icons/fa';
// import CanvasJSReact from '@canvasjs/react-charts';
import { StudentUserServices } from '../services/authservices';
import Layout from '../Components/Layout/Layout';
import { GoFileSubmodule } from "react-icons/go";
// const CanvasJSChart = CanvasJSReact.CanvasJSChart;







const DropDown = ({ item, index, GetMedia, cls, links }) => {

    // const chartOptions = {
    //     width: (4.5 / 2.54) * 96,
    //     height: (1.2) * 96,
    //     animationEnabled: true,
    //     title: {
    //         text: "Attendence",
    //         fontSize: 12,
    //     },
    //     subtitles: [
    //         {
    //             verticalAlign: "center",
    //             fontSize: 10,
    //             dockInsidePlotArea: true,
    //         },
    //     ],
    //     legend: {
    //         verticalAlign: "bottom",
    //         horizontalAlign: "center",
    //         fontFamily: "Arial",
    //         fontSize: 10,
    //         fontWeight: "bold",
    //     },
    //     backgroundColor: "#E5E7EB",
    //     data: [
    //         {
    //             type: "doughnut",
    //             showInLegend: true,
    //             indexLabel: "{name}: {y}%",
    //             yValueFormatString: "#,###'%'",
    //             indexLabelFontFamily: "Arial",
    //             indexLabelFontSize: 8,
    //             indexLabelFontWeight: "bold",
    //             indexLabelFontColor: "black",
    //             indexLabelLineColor: "white",
    //             dataPoints: [
    //                 { name: "Critical", y: 10 },
    //                 { name: "Withheld", y: 30 },
    //                 { name: "Eligable", y: 60 },
    //             ],
    //         },
    //     ],
    //     theme: "light1",
    // };
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isDropdownOpen2, setDropdownOpen2] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    }
    const toggleDropdown2 = (sub_id, cls_id) => {
        setDropdownOpen2(!isDropdownOpen2);
        GetMedia(cls_id, sub_id)
        console.log(sub_id, cls_id)

    }

    return (
        <NavLink key={index} to=''>
            <div className=' bg-gray-200 flex'>
                <div className='transform transition-transform hover:scale-100  
                                flex-shrink-0 flex flex-col w-1/2 font-bold text-lg items-center justify-center
                                 bg-gray-200 
                                bg-opacity-70 text-black h-50 p-1'>
                    <div className="h-5 ">
                        <MdSubject />
                    </div>
                    <div className="my-2 text-center text-lg">
                        {item.name}
                    </div>
                    <div className="flex space-x-10">
                        <div onClick={toggleDropdown}>
                            <MdAssignmentAdd />
                        </div>
                        <div onClick={() => toggleDropdown2(item.id, cls.id)}>
                            <FaPhotoVideo />
                        </div>
                    </div>
                </div>
                {/* <div className='mt-1 w-1/2 items-center'>
                    <CanvasJSChart options={chartOptions} />
                </div> */}

            </div>
            <div>

                {isDropdownOpen && (
                    <div className='w-1/2'>
                        <ul className='text-sm bg-black text-white font-bold opacity-30 mx-auto mt-2 text-center'>
                            <li className='py-2'>
                                <span className='flex items-center justify-center'>
                                    Assignment 1
                                    <GoFileSubmodule className='ml-2' />
                                </span>
                            </li><li className='py-2'>
                                <span className='flex items-center justify-center'>
                                    Assignment 2
                                    <GoFileSubmodule className='ml-2' />
                                </span>
                            </li><li className='py-2'>
                                <span className='flex items-center justify-center'>
                                    Assignment 3
                                    <GoFileSubmodule className='ml-2' />
                                </span>
                            </li><li className='py-2'>
                                <span className='flex items-center justify-center'>
                                    Assignment 4
                                    <GoFileSubmodule className='ml-2' />
                                </span>
                            </li>
                            <li className='py-2'>
                                <span className='flex items-center justify-center'>
                                    Assignment 5
                                    <GoFileSubmodule className='ml-2' />
                                </span>
                            </li>
                        </ul>

                    </div>
                )}
                {isDropdownOpen2 && (<div className='w-1/2'>
                    <ul className='text-sm bg-black text-white font-bold opacity-30 mx-auto mt-2 text-center'>
                        {links && links.map((item, index) => (
                            <li key={index} className='py-2'>
                                <Link to={`/users/staff/subjects/modules/videoplayer/${item.class_room_staff_id}/${item.id}`} className='flex items-center justify-center'>
                                    video {index + 1}
                                    <GoFileSubmodule className='ml-2' />
                                </Link>
                            </li>
                        ))}

                    </ul>

                </div>

                )
                }
            </div>




        </NavLink >
    )
}

export default DropDown
