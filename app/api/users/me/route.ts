import { getDataFromToken } from "@/lib/jwt"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value || ""

        if (!token) {
            return NextResponse.json({
                message: "User is not logged in",
                success: false,
                token
            })
        }
        const tokenData = await getDataFromToken(token)

        console.log(tokenData)

        const response = NextResponse.json({
            message: "Token Verified Successfully!",
            success: true,
            token: tokenData
        })

        return response;

    } catch (error: any) {
        console.log(error.message)
        const response = NextResponse.json({
            message: "Unable to verify token.",
            success: false,
            token: ""
        })
        return response;
    }
}