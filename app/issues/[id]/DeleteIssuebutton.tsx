'use client';
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import React from 'react'
 
 const DeleteIssuebutton = ({issueId}:{issueId:number}) => {
   return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
            <Button color='red' className='mt-2'>Delete Issue</Button>
            </AlertDialog.Trigger> 
            <AlertDialog.Content>
                <AlertDialog.Title>
                    Confirm Deletion
                </AlertDialog.Title>
                <AlertDialog.Description>
                    Are you sure you want to remove all the memories from childhood?        
                </AlertDialog.Description>
               <Flex className='mt-2 ' gap='3'>
                <AlertDialog.Cancel>
                    <Button  variant='soft'  color='gray'> Cancel</Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                <Button color='red'>Delete Issue</Button>
                </AlertDialog.Action>
               </Flex>
        
            </AlertDialog.Content>
        </AlertDialog.Root>
   )
 }
 
 export default DeleteIssuebutton