'use client';

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Edit, Hotel, Settings, Ticket, User } from 'lucide-react'
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { TokenGetResponseType } from '@/types/MyTypes';
import axios from 'axios';
import { JwtPayload } from 'jsonwebtoken';

const ProfilePage = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [tokenData, setTokenData] = useState<JwtPayload | null>()
    const [currentSection, setCurrentSection] = useState("personal")

    useEffect(() => {
        const getToken = async () => {
            try {
                const response = await axios.get("/api/users/me")
                const responseData: TokenGetResponseType = response.data
                if (responseData.token) {
                    setTokenData(responseData.token);
                    setLoggedIn(true);
                }
                console.log(responseData.token)
            } catch (error: any) {
                console.log(error.message);
            }
        }
        if (!loggedIn) getToken();
    }, [currentSection])

    return (
        <div className='grid grid-cols-10 my-[70px] gap-10 mx-[180px] font-poppins'>
            {/* Left Side */}
            <div className='bg-white col-span-3 shadow-md rounded-xl'>
                <div className='mx-auto w-[150px] my-10 opacity-50 hover:bg-stone-300 hover:cursor-pointer rounded-full transition-all'>
                    <Image alt='pp' src={"/pp.png"} width={512} height={0} />
                </div>
                {/* Options */}
                <div className='flex justify-center place-items-center mb-10'>
                    <div className='flex flex-col gap-2'>   
                        <div className='font-dancing font-bold text-[2.25rem] text-center mb-5'>{tokenData?.username}</div>
                        
                        <div className='flex flex-col justify-start gap-4'>
                            <div onClick={() => setCurrentSection("personal")} className='flex gap-4 hover:text-orange-200 hover:cursor-pointer transition-all'>
                                <User className='w-[20px]' />
                                User Information
                            </div>
                            <div onClick={() => setCurrentSection("bookings")} className='flex gap-4 hover:text-orange-200 hover:cursor-pointer transition-all'>
                                <Hotel className='w-[20px]' />
                                Hotel Bookings
                            </div>
                            <div onClick={() => setCurrentSection("tickets")} className='flex gap-4 hover:text-orange-200 hover:cursor-pointer transition-all'>
                                <Ticket className='w-[20px]' />
                                Acvitity Tickets
                            </div>
                            <div onClick={() => setCurrentSection("settings")} className='flex gap-4 hover:text-orange-200 hover:cursor-pointer transition-all'>
                                <Settings className='w-[20px]' />
                                Settings
                            </div>
                            

                        </div>
                    </div>

                </div>
            </div>

            {/* Right Side */}
            <div className='bg-white col-span-7 shadow-md rounded-xl p-8'>
                {currentSection === "personal" ? 
                <PersonalSection tokenData={tokenData!} /> :
                currentSection === "bookings" ?
                <BookingsSection />
                : <></>
                }
            </div>    
        </div>
    )
}

interface SectionProps {
    tokenData: JwtPayload | null
}

const PersonalSection: React.FC<SectionProps> = ({tokenData}) => {
    return(
        <div className='font-poppins'>
            {
                
            }
            <h1 className='font-bold text-[1.75rem]'>User Information</h1>
            <Separator className='my-5' />
            <div className='flex gap-10 text-stone-500'>
                <div className='flex flex-col gap-'>
                    <div className='font-semibold'>Email:</div>
                    <div>{tokenData?.email}</div>
                </div>
                <div className='flex flex-col gap-'>
                    <div className='font-semibold'>Loyalty Points:</div>
                    <div>{tokenData?.loyalty_points}</div>
                </div>
            </div>

            <div className='mt-10'>
                <div className='flex justify-between place-items-center'>
                    <h2 className='text-xl font-bold'>Personal Information</h2>
                    <div className='flex'><Button variant={"ghost"} className='text-md'><Edit />Edit</Button></div>
                </div>
                <Separator className='my-4' />
                <div className='grid grid-cols-3 gap-6 text-stone-500'>
                    <div className='flex flex-col'>
                        <div className='font-semibold'>Full Name:</div>
                        <div>Mohamed Nauf Ali Shareef</div>
                    </div>

                    <div className='flex flex-col'>
                        <div className='font-semibold'>Age:</div>
                        <div>22</div>
                    </div>
                    
                    <div className='flex flex-col'>
                        <div className='font-semibold'>Gender:</div>
                        <div>Male</div>
                    </div>
                    
                    <div className='flex flex-col'>
                        <div className='font-semibold'>Nationality:</div>
                        <div>Maldivian</div>
                    </div>

                    <div className='flex flex-col'>
                        <div className='font-semibold'>Address:</div>
                        <div>M.Maya, 9C, Male' City</div>
                    </div>

                </div>
            </div>
        </div>
    )
}

const BookingsSection = () => {
    return(
        <div>
            <h1 className='font-bold text-[1.75rem]'>Hotels Bookings</h1>
            <Separator className='my-5' />
        </div>
    )
}

export default ProfilePage
