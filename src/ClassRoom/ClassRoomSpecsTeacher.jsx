



// import React, { useEffect, useState } from 'react';
// import Layout from '../Components/Layout/Layout';
// import { StaffUserServices } from '../services/authservices';
// import { useParams } from 'react-router-dom';
// StaffUserServices

// const ClassRoomSpecsTeacher = () => {

//     const [id, setId] = useState(null)

//     const { id_ } = useParams()

//     const [students, setStudents] = useState([
//         { class_room_for_staff_id:'',id: '', first_name: ' ', last_name: '', present: false },

//         // Add more dummy data as needed
//     ]);

//     // const [students, setStudents] = useState([
//     //     { id: 1, name: 'John Doe', present: false },
//     //     { id: 2, name: 'Jane Smith', present: false },
//     //     { id: 3, name: 'Bob Johnson', present: false },
//     //     // Add more dummy data as needed
//     // ]);


//     const userdetails = async () => {
//         try {
//             const response = await StaffUserServices.UserDetails()
//             console.log(response)
//             setId(response?.id)
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     const fetechclassrooms = async () => {
//         try {
//             if (id != null) {
//                 const response = await StaffUserServices.GetClassroomsForTeachers(id);
//                 console.log(response);
//                 // console.log("Inside the array check", id_)



//                 if (Array.isArray(response) && response.length > 0) {
//                     response?.map((item, index) => {
//                         if (item.id == id_) {
//                             const firstClassroomStudents = response[index].students || [];
//                             console.log("This is the classroom now",response[index].id)
//                             const formattedStudents = firstClassroomStudents.map(student => ({
//                                 class_room_for_staff_id:response[index].id,
//                                 id: student.id,
//                                 first_name: student.first_name,
//                                 last_name: student.last_name,
//                                 present: false,  // Set the initial value as needed
//                             }));

//                             setStudents(formattedStudents);

//                         }
//                     })
//                 }
//                 else {
//                     console.error("Response is not an array.");
//                 }
//             }

//         } catch (error) {

//         }
//     }


//     useEffect(() => {
//         if (id !== null) {
//             fetechclassrooms(id);
//         }
//         userdetails();

//     }, [id])



//     const [selectedDate, setSelectedDate] = useState(new Date());
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [submissionCompleted, setSubmissionCompleted] = useState(false);

//     // const handleCheckboxChange = (studentId) => {
//     //     setStudents((prevStudents) =>
//     //         prevStudents.map((student) =>
//     //             student.id === studentId ? { ...student, present: !student.present } : student
//     //         )
//     //     );
//     // };

//     const handleCheckboxChange = (studentId) => {
//         setStudents((prevStudents) =>
//             prevStudents.map((student) =>
//                 student.id === studentId ? { ...student, present: !student.present } : student
//             )
//         );
//     };

//     const handleSubmit = () => {
//         setIsSubmitting(true);

//         // Log the data for demonstration purposes
//         console.log('Submitted Data:', {
//             date: selectedDate.toLocaleDateString(),
//             students: students.map(({ id, first_name, present }) => ({ id, first_name, present })),
//         });

//         // Mock API call or any other submission logic
//         setTimeout(() => {
//             setIsSubmitting(false);
//             setSubmissionCompleted(true);
//             // You can reset the state or redirect after successful submission
//         }, 2000);
//     };

//     return (
//         <div>
//             <Layout />
//             <section className="bg-white p-4 md:p-10 lg:p-16 mt-8 md:mt-12 h-auto md:h-[800px]">
//                 <div className="overflow-x-auto">
//                     <table className="min-w-full border-collapse border  overflow-hidden">
//                         <thead>
//                             <tr className="bg-indigo-950 text-white">
//                                 <th className="border p-2 text-center">No</th>
//                                 <th className="border p-2 text-center">Name</th>
//                                 <th className="border p-2 text-center">Attendance Date</th>
//                                 <th className="border p-2 text-center">Attendance Status</th>
//                             </tr>
//                         </thead>
//                         <tbody>

//                             {students.map((student, index) => (
//                                 <tr key={student.id} className="bg-white">
//                                     <td className="border p-2 text-center">{index + 1}</td>
//                                     <td className="border p-2 text-center">{student.first_name} {student.last_name}</td>
//                                     <td className="border p-2 text-center">
//                                         <input
//                                             type="checkbox"
//                                             checked={student.present}
//                                             onChange={() => handleCheckboxChange(student.id)}
//                                             className={`rounded-full h-5 w-5 transition-colors duration-300 ${student.present ? 'bg-green-500' : 'bg-red-500'
//                                                 }`}
//                                         />
//                                     </td>
//                                     <td className="border p-2 text-center">
//                                         {/* Render the attendance date and status */}
//                                         {selectedDate.toLocaleDateString()} - {student.present ? 'Present' : 'Absent'}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>

//                 {isSubmitting && (
//                     <p className="text-indigo-950 text-center mt-4">
//                         Submitting... Please wait. Changes cannot be made during submission.
//                     </p>
//                 )}

//                 {!isSubmitting && !submissionCompleted && (
//                     <button
//                         className="bg-indigo-950 text-white p-2 mt-4"
//                         onClick={handleSubmit}
//                         disabled={isSubmitting}
//                     >
//                         Submit
//                     </button>
//                 )}

//                 {submissionCompleted && (
//                     <p className="text-green-500 text-center mt-4">
//                         Submission successful. Changes cannot be made.
//                     </p>
//                 )}
//             </section>
//         </div>

//     );
// };

// export default ClassRoomSpecsTeacher;




import React, { useEffect, useState } from 'react';
import Layout from '../Components/Layout/Layout';
import { StaffUserServices } from '../services/authservices';
import { useParams } from 'react-router-dom';

const ClassRoomSpecsTeacher = () => {
    const [id, setId] = useState(null);
    const { id_ } = useParams();
    const [students, setStudents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionCompleted, setSubmissionCompleted] = useState(false);

    const userdetails = async () => {
        try {
            const response = await StaffUserServices.UserDetails();
            console.log(response);
            setId(response?.id);
        } catch (error) {
            console.log(error);
        }
    };

    const fetechclassrooms = async () => {
        try {
            if (id != null) {
                const response = await StaffUserServices.GetClassroomsForTeachers(id);
                console.log(response);

                if (Array.isArray(response) && response.length > 0) {
                    response?.forEach((item) => {
                        if (item.id == id_) {
                            const firstClassroomStudents = item.students || [];
                            console.log("This is the classroom now", item.id);
                            const formattedStudents = firstClassroomStudents.map((student) => ({
                                class_room_for_staff_id: item.id,
                                id: student.id,
                                first_name: student.first_name,
                                last_name: student.last_name,
                                present: false,
                            }));

                            setStudents(formattedStudents);
                        }
                    });
                } else {
                    console.error("Response is not an array or is empty.");
                }
            }
        } catch (error) {
            console.error("Error fetching classrooms:", error);
        }
    };

    const handleCheckboxChange = (studentId) => {
        setStudents((prevStudents) =>
            prevStudents.map((student) =>
                student.id === studentId ? { ...student, present: !student.present } : student
            )
        );
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);


        try {
            const attendanceData = students.map(({ id, present }) => ({
                class_room_for_staff_id: students[0]?.class_room_for_staff_id, // Assuming all students belong to the same classroom
                student_id: id,
                date: selectedDate.toISOString().split('T')[0],
                attendance_status: present ? 'present' : 'absent',
            }));

            console.log("This is the attendence data that is serving to the backend>>>>>>>>>>>>>>>>-------",attendanceData)
            // console.log("This is the attendence data that is serving to the backend>>>>>>>>>>>>>>>>-------",attendanceData)
            // console.log("This is the attendence data that is serving to the backend>>>>>>>>>>>>>>>>-------",attendanceData)

            // Make an API call to create attendance objects
            const response = await fetch('YOUR_DJANGO_API_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any additional headers as needed
                },
                body: JSON.stringify(attendanceData),
            });

            if (response.ok) {
                console.log('Attendance submitted successfully');
                setSubmissionCompleted(true);
            } else {
                console.error('Failed to submit attendance');
            }
        } catch (error) {
            console.error('Error submitting attendance:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (id !== null) {
            fetechclassrooms(id);
        }
        userdetails();
    }, [id]);

    return (
        <div>
            <Layout />
            <section className="bg-white p-4 md:p-10 lg:p-16 mt-8 md:mt-12 h-auto md:h-[800px]">
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border  overflow-hidden">
                        <thead>
                            <tr className="bg-indigo-950 text-white">
                                <th className="border p-2 text-center">No</th>
                                <th className="border p-2 text-center">Name</th>
                                <th className="border p-2 text-center">Attendance Date</th>
                                <th className="border p-2 text-center">Attendance Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <tr key={student.id} className="bg-white">
                                    <td className="border p-2 text-center">{index + 1}</td>
                                    <td className="border p-2 text-center">{student.first_name} {student.last_name}</td>
                                    <td className="border p-2 text-center">
                                        <input
                                            type="checkbox"
                                            checked={student.present}
                                            onChange={() => handleCheckboxChange(student.id)}
                                            className={`rounded-full h-5 w-5 transition-colors duration-300 ${student.present ? 'bg-green-500' : 'bg-red-500'
                                                }`}
                                        />
                                    </td>
                                    <td className="border p-2 text-center">
                                        {selectedDate.toLocaleDateString()} - {student.present ? 'Present' : 'Absent'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {isSubmitting && (
                    <p className="text-indigo-950 text-center mt-4">
                        Submitting... Please wait. Changes cannot be made during submission.
                    </p>
                )}

                {!isSubmitting && !submissionCompleted && (
                    <button
                        className="bg-indigo-950 text-white p-2 mt-4"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                    >
                        Submit
                    </button>
                )}

                {submissionCompleted && (
                    <p className="text-green-500 text-center mt-4">
                        Submission successful. Changes cannot be made.
                    </p>
                )}
            </section>
        </div>
    );
};

export default ClassRoomSpecsTeacher;
