import { Box, Text } from "@chakra-ui/react"
import React from "react"
interface IProps {
  title?: string
}
function Empty({ title = "ไม่มีรายการ" }: IProps) {
  return (
    <Box paddingTop='15px'>
      <Text fontSize='24px' textAlign='center'>
        {title}
      </Text>
    </Box>
  )
}

export default Empty
