import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await axios.get("https://dhonveli-api.up.railway.app/room_types")
        return NextResponse.json({
            success: true,
            roomTypes: response.data
        })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message
        })
    }
}