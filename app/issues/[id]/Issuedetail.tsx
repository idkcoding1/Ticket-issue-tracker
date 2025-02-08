import { IssueStatusBadge } from '@/app/components'
import { Flex, Card } from '@radix-ui/themes'
import React from 'react'
import ReactMarkdown from 'react-markdown'

import { Issue } from '@prisma/client'

const Issuedetail = ({issue}:{issue:Issue}) => {
  return (
    <>
         <h1 className="text-3xl">{issue.title}</h1>
            <Flex className="space-x-3 my-3">
                <IssueStatusBadge status={issue.status} />
                <p className="italic">{issue.createdAt.toDateString()}</p>
            </Flex>
            <Card className='prose max-w-full' mt="4">
                <ReactMarkdown>{issue.description}</ReactMarkdown>
            </Card>
        </>
  )
}

export default Issuedetail