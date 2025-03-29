// DashboardProducer.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, User, ChevronRight } from 'lucide-react';
import Payment from '../Payment';

function DashboardProducer() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('dark');

  // Form fields for adding raw material details
  const [sell, setSell] = useState('');
  const [manufacturerType, setManufacturerType] = useState('');
  const [rawBudget, setRawBudget] = useState('');
  const [rawQuantity, setRawQuantity] = useState('');
  const [area, setArea] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [rawMaterials, setRawMaterials] = useState([]);
  const [selectedRawMaterial, setSelectedRawMaterial] = useState(null);

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
  }, []);

  // Theme-based classes
  const bgClass = theme === 'dark' ? 'bg-black' : 'bg-white';
  const textClass = theme === 'dark' ? 'text-white' : 'text-black';
  const borderClass = theme === 'dark' ? 'border-gray-200' : 'border-gray-300';
  const buttonHoverBg = theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100';
  const sidebarBg = theme === 'dark' ? 'bg-black' : 'bg-white';
  const sidebarText = theme === 'dark' ? 'text-white' : 'text-black';

  // Handle adding a raw material entry
  const handleAddRawMaterial = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      sell,
      manufacturerType,
      rawBudget,
      rawQuantity,
      area,
      additionalDetails,
    };
    setRawMaterials([newEntry, ...rawMaterials]);
    // Clear fields
    setSell('');
    setManufacturerType('');
    setRawBudget('');
    setRawQuantity('');
    setArea('');
    setAdditionalDetails('');
  };

  // Handle Confirm Deal action (for now, we navigate to a confirmation page)
  const handleConfirmDeal = () => {
    console.log("Deal confirmed for:", selectedRawMaterial);
    navigate('/payment'); // Make sure this route is defined
  };

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

      {/* Inline Sidebar */}
      <div className={`fixed md:static w-[280px] ${sidebarBg} ${borderClass} h-full z-50 transition-transform duration-300 ease-in-out`}>
        <div className={`p-6 border-b ${borderClass}`}>
          <h1 className={`text-2xl font-bold flex items-center space-x-3 ${textClass}`}>
            <div className="bg-white text-black p-3 rounded-lg shadow transition-transform duration-300 hover:scale-105">
              <span className="text-xl font-black tracking-wider">NG</span>
            </div>
            <span className={textClass}>Nirman Gati</span>
          </h1>
        </div>
        <nav className="mt-8 px-4 space-y-2">
          <a 
            href="/dashboard_producer"
            className={`block px-4 py-3 ${sidebarText} ${buttonHoverBg} rounded-lg transition-all duration-300 hover:scale-105`}
          >
            Dashboard
          </a>
          <a 
            href="/dashboard_producer"
            className={`block px-4 py-3 ${sidebarText} ${buttonHoverBg} rounded-lg transition-all duration-300 hover:scale-105`}
          >
            Add Raw Material
          </a>
          <a 
            href="/manufacturer_requests"
            className={`block px-4 py-3 ${sidebarText} ${buttonHoverBg} rounded-lg transition-all duration-300 hover:scale-105`}
          >
            Manufacturer Requests
          </a>
          <a 
            href="/logout"
            className={`block px-4 py-3 ${sidebarText} ${buttonHoverBg} rounded-lg transition-all duration-300 hover:scale-105`}
          >
            Logout
          </a>
        </nav>
      </div>

      {/* Mobile Menu Button for Sidebar */}
      <button 
        onClick={() => {}}
        className={`md:hidden fixed top-4 left-4 z-40 p-2 ${bgClass} rounded-full shadow transition-shadow duration-300 border ${borderClass} hover:scale-110`}
      >
        <Menu className="w-6 h-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#000000' }} />
      </button>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 flex flex-col items-start space-y-12">
        {/* Top Bar */}
        <div className={`w-full max-w-4xl flex flex-col md:flex-row md:items-center md:justify-between border-b ${borderClass} pb-4`}>
          <h2 className={`text-2xl font-bold ${textClass} transition-transform duration-300 transform hover:scale-105`}>
            Producer Dashboard
          </h2>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <button className={`p-2 rounded-full ${buttonHoverBg} border ${borderClass} transition-transform duration-300 transform hover:scale-105`}>
              <Bell className="w-6 h-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#000000' }} />
            </button>
            <button className={`p-2 rounded-full ${buttonHoverBg} border ${borderClass} transition-transform duration-300 transform hover:scale-105`}>
              <User className="w-6 h-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#000000' }} />
            </button>
          </div>
        </div>

        {/* Raw Material Form */}
        <div className="w-full max-w-4xl">
          <div className={`p-8 rounded-xl border ${borderClass} shadow-md transition-all duration-300 ${bgClass}`}>
            <h3 className={`text-xl font-semibold ${textClass} mb-6`}>Add Your Raw Material</h3>
            <form onSubmit={handleAddRawMaterial} className="space-y-4 w-full max-w-md">
              <div>
                <label className="block mb-1 font-semibold" htmlFor="sell">
                  What do you sell?
                </label>
                <input
                  type="text"
                  id="sell"
                  placeholder="e.g., Steel, Wood, Fabric, etc."
                  value={sell}
                  onChange={(e) => setSell(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold" htmlFor="manufacturerType">
                  Looking for Manufacturer Type
                </label>
                <select
                  id="manufacturerType"
                  value={manufacturerType}
                  onChange={(e) => setManufacturerType(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none"
                >
                  <option value="">Select Manufacturer Type</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Automotive">Automotive</option>
                  <option value="Textiles">Textiles</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 font-semibold" htmlFor="rawBudget">
                  Budget for Raw Material ($)
                </label>
                <input
                  type="number"
                  id="rawBudget"
                  placeholder="Enter your budget..."
                  value={rawBudget}
                  onChange={(e) => setRawBudget(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold" htmlFor="rawQuantity">
                  Quantity
                </label>
                <input
                  type="number"
                  id="rawQuantity"
                  placeholder="Enter quantity available..."
                  value={rawQuantity}
                  onChange={(e) => setRawQuantity(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold" htmlFor="area">
                  Area Required (sq.ft.)
                </label>
                <input
                  type="text"
                  id="area"
                  placeholder="Enter area in sq.ft. (if applicable)..."
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold" htmlFor="additionalDetails">
                  Additional Details
                </label>
                <textarea
                  id="additionalDetails"
                  placeholder="Enter any additional details..."
                  rows="3"
                  value={additionalDetails}
                  onChange={(e) => setAdditionalDetails(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-full bg-black text-white transition-all duration-300 hover:scale-105"
              >
                Add Raw Material
              </button>
            </form>
          </div>
        </div>

        {/* Raw Material Cards */}
        {rawMaterials.length > 0 && (
          <div className="w-full max-w-4xl mb-8">
            <h3 className={`text-xl font-semibold ${textClass} mb-6`}>Your Raw Materials</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rawMaterials.map((material) => (
                <div
                  key={material.id}
                  onClick={() => setSelectedRawMaterial(material)}
                  className="p-4 border border-gray-300 rounded-xl shadow transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <h4 className="text-lg font-bold mb-2">{material.sell}</h4>
                  <p className="text-sm mb-1"><strong>Manufacturer Type:</strong> {material.manufacturerType}</p>
                  <p className="text-sm mb-1"><strong>Budget:</strong> ${material.rawBudget}</p>
                  <p className="text-sm mb-1"><strong>Quantity:</strong> {material.rawQuantity}</p>
                  <p className="text-sm"><strong>Area:</strong> {material.area}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Popup for Raw Material Details */}
        {selectedRawMaterial && (
          <div className="modal-overlay" onClick={() => setSelectedRawMaterial(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-2xl font-bold mb-2">{selectedRawMaterial.sell}</h3>
              <p className="mb-2"><strong>Manufacturer Type:</strong> {selectedRawMaterial.manufacturerType}</p>
              <p className="mb-2"><strong>Budget:</strong> ${selectedRawMaterial.rawBudget}</p>
              <p className="mb-2"><strong>Quantity:</strong> {selectedRawMaterial.rawQuantity}</p>
              <p className="mb-2"><strong>Area:</strong> {selectedRawMaterial.area}</p>
              <p className="mb-4"><strong>Additional Details:</strong> {selectedRawMaterial.additionalDetails}</p>
              <div className="flex justify-end space-x-4">
                <button 
                  onClick={handleConfirmDeal}
                  className="px-6 py-2 rounded-full bg-blue-600 text-white transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                  <ChevronRight className="w-4 h-4" /> Confirm Deal
                </button>
                <button 
                  onClick={() => navigate('/negotiate')}
                  className="px-6 py-2 rounded-full bg-green-600 text-white transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                  Negotiate
                </button>
              </div>
              <button 
                className="absolute top-2 right-2 text-2xl"
                onClick={() => setSelectedRawMaterial(null)}
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

export default DashboardProducer;
