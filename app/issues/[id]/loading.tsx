import { Box, Card, Flex } from '@radix-ui/themes'
import React from 'react'
import {Skeleton} from '@/components/index'

const Loadingissuedetail = () => {
  return (
    <Box className='max-w-xl'>
        <Skeleton/>
        <Flex className='space-x-3 my-3' >
        <Skeleton width='5rem'/>
        <Skeleton width='8rem'/>

        <p className='italic'><Skeleton/></p>
        </Flex>
        <Card className='prose' mt='4'>
        
        <Skeleton count={3}/>
        </Card>
        </Box>
  )
}

export default Loadingissuedetail