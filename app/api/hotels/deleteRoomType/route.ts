import axios from "axios";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { roomTypeId }: { roomTypeId: number } = reqBody
        const response = await axios.delete(`https://dhonveli-api.up.railway.app/room_types/${roomTypeId}`)

        return NextResponse.json({
            success: true,
            data: response.data
        })

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message
        })
    }
}