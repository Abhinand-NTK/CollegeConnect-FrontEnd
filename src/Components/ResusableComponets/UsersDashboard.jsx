import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { NavLink } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { Menu } from '@material-tailwind/react'






const UsersDashboard = () => {
    const [studentUserWindows, setstudentUserWindows] = useState(['Profile', 'Subjects', 'Attendence', 'Assignments', 'Blog', 'Analysis', 'Video Meetings'])
    const [teacherUserWindows, setteacherUserWindows] = useState(['Profile', 'Subjects', , 'Blog', 'Video Meetings'])
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
        const decoded =jwtDecode(token)
        console.log(jwtDecode(token))


        if (decoded.user_type === "1") {
            setMenu(adminUserWindows);
        } 
        if (decoded.user_type === "2") {
            setMenu(adminUserWindows);
        } 
        if (decoded.user_type === "3") {
            setMenu(adminUserWindows);
        } 
    }, [adminUserWindows, teacherUserWindows, studentUserWindows]);

   
    return (
        <div>
            <Layout></Layout>
                <section className='bg-indigo-950 p-4 md:p-10 lg:p-16 mt-8 md:mt-12 h-auto md:h-[800px]'>
                    <div className='grid grid-cols-1 ml-24 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-28 md:mt-8'>
                        {
                            menu.map((s) => (
                                <div key={s} className='flex font-bold text-lg items-center justify-center bg-white p-4 md:p-6 h-24 rounded-xl mt-5'>
                                    <NavLink to={s[1]}>
                                        {s[0]}
                                    </NavLink>
                                </div>
                            ))
                        }

                        {/* <div className='flex text-lg font-bold items-center justify-center bg-white p-4 md:p-6 h-24 rounded-xl mt-5'>
                            Subjects
                        </div>
                        <div className='flex text-lg font-bold items-center justify-center bg-white p-4 md:p-6 h-24 rounded-xl mt-5'>
                            Attendence
                        </div>
                        <div className='flex text-lg font-bold items-center justify-center bg-white p-4 md:p-6 h-24 rounded-xl mt-5'>
                            Assignments
                        </div>
                        <div className='flex text-lg font-bold items-center justify-center bg-white p-4 md:p-6 h-24 rounded-xl mt-5'>
                            Video Meetings
                        </div>
                        <div className='flex text-lg font-bold items-center justify-center bg-white p-4 md:p-6 h-24 rounded-xl mt-5'>
                            Blog
                        </div>
                        <div className='flex text-lg font-bold items-center justify-center bg-white p-4 md:p-6 h-24 rounded-xl mt-5'>
                            Analysis
                        </div>
                        <div className='flex text-lg font-bold items-center justify-center bg-white p-4 md:p-6 h-24 rounded-xl mt-5'>
                            gfgf
                        </div>
                        <div className='flex text-lg font-bold items-center justify-center bg-white p-4 md:p-6 h-24 rounded-xl mt-5'>
                            gfgf
                        </div> */}
                    </div>
                </section>
        </div>
    )
}
export default UsersDashboard
