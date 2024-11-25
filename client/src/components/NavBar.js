
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

const NavBar = () => {
  

  const { auth } = useAuth(); 

  return (
    <nav className="flex justify-between items-center p-6 bg-[#73EC8B] bg-opacity-70 text-gray-800 ">
      <div className="text-lg font-bold text-gray-800 hover:text-blue-600 transition duration-300">
        <Link to="/">Pennywise</Link>
      </div>
      <div className="space-x-6">
        <Link to="/" className=" text-xl  hover:text-gray-400 text-black ">Home</Link>
        
        {auth.token ? (
          <>
            <Link to="/expenses" className="hover:text-gray-400 text-xl text-black">Expenses</Link>
            <Link to="/add-expense" className="hover:text-gray-400 text-xl text-black">Add Expense</Link>
            <Link to="/logout" className="hover:text-gray-400 text-xl text-black">Logout</Link>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-400 text-xl text-black">Login</Link>
            <Link to="/register" className="hover:text-gray-400 text-xl text-black">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
