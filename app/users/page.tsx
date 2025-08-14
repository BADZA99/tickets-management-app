import UserForm from '@/components/UserForm'
import React from 'react'
import DataTableSimple from './data-table'
import { prisma } from '@/prisma/prisma';
import { getServerSession } from 'next-auth';
import options from '../api/auth/[...nextauth]/options';

const Users = async () => {
  const session = await getServerSession(options);
  // Check if the user is authenticated and has the 'ADMIN' role
  if (!session || session.user.role !== 'ADMIN') {
    return (
      <div className="text-red-500">
        You are not authorized to view this page.
        admin access required
      </div>
    );
  }

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
