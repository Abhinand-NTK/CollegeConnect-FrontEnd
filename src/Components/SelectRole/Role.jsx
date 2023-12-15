import React, { useState } from 'react'
import Layout from '../Layout/Layout'
import { NavLink } from 'react-router-dom'


const Role = () => {
    const [selectedRole, setSelectedRole] = useState('');
    return (
        <>
            <Layout title='Role' content="selecting the role of userx   ">

                <div className='bg-indigo-950 flex flex-col justify-center items-center min-h-screen' >
                    <h5 className='text-white mb-6'>Who Are u !</h5>
                    <NavLink onClick={() => setSelectedRole('A/c')}
                        to="/collegregister" className="mb-4 w-80 px-4 py-2 bg-white text-black font-bold flex items-center justify-center">
                        College Admin
                    </NavLink>

                    <NavLink onClick={() => setSelectedRole('T/s')}
                        to="/signup" className="mt-4 mb-6 w-80 px-4 py-2 bg-white text-black font-bold flex items-center justify-center">
                        Student/Teacher
                    </NavLink>
                </div>

            </Layout>
        </>
    )
}

export default Role
