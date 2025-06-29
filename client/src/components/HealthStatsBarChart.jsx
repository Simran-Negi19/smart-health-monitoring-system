// components/HealthStatsBarChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HealthStatsBarChart = ({ formData }) => {
  const data = {
    labels: ['Age', 'BP', 'Cholesterol', 'Max HR', 'Oldpeak'],
    datasets: [
      {
        label: 'Your Health Stats',
        data: [
          parseFloat(formData.age),
          parseFloat(formData.trestbps),
          parseFloat(formData.chol),
          parseFloat(formData.thalach),
          parseFloat(formData.oldpeak),
        ],
        backgroundColor: [
          '#3B82F6',
          '#EF4444',
          '#10B981',
          '#F59E0B',
          '#8B5CF6',
        ],
      },
    ],
  };

  return (
    <div className="mt-8 w-full max-w-4xl mx-auto h-[300px]">
  <Bar
    key={JSON.stringify(formData)}
    data={data}
    options={{ responsive: true, maintainAspectRatio: false }}
  />
</div>

  );
};

export default HealthStatsBarChart;
