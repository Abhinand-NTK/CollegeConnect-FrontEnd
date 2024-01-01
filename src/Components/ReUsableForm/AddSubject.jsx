import React, { useState } from 'react';
import ReUsableForm from './Form';
import ReUsableTable from '../ReUsableTable/ReUsableTable';
import Layout from '../Layout/Layout';
import Modal from '../Modal/Modal';


const AddSubject = () => {
  const fieldNames = ['Name of the Course'];
  const tableColumns = ['No', 'CourseName', 'Delete', 'Edit'];

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
            <div className='sm:w-[400px] md:w-[700px]'>
              <ReUsableForm fieldNames={fieldNames} onSubmit={handleFormSubmit} />
            </div>
          </Modal>
          }
       
        {/* <div className={showForm ? 'flex-1' : 'hidden'}>
          <ReUsableForm fieldNames={fieldNames} onSubmit={handleFormSubmit} />
        </div> */}
        <div className='pt-20 px-10'>
          <button 
          onClick={openModal}
          className='text-white w-40 bg-green-500 rounded-lg font-bold h-12 transform transition-transform hover:scale-105 flex-shrink-0' onClick={handleViewForm}>
            Add Course
          </button>
          <ReUsableTable columns={tableColumns} data={tableData} />
        </div>
      </div>
    </div>
  );
};

export default AddSubject;