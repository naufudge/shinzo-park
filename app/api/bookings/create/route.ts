import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { HotelRoom } from "@/types/MyTypes";

// interface RequestBody {
//     check_in_date: Date;
//     check_out_date: Date;
//     booking_date: Date;
//     numOfGuests: number;
//     total_price: number;
//     user_id: number;
//     rooms: number[]
// }

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        console.log(reqBody)

        const response = await axios.post("https://dhonveli-api.up.railway.app/bookings/", reqBody)

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