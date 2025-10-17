import React, { useState, useContext } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea'; // Import Textarea
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MapInput from '../../components/MapInput';

const DonatePage = () => {
  // Corrected: Combined useContext into a single call
  const { user, fetchDonations } = useContext(AuthContext);

  const [foodType, setFoodType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [foodImage, setFoodImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoodImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFoodImage(null);
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('items', `${foodType} (Quantity: ${quantity})`);
    formData.append('address', `Location: ${address}. Pickup on ${pickupDate} at ${pickupTime}. Contact: ${email}, ${phone}. Notes: ${notes}`);
    if (foodImage) {
      formData.append('foodImage', foodImage);
    }

    try {
      const config = { 
        headers: { 
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}` 
        } 
      };
      
      await axios.post('http://localhost:5000/api/donations', formData, config);
      alert('Donation submitted successfully!');
      if (user) fetchDonations(user.token);
      
      // Reset form
      setFoodType(''); setQuantity(''); setPickupDate(''); setPickupTime(''); setAddress(''); setNotes(''); setEmail(user?.email || ''); setPhone('');
      setFoodImage(null); setImagePreview(null);
    } catch (error) {
      console.error("Donation submission error:", error);
      alert('Failed to submit donation.');
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-center py-12">
        <Card className="w-full max-w-2xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Create a New Donation</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Food Details */}
              <div className="space-y-2">
                <h3 className="font-semibold">Food Details</h3>
                <Select onValueChange={setFoodType} value={foodType} required>
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
              
              {/* Image Upload */}
              <div className="space-y-2">
                <h3 className="font-semibold">Food Image (Optional)</h3>
                <Input type="file" accept="image/*" onChange={handleImageChange} />
                {imagePreview && (
                  <div className="mt-4">
                    <img src={imagePreview} alt="Food Preview" className="max-w-xs h-auto rounded-md shadow-sm mx-auto" />
                  </div>
                )}
              </div>

              {/* Contact Details */}
              <div className="space-y-2">
                <h3 className="font-semibold">Contact Details</h3>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Contact Email" required />
                <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Contact Phone Number" required />
              </div>

              {/* Pickup Details */}
              <div className="space-y-2">
                <h3 className="font-semibold">Pickup Details</h3>
                <Input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} required />
                <Input type="time" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} required />
                
                <div>
                  <label className="text-sm font-medium">Pickup Location</label>
                  <div className="text-center text-sm p-2 bg-gray-100 rounded-md mb-2">
                    {address || "Click on the map to set pickup location"}
                  </div>
                  <MapInput onLocationSelect={setAddress} />
                </div>
              </div>
              
              {/* Additional Notes */}
               <div className="space-y-2">
                <h3 className="font-semibold">Additional Notes (Optional)</h3>
                {/* Improved: Changed to Textarea */}
                <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any special instructions for the agent..." />
              </div>

              <Button type="submit" className="w-full" disabled={!address}>Submit Donation</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DonatePage;