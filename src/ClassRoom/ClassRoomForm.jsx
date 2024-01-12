
import React, { useState, useEffect, useContext } from 'react';
import { StaffUserServices } from '../services/authservices';
import { AuthContext } from '../context/contex';
import toast from 'react-hot-toast';




const ClassRoomForm = () => {

    const { showForm, setShowForm, editForm, setEditForm } = useContext(AuthContext)

    const [courseOptions, setCourseOptions] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [courseId, setcourseId] = useState('');
    const [formData, setFormData] = useState({
        semseter: '1',
        course: '',
    });

    const [data, setData] = useState({
        data: '',
        course_id: '',
        name: '',
    })


    const fetchCourses = async () => {
        try {
            const response = await StaffUserServices.getCousers();
            setCourseOptions(response);
        } catch (error) {
            console.log(error);
        }
    };


    const handleCheckboxChange = (e) => {
        const studentId = Number(e.target.value);
        if (e.target.checked) {
            setSelectedStudents(prevStudents => [...prevStudents, studentId]);
        } else {
            setSelectedStudents(prevStudents => prevStudents.filter(id => id !== studentId));
        }
    };
    console.log(selectedStudents)

    const fetchStudents = async () => {
        setLoading(true)
        if (courseOptions && !formData.course) {
            courseOptions.map((courseOption, index) => {
                if (index === 0) {
                    setFormData((prev) => ({ ...prev, course: courseOption.id }));
                }
            });
        }

        setTimeout(async () => {
            console.log(formData.semseter, "semester");
            console.log("This is the formdata", formData);

            try {
                const response = await StaffUserServices.getStudents({
                    semseter: formData.semseter,
                    course: formData.course,
                });

                console.log(response)

                const data = response.data.map((details) => ({
                    id: details.student_details.id,
                    name: details.student_details.first_name,
                }));
                setStudents(data);

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }, 1000);
    };



    useEffect(() => {
        fetchCourses();


    }, []);





    const handleSubmit = async () => {
        setData(prevData => ({
            ...prevData,
            data: selectedStudents,
            course_id: formData.course
        }));

        try {

            const response = await StaffUserServices.createClassRoom(data)

            if (response.status == 201) {
                setShowForm(false)
                toast.success("The Class Room is Created Successfully", {
                    autoClose: 5000, 
                });
            }

            console.log(response)
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="bg-gray-100 p-6 rounded-md shadow-md">
            <div className="flex items-center">
                <label className="text-gray-700">Semester:</label>
                <select
                    value={formData.semseter}
                    onChange={(e) => setFormData({ ...formData, semseter: e.target.value })}
                    className="ml-2 p-2 border rounded-md"
                >
                    <option value="1">Semester 1</option>
                    <option value="2">Semester 2</option>
                    <option value="3">Semester 3</option>
                    <option value="4">Semester 4</option>
                    <option value="5">Semester 5</option>
                    <option value="6">Semester 6</option>
                    <option value="7">Semester 7</option>
                    <option value="8">Semester 8</option>
                </select>
            </div>

            <div className="flex items-center">
                <label className="text-gray-700">Course:</label>
                <select
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className="ml-2 p-2 border rounded-md"
                >
                    {courseOptions.map(courseOption => (
                        <option key={courseOption.id} defaultValue={courseOption.id} value={courseOption.id}>{courseOption.coursename}</option>
                    ))}
                </select>
            </div>

            <button
                onClick={fetchStudents}
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-700"
            >
                Fetch Students
            </button>

            <div className="flex items-center">
                <label className="text-gray-700">Students:</label>

                {loading ? (<p className='font-mono text-center w-full'> Loading....</p>) : (students.map(student => (
                    <div key={student.id}>
                        <input
                            type='checkbox'
                            checked={selectedStudents.includes(student.id)}
                            onChange={handleCheckboxChange}
                            value={student.id}
                            className="ml-2 p-2 border rounded-md"
                        />
                        <span>{student.name}</span>
                    </div>
                )))}
            </div>
            <div>
                <label className="text-gray-700">Classname</label>
                <input
                    onChange={(e) => {
                        setData((prevData) => ({
                            ...prevData,
                            name: e.target.value,
                        }));
                    }}
                    type="text"
                    name=""
                    id=""
                    placeholder='Enter the classroom Name'
                />
            </div>
            <div>
                <button
                    onClick={handleSubmit}
                    className='bg-green-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-700'>
                    Create Class
                </button>
            </div>

        </div>
    );
};

export default ClassRoomForm;
