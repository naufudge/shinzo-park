import { roomAddingFormSchema } from "@/types/MyTypes";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

interface RequestBody {
    room_id: number;
    roomData: z.infer<typeof roomAddingFormSchema>;
}

export async function POST(request: NextRequest) {
    try {
        const reqBody: RequestBody = await request.json()

        const { room_id, roomData } = reqBody
        const response = await axios.patch(`https://dhonveli-api.up.railway.app/rooms/${room_id}`, roomData)

        return NextResponse.json({
            success: true
        })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message
        })
    }
}