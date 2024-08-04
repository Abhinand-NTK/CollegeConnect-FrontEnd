// // import React, { useEffect, useState } from 'react';
// // import Layout from '../Layout/Layout';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';

// // const LandingPage = () => {
// //     const [message, setMessage] = useState('');
// //     const Navigate = useNavigate();

// //     const handleCollegeRegisterClick = () => {
// //         // Add logic to navigate to the college registration page
// //         Navigate('/signin/');
// //     };

// //     const handleUserRegisterClick = () => {
// //         // Add logic to navigate to the user registration page
// //         Navigate('/signin/');
// //     };

// //     const cards = [
// //         { id: 1, title: 'Card 1', content: 'This is some text for Card 1', link: 'https://example.com' },
// //         { id: 2, title: 'Card 2', content: 'This is some text for Card 2', link: 'https://example.com' },
// //         { id: 3, title: 'Card 3', content: 'This is some text for Card 3', link: 'https://example.com' },
// //         { id: 4, title: 'Card 4', content: 'This is some text for Card 4', link: 'https://example.com' },
// //         { id: 5, title: 'Card 5', content: 'This is some text for Card 5', link: 'https://example.com' },
// //         { id: 6, title: 'Card 6', content: 'This is some text for Card 6', link: 'https://example.com' },
// //     ];

// //     return (
// //         <>
// //             <Layout title='Home | Welcome ' content=' Admin Landing page'></Layout>

// //             <div
// //                 className="mx-auto overflow-y-hidden p-10 pt-36 max-w-2xl lg:mx-0 lg:max-w-none pl-20 bg-opacity-90 pr-20"
// //                 style={{
// //                     backgroundImage: 'url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply)',
// //                     backgroundSize: 'cover',
// //                     backgroundPosition: 'center',
// //                     backgroundRepeat: 'no-repeat',
// //                 }}
// //             >
// //                 <div className="grid grid-cols-1 gap-y-6 text-base font-semibold sm:text-xl leading-7 text-white md:grid-cols-2 lg:gap-x-10">
// //                     <div>
// //                         <h6 className="text-4xl font-bold tracking-tight text-white sm:text-4xl">
// //                             Unlock a world of possibilities in student management with our app! 🎓✨
// //                         </h6>
// //                         <p className="mt-6 text-lg leading-8 text-gray-300">
// //                             Why Choose Our Student Management App?
// //                             🚀 **Seamless Connectivity**: Connect with students and staff across multiple colleges effortlessly.
// //                             💼 **Efficient Management**: Manage student details, schedules, and activities with ease.
// //                             💡 **Innovative Solutions**: Stay ahead with innovative features tailored for modern educational needs.
// //                         </p>
// //                         <div className='mt-3'>
// //                             <button
// //                                 onClick={() => Navigate('/signin')}
// //                                 className="px-6 py-3 bg-blue-400 bg-opacity-30 hover:bg-opacity-30 text-white rounded-md hover:bg-blue-500 focus:outline-none
// //                                  focus:ring focus:border-blue-300"
// //                             >
// //                                 Login into your Account
// //                             </button>

// //                         </div>
// //                     </div>
// //                     <div className="flex flex-col items-center justify-center space-y-4">
// //                         <div className='flex flex-col justify-between  '>
// //                             <div className='text-white underline'>
// //                                 <button className='bg-transparent'
// //                                     onClick={() => { Navigate('collegregister') }}
// //                                 >
// //                                     Register Your College →
// //                                 </button>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </div>
// //                 <div className="text-center text-white underline">
// //                     <h1>Modules of College Management System</h1>
// //                     <div className="card-container">
// //                         {cards.map(card => (
// //                             <div key={card.id} className="card">
// //                                 <h2>{card.title}</h2>
// //                                 <p>{card.content}</p>
// //                                 <a href={card.link} target="_blank" rel="noopener noreferrer" className="card-link">
// //                                     Learn More
// //                                 </a>
// //                             </div>
// //                         ))}
// //                     </div>
// //                 </div>
// //             </div>
// //         </>
// //     );
// // };

// // export default LandingPage;

// // import React, { useEffect, useState } from 'react';
// // import Layout from '../Layout/Layout';
// // import { useNavigate } from 'react-router-dom';

