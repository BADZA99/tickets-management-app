"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";



const MainNavLinks = ({ role }:{role?:string}) => {
  const Links = [
    { href: "/", label: "dashboard",adminOnly:false },
    { href: "/tickets", label: "Tickets",adminOnly:false },
    { href: "/users", label: "Users",adminOnly:true },
  ];

  const currentPath = usePathname();
  return (
    <div className="flex items-center gap-2">
      {Links.filter((link)=>!link.adminOnly 
      || role ==='ADMIN').map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={` cursor-pointer ${
            currentPath === link.href ? "cursor-default text-primary/60 " : ""
          }`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default MainNavLinks
