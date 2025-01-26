
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ExpenseForm = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate(); // Use useNavigate hook
  const url = "https://expense-tracker-upba.onrender.com";
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${url}/api/expenses`, 
        { amount, category, description }, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setSuccess('Expense added successfully!');
      setError('');
      setAmount('');
      setCategory('');
      setDescription('');
      setTimeout(() => navigate('/expenses'), 1000); // Redirect after a short delay
    } catch (err) {
      setError('Error adding expense: ' + (err.response ? err.response.data.error : err.message));
      setSuccess('');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#EBEAFF] p-6"
    
    >
      <div className="bg-[#574bbe] p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-3xl  mb-6 text-center text-white">Add Expense</h2>
        {success && <p className="text-white mb-4 text-center">{success}</p>}
        {error && <p className="text-red-800 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium mb-2 text-white text-lg" htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2 text-white text-lg" htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DFF2EB]"
              required
            >
              <option value="" disabled>Select category</option>
              <option value="food">Food</option>
              <option value="cloth">Cloth</option>
              <option value="rent">Rent</option>
              <option value="health">Health</option>
              <option value="shopping">Shopping</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block  font-medium mb-2 text-white text-lg" htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#0c0e0d] text-white
            font-bold  py-2 px-4 rounded-lg hover:bg-[#7fcf9d] focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
