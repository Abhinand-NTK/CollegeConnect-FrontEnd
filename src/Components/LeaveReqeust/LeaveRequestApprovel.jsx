import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import { StudentUserServices } from '../../services/authservices';


const LeaveRequestApprovel = () => {

    const [leaveRequests, setLeaveRequests] = useState([]);

    const handleButtonClick = async (id) => {
        try {
            const respones = await StudentUserServices.ApprovalLeave(id) 
            setLeaveRequests(respones.data)
        } catch (error) {
            console.log(error)
        }

    };


    const GetLeaveReqeustDetails = async () => {
        try {
            const response = await StudentUserServices.GetReqeustStatusUsers()
            console.log(response)
            setLeaveRequests(response.data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        GetLeaveReqeustDetails()
    }, [])




    return (
        <div>
            <Layout />
            <section className='bg-white-950 ml-12 p-4 md:p-10 lg:p-16 mt-8 md:mt-18 lg:mt-18 h-auto md:h-[600px]'>

                <h2 className="text-2xl font-semibold mb-4">Leave Requests</h2>
                <table className="min-w-full border border-blue-gray-300">
                    <thead>
                        <tr className="bg-indigo-950 border-white text-white">
                            <th className="py-2">No</th>
                            <th className="py-2">Name</th>
                            {/* <th className="py-2">Designation</th> */}
                            <th className="py-2">Reason</th>
                            <th className="py-2">Type</th>
                            <th className="py-2">Status</th>
                            <th className="py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaveRequests && leaveRequests.map((request, index) => (
                            <tr key={request.id} className="border-t border-blue-gray-300">
                                <td className="py-2 border text-center">{index + 1}</td>
                                <td className="py-2 border text-center">{request?.requestor?.first_name}</td>
                                {/* <td className="py-2 border text-center">{request.destination}</td> */}
                                <td className="py-2 border text-center">{request?.reasonforleave}</td>
                                <td className="py-2 border text-center">{request?.leavetype}</td>
                                <td className={`py-2 border text-center ${request?.approval_status ? 'text-green-600' : 'text-yellow-600'}`}>
                                    {request?.approval_status ? 'Approved' : 'Pending'}
                                </td>

                                <td className="py-2 text-center">
                                    <button
                                        className={`py-2 px-4 border text-white ${request?.approval_status ? 'bg-green-500 hover:bg-red-500' : 'bg-red-500 hover:bg-green-500'}`}
                                        onClick={() => handleButtonClick(request?.id)}
                                    >
                                        {request?.approval_status ? 'Approved' : 'Pending'}
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default LeaveRequestApprovel;
