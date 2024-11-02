'use client';

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const NavBar = () => {
    const [showTickets, setShowTickets] = useState(false)
    const router = useRouter()

    return (
        <div className="navbar drop-shadow-md flex py-5 px-[50px] justify-between z-[100] mx-[50px] rounded-full">
            <Link href={"/"}><h1 className="font-poppins font-bold text-3xl">DhonVeli</h1></Link>
            <div className="flex gap-10 place-items-center font-poppins">
                <Link href={"/"}>Home</Link>
                <Link href={"/"}>Tickets</Link>
                <Link href={"/"}>About Us</Link>
                

                <div className="flex gap-6">
                    <Button
                    className="rounded-full bg-transparent"
                    variant={"outline"}
                    >
                        <Link href={"/booking"}>Book Now</Link>
                    </Button>

                    <Button
                    className="rounded-full px-5"
                    variant={"default"}
                    >
                    <Link href={"/login"}>Login</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default NavBar
