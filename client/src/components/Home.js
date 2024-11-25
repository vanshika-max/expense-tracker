import React from 'react';
import backgroundImage from '../assets/backgroundImage.png';

const Home = () => {
  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-white bg-opacity-70 p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 hover:text-blue-600 transition duration-300">
          Welcome to the <br /> Expense Management App
        </h1>
      </div>
    </div>
  );
};

export default Home;
