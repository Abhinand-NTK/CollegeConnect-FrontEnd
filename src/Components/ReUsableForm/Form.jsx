

import React, { useState, useEffect } from 'react';
import { CollgeAdminServices, userService } from '../../services/authservices';
import { selectuser } from '../../features/Login/AuthSlice';


const ReUsableForm = ({ fieldNames, onSubmit, data, setdata }) => {
  const [formData, setFormData] = useState(
    fieldNames.reduce((acc, fieldName) => {
      acc[fieldName] = '';
      return acc;
    }, {})
  );

  //Get user id from the token

  const id = userService.gettingIdOfUser();

  // Get the course details from the backend

  let [departments, setDepartments] = useState([]);
  const GetDepartments = async () => {
    const fetchedDepartments = await CollgeAdminServices.GetCourse();

    setDepartments(fetchedDepartments);
  };

  let [staffs, setStaffs] = useState([]);

  const getStaffs = async () => {
    const fetchedStaffs = await CollgeAdminServices.getStaffDetails();
    console.log(fetchedStaffs)
    const staffs = fetchedStaffs.map((student) => student.staff_details);
    console.log(staffs.map((s)=>s.id))
    setStaffs(staffs)
  }

  let [sessions, setSessions] = useState([])
  const GetSessions = async () => {
    const fetchsessions = await CollgeAdminServices.getSession();
    setSessions(fetchsessions)
  }



  useEffect(() => {
    GetDepartments();
    getStaffs();
    GetSessions();
  }, []);



  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (data) {
      setdata((prevData) => ({
        ...prevData,
        [name]: value,
        id: id,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        id: id,
      }));
    }
  }; // <-- Missing closing brace

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };


  return (
    <>
      <form className='mx-auto bg-white p-10' onSubmit={handleSubmit}>
        {fieldNames.map((fieldName) => (
          <div key={fieldName} className='mb-4'>
            <label htmlFor={fieldName} className='block text-gray-700 text-sm font-bold mb-2'>
              {fieldName === 'name' ? 'Name' : fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}:
            </label>
            {fieldName === 'course' ? (
              <select
                id={fieldName}
                name={fieldName}
                onChange={handleInputChange}
                value={data ? data[fieldName] : formData[fieldName]}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                required
              >
                {departments.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.coursename}
                  </option>
                ))}
              </select>
            ) :
              fieldName === 'start_year' || fieldName === 'end_year' ? (
                <input
                  type='date'
                  id={fieldName}
                  name={fieldName}
                  value={data ? data[fieldName] : formData[fieldName]}
                  onChange={handleInputChange}
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
              ) :
                fieldName === 'session' ? (
                  <select
                    id={fieldName}
                    name={fieldName}
                    onChange={handleInputChange}
                    value={data ? data[fieldName] : formData[fieldName]}
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    required
                  >
                    {sessions.map((session) => (
                      <option key={session.id} value={session.id} className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                        {session.start_year} to {session.end_year}
                      </option>
                    ))}
                  </select>
                )

                  : fieldName === 'staff' ? (
                    <select
                      id={fieldName}
                      name={fieldName}
                      onChange={handleInputChange}
                      value={data ? data[fieldName] : formData[fieldName]}
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      required
                    >
                      {staffs.map((staff) => (
                        <option key={staff.id} value={staff.id}>
                          {staff.first_name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={fieldName === 'email' ? 'email' : 'text'}
                      id={fieldName}
                      name={fieldName}
                      value={data ? data[fieldName] : formData[fieldName]}
                      onChange={handleInputChange}
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                  )}
          </div>
        ))}
        <button
          type='submit'
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          {data ? 'Update' : 'Submit'}
        </button>
      </form>


    </>
  );
};

export default ReUsableForm;
