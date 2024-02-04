import React, { useEffect, useState } from 'react';
import Layout from '../Components/Layout/Layout';
import { StudentUserServices } from '../services/authservices';


const AttendanceTable = () => {
    const attendanceData = [
        { id: 1, semster: 1, subject: 'ThermoDynamics', name: 'Student 1', attendancePercentage: 85 },
        { id: 2, semster: 1, subject: 'Mechanics', name: 'Student 2', attendancePercentage: 60 },
    ];

    const [attendeceDatas, setAttendeceDatas] = useState({})

    useEffect(() => {
        const fun = async () => {
            const response = await StudentUserServices.GetAttendence()
            if (response) {
                setAttendeceDatas(response)
            }
        }
        fun()
    }, [])


    return (
        <section className='bg-white-950 p-4 md:p-10 lg:p-16 mt-8 md:mt-18 lg:mt-18 h-auto md:h-[600px]'>
            <Layout />
            <table className="w-2/4 ml-24 mt-12 border-collapse border overflow-hidden">
                <thead>
                    <tr className="bg-indigo-950 text-white">
                        <th className="border p-2 text-center">No</th>
                        <th className="border p-2 text-center">Subject</th>
                        <th className="border p-2 text-center">Attendance Percentage</th>
                    </tr>
                </thead>
                <tbody>
                    {attendeceDatas?.size !== 0 && attendeceDatas?.subjects && Object.keys(attendeceDatas?.subjects)?.map((subjectKey, index) => (
                        <tr key={index}>
                            <td className="border p-2 text-center">{index + 1}</td>
                            <td className="border p-2 text-center">{subjectKey}</td>
                            <td className="border p-2 text-center">
                                <div className="relative pt-1">
                                    <div className="flex mb-2 items-center justify-center">
                                        <div>
                                            <span className="text-xs font-semibold inline-block text-center py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                                                {attendeceDatas.subjects[subjectKey]?.percentage || 0}%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="relative flex items-center justify-center">
                                        <div className="flex-1 flex items-center">
                                            <div className="w-full bg-teal-200 rounded-full">
                                                <div
                                                    className="text-xs leading-none text-white bg-teal-500 rounded-full"
                                                    style={{ width: `${attendeceDatas.subjects[subjectKey]?.percentage || 0}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default AttendanceTable;
