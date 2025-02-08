import { prisma } from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import React from 'react'
import Editissuebutton from '../edit/Editissuebutton';
import Issuedetail from './Issuedetail';
import DeleteIssuebutton from './DeleteIssuebutton';


export type paramsType = Promise<{ id: string }>;

const IssueDetailPage = async (props:{ params:paramsType}) => {
   
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
            <Box>
            <Flex direction='column' gap='3'>

                    <Editissuebutton issueId={issue.id}/>  
                    <DeleteIssuebutton issueId={issue.id}/>
            
            </Flex>
            </Box>
    
        </Grid>
    );
};

export default IssueDetailPage;