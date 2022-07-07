import { Box } from "@chakra-ui/react"
import React from "react"
interface IProps {
  children: React.ReactNode
}
function BoxContainer({ children }: IProps) {
  return (
    <Box padding='15px 25px' borderRadius='md' boxShadow='md'>
      {children}
    </Box>
  )
}

export default BoxContainer
