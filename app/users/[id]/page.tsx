import options from '@/app/api/auth/[...nextauth]/options';
import UserForm from '@/components/UserForm';
import { prisma } from '@/prisma/prisma';
import { getServerSession } from 'next-auth';
import React from 'react'

interface Props {
    params: {
        id: string;
    };
}

const EditUser =  async ({params}:Props) => {
  const session = await getServerSession(options);
  // Check if the user is authenticated and has the 'ADMIN' role
  if (!session || session.user.role !== "ADMIN") {
    return (
      <div className="text-red-500">
        You are not authorized to view this page. admin access required
      </div>
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(params.id),
    },
    // Select only the fields we need
    // select:{
    //     id: true,
    //     name: true,
    //     username: true,
    //     role: true,
    // }
  });

  if (!user) {
    return <p className="text-destructive">User not found</p>;
  }

  // pour pas envoyer le mdp au client
  user.password = "";

  return <UserForm user={user} />;
}

export default EditUser