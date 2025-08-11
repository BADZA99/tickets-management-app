import Link from 'next/link'
import React from 'react'
import ToggleMode from './ToggleMode';
import MainNavLinks from './MainNav-links';

const MainNav = () => {
  return (
    <div className="flex justify-between">
      <MainNavLinks />
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
