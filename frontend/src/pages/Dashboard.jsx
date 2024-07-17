import SummaryCards from '../components/Dashboard/SummaryCards';
import ComparisonChart from '../components/Dashboard/ComparisonChart';
import TopProductsTable from '../components/Dashboard/TopProductsTable';
import PerformanceScore from '../components/Dashboard/PerformanceScore';
import CustomersByDeviceChart from '../components/Dashboard/CustomersByDeviceChart';
import CommunityFeedback from '../components/Dashboard/CommunityFeedback';

const Dashboard = () => {
  return (
      <div className="grid grid-cols-1 md:grid-cols-6 gap-2 my-2">
        <div className="md:col-span-4 bg-white p-4 rounded-lg shadow">
          
          <div className="mb-4 flex justify-between">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div>
              <span className="text-sm font-medium">Compare to</span>
              <select className="ml-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 p-2">
                <option value="last_year">Last year</option>
                <option value="last_month">Last month</option>
                <option value="last_week">Last week</option>
              </select>
            </div>
          </div>
          <SummaryCards />

          <div className="mb-4 flex justify-between">
            <h1 className="text-lg font-medium">Comparison</h1>
            <select className="ml-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 p-2">
              <option value="6_months">6 months</option>
              <option value="1_year">1 year</option>
              <option value="2_years">2 years</option>
            </select>
          </div>
          <ComparisonChart />

          <div className="mb-4 flex justify-between">
            <h1 className="text-lg font-medium">Top Products</h1>
            <button className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 p-2">
              Full results
            </button>
          </div>
          <TopProductsTable />
          
        </div>

        <div className="md:col-span-2 space-y-2">
          <PerformanceScore />
          <CustomersByDeviceChart />
          <CommunityFeedback />
        </div>
      </div>
  );
};

export default Dashboard;
