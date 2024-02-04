import React, { useState } from 'react';
import { useFormik } from 'formik';
import Layout from '../Layout/Layout';
import { PasswordManageSerive } from '../../services/authservices';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ChangePasswordForm = () => {
  const [step, setStep] = useState(1);

  const navigate = useNavigate()

  const formikUsername = useFormik({
    initialValues: {
      username: '',
    },
    onSubmit: async (values) => {
      // Handle username submission logic here

      const response = await PasswordManageSerive.Otpsend(values)
      if (response?.status == 200) {
        toast.success("otp send is sucessfully")
        localStorage.setItem('user_id', response.data.user_id);
      }
      console.log('Username form submitted with values:', values);
      // Assuming a successful validation, proceed to the next step
      setStep(2);
    },
    validate: (values) => {
      const errors = {};

      if (!values.username) {
        errors.username = 'Required';
      }

      return errors;
    },
  });

  const formikOTP = useFormik({
    initialValues: {
      otp: '',
    },
    onSubmit: async (values) => {
      // Handle OTP submission logic here
      try {
        const response = await PasswordManageSerive.VerifyOtp(values)
        console.log("res", response)
        if (response?.status == 200) {
          toast.success("The Otp is confirmed sucessfully")
          setStep(3);
        }
        if (response?.response?.status == 401) {
          // toast.error("Invalid Otp")
          toast.error('Invalid OTP', {
            position: 'top-right',
            autoClose: 3000, // Adjust the duration as needed
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }

      } catch (error) {
      }
      console.log('OTP form submitted with values:', values);
      // Assuming a successful validation, proceed to the next step
    },
    validate: (values) => {
      const errors = {};

      if (!values.otp) {
        errors.otp = 'Required';
      } else if (!/^\d{6}$/.test(values.otp)) {
        errors.otp = 'Invalid OTP';
      }

      return errors;
    },
  });

  const formikPassword = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    onSubmit: async (values) => {
      // Handle password change logic here
      console.log('Password form submitted with values:', values);
      // Reset to the first step after successful password change
      const response = await PasswordManageSerive.ResetPassword(values)
      console.log("res:__",response)
      if (response?.status == 200) {
        toast.success("The password is reset sucessfully")
        navigate('/signin/')
      }
      if (response?.status == 400) {
        toast.error("Something went wrong!!")
      }
      // setStep(1);
    },
    validate: (values) => {
      const errors = {};

      if (!values.newPassword) {
        errors.newPassword = 'Required';
      } else if (values.newPassword.length < 8) {
        errors.newPassword = 'Password must be at least 8 characters';
      } else if (!/(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}/.test(values.newPassword)) {
        errors.newPassword =
          'Password must contain at least one letter, one digit, and one special character';
      }

      if (!values.confirmPassword) {
        errors.confirmPassword = 'Required';
      } else if (values.confirmPassword !== values.newPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }

      return errors;
    },
  });

  return (
    <section className="mt-40 md:mt-10 xl:mt-10 bg-gray-200 dark:bg-gray-900 background decoration-black">
      <Layout />
      <div className="flex flex-col items-center justify-center  md:h-screen sm:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {step === 1 ? 'Enter Username' : step === 2 ? 'Verify OTP' : 'Change Password'}
            </h1>

            {step === 1 && (
              <form onSubmit={formikUsername.handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    onChange={formikUsername.handleChange}
                    onBlur={formikUsername.handleBlur}
                    value={formikUsername.values.username}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  {formikUsername.touched.username && formikUsername.errors.username ? (
                    <div className="text-red-500 text-sm">{formikUsername.errors.username}</div>
                  ) : null}
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-950 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Next
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={formikOTP.handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label htmlFor="otp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    OTP (One-Time Password)
                  </label>
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    onChange={formikOTP.handleChange}
                    onBlur={formikOTP.handleBlur}
                    value={formikOTP.values.otp}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  {formikOTP.touched.otp && formikOTP.errors.otp ? (
                    <div className="text-red-500 text-sm">{formikOTP.errors.otp}</div>
                  ) : null}
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-950 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Next
                </button>
              </form>
            )}

            {step === 3 && (
              <form onSubmit={formikPassword.handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    onChange={formikPassword.handleChange}
                    onBlur={formikPassword.handleBlur}
                    value={formikPassword.values.newPassword}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  {formikPassword.touched.newPassword && formikPassword.errors.newPassword ? (
                    <div className="text-red-500 text-sm">{formikPassword.errors.newPassword}</div>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={formikPassword.handleChange}
                    onBlur={formikPassword.handleBlur}
                    value={formikPassword.values.confirmPassword}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  {formikPassword.touched.confirmPassword && formikPassword.errors.confirmPassword ? (
                    <div className="text-red-500 text-sm">{formikPassword.errors.confirmPassword}</div>
                  ) : null}
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-950 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Change Password
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChangePasswordForm;
