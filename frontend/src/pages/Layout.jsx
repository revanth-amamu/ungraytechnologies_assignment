import { useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar'; 
import { RiAlignLeft } from "react-icons/ri";
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
          <button
            type="button"
            className="md:hidden text-gray-500"
            onClick={toggleSidebar}
          >
            <RiAlignLeft className='p-2 mt-2 ml-3 text-5xl rounded-lg md:hidden hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800' />
          </button>
        <main className="flex-1 p-2 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;