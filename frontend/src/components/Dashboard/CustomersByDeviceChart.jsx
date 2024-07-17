import { useEffect, useState } from "react";
import { fetchData } from "../../services/api";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

const CustomersByDeviceChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData(`${baseUrl}/dashboard/customers-by-device`)
      .then((response) => setData(response))
      .catch((error) => console.error(error));
  }, []);

  const labels = [];
  const webSales = [];
  const offlineSales = [];

  data.map((item) => {
    labels.push(item.date);
    webSales.push(item.web_sales);
    offlineSales.push(item.offline_sales);
  });

  const chartData = {
    labels: labels || [],
    datasets: [
      {
        label: "Web sales",
        data: webSales || [],
        backgroundColor: "#3b82f6",
      },
      {
        label: "Offline sales",
        data: offlineSales || [],
        backgroundColor: "#a5f3fc",
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded shadow mb-3 h-2/5">
      <h3 className="text-lg text-gray-900 my-2 font-semibold">
        Customers by Device
      </h3>
      <div className="h-full w-full">
        <Line data={chartData} options={chartOptions} />
        <div className="flex justify-around">
          <p className="text-gray-900 font-semibold">1,304%</p>
          <p className="text-gray-900 font-semibold">473%</p>
        </div>
      </div>
    </div>
  );
};

export default CustomersByDeviceChart;
