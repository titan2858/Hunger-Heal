import React, { useState, useEffect, useContext } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({
        totalDonors: 0,
        totalAgents: 0,
        newDonationRequests: 0,
        donationsToBeAssigned: 0,
    });
    // 1. Create state for the dynamic chart data
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchAdminData = async () => {
            if (!user) return;
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                
                const [usersRes, donationsRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/users', config),
                    axios.get('http://localhost:5000/api/donations', config),
                ]);

                const users = usersRes.data;
                const donations = donationsRes.data;

                // --- Stat Card Calculations (no changes here) ---
                const totalDonors = users.filter(u => u.role === 'donor').length;
                const totalAgents = users.filter(u => u.role === 'agent').length;
                const newDonationRequests = donations.filter(d => d.status === 'Pending').length;
                const donationsToBeAssigned = donations.filter(d => d.status === 'Accepted').length;

                setStats({ totalDonors, totalAgents, newDonationRequests, donationsToBeAssigned });

                // --- 2. Dynamic Chart Data Calculation ---
                const typeCounts = {};
                donations.forEach(donation => {
                    // Extract food type from the 'items' string (e.g., "Cooked Meal (Quantity: 5)")
                    const type = donation.items.split(' (')[0].trim();
                    if (type) {
                        typeCounts[type] = (typeCounts[type] || 0) + 1;
                    }
                });

                const formattedChartData = Object.keys(typeCounts).map(key => ({
                    name: key,
                    donations: typeCounts[key],
                }));
                
                setChartData(formattedChartData);

            } catch (error) {
                console.error("Failed to fetch admin data", error);
            }
        };

        fetchAdminData();
    }, [user]);

    const statCards = [
        { title: 'Total Donors', value: stats.totalDonors },
        { title: 'Total Agents', value: stats.totalAgents },
        { title: 'New Donation Requests', value: stats.newDonationRequests },
        { title: 'Donations to be Assigned', value: stats.donationsToBeAssigned },
    ];

    return (
        <DashboardLayout>
            <div className="space-y-8">
                <h1 className="text-3x1 font-bold">Admin Dashboard</h1>
                
                {/* Dynamic Stat Cards */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {statCards.map((stat) => (
                        <Card key={stat.title} className="shadow-md hover:shadow-lg transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-4xl font-extrabold">{stat.value}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* ## DONATIONS CHART - NOW DYNAMIC ## */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">Donations by Type</h2>
                  <Card className="shadow-md p-4">
                    <ResponsiveContainer width="100%" height={300}>
                      {/* 3. The BarChart component now uses the dynamic 'chartData' from state */}
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" fontSize={12} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="donations" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>
                </div>

            </div>
        </DashboardLayout>
    );
};

export default AdminDashboard;