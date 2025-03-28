import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard"; // Create this component
import Producer from "./pages/Producer";
import Retailer from "./pages/Retailer";
import Login from "./pages/Login";
import List_products from "./pages/List_products";


export default function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Landing />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/producer" element={<Producer />} />
        <Route path="/retailer" element={<Retailer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/list_products" element={<List_products />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}
