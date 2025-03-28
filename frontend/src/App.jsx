import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard"; // Create this component
import Producer from "./pages/Producer";
import Retailer from "./pages/Retailer";
import Payment from "./Payment";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/payment" element={<Payment />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/producer" element={<Producer />} />
        <Route path="/retailer" element={<Retailer />} />
      </Routes>
    </Router>
  );
}
