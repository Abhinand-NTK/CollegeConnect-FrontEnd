// import React, { useState } from 'react';
// import Layout from '../../Components/Layout/Layout';

// const LeaveRequestForm = () => {
//     const [submittedRequest, setSubmittedRequest] = useState({
//         name: 'John Doe',
//         leaveType: 'Vacation',
//         reason: 'Family vacation',
//         fromDate: '2024-02-01',
//         toDate: '2024-02-07',
//         status: 'Pending',
//     });

//     const handleFormSubmit = () => {
//         setSubmittedRequest({ ...submittedRequest, status: 'Submitted' });
//     };

//     return (
//         <section className='bg-white-950 p-4 md:p-10 lg:p-16 mt-8 md:mt-18 lg:mt-18 h-auto md:h-[600px]'>
//             <Layout />
//             <div className='flex flex-col md:flex-row'>
//                 <div className='md:w-1/2 pr-0 md:pr-4 mb-4 md:mb-0'>
//                     <div className='relative flex flex-col rounded-xl bg-white p-6 shadow-md'>
//                         <h3 className='block font-sans text-2xl font-semibold mb-4'>
//                             Leave Request Status
//                         </h3>
//                         <div className='mb-2'>
//                             <span className='font-bold'>Status:</span> {submittedRequest.status}
//                         </div>
//                         <div className='mb-2'>
//                             <span className='font-bold'>Submitted by:</span> {submittedRequest.name}
//                         </div>
//                     </div>
//                 </div>

//                 <div className='md:w-1/2 pl-0 md:pl-4'>
//                     <div className='relative flex flex-col rounded-xl bg-white p-6 shadow-md'>
//                         <h3 className='block font-sans text-2xl font-semibold mb-4'>
//                             Leave Request Form
//                         </h3>
//                         <div className='mb-4'>
//                             <label htmlFor='name' className='font-bold mb-1 block'>
//                                 Your Name
//                             </label>
//                             <input
//                                 id='name'
//                                 type='text'
//                                 placeholder='Your Name'
//                                 className='w-full rounded-md border border-blue-gray-200 px-3 py-2'
//                             />
//                         </div>
//                         <div className='mb-4'>
//                             <label htmlFor='leaveType' className='font-bold mb-1 block'>
//                                 Leave Type
//                             </label>
//                             <input
//                                 id='leaveType'
//                                 type='text'
//                                 placeholder='Leave Type'
//                                 className='w-full rounded-md border border-blue-gray-200 px-3 py-2'
//                             />
//                         </div>
//                         <div className='mb-4'>
//                             <label htmlFor='reason' className='font-bold mb-1 block'>
//                                 Reason for Leave
//                             </label>
//                             <textarea
//                                 id='reason'
//                                 placeholder='Reason for Leave'
//                                 rows='3'
//                                 className='w-full rounded-md border border-blue-gray-200 px-3 py-2'
//                             ></textarea>
//                         </div>
//                         <div className='mb-4'>
//                             <label htmlFor='fromDate' className='font-bold mb-1 block'>
//                                 From Date
//                             </label>
//                             <input
//                                 id='fromDate'
//                                 type='date'
//                                 className='w-full rounded-md border border-blue-gray-200 px-3 py-2'
//                             />
//                         </div>
//                         <div className='mb-4'>
//                             <label htmlFor='toDate' className='font-bold mb-1 block'>
//                                 To Date
//                             </label>
//                             <input
//                                 id='toDate'
//                                 type='date'
//                                 className='w-full rounded-md border border-blue-gray-200 px-3 py-2'
//                             />
//                         </div>
//                         <div className='flex justify-end'>
//                             <button
//                                 onClick={handleFormSubmit}
//                                 className='bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600'
//                             >
//                                 Submit Request
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default LeaveRequestForm;

// import React from 'react';
// import { useForm, Controller } from 'react-hook-form';  // Import the necessary functions
// import Layout from '../../Components/Layout/Layout';

// const LeaveRequestForm = () => {
//     const {
//         control,
//         handleSubmit,
//         formState: { errors },
//         register,  // Make sure to include register in the destructuring assignment
//     } = useForm();

//     const onSubmit = (data) => {
//         // Handle form submission logic
//         console.log(data);
//     };

//     const [submittedRequest, setSubmittedRequest] = useState({
//         name: 'John Doe',
//         leaveType: 'Vacation',
//         reason: 'Family vacation',
//         fromDate: '2024-02-01',
//         toDate: '2024-02-07',
//         status: 'Pending',
//     });

