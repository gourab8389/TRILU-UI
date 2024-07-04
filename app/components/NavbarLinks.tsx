"use client"
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export const navbarLinks = [
    {
        id:0 ,
        name: 'Home',
        herf: '/'
    },
    {
        id:1 ,
        name: 'Templates',
        herf: '#'
    },
    {
        id:2,
        name: 'Ui Kits',
        herf: '#'
    },
    {
        id:3,
        name: 'Icons',
        herf: '#'
    }
]

function NavbarLinks() {
    const location = usePathname();
  return (
    <div className='hidden md:flex justify-center items-center col-span-6 gap-x-2
     '>
      {navbarLinks.map((item)=>(
        <Link href={item.herf} key={item.id} className={cn(
            location ===item.herf ? "bg-muted" : "group flex items-center px-2 py-2 font-medium rounded-md"
        )}>
            {item.name}
        </Link>
      ))}
    </div>
  )
}

export default NavbarLinks
