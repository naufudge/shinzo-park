import { JwtPayload } from "jsonwebtoken"
import { z } from "zod"

export type UserType = {
    id: number,
    username: string,
    password: string,
    email: string,
    loyalty_points: number,
    role: string
}

export type UserTokenType = {
    id: number,
    username: string,
    email: string,
    loyalty_points: number,
    role: string
}

export type TokenGetResponseType = {
    message: string,
    success: boolean,
    token: JwtPayload | null
}


export type HotelType = {
    id: number,
    name: string,
    room_count: number
}

export type HotelRoomType = {
    id: number,
    name: string,
    price: number,
    quantity: number,
    bed_count: number,
    hotel_id: number,
    hotel: HotelType
}

export type HotelRoom = {
    id: number,
    room_number: number,
    occupied: boolean,
    booking_id: number | null,
    booking: null,
    room_type_id: number
    room_type: HotelRoomType
}

export const hotelFormSchema = z.object({
    name: z.string().nullable(),
    rooms: z.array(
        z.object({
            name: z.string().min(5),
            price: z.coerce.number().gt(0).multipleOf(0.01),
            bed_count: z.coerce.number().gt(0),
            quantity: z.coerce.number().default(0)
        })
    ).nullable()
})

export const roomTypeUpdateFormSchema = z.object({
    name: z.string().min(3),
    price: z.coerce.number().gt(0).multipleOf(0.01),
    bed_count: z.coerce.number().gt(0)
})

export const roomAddingFormSchema = z.object({
    room_number: z.coerce.number().gt(0),
    occupied: z.boolean().default(false),
    room_type_id: z.string()
})

export type UserPublic = {
    id: number,
    username: string,
    email: string,
    role: string,
    loyalty_points: number,
}

export type HotelBooking = {
    id: number,
    check_in_date: string,
    check_out_date: string,
    booking_date: string,
    total_price: number,
    numOfGuests: number,
    user_id: number,
    user: UserType,
    rooms: {
        id: number,
        room_number: string,
        occupied: boolean,
        room_type_id: number,
    }[]
}

export type Activity = {
    id: number;
    name: string;
    description: string | null | undefined;
    price: number;
}

export type ActivityTicket = {
    id: number | null | undefined;
    bookingDate: string | null | undefined;
    total_price: number;
    activity_id: number;
    activity: Activity | null;
    user_id: number;
    user: UserPublic | null;
}

export type BookActivityTicket = {
    total_price: number;
    activity_id: number;
    user_id: number;
}