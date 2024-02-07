import React, { useState, useEffect } from 'react';
import { StaffUserServices } from '../services/authservices';
import toast from 'react-hot-toast';

const EditClassroomForm = ({ classroomId }) => {
    const [studentss, setStudents] = useState([]);
    const [semesterr, setSemesterr] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchStudents();
    }, [classroomId]);

    const fetchStudents = async () => {
        setLoading(true);
        try {
            // Fetch students already in the class
            const response = await StaffUserServices.GetClassRooms();
            console.log(response[0]?.semester)
            console.log(response[0]?.departments[0]?.coursename)
            setSemesterr(response[0]?.semester)
            const foundClass = response?.find((classItem) => classItem?.id == classroomId);

            const avalilblestudents = await StaffUserServices.getStudents({
                semseter: response[0]?.semester,
                course: response[0]?.departments[0]?.id,
            });
            const studentsDetails = foundClass?.students.map(student => ({
                id: student.id,
                email: student.email,
                firstName: student?.first_name,
                lastName: student?.last_name,
                present: true,
            }));

            setStudents(studentsDetails);

            const data = avalilblestudents?.data?.map((details) => ({
                id: details.student_details.id,
                firstName: details.student_details?.first_name,
                email: details.student_details?.email,
                lastName: details.student_details?.first_name,
                present: false,
            }));
            setStudents(prev => [...prev, ...data])
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
   
    const handleAddStudents = async () => {
        try {
            if (!studentss) {
                console.error("Student list is not available.");
                return;
            }
            const student_ids = studentss?.filter(item => item.present).map(item => item.id);
            const response = await StaffUserServices.editClassroomData(classroomId, student_ids);
            if (response.status == 200) {
                fetchStudents(); // Refresh student list after adding
                toast.success('Students added to class successfully', {
                    autoClose: 5000,
                });
            }
        } catch (error) {
            console.log(error);
            toast.error('Failed to add students to class');
        }
    };



    const handleRemoveStudent = async (studentId) => {
        // Filter out the student with the given studentId and update its 'present' field to false
        const updatedStudents = studentss.map(student => {
            if (student.id == studentId) {
                return { ...student, present: !student.present }; // Update 'present' field to false
            }
            return student;
        });

        // Set the state with the updated students array
        setStudents(updatedStudents);
    };



    return (
        <div className="bg-gray-100 p-6 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4">Edit Class</h2>
            <div className="flex flex-col items-start ml-12">
                <label className="text-gray-700 mb-2">Students:</label>

                {loading ? (
                    <p className="font-mono text-center w-full">Loading....</p>
                ) : (
                    studentss?.map((student) => (
                        <div key={student?.id} className="flex items-center mb-2">
                            <span className="flex items-center p-2 border rounded-md">
                                {student?.firstName}
                            </span>
                            <input
                                type="checkbox"
                                onChange={() => { handleRemoveStudent(student.id) }}
                                value={student?.id}
                                className="mr-2 p-2 border rounded-md"
                                defaultChecked={student?.present}
                            />
                        </div>
                    ))
                )}
            </div>

            <div className="mt-4">
                <button
                    onClick={handleAddStudents}
                    className="bg-green-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-700"
                >
                    Add Selected Students
                </button>
            </div>
        </div>
    );
};

export default EditClassroomForm;
