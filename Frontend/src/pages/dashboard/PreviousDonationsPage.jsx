import React, { useContext } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { AuthContext } from '../../context/AuthContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';

const PreviousDonationsPage = () => {
  // Get the global donations list from the context
  const { donations } = useContext(AuthContext);

  // Filter the global list to find previous donations
  const previousDonations = donations.filter(d => d.status === 'Collected' || d.status === 'Rejected');

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">My Previous Donations</h1>
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
            {previousDonations.length > 0 ? (
              previousDonations.map(d => (
                <TableRow key={d._id}>
                  <TableCell>{d.items}</TableCell>
                  <TableCell>{d.status}</TableCell>
                  <TableCell>{new Date(d.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="3" className="text-center h-24">
                  No previous donations found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </DashboardLayout>
  );
};

export default PreviousDonationsPage;