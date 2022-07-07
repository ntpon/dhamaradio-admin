import { Box, Divider, Heading } from "@chakra-ui/react"
import React from "react"
interface IProps {
  children: React.ReactNode
  title: string
}
function FormLayout({ children, title }: IProps) {
  return (
    <Box>
      <Heading marginRight='25px' color='gray.600' fontSize='3xl'>
        {title}
      </Heading>
      <Box marginBottom='15px'>
        <Divider />
      </Box>
      {children}
    </Box>
  )
}

export default FormLayout
