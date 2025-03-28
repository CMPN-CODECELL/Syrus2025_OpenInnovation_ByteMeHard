// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { 
  Menu,
  ChevronRight,
  ArrowUpRight,
  Bell,
  User
} from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Sidebar from '../components/Sidebar';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  // On mount, load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Theme-based class variables
  const bgClass = theme === 'dark' ? 'bg-black' : 'bg-white';
  const textClass = theme === 'dark' ? 'text-white' : 'text-black';
  const borderClass = theme === 'dark' ? 'border-gray-200' : 'border-gray-300';
  const buttonHoverBg = theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100';
  const sidebarBg = theme === 'dark' ? 'bg-black' : 'bg-white';
  const sidebarText = theme === 'dark' ? 'text-white' : 'text-black';

  // Chart colors
  const chartBorderColor = theme === 'dark' ? '#FFFFFF' : '#000000';
  const chartLegendColor = theme === 'dark' ? '#FFFFFF' : '#000000';
  const multiColors = ["#EF4444", "#F59E0B", "#EAB308", "#10B981", "#3B82F6", "#8B5CF6"];

  // Line Chart for Sales Trend
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales ($)',
        data: [12000, 15000, 10000, 17000, 19000, 22000],
        fill: false,
        borderColor: theme === 'dark' ? chartBorderColor : '#000000',
        tension: 0.4,
        pointBackgroundColor: theme === 'dark' ? chartBorderColor : multiColors,
        pointBorderColor: theme === 'dark' ? chartBorderColor : multiColors,
      },
    ],
  };

  const salesOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, labels: { color: chartLegendColor } },
      title: { display: false },
    },
    scales: {
      x: { ticks: { color: chartLegendColor }, grid: { color: theme === 'dark' ? '#333333' : '#dddddd' } },
      y: { ticks: { color: chartLegendColor }, grid: { color: theme === 'dark' ? '#333333' : '#dddddd' } }
    }
  };

  // Bar Chart for Profit Trend
  const profitData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Profit ($)',
        data: [5000, 7000, 3000, 8000, 10000, 12000],
        backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : multiColors,
      },
    ],
  };

  const profitOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, labels: { color: chartLegendColor } },
      title: { display: false },
    },
    scales: {
      x: { ticks: { color: chartLegendColor }, grid: { color: theme === 'dark' ? '#333333' : '#dddddd' } },
      y: { ticks: { color: chartLegendColor }, grid: { color: theme === 'dark' ? '#333333' : '#dddddd' } }
    }
  };

  // Profit top section dummy values
  const profitValue = "$1,234,567";
  const profitPercentage = "12.5%";

  return (
    <div className={`flex h-screen ${bgClass}`}>
      {/* Inline CSS for custom toggle switch */}
      <style>{`
        .switch {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 24px;
        }
        .switch input { 
          opacity: 0;
          width: 0;
          height: 0;
        }
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: .4s;
        }
        .slider:before {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: .4s;
        }
        input:checked + .slider {
          background-color: rgb(0, 0, 0);
        }
        input:focus + .slider {
          box-shadow: 0 0 1px rgb(1, 1, 1);
        }
        input:checked + .slider:before {
          transform: translateX(26px);
        }
        .slider.round {
          border-radius: 24px;
        }
        .slider.round:before {
          border-radius: 50%;
        }
      `}</style>

      {/* Sidebar Component */}
      <Sidebar 
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        theme={theme}
        sidebarBg={sidebarBg}
        borderClass={borderClass}
        sidebarText={sidebarText}
        buttonHoverBg={buttonHoverBg}
      />

      {/* Mobile menu button */}
      <button 
        onClick={() => setIsSidebarOpen(true)}
        className={`md:hidden fixed top-4 right-4 z-40 p-2 ${bgClass} rounded-lg shadow hover:shadow-xl transition-shadow duration-300 border ${borderClass} transform hover:scale-110`}
      >
        <Menu className="w-6 h-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#000000' }} />
      </button>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {/* Top Bar */}
        <div className={`flex flex-col md:flex-row md:items-center md:justify-between mb-8 border-b ${borderClass} pb-4`}>
          <h2 className={`text-2xl font-bold ${textClass} transition-transform duration-300 transform hover:scale-105`}>
            Manufacturer Dashboard
          </h2>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {/* Custom toggle switch placed on the right */}
            <label className="switch">
              <input 
                type="checkbox" 
                checked={theme === 'light'} 
                onChange={toggleTheme} 
              />
              <span className="slider round"></span>
            </label>
            <button className={`p-2 rounded-full ${buttonHoverBg} border ${borderClass} transition-transform duration-300 transform hover:scale-110`}>
              <Bell className="w-6 h-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#000000' }} />
            </button>
            <button className={`p-2 rounded-full ${buttonHoverBg} border ${borderClass} transition-transform duration-300 transform hover:scale-110`}>
              <User className="w-6 h-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#000000' }} />
            </button>
          </div>
        </div>

        {/* Profit Section */}
        <div className="mb-8">
          <div className="grid grid-cols-1">
            <div className={`p-8 rounded-lg border ${borderClass} shadow-md transition-all duration-300 transform hover:scale-105 ${bgClass}`}>
              <div className="flex items-center space-x-2">
                <h2 className={`text-3xl font-bold ${textClass}`}>Profit</h2>
                <ArrowUpRight className="w-4 h-4" style={{ color: theme === 'dark' ? '#00FF00' : '#008000' }} />
                <span className={`text-lg font-medium ${textClass}`}>{profitPercentage}</span>
              </div>
              <p className={`text-5xl font-extrabold ${textClass}`}>{profitValue}</p>
            </div>
          </div>
        </div>

        {/* Top Navigation (Breadcrumbs) */}
        <div className="flex items-center justify-between mb-8 transition-transform duration-300 transform hover:scale-105">
          <div className={`flex items-center space-x-2 text-sm ${textClass}`}>
            <span className="transition-colors duration-50 hover:text-gray-300">Overview</span>
            <ChevronRight className="w-4 h-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#000000' }} />
            <span className="font-medium transition-colors duration-300 hover:text-gray-300">Users</span>
            <ChevronRight className="w-4 h-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#000000' }} />
            <span className="transition-colors duration-300 hover:text-gray-300">Revenue</span>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Highest Selling Product */}
          <div className={`p-6 rounded-lg border ${borderClass} shadow-sm transition-all duration-300 transform hover:scale-105 ${bgClass}`} style={{ animationDelay: '0.1s' }}>
            <h2 className={`text-lg font-semibold mb-4 flex items-center justify-between ${textClass}`}>
              Highest Selling Product
              <ArrowUpRight className="w-5 h-5 transition-transform duration-300 transform hover:rotate-12" style={{ color: theme === 'dark' ? '#FFFFFF' : '#000000' }} />
            </h2>
            <div className="space-y-2">
              <h3 className={`text-2xl font-bold ${textClass}`}>Chair</h3>
              <div className={`space-y-2 ${textClass}`}>
                <p className={`flex justify-between items-center border-b ${borderClass} pb-2`}>
                  <span>Items Sold:</span>
                  <span className="font-medium">98</span>
                </p>
                <p className={`flex justify-between items-center border-b ${borderClass} pb-2`}>
                  <span>Status:</span>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium border border-yellow-200">
                    Pending
                  </span>
                </p>
                <p className="flex justify-between items-center">
                  <span>Agreed Price:</span>
                  <span className="font-medium">$577,519</span>
                </p>
              </div>
            </div>
          </div>

          {/* Top 5 Buyers */}
          <div className={`p-6 rounded-lg border ${borderClass} shadow-sm transition-all duration-300 transform hover:scale-105 ${bgClass}`} style={{ animationDelay: '0.2s' }}>
            <h2 className={`text-lg font-semibold mb-4 flex items-center justify-between ${textClass}`}>
              Top 5 Buyers
              <ArrowUpRight className="w-5 h-5 transition-transform duration-300 transform hover:rotate-12" style={{ color: theme === 'dark' ? '#FFFFFF' : '#000000' }} />
            </h2>
            <div className="space-y-3">
              {[
                { name: 'Chair', items: 98 },
                { name: 'Lamp', items: 94 },
                { name: 'Sofa', items: 91 },
                { name: 'Lamp', items: 80 },
                { name: 'Sofa', items: 70 },
              ].map((buyer, index) => (
                <div 
                  key={index} 
                  className={`flex justify-between items-center p-2 ${buttonHoverBg} rounded transition-all duration-300 transform hover:scale-105 border ${borderClass}`}
                >
                  <span className={textClass}>{buyer.name}</span>
                  <span className={`font-medium ${textClass}`}>{buyer.items} items</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sales Data */}
          <div className={`p-6 rounded-lg border ${borderClass} shadow-sm transition-all duration-300 transform hover:scale-105 ${bgClass}`} style={{ animationDelay: '0.3s' }}>
            <h2 className={`text-lg font-semibold mb-4 flex items-center justify-between ${textClass}`}>
              Sales Data
              <ArrowUpRight className="w-5 h-5 transition-transform duration-300 transform hover:rotate-12" style={{ color: theme === 'dark' ? '#FFFFFF' : '#000000' }} />
            </h2>
            <div className={`flex justify-center items-center h-48 border ${borderClass} rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
              <div className="text-center">
                <div className={`text-3xl font-bold ${textClass}`}>Lamp: 210</div>
                <div className={`mt-2 ${textClass}`}>Highest selling item</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Product History */}
        <div className={`mt-8 rounded-lg border ${borderClass} shadow-sm transition-all duration-300 ${bgClass}`} style={{ animationDelay: '0.4s' }}>
          <div className="p-6">
            <h2 className={`text-lg font-semibold mb-4 flex items-center justify-between ${textClass}`}>
              Recent Product History
              <ArrowUpRight className="w-5 h-5 transition-transform duration-300 transform hover:rotate-12" style={{ color: theme === 'dark' ? '#FFFFFF' : '#000000' }} />
            </h2>
            <div className="overflow-x-auto">
              <table className={`w-full border ${borderClass}`}>
                <thead>
                  <tr className={`text-left border-b ${borderClass} ${textClass}`}>
                    <th className="pb-3 font-semibold">Name</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold">Price</th>
                    <th className="pb-3 font-semibold">Items Sold</th>
                  </tr>
                </thead>
                <tbody className={textClass}>
                  {[
                    { name: 'Chair', status: 'Available', price: 899084, items: 35 },
                    { name: 'Sofa', status: 'Sold', price: 835753, items: 91 },
                    { name: 'Sofa', status: 'Pending', price: 816154, items: 30 },
                    { name: 'Bed', status: 'Sold', price: 779430, items: 48 },
                    { name: 'Sofa', status: 'Pending', price: 618099, items: 28 },
                  ].map((product, index) => (
                    <tr key={index} className={`border-b ${borderClass} hover:bg-${theme === 'dark' ? 'gray-900' : 'gray-100'} transition-all duration-300`}>
                      <td className="py-3 pl-4">{product.name}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                          product.status === 'Available' ? 'bg-green-100 text-green-800 border-green-200' :
                          product.status === 'Sold' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                          'bg-yellow-100 text-yellow-800 border-yellow-200'
                        }`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="py-3">${product.price.toLocaleString()}</td>
                      <td className="py-3">{product.items}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Graphs Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`p-6 rounded-lg border ${borderClass} shadow-md transition-all duration-300 transform hover:scale-105 ${bgClass}`}>
            <h2 className={`text-lg font-semibold mb-4 ${textClass}`}>Sales Trend</h2>
            <Line data={salesData} options={salesOptions} />
          </div>
          <div className={`p-6 rounded-lg border ${borderClass} shadow-md transition-all duration-300 transform hover:scale-105 ${bgClass}`}>
            <h2 className={`text-lg font-semibold mb-4 ${textClass}`}>Profit Trend</h2>
            <Bar data={profitData} options={profitOptions} />
          </div>
        </div>

      </main>
    </div>
  );
}

export default Dashboard;
