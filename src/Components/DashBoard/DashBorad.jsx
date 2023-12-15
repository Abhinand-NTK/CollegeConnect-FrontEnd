import React, { useEffect } from 'react';
import ApexCharts from 'react-apexcharts';
import Layout from '../Layout/Layout';


const DashBoard = () => {
  useEffect(() => {
    const getChartOptions = () => {
      // Your chart options here
      // ...

      return chartOptions;
    };

    if (document.getElementById("donut-chart") && typeof ApexCharts !== 'undefined') {
      const chart = new ApexCharts(document.getElementById("donut-chart"), getChartOptions());
      chart.render();

      const handleCheckboxChange = (event, chart) => {
        // Handle checkbox change logic
        // ...
      };

      const checkboxes = document.querySelectorAll('#devices input[type="checkbox"]');
      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', (event) => handleCheckboxChange(event, chart));
      });
    }

    // Cleanup event listeners on component unmount
    return () => {
      const checkboxes = document.querySelectorAll('#devices input[type="checkbox"]');
      checkboxes.forEach((checkbox) => {
        checkbox.removeEventListener('change', handleCheckboxChange);
      });
    };
  }, []);

  return (
    <Layout>
    <div className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
      {/* Your HTML content here */}
    </div>
    </Layout>
  );
};

export default DashBoard;
