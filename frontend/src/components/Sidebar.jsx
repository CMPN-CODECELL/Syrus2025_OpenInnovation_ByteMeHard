// Sidebar.jsx
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Store, 
  X as CloseIcon
} from 'lucide-react';

function Sidebar({ isSidebarOpen, setIsSidebarOpen, theme, sidebarBg, borderClass, sidebarText, buttonHoverBg }) {
  return (
    <aside className={`fixed md:static w-[280px] ${sidebarBg} ${borderClass} h-full z-50 transform transition-transform duration-300 ease-in-out ${
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
    }`}>
      <div className={`p-6 border-b ${borderClass}`}>
        <h1 className={`text-2xl font-bold flex items-center space-x-3 ${sidebarText}`}>
          <div className="bg-white text-black p-3 rounded-lg shadow transition-transform duration-300 hover:scale-105">
            <span className="text-xl font-black tracking-wider">NG</span>
          </div>
          <span className={theme === 'dark' ? "text-white" : "text-black"}>
            Nirmaan Gati
          </span>
        </h1>
      </div>
      <nav className="mt-8 px-4">
        <a 
          href="#"
          className={`flex items-center px-4 py-3 ${sidebarText} ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg border-l ${theme === 'dark' ? 'border-white' : 'border-black'} mb-2 transition-all duration-300 transform hover:scale-105 ${buttonHoverBg} shadow-sm`}
        >
          <LayoutDashboard className="w-5 h-5 mr-3" />
          Dashboard
        </a>
        <a 
          href="/producer"
          className={`flex items-center px-4 py-3 ${sidebarText} ${buttonHoverBg} rounded-lg hover:border-l ${
            theme === 'dark' ? 'border-gray-600' : 'border-gray-400'
          } mb-2 transition-all duration-300 transform hover:scale-105`}
        >
          <Users className="w-5 h-5 mr-3" />
          Producers
        </a>
        <a 
          href="/retailer"
          className={`flex items-center px-4 py-3 ${sidebarText} ${buttonHoverBg} rounded-lg hover:border-l ${
            theme === 'dark' ? 'border-gray-600' : 'border-gray-400'
          } transition-all duration-300 transform hover:scale-105`}
        >
          <Store className="w-5 h-5 mr-3" />
          Retailers
        </a>
      </nav>
      {/* Close button for mobile */}
      <button 
        onClick={() => setIsSidebarOpen(false)}
        className={`md:hidden absolute top-4 right-4 p-2 rounded-full ${buttonHoverBg} transition-colors duration-300 transform hover:scale-110`}
      >
        <CloseIcon className="w-5 h-5" style={{ color: theme === 'dark' ? '#FFFFFF' : '#000000' }} />
      </button>
    </aside>
  );
}

export default Sidebar;