// // const LandingPage = () => {
// //     const [message, setMessage] = useState('');
// //     const navigate = useNavigate();

// //     const handleCollegeRegisterClick = () => {
// //         // Logic to navigate to the college registration page
// //         navigate('/collegregister');
// //     };

// //     const handleUserRegisterClick = () => {
// //         // Logic to navigate to the user registration page
// //         navigate('/signin');
// //     };

// //     const cards = [
// //         { id: 1, title: 'Card 1', content: 'This is some text for Card 1', link: 'https://example.com' },
// //         { id: 2, title: 'Card 2', content: 'This is some text for Card 2', link: 'https://example.com' },
// //         { id: 3, title: 'Card 3', content: 'This is some text for Card 3', link: 'https://example.com' },
// //         { id: 4, title: 'Card 4', content: 'This is some text for Card 4', link: 'https://example.com' },
// //         { id: 5, title: 'Card 5', content: 'This is some text for Card 5', link: 'https://example.com' },
// //         { id: 6, title: 'Card 6', content: 'This is some text for Card 6', link: 'https://example.com' },
// //     ];

// //     return (
// //         <>
// //             <Layout title="Home | Welcome" content="Admin Landing page" />

// //             <div
// //                 className="mx-auto overflow-y-hidden p-10 pt-36 max-w-2xl lg:mx-0 lg:max-w-none pl-20 pr-20"
// //                 style={{
// //                     backgroundImage: 'url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply)',
// //                     backgroundSize: 'cover',
// //                     backgroundPosition: 'center',
// //                     backgroundRepeat: 'no-repeat',
// //                 }}
// //             >
// //                 <div className="grid grid-cols-1 gap-y-6 text-base font-semibold sm:text-xl leading-7 text-white md:grid-cols-2 lg:gap-x-10">
// //                     <div>
// //                         <h6 className="text-4xl font-bold tracking-tight text-white sm:text-4xl">
// //                             Unlock a world of possibilities in student management with our app! 🎓✨
// //                         </h6>
// //                         <p className="mt-6 text-lg leading-8 text-gray-300">
// //                             Why Choose Our Student Management App?
// //                             <br />
// //                             🚀 <strong>Seamless Connectivity</strong>: Connect with students and staff across multiple colleges effortlessly.
// //                             <br />
// //                             💼 <strong>Efficient Management</strong>: Manage student details, schedules, and activities with ease.
// //                             <br />
// //                             💡 <strong>Innovative Solutions</strong>: Stay ahead with innovative features tailored for modern educational needs.
// //                         </p>
// //                         <div className='mt-3'>
// //                             <button
// //                                 onClick={() => navigate('/signin')}
// //                                 className="px-6 py-3 bg-blue-400 bg-opacity-30 hover:bg-opacity-30 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:border-blue-300"
// //                             >
// //                                 Login into your Account
// //                             </button>
// //                         </div>
// //                     </div>
// //                     <div className="flex flex-col items-center justify-center space-y-4">
// //                         <div className='flex flex-col justify-between'>
// //                             <div className='text-white underline'>
// //                                 <button className='bg-transparent' onClick={handleCollegeRegisterClick}>
// //                                     Register Your College →
// //                                 </button>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </div>

// //                 <div className="text-center text-white underline">
// //                     <h1>Modules of College Management System</h1>
// //                     <div className="card-container grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
// //                         {cards.map(card => (
// //                             <div key={card.id} className="card bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
// //                                 <h2 className="text-lg font-bold">{card.title}</h2>
// //                                 <p className="text-sm">{card.content}</p>
// //                                 <a href={card.link} target="_blank" rel="noopener noreferrer" className="card-link text-blue-500 underline">
// //                                     Learn More
// //                                 </a>
// //                             </div>
// //                         ))}
// //                     </div>
// //                 </div>
// //             </div>
// //         </>
// //     );
// // };

// // export default LandingPage;

// import React, { useEffect, useState } from 'react';
// import Layout from '../Layout/Layout';
// import { useNavigate } from 'react-router-dom';
// import Footer from '../Footer/Footer';


// const LandingPage = () => {
//     const [isNavVisible, setIsNavVisible] = useState(true);
//     const navigate = useNavigate();

//     const handleCollegeRegisterClick = () => {
//         navigate('/collegregister');
//     };

