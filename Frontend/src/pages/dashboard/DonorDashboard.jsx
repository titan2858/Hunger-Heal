import React, { useContext } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { AuthContext } from '../../context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const DonorDashboard = () => {
  // 1. Get user and the global donations list from context
  const { user, donations } = useContext(AuthContext);

  // 2. Calculate stats dynamically from the real data
  const stats = [
    { title: 'Donations by You', value: donations.length, color: 'bg-green-500' },
    { title: 'Pending Donations', value: donations.filter(d => d.status === 'Pending' || d.status === 'Assigned').length, color: 'bg-blue-500' },
    { title: 'Accepted Donations', value: donations.filter(d => d.status === 'Accepted').length, color: 'bg-yellow-500' },
    { title: 'Rejected Donations', value: donations.filter(d => d.status === 'Rejected').length, color: 'bg-red-500' },
  ];
  
  // 3. Get the 5 most recent donations to show in the table
  const recentDonations = [...donations].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Welcome, {user ? user.fullName : 'Donor'}!</h1>
        
        {/* Stat Cards will now show correct, dynamic counts */}
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

        {/* Recent Donations Table will now show real data */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Recent Donations</h2>
          <Card className="shadow-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Items</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentDonations.length > 0 ? recentDonations.map((donation) => (
                  <TableRow key={donation._id}>
                    <TableCell>{donation.items}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded-full text-xs">
                        {donation.status}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(donation.createdAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                )) : (
                   <TableRow>
                    <TableCell colSpan="3" className="text-center h-24">
                      You haven't made any donations yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DonorDashboard;