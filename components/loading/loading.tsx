import { Box, Flex, Heading, Spinner, Text } from "@chakra-ui/react"

interface IProps {
  title?: string
  height?: string
}
const Loading = ({
  title = "กำลังโหลดข้อมูล...",
  height = "calc(100vh - 50px)",
}: IProps) => {
  return (
    <Box justifyContent='center' alignItems='center' height={height}>
      <Flex justifyContent='center' alignItems='center' height='100%'>
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
        <Heading marginLeft='15px' fontWeight='500'>
          {title}
        </Heading>
      </Flex>
    </Box>
  )
}

export default Loading
