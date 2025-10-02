import React, { useState, useEffect, useContext } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const ManageUsersPage = () => {
    const [agents, setAgents] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchAgents = async () => {
            if (!user) return;
            try {
                // Fetch only agents now
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const { data } = await axios.get('http://localhost:5000/api/users/agents', config);
                setAgents(data);
            } catch (error) {
                console.error("Failed to fetch agents", error);
            }
        };
        fetchAgents();
    }, [user]);

    return (
        <DashboardLayout>
            <h1 className="text-3xl font-bold mb-6">Manage Agents</h1>
            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Full Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {agents.map(agent => (
                            <TableRow key={agent._id}>
                                <TableCell>{agent.fullName}</TableCell>
                                <TableCell>{agent.email}</TableCell>
                                <TableCell>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" size="sm">View Details</Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Agent Details</DialogTitle>
                                            </DialogHeader>
                                            <div className="space-y-2">
                                                <p><strong>Name:</strong> {agent.fullName}</p>
                                                <p><strong>Email:</strong> {agent.email}</p>
                                                <p><strong>Role:</strong> {agent.role}</p>
                                                <p><strong>Address:</strong> {agent.address || 'Not provided'}</p>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </DashboardLayout>
    );
};

export default ManageUsersPage;