'use client';

import React, { useEffect, useState } from 'react';
import { HotelBooking, HotelRoom, HotelRoomType, HotelType, NewHotelRoom, hotelFormSchema } from '@/types/MyTypes';
import axios from 'axios';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { BadgeDollarSign, Bed, DoorClosed, Pencil, Plus, Tag, Trash } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from 'zod';
import DashboardCard from '@/components/Dashboard/DashboardCard';
import AddRoom from './HotelComponents/AddRoom';
import RoomsTable from './HotelComponents/RoomsTable';
import EditRoomType from './HotelComponents/EditRoomType';
import RecentBookings from './HotelComponents/RecentBookings';


const HotelDashboard = () => {
    const [hotels, setHotels] = useState<HotelType[]>();
    const [hotelRooms, setHotelRooms] = useState<NewHotelRoom[]>();

    const [selectedHotel, setSelectedHotel] = useState<HotelType>();
    const [selectedHotelRooms, setSelectedHotelRooms] = useState<NewHotelRoom[]>();

    const [hotelBookings, setHotelBookings] = useState<HotelBooking[] | null>([]);
    const [hotelBookingsChecked, setHotelBookingsChecked] = useState(false)

    const [hotelRoomTypes, setHotelRoomTypes] = useState<HotelRoomType[] | null>(null);
    const [selectedHotelRoomTypes, setSelectedHotelRoomTypes] = useState<HotelRoomType[] | null>();

    const [addingHotel, setAddingHotel] = useState("");
    const [addHotelIsOpen, setAddHotelIsOpen] = useState(false)

    const [addRoomIsOpen, setAddRoomIsOpen] = useState(false);

    const [addRoomTypesIsOpen, setAddRoomTypesIsOpen] = useState(false);
    const [editRoomTypeIsOpen, setEditRoomTypeIsOpen] = useState(false);

    const [selectedRoomType, setSelectedRoomType] = useState<HotelRoomType | null>(null);


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
            if (response.data.success) setHotelRoomTypes(response.data.roomTypes)


        } catch (error: any) {
            console.log(error.message)
        }
    }

    async function getRooms() {
        try {
            const response = await axios.get("/api/hotels/viewRooms")
            if (response.data.success) setHotelRooms(response.data.rooms)
            console.log(response.data)
        } catch (error: any) {
            console.log(error.message)
        }
    }

    async function updateHotelInfo() {
        // await getHotels()
        await getRoomTypes()
        await getRooms()

        const filteredRooms = hotelRooms?.filter((room) => { if (room.hotel.id === selectedHotel?.id) return room })
        setSelectedHotelRooms(filteredRooms)

        const roomTypes = hotelRoomTypes?.filter((roomType) => { if (roomType.hotel_id === selectedHotel?.id) return roomType })
        setSelectedHotelRoomTypes(roomTypes)
    }

    async function getHotelBookings() {
        try {
            const response = await axios.get("/api/bookings/view")
            if (response.data.success) {
                const bookings: HotelBooking[] = response.data.bookings
                let roomTypeIds: number[] = []
                let tempHotelBookings: HotelBooking[] = []

                hotelRoomTypes?.filter((roomType) => {
                    roomTypeIds.push(roomType.id)
                })

                bookings.filter((booking) => {
                    booking.rooms.filter((room) => {
                        if (roomTypeIds.includes(room.room_type_id)) tempHotelBookings.push(booking)
                    })
                })

                setHotelBookings(tempHotelBookings)
                setHotelBookingsChecked(true)
            } else {
                setHotelBookings(null)
            }
        } catch (error: any) {
            setHotelBookings(null)
            console.log(error.message)
        }
    }

    useEffect(() => {
        if (!hotels) getHotels()
        if (selectedHotel && !hotelRoomTypes) getRoomTypes()
        if (!hotelRooms) getRooms()
        if (selectedHotel && hotelBookings != null && hotelRoomTypes && !hotelBookingsChecked) getHotelBookings()

    }, [hotels, hotelRoomTypes, hotelRooms, selectedHotel, hotelBookings, hotelBookingsChecked])

    const form = useForm<z.infer<typeof hotelFormSchema>>({
        resolver: zodResolver(hotelFormSchema),
        defaultValues: {
            name: "",
            rooms: [{
                name: "",
                price: 0,
                bed_count: 0,
                quantity: 0
            }]
        }
    })

    const control = form.control

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'rooms',
    });

    const roomTypeCreateOnSubmit = async (values: z.infer<typeof hotelFormSchema>) => {
        try {
            const data = {
                hotel_id: selectedHotel?.id,
                rooms: values.rooms
            }
            const response = await axios.post("/api/hotels/addRoomType", data)
            setAddRoomTypesIsOpen(false)
            setHotelRoomTypes(null)

            if (response.data.success) console.log("success!")
            await getHotels()
            await getRoomTypes()
        } catch (error: any) {
            console.log(error.message)
        } finally {
            await getHotels()
        }

        form.reset({
            name: "",
            rooms: [{
                name: "",
                price: 0,
                bed_count: 0,
                quantity: 0
            }]
        })
        await getRoomTypes()
    }

    const handleHotelSelect = (hotelName: string) => {
        getHotels()
        getRoomTypes()
        getRooms()
        

        let selectedHotelId: number

        hotels?.filter((hotel, index) => {
            if (hotel.name === hotelName) {
                setSelectedHotel(hotel)
                selectedHotelId = hotel.id
            }
        })

        const filteredRooms = hotelRooms?.filter((room) => { if (room.hotel.id === selectedHotelId) return room })
        setSelectedHotelRooms(filteredRooms)

        const roomTypes = hotelRoomTypes?.filter((item) => { if (item.hotel_id === selectedHotelId) return item })
        setSelectedHotelRoomTypes(roomTypes)
        setSelectedRoomType(null)
    }

    const handleHotelAdding = async () => {
        try {
            if (addingHotel) {
                const response = await axios.post("/api/hotels/add", { name: addingHotel })
                console.log(response.data)
                setAddingHotel("")
                if (response.data.success) setAddHotelIsOpen(false)
            }
        } catch (error: any) {
            console.log(error.message)
        } finally { setAddingHotel("") }
    }

    const handleRoomTypeSelect = (roomType_id: number) => {
        selectedHotelRoomTypes?.filter((item) => {
            if (item.id === roomType_id) setSelectedRoomType(item)
        })
    }

    const handleRoomTypeDelete = async () => {
        try {
            if (selectedRoomType) {
                const data = { roomTypeId: selectedRoomType.id }
                const response = await axios.post("/api/hotels/deleteRoomType", data)
                if (response.data.success) console.log("Successfully deleted room type.")
            }
        } catch (error: any) {
            console.log(error.message)
        }

        getRoomTypes()
        setSelectedHotelRoomTypes(null)
        const roomTypes = hotelRoomTypes?.filter((item) => { if (item.hotel_id === selectedHotel?.id) return item })
        setSelectedHotelRoomTypes(roomTypes)
        setSelectedRoomType(null)
    }

    return (
        <div>
            <div className='flex justify-between place-items-center font-poppins mb-6'>
                <h1 className="font-bold text-2xl text-gray-800">Hotel Management Dashboard</h1>
                <div className='flex gap-5'>
                    <Select onValueChange={(value) => { handleHotelSelect(value) }}>
                        <SelectTrigger className="w-[250px]">
                            <SelectValue placeholder="Select Hotel" />
                        </SelectTrigger>
                        <SelectContent>
                            {hotels?.map((hotel, index) => (
                                <SelectItem key={index} value={hotel.name} className='hover:cursor-pointer'>{hotel.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Dialog onOpenChange={setAddHotelIsOpen} open={addHotelIsOpen}>
                        <DialogTrigger className='bg-orange-500 active:bg-orange-500 hover:bg-orange-400 h-fit rounded-md p-2 flex text-white place-items-center px-4 gap-2'>
                            <Plus color='white' /> Add Hotel
                        </DialogTrigger>
                        <DialogContent className='font-poppins max-h-screen overflow-y-auto'>
                            <DialogHeader className='mb-4'>
                                <DialogTitle>Add a Hotel</DialogTitle>
                                <DialogDescription>
                                    Add a hotel by entering the information below.
                                </DialogDescription>
                            </DialogHeader>

                            <Label htmlFor='hotelName'>Hotel Name</Label>
                            <Input id='hotelName' onChange={(e) => { setAddingHotel(e.target.value) }} />
                            <br />
                            <Button className='w-fit px-5' onClick={handleHotelAdding}>Add Hotel</Button>
                        </DialogContent>
                    </Dialog>

                </div>
            </div>

            <Separator className='my-8' />

            <div className='font-poppins'>
                {selectedHotel ?
                    <div>
                        <div className='flex justify-between'>
                            <h2 className='font-bold text-xl'>{selectedHotel.name}</h2>
                            <Dialog open={addRoomTypesIsOpen} onOpenChange={setAddRoomTypesIsOpen}>

                                <DialogContent className='font-poppins max-h-screen overflow-y-auto'>
                                    <DialogHeader className='flex flex-col gap-1'>
                                        <DialogTitle>Add a Room Type</DialogTitle>
                                        <DialogDescription>
                                            Add a room type for {selectedHotel.name}
                                        </DialogDescription>
                                    </DialogHeader>

                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(roomTypeCreateOnSubmit)} className="space-y-7 my-4">
                                            {fields.map((item, index) => (
                                                <div key={item.id}>

                                                    <div className='flex justify-between place-items-center'>
                                                        <h2 className='font-semibold'>Room Type {index + 1}</h2>
                                                        {index != 0 &&
                                                            <Button variant={"destructive"} onClick={() => remove(index)}>
                                                                <Trash width={20} height={20} />
                                                            </Button>
                                                        }
                                                    </div>
                                                    {/* Room Fields */}
                                                    <div className='grid grid-cols-2 gap-4 my-3'>
                                                        {/* Room Name */}
                                                        <FormField
                                                            control={form.control}
                                                            name={`rooms.${index}.name`}
                                                            render={({ field }) => (
                                                                <FormItem className='col-span-full'>
                                                                    <FormLabel>Room Name</FormLabel>
                                                                    <FormControl>
                                                                        <Input placeholder="Room Name" {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                        {/* Room Price */}
                                                        <FormField
                                                            control={form.control}
                                                            name={`rooms.${index}.price`}
                                                            render={({ field }) => (
                                                                <FormItem className=''>
                                                                    <FormLabel>Price (MVR)</FormLabel>
                                                                    <FormControl>
                                                                        <Input placeholder="Price" {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                        {/* Room's Bed Count */}
                                                        <FormField
                                                            control={form.control}
                                                            name={`rooms.${index}.bed_count`}
                                                            render={({ field }) => (
                                                                <FormItem className=''>
                                                                    <FormLabel>Bed Count</FormLabel>
                                                                    <FormControl>
                                                                        <Input type='number' placeholder="Bed Count" {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                    </div>
                                                    <Separator className='mt-8' />
                                                </div>
                                            ))}
                                            <div className='flex flex-col gap-5'>
                                                <Button
                                                    type='button'
                                                    variant={"outline"}
                                                    className='w-fit'
                                                    onClick={() => append({ name: "", price: 0, quantity: 0, bed_count: 0 })}
                                                ><Plus />Add More</Button>

                                                <Button type="submit">Add Room Type</Button>
                                            </div>
                                        </form>

                                    </Form>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <br />

                        {/* Main hotel management section */}
                        <div className='grid grid-cols-2 gap-8'>
                            <div className='grid grid-cols-2 gap-8'>
                                <DashboardCard title='Total Rooms' icon={<Bed color='orange' />} content={selectedHotel.room_count.toString()} />
                                <DashboardCard title='Occupied Rooms' icon={<DoorClosed color='red' />} content={"0"} />
                                <div className='my-8 flex flex-col col-span-full gap-4'>
                                    <div className='flex justify-between place-content-center my-auto'>
                                        <h2 className='font-semibold text-lg'>Room Type Management</h2>
                                        <Button variant={"outline"} onClick={() => setAddRoomTypesIsOpen(true)}><Plus /> Add Room Type</Button>
                                    </div>

                                    <Card className='w-full pt-6'>

                                        <CardContent>
                                            {/* Room type selection */}
                                            <div className="flex flex-col gap-3">
                                                <Label htmlFor='roomType' className=''>Select a Room Type</Label>
                                                <Select name='roomType' onValueChange={(value) => handleRoomTypeSelect(parseInt(value))}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select Room Type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {selectedHotelRoomTypes?.map((roomType, index) => (
                                                            <SelectItem key={index} value={roomType.id.toString()} className='hover:cursor-pointer'>{roomType.name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            {/* Manage the selected room type below */}
                                            <div>
                                                {selectedRoomType &&
                                                    <div className='mt-8 flex flex-col gap-2 mx-2'>
                                                        <div className='flex gap-2 place-items-center'><Tag className='w-[20px]' /><span className='font-medium'>Name:</span> {selectedRoomType.name}</div>
                                                        <div className='flex gap-2 place-items-center'><Bed className='w-[20px]' /><span className='font-medium'>Bed Count:</span> {selectedRoomType.bed_count}</div>
                                                        <div className='flex gap-2 place-items-center'><BadgeDollarSign className='w-[20px]' /><span className='font-medium'>Price:</span> MVR {selectedRoomType.price}</div>


                                                        {/* Delete Dialog */}
                                                        <div className='flex gap-4 mt-4'>
                                                            <Button variant={"secondary"} onClick={() => setEditRoomTypeIsOpen(true)}><Pencil className='w-[20px]' /> Edit Room Type</Button>
                                                            <EditRoomType isOpen={editRoomTypeIsOpen} setIsOpen={setEditRoomTypeIsOpen} roomTypeDetail={selectedRoomType} />

                                                            <AlertDialog>
                                                                <AlertDialogTrigger className='w-fit flex gap-2 p-2 px-4 rounded-md bg-red-500 text-white place-items-center'><Trash className='w-[20px]' /> Delete Room Type</AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                                        <AlertDialogDescription>
                                                                            This action cannot be undone. This will permanently delete the room type and all the rooms of the type.
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>

                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                        <AlertDialogAction
                                                                            className='bg-red-500 hover:bg-red-600'
                                                                            onClick={handleRoomTypeDelete}
                                                                        >Delete</AlertDialogAction>
                                                                    </AlertDialogFooter>

                                                                </AlertDialogContent>
                                                            </AlertDialog>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>

                            <div className='flex flex-col gap-2 h-full'>
                                <h2 className='font-semibold text-lg'>Recent Bookings</h2>
                                <Card>
                                    <CardContent className='p-5'>
                                        <RecentBookings bookings={hotelBookings} />
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                        <div>
                            {/* Rooms management */}
                            <div className='flex justify-between place-items-center mb-5'>
                                <h2 className='font-semibold text-lg'>Manage Rooms</h2>
                                <Button variant={"outline"} onClick={() => setAddRoomIsOpen(true)}><Plus /> Add Room</Button>
                                <AddRoom isOpen={addRoomIsOpen} setIsOpen={setAddRoomIsOpen} roomTypes={selectedHotelRoomTypes} />
                            </div>
                            <Card>
                                <CardContent className='p-4'>
                                    <RoomsTable rooms={selectedHotelRooms} roomTypes={selectedHotelRoomTypes} updateHotel={updateHotelInfo} />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    :
                    <div className='text-stone-400 text-center font-light text-2xl'>Select a hotel first.</div>
                }
            </div>
        </div>
    )
}

export default HotelDashboard
