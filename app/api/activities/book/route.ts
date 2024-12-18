import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { ActivityTicket, BookActivityTicket } from "@/types/MyTypes";


export async function POST(request: NextRequest) {
    try {
        const reqBody: BookActivityTicket[] = await request.json()
        console.log(reqBody)

        const response = await axios.post("https://dhonveli-api.up.railway.app/activity_ticket/", reqBody)

        return NextResponse.json({
            success: true,
            message: response.data
        })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message
        })
    }
}