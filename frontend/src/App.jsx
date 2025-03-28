import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage"; // Adjust path if needed
import Dashboard from "./pages/Dashboard"; // Create this component
import Producer from "./pages/Producer"; 
import Retailer from "./pages/Retailer";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />

        <Route path="/producer" element={<Producer />} />

        <Route path="/retailer" element={<Retailer />} />
        <Route path="/list_products" element={<List_products />} />
        <Route path="/dashboard_retailer" element={<DashboardRetailer />} />
        <Route path="/negotiate" element={<Negotiate />} />


      </Routes>
    </Router>
  );
}
