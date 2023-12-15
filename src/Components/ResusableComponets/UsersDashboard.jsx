import React, { useState } from 'react'
import Layout from '../Layout/Layout'
import { NavLink } from 'react-router-dom'




const UsersDashboard = () => {
    const [studentUserWindows, setstudentUserWindows] = useState(['Profile', 'Subjects','Attendence','Assignments','Blog','Analysis','Video Meetings'])
    const [teacherUserWindows, setteacherUserWindows] = useState(['Profile', 'Subjects',,'Blog','Video Meetings'])
    const [adminUserWindows, setAdminUserWindows] = useState([['Add Studnet','/users/addstudent'], ['Add Teacher','/users/addteacher'],['Manage U I','/users/manageui'],['Set Vision & Mission','/users/vision&mission']])
    return (
        <div>
            <Layout>
                <section className='bg-indigo-950 p-4 md:p-10 lg:p-16 mt-8 md:mt-12 h-auto md:h-[800px]'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-28 md:mt-8'>
                        {
                            adminUserWindows.map((s) => (
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
            </Layout>
        </div>
    )
}
export default UsersDashboard
