import React, { useEffect, useState } from "react";
import { fetchData } from "../../services/api";
import { RiArrowUpLine, RiArrowDownLine } from "react-icons/ri";

const apiUrl = import.meta.env.VITE_API_ONE;

const SummaryCards = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    fetchData(apiUrl)
      .then((response) => setData(response))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="p-4 bg-white rounded shadow-md border">
        <h3 className="text-gray-500 text-sm font-medium">Purchases</h3>
        <div className="flex gap-2">
          <h1 className="text-3xl font-semibold text-gray-900">
            {data.purchases}
          </h1>
          <div className="flex items-center text-green-500 mt-2">
            <div className="bg-green-100 text-green-500 px-2 py-1 rounded-full text-xs font-medium">
              +32%
            </div>
            <RiArrowUpLine />
          </div>
        </div>
      </div>
      <div className="p-4 bg-white rounded shadow-md border">
      <h3 className="text-gray-500 text-sm font-medium">Revenue</h3>
        <div className="flex gap-2">
          <h1 className="text-3xl font-semibold text-gray-900">
            ${data.revenue / 1000}k
          </h1>
          <div className="flex items-center text-green-500 mt-2">
            <div className="bg-green-100 text-green-500 px-2 py-1 rounded-full text-xs font-medium">
              +49%
            </div>
            <RiArrowUpLine />
          </div>
        </div>
      </div>
      <div className="p-4 bg-white rounded shadow-md border">
      <h3 className="text-gray-500 text-sm font-medium">Refunds</h3>
        <div className="flex gap-2">
          <h1 className="text-3xl font-semibold text-gray-900">
            ${data.refunds / 1000}k
          </h1>
          <div className="flex items-center text-red-500 mt-2">
            <div className="bg-red-100 text-red-500 px-2 py-1 rounded-full text-xs font-medium">
              +7%
            </div>
            <RiArrowDownLine />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
