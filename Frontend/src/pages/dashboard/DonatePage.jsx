import React, { useState, useContext } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DonatePage = () => {
  const [foodType, setFoodType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const { user } = useContext(AuthContext);
  const { fetchDonations } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const items = `${foodType} (Quantity: ${quantity})`;
    const fullAddress = `${address}. Pickup on ${pickupDate} at ${pickupTime}. Notes: ${notes}`;

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.post('http://localhost:5000/api/donations', { items, address: fullAddress }, config);
      alert('Donation submitted successfully!');
      fetchDonations(user.token);
      // Reset form
      setFoodType(''); setQuantity(''); setPickupDate(''); setPickupTime(''); setAddress(''); setNotes('');
    } catch (error) {
      alert('Failed to submit donation.');
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-center">
        <Card className="w-full max-w-2xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Create a New Donation</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Food Details */}
              <div className="space-y-2">
                <h3 className="font-semibold">Food Details</h3>
                <Select onValueChange={setFoodType} value={foodType}>
                  <SelectTrigger><SelectValue placeholder="Select Food Type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cooked Meal">Cooked Meal</SelectItem>
                    <SelectItem value="Groceries">Groceries</SelectItem>
                    <SelectItem value="Fruits & Vegetables">Fruits & Vegetables</SelectItem>
                    <SelectItem value="Canned Goods">Canned Goods</SelectItem>
                  </SelectContent>
                </Select>
                <Input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity (e.g., 5 meals, 10 kg)" required />
              </div>

              {/* Pickup Details */}
              <div className="space-y-2">
                <h3 className="font-semibold">Pickup Details</h3>
                <Input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} required />
                <Input type="time" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} required />
                <Textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Full Pickup Address" required />
              </div>
              
              {/* Additional Notes */}
               <div className="space-y-2">
                <h3 className="font-semibold">Additional Notes (Optional)</h3>
                <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any special instructions for the agent..." />
              </div>

              <Button type="submit" className="w-full">Submit Donation</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DonatePage;