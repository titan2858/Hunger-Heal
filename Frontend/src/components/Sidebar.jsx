import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, HandHeart, History, User, LogOut } from 'lucide-react';
import { AuthContext } from '../context/AuthContext'; 
import { useContext } from 'react';

const Sidebar = () => {
  const location = useLocation();
    const { user, logout } = useContext(AuthContext); // Get user and logout function

  const donorLinks = [
    { name: 'Dashboard', path: '/dashboard/donor', icon: LayoutDashboard },
    { name: 'Donate', path: '/dashboard/donate', icon: HandHeart },
    { name: 'My Pending Donations', path: '/dashboard/pending', icon: History },
    { name: 'My Previous Donations', path: '/dashboard/previous', icon: User },
  ];

  return (
    <aside className="w-64 bg-slate-800 text-white flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-slate-700">
        <Link to="/">HungerHeal</Link>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {donorLinks.map((link) => (
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
        <Link to="/logout" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white">
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;