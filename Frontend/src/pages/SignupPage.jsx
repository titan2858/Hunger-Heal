import React, { useState ,useContext} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Input from '../components/Input';
import axios from 'axios';
import { AuthContext } from '@/context/AuthContext';
import banner from '../assets/Images/banner.jpg';
import { User, Mail, Lock, ShieldCheck } from 'lucide-react'; // Added ShieldCheck icon

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'donor', // Added role to the state, default to 'donor'
  });
   
  const { login } = useContext(AuthContext);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 3. Send a POST request to your backend API
      const response = await axios.post('http://localhost:5000/api/auth/signup', formData);
      
      login(response.data);
      // NEXT STEPS: Save the token (response.data.token) and redirect the user
      
    } catch (error) {
      // 4. Handle errors (e.g., user already exists)
      console.error('Signup error:', error.response ? error.response.data.message : error.message);
      alert('Signup failed: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center" 
      style={{ backgroundImage: `url(${banner})` }}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-sm p-10 rounded-2xl shadow-lg"
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create Your Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500">
              already have an account?
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px flex flex-col gap-5">
            <Input
              id="fullName"
              type="text"
              placeholder="Full Name"
              icon={User}
              value={formData.fullName}
              onChange={handleChange}
            />
            <Input
              id="email"
              type="email"
              placeholder="Email address"
              icon={Mail}
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              id="password"
              type="password"
              placeholder="Password"
              icon={Lock}
              value={formData.password}
              onChange={handleChange}
            />
            
            {/* ## NEW ROLE DROPDOWN ## */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ShieldCheck className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm appearance-none"
              >
                <option value="donor">I am a Donor</option>
                <option value="agent">I am an Agent</option>
                <option value="admin">I am an Admin</option>
              </select>
            </div>
            
          </div>
          <div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Sign up
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default SignupPage;