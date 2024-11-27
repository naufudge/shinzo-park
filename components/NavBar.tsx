'use client';

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import axios from 'axios';
import { JwtPayload } from 'jsonwebtoken';
import Image from 'next/image';
import { ChevronDown, LayoutDashboard, LogOut, User } from 'lucide-react';
import { TokenGetResponseType } from '@/types/MyTypes';



const NavBar = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [tokenData, setTokenData] = useState<JwtPayload | null>()
    const [userDropdown, setUserDropdown] = useState(false)

    useEffect(() => {
        const getToken = async () => {
            try {
                const response = await axios.get("/api/users/me")
                const responseData: TokenGetResponseType = response.data
                if (responseData.token) {
                    setTokenData(responseData.token);
                    setLoggedIn(true);
                }
            } catch (error: any) {
                console.log(error.message);
            }
        }
        if (!loggedIn) getToken();
    }, [loggedIn, tokenData])

    const handleLogOut = async () => {
        try {
            const response = await axios.get("/api/users/logout")
            window.location.reload()
            return response
        } catch (error: any) {
            console.log(error.message)
        }
    }

    return (
        <div className=''>
            <div className="navbar top-4 drop-shadow-md flex py-5 px-[50px] justify-between z-[100] mx-[50px] rounded-full">
                <Link href={"/"}><h1 className="font-poppins font-bold text-3xl">DhonVeli</h1></Link>
                <div className="flex gap-10 place-items-center font-poppins">
                    <Link href={"/"}>Home</Link>
                    <Link href={"/tickets"}>Tickets</Link>
                    <Link href={"/"}>About Us</Link>
                    

                    <div className="flex gap-6">
                        <Button
                        className="rounded-full bg-transparent"
                        variant={"outline"}
                        >
                            <Link href={"/booking"}>Book Now</Link>
                        </Button>
                        {loggedIn ?
                            <div className='place-items-center flex'>
                                <div className='flex place-items-center gap-2'>
                                    <div className='w-[30px]'><Image alt={"pp"} src={"/pp.png"} width={1000} height={0} /></div>
                                    <ChevronDown
                                    className={`w-[20px] hover:cursor-pointer ${userDropdown ? "rotate-180" : ""} transition-all duration-200`}
                                    onClick={() => setUserDropdown(!userDropdown)}
                                    />
                                </div>
                                <div className={`absolute z-[105] translate-y-[6rem] bg-white shadow-xl text-sm rounded-lg ${userDropdown ? "opacity-100" : "opacity-0"} transition-all duration-200`}>
                                    <div
                                    className='w-full p-3 hover:bg-stone-200 hover:cursor-pointer rounded-lg'
                                    onClick={() => setUserDropdown(!userDropdown)}
                                    >
                                        <Link href={"/profile"} className='flex place-items-center gap-4'><User className='w-[20px]' />Profile</Link>
                                    </div>

                                    {tokenData?.role != "normal" &&
                                        <div
                                        className='w-full p-3 hover:bg-stone-200 hover:cursor-pointer rounded-lg'
                                        onClick={() => setUserDropdown(!userDropdown)}
                                        >
                                            <Link href={"/dashboard"} className='flex place-items-center gap-4'><LayoutDashboard className='w-[20px]' />Dashboard</Link>
                                        </div>
                                    }

                                    <div 
                                    className='flex place-items-center gap-4 w-full p-3 text-red-700 hover:bg-stone-200 hover:cursor-pointer rounded-lg'
                                    onClick={() => {
                                        setUserDropdown(!userDropdown)
                                        handleLogOut()
                                    }}
                                    >
                                        <LogOut className='w-[20px]' />Logout
                                    </div>
                                </div>
                            </div>
                        :
                            <Button
                            className="rounded-full px-5"
                            variant={"default"}
                            onClick={loggedIn ? handleLogOut : () => {}}
                            >
                                {/* <Link href={loggedIn ? "" : "/login"}>{loggedIn ? "Logout" : "Login"}</Link> */}
                                <Link href={"/login"}>Login</Link>
                            </Button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar
