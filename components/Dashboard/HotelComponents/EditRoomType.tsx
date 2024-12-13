'use client'

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
import { Button } from "@/components/ui/button";
import { HotelRoomType, roomTypeUpdateFormSchema } from '@/types/MyTypes';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import Loading from '@/components/Loading';


interface EditRoomType {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    roomTypeDetail: HotelRoomType | null;
}


const EditRoomType: React.FC<EditRoomType> = ({isOpen, setIsOpen, roomTypeDetail}) => {
    if (!roomTypeDetail) {
        return <Loading />
    }
    
    const form = useForm<z.infer<typeof roomTypeUpdateFormSchema>>({
        resolver: zodResolver(roomTypeUpdateFormSchema),
        defaultValues: {
            name: "",
            price: 0,
            bed_count: 0
        },
        values: {
            name: roomTypeDetail.name,
            price: roomTypeDetail.price,
            bed_count: roomTypeDetail.bed_count
        }
    })

    const onSubmit = async (values: z.infer<typeof roomTypeUpdateFormSchema>) => {
        try {
            const data = {
                room_type_id: roomTypeDetail?.id,
                roomTypeDetails: values
            }
            const response = await axios.post("/api/hotels/editRoomType", data)
            if (response.data.success) console.log("Edited successfully!")
        } catch (error: any) {
            console.log(error.message)
        } finally { setIsOpen(false); }
    }
    
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className='font-poppins'>
                <DialogHeader>
                <DialogTitle>Edit Room Type</DialogTitle>
                <DialogDescription>
                    Change the fields that you would like to change and submit.
                </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Room Type Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Name" {...field} />
                            </FormControl>
                            
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='grid grid-cols-2 gap-5'>
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Price (MVR)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Price" {...field} />
                                </FormControl>
                                
                                <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="bed_count"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Bed Count</FormLabel>
                                <FormControl>
                                    <Input placeholder="Bed Count" {...field} />
                                </FormControl>
                                
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type='submit'>Submit</Button>
                </form>
                </Form>

            </DialogContent>
        </Dialog>
    )
}

export default EditRoomType
