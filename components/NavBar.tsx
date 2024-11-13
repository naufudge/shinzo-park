'use client';

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import axios from 'axios';
import { UserTokenType } from '@/types/MyTypes';
import { JwtPayload } from 'jsonwebtoken';

type TokenGetResponseType = {
    message: string,
    success: boolean,
    token: JwtPayload | null
}

const NavBar = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [tokenData, setTokenData] = useState<JwtPayload | null>()
    const router = useRouter()

    useEffect(() => {
        const getToken = async () => {
            try {
                const response = await axios.get("/api/users/me")
                const responseData: TokenGetResponseType = response.data
                if (responseData.token) {
                    setTokenData(responseData.token);
                    setLoggedIn(true);
                }
                
                console.log(response.data);
            } catch (error: any) {
                console.log(error.message);
            }
        }
        if (!loggedIn) getToken();
    }, [loggedIn, tokenData])

    const handleLogOut = async () => {
        try {
            const response = await axios.get("/api/users/logout")
            router.refresh()
            return response
        } catch (error: any) {
            console.log(error.message)
        }
    }

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
                    onClick={loggedIn ? handleLogOut : () => {}}
                    >
                        <Link href={loggedIn ? "" : "/login"}>{loggedIn ? "Logout" : "Login"}</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default NavBar
