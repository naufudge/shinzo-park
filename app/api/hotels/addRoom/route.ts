import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()

        const response = await axios.post("https://dhonveli-api.up.railway.app/rooms/", reqBody)

        return NextResponse.json({
            success: true,

        })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message
        })
    }
}