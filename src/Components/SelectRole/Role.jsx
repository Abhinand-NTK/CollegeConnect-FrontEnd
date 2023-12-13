import React from 'react'
import Layout from '../Layout/Layout'
import { NavLink } from 'react-router-dom'
const Role = () => {
    return (
        <>
            <Layout title='Role' content='Select Role'>

                <div className='flex flex-col justify-center items-center min-h-screen' >
                    <h1 className=' mb-6'>Who Are u !</h1>
                    <NavLink to="/your-route" className="mb-4 w-80 px-4 py-2 bg-blue-500 text-white">
                        Your NavLink Text
                    </NavLink>

                    <NavLink to="/your-route" className="w-80 mb-4 px-4 py-2 bg-blue-500 text-white">
                        Your NavLink Text
                    </NavLink>

                    <NavLink to="/your-route" className="w-80 px-4 mb-4 py-2 bg-blue-500 text-white">
                        Your NavLink Text
                    </NavLink>
                </div>

            </Layout>
        </>
    )
}

export default Role
