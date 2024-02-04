import React, { useEffect, useState } from 'react';
import ReUsableForm from './Form';
import ReUsableTable from '../ReUsableTable/ReUsableTable';
import Layout from '../Layout/Layout';
import Modal from '../Modal/Modal';
import { userService, CollgeAdminServices } from '../../services/authservices';



const CousreAdding = () => {


  const fieldNames = ['coursename'];
  const tableColumns = ['No', 'coursename', 'Delete', 'Edit'];

  // Logic for the modal openinig and closing

  const [showForm, setShowForm] = useState(false);
  const [editForm, setEditForm] = useState(false);

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



  // State to manage the table data
  const [tableData, setTableData] = useState([]);

  // Effect to fetch data and update the tableData
  const fetchData = async () => {
    try {
      const response = await CollgeAdminServices.GetCourse();

      // Assuming the response contains an array of courses with 'id' and 'coursename' properties
      const courses = response;
      // Create table data dynamically based on the courses
      const newTableData = courses.map((course, index) => ({
        no: index + 1,
        coursename: course.coursename,
        delete: course.id,  // Set the 'id' as the delete value
        edit: course.id,    // Set the 'id' as the edit value
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
        const response = await CollgeAdminServices.AddCourse(formData)
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
        const response = await CollgeAdminServices.editCourse(formData)
        if (response.status === 200) {
          closeModal()
          fetchData()
        }
      }
      catch(error) {
        console.log(error)
      }
    }
  };


  const handleEditClick = (rowData) => {
    setValue(rowData)
    openModal()

  };

  const handleDeleteClick = (rowData) => {
  };



  return (
    <div className='h-screen'>
      <Layout />
      <div className='bg-white h-screen flex flex-col'>

        {showForm &&
          <Modal isOpen={true} onClose={closeModal}>
            <div className='sm:w-[400px] md:w-[700px]'>
              <ReUsableForm data={value} fieldNames={fieldNames} onSubmit={handleFormSubmit} />
            </div>
          </Modal>
        }
        {editForm &&
          <Modal isOpen={true} onClose={closeModal}>
            <div className='sm:w-[400px] md:w-[700px]'>
              <ReUsableForm data={value} setdata={setValue} fieldNames={fieldNames} onSubmit={handleFormSubmit} />
            </div>
          </Modal>
        }
        <div className='pt-20 px-10 pl-20'>
          <button
            onClick={openModal}
            className='text-white w-40 bg-green-500 rounded-lg font-bold h-12 transform transition-transform hover:scale-105 flex-shrink-0'>
            Add Course
          </button>
          <ReUsableTable columns={tableColumns} data={tableData} onEditClick={handleEditClick} onDeleteClick={handleDeleteClick} />
        </div>
      </div>
    </div>
  );
};

export default CousreAdding;
