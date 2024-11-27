import { JwtPayload } from "jsonwebtoken"

export type UserType = {
    id: number,
    username: string,
    password: string,
    email: string,
    loyalty_points: number,
    role: string
}

export type UserTokenType = {
    id: number,
    username: string,
    email: string,
    loyalty_points: number,
    role: string
}

export type TokenGetResponseType = {
    message: string,
    success: boolean,
    token: JwtPayload | null
}