import React, { useEffect, useState } from 'react';
import ReUsableForm from './Form';
import ReUsableTable from '../ReUsableTable/ReUsableTable';
import Layout from '../Layout/Layout';
import Modal from '../Modal/Modal';
import { CollgeAdminServices } from '../../services/authservices';
import toast from 'react-hot-toast';




const AddStaff = () => {
  const fieldNames = ['email', 'first_name', 'last_name', 'role', 'age',
    'city', 'state', 'zip_code', 'address ', 'phone_number',
  ];
  const tableColumns = ['email', 'first_name', 'last_name', 'role', 'age',
    'city', 'state', 'zip_code', 'address ', 'phone_number', 'Edit', 'Block', 'CreateAccount'
  ];
  // State to manage the table data
  const [tableData, setTableData] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editForm, setEditForm] = useState(false);

  // Effect to fetch data and update the tableData
  const fetchData = async () => {
    try {
      const response = await CollgeAdminServices.getStaffDetails();
      // Assuming the response contains an array of courses with 'id' and 'coursename' properties
      const staffs = response.map((student) => student.staff_details);

      // Create table data dynamically based on the courses
      const newTableData = response.map((staff, index) => ({
        no: index + 1,
        email: staff.staff_details.email,
        first_name: staff.staff_details.first_name,
        last_name: staff.staff_details.last_name,
        age: staff.staff_details.age,
        // role: staff[index].is_hod !== null ? 'hod' : 'teacher',
        zip_code: staff.staff_details.zip_code,
        address: staff.staff_details.address,
        city: staff.staff_details.city,
        state: staff.staff_details.state,
        email_sent: staff.staff_details.email_sent,
        phone_number: staff.staff_details.phone_number,
        delete: staff.staff_details.id,  // Set the 'id' as the delete value
        edit: staff.staff_details.id,    // Set the 'id' as the edit value
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
  const [email, setEmails] = useState([]);


  const emails = async () => {
    try {
      const response = await CollgeAdminServices.usedEmails()
      setEmails(response?.emails)
      console.log('email', response)
    } catch (error) {

    }
  }

  useEffect(() => {
    emails()
  }, [])



  const handleFormSubmit = async (formData) => {

    console.log("onsubmitting", formData['email'])
    if (!email.includes(formData['email'])) {
      if (!value) {
        try {
          const response = await CollgeAdminServices.AddStaff(formData)
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
          const response = await CollgeAdminServices.editStaff(formData)
          if (response.status === 200) {
            closeModal()
            fetchData()
          }
        }
        catch (error) {
          console.log(error)
        }
      }
    } else {
      if (value) {
        try {
          const response = await CollgeAdminServices.editStaff(formData)
          if (response.status === 200) {
            closeModal()
            fetchData()
          }
        }
        catch (error) {
          console.log(error)
        }
      }
      else {
        toast.error("The email is alredy exist !!")
      }
    }
  };



  const handleEditClick = (rowData) => {
    setValue(rowData)
    openModal()

  };


  const handleDeleteClick = async (rowData) => {
    try {
      const response = await CollgeAdminServices.blockStaff(rowData.delete)
      if (response.status == 200) {
        toast.success('The User is BLocked successfully')
      }
    } catch (error) {
      console.log(error)
    }
  };




  const handleClickCreateStudentAccount = async (formData) => {
    try {
      const response = await CollgeAdminServices.createUser(formData)
      if (response.status === 200) {
        // Show success toast message
        toast.success('Your College is registered Successfully', {
          style: {
            marginTop: '100px',
          },
          autoClose: 6000, // Set the duration for which the toast is visible (in milliseconds)
        });
      } else {
        // Show a generic error toast message if the response status is not 200
        toast.error('Failed to create user account. Please try again.');
      }
    } catch (error) {
      console.log(error)
      toast.error('An error occurred while creating the user account.');
    }

  }


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
      <div className='bg-white h-screen flex flex-col'>
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
            Add Staff
          </button>
          <ReUsableTable className='w-[100px]' columns={tableColumns} data={tableData} onEditClick={handleEditClick} onDeleteClick={handleDeleteClick} onCreateUserClick={handleClickCreateStudentAccount} />
        </div>
      </div>
    </div>
  );
};

export default AddStaff;
