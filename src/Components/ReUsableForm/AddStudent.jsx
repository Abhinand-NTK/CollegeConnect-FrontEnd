import React, { useEffect, useState } from 'react';
import ReUsableForm from './Form';
import ReUsableTable from '../ReUsableTable/ReUsableTable';
import Layout from '../Layout/Layout';
import Modal from '../Modal/Modal';
import { CollgeAdminServices } from '../../services/authservices';




const AddStudnet = () => {


  const fieldNames = ['first_name', 'last_name', 'age', 'course', 'session',
    'city', 'state', 'zip_code', 'address ', 'phone_number'];
  const tableColumns = ['first_name', 'last_name', 'age', 'course',
    'session', 'city', 'state', 'zip_code', 'address ', 'phone_number', 'Edit', 'Delete',
  ];


  // State to manage the table data
  const [tableData, setTableData] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editForm, setEditForm] = useState(false);

  // Effect to fetch data and update the tableData
  const fetchData = async () => {
    try {
      const response = await CollgeAdminServices.getStudent();
      // Assuming the response contains an array of courses with 'id' and 'coursename' properties
      const students = response.data || [];

      const student = students.map((student) => student.student_details)

      // Create table data dynamically based on the courses
      const newTableData = student.map((student, index) => ({
        no: index + 1,
        first_name: student.first_name,
        last_name: student.last_name,
        age: student.age,
        zip_code: student.zip_code,
        address: student.address,
        city: student.city,
        state: student.state,
        address: student.address,
        phone_number: student.phone_number,
        delete: student.id,  // Set the 'id' as the delete value
        edit: student.id,
        course: students[index].course_details.coursename,   // Set the 'id' as the edit value
        session: students[index].session_details.start_year + " to  " + students[index].session_details.start_year,   // Set the 'id' as the edit value
      }));

      // Update the tableData state
      setTableData(newTableData);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle errors here
    }
  };

  useEffect(() => {
    // Call the fetchData function
    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const [value, setValue] = useState("")

  const handleFormSubmit = async (formData) => {
    if (!value) {
      try {
        const response = await CollgeAdminServices.addStudent(formData)
        if (response.status === 201) {
          closeModal()
          fetchData()
        }
      }
      catch {
        console.log("Error")
      }
    } else {
      try {
        const response = await CollgeAdminServices.editStudent(formData)
        if (response.status === 200) {
          closeModal()
          fetchData()
        }
      }
      catch (error) {
        console.log(error)
      }
    }
  };

  const handleEditClick = (rowData) => {
    setValue(rowData)
    openModal()

  };

  const handleDeleteClick = (rowData) => {
    console.log('Delete button clicked for:', rowData);
  };

  const handleViewForm = () => {
    setShowForm(!showForm);
  };

  const openModal = () => {
    setShowForm(true)
    setEditForm(true)
  }

  const closeModal = () => {
    setShowForm(false)
    setEditForm(false)
    setValue("")
  }
  return (
    <div className='h-screen'>
      <Layout />
      <div className='bg-indigo-950 h-screen flex flex-col'>
        {showForm &&
          <Modal isOpen={true} onClose={closeModal}>
            <div className='sm:w-[400px] md:w-[700px] h-96 overflow-y-scroll overflow-hidden scrollbar-hide '>
              <ReUsableForm data={value} fieldNames={fieldNames} onSubmit={handleFormSubmit} />
            </div>
          </Modal>
        }
        {editForm &&
          <Modal isOpen={true} onClose={closeModal}>
            <div className='sm:w-[400px] md:w-[700px] h-96 overflow-y-scroll overflow-hidden scrollbar-hide'>
              <ReUsableForm data={value} setdata={setValue} fieldNames={fieldNames} onSubmit={handleFormSubmit} />
            </div>
          </Modal>
        }

        <div className='pt-20 px-10 ml-20'>
          <button
            onClick={openModal}
            className='text-white w-40 bg-green-500 rounded-lg font-bold h-12 transform transition-transform hover:scale-105 flex-shrink-0'>
            Add Student
          </button>
          <ReUsableTable className='w-[100px]' columns={tableColumns} data={tableData} onEditClick={handleEditClick} onDeleteClick={handleDeleteClick} />
        </div>
      </div>
    </div>
  );
};

export default AddStudnet;
