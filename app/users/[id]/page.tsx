import UserForm from '@/components/UserForm';
import { prisma } from '@/prisma/prisma';
import React from 'react'

interface Props {
    params: {
        id: string;
    };
}

const EditUser =  async ({params}:Props) => {

    const user= await prisma.user.findUnique({
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
        return <p className='text-destructive'>User not found</p>;
    }

    // pour pas envoyer le mdp au client
    user.password=""; 

  return (
    <UserForm user={user}/>
  )
}

export default EditUser