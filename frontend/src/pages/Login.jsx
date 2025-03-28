import React, { useState } from 'react';
import { Facebook, Twitter, Github, Linkedin } from 'lucide-react';
import { postRequest } from '../utils/api';
import toast, { useToaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  const [isSignUp, setIsSignUp] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone_number: '',
    address: '',
    type: '',
    typeOfManufacturer: ''
  });
  const toast = useToaster();

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const manufacturerTypes = [
    'Furniture',
    'Electronics',
    'Automotive',
    'Textiles',
    'Food & Beverages',
    'Pharmaceuticals'
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login data:', formData);
    const response = await postRequest('/api/login', formData);
    console.log("Response from login", response);
    if (response) {
      alert("Login successful");
      navigate("/dashboard");
      console.log("Login successful", response.data);
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    // Handle registration logic here

    console.log('Registration data:', formData);
    try {
      const response = await postRequest('/api/register', formData);
      if (response) {
        alert("Registration successful");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error('Error during registration:', error);
      toast.error('Registration failed. Please try again.');
      return;
    }
    // const response = await postRequest('/api/register',formData);
    // console.log("Response from register",response);
    // if(response.status==201){
    //   alert("Registration successful");
    //   console.log("Registration successful",response.data);
    // }
    // else if(response.status==400){
    //   alert("User already exists");
    //   console.log("User already exists",response.data);
    // }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="relative w-full max-w-[1000px] h-[700px] bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Sliding Overlay */}
        <div
          className={`absolute top-0 w-1/2 h-full bg-black transition-transform duration-700 ease-in-out z-50 ${isSignUp ? 'translate-x-full' : ''
            }`}
        >
          {/* Sign In Content */}
          <div className={`absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center p-8 text-white transition-opacity duration-700 ${isSignUp ? 'opacity-0' : 'opacity-100'
            }`}>
            <h2 className="text-2xl font-bold mb-4">Welcome Back!</h2>
            <p className="text-sm text-center mb-6">Enter your personal details to use all of site features</p>
            <button
              onClick={toggleForm}
              className="border-2 border-white text-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition-colors text-sm"
            >
              SIGN IN
            </button>
          </div>

          {/* Sign Up Content */}
          <div className={`absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center p-8 text-white transition-opacity duration-700 ${isSignUp ? 'opacity-100' : 'opacity-0'
            }`}>
            <h2 className="text-2xl font-bold mb-4">Hello, Friend!</h2>
            <p className="text-sm text-center mb-6">Enter your personal details and start journey with us</p>
            <button
              onClick={toggleForm}
              className="border-2 border-white text-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition-colors text-sm"
            >
              SIGN UP
            </button>
          </div>
        </div>

        {/* Sign In Form */}
        <div className="absolute top-0 left-0 w-1/2 h-full p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
          <div className="flex justify-center gap-4 mb-6">
            <Facebook className="w-5 h-5 text-gray-600 cursor-pointer hover:text-black" />
            <Twitter className="w-5 h-5 text-gray-600 cursor-pointer hover:text-black" />
            <Github className="w-5 h-5 text-gray-600 cursor-pointer hover:text-black" />
            <Linkedin className="w-5 h-5 text-gray-600 cursor-pointer hover:text-black" />
          </div>
          <p className="text-center text-gray-600 text-sm mb-6">or use your email password</p>
          <input
            type="email"
            placeholder="Email"
            name='email'
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            value={formData.email}
            className="mb-4 p-2.5 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black text-sm"
          />
          <input
            type="password"
            placeholder="Password"
            name='password'
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            value={formData.password}
            className="mb-4 p-2.5 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black text-sm"
          />
          <a href="#" className="text-xs text-gray-600 hover:text-black mb-6 text-center">
            Forget Your Password?
          </a>
          <button onClick={(e) => handleLogin(e)} className="bg-black text-white px-6 py-2.5 rounded-full hover:bg-gray-800 transition-colors text-sm">
            SIGN IN
          </button>
        </div>

        {/* Sign Up Form */}
        <div className="absolute top-0 right-0 w-1/2 h-full p-8 flex flex-col justify-center overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
          <div className="flex justify-center gap-4 mb-6">
            <Facebook className="w-5 h-5 text-gray-600 cursor-pointer hover:text-black" />
            <Twitter className="w-5 h-5 text-gray-600 cursor-pointer hover:text-black" />
            <Github className="w-5 h-5 text-gray-600 cursor-pointer hover:text-black" />
            <Linkedin className="w-5 h-5 text-gray-600 cursor-pointer hover:text-black" />
          </div>
          <p className="text-center text-gray-600 text-sm mb-6">or use your email for registration</p>
          <select
            className="mb-4 p-2.5 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black bg-white text-sm"
            value={selectedType}
            onChange={(e) => { setSelectedType(e.target.value); setFormData({ ...formData, type: e.target.value }) }}
          >
            <option value="" disabled>Select Type</option>
            <option value="manufacturer">Manufacturer</option>
            <option value="retailer">Retailer</option>
            <option value="supplier">Raw Material Supplier</option>
          </select>
          {selectedType === 'manufacturer' && (
            <select
              className="mb-4 p-2.5 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black bg-white text-sm"
              defaultValue=""
              onChange={(e) => setFormData({ ...formData, typeOfManufacturer: e.target.value })}
            >
              <option value="" disabled>Select Manufacturer Type</option>
              {manufacturerTypes.map((type) => (
                <option key={type} value={type.toLowerCase()}>{type}</option>
              ))}
            </select>
          )}
          <input
            type="text"
            placeholder="Name"
            name='name'
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            value={formData.name}
            className="mb-4 p-2.5 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black text-sm"
          />
          <input
            type="email"
            placeholder="Email"
            name='email'
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            value={formData.email}
            className="mb-4 p-2.5 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black text-sm"
          />
          <input
            type="password"
            placeholder="Password"
            name='password'
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            value={formData.password}
            className="mb-4 p-2.5 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black text-sm"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            name='phone_number'
            onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
            value={formData.phone_number}
            className="mb-4 p-2.5 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black text-sm"
          />
          <textarea
            placeholder="Address"
            name='address'
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            value={formData.address}
            rows={3}
            className="mb-6 p-2.5 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black resize-none text-sm"
          />
          <button onClick={(e) => handleRegister(e)} className="bg-black text-white px-6 py-2.5 rounded-full hover:bg-gray-800 transition-colors text-sm">
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;