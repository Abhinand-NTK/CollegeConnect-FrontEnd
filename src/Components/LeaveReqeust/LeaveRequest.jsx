


// import React, { useEffect, useState } from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import Layout from '../../Components/Layout/Layout';
// import { StaffUserServices, StudentUserServices } from '../../services/authservices';
// import UserDetails from '../../BlogPost/UserDetails';
// import toast from 'react-hot-toast';


// const LeaveRequestForm = () => {

//     const [userdetailss, setUserDetails] = useState([])
//     const [studentUserDetails, setStudentUserDetails] = useState([])
//     const [submittedRequest, setSubmittedRequest] = useState([]);


//     const userdetails = async () => {

//         try {
//             const response = await StaffUserServices.UserDetails()
//             console.log(response)
//             if (response?.staff) {
//                 setUserDetails(response?.staff)
//             }
//             else {
//                 setUserDetails(response?.student)
//             }
//             if (response.student.id || response.staff.id) {
//                 GetRequestStatus(response.student.id || response.staff.id)
//             }

//         } catch (error) {
//             console.log(error)
//         }
//     }


//     const onSubmit = async (data) => {
//         // Handle form submission logic
//         console.log(data);
//         data.requestor = userdetailss ? userdetailss?.id : studentUserDetails?.id
//         console.log(data);
//         console.log(UserDetails.id)

//         setSubmittedRequest({ ...data, status: 'Submitted' });
//         try {
//             const response = await StudentUserServices.RequestingForLeave(data)
//             console.log(response)
//             if (response.status == 201) {
//                 toast.success('The Reqeust is submitted successfully')
//                 GetRequestStatus(userdetailss.id)
//             }
//         } catch (error) {
//             console.log(error)
//         }
//     };


//     const GetRequestStatus = async (id) => {
//         try {
//             if (userdetails) {
//                 console.log("This is the id for retrieve:----", id);
//                 const response = await StudentUserServices.GetReqeustStatus(id);
//                 console.log(response);
//                 // Assuming response.data is an object with the desired properties
//                 setSubmittedRequest(response?.data);
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };
//     useEffect(() => {
//         userdetails()
//     }, [])




//     const {
//         control,
//         handleSubmit,
//         formState: { errors },
//         register,
//     } = useForm();






//     return (
//         <section className='bg-white-950 p-4 md:p-10 lg:p-16 mt-8 md:mt-18 lg:mt-18 h-auto md:h-[600px]'>
//             <Layout />
//             <div className='flex flex-col ml-24 mt-20 md:flex-row'>
//                 <div className='md:w-1/2 pr-0 md:pr-4 mb-4 md:mb-0'>
//                     <div className='relative flex flex-col rounded-xl bg-white p-6 shadow-md'>
//                         <h3 className='block font-sans text-2xl font-semibold mb-4'>
//                             Leave Request Status
//                         </h3>
//                         {/* {
//                          submittedRequest.length == 0 && 
//                          <p>Not yet any requests</p>   
//                         } */}
//                         {
//                             submittedRequest.map((requests, index) => (
//                                 <div key={index} className='bg-indigo-700 text-white opacity-40 shadow-md rounded-sm  mt-3'>
//                                     <div className='mb-2 ml-2'>
//                                         <span className='font-bold'>leaveType:</span> {requests.leavetype}
//                                     </div><div className='mb-2 ml-2'>
//                                         <span className='font-bold'>Time Period</span> {submittedRequest.from_date} to {submittedRequest.to_date}
//                                     </div>
//                                     <div className='mb-2 ml-2'>
//                                         <span className='font-bold'>Status:</span> {submittedRequest.approval_status ? 'Approved' : 'Pending'}
//                                     </div>
//                                 </div>

//                             ))
//                         }
//                     </div>
//                 </div>

//                 <div className='md:w-1/2 pl-0 md:pl-4'>
//                     <form onSubmit={handleSubmit(onSubmit)}>
//                         <div className='relative flex flex-col rounded-xl bg-white p-6 shadow-md'>
//                             <h3 className='block font-sans text-2xl font-semibold mb-4'>
//                                 Leave Request Form
//                             </h3>