//     const handleUserRegisterClick = () => {
//         navigate('/signin');
//     };

//     const cards = [
//         { id: 1, title: 'Card 1', content: 'This is some text for Card 1', link: 'https://example.com' },
//         { id: 2, title: 'Card 2', content: 'This is some text for Card 2', link: 'https://example.com' },
//         { id: 3, title: 'Card 3', content: 'This is some text for Card 3', link: 'https://example.com' },
//         { id: 4, title: 'Card 4', content: 'This is some text for Card 4', link: 'https://example.com' },
//         { id: 5, title: 'Card 5', content: 'This is some text for Card 5', link: 'https://example.com' },
//         { id: 6, title: 'Card 6', content: 'This is some text for Card 6', link: 'https://example.com' },
//         { id: 7, title: 'Card 7', content: 'This is some text for Card 7', link: 'https://example.com' },
//         { id: 8, title: 'Card 8', content: 'This is some text for Card 8', link: 'https://example.com' },
//     ];

//     useEffect(() => {
//         let lastScrollTop = 0;
//         const handleScroll = () => {
//             const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//             if (scrollTop > lastScrollTop) {
//                 // Scrolling down
//                 setIsNavVisible(false);
//             } else {
//                 // Scrolling up
//                 setIsNavVisible(true);
//             }
//             lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
//         };

//         window.addEventListener('scroll', handleScroll);

//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, []);

//     return (
//         <>
//             <div className={`transition-opacity duration-300 ${isNavVisible ? 'opacity-100' : 'opacity-0'}`}>
//                 <Layout title="Home | Welcome" content="Admin Landing page" />
//             </div>

//             <div
//                 className="mx-auto overflow-y-hidden p-10 pt-36 max-w-2xl lg:mx-0 lg:max-w-none pl-20 pr-20"
//                 style={{
//                     backgroundImage: 'url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply)',
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center',
//                     backgroundRepeat: 'no-repeat',
//                 }}
//             >
//                 <div className="grid grid-cols-1 gap-y-6 text-base font-semibold sm:text-xl leading-7 text-white md:grid-cols-2 lg:gap-x-10">
//                     <div>
//                         <h6 className="text-4xl font-bold tracking-tight text-white sm:text-4xl">
//                             Unlock a world of possibilities in student management with our app! 🎓✨
//                         </h6>
//                         <p className="mt-6 text-lg leading-8 text-gray-300">
//                             Why Choose Our Student Management App?
//                             <br />
//                             🚀 <strong>Seamless Connectivity</strong>: Connect with students and staff across multiple colleges effortlessly.
//                             <br />
//                             💼 <strong>Efficient Management</strong>: Manage student details, schedules, and activities with ease.
//                             <br />
//                             💡 <strong>Innovative Solutions</strong>: Stay ahead with innovative features tailored for modern educational needs.
//                         </p>
//                         <div className='mt-3'>
//                             <button
//                                 onClick={() => navigate('/signin')}
//                                 className="px-6 py-3 bg-blue-400 bg-opacity-30 hover:bg-opacity-30 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:border-blue-300"
//                             >
//                                 Login into your Account
//                             </button>
//                         </div>
//                     </div>
//                     <div className="flex flex-col items-center justify-center space-y-4">
//                         <div className='flex flex-col justify-between'>
//                             <div className='text-white underline'>
//                                 <button className='bg-transparent' onClick={handleCollegeRegisterClick}>
//                                     Requesting for a demo→
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="text-center">
//                     <h1 className='text-4xl font-bold tracking-tight text-white sm:text-4xl'>Modules of College Management System</h1>
//                     {/* <div className="card-container grid grid-cols-1 md:grid-cols-4 gap-6">
//                         {cards.map(card => (
//                             <div key={card.id} style={{ height: '400px' }} className="card bg-gray-200 opacity-20 dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
//                                 <h2 className="text-lg font-bold text-white">{card.title}</h2>
//                                 <p className="text-sm">{card.content}</p>
//                                 <a href={card.link} target="_blank" rel="noopener noreferrer" className="card-link text-blue-500 underline">
//                                     Learn More
//                                 </a>
//                             </div>
//                         ))}
//                     </div> */}
//                     <div className="card-container grid grid-cols-1 md:grid-cols-4 gap-6">
//                         {cards.map(card => (
//                             <div key={card.id} style={{ height: '300px' }} className="card bg-gray-500 dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
//                                 <h2 className="text-lg font-bold text-white">{card.title}</h2>
//                                 <p className="text-sm">{card.content}</p>
//                                 <a href={card.link} target="_blank" rel="noopener noreferrer" className="card-link text-blue-500 underline">
//                                     Learn More
//                                 </a>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 <div className='mt-6 opacity-2'>
//                     <Footer />
//                 </div>
//             </div>
//         </>
//     );
// };

