

import React, { useEffect, useState } from 'react';
import Layout from '../Components/Layout/Layout';
import { StaffUserServices } from '../services/authservices';
import { useParams } from 'react-router-dom';

const Attendance = () => {
    const [id, setId] = useState(null);
    const { id_ } = useParams();
    const [students, setStudents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionCompleted, setSubmissionCompleted] = useState(false);
    const [isButtonVisible, setIsButtonVisible] = useState(true);

    const defaultStudent = {
        class_room_for_staff_id: null,
        id: null,
        first_name: null,
        last_name: null,
        present: false,
    };

    const [originalStudents, setOriginalStudents] = useState([]);

    const userdetails = async () => {
        try {
            const response = await StaffUserServices.UserDetails();
            console.log(response);
            setId(response?.id);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const fetchClassrooms = async () => {
        try {
            if (id != null) {
                const response = await StaffUserServices.GetClassroomsForTeachers(id);
                console.log(response);

                if (Array.isArray(response) && response.length > 0) {
                    response?.forEach((item) => {
                        if (item.id == id_) {
                            const firstClassroomStudents = item.students || [];
                            console.log('This is the classroom now', item.id);
                            const formattedStudents = firstClassroomStudents.map((student) => ({
                                class_room_for_staff_id: item.id,
                                id: student.id,
                                first_name: student.first_name,
                                last_name: student.last_name,
                                present: false,
                            }));

                            setStudents(formattedStudents);
                            setOriginalStudents(formattedStudents);
                        }
                    });
                } else {
                    console.error('Response is not an array or is empty.');
                }
            }
        } catch (error) {
            console.error('Error fetching classrooms:', error);
        }
    };

    const handleCheckboxChange = (studentId) => {

        console.log("This the students id:--",studentId)
        setStudents((prevStudents) =>
            prevStudents.map((student) =>
                student.id === studentId ? { ...student, present: !student.present } : student
            )
        );
        console.log("This is the students details i have :---",students)
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        try {
            const attendanceData = students.map(({ class_room_for_staff_id, id, present }) => ({
                class_room_for_staff_id,
                student_id: id,
                date: selectedDate.toISOString().split('T')[0],
                attendance_status: present ? 'present' : 'absent',
            }));

            console.log("This is the formdata:::----",attendanceData)

            const response = await StaffUserServices.MarkAttendence(attendanceData);

            if (response.status == 201) {
                console.log('Attendance submitted successfully');

                // After submitting, update the attendance data in the table
                getAttendance();
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
        if (id != null) {
            fetchClassrooms();
        }
        userdetails();
        getAttendance();
    }, [id]);

    const getAttendance = async () => {
        try {
            const response = await StaffUserServices.GetAttendenceOfStudents(
                id_,
                selectedDate.toISOString().split('T')[0]
            );
            console.log('This is the attendance data:', response);

            setStudents(response.map((item) => ({
                ...item,
                present: item.attendance_status == 'present',
            })));

            console.log("This is the students", students);

            setIsButtonVisible(response.length === 0);
        } catch (error) {
            console.error('Error fetching attendance:', error);
        }
    };

    console.log(students);

    useEffect(() => {
        getAttendance();
    }, [id_, selectedDate]);

    const handleEditAttendance = async () => {
        console.log("This is the hide and unhide button,====>>>>.");
        setIsButtonVisible(!isButtonVisible);
        
    };

    return (
        <div>
            <Layout />
            <section className="bg-white p-4 md:p-10 lg:p-16 mt-8 md:mt-12 h-auto md:h-[800px]">
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border overflow-hidden">
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
                                    <td className="border p-2 text-center">{`${student.first_name} ${student.last_name}`}</td>
                                    <td className="border p-2 text-center">
                                        <input
                                            key={student.id}
                                            type="checkbox"
                                            checked={student.present}
                                            onChange={() => handleCheckboxChange(student.id)}
                                            disabled={!isButtonVisible}
                                            className={`rounded-full h-5 w-5 transition-colors duration-300 ${student.present ? 'bg-green-500' : 'bg-red-500'}`}
                                        />
                                    </td>
                                    <td className="border p-2 text-center">{`${selectedDate.toLocaleDateString()} - ${student.present ? 'Present' : 'Absent'}`}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 flex justify-end">
                    {isSubmitting && (
                        <p className="text-indigo-950 text-center">
                            Submitting... Please wait. Changes cannot be made during submission.
                        </p>
                    )}

                    {!isSubmitting && !submissionCompleted && isButtonVisible && (
                        <button className="bg-indigo-950 text-white px-4 py-2 rounded" onClick={handleSubmit}>
                            Submit
                        </button>
                    )}
                    {isButtonVisible ? null : (
                        <button
                            onClick={() => handleEditAttendance()}
                            className="bg-indigo-950 text-white px-4 py-2 rounded"
                        >
                            Edit
                        </button>
                    )}

                    {submissionCompleted && (
                        <p className="text-green-500 text-center">
                            Submission successful. Changes cannot be made.
                        </p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Attendance;
