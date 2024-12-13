import React from 'react'
import Loading from '@/components/Loading';
import { HotelBooking } from '@/types/MyTypes'
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
import { formatDateString } from '@/lib/helpers';

interface RecentBookingProps {
    bookings: HotelBooking[] | null;
}

const RecentBookings: React.FC<RecentBookingProps> = ({ bookings }) => {
    if (bookings?.length === 0) {
        return <Loading className='w-1/2 h-1/2' />
    }
    if (bookings === null) {
        return(
            <div className='italic text-gray-400'>No bookings yet.</div>
        )
    }

    const returnRooms = (rooms: HotelBooking["rooms"]) => {
        const result: string[] = []
        rooms.filter((room) => result.push(room.room_number))
        return result.join(", ")
    }
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Booking No.</TableHead>
                    <TableHead>Room(s)</TableHead>
                    <TableHead>Check-in</TableHead>
                    <TableHead>Check-out</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {bookings.map((booking, index) => (
                    <TableRow key={index}>
                        <TableCell>{booking.id}</TableCell>
                        <TableCell>{returnRooms(booking.rooms)}</TableCell>
                        <TableCell>{formatDateString(booking.check_in_date)}</TableCell>
                        <TableCell>{formatDateString(booking.check_out_date)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default RecentBookings
