import React, { useState } from 'react';
import './login.css'
import Layout from '../../Components/Layout/Layout';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from './AuthThunk';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';



const Login = () => {

  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [err, setError] = useState();
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const loginpage = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // const login = async () => {
  //   dispatch(loginUser(user));
  //   const Token = localStorage.getItem('Token');
  //   const decoded = jwtDecode(Token);

  //   console.log('Token is this',decoded)

  //   if (decoded && ! decoded.is_super_admin && decoded.user_type == "1" ) {
  //     Navigate('/admin/landing');
  //   } else if(user&&!decoded.is_super_admin) {
  //     toast.error('Login Permission is Restricted !!', {
  //       style: {
  //         marginTop: '100px',
  //       }
  //     });
  //     setError('Login Permission is Restricted !!');
  //   }
  // };

  const login = async () => {
    dispatch(loginUser(user));
    const Token = localStorage.getItem('Token');
    const decoded = jwtDecode(Token);

    console.log('Token is this', decoded);

    if (decoded) {
      if (decoded.is_super_admin) {
        // Warn super admin about restricted login
        toast.warning('Super Admin login is restricted!', {
          style: {
            marginTop: '100px',
          },
        });
        setError('Super Admin login is restricted!');
      } else if (decoded && decoded.user_type === "1") {
        Navigate('/admin/landing');
      } else if (decoded.user_type === "2") {
        Navigate('/manage');
      }
      else if (decoded.user_type === "3") {
        Navigate('/manage');
      } else {
        toast.error('Invalid user type or permission!', {
          style: {
            marginTop: '100px',
          },
        });
        setError('Invalid user type or permission!');
      }
    }
  };



  return (
    <>
      <Layout title='Auth | Login | Login Dashboard' content='Login Dashboard page'>
        <div>
          {/* bg-slate-900	 */}
          <section className="mt-40 md:mt-10 xl:mt-10 bg-indigo-950 dark:bg-gray-900 background decoration-black">
            <div className="flex flex-col items-center justify-center  md:h-screen sm:py-0">
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign in to your account
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
                        type="text"
                        name="password"
                        onChange={loginpage}
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="remember"
                            aria-describedby="remember"
                            type="checkbox"
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                            required
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                            Remember me
                          </label>
                        </div>
                      </div>
                      <a href="/" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                        Forgot password?
                      </a>
                    </div>
                    <button
                      type="submit"
                      onClick={login}
                      className="w-full bg-indigo-950 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Sign in
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

export default Login;