//                             <div className='mb-4'>
//                                 <label htmlFor='requestor' className='font-bold mb-1 block'>
//                                     Your Name
//                                 </label>
//                                 <input
//                                     {...register('requestor', { required: 'Name is required' })}
//                                     type='text'
//                                     placeholder={userdetailss ? userdetailss.name : studentUserDetails ? studentUserDetails.name : 'Your Name'}
//                                     className={`w-full rounded-md border ${errors.requestor ? 'border-red-500' : 'border-blue-gray-200'
//                                         } px-3 py-2`}
//                                 />
//                                 {errors.requestor && (
//                                     <span className='text-red-500 text-sm mt-1'>
//                                         {errors.requestor.message}
//                                     </span>
//                                 )}
//                             </div>

//                             <div className='mb-4'>
//                                 <label htmlFor='leavetype' className='font-bold mb-1 block'>
//                                     Leave Type
//                                 </label>
//                                 <Controller
//                                     control={control}
//                                     name='leavetype'
//                                     render={({ field }) => (
//                                         <select
//                                             {...field}
//                                             className={`w-full rounded-md border ${errors.leavetype
//                                                 ? 'border-red-500'
//                                                 : 'border-blue-gray-200'
//                                                 } px-3 py-2`}
//                                         >
//                                             <option value=''>Select Leave Type</option>
//                                             <option value='Vacation'>Vacation</option>
//                                             <option value='Sick Leave'>Sick Leave</option>
//                                             {/* Add other leave types */}
//                                         </select>
//                                     )}
//                                     rules={{ required: 'Leave Type is required' }}
//                                 />
//                                 {errors.leavetype && (
//                                     <span className='text-red-500 text-sm mt-1'>
//                                         {errors.leavetype.message}
//                                     </span>
//                                 )}
//                             </div>

//                             <div className='mb-4'>
//                                 <label htmlFor='reasonforleave' className='font-bold mb-1 block'>
//                                     Reason for Leave
//                                 </label>
//                                 <textarea
//                                     {...register('reasonforleave', { required: 'Reason is required' })}
//                                     placeholder='Reason for Leave'
//                                     rows='3'
//                                     className={`w-full rounded-md border ${errors.reasonforleave ? 'border-red-500' : 'border-blue-gray-200'
//                                         } px-3 py-2`}
//                                 ></textarea>
//                                 {errors.reasonforleave && (
//                                     <span className='text-red-500 text-sm mt-1'>
//                                         {errors.reasonforleave.message}
//                                     </span>
//                                 )}
//                             </div>

//                             <div className='mb-4'>
//                                 <label htmlFor='from_date' className='font-bold mb-1 block'>
//                                     From Date
//                                 </label>
//                                 <input
//                                     {...register('from_date', {
//                                         required: 'From Date is required',
//                                     })}
//                                     type='date'
//                                     min={new Date().toISOString().split('T')[0]}
//                                     className={`w-full rounded-md border ${errors.from_date ? 'border-red-500' : 'border-blue-gray-200'
//                                         } px-3 py-2`}
//                                 />
//                                 {errors.from_date && (
//                                     <span className='text-red-500 text-sm mt-1'>
//                                         {errors.from_date.message}
//                                     </span>
//                                 )}
//                             </div>

//                             <div className='mb-4'>
//                                 <label htmlFor='to_date' className='font-bold mb-1 block'>
//                                     To Date
//                                 </label>
//                                 <input
//                                     {...register('to_date', {
//                                         required: 'To Date is required',
//                                     })}
//                                     type='date'
//                                     min={new Date().toISOString().split('T')[0]}
//                                     className={`w-full rounded-md border ${errors.to_date ? 'border-red-500' : 'border-blue-gray-200'
//                                         } px-3 py-2`}
//                                 />
//                                 {errors.to_date && (
//                                     <span className='text-red-500 text-sm mt-1'>
//                                         {errors.to_date.message}
//                                     </span>
//                                 )}
//                             </div>

//                             <div className='flex justify-end'>
//                                 <button
//                                     type='submit'
//                                     className='bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600'
//                                 >
//                                     Submit Request
//                                 </button>
//                             </div>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default LeaveRequestForm;


