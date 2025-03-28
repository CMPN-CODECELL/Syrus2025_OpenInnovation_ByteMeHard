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
        <Route path="/producer" element={<Producer />} />

        <Route path="/retailer" element={<Retailer />} />

      </Routes>
    </Router>
  );
}
