import { link } from 'fs';
import Link from 'next/link'
import React from 'react'
import { FaTicketAlt } from "react-icons/fa";

const NavBar = () => {
  const links =[
    {label:'Dashboard', href:'/'},
    {label:'issues', href:'/issues'}
  ]
    return (

    <nav className='flex space-x-6 border-b-4 px-5 h-14 items-center mb-5'>
        <Link href='/'> <FaTicketAlt/> </Link>
        <ul className='flex space-x-6'>
            {links.map(link =><Link key={link.href} href={link.href} className='text-zinc-500 hover:text-zinc-800 transition-colors'>{link.label}</Link>)}
            <li></li>
            <li><Link href='/issues' className='text-zinc-500 hover:text-zinc-800'>Issues</Link></li>
        </ul>
    </nav>    
)
}

export default NavBar