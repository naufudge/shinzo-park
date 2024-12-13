'use client';

import { UserPublic } from '@/types/MyTypes';
import axios from 'axios';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Users } from 'lucide-react';
import EditUser from './UsersComponent/EditUser';
import Loading from '../Loading';
import { getUsers } from '@/lib/helpers';


interface UsersSectionProps {
  users: UserPublic[] | undefined;
  setUsers: Dispatch<SetStateAction<UserPublic[] | undefined>>;

}

function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

const UsersSection: React.FC<UsersSectionProps> = ({ users, setUsers }) => {
  // const [users, setUsers] = useState<UserPublic[]>()
  const [editUserIsOpen, setEditUserIsOpen] = useState<boolean>(false)
  const [editingUser, setEditingUser] = useState<UserPublic>()


  const handleEditClick = (user: UserPublic) => {
    setEditingUser(user)
    setEditUserIsOpen(true)
  }

  return (
    <div>
      <h1 className='dashboard-main-title flex gap-4 place-items-center'><Users />Users</h1>
      <div>View and manage the users on DhonVeli!</div>
      <br />
      { !users ?
       <Loading />
      :  
        <Table>
          <TableHeader>
            <TableRow className='font-bold'>
              <TableHead className='w-1/4'>Username</TableHead>
              <TableHead className='w-1/4'>Email</TableHead>
              <TableHead className='w-1/4'>Role</TableHead>
              <TableHead className='w-1/4'>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            { users && 
              <>
              <EditUser isOpen={editUserIsOpen} setIsOpen={setEditUserIsOpen} userDetails={editingUser} setUsers={setUsers} />
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
      }
    </div>
  )
}

export default UsersSection
