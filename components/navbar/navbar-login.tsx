import {
  Box,
  Image,
  Text,
  Flex,
  Heading,
  Button,
  IconButton,
} from "@chakra-ui/react"
import { MdMenu } from "react-icons/md"

const NavbarLogin = () => {
  return (
    <Flex
      align='center'
      justify='space-between'
      width='100%'
      boxShadow='base'
      height='65px'
      padding='15px'
      position='fixed'
      zIndex='3'
      bg='white'
    >
      <Flex align='center'>
        <Image src='/images/logo.png' height='50px' width='50px' alt='logo' />
        <Heading marginLeft='5px' fontSize='20px' color='teal.600'>
          ADMIN
          <Text as='span' color='gray'>
            SYSTEM
          </Text>
        </Heading>
      </Flex>
    </Flex>
  )
}

export default NavbarLogin
