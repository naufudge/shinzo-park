import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Banknote, DoorOpen, Key, Star } from "lucide-react"
  
import Image from 'next/image'
import React from 'react'
import DashboardCard from "./DashboardCard"

const Home = () => {
  return (
    <div>    
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
        <div className='mt-14'>
            {/* Cards row */}
            <div className='grid grid-cols-4 gap-10'>
                {/* Number of Visitors  */}
                <DashboardCard title="Visitors" icon={<DoorOpen color="orange" />} content="105" />

                {/* Number of ??? */}
                <DashboardCard title="Check-ins" icon={<Key color="blue" />} content="50" />
                
                {/* Rating */}
                <DashboardCard title="Rating" icon={<Star color="red" />} content="4.2 / 5" />
                
                {/* Revenue */}
                <DashboardCard title="Rating" icon={<Banknote color="green" />} content="4.2 / 5" />

                
                
            </div>
        </div>
    </div>
  )
}

export default Home