//     const handleFormSubmit = () => {
//         setSubmittedRequest({ ...submittedRequest, status: 'Submitted' });
//     };

//     return (
//         <section className='bg-white-950 p-4 md:p-10 lg:p-16 mt-8 md:mt-18 lg:mt-18 h-auto md:h-[600px]'>
//             <Layout />
//             <div className='flex flex-col md:flex-row'>
//                 <div className='md:w-1/2 pr-0 md:pr-4 mb-4 md:mb-0'>
//                     <div className='relative flex flex-col rounded-xl bg-white p-6 shadow-md'>
//                         <h3 className='block font-sans text-2xl font-semibold mb-4'>
//                             Leave Request Status
//                         </h3>
//                         <div className='mb-2'>
//                             <span className='font-bold'>Status:</span> {submittedRequest.status}
//                         </div>
//                         <div className='mb-2'>
//                             <span className='font-bold'>Submitted by:</span> {submittedRequest.name}
//                         </div>
//                     </div>
//                 </div>

//                 <div className='md:w-1/2 pl-0 md:pl-4'>
//                     <form onSubmit={handleSubmit(onSubmit)}>
//                         <div className='relative flex flex-col rounded-xl bg-white p-6 shadow-md'>
//                             <h3 className='block font-sans text-2xl font-semibold mb-4'>
//                                 Leave Request Form
//                             </h3>

//                             <div className='mb-4'>
//                                 <label htmlFor='name' className='font-bold mb-1 block'>
//                                     Your Name
//                                 </label>
//                                 <input
//                                     id='name'
//                                     type='text'
//                                     placeholder='Your Name'
//                                     className='w-full rounded-md border border-blue-gray-200 px-3 py-2'
//                                 />
//                             </div>
//                             <div className='mb-4'>
//                                 <label htmlFor='leaveType' className='font-bold mb-1 block'>
//                                     Leave Type
//                                 </label>
//                                 <input
//                                     id='leaveType'
//                                     type='text'
//                                     placeholder='Leave Type'
//                                     className='w-full rounded-md border border-blue-gray-200 px-3 py-2'
//                                 />
//                             </div>
//                             <div className='mb-4'>
//                                 <label htmlFor='reason' className='font-bold mb-1 block'>
//                                     Reason for Leave
//                                 </label>
//                                 <textarea
//                                     id='reason'
//                                     placeholder='Reason for Leave'
//                                     rows='3'
//                                     className='w-full rounded-md border border-blue-gray-200 px-3 py-2'
//                                 ></textarea>
//                             </div>
//                             <div className='mb-4'>
//                                 <label htmlFor='fromDate' className='font-bold mb-1 block'>
//                                     From Date
//                                 </label>
//                                 <input
//                                     id='fromDate'
//                                     type='date'
//                                     className='w-full rounded-md border border-blue-gray-200 px-3 py-2'
//                                 />
//                             </div>
//                             <div className='mb-4'>
//                                 <label htmlFor='toDate' className='font-bold mb-1 block'>
//                                     To Date
//                                 </label>
//                                 <input
//                                     id='toDate'
//                                     type='date'
//                                     className='w-full rounded-md border border-blue-gray-200 px-3 py-2'
//                                 />
//                             </div>

//                             {/* Add other form fields with similar pattern */}

//                             <div className='mb-4'>
//                                 <label htmlFor='leaveType' className='font-bold mb-1 block'>
//                                     Leave Type
//                                 </label>
//                                 <Controller
//                                     control={control}
//                                     name='leaveType'
//                                     render={({ field }) => (
//                                         <select
//                                             {...field}
//                                             className={`w-full rounded-md border ${errors.leaveType
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
//                                 {errors.leaveType && (
//                                     <span className='text-red-500 text-sm mt-1'>
//                                         {errors.leaveType.message}
//                                     </span>
//                                 )}
//                             </div>

//                             {/* Other form fields go here */}

//                             <div className='flex justify-end'>
//                                 <button
//                                     type='submit'
//                                     className='bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600'
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


import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Layout from '../../Components/Layout/Layout';

