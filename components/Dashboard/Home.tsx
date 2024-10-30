import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { DoorOpen, Globe, Star, Users } from "lucide-react"
  
import Image from 'next/image'
import React from 'react'
import DashboardCard from "./DashboardCard"

const reviews = [
    {user: "Aahil", rating: 5, datetime: "19 March 2024 - 13:00", review: "We paid mostly for the stunning location at this place. The service was decent, and while the food wasn't mind-blowing, the views totally made up for it. There are three restaurants on-site, but 'Oceans' is the one to hit up—it's the best of the bunch. We also went scuba diving, which was awesome, just make sure not to eat too much beforehand."},
    {user: "Axwa", rating: 4, datetime: "20 March 2024 - 15:00", review: "Superb experience. Such a beautiful country. At Centara hotel you must try the Nurse shark snorkeling course which costs around 160USD per person extra. We enjoyed the Karaoke and pubs with the All inclusive plan which provided us all three meals and unlimited liquor at all the bars and restaurants. Best recommend."},
]

const Home = () => {
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
                <DashboardCard title="Total Users" icon={<Users color="green" />} content="520" />

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
                    {/* <h2 className="font-roboto font-semibold text-xl">Island Visitors</h2> */}
                    {/* CHART HERE! */}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home
