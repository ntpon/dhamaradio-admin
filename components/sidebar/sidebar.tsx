import {
  Box,
  List,
  Divider,
  Image,
  Heading,
  Text,
  IconButton,
} from "@chakra-ui/react"
import {
  MdHome,
  MdAccountBox,
  MdQueueMusic,
  MdClose,
  MdMessage,
  MdPersonSearch,
  MdGroups,
  MdRadio,
} from "react-icons/md"
import SidebarItem from "./sidebar-item"
import SidebarHeader from "./sidebar-header"
import { useRouter } from "next/router"
import { useEffect } from "react"

const navMenu = [
  {
    name: "Dashboard",
    icon: MdHome,
    route: "/dashboard",
  },
  {
    name: "บทบาท",
    icon: MdGroups,
    route: "/role",
  },
  {
    name: "สมาชิก",
    icon: MdPersonSearch,
    route: "/member",
  },
  {
    name: "ข้อความ",
    icon: MdMessage,
    route: "/contact",
  },
]

const albumMenu = [
  {
    name: "พระอาจารย์",
    icon: MdAccountBox,
    route: "/priest",
  },
  {
    name: "ชุดเสียง",
    icon: MdRadio,
    route: "/album",
  },
  {
    name: "เสียง",
    icon: MdQueueMusic,
    route: "/audio",
  },
]

interface IProps {
  showSidebar: boolean
  setShowSidebar: (showSidebar: boolean) => void
}
const Sidebar = ({ showSidebar, setShowSidebar }: IProps) => {
  const router = useRouter()

  useEffect(() => {
    if (showSidebar) {
      setShowSidebar(false)
    }
  }, [router.asPath])
  return (
    <>
      <Box
        height='100%'
        position='fixed'
        top={{ base: "0", md: "65px" }}
        width='250px'
        bg='white'
        boxShadow='base'
        zIndex={{ base: "4", md: "2" }}
        transform={{
          base: showSidebar ? "translateX(0)" : "translateX(-250px)",
          md: "translateX(0)",
        }}
        transition='all 200ms ease-in-out;'
        borderRight={{ base: "2px solid teal", md: "none" }}
      >
        <Box
          display={{ base: "flex", md: "none" }}
          flexDirection='column'
          alignItems='center'
          marginTop='15px'
          position='relative'
        >
          <Box position='absolute' left='10px'>
            <IconButton
              aria-label='close'
              bg='transparent'
              fontSize='28px'
              onClick={() => setShowSidebar(false)}
            >
              <MdClose />
            </IconButton>
          </Box>
          <Image src='/images/logo.png' height='80px' width='80px' alt='logo' />
          <Heading marginTop='15px' fontSize='20px' color='teal.600'>
            ADMIN
            <Text as='span' color='gray'>
              SYSTEM
            </Text>
          </Heading>
        </Box>
        <List marginTop='15px'>
          <SidebarHeader name='เมนูหลัก' />
          {navMenu.map((nav) => (
            <SidebarItem {...nav} key={nav.route} end={nav.route === "/"} />
          ))}
        </List>
        <Divider />
        <List marginTop='15px'>
          <SidebarHeader name='รายการเสียง' />
          {albumMenu.map((nav) => (
            <SidebarItem {...nav} key={nav.route} end={nav.route === "/"} />
          ))}
        </List>
      </Box>
    </>
  )
}

export default Sidebar
