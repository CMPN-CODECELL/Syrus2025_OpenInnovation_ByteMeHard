// ManufacturerRequests.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ManufacturerRequests() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('dark');

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
  }, []);

  // Fixed black and white styling (except badges)
  const bgClass = 'bg-white';
  const textClass = 'text-black';
  const borderClass = 'border-gray-300';
  const buttonHoverBg = 'hover:bg-gray-200';

  // Dummy data for active and completed manufacturer requests
  const activeRequests = [
    {
      id: 1,
      orderFor: "Sofa Order",
      priceOffered: "$450 per unit",
      quantity: "100 units",
      location: "Gotham, USA",
      details: "Urgent order for modern sofas with a minimalist design.",
    },
    {
      id: 2,
      orderFor: "Chair Order",
      priceOffered: "$120 per unit",
      quantity: "200 units",
      location: "Metropolis, USA",
      details: "Request for ergonomic chairs with adjustable features.",
    },
    {
      id: 3,
      orderFor: "Lamp Order",
      priceOffered: "$80 per unit",
      quantity: "150 units",
      location: "Smallville, USA",
      details: "Completed order for modern desk lamps.",
    },
  ];

  const completedRequests = [
    {
      id: 3,
      orderFor: "Table Order",
      priceOffered: "$300 per unit",
      quantity: "50 units",
      location: "Springfield, USA",
      details: "Completed order for dining tables.",
    },
    {
      id: 4,
      orderFor: "Lamp Order",
      priceOffered: "$80 per unit",
      quantity: "150 units",
      location: "Smallville, USA",
      details: "Completed order for modern desk lamps.",
    },
  ];

  // State for the selected request (to show in modal)
  const [selectedRequest, setSelectedRequest] = useState(null);

  return (
    <div className={`${bgClass} min-h-screen flex`}>
      {/* Modal CSS */}
      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0; 
          left: 0;
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
          background: #FFFFFF;
          color: #000000;
          border: 2px solid #ccc;
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
      <div className="fixed md:static w-[280px] bg-white border-gray-300 h-full z-50 p-2">
        <h1 className="text-2xl font-bold flex items-center space-x-3 text-black">
          <div className="bg-white text-black p-3 rounded-lg shadow">
            <span className="text-xl font-black tracking-wider">NG</span>
          </div>
          <span>Nirman Gati</span>
        </h1>
        <nav className="mt-8 space-y-2">
          <a 
            href="/dashboard_producer"
            className="block px-4 py-3 text-black hover:bg-gray-200 rounded transition duration-300"
          >
            Dashboard
          </a>
          <a 
            href="/dashboard_producer"
            className="block px-4 py-3 text-black hover:bg-gray-200 rounded transition duration-300"
          >
            Add Raw Material
          </a>
          <a 
            href="/manufacturer_requests"
            className="block px-4 py-3 text-black hover:bg-gray-200 rounded transition duration-300"
          >
            Manufacturer Requests
          </a>
          <a 
            href="/logout"
            className="block px-4 py-3 text-black hover:bg-gray-200 rounded transition duration-300"
          >
            Logout
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto pt-20 pr-30 pb-4 px-4 space-y-10">
        {/* Active Requests Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-black">Active Manufacturer Requests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {activeRequests.map((request) => (
              <div 
                key={request.id} 
                onClick={() => setSelectedRequest(request)}
                className="p-4 border border-gray-300 rounded-lg shadow hover:shadow-lg transition duration-300 cursor-pointer bg-white text-black"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold">{request.orderFor}</h3>
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">Active</span>
                </div>
                <p className="mb-1"><strong>Price Offered:</strong> {request.priceOffered}</p>
                <p className="mb-1"><strong>Quantity:</strong> {request.quantity}</p>
                <p className="mb-1"><strong>Location:</strong> {request.location}</p>
                <p className="text-sm">{request.details.substring(0, 50)}...</p>
              </div>
            ))}
          </div>
        </section>

        {/* Completed Requests Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-black">Completed Manufacturer Requests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completedRequests.map((request) => (
              <div 
                key={request.id} 
                onClick={() => setSelectedRequest(request)}
                className="p-4 border border-gray-300 rounded-lg shadow hover:shadow-lg transition duration-300 cursor-pointer bg-white text-black"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold">{request.orderFor}</h3>
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">Completed</span>
                </div>
                <p className="mb-1"><strong>Price Offered:</strong> {request.priceOffered}</p>
                <p className="mb-1"><strong>Quantity:</strong> {request.quantity}</p>
                <p className="mb-1"><strong>Location:</strong> {request.location}</p>
                <p className="text-sm">{request.details.substring(0, 50)}...</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Modal Popup for Request Details */}
      {selectedRequest && (
        <div className="modal-overlay" onClick={() => setSelectedRequest(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold mb-2">{selectedRequest.orderFor}</h3>
            <p className="mb-4">{selectedRequest.details}</p>
            <p className="mb-2"><strong>Price Offered:</strong> {selectedRequest.priceOffered}</p>
            <p className="mb-2"><strong>Quantity:</strong> {selectedRequest.quantity}</p>
            <p className="mb-2"><strong>Location:</strong> {selectedRequest.location}</p>
            <div className="flex justify-end space-x-4">
              <button 
                onClick={() => navigate('/negotiate')}
                className="px-6 py-2 rounded-full bg-green-600 text-white transition duration-300 hover:scale-105"
              >
                Negotiate
              </button>
              <button 
                onClick={() => navigate('/payment')}
                className="px-6 py-2 rounded-full bg-blue-600 text-white transition duration-300 hover:scale-105"
              >
                Confirm Deal
              </button>
            </div>
            <button 
              className="absolute top-2 right-2 text-2xl"
              onClick={() => setSelectedRequest(null)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManufacturerRequests;
