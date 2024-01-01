
import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CollegeAdminLandingPage = () => {

    const [message, setMessage] = useState("");

    // Use Effect is using for , Setting the Strip setup

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        // const query = new URLSearchParams(window.location.search);
        const query = new URLSearchParams(window.location.search);

        if (query.get("success")) {
            setMessage("Order placed! You will receive an email confirmation.");
        }

        if (query.get("canceled")) {
            setMessage(
                "Order canceled -- continue to shop around and checkout when you're ready."
            );
        }
    }, []);


    // Function to make the API call
    const handleSubscribeClick = async () => {
        try {
            // Make API call using Axios
            const response = await axios.post('http://127.0.0.1:8000/api/payment/payments/', {
                id:1
                // Add any data usneeded for your API request
            });

            console.log("This is the url from the backend",response)

            // Handle the response as needed
            if (response.status === 200) {
                // Redirect to the subscription page upon successful API response
                window.location.href = response.data.url;
            } else {
                // Handle errors or show appropriate messages
                console.error('API call failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error during API call:', error.message);
        }
    };

    const  Navigate = useNavigate() 

    const links = [
        { name: 'Open roles', href: '#' },
        { name: 'Internship program', href: '#' },
        { name: 'Our values', href: '#' },
        { name: 'Meet our leadership', href: '#' },
    ]
    const stats = [
        { name: 'Offices worldwide', value: '12' },
        { name: 'Full-time colleagues', value: '300+' },
        { name: 'Hours per week', value: '40' },
        { name: 'Paid time off', value: 'Unlimited' },
    ]

    // const handleSubscribeClick = ()=>{
    //     Navigate('/users/checkout/')
    // }

    return (
        <Layout title='Home | Admin | Welcome ' content=' Admin Landing page'>
            <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
                <img
                    src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
                    alt=""
                    className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
                />
                <div
                    className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
                    aria-hidden="true"
                >
                    <div
                        className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
                <div
                    className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
                    aria-hidden="true"
                >
                    <div
                        className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h6 className="text-4xl font-bold tracking-tight text-white sm:text-4xl">
                            Unlock a world of possibilities in student management with our app! 🎓✨
                        </h6>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            Why Choose Our Student Management App?
                            🚀 **Seamless Connectivity**: Connect with students and staff across multiple colleges effortlessly.
                            💼 **Efficient Management**: Manage student details, schedules, and activities with ease.
                            💡 **Innovative Solutions**: Stay ahead with innovative features tailored for modern educational needs.
                        </p>
                    </div>
                    <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold sm:text-xl leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
                            Join us on this educational journey! Subscribe today and redefine student management. 🌐💻
                            <button
                                onClick={handleSubscribeClick}
                                className="text-lg font-bold text-white underline hover:text-gray-300"
                            >
                                Subscribe Now →
                            </button>
                            <button
                            onClick={()=>{Navigate('/admin/manage')}}
                                className="text-lg font-bold text-white underline hover:text-gray-300"
                            >
                                DashBoard →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CollegeAdminLandingPage
