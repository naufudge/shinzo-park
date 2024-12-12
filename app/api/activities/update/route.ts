import { NextRequest, NextResponse } from "next/server";
import { Activity } from "@/types/MyTypes";
import axios from "axios";

interface RequestBody {
    activity_id: number;
    activityData: Activity;
}

export async function POST(request: NextRequest) {
    try {
        const reqBody: RequestBody = await request.json()

        const { activity_id, activityData } = reqBody
        const response = await axios.patch(`https://dhonveli-api.up.railway.app/activities/${activity_id}`, activityData)

        return NextResponse.json({
            success: true,
            response: response.data
        })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message
        })
    }
}