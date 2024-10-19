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
  

const PackagesSection = () => {
  return (
    <div className='my-10'>
        <h1 className='text-center font-semibold text-3xl'>Packages</h1>
        <div className='grid grid-cols-3 w-full px-10'>
            <motion.div
                initial={{
                    opacity: 0,
                }}
                whileInView={{
                    opacity: 1,
                }}
                viewport={{
                    margin: "-200px",
                }}
            >
                <Card>
                    <CardHeader>
                        <CardTitle>Package #1</CardTitle>
                        <CardDescription>The first package</CardDescription>
                    </CardHeader>
                    <CardContent className=''>            
                        <p>Card Content</p>
                    </CardContent>
                    <CardFooter>
                        <p>Card Footer</p>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    </div>
  )
}

export default PackagesSection
