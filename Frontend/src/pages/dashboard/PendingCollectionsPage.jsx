import React, { useState, useEffect, useContext } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom'; // Import Link

const PendingCollectionsPage = () => {
  const [donations, setDonations] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchDonations = async () => {
      if (!user) return;
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get('http://localhost:5000/api/donations/agent', config);
        setDonations(data.filter(d => d.status === 'Assigned'));
      } catch (error) { console.error('Failed to fetch donations', error); }
    };
    fetchDonations();
  }, [user]);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Pending Collections</h1>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Donor</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>View Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {donations.length > 0 ? donations.map(d => (
              <TableRow key={d._id}>
                <TableCell>{d.donor.fullName}</TableCell>
                <TableCell>{d.items}</TableCell>
                <TableCell>{d.address}</TableCell>
                <TableCell>
                  <Link to={`/dashboard/collection/${d._id}`} className="text-purple-600 hover:underline">
                    View
                  </Link>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow><TableCell colSpan="4" className="text-center">No pending collections found.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </DashboardLayout>
  );
};

export default PendingCollectionsPage;