// Retailer.jsx
import React, { useState, useEffect } from 'react';
import { Menu, ChevronRight, ArrowUpRight, Bell, User } from 'lucide-react';
import Sidebar from '../components/Sidebar';

function Retailer() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [selectedRetailer, setSelectedRetailer] = useState(null);

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Theme-based classes
  const bgClass = theme === 'dark' ? 'bg-black' : 'bg-white';
  const textClass = theme === 'dark' ? 'text-white' : 'text-black';
  const borderClass = theme === 'dark' ? 'border-gray-200' : 'border-gray-300';
  const buttonHoverBg = theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100';
  const sidebarBg = theme === 'dark' ? 'bg-black' : 'bg-white';
  const sidebarText = theme === 'dark' ? 'text-white' : 'text-black';

  // Dummy data for active retailer requests
  const activeRetailers = [
    {
      id: 1,
      name: 'Ace Retail',
      details: 'Requesting 100 sofas with custom design and high quality finish. Please contact ASAP.',
      dealAmount: '$50,000',
      contact: 'contact@aceretail.com',
      phone: '123-456-7890',
      address: '123 Main St, Springfield, USA'
    },
    {
      id: 2,
      name: 'Urban Furnishings',
      details: 'Bulk purchase request for 200 sofas with competitive pricing and prompt delivery.',
      dealAmount: '$90,000',
      contact: 'sales@urbanfurnish.com',
      phone: '234-567-8901',
      address: '456 Park Ave, Metropolis, USA'
    },
    {
      id: 3,
      name: 'Modern Living',
      details: 'Looking for 150 high quality, modern design sofas at a fixed deal price.',
      dealAmount: '$75,000',
      contact: 'info@modernliving.com',
      phone: '345-678-9012',
      address: '789 Broadway, Gotham, USA'
    },
  ];

  // Dummy data for completed retailer requests
  const completedRequests = [
    {
      id: 4,
      name: 'Elite Interiors',
      details: 'Completed request for 80 premium sofas. Deal closed successfully.',
      dealAmount: '$40,000',
      contact: 'support@eliteinteriors.com',
      phone: '456-789-0123',
      address: '101 Center St, Capital City, USA'
    },
    {
      id: 5,
      name: 'Comfort Homes',
      details: 'Completed order for 120 standard sofas with timely delivery.',
      dealAmount: '$60,000',
      contact: 'orders@comforthomes.com',
      phone: '567-890-1234',
      address: '202 Market Ave, Pleasantville, USA'
    },
  ];

  return (
    <div className={`flex h-screen ${bgClass}`}>
      {/* Inline CSS for modal animations */}
      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 50;
          animation: fadeIn 0.3s;
        }
        .modal-content {
          background: ${bgClass};
          border: 2px solid;
          border-color: ${borderClass};
          border-radius: 1rem;
          padding: 1.5rem;
          max-width: 600px;
          width: 90%;
          position: relative;
          animation: slideIn 0.3s;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateY(-20px); }
          to { transform: translateY(0); }
        }
      `}</style>

      {/* Sidebar */}
      <Sidebar 
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        theme={theme}
        sidebarBg={sidebarBg}
        borderClass={borderClass}
        sidebarText={sidebarText}
        buttonHoverBg={buttonHoverBg}
      />

      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsSidebarOpen(true)}
        className={`md:hidden fixed top-4 right-4 z-40 p-2 ${bgClass} rounded-full shadow hover:shadow-xl transition-shadow duration-300 border ${borderClass} transform hover:scale-110`}
      >
        <Menu className="w-6 h-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#000000' }} />
      </button>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content - Centered */}
      <main className="flex-1 overflow-y-auto p-8 flex flex-col items-center space-y-12">
        {/* Top Bar */}
        <div className={`w-full max-w-4xl flex flex-col md:flex-row md:items-center md:justify-between border-b ${borderClass} pb-4`}>
          <h2 className={`text-2xl font-bold ${textClass} transition-transform duration-300 transform hover:scale-105`}>
            Retailer Requests
          </h2>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <label className="switch">
              <input 
                type="checkbox" 
                checked={theme === 'light'} 
                onChange={toggleTheme} 
              />
              <span className="slider"></span>
            </label>
            <button className={`p-2 rounded-full ${buttonHoverBg} border ${borderClass} transition-transform duration-300 transform hover:scale-110`}>
              <Bell className="w-6 h-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#000000' }} />
            </button>
            <button className={`p-2 rounded-full ${buttonHoverBg} border ${borderClass} transition-transform duration-300 transform hover:scale-110`}>
              <User className="w-6 h-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#000000' }} />
            </button>
          </div>
        </div>

        {/* Active Retailer Requests Section */}
        <div className="w-full max-w-4xl">
          <h3 className={`text-xl font-semibold ${textClass} mb-6`}>Active Retailer Requests</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeRetailers.map((retailer) => (
              <div 
                key={retailer.id}
                onClick={() => setSelectedRetailer(retailer)}
                className={`p-4 border ${borderClass} rounded-xl shadow ${bgClass} transition-all duration-300 hover:scale-105 cursor-pointer`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className={`text-lg font-bold ${textClass}`}>{retailer.name}</h4>
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">Active</span>
                </div>
                <p className={`${textClass} text-sm`}>{retailer.details.substring(0, 50)}...</p>
                <div className="mt-2">
                  <span className={`text-sm font-medium ${textClass}`}>Deal: {retailer.dealAmount}</span>
                </div>
                <div className="mt-2 space-y-1 text-sm">
                  <p><strong>Email:</strong> {retailer.contact}</p>
                  <p><strong>Phone:</strong> {retailer.phone}</p>
                  <p><strong>Address:</strong> {retailer.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Completed Requests Section */}
        <div className="w-full max-w-4xl">
          <h3 className={`text-xl font-semibold ${textClass} mb-6`}>Completed Requests</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {completedRequests.map((retailer) => (
              <div 
                key={retailer.id}
                className={`p-4 border ${borderClass} rounded-xl shadow ${bgClass} transition-all duration-300 hover:scale-105`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className={`text-lg font-bold ${textClass}`}>{retailer.name}</h4>
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">Completed</span>
                </div>
                <p className={`${textClass} text-sm`}>{retailer.details.substring(0, 50)}...</p>
                <div className="mt-2">
                  <span className={`text-sm font-medium ${textClass}`}>Deal: {retailer.dealAmount}</span>
                </div>
                <div className="mt-2 space-y-1 text-sm">
                  <p><strong>Email:</strong> {retailer.contact}</p>
                  <p><strong>Phone:</strong> {retailer.phone}</p>
                  <p><strong>Address:</strong> {retailer.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Popup for Retailer Details */}
        {selectedRetailer && (
          <div className="modal-overlay" onClick={() => setSelectedRetailer(null)}>
            <div className={`modal-content ${bgClass} ${textClass}`} onClick={(e) => e.stopPropagation()}>
              <h3 className="text-2xl font-bold mb-2">{selectedRetailer.name}</h3>
              <p className="mb-4">{selectedRetailer.details}</p>
              <div className="mb-4 space-y-2 text-sm">
                <p><strong>Deal Amount:</strong> {selectedRetailer.dealAmount}</p>
                <p><strong>Email:</strong> {selectedRetailer.contact}</p>
                <p><strong>Phone:</strong> {selectedRetailer.phone}</p>
                <p><strong>Address:</strong> {selectedRetailer.address}</p>
              </div>
              <div className="flex justify-end">
                <button className="px-6 py-2 rounded-full bg-blue-600 text-white transition-all duration-300 hover:scale-105 flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> Checkout
                </button>
              </div>
              <button 
                className="absolute top-2 right-2 text-2xl"
                onClick={() => setSelectedRetailer(null)}
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Retailer;
