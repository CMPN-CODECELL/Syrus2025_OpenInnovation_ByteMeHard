// Producer.jsx
import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  ChevronRight, 
  ArrowUpRight, 
  Bell, 
  User 
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

function Producer() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [requirements, setRequirements] = useState('');
  const [rawMaterial, setRawMaterial] = useState('');
  const [selectedRequirements, setSelectedRequirements] = useState([]);
  const [budget, setBudget] = useState(5000);
  const [capacity, setCapacity] = useState('');
  const [location, setLocation] = useState('');
  const [searchSubmitted, setSearchSubmitted] = useState(false);

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

  // Append requirement option to selectedRequirements (if not already added)
  const handleAddRequirement = (option) => {
    if (!selectedRequirements.includes(option)) {
      const newReqs = [...selectedRequirements, option];
      setSelectedRequirements(newReqs);
      setRequirements(newReqs.join(', '));
    }
  };

  // Theme-based class variables
  const bgClass = theme === 'dark' ? 'bg-black' : 'bg-white';
  const textClass = theme === 'dark' ? 'text-white' : 'text-black';
  const borderClass = theme === 'dark' ? 'border-gray-200' : 'border-gray-300';
  const buttonHoverBg = theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100';
  const sidebarBg = theme === 'dark' ? 'bg-black' : 'bg-white';
  const sidebarText = theme === 'dark' ? 'text-white' : 'text-black';

  // Dummy data for producer cards
  const producers = [
    { id: 1, name: 'Producer One', details: 'Experienced in electronics manufacturing.' },
    { id: 2, name: 'Producer Two', details: 'Specializes in home appliances.' },
    { id: 3, name: 'Producer Three', details: 'Expert in custom metal fabrication.' },
  ];

  // Requirement options (example values)
  const requirementOptions = ["High Quality", "Fast Delivery", "Low Cost", "Eco-Friendly", "Custom Design"];

  return (
    <div className={`flex h-screen ${bgClass}`}>
      {/* Inline CSS for custom toggle switch and slider styling */}
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
          border-radius: 24px;
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
          border-radius: 50%;
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
        /* Custom slider for budget */
        input[type="range"].slider-range {
          -webkit-appearance: none;
          width: 40%; /* Reduced width */
          height: 6px;
          border-radius: 5px;
          background: ${theme === 'dark' ? '#FFFFFF' : '#ddd'};
          outline: none;
          transition: background 0.3s ease;
        }
        input[type="range"].slider-range:hover {
          background: ${theme === 'dark' ? '#EEEEEE' : '#ccc'};
        }
        input[type="range"].slider-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #2196F3;
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        input[type="range"].slider-range::-webkit-slider-thumb:hover {
          transform: scale(1.1);
        }
        input[type="range"].slider-range::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #2196F3;
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        input[type="range"].slider-range::-moz-range-thumb:hover {
          transform: scale(1.1);
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
        className={`md:hidden fixed top-4 right-4 z-40 p-2 ${bgClass} rounded-full shadow hover:shadow-xl transition-shadow duration-300 border ${borderClass} transform hover:scale-110`}
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

      {/* Main Content - Centered */}
      <main className="flex-1 overflow-y-auto p-8 flex flex-col items-center">
        {/* Top Bar */}
        <div className={`w-full max-w-4xl flex flex-col md:flex-row md:items-center md:justify-between mb-8 border-b ${borderClass} pb-4`}>
          <h2 className={`text-2xl font-bold ${textClass} transition-transform duration-300 transform hover:scale-105`}>
            Producer
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

        {/* Form Section */}
        {!searchSubmitted && (
          <div className={`w-full max-w-4xl p-6 rounded-xl border ${borderClass} shadow-md transition-all duration-300 ${bgClass} mb-8`}>
            <h3 className={`text-xl font-semibold ${textClass} mb-4`}>Enter Your Requirements</h3>
            <div className="space-y-4">
              {/* Requirements field with options */}
              <div>
                <label className={`block mb-1 ${textClass}`} htmlFor="requirements">Requirements</label>
                <input 
                  type="text" 
                  id="requirements" 
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="Describe your requirements..."
                  className={`w-full p-2 border ${borderClass} rounded-xl focus:outline-none ${bgClass} ${textClass}`}
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  {requirementOptions.map((option, index) => (
                    <div 
                      key={index} 
                      onClick={() => handleAddRequirement(option)}
                      className={`cursor-pointer px-2 py-1 border ${borderClass} rounded-full ${buttonHoverBg} ${textClass} transition-all duration-300 hover:scale-105`}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>

              {/* Raw Material Field */}
              <div>
                <label className={`block mb-1 ${textClass}`} htmlFor="rawMaterial">Raw Material</label>
                <input 
                  type="text" 
                  id="rawMaterial" 
                  value={rawMaterial}
                  onChange={(e) => setRawMaterial(e.target.value)}
                  placeholder="Specify raw materials..."
                  className={`w-full p-2 border ${borderClass} rounded-xl focus:outline-none ${bgClass} ${textClass}`}
                />
              </div>

              {/* Budget Slider */}
              <div>
                <label className={`block mb-1 ${textClass}`} htmlFor="budget">Budget (${budget})</label>
                <input 
                  type="range" 
                  id="budget" 
                  min="1000" 
                  max="10000" 
                  step="500"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="slider-range"
                />
              </div>

              {/* Production Capacity */}
              <div>
                <label className={`block mb-1 ${textClass}`} htmlFor="capacity">Production Capacity</label>
                <input 
                  type="number" 
                  id="capacity" 
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  placeholder="e.g., 1000 units/month"
                  className={`w-full p-2 border ${borderClass} rounded-xl focus:outline-none ${bgClass} ${textClass}`}
                />
              </div>

              {/* Location */}
              <div>
                <label className={`block mb-1 ${textClass}`} htmlFor="location">Location</label>
                <input 
                  type="text" 
                  id="location" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., New York"
                  className={`w-full p-2 border ${borderClass} rounded-xl focus:outline-none ${bgClass} ${textClass}`}
                />
              </div>

              <button 
                className={`px-4 py-2 rounded-full ${buttonHoverBg} border ${borderClass} text-center ${textClass} transition-all duration-300 hover:scale-105 w-1/4`}
                onClick={() => {
                  setSearchSubmitted(true);
                  console.log({ requirements, rawMaterial, budget, capacity, location });
                }}
              >
                Search Producer
              </button>
            </div>
          </div>
        )}

        {/* Producer Cards - only display after search */}
        {searchSubmitted && (
          <div className="w-full max-w-4xl mb-8">
            <h3 className={`text-xl font-semibold ${textClass} mb-4`}>Producers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {producers.map((producer) => (
                <div key={producer.id} className={`p-4 border ${borderClass} rounded-xl shadow ${bgClass} transition-all duration-300 hover:scale-105`}>
                  <h4 className={`text-lg font-bold ${textClass}`}>{producer.name}</h4>
                  <p className={`${textClass} mt-2`}>{producer.details}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Producer;
