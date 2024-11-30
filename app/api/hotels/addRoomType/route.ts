import { hotelFormSchema } from "@/types/MyTypes";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { number, z } from "zod";

interface RequestBody {
    hotel_id: number;
    roomsData: any[]
}

export async function POST(request: NextRequest) {
    try {
        const reqBody: RequestBody = await request.json()
        
        console.log(reqBody)
        const response = await axios.post(`https://dhonveli-api.up.railway.app/room_types/`, reqBody)

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