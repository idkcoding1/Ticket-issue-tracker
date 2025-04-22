'use client';
import { AlertDialog, Button, Flex, Spinner } from '@radix-ui/themes'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
 
 const DeleteIssuebutton = ({issueId}:{issueId:number}) => {
    const router = useRouter();
    const[error, setError] =   useState(false);
   const[isdeleting, setdeleting]= useState(false);

    const deleteissue = async()=>{
        try {
            setdeleting(true);
          await axios.delete('/api/issues/'+issueId);
          router.push('/issues/list');
          router.refresh();
        } catch (error) {
            setdeleting(false);
              setError(true)
        }
        }
    return (
        <>
        <AlertDialog.Root>
            <AlertDialog.Trigger>
            <Button color='red' disabled={isdeleting} className='mt-2'>
                Delete Issue
                {isdeleting && <Spinner/>}
                </Button>
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
                <Button color='red' onClick={deleteissue}>Delete Issue</Button>
                </AlertDialog.Action>
               </Flex>
        
            </AlertDialog.Content>
        </AlertDialog.Root>
        <AlertDialog.Root open={error}>
            <AlertDialog.Content>
        
            <AlertDialog.Title>
                Error
            </AlertDialog.Title>
            <AlertDialog.Description>
                  Thiss Issue could not be deleted
            </AlertDialog.Description>        
                <Button color='gray' variant='soft' className='mt-3' onClick={()=> setError(false)}> ok</Button>
        
            </AlertDialog.Content>        
        </AlertDialog.Root>
        </>
   )
 }
 
 export default DeleteIssuebutton