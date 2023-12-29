import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import axios from 'axios';
import validator from 'validator';
import { userService } from '../../services/authservices';



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


    const fetchTotalColleges = async () => {
        try {
            const statesResponse = await axios.get('http://localhost:3000/allstates');
            const collegesResponse = await axios.get(`http://localhost:3000/colleges/state/?states=${state}`);
            setStates(statesResponse.data);
            setColleges(collegesResponse.data);
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


    const handleRegisterCollege = async ()=>{
        console.log("reqeust is send")
        try{
           const response =  await userService.registerCollege(formData);
        }
        catch(error){
            console.log(error)
        }
    }



    return (
        <Layout title="| Register |" content="content">
            <section className="bg-indigo-950 h-[800px]">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-60 lg:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
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
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                        required
                                        onChange={handleSubmit}
                                    />
                                </div>
                                {/* <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        autoComplete="password" 
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                        onChange={handleSubmit}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                    <input
                                        type="password"
                                        name="confirm_password"
                                        id="confirm-password"
                                        autoComplete="confirm-password" 
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                        onChange={handleSubmit}
                                    />
                                </div> */}
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="terms"
                                            aria-describedby="terms"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
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
                                    type="submit"
                                    onClick={handleRegisterCollege}
                                    className="w-full text-white bg-indigo-950 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Create an account
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
    );
};

export default RegisterCollege;
