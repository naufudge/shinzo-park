import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await axios.get("https://dhonveli-api.up.railway.app/bookings/")

        return NextResponse.json({
            success: true,
            bookings: response.data,
            status: response.status
        })

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message
        })
    }
}