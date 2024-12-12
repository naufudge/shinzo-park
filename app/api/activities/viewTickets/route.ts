import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await axios.get("https://dhonveli-api.up.railway.app/activity_ticket/")

        return NextResponse.json({
            success: true,
            tickets: response.data
        })

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message
        })
    }
}