import UserForm from '@/components/UserForm'
import React from 'react'
import DataTableSimple from './data-table'
import { prisma } from '@/prisma/prisma';

const Users = async () => {
  const users = await prisma.user.findMany();
  return (
    <div>
      <UserForm/>
      <DataTableSimple
        users={users}
      />
    </div>
  )
}

export default Users
