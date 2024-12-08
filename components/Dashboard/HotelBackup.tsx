import React, { useState } from 'react';
import DashboardCard from "@/components/Dashboard/DashboardCard";
import { Bed, Users, Calendar, DollarSign, DoorOpen, Bell } from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

const Dashboard = () => {
    // State for managing room availability
    const [singleRooms, setSingleRooms] = useState(Array(20).fill(true));
    const [doubleRooms, setDoubleRooms] = useState(Array(20).fill(true));

    const [showSingleRooms, setShowSingleRooms] = useState(false);
    const [showDoubleRooms, setShowDoubleRooms] = useState(false);

    const toggleRoomAvailability = (roomType: "single" | "double", index: number) => {
      const updatedRooms = roomType === "single" ? [...singleRooms] : [...doubleRooms];
      updatedRooms[index] = !updatedRooms[index];
      roomType === "single" ? setSingleRooms(updatedRooms) : setDoubleRooms(updatedRooms);
    };
  

    const availableSingleRooms = singleRooms.filter(Boolean).length;
    const availableDoubleRooms = doubleRooms.filter(Boolean).length;

    return (
        <div className="p-6 font-poppins space-y-10">
            <h1 className="font-bold text-2xl mb-6 text-gray-700">Hotel Management Dashboard</h1>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <DashboardCard title="Total Rooms" icon={<Bed color="blue" />} content="150" />
                <DashboardCard title="Available Rooms" icon={<DoorOpen color="green" />} content={`${availableSingleRooms + availableDoubleRooms}`} />
                <DashboardCard title="Current Guests" icon={<Users color="orange" />} content="120" />
                <DashboardCard title="Total Revenue" icon={<DollarSign color="purple" />} content="MVR 45,000" />
            </div>

            {/* Room Availability Section */}
            <div className="space-y-8">
                <h2 className="font-semibold text-xl text-gray-700">Room Availability</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Single Rooms */}
                    <Card className="shadow-md">
                        <CardHeader className="flex justify-between items-center bg-blue-50 p-4 rounded-t-lg">
                            <CardTitle className="text-gray-950">Single Rooms</CardTitle>
                            <button
                                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                                onClick={() => setShowSingleRooms(!showSingleRooms)}
                            >
                                Manage Rooms
                            </button>
                        </CardHeader>
                        <CardContent className="p-4">
                            <div className="text-gray-600 mb-3">Available: {availableSingleRooms}</div>
                            {showSingleRooms && (
                                <div className="bg-gray-100 rounded-lg p-4 space-y-3 transition-all duration-300">
                                    {singleRooms.map((isAvailable, index) => (
                                        <div
                                            key={index}
                                            className="flex justify-between items-center bg-white px-3 py-2 rounded shadow-sm"
                                        >
                                            <span>Room {101 + index}</span>
                                            <label className="flex items-center">
                                                <span className="mr-2 text-sm text-gray-600">{isAvailable ? 'Available' : 'Occupied'}</span>
                                                <input
                                                    type="checkbox"
                                                    checked={isAvailable}
                                                    onChange={() => toggleRoomAvailability("single", index)}
                                                    className="toggle-checkbox"
                                                />
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Double Rooms */}
                    <Card className="shadow-md">
                        <CardHeader className="flex justify-between items-center bg-blue-50 p-4 rounded-t-lg">
                            <CardTitle className="text-gray-950">Double Rooms</CardTitle>
                            <button
                                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                                onClick={() => setShowDoubleRooms(!showDoubleRooms)}
                            >
                                Manage Rooms
                            </button>
                        </CardHeader>
                        <CardContent className="p-4">
                            <div className="text-gray-600 mb-3">Available: {availableDoubleRooms}</div>
                            {showDoubleRooms && (
                                <div className="bg-gray-100 rounded-lg p-4 space-y-3 transition-all duration-300">
                                    {doubleRooms.map((isAvailable, index) => (
                                        <div
                                            key={index}
                                            className="flex justify-between items-center bg-white px-3 py-2 rounded shadow-sm"
                                        >
                                            <span>Room {201 + index}</span>
                                            <label className="flex items-center">
                                                <span className="mr-2 text-sm text-gray-600">{isAvailable ? 'Available' : 'Occupied'}</span>
                                                <input
                                                    type="checkbox"
                                                    checked={isAvailable}
                                                    onChange={() => toggleRoomAvailability("double", index)}
                                                    className="toggle-checkbox"
                                                />
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Booking Calendar and Check-In/Check-Out Alerts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Booking Calendar */}
                <Card className="shadow-md">
                    <CardHeader className="flex justify-between items-center p-4 bg-gray-50 rounded-t-lg">
                        <CardTitle className="text-gray-700">Booking Calendar</CardTitle>
                        <Calendar color="blue" />
                    </CardHeader>
                    <CardContent className="p-4 text-gray-600">
                        <p>Interactive calendar view for booking status and scheduled room allocations.</p>
                        <div className="bg-gray-100 h-52 mt-4 rounded-lg flex items-center justify-center">
                            <span className="text-gray-400">Calendar Widget Here</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Check-In / Check-Out Alerts */}
                <Card className="shadow-md">
                    <CardHeader className="flex justify-between items-center p-4 bg-gray-50 rounded-t-lg">
                        <CardTitle className="text-gray-700">Check-In / Check-Out Alerts</CardTitle>
                        <Bell color="orange" />
                    </CardHeader>
                    <CardContent className="p-4 text-gray-600">
                        <p>Daily alerts and reminders for upcoming check-ins and check-outs.</p>
                        <div className="mt-4 space-y-3">
                            <ul>
                                <li className="flex justify-between items-center">
                                    <span>Room 101</span>
                                    <span className="text-green-500">Check-In Today</span>
                                </li>
                                <li className="flex justify-between items-center">
                                    <span>Room 205</span>
                                    <span className="text-red-500">Check-Out Today</span>
                                </li>
                                <li className="flex justify-between items-center">
                                    <span>Room 302</span>
                                    <span className="text-green-500">Check-In Tomorrow</span>
                                </li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
