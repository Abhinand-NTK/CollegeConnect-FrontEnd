import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MdSubject, MdAssignmentAdd } from 'react-icons/md';
import { FaPhotoVideo } from 'react-icons/fa';
import CanvasJSReact from '@canvasjs/react-charts';
import { StudentUserServices } from '../services/authservices';
import Layout from '../Components/Layout/Layout';
import { GoFileSubmodule } from "react-icons/go";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;



const DropDown = ({ item, index }) => {

    const chartOptions = {
        width: (4.5 / 2.54) * 96,
        height: (1.2) * 96,
        animationEnabled: true,
        title: {
            text: "Attendence",
            fontSize: 12,
        },
        subtitles: [
            {
                // text: "71% Percentage",
                verticalAlign: "center",
                fontSize: 10,
                dockInsidePlotArea: true,
            },
        ],
        legend: {
            verticalAlign: "bottom",
            horizontalAlign: "center",
            fontFamily: "Arial",
            fontSize: 10,
            fontWeight: "bold",
            // itemTextFormatter: function (e) {
            //     return e.dataPoint.name + ": " + e.dataPoint.y + "%";
            // },
        },
        backgroundColor: "#E5E7EB",
        data: [
            {
                type: "doughnut",
                showInLegend: true,
                indexLabel: "{name}: {y}%",
                yValueFormatString: "#,###'%'",
                indexLabelFontFamily: "Arial",
                indexLabelFontSize: 8,
                indexLabelFontWeight: "bold",
                indexLabelFontColor: "black",
                indexLabelLineColor: "white",
                // indexLabelPlacement: "outside",
                dataPoints: [
                    { name: "Critical", y: 10 },
                    { name: "Withheld", y: 30 },
                    { name: "Eligable", y: 60 },
                ],
            },
        ],
        theme: "light1",
    };
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isDropdownOpen2, setDropdownOpen2] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    }
    const toggleDropdown2 = () => {
        setDropdownOpen2(!isDropdownOpen2);
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
                        <div onClick={toggleDropdown2}>
                            <FaPhotoVideo />
                        </div>
                    </div>
                </div>
                <div className='mt-1 w-1/2 items-center'>
                    <CanvasJSChart options={chartOptions} />
                </div>

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
                        <li className='py-2'>
                            <span className='flex items-center justify-center'>
                                video 1
                                <GoFileSubmodule className='ml-2' />
                            </span>
                        </li><li className='py-2'>
                            <span className='flex items-center justify-center'>
                                Video 2
                                <GoFileSubmodule className='ml-2' />
                            </span>
                        </li><li className='py-2'>
                            <span className='flex items-center justify-center'>
                                Video 3
                                <GoFileSubmodule className='ml-2' />
                            </span>
                        </li><li className='py-2'>
                            <span className='flex items-center justify-center'>
                                Video 4
                                <GoFileSubmodule className='ml-2' />
                            </span>
                        </li>
                        <li className='py-2'>
                            <span className='flex items-center justify-center'>
                                Video 5
                                <GoFileSubmodule className='ml-2' />
                            </span>
                        </li>
                    </ul>

                </div>

                )
                }
            </div>




        </NavLink >
    )
}

export default DropDown
