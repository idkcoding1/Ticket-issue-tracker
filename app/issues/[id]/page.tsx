import { prisma } from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import React from 'react'

import Issuedetail from './Issuedetail';
import DeleteIssuebutton from './DeleteIssuebutton';
import { getServerSession } from 'next-auth';
import authoptions from '@/app/auth/Authoptions';
import Editissuebutton from './edit/Editissuebutton';


export type paramsType = Promise<{ id: string }>;

const IssueDetailPage = async (props:{ params:paramsType}) => {
   const session= await getServerSession(authoptions);
   
    const { id } = await props.params;
  const issueid = Number(id);
    
   

    if (isNaN(issueid)) {
        notFound();
    }

    const issue = await prisma.issue.findUnique({
        where: { id: issueid }
    });

    if (!issue) {
        notFound();
    }

    return (
        <Grid columns={{initial:"1", md:"5"}} gap='4' >
            <Box className='col-span-4 md:col-span-4'>
                <Issuedetail issue={issue}/>
            </Box>
            {session && (   <Box>
            <Flex direction='column' gap='3'>

                    <Editissuebutton issueId={issue.id}/>  
                    <DeleteIssuebutton issueId={issue.id}/>
            
            </Flex>
            </Box>)}
    
        </Grid>
    );
};

export default IssueDetailPage;