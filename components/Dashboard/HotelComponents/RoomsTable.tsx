'use client';

import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
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
import { HotelRoom, HotelRoomType } from '@/types/MyTypes';
import { Pencil, Trash2 } from 'lucide-react';
import axios from 'axios';
import EditRoom from './EditRoom';

interface RoomsTable {
    rooms: HotelRoom[] | undefined;
    roomTypes: HotelRoomType[] | null | undefined;
    updateHotel: () => void;
}

const RoomsTable: React.FC<RoomsTable> = ({ rooms, roomTypes, updateHotel }) => {
    const [editRoomIsOpen, setEditRoomIsOpen] = useState(false);
    const [editingRoom, setEditingRoom] = useState<HotelRoom>()

    const handleRoomDelete = async (room_id: number) => {
        try {
            const response = await axios.post("/api/hotels/deleteRoom", { roomId: room_id })
            if (response.data.success) console.log(`Successfully deleted room ${room_id}`)
        } catch (error: any) {
            console.log(error.message)
        }
    }

    const handleEditClick = (room: HotelRoom) => {
        setEditingRoom(room)
        setEditRoomIsOpen(true)
    }

    return (
        <Table>
        <TableHeader>
            <TableRow className='hover:bg-white'>
                <TableHead>Room Number</TableHead>
                <TableHead>Room Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            { rooms ? 
                <>
                <EditRoom isOpen={editRoomIsOpen} setIsOpen={setEditRoomIsOpen} roomTypes={roomTypes!!} roomDetails={editingRoom} updateHotel={updateHotel} />
                {rooms.map((room, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium">{room.room_number}</TableCell>
                        <TableCell>{room.room_type.name}</TableCell>
                        <TableCell>{room.occupied ? "Occupied" : "Vacant"}</TableCell>
                        <TableCell>
                            <div className='flex gap-4'>
                                <Pencil 
                                className='w-[20px] hover:cursor-pointer hover:text-stone-500 transition-all duration-200' 
                                onClick={() => {handleEditClick(room)}}
                                />

                                <AlertDialog>
                                    <AlertDialogTrigger>
                                        <Trash2
                                        className='w-[20px] hover:cursor-pointer hover:text-red-600 transition-all duration-200'
                                        />
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete this room.
                                        </AlertDialogDescription>
                                        </AlertDialogHeader>

                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction 
                                            className='bg-red-500 hover:bg-red-600'
                                            onClick={() => {handleRoomDelete(room.id)}}
                                            >Delete</AlertDialogAction>
                                        </AlertDialogFooter>

                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
                </>
            :
                <div>Loading...</div>
            }
        </TableBody>
        </Table>

    )
}

export default RoomsTable
