import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, CartesianGrid, Tooltip, XAxis, YAxis, Legend, ResponsiveContainer } from 'recharts';
import { Users, DollarSign, Gamepad } from 'lucide-react';
import DashboardCard from "@/components/Dashboard/DashboardCard";

// Sample data
const revenueData = [
    { month: "Jan", revenue: 3000 },
    { month: "Feb", revenue: 4500 },
    { month: "Mar", revenue: 5000 },
    { month: "Apr", revenue: 5200 },
    { month: "May", revenue: 4700 },
    { month: "Jun", revenue: 6000 },
];

const ageDemographics = [
    { ageGroup: "5-12", count: 150 },
    { ageGroup: "13-18", count: 100 },
    { ageGroup: "19-25", count: 75 },
    { ageGroup: "26-35", count: 50 },
];

const gamePopularity = [
    { name: "League ofLegends", value: 40 },
    { name: "Baldurs Gate III", value: 25 },
    { name: "Asphalt 8", value: 20 },
    { name: "Temple Run", value: 15 },
];

const COLORS = ['#FF8042', '#0088FE', '#00C49F', '#FFBB28'];

const ArcadeDashboard = () => {
    return (
        <div className="p-6 space-y-8 font-poppins">
            <h1 className="font-bold text-2xl">Arcade Section Dashboard</h1>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DashboardCard title="Total Players" icon={<Users color="blue" />} content="100" />
                <DashboardCard title="Revenue" icon={<DollarSign color="green" />} content="MVR 12000" />
                <DashboardCard title="Top Game" icon={<Gamepad color="orange" />} content="League of Legends" />
            </div>

            {/* Revenue Trend Line Chart */}
            <div className="grid grid-cols-1 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Monthly Revenue Trend</CardTitle>
                    </CardHeader>
                    <CardContent className="w-full h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

                {/* Game Popularity */}
                <Card>
                    <CardHeader>
                        <CardTitle>Game Popularity</CardTitle>
                    </CardHeader>
                    <CardContent className="w-full h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={gamePopularity}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={60}
                                    fill="#8884d8"
                                    label
                                >
                                    {gamePopularity.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
    );
};

export default ArcadeDashboard;
