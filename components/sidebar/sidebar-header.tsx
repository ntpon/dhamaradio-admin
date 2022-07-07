import { Box, Text } from "@chakra-ui/react"
interface IProps {
  name: string
}
const SidebarHeader = ({ name }: IProps) => {
  return (
    <Box marginLeft='5px' marginBottom='5px'>
      <Text as='span' color='teal.500' fontWeight='600'>
        {name}
      </Text>
    </Box>
  )
}

export default SidebarHeader