// export default LandingPage;
import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';

const LandingPage = () => {
    const [isNavVisible, setIsNavVisible] = useState(true);
    const navigate = useNavigate();

    const handleCollegeRegisterClick = () => {
        navigate('/collegregister');
    };

    const handleUserRegisterClick = () => {
        navigate('/signin');
    };

    const cards = [
        { id: 1, title: 'Card 1', content: 'This is some text for Card 1', link: 'https://example.com' },
        { id: 2, title: 'Card 2', content: 'This is some text for Card 2', link: 'https://example.com' },
        { id: 3, title: 'Card 3', content: 'This is some text for Card 3', link: 'https://example.com' },
        { id: 4, title: 'Card 4', content: 'This is some text for Card 4', link: 'https://example.com' },
        { id: 5, title: 'Card 5', content: 'This is some text for Card 5', link: 'https://example.com' },
        { id: 6, title: 'Card 6', content: 'This is some text for Card 6', link: 'https://example.com' },
        { id: 7, title: 'Card 7', content: 'This is some text for Card 7', link: 'https://example.com' },
        { id: 8, title: 'Card 8', content: 'This is some text for Card 8', link: 'https://example.com' },
    ];

    useEffect(() => {
        let lastScrollTop = 0;
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            setIsNavVisible(scrollTop <= lastScrollTop);
            lastScrollTop = Math.max(scrollTop, 0); // For Mobile or negative scrolling
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <div className={`transition-opacity duration-300 ${isNavVisible ? 'opacity-100' : 'opacity-0'}`}>
                <Layout title="Home | Welcome" content="Admin Landing page" />
            </div>

            <div
                className="mx-auto overflow-y-hidden p-10 pt-36 max-w-2xl lg:mx-0 lg:max-w-none pl-20 pr-20"
                style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="grid grid-cols-1 gap-y-6 text-base font-semibold sm:text-xl leading-7 text-white md:grid-cols-2 lg:gap-x-10">
                    <div>
                        <h6 className="text-4xl font-bold tracking-tight text-white sm:text-4xl">
                            Unlock a world of possibilities in student management with our app! 🎓✨
                        </h6>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            Why Choose Our Student Management App?
                            <br />
                            🚀 <strong>Seamless Connectivity</strong>: Connect with students and staff across multiple colleges effortlessly.
                            <br />
                            💼 <strong>Efficient Management</strong>: Manage student details, schedules, and activities with ease.
                            <br />
                            💡 <strong>Innovative Solutions</strong>: Stay ahead with innovative features tailored for modern educational needs.
                        </p>
                        <div className='mt-3'>
                            <button
                                onClick={handleUserRegisterClick}
                                className="px-6 py-3 bg-blue-400 bg-opacity-30 hover:bg-opacity-30 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:border-blue-300"
                            >
                                Login into your Account
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <div className='flex flex-col justify-between'>
                            <div className='text-white underline'>
                                <button className='bg-transparent' onClick={handleCollegeRegisterClick}>
                                    Requesting for a demo →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <h1 className='text-4xl font-bold tracking-tight text-white sm:text-4xl'>Modules of College Management System</h1>
                    <div className="card-container grid grid-cols-1 md:grid-cols-4 gap-6">
                        {cards.map(card => (
                            <div key={card.id} style={{ height: '300px' }} className="card bg-gray-500 dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                                <h2 className="text-lg font-bold text-white">{card.title}</h2>
                                <p className="text-sm">{card.content}</p>
                                <a href={card.link} target="_blank" rel="noopener noreferrer" className="card-link text-blue-500 underline">
                                    Learn More
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='mt-6'>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default LandingPage;
