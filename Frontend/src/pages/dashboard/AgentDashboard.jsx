import React, { useState, useEffect, useContext } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const AgentDashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState([
    { title: 'Pending Collections', value: 0, color: 'bg-blue-500' },
    { title: 'Donations Collected Today', value: 0, color: 'bg-green-500' },
  ]);

  useEffect(() => {
    const fetchAgentData = async () => {
      if (!user) return;
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get('http://localhost:5000/api/donations/agent', config);

        // Calculate stats dynamically
        const pendingCount = data.filter(d => d.status === 'Assigned').length;
        const collectedCount = data.filter(d => d.status === 'Collected').length; 
        
        setStats([
          { title: 'Pending Collections', value: pendingCount, color: 'bg-blue-500' },
          { title: 'Donations Collected', value: collectedCount, color: 'bg-green-500' },
        ]);

      } catch (error) {
        console.error("Failed to fetch agent data", error);
      }
    };
    fetchAgentData();
  }, [user]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Welcome, {user ? user.fullName : 'Agent'}!</h1>
        
        {/* Stat Cards - Now dynamic */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className={`flex flex-row items-center justify-between space-y-0 pb-2 text-white ${stat.color}`}>
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              </CardHeader>
              <CardContent className={`pt-4 ${stat.color} text-white`}>
                <div className="text-4xl font-extrabold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* The table has been removed */}
        
      </div>
    </DashboardLayout>
  );
};

export default AgentDashboard;