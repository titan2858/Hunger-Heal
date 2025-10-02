import React from 'react';
import { useContext } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AuthContext } from '@/context/AuthContext';
// Mock data - replace with real data later
const stats = [
  { title: 'Donations by You', value: 1, color: 'bg-green-500' },
  { title: 'Pending Donations', value: 1, color: 'bg-blue-500' },
  { title: 'Accepted Donations', value: 0, color: 'bg-yellow-500' },
  { title: 'Rejected Donations', value: 1, color: 'bg-red-500' },
];

const recentDonations = [
  { id: 'DON001', items: 'Cooked Rice, Dal', status: 'Pending', date: '2025-09-28' },
];


const DonorDashboard = () => {
  const { user } = useContext(AuthContext);
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Welcome, {user ? user.fullName : 'Donor'}!</h1>

        {/* Stat Cards */}
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

        {/* Recent Donations Table */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Recent Donations</h2>
          <Card className="shadow-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Donation ID</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentDonations.map((donation) => (
                  <TableRow key={donation.id}>
                    <TableCell className="font-medium">{donation.id}</TableCell>
                    <TableCell>{donation.items}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded-full text-xs">
                        {donation.status}
                      </span>
                    </TableCell>
                    <TableCell>{donation.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DonorDashboard;