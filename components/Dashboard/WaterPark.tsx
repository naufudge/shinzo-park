import Image from 'next/image';
import React, { useState } from 'react';
import DashboardCard from "@/components/Dashboard/DashboardCard";
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent
} from "@/components/ui/chart";
import { Label, Pie, PieChart } from "recharts";
import { Users, DollarSign, Ticket, Star, Activity } from "lucide-react";

const reviews = [
    { name: 'Elgius', stars: 5, datetime: "19 March 2024 - 13:00", review: "The slides were so fast I think I left my soul behind! My hair is still recovering from the wind. 10/10 would scream again as if my emulator wont work again" },
    { name: 'Axwa', stars: 4, datetime: "20 March 2024 - 15:00", review: "I accidentally went down the kiddie slide, and the lifeguard looked at me like I was 5. Best day of my life." }
];

const maintenanceAlerts = [
    { label: "Wave Pool at 3 PM", icon: <Activity color="red" /> },
    { label: "Lazy River at 5 PM", icon: <Activity color="red" /> }
];

const ticketSales = [
    { label: 'Family Pass', value: 'MVR 120' },
    { label: 'Adult Ticket', value: 'MVR 80' },
];

const visitorDemographics = [
    { label: 'Adults', value: 60, fill: "#fc6600" },
    { label: 'Children', value: 40, fill: "#f9a602" },
];

// List of water park rides with prices
const rides = [
    { name: 'Wave Pool', price: 100 },
    { name: 'Lazy River', price: 80 },
    { name: 'Tsunami Slide', price: 120 },
    { name: 'Splash Zone', price: 50 }
];

// General entry fee
const entryFee = 200; // default entry fee

const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    adults: {
      label: "Adults",
      color: "hsl(var(--chart-1))",
    },
    children: {
      label: "Children",
      color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

const WaterPark = () => {
    const totalVisitors = React.useMemo(() => {
        return visitorDemographics.reduce((acc, curr) => acc + curr.value, 0)
    }, [])

    return (
        <div className="p-6 space-y-8 font-poppins">
            <div className="flex flex-row gap-4 mb-8">
                {/* Title */}
                <div className="flex flex-col gap-1">
                    <h1 className="font-roboto font-bold text-2xl">Water Park</h1>
                    <p className="font-poppins">Here's an overview of the park's performance.</p>
                </div>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-4 gap-10 mb-10">
                <DashboardCard title="Current Ticket Price" icon={<Ticket color="orange" />} content="150" />

                <DashboardCard title="Total Visitors" icon={<Users color="blue" />} content="200" />
                <DashboardCard title="Revenue" icon={<DollarSign color="green" />} content="MVR 5000" />
                <DashboardCard title="Rating" icon={<Star color="red" />} content="4.5 / 5" />

            </div>

            {/* Additional Sections */}
            <div className="grid grid-cols-2 gap-10">
                {/* Latest Reviews */}
                <div className="flex flex-col gap-5">
                    <h2 className="font-roboto font-semibold text-xl">Latest Reviews</h2>
                    {reviews.map((review, index) => (
                        <Card key={index} className="px-2">
                            <CardHeader className="mb-0 pb-2">
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-2 items-center">
                                        <div className="font-roboto font-medium">{review.name}</div>
                                        <div className="flex text-yellow-500">
                                            {[...Array(review.stars)].map((_, i) => (
                                                <Star key={i} fill="orange" stroke="none" />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="text-[12px] italic text-stone-500">{review.datetime}</div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="italic text-stone-600 font-poppins text-justify">"{review.review}"</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Maintenance Alerts */}
                <div className="flex flex-col gap-5">
                    <h2 className="font-roboto font-semibold text-xl">Maintenance Alerts</h2>
                    {maintenanceAlerts.map((alert, index) => (
                        <DashboardCard key={index} title={alert.label} icon={alert.icon} content="Scheduled Maintenance" />
                    ))}
                </div>
            </div>

            {/* Sales and Demographics Section */}
            <div className="grid grid-cols-2 gap-10 mt-8">
                {/* Recent Ticket Sales */}
                <div className="flex flex-col gap-5">
                    <h2 className="font-roboto font-semibold text-xl">Recent Ticket Sales</h2>
                    {ticketSales.map((sale, index) => (
                        <DashboardCard key={index} title={sale.label} icon={<Ticket color="orange" />} content={sale.value} />
                    ))}
                </div>

                {/* Visitor Demographics */}
                <div className="flex flex-col gap-5">
                    <h2 className="font-roboto font-semibold text-xl">Visitor Demographics</h2>
                    <Card className=''>
                        <CardContent>
                            <ChartContainer config={chartConfig} className='mx-auto aspect-square max-h-[350px]'>
                                <PieChart>
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent hideLabel />}
                                    />
                                    <Pie
                                        data={visitorDemographics}
                                        dataKey={"value"}
                                        nameKey={"label"}
                                        innerRadius={70}
                                        strokeWidth={10}
                                        legendType={'circle'}
                                    >
                                        <Label
                                            content={({viewBox}) => {
                                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                    return(
                                                        <text
                                                            x={viewBox.cx}
                                                            y={viewBox.cy}
                                                            textAnchor='middle'
                                                            dominantBaseline={"middle"}
                                                        >
                                                            <tspan
                                                                x={viewBox.cx}
                                                                y={viewBox.cy}
                                                                className='fill-foreground text-[2.5rem] font-bold'
                                                            >
                                                                {totalVisitors.toLocaleString()}
                                                            </tspan>
                                                            <tspan
                                                                x={viewBox.cx}
                                                                y={(viewBox.cy || 0) + 24}
                                                                className="fill-muted-foreground"
                                                            >
                                                                Visitors
                                                            </tspan>
                                                        </text>
                                                    )
                                                }
                                            }}
                                        />
                                    </Pie>

                                    <ChartLegend
                                        content={<ChartLegendContent nameKey="label" />}
                                        className="-translate-y-2 flex-wrap gap-4 [&>*]:basis-1/4 [&>*]:justify-center"
                                    />
                                </PieChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Park Entry Fee and Ride Prices Section */}
            <div className="flex flex-col gap-5 mt-10">
                <h2 className="font-roboto font-semibold text-xl">Park Entry Fee & Ride Prices</h2>
                
                {/* General Entry Fee */}
                <Card className="p-4">
                    <CardHeader className="flex justify-between">
                        <div className="font-roboto font-medium">Water Park Entry Fee</div>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <span className="text-stone-500">MVR {entryFee}</span>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default WaterPark;
