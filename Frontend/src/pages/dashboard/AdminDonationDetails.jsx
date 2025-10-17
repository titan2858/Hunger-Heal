import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const AdminDonationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonation = async () => {
      if (!user) return;
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        // We need a backend route for getting a single donation
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

  const handleStatusUpdate = async (newStatus) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.put(`http://localhost:5000/api/donations/${id}/status`, { status: newStatus }, config);
      alert(`Donation marked as ${newStatus}!`);
      navigate('/dashboard/admin/donations'); // Go back to the main list
    } catch (error) {
      alert('Failed to update status.');
    }
  };

  if (loading) return <DashboardLayout><div>Loading...</div></DashboardLayout>;
  if (!donation) return <DashboardLayout><div>Donation not found.</div></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Donation Request Details</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            {/* Food Image */}
            {donation.foodImage && (
              <div className="md:col-span-2">
                <img 
                  src={`http://localhost:5000/${donation.foodImage.replace(/\\/g, '/')}`} 
                  alt="Food donation" 
                  className="w-full max-h-80 object-cover rounded-md"
                />
              </div>
            )}
            {/* Donation Info */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Details</h3>
              <p><strong>Donor:</strong> {donation.donor.fullName}</p>
              <p><strong>Items:</strong> {donation.items}</p>
              <p><strong>Status:</strong> {donation.status}</p>
              <p><strong>Submitted:</strong> {new Date(donation.createdAt).toLocaleString()}</p>
            </div>
            <div className="space-y-4">
               <h3 className="font-semibold text-lg">Pickup & Contact</h3>
               <p><strong>Address:</strong> {donation.address}</p>
            </div>
          </CardContent>
          {donation.status === 'Pending' && (
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="destructive" onClick={() => handleStatusUpdate('Rejected')}>Reject</Button>
              <Button onClick={() => handleStatusUpdate('Accepted')}>Accept</Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDonationDetails;