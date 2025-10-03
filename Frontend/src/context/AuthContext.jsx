import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [donations, setDonations] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user info is in localStorage on app load
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('userInfo', JSON.stringify(userData));
    setUser(userData);
    // Redirect based on role
    switch (userData.role) {
      case 'admin':
        navigate('/dashboard/admin');
        break;
      case 'agent':
        navigate('/dashboard/agent');
        break;
      default:
        navigate('/dashboard/donor');
    }
  };
const fetchDonations = async (token) => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.get('http://localhost:5000/api/donations/mydonations', config);
      setDonations(data);
    } catch (error) {
      console.error("Failed to fetch donations in context", error);
    }
  };
  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout,donations, fetchDonations}}>
      {children}
    </AuthContext.Provider>
  );
};