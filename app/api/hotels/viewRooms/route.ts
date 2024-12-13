import { HotelRoomType, HotelType } from "@/types/MyTypes";
import axios from "axios";
import { NextResponse } from "next/server";

type RoomData = {
    id: number,
    room_number: number,
    occupied: boolean,
    room_type_id: number
}

type NewRoomData = {
    id: number,
    room_number: number,
    occupied: boolean,
    room_type_id: number,
    room_type: HotelRoomType | null | undefined
    hotel: HotelType | null | undefined
}

export async function GET() {
    try {
        const response = await axios.get("https://dhonveli-api.up.railway.app/rooms/")
        const roomsData: RoomData[] = response.data

        const roomTypesResponse = await axios.get("https://dhonveli-api.up.railway.app/room_types/")
        const roomTypes: HotelRoomType[] = roomTypesResponse.data

        const rooms: NewRoomData[] = []
        roomsData.filter((room) => {
            let newRoomData: NewRoomData = {
                id: room.id,
                room_number: room.room_number,
                occupied: room.occupied,
                room_type_id: room.room_type_id,
                room_type: null,
                hotel: null
            }
            roomTypes.filter((roomType) => {
                if (roomType.id === room.room_type_id) {
                    newRoomData.room_type = roomType
                    newRoomData.hotel = roomType.hotel
                    rooms.push(newRoomData)
                }
            })
        })

        return NextResponse.json({
            success: true,
            rooms
        })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message
        })
    }
}