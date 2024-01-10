
import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import { useNavigate } from 'react-router-dom';

const Subjects = () => {


    return (
        <>
            <Layout title='Home | Welcome ' content=' Admin Landing page'></Layout>
            <section className='mt-10 mt-40 md:mt-10 xl:mt-10'>
                <div className='w-full pl-20 mt-32'>
                    <div className='w-32 p-8 text-white bg-indigo-950 h-32'>
                        Thermo Dynamics
                    </div>
                    <div></div>
                    <div></div>
                </div>
            </section>

        </>
    );
};

export default Subjects;
