import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DonorDashboard from './pages/dashboard/DonorDashboard';
import AgentDashboard from './pages/dashboard/AgentDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard'; // 1. Import AdminDashboard

function App() {
  const location = useLocation();
  const showNavbar = !location.pathname.startsWith('/dashboard');

  return (
    <div className="font-poppins">
      {showNavbar && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard/donor" element={<DonorDashboard />} />
          <Route path="/dashboard/agent" element={<AgentDashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} /> {/* 2. Add the new route */}
        </Routes>
      </main>
    </div>
  );
}

export default App;