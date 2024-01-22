import React from 'react';
import Layout from '../Components/Layout/Layout';


const AttendanceTable = () => {
    // Sample data (replace this with actual data)
    const attendanceData = [
        { id: 1, name: 'Student 1', attendancePercentage: 85 },
        { id: 2, name: 'Student 2', attendancePercentage: 60 },
        // Add more data as needed
    ];

    return (
        <section className='bg-white-950 p-4 md:p-10 lg:p-16 mt-8 md:mt-18 lg:mt-18 h-auto md:h-[600px]'>
            <Layout/>
            <table className="w-3/4 ml-24 mt-12 border-collapse border overflow-hidden">
                <thead>
                    <tr className="bg-indigo-950 text-white">
                        <th className="border p-2 text-center">No</th>
                        <th className="border p-2 text-center">Name</th>
                        <th className="border p-2 text-center">Attendance Percentage</th>
                    </tr>
                </thead>
                <tbody>
                    {attendanceData.map((student, index) => (
                        <tr key={student.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                            <td className="border p-2 text-center">{index + 1}</td>
                            <td className="border p-2">{student.name}</td>
                            <td className="border p-2 text-center">
                                <div className="relative pt-1">
                                    <div className="flex mb-2 items-center justify-between ">
                                        <div>
                                            <span className="text-xs font-semibold inline-block text-center py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                                                {`${student.attendancePercentage}%`}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="relative flex items-center justify-between">
                                        <div className="flex-1 flex items-center">
                                            <div className="w-full bg-teal-200 rounded-full">
                                                <div
                                                    style={{ width: `${student.attendancePercentage}%` }}
                                                    className="text-xs leading-none text-white bg-teal-500 rounded-full"
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
