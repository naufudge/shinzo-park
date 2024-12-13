'use client';

import React, { Dispatch, SetStateAction } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
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
import { Button } from "@/components/ui/button";
import { HotelRoom, HotelRoomType, NewHotelRoom, roomAddingFormSchema } from '@/types/MyTypes';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import axios from 'axios';

interface EditRoom {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    roomTypes: HotelRoomType[] | null | undefined;
    roomDetails: NewHotelRoom | null | undefined;
    updateHotel: () => void;
}

const EditRoom: React.FC<EditRoom> = ({ isOpen, setIsOpen, roomTypes, roomDetails, updateHotel }) => {
    const form = useForm<z.infer<typeof roomAddingFormSchema>>({
        resolver: zodResolver(roomAddingFormSchema),
        defaultValues: {
            room_number: 0,
            occupied: false,
            room_type_id: ""
        },
        values: {
            room_number: roomDetails?.room_number!!,
            occupied: roomDetails?.occupied!!,
            room_type_id: roomDetails?.room_type_id.toString()!!
        }
    })

    const onSubmit = async (values: z.infer<typeof roomAddingFormSchema>) => {
        try {
            const data = {
                room_id: roomDetails?.id!!,
                roomData: values
            }
            const response = await axios.post("/api/hotels/editRoom", data)
            
        } catch (error: any) {
            console.log(error.message)
        } finally { updateHotel() }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className='font-poppins'>
                <DialogHeader>
                <DialogTitle>Edit Room</DialogTitle>
                <DialogDescription>
                    Edit room by changing the required information below.
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
                                    <Input type='number' placeholder="Room Number" {...field} />
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

export default EditRoom
