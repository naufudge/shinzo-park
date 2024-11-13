import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { UserType } from "@/types/MyTypes";
import { createToken } from "@/lib/jwt";


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {username, password} = reqBody;

        const userData = await fetch(`https://dhonveli-api.up.railway.app/users/${username}`)
        const user: UserType = await userData.json()
        
        const validPassword = await bcrypt.compare(password, user.password)

        if(!validPassword) {
            console.log("Invalid Password")
            
            return NextResponse.json(
                {error: "Invalid Password"}, {status: 401}
            )
        }

        const token = createToken({
            id: user.id,
            username: user.username,
            email: user.email,
            loyalty_points: user.loyalty_points,
            role: user.role,
        })

        const response = NextResponse.json({
            message: "Login Successful!",
            success: true,
            token
        })

        response.cookies.set("token", token, {
            httpOnly: true,
            maxAge: (60 * 60 * 24),
        })

        return response;

    } catch (error: any) {
        console.log(error.message)

        return NextResponse.json({
            error: error.message,
            status: 200,
        })
    }
}