import { TokenGetResponseType, UserPublic, UserTokenType } from "@/types/MyTypes";
import axios from "axios";
import { JwtPayload } from "jsonwebtoken";
import { Dispatch, SetStateAction } from "react";

export const formatDateString = (dateString: string | null | undefined) => {
    if (dateString) {
        const date = new Date(dateString);

        // Check if the date is valid
        if (isNaN(date.getTime())) {
            throw new Error("Invalid date string");
        }

        // Format the date in the desired format: "09 December 2024"
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        };

        return date.toLocaleDateString('en-GB', options);
    } else {
        return "";
    }
}

export const getToken = async (
    setTokenData: Dispatch<SetStateAction<JwtPayload | null>>,
    setLoggedIn: Dispatch<SetStateAction<boolean>>
) => {
    try {
        const response = await axios.get("/api/users/me")
        const responseData: TokenGetResponseType = response.data
        if (responseData.token) {
            setTokenData(responseData.token);
            setLoggedIn(true);
        }
    } catch (error: any) {
        console.log(error.message);
    }
}

export const getUsers = async (setUsers: Dispatch<SetStateAction<UserPublic[] | undefined>>,) => {
    try {
      const response = await axios.get("/api/users/all")
      if (response.data.success) setUsers(response.data.users)
    } catch (error: any) {
      console.log(error.message)
    }
  }