import React, { useContext } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { AuthContext } from '../../context/AuthContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';

const PendingDonationsPage = () => {
  // 1. Get the global 'donations' list from the context
  const { donations } = useContext(AuthContext);

  // 2. Filter the global list to find only pending donations
  const pendingDonations = donations.filter(d => d.status === 'Pending' || d.status === 'Assigned');

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">My Pending Donations</h1>
      <Card className="shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Items</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingDonations.length > 0 ? (
              pendingDonations.map(d => (
                <TableRow key={d._id}>
                  <TableCell>{d.items}</TableCell>
                  <TableCell>{d.address}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      d.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' : 'bg-blue-200 text-blue-800'
                    }`}>
                      {d.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="3" className="text-center h-24">
                  No pending donations found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </DashboardLayout>
  );
};

export default PendingDonationsPage;