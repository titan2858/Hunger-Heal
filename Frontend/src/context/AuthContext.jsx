import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true); // State to track initial data load
  const navigate = useNavigate();

  // This effect runs once on app startup to check for a logged-in user
  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setLoading(false); // If there's no stored user, we're done loading
    }
  }, []);

  // Function to fetch donations for the logged-in user
  const fetchDonations = async (token) => {
    setLoading(true); // Set loading to true before the API call
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.get('http://localhost:5000/api/donations/mydonations', config);
      setDonations(data);
    } catch (error) {
      console.error("Failed to fetch donations in context", error);
    } finally {
      setLoading(false); // Set loading to false after the API call completes or fails
    }
  };

  // This effect runs whenever the 'user' state changes (i.e., after login)
  useEffect(() => {
    if (user) {
      fetchDonations(user.token);
    }
  }, [user]);

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

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    setDonations([]); // Clear donations on logout
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, donations, fetchDonations }}>
      {children}
    </AuthContext.Provider>
  );
};