import { NextResponse } from "next/server"

export async function GET() {
    try {
        const response = NextResponse.json({
            message: "Logout Successful!",
            success: true
        })
        response.cookies.set("token", "")
        return response
        
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({
            message: error.message,
            success: false
        })
    }
}