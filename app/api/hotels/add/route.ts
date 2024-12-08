import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { z } from "zod";
import { hotelFormSchema } from "@/types/MyTypes";

interface RequestBody {
    name: string
}

export async function POST(request: NextRequest) {
    try {
        const reqBody: RequestBody = await request.json()
        const { name } = reqBody

        const data = {
            name: name,
            rooms: null
        }
        const response = await axios.post("https://dhonveli-api.up.railway.app/hotels/", data)
        
        return NextResponse.json({
            response,
            success: true
        })
    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
            success: false
        })
    }
}