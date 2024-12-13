'use client';

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import DashboardCard from "@/components/Dashboard/DashboardCard"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { DoorOpen, Globe, Star, Users } from "lucide-react"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { UserPublic } from '@/types/MyTypes';
import axios from 'axios';
import Loading from '../Loading';

const reviews = [
    {user: "Aahil", rating: 5, datetime: "19 March 2024 - 13:00", review: "We paid mostly for the stunning location at this place. The service was decent, and while the food wasn't mind-blowing, the views totally made up for it. There are three restaurants on-site, but 'Oceans' is the one to hit up—it's the best of the bunch. We also went scuba diving, which was awesome, just make sure not to eat too much beforehand."},
    {user: "Axwa", rating: 4, datetime: "20 March 2024 - 15:00", review: "Superb experience. Such a beautiful country. At Centara hotel you must try the Nurse shark snorkeling course which costs around 160USD per person extra. We enjoyed the Karaoke and pubs with the All inclusive plan which provided us all three meals and unlimited liquor at all the bars and restaurants. Best recommend."},
]

const chartData = [
    { month: "January", male: 186, female: 80 },
    { month: "February", male: 305, female: 200 },
    { month: "March", male: 237, female: 120 },
    { month: "April", male: 73, female: 190 },
    { month: "May", male: 209, female: 130 },
    { month: "June", male: 214, female: 140 },
]

const chartConfig = {
    male: {
      label: "Male",
      color: "#fc6600",
    },
    female: {
      label: "Female",
      color: "#f9a602",
    },
} satisfies ChartConfig

const Home = () => {
    const [users, setUsers] = useState<UserPublic[]>()

    useEffect(() => {
        async function getUsers() {
            try {
                const response = await axios.get("/api/users/all")
                if (response.data.success) setUsers(response.data.users)
                console.log(response.data)
            } catch (error: any) {
                console.log(error.message)
            }
        }
        if (!users) getUsers();
    }, [users])

    return (
        <div className="">    
            <div className='flex flex-row gap-4'>
                <div className='w-14 h-14'>
                    {/* Profile Picture */}
                    <Image
                    alt='profile-pic'
                    src={"/nauf.jpg"}
                    className='rounded-full w-fit brightness-105'
                    width={1000}
                    height={1000}
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <h1 className='font-roboto font-bold text-2xl'>Good Morning!</h1>
                    <div>Here's an overview of the island.</div>
                </div>
            </div>
            { users ?
                <div className='mt-14 flex flex-col gap-10'>
                    {/* First Section */}
                    <div className='grid grid-cols-4 gap-10'>
                        {/* Number of Visitors  */}
                        <DashboardCard title="Island Visitors" icon={<DoorOpen color="orange" />} content="50" />

                        {/* Number of website visitors */}
                        <DashboardCard title="Website Visitors" icon={<Globe color="blue" />} content="435" />
                        
                        {/* Rating */}
                        <DashboardCard title="Rating" icon={<Star color="red" />} content="4.2 / 5" />
                        
                        {/* Total Users */}
                        <DashboardCard title="Total Users" icon={<Users color="green" />} content={users?.length.toString()} />

                    </div>

                    {/* Second Section */}
                    <div className="grid grid-cols-2 gap-10">
                        {/* Latest Reviews */}
                        <div className="flex flex-col gap-5">
                            <h2 className="font-roboto font-semibold text-xl">Latest Reviews</h2>
                            { reviews.map((review, index) => (
                                <Card key={index} className="px-2">
                                    <CardHeader className="mb-0 pb-2">
                                        <div className="flex justify-between place-items-center">
                                            <div className="flex gap-2 place-items-center">
                                                {/* User's name */}
                                                <div className="font-semibold">{review.user}</div>
                                                {/* Rating (Stars) */}
                                                <div className="flex">
                                                    {[...Array(review.rating)].map((e, i) => (
                                                        <Star key={i} fill="orange" stroke="none" />
                                                    ))}
                                                </div>
                                            </div>
                                            {/* Review Date & Time */}
                                            <div className="text-[12px] italic text-stone-500">{review.datetime}</div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        {/* The Review */}
                                        <p className="italic text-stone-600 font-serif text-justify">"{review.review}"</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Island Visitors Chart - Male & Female */}
                        <div className="flex flex-col gap-5">
                            <h2 className="font-roboto font-semibold text-xl">Island Visitors</h2>

                            {/* CHART HERE! */}
                            <Card>
                                <CardContent className="flex p-4 place-items-end justify-end">
                                    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                                        <BarChart accessibilityLayer data={chartData}>
                                            {/* <ChartLegend content={<ChartLegendContent />} /> */}
                                            <CartesianGrid vertical={false} />
                                            <XAxis
                                            dataKey="month"
                                            tickLine={false}
                                            tickMargin={10}
                                            axisLine={false}
                                            tickFormatter={(value) => value.slice(0, 3)}
                                            />
                                            <ChartTooltip content={<ChartTooltipContent />} />
                                            <Bar dataKey="male" fill="var(--color-male)" radius={4} />
                                            <Bar dataKey="female" fill="var(--color-female)" radius={4} />
                                        </BarChart>
                                    </ChartContainer>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            :
                <Loading className='mt-10' />
            } 
        </div>
    )
}

export default Home
