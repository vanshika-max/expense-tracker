
import React from 'react';
import { AuthProvider } from './context/AuthContext'; 
import './index.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Logout from './components/Logout';
// Function to check if the user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// PrivateRoute component to protect routes
const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    // wrap yoour app with authprovider
    <AuthProvider> 
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/expenses" element={<PrivateRoute element={<ExpenseList />} />} />
        <Route path="/add-expense" element={<PrivateRoute element={<ExpenseForm />} />} />
        <Route path="/logout" element={<Logout/>}/>
      </Routes>
    </div>
    </AuthProvider>
  );
};

export default App;
