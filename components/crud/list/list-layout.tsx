import { Flex, Box, Heading, Button, Divider } from "@chakra-ui/react"
import React from "react"
import BoxContainer from "../../container/box-container"
import Loading from "../../loading/loading"
interface IProps {
  title?: string
  isLoading?: boolean
  children: React.ReactNode
}
function ListLayout({
  title = "ตารางแสดงข้อมูล",
  children,
  isLoading = false,
}: IProps) {
  return (
    <Box padding='15px' boxShadow='md'>
      <Heading marginRight='25px' color='gray.600' fontSize='3xl'>
        {title}
      </Heading>
      <Box marginBottom='15px'>
        <Divider />
      </Box>
      {isLoading && (
        <Box padding='15px'>
          <Loading height='auto' />
        </Box>
      )}
      <Box marginTop='30px' hidden={isLoading}>
        {children}
      </Box>
    </Box>
  )
}

export default ListLayout
