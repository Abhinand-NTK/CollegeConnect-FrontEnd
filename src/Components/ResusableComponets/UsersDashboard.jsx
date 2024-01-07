import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { NavLink } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { Menu } from '@material-tailwind/react'






const UsersDashboard = () => {
    const [studentUserWindows, setstudentUserWindows] = useState(['Profile', 'Subjects', 'Attendence', 'Assignments', 'Blog', 'Analysis', 'Video Meetings'])
    const [teacherUserWindows, setteacherUserWindows] = useState(
        [
        ['Profile', '/users/profilecard'],
        ['Subjects', '/users/admin/addstaff'],
        ['Blog/Connect', '/users/admin/addsubject'],
        ['Attendence Management', '/users/admin/addstudent'],
        ['Leave Request', '/users/admin/addsession'],
        ['Assign Principal', '/users/addteacher'],
        ['Manage U I', '/users/manageui'],
        ['Set Vision & Mission', '/users/vision&mission']])
    const [adminUserWindows, setAdminUserWindows] = useState([
        ['Add Course', '/users/admin/addcourse'],
        ['Add Staff', '/users/admin/addstaff'],
        ['Add Subject', '/users/admin/addsubject'],
        ['Add Student', '/users/admin/addstudent'],
        ['Add Session', '/users/admin/addsession'],
        ['Assign Principal', '/users/addteacher'],
        ['Manage U I', '/users/manageui'],
        ['Set Vision & Mission', '/users/vision&mission']])



    const [menu, setMenu] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('Token');
        const decoded = jwtDecode(token)
        console.log(jwtDecode(token))


        if (decoded.user_type === "1") {
            setMenu(adminUserWindows);
        }
        if (decoded.user_type === "2") {
            setMenu(teacherUserWindows);
        }
        if (decoded.user_type === "3") {
            setMenu(adminUserWindows);
        }
    }, [adminUserWindows, teacherUserWindows, studentUserWindows]);


    return (
        <div>
            <Layout></Layout>
            <section className='bg-indigo-950 p-4 md:p-10 lg:p-16 mt-8 md:mt-12 h-auto md:h-[800px]'>
                <div className=' grid grid-cols-1 ml-24 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-28 md:mt-8'>
                    {
                        menu.map((s) => (
                            <NavLink to={s[1]}>
                                <div key={s} className='transform transition-transform hover:scale-105 flex-shrink-0  flex font-bold text-lg items-center justify-center bg-white p-4 md:p-6 h-24 rounded-xl mt-5'>
                                    {s[0]}
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
