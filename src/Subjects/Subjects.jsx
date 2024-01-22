import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { Menu } from '@material-tailwind/react'
import { GiBookshelf, GiTeacher } from "react-icons/gi";
import { PiStudentDuotone } from "react-icons/pi";
import { SiSessionize } from "react-icons/si";
import { MdSubject } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { SiGoogleclassroom } from "react-icons/si";
import { FaBlogger } from "react-icons/fa";
import { HiMiniPresentationChartBar } from "react-icons/hi2";
import { FcLeave } from "react-icons/fc";
import Layout from '../Components/Layout/Layout'
import { StaffUserServices } from '../services/authservices';





const Subjects = () => {


    return (
        <div>
            <Layout/>
            <section className='bg-white-950 p-4 md:p-10 lg:p-16 mt-8 md:mt-18 lg:mt-18 h-auto md:h-[600px]'>
                <div className=' grid grid-cols-1 ml-24 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-28 md:mt-8'>
                    <NavLink to=''>
                        <div key='' className="transform transition-transform hover:scale-105 
                                flex-shrink-0 flex flex-col font-bold text-lg items-center justify-center bg-gray-200 
                                bg-opacity-70 text-black h-32">
                            <div className="h-5 ">
                                <MdSubject />
                            </div>
                            <div className="">
                                Subjects
                            </div>
                        </div>
                    </NavLink>
                </div>
            </section>
        </div>
    )
}
export default Subjects