const LeaveRequestForm = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        register,
    } = useForm();

    const [submittedRequest, setSubmittedRequest] = useState({
        name: 'John Doe',
        leaveType: 'Vacation',
        reason: 'Family vacation',
        fromDate: '2024-02-01',
        toDate: '2024-02-07',
        status: 'Pending',
    });

    const onSubmit = (data) => {
        // Handle form submission logic
        console.log(data);
        setSubmittedRequest({ ...data, status: 'Submitted' });
    };

    return (
        <section className='bg-white-950 p-4 md:p-10 lg:p-16 mt-8 md:mt-18 lg:mt-18 h-auto md:h-[600px]'>
            <Layout />
            <div className='flex flex-col ml-24 mt-20 md:flex-row'>
                <div className='md:w-1/2 pr-0 md:pr-4 mb-4 md:mb-0'>
                    <div className='relative flex flex-col rounded-xl bg-white p-6 shadow-md'>
                        <h3 className='block font-sans text-2xl font-semibold mb-4'>
                            Leave Request Status
                        </h3>
                        <div className='mb-2'>
                            <span className='font-bold'>Status:</span> {submittedRequest.status}
                        </div>
                        <div className='mb-2'>
                            <span className='font-bold'>Submitted by:</span> {submittedRequest.name}
                        </div>
                    </div>
                </div>

                <div className='md:w-1/2 pl-0 md:pl-4'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='relative flex flex-col rounded-xl bg-white p-6 shadow-md'>
                            <h3 className='block font-sans text-2xl font-semibold mb-4'>
                                Leave Request Form
                            </h3>

                            <div className='mb-4'>
                                <label htmlFor='name' className='font-bold mb-1 block'>
                                    Your Name
                                </label>
                                <input
                                    {...register('name', { required: 'Name is required' })}
                                    type='text'
                                    placeholder='Your Name'
                                    className={`w-full rounded-md border ${
                                        errors.name ? 'border-red-500' : 'border-blue-gray-200'
                                    } px-3 py-2`}
                                />
                                {errors.name && (
                                    <span className='text-red-500 text-sm mt-1'>
                                        {errors.name.message}
                                    </span>
                                )}
                            </div>

                            <div className='mb-4'>
                                <label htmlFor='leaveType' className='font-bold mb-1 block'>
                                    Leave Type
                                </label>
                                <Controller
                                    control={control}
                                    name='leaveType'
                                    render={({ field }) => (
                                        <select
                                            {...field}
                                            className={`w-full rounded-md border ${
                                                errors.leaveType
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
                                {errors.leaveType && (
                                    <span className='text-red-500 text-sm mt-1'>
                                        {errors.leaveType.message}
                                    </span>
                                )}
                            </div>

                            <div className='mb-4'>
                                <label htmlFor='reason' className='font-bold mb-1 block'>
                                    Reason for Leave
                                </label>
                                <textarea
                                    {...register('reason', { required: 'Reason is required' })}
                                    placeholder='Reason for Leave'
                                    rows='3'
                                    className={`w-full rounded-md border ${
                                        errors.reason ? 'border-red-500' : 'border-blue-gray-200'
                                    } px-3 py-2`}
                                ></textarea>
                                {errors.reason && (
                                    <span className='text-red-500 text-sm mt-1'>
                                        {errors.reason.message}
                                    </span>
                                )}
                            </div>

                            <div className='mb-4'>
                                <label htmlFor='fromDate' className='font-bold mb-1 block'>
                                    From Date
                                </label>
                                <input
                                    {...register('fromDate', {
                                        required: 'From Date is required',
                                    })}
                                    type='date'
                                    min={new Date().toISOString().split('T')[0]}
                                    className={`w-full rounded-md border ${
                                        errors.fromDate ? 'border-red-500' : 'border-blue-gray-200'
                                    } px-3 py-2`}
                                />
                                {errors.fromDate && (
                                    <span className='text-red-500 text-sm mt-1'>
                                        {errors.fromDate.message}
                                    </span>
                                )}
                            </div>

                            <div className='mb-4'>
                                <label htmlFor='toDate' className='font-bold mb-1 block'>
                                    To Date
                                </label>
                                <input
                                    {...register('toDate', {
                                        required: 'To Date is required',
                                    })}
                                    type='date'
                                    min={new Date().toISOString().split('T')[0]}
                                    className={`w-full rounded-md border ${
                                        errors.toDate ? 'border-red-500' : 'border-blue-gray-200'
                                    } px-3 py-2`}
                                />
                                {errors.toDate && (
                                    <span className='text-red-500 text-sm mt-1'>
                                        {errors.toDate.message}
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
