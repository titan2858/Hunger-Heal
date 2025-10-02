import React, { useState, useEffect, useContext } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';

const PendingDonationsPage = () => {
  const [pendingDonations, setPendingDonations] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchDonations = async () => {
      if (!user) return;
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get('http://localhost:5000/api/donations/mydonations', config);
        setPendingDonations(data.filter(d => d.status === 'Pending' || d.status === 'Assigned'));
      } catch (error) { console.error('Failed to fetch donations', error); }
    };
    fetchDonations();
  }, [user]);

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
            {pendingDonations.length > 0 ? pendingDonations.map(d => (
              <TableRow key={d._id}>
                <TableCell>{d.items}</TableCell>
                <TableCell>{d.address}</TableCell>
                <TableCell>{d.status}</TableCell>
              </TableRow>
            )) : (
              <TableRow><TableCell colSpan="3" className="text-center">No pending donations found.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </DashboardLayout>
  );
};

export default PendingDonationsPage;