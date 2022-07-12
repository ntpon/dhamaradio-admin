import { Box, Flex, Heading } from "@chakra-ui/react"
import React from "react"
interface IProps {
  title?: string
  children: React.ReactNode
}
function FilterLayout({ title, children }: IProps) {
  return (
    <Flex
      boxShadow='md'
      padding='15px'
      marginBottom='25px'
      alignItems='center'
      minHeight='100px'
      flexDirection={{ base: "column", md: "row" }}
      width={{ base: "100%", md: "auto" }}
    >
      <Heading marginRight='25px' color='gray.600' fontSize='3xl'>
        {title}
      </Heading>
      {children}
    </Flex>
  )
}

export default FilterLayout
