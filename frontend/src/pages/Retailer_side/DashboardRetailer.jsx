//dashboard_retailer
// DashboardRetailer.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, ChevronRight, ArrowUpRight, Bell, User } from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';
import Payment from '../Payment';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import axios from "axios"
import Negotiate from './Negotiate';
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

function DashboardRetailer() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('dark');

  // Form fields for searching manufacturers
  const [requirements, setRequirements] = useState('');
  const [quantity, setQuantity] = useState('');
  const [budget, setBudget] = useState('');
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [selectedManufacturer, setSelectedManufacturer] = useState(null);

  // Load saved theme on mount (theme set in Dashboard is maintained)
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

  // Dummy manufacturer data (for demonstration)
  // const manufacturers = [
  //   {
  //     id: 1,
  //     name: 'Prime Furnishings',
  //     details: 'Leading manufacturer of premium sofas with innovative designs and exceptional quality.',
  //     price: '$500 per unit',
  //     rating: '4.5',
  //     contact: 'sales@primefurnishings.com',
  //     phone: '123-456-7890',
  //     address: '123 Industrial Rd, Metropolis, USA'
  //   },
  //   {
  //     id: 2,
  //     name: 'Urban Creations',
  //     details: 'Modern designs with superior quality. Trusted by top retailers for their reliability.',
  //     price: '$450 per unit',
  //     rating: '4.2',
  //     contact: 'info@urbancreations.com',
  //     phone: '234-567-8901',
  //     address: '456 Commerce St, Gotham, USA'
  //   },
  //   {
  //     id: 3,
  //     name: 'Classic Comforts',
  //     details: 'Experienced manufacturer focused on durability and comfort. Traditional quality at competitive pricing.',
  //     price: '$480 per unit',
  //     rating: '4.7',
  //     contact: 'support@classiccomforts.com',
  //     phone: '345-678-9012',
  //     address: '789 Trade Ave, Springfield, USA'
  //   },
  // ];


  const [manufacturers, useManufacturer] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);


  const [showChat, setShowChat] = useState(false);
  const handleNegotiate = (product) => {
    console.log(product.manufacturer._id)
    setSelectedProduct(product);
    setSelectedManufacturer(null);
    setShowChat(true);
  };


  const getRetailerProduct = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/product/getproductbysearch`, {
        params: {
          requirements,
          quantity: Number(quantity),
          budget: Number(budget),
        },
        withCredentials: true, // If you need cookies
      });

      console.log("Products Found:", response.data.products);
      useManufacturer(response.data.products);
    } catch (error) {
      alert("Error fetching products: " + (error.response?.data?.message || error.message));
      console.error("Error fetching products:", error);
      useManufacturer([]); // Clear on error
    }
  };




  const handleSearch = async (e) => {
    e.preventDefault();

    console.log("Search Data:", { requirements, quantity, budget });

    if (!requirements || !quantity || !budget) {
      alert("Please fill all fields before searching.");
      return;
    }

    setSearchSubmitted(true);
    await getRetailerProduct();
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
      <div className={`fixed md:static w-[280px] ${bgClass} ${borderClass} h-full z-50 transition-transform duration-300 ease-in-out`}>
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
            href="/dashboard_retailer"
            className={`block px-4 py-3 ${textClass} ${buttonHoverBg} rounded-lg transition-all duration-300 hover:scale-105`}
          >
            Dashboard
          </a>
          <a
            href="/add_details"
            className={`block px-4 py-3 ${textClass} ${buttonHoverBg} rounded-lg transition-all duration-300 hover:scale-105`}
          >
            Add Details
          </a>
          <a
            href="/logout"
            className={`block px-4 py-3 ${textClass} ${buttonHoverBg} rounded-lg transition-all duration-300 hover:scale-105`}
          >
            Logout
          </a>
        </nav>
      </div>

      {/* Mobile Menu Button for Sidebar */}
      <button
        onClick={() => { }}
        className={`md:hidden fixed top-4 left-4 z-40 p-2 ${bgClass} rounded-full shadow transition-shadow duration-300 border ${borderClass} hover:scale-110`}
      >
        <Menu className="w-6 h-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#000000' }} />
      </button>

      {/* Main Content - without left margin */}
      <main className="flex-1 overflow-y-auto p-8 flex flex-col items-start space-y-12">
        {/* Top Bar */}
        <div className={`w-full max-w-4xl flex flex-col md:flex-row md:items-center md:justify-between border-b ${borderClass} pb-4`}>
          <h2 className={`text-2xl font-bold ${textClass} transition-transform duration-300 transform hover:scale-105`}>
            Retailer Dashboard
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

        {/* Left-aligned Search Form */}
        {!searchSubmitted && (
          <div className="w-full max-w-4xl">
            <div className={`p-8 rounded-xl border ${borderClass} shadow-md transition-all duration-300 ${bgClass}`}>
              <h3 className={`text-xl font-semibold ${textClass} mb-6`}>Search for Manufacturers</h3>
              <form onSubmit={handleSearch} className="space-y-6 w-full max-w-md">
                <div>
                  <label className="block mb-2 font-semibold" htmlFor="requirements">
                    Requirements
                  </label>
                  <input
                    type="text"
                    id="requirements"
                    placeholder="Enter your required item"
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-semibold" htmlFor="quantity">
                    Quantity Required
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    placeholder="Enter quantity required..."
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-semibold" htmlFor="budget">
                    Budget
                  </label>
                  <input
                    type="number"
                    id="budget"
                    placeholder="Enter budget..."
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-black text-white transition-all duration-300 hover:scale-105"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Manufacturer Cards */}
        {searchSubmitted && (
          <div className="w-full max-w-4xl mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className={`text-xl font-semibold ${textClass}`}>Manufacturers</h3>
              <button
                className="px-4 py-2 rounded-full border border-gray-300 text-black transition-all duration-300 hover:scale-105"
                onClick={() => setSearchSubmitted(false)}
              >
                Back
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {manufacturers.map((manufacturer) => (
                <div
                  key={manufacturer.id}
                  onClick={() => setSelectedManufacturer(manufacturer)}
                  className="p-4 border border-gray-300 rounded-xl shadow transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <h4 className="text-lg font-bold mb-2">{manufacturer.name}</h4>
                  <p className="text-sm mb-2">{manufacturer.details.substring(0, 50)}...</p>
                  <p className="text-sm font-medium mb-1">Price: {manufacturer.max_price}</p>
                  <p className="text-sm font-medium">Quantity: {manufacturer.quantity}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Popup for Manufacturer Details */}
        {selectedManufacturer && (
          <div className="modal-overlay" onClick={() => setSelectedManufacturer(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-2xl font-bold mb-2">{selectedManufacturer.name}</h3>
              <p className="mb-4">{selectedManufacturer.details}</p>
              <div className="mb-4 space-y-2 text-sm">
                <p><strong>Price:</strong> {selectedManufacturer.max_price}</p>
                <p><strong>Quantity:</strong> {selectedManufacturer.quantity}</p>
                <p><strong>Contact:</strong> {selectedManufacturer.manufacturer.email}</p>
                <p><strong>Phone:</strong> {selectedManufacturer.manufacturer.phone}</p>
                <p><strong>Address:</strong> {selectedManufacturer.manufacturer.address}</p>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => handleNegotiate(selectedManufacturer)}
                  className="px-6 py-2 rounded-full bg-blue-600 text-white transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                  <ChevronRight className="w-4 h-4" /> Negotiate Price
                </button>
                <button
                  onClick={() => navigate('/payment')}
                  className="px-6 py-2 rounded-full bg-green-600 text-white transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                  Checkout
                </button>
              </div>
              <button
                className="absolute top-2 right-2 text-2xl"
                onClick={() => setSelectedManufacturer(null)}
              >
                &times;
              </button>
            </div>
          </div>
        )}


        {/* AI Chatbot */}
        {showChat && selectedProduct && (
          <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-white rounded-lg shadow-xl">
            <Negotiate
              onClose={() => {
                setShowChat(false);
                setSelectedProduct(null);
              }}
              productId={selectedProduct._id}
              initialPrice={selectedProduct.max_price}
              minimumPrice={selectedProduct.min_price}
              productName={selectedProduct.name}
              retailerId={selectedProduct.manufacturer?._id || "1"}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default DashboardRetailer;
