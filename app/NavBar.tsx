'use client';
import Link from 'next/link'
import classNames from 'classnames';
import React from 'react'
import { FaTicketAlt } from "react-icons/fa";
import {usePathname} from 'next/navigation';

const NavBar = () => {
  const currentPath = usePathname();
  console.log(currentPath);
  const links =[
    {label:'Dashboard', href:'/'},
    {label:'Issues', href:'/issues/list'},
    {label:'About', href:'/about'}
  
  ]
    return (

  <nav className='flex space-x-6 border-b-4 px-5 h-14 items-center mb-5'>
        <Link href='/' > <FaTicketAlt/> </Link>
        <ul className='flex space-x-6 ' >
            {links.map(link => 
            <Link 
            key={link.href} 
            
            // className={`${link.href === currentPath ? 'text-zinc-950':  'text-zinc-500'} hover:text-zinc-800 transition-colors`}
           className={classNames({
            'text-zinc-950':link.href === currentPath,
            'text-zinc-500':link.href != currentPath,
            'hover:text-zinc-800 transition-colors': true 
           })}
           href={link.href} >
              {link.label}
            
            </Link>)}
          
        </ul>
    </nav>    
)
}

export default NavBar