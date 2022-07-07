import { Box, Flex, Stat, StatLabel, StatNumber, Text } from "@chakra-ui/react"
import React, { ReactNode } from "react"
interface IProps {
  title: string
  description: string
  stat: string
  icon: ReactNode
}
function StatusCard({ title, description, stat, icon }: IProps) {
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py='5'
      shadow='lg'
      border='1px solid'
      borderColor='teal.400'
      rounded='lg'
      margin={{ base: 2, md: 4 }}
    >
      <Flex justifyContent='space-between' alignItems='center'>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight='bold' fontSize='md'>
            {title}
          </StatLabel>
          <Text
            display={{
              base: "none",
              md: "block",
            }}
            fontSize='10px'
            height='20px'
            overflow='hidden'
            whiteSpace='nowrap'
            textOverflow='ellipsis'
          >
            {description}
          </Text>
          <StatNumber fontSize='2xl' fontWeight='medium'>
            {stat}
          </StatNumber>
        </Box>
        <Box my='auto' color='gray.800' alignContent='center'>
          {icon}
        </Box>
      </Flex>
    </Stat>
  )
}

export default StatusCard
