import Link from 'next/link'
import React from 'react'

const MainNav = () => {
  return (
    <div className="fleex justify-between">
      <div className="">
        <Link href="/" className="text-2xl font-bold">
          dashboard
        </Link>
        <Link href="/tickets" className="text-2xl font-bold">
          Tickets
        </Link>
        <Link href="/users" className="text-2xl font-bold">
          Users
        </Link>
        <div className="flex items-center gap-2">
          <Link href="/" className="text-2xl font-bold">
            Logout
          </Link>
          <Link href="/auth/register" className="text-2xl font-bold">
            Dark
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MainNav
