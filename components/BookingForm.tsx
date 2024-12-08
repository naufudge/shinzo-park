'use client';

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils"
import { HotelRoomType, HotelType, TokenGetResponseType, HotelRoom } from "@/types/MyTypes";
import axios from "axios";
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { JwtPayload } from 'jsonwebtoken';


type BookingData = {
    name: string,
    idNum: string,
    roomType: number,
    numGuests: number,
    bookingDate: Date,
    fromDate: Date | undefined,
    toDate: Date | undefined,
}

interface BookingFormProps {
    roomPrice: number;
    setRoomPrice: Dispatch<SetStateAction<number>>;
    numOfRooms: number;
    setNumOfRooms: Dispatch<SetStateAction<number>>;
    selectedRoomType: HotelRoomType | undefined;
    setSelectedRoomType: Dispatch<SetStateAction<HotelRoomType | undefined>>;
    totalPrice: number;
    setTotalPrice: Dispatch<SetStateAction<number>>;
}

const BookingForm: React.FC<BookingFormProps> = ({
    roomPrice,
    setRoomPrice,
    numOfRooms,
    setNumOfRooms,
    selectedRoomType,
    setSelectedRoomType,
    totalPrice,
    setTotalPrice
}) => {
    const [hotels, setHotels] = useState<HotelType[]>()
    const [hotelRooms, setHotelRooms] = useState<HotelRoom[]>();

    const [roomTypes, setRoomTypes] = useState<HotelRoomType[]>()
    const [roomTypesBasedOnSelectedHotel, setRoomTypesBasedOnSelectedHotel] = useState<HotelRoomType[]>()

    const [maxNumOfGuests, setMaxNumOfGuests] = useState<number>(0)

    const [loggedIn, setLoggedIn] = useState(false)
    const [tokenData, setTokenData] = useState<JwtPayload | null>()

    const [bookingData, setBookingData] = useState<BookingData>({
        name: "",
        idNum: "",
        roomType: 0,
        numGuests: 0,
        bookingDate: new Date(),
        fromDate: undefined,
        toDate: undefined,
    })

    useEffect(() => {
        async function getHotels() {
            try {
                const response = await axios.get("/api/hotels/view")
                if (response.data.success) setHotels(response.data.hotels)
                await getRoomTypes()
            } catch (error: any) {
                console.log(error.message)
            }
        }

        async function getRoomTypes() {
            try {
                const response = await axios.get("/api/hotels/viewRoomTypes")
                if (response.data.success) setRoomTypes(response.data.roomTypes)
            } catch (error: any) {
                console.log(error.message)
            }
        }

        async function getToken() {
            try {
                const response = await axios.get("/api/users/me")
                const responseData: TokenGetResponseType = response.data
                if (responseData.token) {
                    setTokenData(responseData.token);
                    setLoggedIn(true);
                }
            } catch (error: any) {
                console.log(error.message);
                setTokenData(null)
            }
        }

        async function getRooms() {
            try {
                const response = await axios.get("/api/hotels/viewRooms")
                if (response.data.success) setHotelRooms(response.data.rooms)
            } catch (error: any) {
                console.log(error.message)
            }
        }

        if (!roomTypes) getRoomTypes();
        if (!hotels) getHotels();
        if (!loggedIn) getToken();
        if (!hotelRooms) getRooms();
    }, [roomTypes, hotels, loggedIn, tokenData, hotelRooms])


    const getMaxNumOfGuests = (bed_count: number | undefined) => {
        let max: number
        if (bed_count) {
            max = 2 * bed_count
        } else {
            max = 0
        }
        setMaxNumOfGuests(max)
        return max
    }

    // Function that returns X unique random items from a list:
    function getRandomUniqueItems<T>(list: T[], numItems: number): T[] {
        if (numItems > list.length) {
            throw new Error("Number of items to select cannot be greater than the list length");
        }

        // Create a copy of the list to avoid modifying the original
        const shuffledList = [...list];

        // Shuffle the list using Fisher-Yates algorithm
        for (let i = shuffledList.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [shuffledList[i], shuffledList[randomIndex]] = [shuffledList[randomIndex], shuffledList[i]]; // Swap elements
        }

        // Return the first 'numItems' items from the shuffled list
        return shuffledList.slice(0, numItems);
    }

    // Handle the submit of the boooking form
    async function onSubmit() {
        const values = bookingData
        let roomIds: number[] = []
        const rooms = hotelRooms?.filter((room) => {
            if (room.room_type_id === values.roomType && room.occupied != true) roomIds.push(room.id)
        })

        if (roomIds && tokenData) {
            const data = {
                check_in_date: values.fromDate,
                check_out_date: values.toDate,
                booking_date: new Date(),
                numOfGuests: values.numGuests,
                total_price: totalPrice,
                user_id: tokenData.id,
                // rooms: getRandomUniqueItems(rooms, numOfRooms)
                room_ids: roomIds.slice(0, numOfRooms)
            }

            try {
                const response = await axios.post("/api/bookings/create", data)
                if (response.data.success) {
                    console.log("Successfully created booking!")
                } else {
                    console.log(response.data)
                }
            } catch (error: any) {
                console.log(error.message)
            }
        } else if (!tokenData) {
            // Handle user not logged in
            console.log("Not logged in!")
        }
    }

    const handleHotelSelect = (hotel: string) => {
        const filteredRoomTypes = roomTypes?.filter((roomType) => {
            if (roomType.hotel.name === hotel) return roomType
        })
        setRoomTypesBasedOnSelectedHotel(filteredRoomTypes)
        setSelectedRoomType(undefined)
        setRoomPrice(0)
        setNumOfRooms(0)
        setTotalPrice(0)
    }

    const handleRoomTypeSelect = (selectedId: number) => {
        setBookingData({ ...bookingData, roomType: selectedId })
        let price = 0;
        roomTypes?.filter((roomType) => {
            if (roomType.id === selectedId) {
                setSelectedRoomType(roomType)
                price = roomType.price
                getMaxNumOfGuests(roomType.bed_count)
            }
        })
        setRoomPrice(price);
        setTotalPrice(numOfRooms * price)

    }

    const handleGuestsInput = (guests: number) => {
        setBookingData({ ...bookingData, numGuests: guests })
        if (selectedRoomType) {
            const rooms = Math.ceil(guests / maxNumOfGuests)
            setNumOfRooms(rooms)
            setTotalPrice(rooms * roomPrice)
        } else {
            setNumOfRooms(0)
            setTotalPrice(0)
        }
    }

    return (
        <Tabs defaultValue="roomType" className="col-span-2 font-poppins">
            <TabsList className='w-full max-w-4xl bg-slate-200'>
                <TabsTrigger value="roomType" className='w-full font-semibold'>Book by Room Type</TabsTrigger>
                <TabsTrigger value="hotel" className='w-full font-semibold'>Book by Hotel</TabsTrigger>
            </TabsList>
            {/* Booking by room type section */}
            <TabsContent value="roomType">
                <div className="bg-white p-10 col-span-2 rounded-lg shadow-md max-w-4xl w-full mb-10">
                    <FormComponent
                        setBookingData={setBookingData}
                        onSubmit={onSubmit}
                        handleRoomTypeSelect={handleRoomTypeSelect}
                        roomTypes={roomTypes}
                        handleNumOfGuests={handleGuestsInput}
                        maxNumOfGuests={maxNumOfGuests}
                        selectedRoomType={selectedRoomType}
                        bookingData={bookingData}
                    />
                </div>
            </TabsContent>

            {/* Booking by hotel section */}
            <TabsContent value="hotel">
                <div className="bg-white p-10 col-span-2 rounded-lg shadow-md max-w-4xl w-full mb-10">
                    <div className="grid grid-cols-2 gap-8">
                        <div className='flex place-items-center'>
                            <Label htmlFor='hotel' className='font-semibold w-1/2'>Select a hotel</Label>
                            <Select onValueChange={(value) => { handleHotelSelect(value) }}>
                                <SelectTrigger id={"hotel"} className="">
                                    <SelectValue placeholder="Select Hotel" />
                                </SelectTrigger>
                                <SelectContent>
                                    {hotels?.map((hotel, index) => (
                                        <SelectItem key={index} value={hotel.name} className='hover:cursor-pointer'>{hotel.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Separator className='my-8' />
                    <FormComponent
                        setBookingData={setBookingData}
                        onSubmit={onSubmit}
                        handleRoomTypeSelect={handleRoomTypeSelect}
                        roomTypes={roomTypesBasedOnSelectedHotel}
                        handleNumOfGuests={handleGuestsInput}
                        maxNumOfGuests={maxNumOfGuests}
                        selectedRoomType={selectedRoomType}
                        bookingData={bookingData}
                    />
                </div>
            </TabsContent>
        </Tabs>
    )
}

interface FormComponentProps {
    setBookingData: Dispatch<SetStateAction<BookingData>>;
    bookingData: BookingData;
    onSubmit: () => Promise<void>;

    handleRoomTypeSelect: (selectedId: number) => void;
    roomTypes: HotelRoomType[] | undefined;
    handleNumOfGuests: (guests: number) => void;
    maxNumOfGuests: number;
    selectedRoomType: HotelRoomType | undefined;
}

const FormComponent: React.FC<FormComponentProps> = ({ setBookingData, onSubmit, handleRoomTypeSelect, roomTypes, handleNumOfGuests, maxNumOfGuests, selectedRoomType, bookingData }) => {
    return (
        <div>
            <form className='grid grid-cols-2 gap-12'>
                <div className='flex flex-col gap-2'>
                    <Label htmlFor='fullName'>Full Name</Label>
                    <Input id='fullName' onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })} />
                </div>

                <div className='flex flex-col gap-2'>
                    <Label htmlFor='idNum'>ID Card Number</Label>
                    <Input id='idNum' onChange={(e) => setBookingData({ ...bookingData, idNum: e.target.value })} />
                </div>

                <div className='flex flex-col gap-2'>
                    <Label htmlFor='roomType'>Room Type Select</Label>
                    <Select onValueChange={(e) => { handleRoomTypeSelect(parseInt(e)) }}>
                        <SelectTrigger id="roomType">
                            <SelectValue placeholder="Select room type" />
                        </SelectTrigger>

                        <SelectContent>
                            {roomTypes?.map((roomType, index) => (
                                <SelectItem
                                    key={index}
                                    value={roomType.id.toString()}
                                    className='hover:cursor-pointer'
                                >{roomType.name} - {roomType.bed_count} Bed(s)</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className='flex flex-col gap-2'>
                    <Label htmlFor='guests'>Number of Guests</Label>
                    <Input id='guests' type='number' onChange={(e) => handleNumOfGuests(parseInt(e.target.value))} />
                </div>

                <div className='flex flex-col gap-2'>
                    <Label htmlFor='check-in'>Check-in Date</Label>
                    <Popover>
                        <PopoverTrigger id='check-in' asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "pl-3 text-left font-normal",
                                    !bookingData.fromDate && "text-muted-foreground"
                                )}
                            >
                                {bookingData.fromDate ? (
                                    format(bookingData.fromDate, "PPP")
                                ) : (
                                    <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>

                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={bookingData.fromDate}
                                onSelect={(e) => { setBookingData({ ...bookingData, fromDate: e }) }}
                                disabled={(date) =>
                                    date < new Date()
                                }
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <div className='flex flex-col gap-2'>
                    <Label htmlFor='check-out'>Check-out Date</Label>
                    <Popover>
                        <PopoverTrigger id='check-out' asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "pl-3 text-left font-normal",
                                    !bookingData.toDate && "text-muted-foreground"
                                )}
                            >
                                {bookingData.toDate ? (
                                    format(bookingData.toDate, "PPP")
                                ) : (
                                    <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>

                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={bookingData.toDate}
                                onSelect={(e) => { setBookingData({ ...bookingData, toDate: e }) }}
                                disabled={(date) =>
                                    date < new Date()
                                }
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <Button type="button" onClick={onSubmit} className='w-fit col-span-full'>Book now!</Button>

            </form>

        </div>
    )
}

export default BookingForm
