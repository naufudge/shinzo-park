import { HotelType } from "@/types/MyTypes"
import axios from "axios"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const response = await axios.get("https://dhonveli-api.up.railway.app/hotels/")
        const hotelsData: HotelType[] = response.data

        return NextResponse.json({
            hotels: hotelsData,
            success: true
        })
    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
            success: false
        })
    }

}