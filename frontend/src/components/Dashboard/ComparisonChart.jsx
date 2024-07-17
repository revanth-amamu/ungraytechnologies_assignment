import React, { useEffect, useState } from 'react';
import { fetchData } from '../../services/api';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const baseUrl = import.meta.env.VITE_BACKEND_URL;

const ComparisonChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData(`${baseUrl}/dashboard/comparison`)
      .then(response => setData(response))
      .catch(error => console.error(error));
  }, []);

  let labels = [];
  let thisYearData = [];
  let lastYearData = [];

  data.map(item => {
    labels.push(item.month);
    thisYearData.push(item.this_year);
    lastYearData.push(item.last_year);
  })

  const chartData = {
    labels: labels || [],
    datasets: [
      {
        label: 'This year',
        data: thisYearData || [],
        backgroundColor: '#3b82f6',
      },
      {
        label: 'Last year',
        data: lastYearData || [],
        backgroundColor: '#a5f3fc',
      },
    ],
  };
  const chartOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom', 
      },
    }
  }

  return (
    <div className='mb-6'>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default ComparisonChart;
