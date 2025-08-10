import Link from 'next/link'
import React from 'react'

const MainNav = () => {
  return (
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
    </div>
  )
}

export default MainNav
