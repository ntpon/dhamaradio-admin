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
import { FormEvent, useState } from "react"
import { useRouter } from "next/router"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { logout } from "../../store/auth/auth.slice"

interface IProps {
  setShowSidebar: (showSidebar: any) => void
}

const Navbar = ({ setShowSidebar }: IProps) => {
  const dispatch = useAppDispatch()
  const [search, setSearch] = useState("")
  const { userId, authReady } = useAppSelector((state) => state.auth)
  const router = useRouter()
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (search) {
      router.push("/album/search?q=" + search)
      setSearch("")
    }
  }
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
        <Box display={{ md: "none" }}>
          <IconButton
            aria-label='menu'
            bg='transparent'
            fontSize='24px'
            onClick={() =>
              setShowSidebar((showSidebar: boolean) => !showSidebar)
            }
          >
            <MdMenu />
          </IconButton>
        </Box>
        <Image
          src='/images/logo.png'
          height='50px'
          width='50px'
          alt='logo'
          display={{ base: "none", md: "block" }}
        />
        <Heading
          marginLeft='5px'
          fontSize='20px'
          color='teal.600'
          display={{ base: "none", md: "block" }}
        >
          ADMIN
          <Text as='span' color='gray'>
            SYSTEM
          </Text>
        </Heading>
      </Flex>
      <Flex>
        {userId && authReady && (
          <Button
            colorScheme='teal'
            variant='solid'
            onClick={() => {
              dispatch(logout())
            }}
          >
            ออกจากระบบ
          </Button>
        )}
      </Flex>
    </Flex>
  )
}

export default Navbar
