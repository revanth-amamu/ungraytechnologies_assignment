import React, { useEffect, useState } from 'react';
import { fetchData } from '../../services/api';
import { FaStar } from "react-icons/fa";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

const TopProductsTable = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData(`${baseUrl}/dashboard/top-products`)
      .then(response => setProducts(response))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Product
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Sold amount
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Unit price
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Revenue
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Rating
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id}>
              <td className="px-6 py-4 whitespace-nowrap flex items-center">
                <div className="text-sm font-medium text-gray-900">
                  {product.product}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {product.sold_amount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${product.unit_price}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${product.revenue.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex items-center">
                  <FaStar className="w-5 h-5 text-yellow-500 mr-1" />
                  {product.rating}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopProductsTable;
