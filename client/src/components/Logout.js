import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'
const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // Get logout function from context

  useEffect(() => {
    
    
    logout(); // Use logout function from context

    // Redirect to the login page
    navigate('/login');
  }, [logout,navigate]);

  return null; // No UI needed, just handle logout and redirect
};

export default Logout;