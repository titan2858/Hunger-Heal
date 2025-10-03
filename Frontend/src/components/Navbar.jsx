import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navLinks = [
    { name: 'About us', path: '/about' },
    { name: 'Our mission', path: '/mission' },
    { name: 'Contact us', path: '/contact' },
    { name: 'Login', path: '/login', isButton: true },
    { name: 'Signup', path: '/signup', isButton: true },
  ];

  return (
    // Updated green gradient
    <nav className="bg-gradient-to-r from-green-700 to-emerald-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          
          {/* Text-Based Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-3xl font-extrabold tracking-wider text-white">
                HUNGERHEAL
              </span>
            </Link>
          </div>

          {/* Right-Aligned Navigation Links */}
          <div>
            <div className="flex items-center space-x-6">
              {navLinks.map((link) => (
                link.isButton ? (
                  <Link
                    key={link.name}
                    to={link.path}
                    // Updated green buttons
                    className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-gray-200 hover:text-white transition-colors duration-300 font-medium text-sm"
                  >
                    {link.name}
                  </Link>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;