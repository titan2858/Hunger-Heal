import React, { useState, useEffect, useContext } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ManageDonationsPage = () => {
    const [donations, setDonations] = useState([]);
    const [agents, setAgents] = useState([]);
    const { user } = useContext(AuthContext);

    const fetchData = async () => {
        if (!user) return;
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const [donationsRes, agentsRes] = await Promise.all([
                axios.get('http://localhost:5000/api/donations', config),
                axios.get('http://localhost:5000/api/users/agents', config)
            ]);
            setDonations(donationsRes.data);
            setAgents(agentsRes.data);
        } catch (error) {
            console.error("Failed to fetch data", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [user]);
    
    const handleStatusUpdate = async (id, status) => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.put(`http://localhost:5000/api/donations/${id}/status`, { status }, config);
            fetchData(); // Refresh data after update
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    const handleAssignAgent = async (donationId, agentId) => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.put(`http://localhost:5000/api/donations/${donationId}/assign`, { agentId }, config);
            fetchData();
        } catch (error) {
            console.error("Failed to assign agent", error);
        }
    };

    const renderDonationsTable = (donationsList, tabType) => (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Donation ID</TableHead>
                    <TableHead>Donor</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {donationsList.map((d) => (
                    <TableRow key={d._id}>
                        <TableCell>{d._id.slice(-6)}</TableCell>
                        <TableCell>{d.donor.fullName}</TableCell>
                        <TableCell>{d.items}</TableCell>
                        <TableCell>
                            {tabType === 'pending' && (
                                <Dialog>
                                    <DialogTrigger asChild><Button size="sm">Take Action</Button></DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader><DialogTitle>Donation Details</DialogTitle></DialogHeader>
                                        <DialogDescription asChild>
                                            <div className="space-y-2 text-sm text-muted-foreground">
                                                <div><strong>Items:</strong> {d.items}</div>
                                                <div><strong>Address:</strong> {d.address}</div>
                                                <div><strong>Submitted:</strong> {new Date(d.createdAt).toLocaleString()}</div>
                                            </div>
                                        </DialogDescription>
                                        <DialogFooter>
                                            <Button variant="destructive" onClick={() => handleStatusUpdate(d._id, 'Rejected')}>Reject</Button>
                                            <Button onClick={() => handleStatusUpdate(d._id, 'Accepted')}>Accept</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            )}
                            {tabType === 'accepted' && (
                                <Select onValueChange={(agentId) => handleAssignAgent(d._id, agentId)}>
                                    <SelectTrigger><SelectValue placeholder="Assign Agent" /></SelectTrigger>
                                    <SelectContent>
                                        {agents.map(agent => (
                                            <SelectItem key={agent._id} value={agent._id}>{agent.fullName}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );

    return (
        <DashboardLayout>
            <h1 className="text-3xl font-bold mb-6">Manage Donations</h1>
            <Tabs defaultValue="pending">
                <TabsList>
                    <TabsTrigger value="pending">Pending Requests</TabsTrigger>
                    <TabsTrigger value="accepted">Accepted (Assign Agent)</TabsTrigger>
                    <TabsTrigger value="inProgress">In Progress</TabsTrigger>
                </TabsList>
                <TabsContent value="pending">
                    <Card>{renderDonationsTable(donations.filter(d => d.status === 'Pending'), 'pending')}</Card>
                </TabsContent>
                <TabsContent value="accepted">
                    <Card>{renderDonationsTable(donations.filter(d => d.status === 'Accepted'), 'accepted')}</Card>
                </TabsContent>
                <TabsContent value="inProgress">
                    <Card>{/* Table for 'Assigned' and 'Collected' donations can go here */}</Card>
                </TabsContent>
            </Tabs>
        </DashboardLayout>
    );
};

export default ManageDonationsPage;