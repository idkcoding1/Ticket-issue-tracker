import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import { prisma } from '@/prisma/client'
import { Card, Flex } from '@radix-ui/themes';
import delay from 'delay';
import { notFound } from 'next/navigation';
import React from 'react'
import  ReactMarkdown from 'react-markdown'

const IssueDetailpage = async({params}:{params:{id:string}}) => {

    await delay(2000);
   
   const issue =await prisma.issue.findUnique({
        where:{
            id:Number(params.id)
        }
    });
    if(!issue)
         notFound();

    return (
    <div>
        <h1 className='text-3xl'>{issue.title}</h1>
        <Flex className='space-x-3 my-3' >
        <IssueStatusBadge status={issue.status}/>
        <p className='italic'>{issue.createdAt.toDateString()}</p>
        </Flex>
        <Card>
        <ReactMarkdown>
        {issue.description}
        </ReactMarkdown>
        </Card>
        </div>
  )
}

export default IssueDetailpage