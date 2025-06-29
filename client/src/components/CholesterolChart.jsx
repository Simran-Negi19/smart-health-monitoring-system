// components/CholesterolChart.jsx
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

const CholesterolChart = ({ age, chol }) => {
  const data = {
    labels: ['Age'],
    datasets: [
      {
        label: 'Cholesterol Level',
        data: [chol],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
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

export default CholesterolChart;
