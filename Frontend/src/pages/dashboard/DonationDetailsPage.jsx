import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const DonationDetailsPage = () => {
  const { id } = useParams(); // Get donation ID from URL
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonation = async () => {
      if (!user) return;
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get(`http://localhost:5000/api/donations/${id}`, config);
        setDonation(data);
      } catch (error) {
        console.error('Failed to fetch donation details', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDonation();
  }, [user, id]);

  const handleUpdateStatus = async (newStatus) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.put(`http://localhost:5000/api/donations/${id}/status`, { status: newStatus }, config);
      alert(`Donation marked as ${newStatus}!`);
      navigate('/dashboard/agent/pending'); // Go back to pending list
    } catch (error) {
      alert('Failed to update status.');
    }
  };

  if (loading) return <DashboardLayout><div>Loading...</div></DashboardLayout>;
  if (!donation) return <DashboardLayout><div>Donation not found.</div></DashboardLayout>;

  return (
    <DashboardLayout>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Donation Details (ID: {donation._id})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p><strong>Donor:</strong> {donation.donor.fullName}</p>
          <p><strong>Items:</strong> {donation.items}</p>
          <p><strong>Address:</strong> {donation.address}</p>
          <p><strong>Status:</strong> {donation.status}</p>
          <p><strong>Submitted:</strong> {new Date(donation.createdAt).toLocaleString()}</p>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="destructive" onClick={() => handleUpdateStatus('Rejected')}>Mark as Not Collectible</Button>
          <Button onClick={() => handleUpdateStatus('Collected')}>Mark as Collected</Button>
        </CardFooter>
      </Card>
    </DashboardLayout>
  );
};

export default DonationDetailsPage;