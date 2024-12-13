'use client';

import { UserPublic } from '@/types/MyTypes';
import React, { Dispatch, SetStateAction, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { getUsers } from '@/lib/helpers';


interface EditUser {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    userDetails: UserPublic | null | undefined;
    setUsers: Dispatch<SetStateAction<UserPublic[] | undefined>>;
}

const EditUser: React.FC<EditUser> = ({ isOpen, setIsOpen, userDetails, setUsers }) => {
    const [selectedRole, setSelectedRole] = useState("")

    const handleSubmit = async () => {
        try {
            const userUpdate = {
                role: selectedRole,
                loyalty_points: null
            }
            const data = {
                userName: userDetails?.username!!,
                userUpdate
            }
            const response = await axios.post("/api/users/edit", data)
            if (response.data.success) {
                console.log("Successfully updated user!")
                getUsers(setUsers)
            }
        } catch (error: any) {
            console.log(error.message)
        } finally { setIsOpen(false) }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className='font-poppins'>
                <DialogHeader className='mb-3'>
                    <DialogTitle>Edit User Role</DialogTitle>
                    <DialogDescription>Change the user role by selecting one below.</DialogDescription>
                </DialogHeader>
                {userDetails &&
                    <>
                        <Label htmlFor='userRole'>Select a role below</Label>
                        <Select onValueChange={(e) => setSelectedRole(e)} defaultValue={userDetails.role}>
                            <SelectTrigger id='userRole' className="w-full">
                                <SelectValue placeholder="User Role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="manager">Island Manager</SelectItem>
                                <SelectItem value="hotel">Hotel Staff</SelectItem>
                                <SelectItem value="waterpark">Water Park Staff</SelectItem>
                                <SelectItem value="arcade">Arcade Staff</SelectItem>
                                <SelectItem value="cinema">Cinema Staff</SelectItem>
                                <SelectItem value="normal">Normal User</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button 
                        onClick={handleSubmit}
                        disabled={userDetails.role === selectedRole}
                        >Edit User</Button>
                    </>
                }
            </DialogContent>
        </Dialog>
    )
}

export default EditUser
