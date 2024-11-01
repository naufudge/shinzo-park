import React from 'react'
import * as motion from "framer-motion/client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import { Button } from './ui/button'

const Packages = [
    {name: "Adventure Package", image: "/adventure.jpg", days: "1 Day", perks: ["With full water park access", "Free Ferry Ticket"]},
    {name: "Explorer Package", image: "/explorer.jpg", days: "3 Days", perks: ["With full water park access", ""]},
    {name: "Golden Package", image: "/golden.jpg", days: "7 Days", perks: ["With full water park access", "Full arcade access"]},
]

const PackagesSection = () => {
  return (
    <div className='m-[100px]'>

        <div className="mb-10 flex flex-col text-center gap-2">
            <h1 className='font-poppins font-bold text-center text-3xl'>Attractive <span className='text-orange-700'>Packages</span></h1>
            <div className='text-opacity-50 italic text-sm'>For both new and regular customers!</div>
        </div>
        
        <motion.div
            className='grid grid-cols-3 w-full gap-10'
            initial={{
                opacity: 0,
            }}
            whileInView={{
                opacity: 1,
            }}
            viewport={{
                margin: "-300px",
            }}
        >
            {Packages.map((item, index) => (
                <Card key={index} className='text-center'>
                    <CardHeader className="place-items-center">
                        <div className='w-[200px] h-[200px] mt-[50px] mb-[50px]'>
                            <Image
                                className='rounded-full aspect-square'
                                src={item.image}
                                alt='package-img'
                                width={1500}
                                height={1000}
                            />
                        </div>

                        <CardTitle>{item.name}</CardTitle>
                        <CardDescription>{item.days}</CardDescription>
                    </CardHeader>
                    <CardContent className='justify-center mx-auto'>
                        <div className='flex flex-col gap-1'>
                            {item.perks.map((perk, ind) => (
                                <p key={ind} className='italic'>• {perk}</p>
                            ))}
                        </div>
                        
                        
                    </CardContent>
                    <CardFooter className='flex place-items-end'>
                        <Button className='w-full'>
                            Buy
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </motion.div>
    </div>
  )
}

export default PackagesSection
