import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import axios from 'axios';
import validator from 'validator';
import { userService } from '../../services/authservices';
import toast from 'react-hot-toast';
import Spinner from '../Spinner/Spinner';




const RegisterCollege = () => {

    const [colleges, setColleges] = useState([]);
    const [state, setState] = useState('kerala');
    const [states, setStates] = useState([]);
    const [error, setError] = useState('')


    const [formData, setFormData] = useState({
        collegename: '',
        state: '',
        email: '',
    })

    const [errors, setErrors] = useState({
        collegename: '',
        state: '',
        email: '',
    })

    const selectState = async (state) => {
        const selectedState = state;
        setState(selectedState);
        const collegesResponse = await axios.get(`http://localhost:3000/colleges/state/?states=${selectedState}`);
        setColleges(collegesResponse.data);
    };


    const handleSubmit = (event) => {

        // Extract the name and value from the form element
        const { name, value } = event.target;

        // Call selectState with the value of the selected state
        if (name === 'state') {
            selectState(event.target.value);
        }

        event.preventDefault();
        setFormData({ ...formData, [event.target.name]: event.target.value });
        setErrors({ ...errors, [event.target.name]: '' });
    };

    const handleCollegeChange = (event) => {
        const collegeName = event.target.value;
        setFormData({ ...formData, collegename: collegeName });
        setErrors({ ...errors, collegename: '' });
    };
    
    
    
    const [loadingPage, setLoadingPage] = useState(false)

    const fetchTotalColleges = async () => {
        try {
            setLoadingPage(true)
            const statesResponse = await axios.get('http://localhost:3000/allstates');
            console.log(statesResponse)
            const collegesResponse = await axios.get(`http://localhost:3000/colleges/state/?states=${state}`);
            setStates(statesResponse.data);
            setColleges(collegesResponse.data);
            if(statesResponse.status == 200){
                setTimeout(() => {
                    setLoadingPage(false)
                }, 90);
            }
            
        } catch (error) {
            console.error('Error fetching colleges:', error);
        }
        
    };


    useEffect(() => {
        fetchTotalColleges();
    }, [state]);





    const validateForm = () => {
        const { email } = formData;
        const newErrors = {};

        if (!validator.isEmail(email)) {
            newErrors.email = 'Please Enter a valid Email Address';
        }

        console.log(newErrors);

        setError(newErrors); // Assuming you have a state variable for errors

        return Object.keys(newErrors).length === 0;
    };


    const [loading, setLoading] = useState(false)

    const handleRegisterCollege = async () => {
        console.log("reqeust is send")
        try {
            setLoading(true)
            const response = await userService.registerCollege(formData);
            console.log(response.status)
            if (response.status) {
                toast.success('Your Collge is registerd Successfully', {
                    style: {
                        marginTop: '100px',
                    }
                });
                setFormData({
                    email: '',
                });
            setLoading(false)

            }
        }
        catch (error) {
            console.log(error)
        }
    }



    return (
        <>
        {loadingPage?(<Spinner/>):
        (<Layout title="| Register |" content="content">
            <section className="bg-indigo-950 h-[800px]">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-40 lg:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Register Your College
                            </h1>
                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select State</label>
                                    <select
                                        className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                        name="state"
                                        id="state"
                                        onChange={handleSubmit}
                                    >
                                        {states.map((state) => (
                                            <option key={state} value={state}>
                                                {state}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="college" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select College Name</label>
                                    <select
                                        className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                        name="collegename"
                                        id="college"
                                        onChange={handleCollegeChange}
                                    >
                                        {colleges.map((college) => (
                                            <option key={college} value={college[2]}>
                                                {college[2]}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>                                     <input
                                        type="email"
                                        value={formData.email}
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                        required
                                        onChange={handleSubmit}
                                    />
                                </div>
                                
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="terms"
                                            aria-describedby="terms"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 
                                            focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600
                                             dark:ring-offset-gray-800"
                                            required
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                                            I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">
                                                Terms and Conditions
                                            </a>
                                        </label>
                                    </div>
                                </div>


                                <button
                                    onClick={handleRegisterCollege}
                                    type="submit"
                                    className="flex items-center justify-center w-full bg-indigo-950 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    {loading ? (
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
                                        "Create an account"
                                    )}
                                </button>

                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <a href="/" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
     ) }
     </>
    );
};

export default RegisterCollege;
