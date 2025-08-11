"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";



const MainNavLinks = () => {
    const Links = [
        { href: "/", label: "dashboard" },
        { href: "/tickets", label: "Tickets" },
        { href: "/users", label: "Users" },
    ];

    const currentPath= usePathname();
  return (
    <div className="flex items-center gap-2">
      {Links.map((link) => (
        <Link key={link.href} href={link.href} className={` cursor-pointer ${currentPath === link.href ? 'cursor-default text-primary/60 ' : ''}`}>
          {link.label}
        </Link>
      ))}
    </div>
  );
}

export default MainNavLinks
