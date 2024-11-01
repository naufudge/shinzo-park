'use client';

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const NavBar = () => {
    const [showTickets, setShowTickets] = useState(false)
    const router = useRouter()

    return (
        <div className="navbar sticky flex text-white py-6 px-[100px] justify-between z-50 w-full">
            <h1 className="font-roboto font-bold text-3xl">DhonVeli</h1>
            <div className="flex gap-10 place-items-center">
                <Link href={"/"}>Home</Link>
                <Link href={"/"}>Tickets</Link>
                <Link href={"/"}>About Us</Link>
                

                <div className="flex gap-6">
                <Button
                className="rounded-full bg-transparent"
                variant={"outline"}
                >
                    Book Now
                </Button>

                <Button
                className="rounded-full"
                variant={"secondary"}
                onClick={() => {}}
                >
                   <Link href={"/login"}>Login</Link>
                </Button>
                </div>
            </div>
        </div>
    )
}

export default NavBar
