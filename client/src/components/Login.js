
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import backgroundImage from '../assets/backgroundImage.png';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    console.log(`${process.env.BACKEND_URL}`)
    const url = "https://expense-tracker-upba.onrender.com";
    try {
      const response = await axios.post(`${url}/api/users/login`, { email, password });
      console.log('Login successful:', response.data);
     
      
      login(response.data.token); // Use login function from context
      navigate('/expenses'); // Redirect to the expenses page after login
    } catch (err) {
      setError(err.response ? err.response.data.error : err.message);
    }
  };

  return (
    <div className="flex items-center justify-center bg-cover bg-center bg-no-repeat min-h-screen bg-gray-100 p-6"
    style={{ backgroundImage: `url(${backgroundImage})` }}
    >



      <div className="bg-white bg-opacity-70 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2 text-gray-800" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2 text-gray-800" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#1F2937] text-white py-2 px-4 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

