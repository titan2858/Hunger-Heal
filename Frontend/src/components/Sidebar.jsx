import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, HandHeart, History, User, LogOut, Package, Users, Settings } from 'lucide-react';

// At the top of Sidebar.jsx
const donorLinks = [
  { name: 'Dashboard', path: '/dashboard/donor', icon: LayoutDashboard },
  { name: 'Donate', path: '/dashboard/donate', icon: HandHeart },
  { name: 'Pending Donations', path: '/dashboard/pending', icon: History },
  { name: 'Previous Donations', path: '/dashboard/previous', icon: User },
  { name: 'My Profile', path: '/dashboard/profile', icon: Settings }, // ADDED
];
const agentLinks = [
  { name: 'Dashboard', path: '/dashboard/agent', icon: LayoutDashboard },
  { name: 'Pending Collections', path: '/dashboard/agent/pending', icon: Package },
  { name: 'Previous Collections', path: '/dashboard/agent/previous', icon: History },
  { name: 'My Profile', path: '/dashboard/profile', icon: Settings }, // ADDED
];
const adminLinks = [
  { name: 'Dashboard', path: '/dashboard/admin', icon: LayoutDashboard },
  { name: 'Manage Donations', path: '/dashboard/admin/donations', icon: Package },
  { name: 'Manage Users', path: '/dashboard/admin/users', icon: Users },
  { name: 'My Profile', path: '/dashboard/profile', icon: Settings }, // Replaced Settings
];

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

  let links = [];
  if (user?.role === 'donor') links = donorLinks;
  if (user?.role === 'agent') links = agentLinks;
  if (user?.role === 'admin') links = adminLinks;

  return (
    <aside className="w-64 bg-slate-800 text-white flex flex-col">
      <div className="p-6 text-center border-b border-slate-700">
        <h2 className="text-xl font-semibold">Welcome,</h2>
        <p className="text-lg font-bold">{user ? user.fullName : 'Guest'}</p>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
              location.pathname === link.path 
              ? 'bg-purple-600 text-white' 
              : 'text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <link.icon className="h-5 w-5" />
            <span>{link.name}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-700">
        <button 
          onClick={logout} 
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;