import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Layout from '../../Components/Layout/Layout';
import { StaffUserServices, StudentUserServices } from '../../services/authservices';
import UserDetails from '../../BlogPost/UserDetails';
import toast from 'react-hot-toast';

const LeaveRequestForm = () => {
    const [userdetailss, setUserDetails] = useState([]);
    const [studentUserDetails, setStudentUserDetails] = useState([]);
    const [submittedRequest, setSubmittedRequest] = useState([]);

    const userdetails = async () => {
        try {
            const response = await StaffUserServices.UserDetails();
            console.log(response);
            if (response?.staff) {
                setUserDetails([response?.staff]); // Assuming staff is an object, wrap it in an array
            } else {
                setUserDetails([response?.student]); // Assuming student is an object, wrap it in an array
            }
            if (response.student?.id || response.staff?.id) {
                GetRequestStatus(response.student?.id || response.staff?.id);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onSubmit = async (data) => {
        console.log(data);
        data.requestor = userdetailss.length > 0 ? userdetailss[0].id : studentUserDetails?.id;
        console.log(data);
        // console.log(UserDetails.id);

        setSubmittedRequest({ ...data, status: 'Submitted' });
        try {
            const response = await StudentUserServices.RequestingForLeave(data);
            console.log(response);
            if (response.status == 201) {
                toast.success('The Request is submitted successfully');
                GetRequestStatus(userdetailss.length > 0 ? userdetailss[0].id : studentUserDetails?.id);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const GetRequestStatus = async (id) => {
        try {
            const id_ = userdetailss?.id;
            if (id) {
                console.log("This is the id for retrieve:----", id);
                const response = await StudentUserServices.GetReqeustStatus(id || id_);
                console.log(response);
                setSubmittedRequest(response?.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        userdetails();
    }, []);

    const {
        control,
        handleSubmit,
        formState: { errors },
        register,
    } = useForm();

    return (
        <section className='bg-white-950 p-4 md:p-10 lg:p-16 mt-8 md:mt-18 lg:mt-18 h-auto md:h-[600px]'>
            <Layout />
            <div className='flex flex-col ml-24 mt-20 md:flex-row'>
                <div className='md:w-1/2 pr-0 md:pr-4 mb-4 md:mb-0'>
                    <div className='relative flex flex-col rounded-xl bg-white p-6 shadow-md'>
                        <h3 className='block font-sans text-2xl font-semibold mb-4'>
                            Leave Request Status
                        </h3>
                        {/* <p>
                            {
                                Object.keys(submittedRequest).map(i => <p>{submittedRequest[i]._id}</p>)
                            }
                        </p> */}
                        {/* {Object.keys(submittedRequest)?.map((requests, index) => (
                            <div key={index} className='bg-indigo-700 text-white opacity-40 shadow-md rounded-sm  mt-3'>
                                <div className='mb-2 ml-2'>
                                    <span className='font-bold'>leaveType:</span> {requests.leavetype}
                                </div>
                                <div className='mb-2 ml-2'>
                                    <span className='font-bold'>Time Period</span> {requests.from_date} to {requests.to_date}
                                </div>
                                <div className='mb-2 ml-2'>
                                    <span className='font-bold'>Status:</span> {requests.approval_status ? 'Approved' : 'Pending'}
                                </div>
                            </div>
                        ))} */}
                        {Object.keys(submittedRequest).map((key, index) => (
                            <div key={index} className='bg-indigo-700 p-4 text-white opacity-40 shadow-md rounded-lg mt-3'>
                                <div className='mb-2 ml-4 '>
                                    <span className='font-bold'>leaveType:</span> {submittedRequest[key].leavetype}
                                </div>
                                <div className='mb-2 ml-4'>
                                    <span className='font-bold'>Time Period</span> {submittedRequest[key].from_date} to {submittedRequest[key].to_date}
                                </div>
                                <div className='mb-2 ml-4'>
                                    <span className='font-bold'>Status:</span> {submittedRequest[key].approval_status ? 'Approved' : 'Pending'}
                                </div>
                            </div>
                        ))}

                    </div>
                </div>

                <div className='md:w-1/2 pl-0 md:pl-4'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='relative flex flex-col rounded-xl bg-white p-6 shadow-md'>
                            <h3 className='block font-sans text-2xl font-semibold mb-4'>
                                Leave Request Form
                            </h3>

                            <div className='mb-4'>
                                <label htmlFor='requestor' className='font-bold mb-1 block'>
                                    Your Name
                                </label>
                                <input
                                    {...register('requestor', { required: 'Name is required' })}
                                    type='text'
                                    placeholder={userdetailss ? userdetailss.name : studentUserDetails ? studentUserDetails.name : 'Your Name'}
                                    className={`w-full rounded-md border ${errors.requestor ? 'border-red-500' : 'border-blue-gray-200'
                                        } px-3 py-2`}
                                />
                                {errors.requestor && (
                                    <span className='text-red-500 text-sm mt-1'>
                                        {errors.requestor.message}
                                    </span>
                                )}
                            </div>

                            <div className='mb-4'>
                                <label htmlFor='leavetype' className='font-bold mb-1 block'>
                                    Leave Type
                                </label>
                                <Controller
                                    control={control}
                                    name='leavetype'
                                    render={({ field }) => (
                                        <select
                                            {...field}
                                            className={`w-full rounded-md border ${errors.leavetype
                                                ? 'border-red-500'
                                                : 'border-blue-gray-200'
                                                } px-3 py-2`}
                                        >
                                            <option value=''>Select Leave Type</option>
                                            <option value='Vacation'>Vacation</option>
                                            <option value='Sick Leave'>Sick Leave</option>
                                            {/* Add other leave types */}
                                        </select>
                                    )}
                                    rules={{ required: 'Leave Type is required' }}
                                />
                                {errors.leavetype && (
                                    <span className='text-red-500 text-sm mt-1'>
                                        {errors.leavetype.message}
                                    </span>
                                )}
                            </div>

                            <div className='mb-4'>
                                <label htmlFor='reasonforleave' className='font-bold mb-1 block'>
                                    Reason for Leave
                                </label>
                                <textarea
                                    {...register('reasonforleave', { required: 'Reason is required' })}
                                    placeholder='Reason for Leave'
                                    rows='3'
                                    className={`w-full rounded-md border ${errors.reasonforleave ? 'border-red-500' : 'border-blue-gray-200'
                                        } px-3 py-2`}
                                ></textarea>
                                {errors.reasonforleave && (
                                    <span className='text-red-500 text-sm mt-1'>
                                        {errors.reasonforleave.message}
                                    </span>
                                )}
                            </div>

                            <div className='mb-4'>
                                <label htmlFor='from_date' className='font-bold mb-1 block'>
                                    From Date
                                </label>
                                <input
                                    {...register('from_date', {
                                        required: 'From Date is required',
                                    })}
                                    type='date'
                                    min={new Date().toISOString().split('T')[0]}
                                    className={`w-full rounded-md border ${errors.from_date ? 'border-red-500' : 'border-blue-gray-200'
                                        } px-3 py-2`}
                                />
                                {errors.from_date && (
                                    <span className='text-red-500 text-sm mt-1'>
                                        {errors.from_date.message}
                                    </span>
                                )}
                            </div>

                            <div className='mb-4'>
                                <label htmlFor='to_date' className='font-bold mb-1 block'>
                                    To Date
                                </label>
                                <input
                                    {...register('to_date', {
                                        required: 'To Date is required',
                                    })}
                                    type='date'
                                    min={new Date().toISOString().split('T')[0]}
                                    className={`w-full rounded-md border ${errors.to_date ? 'border-red-500' : 'border-blue-gray-200'
                                        } px-3 py-2`}
                                />
                                {errors.to_date && (
                                    <span className='text-red-500 text-sm mt-1'>
                                        {errors.to_date.message}
                                    </span>
                                )}
                            </div>

                            <div className='flex justify-end'>
                                <button
                                    type='submit'
                                    className='bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600'
                                >
                                    Submit Request
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default LeaveRequestForm;
