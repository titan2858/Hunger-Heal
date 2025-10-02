import React, { useState, useEffect, useContext } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';

const PreviousDonationsPage = () => {
  const [previousDonations, setPreviousDonations] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchDonations = async () => {
       if (!user) return;
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get('http://localhost:5000/api/donations/mydonations', config);
        setPreviousDonations(data.filter(d => d.status === 'Collected' || d.status === 'Rejected'));
      } catch (error) { console.error('Failed to fetch donations', error); }
    };
    fetchDonations();
  }, [user]);

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
             {previousDonations.length > 0 ? previousDonations.map(d => (
              <TableRow key={d._id}>
                <TableCell>{d.items}</TableCell>
                <TableCell>{d.status}</TableCell>
                <TableCell>{new Date(d.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            )) : (
              <TableRow><TableCell colSpan="3" className="text-center">No previous donations found.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </DashboardLayout>
  );
};

export default PreviousDonationsPage;