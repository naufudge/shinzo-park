'use client';

import React, { Dispatch, SetStateAction } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { HotelRoomType, roomAddingFormSchema } from '@/types/MyTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';


interface AddRoom {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    roomTypes: HotelRoomType[] | null | undefined;
}

const AddRoom: React.FC<AddRoom> = ({isOpen, setIsOpen, roomTypes}) => {
    const form = useForm<z.infer<typeof roomAddingFormSchema>>({
        resolver: zodResolver(roomAddingFormSchema),
        defaultValues: {
            room_number: 0,
            occupied: false,
            room_type_id: ""
        }
    })
    const onSubmit = async (values: z.infer<typeof roomAddingFormSchema>) => {
        try {
            const data = {
                hotel_room: {
                    room_number: values.room_number,
                    occupied: values.occupied,
                    room_type_id: parseInt(values.room_type_id)
                },
                hotel_id: roomTypes!![0].hotel_id
            }
            console.log(data)
            const response = await axios.post("/api/hotels/addRoom", data)
            if (response.data.success) setIsOpen(false)
                
        } catch (error: any) {
            console.log(error.message)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className='font-poppins'>
                <DialogHeader>
                <DialogTitle>Add a Room</DialogTitle>
                <DialogDescription>
                    Add a room by filling the information below
                </DialogDescription>
                </DialogHeader>
                <div>
                    { roomTypes ?
                        <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                            control={form.control}
                            name="room_number"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Room Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="Room Number" {...field} />
                                </FormControl>
                                
                                <FormMessage />
                                </FormItem>
                            )}
                            />

                            <FormField
                            control={form.control}
                            name="room_type_id"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Room Type</FormLabel>
                                <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a room type" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {roomTypes.map((room, index) => (
                                            <SelectItem key={index} value={room.id.toString()}>{room.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                </FormControl>
                                
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                        </Form>
                    :
                        <div className='italic text-center'>Loading...</div>
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AddRoom;
