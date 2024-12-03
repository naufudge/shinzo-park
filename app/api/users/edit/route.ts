import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
    userName: string;
    userUpdate: {
        loyalty_points: number | null
        role: string,
    }
}

export async function POST(request: NextRequest) {
    try {
        const reqBody: RequestBody = await request.json()
        const { userName, userUpdate } = reqBody
        const response = await axios.patch(`https://dhonveli-api.up.railway.app/users/${userName}`, userUpdate)

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