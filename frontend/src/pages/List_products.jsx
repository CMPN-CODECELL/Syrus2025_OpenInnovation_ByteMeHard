// List_products.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Menu } from 'lucide-react';

function ListProducts() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  // Form fields
  const [productName, setProductName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [unitsAvailable, setUnitsAvailable] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [rawMaterials, setRawMaterials] = useState('');

  // On mount, load saved theme from localStorage (theme from Dashboard is maintained)
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create an object from form fields
    const productData = {
      productName,
      imageUrl,
      unitsAvailable,
      minPrice,
      maxPrice,
      rawMaterials,
    };
    console.log("Product Data:", productData);
    // Clear form fields
    setProductName('');
    setImageUrl('');
    setUnitsAvailable('');
    setMinPrice('');
    setMaxPrice('');
    setRawMaterials('');
  };

  // Theme-based classes
  const bgClass = theme === 'dark' ? 'bg-black' : 'bg-white';
  const textClass = theme === 'dark' ? 'text-white' : 'text-black';
  const borderClass = theme === 'dark' ? 'border-gray-200' : 'border-gray-300';
  const buttonHoverBg = theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100';
  const sidebarBg = theme === 'dark' ? 'bg-black' : 'bg-white';
  const sidebarText = theme === 'dark' ? 'text-white' : 'text-black';

  return (
    <div className={`flex h-screen ${bgClass}`}>
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
        <div className={`w-full max-w-4xl border-b ${borderClass} pb-4`}>
          <h2 className={`text-2xl font-bold ${textClass}`}>List Your Product</h2>
        </div>
        <div className={`w-full max-w-4xl p-8 rounded-xl border ${borderClass} shadow-md transition-all duration-300 ${bgClass}`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-semibold" htmlFor="productName">
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                placeholder="Enter product name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold" htmlFor="imageUrl">
                Product Image URL
              </label>
              <input
                type="text"
                id="imageUrl"
                placeholder="Enter image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold" htmlFor="unitsAvailable">
                Units Available for Sale
              </label>
              <input
                type="number"
                id="unitsAvailable"
                placeholder="Enter units available"
                value={unitsAvailable}
                onChange={(e) => setUnitsAvailable(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none"
              />
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block mb-2 font-semibold" htmlFor="minPrice">
                  Minimum Price
                </label>
                <input
                  type="number"
                  id="minPrice"
                  placeholder="Min Price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none"
                />
              </div>
              <div className="w-1/2">
                <label className="block mb-2 font-semibold" htmlFor="maxPrice">
                  Maximum Price
                </label>
                <input
                  type="number"
                  id="maxPrice"
                  placeholder="Max Price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 font-semibold" htmlFor="rawMaterials">
                Raw Materials Used
              </label>
              <textarea
                id="rawMaterials"
                placeholder="List raw materials..."
                rows="3"
                value={rawMaterials}
                onChange={(e) => setRawMaterials(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-1/4 py-3 rounded-full bg-white   text-black transition-all duration-300 hover:scale-105"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default ListProducts;
