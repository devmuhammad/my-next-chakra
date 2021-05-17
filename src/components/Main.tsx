import { GridProps, SimpleGrid } from '@chakra-ui/react'
import React from 'react'

export const Main = (props: GridProps) => (
  <SimpleGrid 
    // templateColumns={{lg:"repeat(5, 1fr)"}}
    columns={{lg:5, sm: 3}}
    width="100%"
    maxW="65rem"
    h="80vh"
    maxH="80rem"
    px="1rem"
    mt="5rem"
    spacing={10}
    gap={10}
    {...props} />
    
);
