import Link from 'next/link'
import React from 'react'
import ToggleMode from './ToggleMode';

const MainNav = () => {
  return (
    <div className="flex justify-between">
      <div className="flex justify-between gap-2">
        <Link href="/" className="text-xl font-bold">
          dashboard
        </Link>
        <Link href="/tickets" className="text-xl ">
          Tickets
        </Link>
        <Link href="/users" className="text-xl ">
          Users
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Link href="/" className="text-xl font-bold">
          Logout
        </Link>
       <ToggleMode />
      </div>
    </div>
  );
}

export default MainNav
