import React, { useEffect, useState } from 'react';
import './login.css'
import Layout from '../../Components/Layout/Layout';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './AuthThunk';
import { jwtDecode } from 'jwt-decode';
import toast, { Toaster } from 'react-hot-toast';
import { loading, selectuser } from './AuthSlice';


const AdminLogin = () => {

  const load = useSelector(loading)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setErr] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login();  // Call the login function when the form is submitted
    } catch (error) {
      console.error('Error during form submission:', error);
      // Handle errors as needed
    }
  };
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const loginpage = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };



  const login = async () => {
    try {
      dispatch(loginUser(user));
      const Token = localStorage.getItem('Token');
      const decoded = jwtDecode(Token);

      if (decoded && decoded.is_super_admin) {
        navigate('/admin/users');
      } else if (decoded && !decoded.is_super_admin) {
        toast.error('Login Permission is Restricted !!', {
          style: {
            marginTop: '100px',
          }
        });
        setErr('Login Permission is Restricted !!');
      } else {
        toast.error('Invalid Credentials!!', {
          style: {
            marginTop: '100px',
          }
        });
        setErr('Invalid Credentials !!');
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Handle error as needed (e.g., show a generic error message)
      toast.error('An error occurred during login.', {
        style: {
          marginTop: '100px',
        }
      });
      setErr('An error occurred during login.');
    }
  };


  return (
    <>
      <Layout title='Auth | Login | Login Dashboard' content='Login Dashboard page'>
        <div>
          <section className="mt-10 bg-gray-200		 dark:bg-gray-900 background decoration-black">
            <div className="flex flex-col items-center justify-center  md:h-screen sm:py-0">
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold cte leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign in as SuperAdmin
                  </h1>
                  <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Your email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={loginpage}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={loginpage}
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                    </div>
                    <div className="flex items-center justify-between">
                    </div>
                    <button
                      type="submit"
                      className="flex items-center justify-center w-full bg-indigo-950 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      {load ? (
                        <>
                          <div role="status" className="flex items-center">
                            <svg
                              aria-hidden="true"
                              className="w-5 h-5 text-green-white animate-spin dark:text-gray-600 fill-green-600 mr-2" viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051
                                 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 
                                 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094
                                  90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013
                                   9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871
                                 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 
                                 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613
                                  1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 
                                  9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735
                                   17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083
                                    38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentColor"
                              />
                            </svg>
                            <span className="sr-only">Loading...</span>
                          </div>
                          <span className="sr-only">Loading...</span>
                        </>
                      ) : (
                        "SignIn"
                      )}
                    </button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet?{' '}
                      <NavLink className="font-medium text-primary-600 hover:underline dark:text-primary-500" to='/role'>
                        Sign up
                      </NavLink>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout >
    </>
  );
};

export default AdminLogin;

