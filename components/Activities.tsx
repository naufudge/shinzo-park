import Image from 'next/image'
import React from 'react'
import * as motion from "framer-motion/client"

const Activities = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center sm:mx-12 my-8'>
        <div className="col-span-full mb-6 flex ">
            <h1 className='font-poppins font-bold text-center text-3xl'>Explore our <span className='text-orange-700'>Activities</span>!</h1>
        </div>
        <ActivityCard name='Water Park' description='This is a water park' image='/water-park.jpg' />
        <ActivityCard name='Arcade' description='This is a Arcade' image='/arcade.jpg' />
        <ActivityCard name='Joy Rides' description='This is a joy ride' image='/ride.jpg' />
    </div>
  )
}

interface CardProps {
    name: string;
    description: string;
    image: string;
}

const ActivityCard: React.FC<CardProps> = ({ name, description, image }) => {
    return (
        <div className='transition max-w-sm h-[200px] border rounded-xl relative flex overflow-hidden group hover:drop-shadow hover:cursor-pointer font-poppins'>
            
            <div className='justify-end flex flex-col gap-2 absolute z-50 inset-0 p-4 bg-gradient-to-t from-black/60 to-transparent'>
                <div className='translate-y-[35px] group-hover:translate-y-0 transition duration-300'>
                    <div className='font-bold text-lg text-white'>{name}</div>
                    <div className='text-gray-400'>{description}</div>
                </div>
            </div>
            
            
            <div className='w-full h-full'>
                <Image 
                alt='card-image' 
                src={image} 
                width={1000} 
                height={1000}
                className='group-hover:scale-110 group-hover:blur-sm duration-300 transition h-full'
                />
            </div>
        </div>
    )
}

export default Activities