'use client';
import {Skeleton } from '@/components'
import Link from 'next/link'
import classNames from 'classnames';
import React from 'react'
import { FaTicketAlt } from "react-icons/fa";
import {usePathname} from 'next/navigation';
import { useSession } from "next-auth/react";
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';

const NavBar = () => {
  const currentPath = usePathname();
  const {status, data: session} = useSession();
  const links =[
    {label:'Dashboard', href:'/'},
    {label:'Issues', href:'/issues/list'},
    {label:'About', href:'/about'}
  
  ]
    return (

  <nav className=' border-b-4 px-5 py-3 mb-5'>
    <Container>
    <Flex justify='between'>
      <Flex align={'center'} gap="3">  
         <Link href='/' > <FaTicketAlt/> </Link>
        <ul className='flex space-x-6'>
            {links.map(link => 
             <li 
             key={link.href} 
             >
            <Link 
           className={classNames({
            'text-zinc-950':link.href === currentPath,
            'text-zinc-500':link.href != currentPath,
            'hover:text-zinc-800 transition-colors': true 
           })}
           href={link.href} >
              {link.label}
            </Link>
          </li>)}      
        </ul>
      </Flex>

      <Box>
        {status === "loading" && <Skeleton width="3rem"/>}
          {status === "authenticated" && session?.user&&(
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Avatar src={session.user?.image || undefined}
                fallback="?"
                size='2'
                radius='full'
                className='cursor-pointer'
                />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Label>
                  <Text>
                    {session.user!.email!}
                  </Text>
                </DropdownMenu.Label>
                <DropdownMenu.Item>
                <Link href="/api/auth/signout">logOut</Link>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}
          {status === "unauthenticated" && (<Link href="/api/auth/signin">login</Link>)}

        </Box>
    </Flex>
    </Container>
      </nav>    
      
)
}

export default NavBar