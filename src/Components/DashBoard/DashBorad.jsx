import React, { useEffect, useState, useRef } from 'react';
// import Chart from 'chart.js/auto';
import Layout from '../Layout/Layout';
import { PasswordManageSerive } from '../../services/authservices';
// import './tailwind.css';


const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [subscriptionCount, setSubscriptionCount] = useState(0);
  // const chartRef = useRef(null); // Ref to store the Chart instance

  // useEffect(() => {
  //   // Sample data

  //   // Update state

  //   // Destroy existing Chart instance if it exists
  //   if (chartRef.current) {
  //     chartRef.current.destroy();
  //   }

  // Create Chart.js doughnut chart
  // const ctx = document.getElementById('businessChart').getContext('2d');
  // chartRef.current = new Chart(ctx, {
  //   type: 'doughnut',
  //   data: {
  //     labels: ['Subscribed', 'Not Subscribed'],
  //     datasets: [{
  //       data: [subscriptionCount && subscriptionCount, userCount && userCount - subscriptionCount ],
  //       backgroundColor: ['#36A2EB', '#FF6384'],
  //     }],
  //   },
  // });


  // Clean up Chart instance on component unmount
  // return () => {

  //   subscription()
  //   if (chartRef.current) {
  //     chartRef.current.destroy();
  //   }
  // };
  // }, []);
  const subscription = async () => {
    try {
      const response = await PasswordManageSerive.SubscrptionStatus()
      console.log(response)
      setUserCount(response?.total_count);
      setSubscriptionCount(response?.verified_colleges_count);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {

    subscription()

  }, [])

  return (
    <section className='bg-white p-4 md:p-10 lg:p-16 mt-8 md:mt-12 h-auto md:h-[600px]'>
      <Layout />
      <div className="dashboard ml-12">
        <div className="counters w-full">
          <div className='flex justify-between w-full'>
            <div className="user-count w-1/2 p-12  text-center">
              <div className='bg-red-500  text-white p-4 rounded-xl shadow-orange-200'>
                <h2 className="text-xl font-bold ">User Count</h2>
                <p className="text-2xl">{userCount}</p>
              </div>
            </div>
            <div className="subscription-count w-1/2 p-12 text-center">
              <div className='bg-blue-500  text-white p-4 rounded-xl shadow-orange-200'>
                <h2 className="text-xl font-bold">Subscription Count</h2>
                <p className="text-2xl">{subscriptionCount}</p>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="chart-container px-72  items-center">
          <canvas className='w-full' id="businessChart"></canvas>
        </div> */}
      </div>
    </section>
  );
};

export default Dashboard;
