// components/HeartRateChart.jsx
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const HeartRateChart = ({ age, thalach }) => {
  const data = {
    labels: ['Age'],
    datasets: [
      {
        label: 'Max Heart Rate (thalach)',
        data: [thalach],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <Line data={data} />
    </div>
  );
};

export default HeartRateChart;
