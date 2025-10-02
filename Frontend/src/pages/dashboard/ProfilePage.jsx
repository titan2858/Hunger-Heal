import React, { useState, useEffect, useContext } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

const ProfilePage = () => {
    const { user, login } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullName: user?.fullName || '',
        address: user?.address || '',
    });

    useEffect(() => {
        setFormData({
            fullName: user?.fullName || '',
            address: user?.address || '',
        });
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.put('http://localhost:5000/api/users/profile', formData, config);
            // Update the user in our global context
            login({ ...user, ...data });
            setIsEditing(false);
            alert('Profile updated successfully!');
        } catch (error) {
            alert('Failed to update profile.');
        }
    };

    return (
        <DashboardLayout>
            <div className="flex justify-center">
                <Card className="w-full max-w-2xl">
                    <CardHeader>
                        <CardTitle className="text-2xl">My Profile</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="text-sm font-medium">Full Name</label>
                            <Input name="fullName" value={formData.fullName} onChange={handleChange} disabled={!isEditing} />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Email</label>
                            <Input value={user?.email || ''} disabled />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Role</label>
                            <Input value={user?.role || ''} className="capitalize" disabled />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Address</label>
                            <Input name="address" value={formData.address} onChange={handleChange} placeholder="Your address" disabled={!isEditing} />
                        </div>
                    </CardContent>
                    <CardFooter>
                        {isEditing ? (
                            <Button onClick={handleSave}>Save Changes</Button>
                        ) : (
                            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                        )}
                    </CardFooter>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default ProfilePage;