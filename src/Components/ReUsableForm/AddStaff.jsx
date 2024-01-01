import React, { useState } from 'react';
import ReUsableForm from './Form';
import ReUsableTable from '../ReUsableTable/ReUsableTable';
import Layout from '../Layout/Layout';
import Modal from '../Modal/Modal';


const AddStaff = () => {
const fieldNames = ['first_name', 'last_name', 'user_image', 'age', 'department', 'register_no',
  'start_date', 'end_date', 'city', 'state', 'zip_code', 'address ', 'phone_number',
];
  const tableColumns = ['first_name', 'last_name', 'user_image', 'age', 'department', 'register_no',
  'start_date', 'end_date', 'city', 'state', 'zip_code', 'address ', 'phone_number',
];

  const tableData = [
    { no: 1, coursename: 'ABC University', delete: 'CA', edit: 'abc@example.com' }
  ];

  const handleFormSubmit = (formData) => {
    console.log('Form submitted:', formData);
  };

  const [showForm, setShowForm] = useState(false);

  const handleViewForm = () => {
    setShowForm(!showForm);
  };

  const openModal = ()=>{
    setShowForm(true)
  }

  const closeModal = ()=>{
    setShowForm(false)
  }
  

  return (
    <div className='h-screen'>
      <Layout />
      <div className='bg-indigo-950 h-screen flex flex-col'>

       {showForm &&
          <Modal isOpen={true} onClose={closeModal}>
            <div className='sm:w-[400px] md:w-[700px] h-96 overflow-y-scroll overflow-hidden scrollbar-hide '>
              <ReUsableForm fieldNames={fieldNames} onSubmit={handleFormSubmit} />
            </div>
          </Modal>
          }
    
        <div className='pt-20 px-10 ml-20'>
          <button 
          onClick={openModal}
          className='text-white w-40 bg-green-500 rounded-lg font-bold h-12 transform transition-transform hover:scale-105 flex-shrink-0' onClick={handleViewForm}>
            Add Staff
          </button>
          <ReUsableTable columns={tableColumns} data={tableData} />
        </div>
      </div>
    </div>
  );
};

export default AddStaff;
