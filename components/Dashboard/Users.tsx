'use client';

import { UserPublic } from '@/types/MyTypes';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, User, Users } from 'lucide-react';
import EditUser from './UsersComponent/EditUser';

function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

const UsersSection = () => {
  const [users, setUsers] = useState<UserPublic[]>()
  const [editUserIsOpen, setEditUserIsOpen] = useState<boolean>(false)
  const [editingUser, setEditingUser] = useState<UserPublic>()

  async function getUsers() {
    try {
      const response = await axios.get("/api/users/all")
      if (response.data.success) setUsers(response.data.users)
    } catch (error: any) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    if (!users) getUsers()
  }, [users])

  const handleEditClick = (user: UserPublic) => {
    setEditingUser(user)
    setEditUserIsOpen(true)
  }

  return (
    <div>
      <h1 className='dashboard-main-title flex gap-4 place-items-center'><Users />Users</h1>
      <div>View and manage the users on DhonVeli!</div>
      <br />
      <Table>
        <TableHeader>
          <TableRow className='font-bold'>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          { users && 
            <>
            <EditUser isOpen={editUserIsOpen} setIsOpen={setEditUserIsOpen} userDetails={editingUser} />
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{capitalizeFirstLetter(user.role)}</TableCell>
                <TableCell>
                  <Edit 
                  className='hover:cursor-pointer hover:text-stone-500 transition-all duration-200'
                  onClick={() => handleEditClick(user)}
                  />
                </TableCell>
              </TableRow>
            ))}
            </>
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default UsersSection
