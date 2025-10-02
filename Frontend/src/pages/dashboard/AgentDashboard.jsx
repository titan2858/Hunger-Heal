import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'; 

// Mock data for the Agent - replace with real data later
const agentStats = [
  { title: 'Pending Collections', value: 1, color: 'bg-blue-500' },
  { title: 'Donations Collected Today', value: 1, color: 'bg-green-500' },
];

const assignedDonations = [
  { 
    id: 'DON001', 
    donor: 'Yogesh', 
    address: '123 Anytown, Mumbai', 
    phone: '9876543210',
    status: 'Pending Collection' 
  },
  // Add more assigned donations here
];

const AgentDashboard = () => {

  const { user } = useContext(AuthContext);
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Welcome, {user ? user.fullName : 'Agent'}!</h1>
        
        {/* Stat Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {agentStats.map((stat) => (
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

        {/* Assigned Donations Table */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Assigned Collections</h2>
          <Card className="shadow-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Donation ID</TableHead>
                  <TableHead>Donor Name</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignedDonations.map((donation) => (
                  <TableRow key={donation.id}>
                    <TableCell className="font-medium">{donation.id}</TableCell>
                    <TableCell>{donation.donor}</TableCell>
                    <TableCell>{donation.address}</TableCell>
                    <TableCell>{donation.phone}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs">
                        {donation.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button size="sm">Mark as Collected</Button>
                    </TableCell>
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

export default AgentDashboard;