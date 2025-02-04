import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  zoomPlugin,
);

interface BarChartProps {
  data: {
    labels: string[];
    values: number[];
  };
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Amount",
        data: data.values,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "rgba(0, 0, 0, 0.87)", // Light mode text color
        },
      },
      title: {
        display: true,
        text: "Overview Data",
        color: "rgba(0, 0, 0, 0.87)", // Light mode text color
      },
      zoom: {
        pan: {
          enabled: true,
          mode: "x" as const, // Explicitly specify the mode type
        },
        zoom: {
          enabled: true,
          mode: "x" as const, // Explicitly specify the mode type
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "rgba(0, 0, 0, 0.87)", // Light mode text color
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)", // Light mode grid color
        },
      },
      y: {
        ticks: {
          color: "rgba(0, 0, 0, 0.87)", // Light mode text color
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)", // Light mode grid color
        },
      },
    },
  };

  return (
    <div className="relative h-64 w-full bg-white p-2 dark:border-gray-700 dark:bg-gray-800">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
