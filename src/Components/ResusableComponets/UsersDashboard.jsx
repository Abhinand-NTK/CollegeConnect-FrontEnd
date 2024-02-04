import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
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
import { StaffUserServices } from '../../services/authservices'



const UsersDashboard = () => {
    const [checkPermission, setCheckPermission] = useState(null)
    // const [studentUserWindows, setstudentUserWindows] = useState(['Profile', 'Subjects', 'Attendence', 'Assignments', 'Blog', 'Analysis', 'Video Meetings'])
    const userdetails = async () => {
        try {
            const response = await StaffUserServices.UserDetails()
            console.log(response)
            setCheckPermission(response?.is_hod)
            const token = localStorage.getItem('Token');
            const decoded = jwtDecode(token)
            console.log(jwtDecode(token))


            if (decoded.user_type === "1") {
                setMenu(adminUserWindows);
            }
            if (decoded.user_type === "2") {
                checkPermission ? setMenu(teacherUserWindows) : setMenu(teacherUserWindows);
            }
            if (response?.is_hod && decoded.user_type === "2") {
                setMenu(HodsUserWindows)
            }
            if (decoded.user_type === "3") {
                setMenu(studentUserWindows);
            }

        } catch (error) {
            console.log(error)
        }
    }

    console.log("permission", checkPermission)

    const [HodsUserWindows, setHodsUserWindows] = useState(
        [
            ['Profile', '/users/profilecard', <ImProfile />],
            ['ClassRoom', '/users/staff/classrooms', <SiGoogleclassroom />],
            // ['Subjects', '/users/admin/addstaff', <MdSubject />],
            ['Blog/Connect', '/users/blogpost', <FaBlogger />],
            ['Staffs & Students Leave Requests', '/users/leaverequestapprovel', <HiMiniPresentationChartBar />],
            ['Leave Request', '/users/leaverequest', <FcLeave />],
        ])
    const [teacherUserWindows, setteacherUserWindows] = useState(
        [
            ['Profile', '/users/profilecard', <ImProfile />],
            ['ClassRooms', '/users/staffs/classrooms', <SiGoogleclassroom />],
            ['Subjects', '/users/subjects', <MdSubject />],
            ['Blog/Connect', '/users/blogpost', <FaBlogger />],
            // ['Attendence Management', '/users/attendance', <HiMiniPresentationChartBar />],
            ['Leave Request', '/users/leaverequest', <FcLeave />],
        ])
    const [adminUserWindows, setAdminUserWindows] = useState([
        ['Courses', '/users/admin/addcourse', <GiBookshelf />],
        ['Staffs', '/users/admin/addstaff', <GiTeacher />],
        ['Subjects', '/users/admin/addsubject', <MdSubject />],
        ['Students', '/users/admin/addstudent', <PiStudentDuotone />],
        ['Sessions', '/users/admin/addsession', <SiSessionize />],
        ['Assign Principal', '/users/addteacher'],
        ['Manage U I', '/users/manageui'],
        ['Set Vision & Mission', '/users/vision&mission']])
    const [studentUserWindows, setstudentUserWindows] = useState([
        ['Profile', '/users/profilecard', <ImProfile />],
        // ['ClassRoom', '/users/staff/classrooms', <SiGoogleclassroom />],
        ['Subjects', '/users/subjects', <MdSubject />],
        ['Blog/Connect', '/users/blogpost', <FaBlogger />],
        ['Attendence ', '/users/attendance', <HiMiniPresentationChartBar />],
        ['Leave Request', '/users/leaverequest', <FcLeave />],
    ])


    const [menu, setMenu] = useState([]);

    useEffect(() => {
        userdetails()
        // const token = localStorage.getItem('Token');
        // const decoded = jwtDecode(token)
        // console.log(jwtDecode(token))


        // if (decoded.user_type === "1") {
        //     setMenu(adminUserWindows);
        // }
        // if (decoded.user_type === "2") {
        //     checkPermission ? setMenu(teacherUserWindows) : setMenu(teacherUserWindows);
        // }
        // if(checkPermission && decoded.user_type === "2" ){
        //     setMenu(HodsUserWindows)
        // }
        // if (decoded.user_type === "3") {
        //     setMenu(studentUserWindows);
        // }
    }, [adminUserWindows, teacherUserWindows, studentUserWindows]);


    return (
        <div>
            <Layout></Layout>
            <section className='bg-white-950 p-4 md:p-10 lg:p-16 mt-8 md:mt-18 lg:mt-18 h-auto md:h-[600px]'>
                <div className=' grid grid-cols-1 ml-24 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-28 md:mt-8'>
                    {
                        menu.map((s, index) => (
                            <NavLink key={index} to={s[1]}>
                                <div key={s} className="transform transition-transform hover:scale-105 
                                flex-shrink-0 flex flex-col font-bold text-lg items-center justify-center bg-gray-200 
                                bg-opacity-70 text-black h-32">
                                    <div className="h-5 ">
                                        {s[2]}
                                    </div>
                                    <div className="">
                                        {s[0]}
                                    </div>
                                </div>
                            </NavLink>
                        ))
                    }
                </div>
            </section>
        </div>
    )
}
export default UsersDashboard
