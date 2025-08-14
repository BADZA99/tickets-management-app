import Link from 'next/link'
import React from 'react'
import ToggleMode from './ToggleMode';
import MainNavLinks from './MainNav-links';
import { getServerSession } from 'next-auth';
import options from '@/app/api/auth/[...nextauth]/options';

const MainNav = async  () => {
  const session = await getServerSession(options);

  console.log(session)

  return (
    <div className="flex justify-between">
      <MainNavLinks />
      <div className="flex items-center gap-2">
     
        {session?.user ? (
          <Link href="/api/auth/signout?callbackUrl=/" className="cursor-pointer">
          logout
          </Link>
        ) : (
          <Link href="/api/auth/signin" className="cursor-pointer">
            Login
          </Link>
        )}
      
       <ToggleMode />
      </div>
    </div>
  );
}

export default MainNav
