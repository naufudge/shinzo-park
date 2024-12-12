'use client';

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Edit, Hotel, Settings, Ticket, User } from 'lucide-react'
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ActivityTicket, HotelBooking, HotelRoomType, TokenGetResponseType } from '@/types/MyTypes';
import axios from 'axios';
import { JwtPayload } from 'jsonwebtoken';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Loading from '@/components/Loading';

type ModifiedHotelBooking = HotelBooking & {
    hotel: string;
}

const ProfilePage = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [tokenData, setTokenData] = useState<JwtPayload | null>()
    const [currentSection, setCurrentSection] = useState("personal")

    const [bookings, setBookings] = useState<HotelBooking[]>([])
    const [finalBookings, setFinalBookings] = useState<ModifiedHotelBooking[] | null>(null)

    const [activityTickets, setActivityTickets] = useState<ActivityTicket[] | null>(null)
    
    // Get hotel name from Room type ID
    const getHotelForRooms = async () => {
        try {
            let userBookings: ModifiedHotelBooking[] = [];
            const response = await axios.get("/api/hotels/viewRoomTypes")
            bookings.filter(async (booking) => {
                const room_type_id = booking.rooms[0].room_type_id
                const roomTypes: HotelRoomType[] = response.data.roomTypes
                roomTypes.filter((roomType) => {
                    if (roomType.id === room_type_id) {
                        userBookings.push({...booking, hotel: roomType.hotel.name})
                    }
                })
            })
            setFinalBookings(userBookings)
        } catch (error: any) {
            console.log(error.message)
        }
    }

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

        const getBookings = async () => {
            try {
                const response = await axios.get("/api/bookings/view")
                if (response.data.success) {
                    const bookingsData: HotelBooking[] = response.data.bookings
                    const filteredBookings = bookingsData.filter(async (booking) => {
                        if (booking.user_id === tokenData?.id) {
                            return booking
                        }
                    })
                    setBookings(filteredBookings)
                } else setBookings([])
            } catch (error: any) {
                console.log(error.message)                
            }
        }

        const getUserActivityTickets = async () => {
            try {
                const response = await axios.get("/api/activities/viewTickets")
                if (response.data.success) {
                    setActivityTickets(response.data.tickets);
                } else {
                    setActivityTickets([])
                }
            } catch (error: any) {
                console.log(error.message)
            }
        }

        if (!loggedIn) getToken();
        if (bookings.length === 0 && tokenData) getBookings();
        if (bookings.length != 0 && !finalBookings) getHotelForRooms();
        if (loggedIn && !activityTickets) getUserActivityTickets();
    }, [currentSection, bookings, tokenData, loggedIn, finalBookings, activityTickets])

    return (
        <div className='grid grid-cols-10 my-[70px] gap-10 mx-[180px] font-poppins'>
            {/* Left Side */}
            <div className='bg-white col-span-3 shadow-md rounded-xl'>
                <div className='mx-auto w-[150px] my-10 opacity-50 hover:bg-stone-300 hover:cursor-pointer rounded-full transition-all'>
                    <Image alt='pp' src={"/pp.png"} width={512} height={0} priority />
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
                    <BookingsSection bookings={finalBookings} />
                : currentSection === "tickets" ?
                    <TicketsSection tickets={activityTickets} />
                : <></>
                }
            </div>    
        </div>
    )
}

// Convert the string to a Date object
const formatDateString = (dateString: string | null | undefined) => {
    if (dateString) {
        const date = new Date(dateString);

        // Check if the date is valid
        if (isNaN(date.getTime())) {
            throw new Error("Invalid date string");
        }

        // Format the date in the desired format: "09 December 2024"
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        };

        return date.toLocaleDateString('en-GB', options);
    } else {
        return "";
    }
}

// Personal Info Section Component
interface PersonalSectionProps {
    tokenData: JwtPayload | null
}

const PersonalSection: React.FC<PersonalSectionProps> = ({tokenData}) => {
    return(
        <div className='font-poppins'>
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

// Bookings section component
interface BookingSectionProps {
    bookings: ModifiedHotelBooking[] | null | undefined ;
}

const BookingsSection: React.FC<BookingSectionProps> = ({ bookings }) => {
    return(
        <div className='font-poppins'>
            <h1 className='font-bold text-[1.75rem]'>Hotel Room Bookings</h1>
            <Separator className='my-5' />
            { bookings && bookings?.length > 0 ? 
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='font-semibold'>No.</TableHead>
                            <TableHead className='font-semibold'>Check-in Date</TableHead>
                            <TableHead className='font-semibold'>Check-out Date</TableHead>
                            <TableHead className='font-semibold'>Hotel</TableHead>
                            {/* <TableHead className='font-semibold'>Actions</TableHead> */}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bookings.map((booking, index) => (
                            <TableRow key={index}>
                                <TableCell>{booking.id}</TableCell>
                                <TableCell className=''>{formatDateString(booking.check_in_date)}</TableCell>
                                <TableCell className=''>{formatDateString(booking.check_out_date)}</TableCell>
                                <TableCell className=''>{booking.hotel}</TableCell>
                                {/* <TableCell></TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            : bookings?.length === 0 ?
                <div>No Bookings</div> 
            :
                <Loading />
            }
        </div>
    )
}

// Activity tickets section component

interface TicketsSectionProps {
    tickets: ActivityTicket[] | null | undefined;
}

const TicketsSection: React.FC<TicketsSectionProps> = ({ tickets }) => {
    const getActivityName = (id: number) => {
        switch (id) {
            case 2:
                return "Cinema"
            case 3:
                return "Water Park"
            case 4:
                return "Amusement Park"
            case 5:
                return "Arcade"
            default:
                return "" 
        }
    }
    
    return(
        <div className='font-poppins'>
            <h1 className='font-bold text-[1.75rem]'>Activity Tickets</h1>
            <Separator className='my-5' />

            {tickets && tickets?.length > 0 && 
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='font-semibold'>No.</TableHead>
                            <TableHead className='font-semibold'>Activity</TableHead>
                            <TableHead className='font-semibold'>Date</TableHead>
                            <TableHead className='font-semibold'>Price (MVR)</TableHead>
                            {/* <TableHead className='font-semibold'>Actions</TableHead> */}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tickets.map((ticket, index) => (
                            <TableRow key={index}>
                                <TableCell>{ticket.id}</TableCell>
                                <TableCell className=''>{getActivityName(ticket.activity_id)}</TableCell>
                                <TableCell className=''>{formatDateString(ticket.bookingDate)}</TableCell>
                                <TableCell className=''>{ticket.total_price}</TableCell>
                                {/* <TableCell></TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            }

        </div>
    )
}


export default ProfilePage
