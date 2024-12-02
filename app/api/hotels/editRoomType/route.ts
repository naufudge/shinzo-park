import { hotelFormSchema } from "@/types/MyTypes";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { number, z } from "zod";

interface RequestBody {
    room_type_id: number;
    roomTypeDetails: any
}

export async function POST(request: NextRequest) {
    try {
        const reqBody: RequestBody = await request.json()
        const { room_type_id, roomTypeDetails } = reqBody

        const response = await axios.patch(`https://dhonveli-api.up.railway.app/room_types/${room_type_id}`, roomTypeDetails)

        return NextResponse.json({
            success: true
        })
    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
            success: false
        })
    }
}