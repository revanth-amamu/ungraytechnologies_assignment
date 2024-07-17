import { useEffect, useState } from "react";
import { fetchData } from "../../services/api";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

const PerformanceScore = () => {
  const [data, setData] = useState({ score: 0 });

  useEffect(() => {
    fetchData(`${baseUrl}/dashboard/performance-score`)
      .then((response) => {
        setData(response);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="p-8 bg-white rounded shadow h-2/5">
      <div className="relative w-40 h-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-40 h-40 border-8 border-blue-500 rounded-full"></div>
        <div
          className="absolute top-0 left-0 w-40 h-40 border-8 border-gray-200 rounded-full transition-all duration-1000 ease-out"
          style={{
            clipPath: "inset(0 0 50% 0)",
            transform: `rotate(${(data.score / 100) * 180}deg)`,
          }}
        ></div>
        <div className="absolute -top-3 left-0 w-40 h-40 flex items-center justify-center">
          <div className="text-lg font-bold">{data.score}</div>
          
        </div>
      </div>
      <div className="my-4 border"></div>
      <div>
        <div className="text-lg font-medium text-gray-900">You're good!</div>
        <div className="text-gray-500 text-sm mt-1">
          Your sales performance score is better than 80% other users
        </div>
        <button className="mt-4 bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-xl shadow-sm hover:bg-gray-50">
          Improve your score
        </button>
      </div>
    </div>
  );
};

export default PerformanceScore;
