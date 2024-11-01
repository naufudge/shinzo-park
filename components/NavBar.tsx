'use client';

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const NavBar = () => {
    const [showTickets, setShowTickets] = useState(false)
    const router = useRouter()

    return (
        <div className="navbar sticky top-0 flex py-6 px-[100px] justify-between z-[100] w-full">
            <Link href={"/"}><h1 className="font-roboto font-bold text-3xl">DhonVeli</h1></Link>
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
