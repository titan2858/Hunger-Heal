import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for the Admin - replace with real data later
const adminStats = [
  { title: 'Total Donors', value: 2 },
  { title: 'Total Agents', value: 2 },
  { title: 'New Donation Requests', value: 1 },
  { title: 'Donations to be Assigned', value: 2 },
];

const donationRequests = [
  { id: 'DON002', donor: 'Jane Doe', items: 'Fresh Vegetables', status: 'Pending Assignment' },
  { id: 'DON003', donor: 'John Smith', items: 'Canned Goods', status: 'Pending Assignment' },
];

const chartData = [
  { name: 'Cooked Food', donations: 4 },
  { name: 'Groceries', donations: 3 },
  { name: 'Canned Goods', donations: 5 },
  { name: 'Vegetables', donations: 2 },
];

const availableAgents = ['Yash', 'Agent Smith'];

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        
        {/* Stat Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {adminStats.map((stat) => (
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

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Pending Requests Table */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold mb-4">Pending Donation Requests</h2>
            <Card className="shadow-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Donation ID</TableHead>
                    <TableHead>Donor</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Assign Agent</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {donationRequests.map((req) => (
                    <TableRow key={req.id}>
                      <TableCell className="font-medium">{req.id}</TableCell>
                      <TableCell>{req.donor}</TableCell>
                      <TableCell>{req.items}</TableCell>
                      <TableCell>
                        <Select>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Agent" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableAgents.map(agent => (
                              <SelectItem key={agent} value={agent.toLowerCase()}>{agent}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>

          {/* Donations Chart */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Donations by Type</h2>
            <Card className="shadow-md p-4">
              <ResponsiveContainer width="100%" height={300}>
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
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;