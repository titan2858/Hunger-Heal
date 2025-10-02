import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DonorDashboard from './pages/dashboard/DonorDashboard';
import AgentDashboard from './pages/dashboard/AgentDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard'; // 1. Import AdminDashboard
import DonatePage from './pages/dashboard/DonatePage'; // 1. Import
import MyDonationsPage from './pages/dashboard/PendingDonationsPage'; 
import PendingDonationsPage from './pages/dashboard/PendingDonationsPage';
import PreviousDonationsPage from './pages/dashboard/PreviousDonationsPage';
import PendingCollectionsPage from './pages/dashboard/PendingCollectionsPage';
import PreviousCollectionsPage from './pages/dashboard/PreviousCollectionsPage';
import DonationDetailsPage from './pages/dashboard/DonationDetailsPage';
import ManageDonationsPage from './pages/dashboard/ManageDonationsPage';
import ManageUsersPage from './pages/dashboard/ManageUsersPage';
import ProfilePage from './pages/dashboard/ProfilePage';

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
          <Route path="/dashboard/admin" element={<AdminDashboard />} /> 
           <Route path="/dashboard/donate" element={<DonatePage />} />
          <Route path="/dashboard/pending" element={<PendingDonationsPage />} />
        <Route path="/dashboard/previous" element={<PreviousDonationsPage />} />
        <Route path="/dashboard/agent/pending" element={<PendingCollectionsPage />} />
        <Route path="/dashboard/agent/previous" element={<PreviousCollectionsPage />} />
        <Route path="/dashboard/collection/:id" element={<DonationDetailsPage />} />
        <Route path="/dashboard/admin/donations" element={<ManageDonationsPage />} />
        <Route path="/dashboard/admin/users" element={<ManageUsersPage />} />
        <Route path="/dashboard/profile" element={<ProfilePage />} />{/* 2. Add the new route */}
        </Routes>
      </main>
    </div>
  );
}

export default App;