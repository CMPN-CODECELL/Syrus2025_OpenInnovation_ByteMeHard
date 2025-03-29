import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage"; // Adjust path if needed
import Dashboard from "./pages/Dashboard"; // Create this component
import Producer from "./pages/Producer";
import Retailer from "./pages/Retailer";
import Login from "./pages/Login";
import List_products from "./pages/List_products";
import DashboardRetailer from "./pages/Retailer_side/DashboardRetailer";
import Negotiate from "./pages/Retailer_side/Negotiate";
import DashboardProducer from "./pages/Producer_side/DashboardProducer";
import ManufacturerRequests from "./pages/Producer_side/ManufacturerRequests";



export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/producer" element={<Producer />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/retailer" element={<Retailer />} />
        <Route path="/list_products" element={<List_products />} />
        <Route path="/dashboard_retailer" element={<DashboardRetailer />} />
        <Route path="/negotiate" element={<Negotiate />} />
        <Route path="/dashboard_producer" element={<DashboardProducer />} />
        <Route path="/manufacturer_requests" element={<ManufacturerRequests />} />




      </Routes>
    </Router>
  );
}
