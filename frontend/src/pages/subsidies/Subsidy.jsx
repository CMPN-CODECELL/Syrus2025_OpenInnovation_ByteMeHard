import React, { useState } from "react";
import { FiMenu, FiBell, FiUser } from "react-icons/fi"; // Importing icons
import { FaChartBar, FaFileInvoiceDollar } from "react-icons/fa";

const subsidies = [
  {
    id: 1,
    name: "ODOP (One District One Product)",
    description: "Encourages MSMEs to focus on a unique product per district with financial and market support.",
    eligibility: [
      "Registered MSME or startup",
      "Located in an ODOP-designated district",
      "Engaged in production or value addition of district-specific products",
    ],
    details:
      "ODOP provides financial aid, marketing support, and subsidies on raw materials to boost localized manufacturing.",
  },
  {
    id: 2,
    name: "PLI (Production Linked Incentive)",
    description: "Incentivizes manufacturers with financial benefits based on production volume.",
    eligibility: [
      "Business engaged in manufacturing sector",
      "Minimum investment of ₹10 crore (varies by sector)",
      "Must meet specified production targets to avail incentives",
    ],
    details:
      "PLI aims to boost domestic manufacturing and exports by offering cash incentives to eligible businesses.",
  },
  {
    id: 3,
    name: "MSME Subsidy Scheme",
    description: "Financial aid for small & medium enterprises for infrastructure, tech upgrades, and marketing.",
    eligibility: [
      "Registered MSME in India",
      "Annual turnover under ₹250 crore",
      "Utilizing the funds for business expansion, technology, or workforce development",
    ],
    details:
      "This scheme supports MSMEs with low-interest loans, subsidies, and grants to enhance competitiveness.",
  },
];

const Subsidy = () => {
  const [selectedSubsidy, setSelectedSubsidy] = useState(null);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Nirman Gati</h2>
        <nav className="space-y-4">
          <button className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
            <FaChartBar /> <span>Dashboard</span>
          </button>
          <button className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
            <FaFileInvoiceDollar /> <span>Subsidies</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-100">
        {/* Top Navbar */}
        <div className="bg-white shadow-md p-4 flex justify-between items-center">
          <FiMenu className="text-gray-700 text-2xl cursor-pointer" />
          <div className="flex items-center space-x-4">
            <FiBell className="text-gray-700 text-2xl cursor-pointer" />
            <FiUser className="text-gray-700 text-2xl cursor-pointer" />
          </div>
        </div>

        {/* Subsidies Section */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Government Subsidies & Schemes</h2>

          {/* Subsidy Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {subsidies.map((subsidy) => (
              <div key={subsidy.id} className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-start">
                <h3 className="text-xl font-semibold text-gray-900">{subsidy.name}</h3>
                <p className="text-gray-700 mt-2">{subsidy.description}</p>
                <button
                  onClick={() => setSelectedSubsidy(subsidy)}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                >
                  Enquire
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enquiry Popup Modal */}
      {selectedSubsidy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            <button
              onClick={() => setSelectedSubsidy(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl"
            >
              ✖
            </button>
            <h3 className="text-2xl font-bold text-gray-900">{selectedSubsidy.name}</h3>
            <p className="text-gray-700 mt-2">{selectedSubsidy.details}</p>
            <h4 className="text-lg font-semibold mt-4">Eligibility Criteria:</h4>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              {selectedSubsidy.eligibility.map((criteria, index) => (
                <li key={index}>✅ {criteria}</li>
              ))}
            </ul>
            <button
              onClick={() => alert("Application Process Coming Soon!")}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded w-full"
            >
              Apply Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subsidy;
