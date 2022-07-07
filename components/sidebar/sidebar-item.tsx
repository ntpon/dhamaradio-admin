import {
  Center,
  Flex,
  LinkBox,
  LinkOverlay,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"

interface IProps {
  name: string
  icon: any
  route: string
  end?: boolean
}

const SidebarItem = ({ name, route, icon, end = false }: IProps) => {
  const router = useRouter()
  const currentRoute = router.pathname
  const checkIsCurrentRoute = () => {
    if (end) {
      return route === currentRoute
    } else {
      return route !== "/" && currentRoute.includes(route)
    }
  }

  // const handleNavLink = () => {
  //   router.push(route)
  // }

  return (
    <ListItem
      key={name}
      marginBottom='5px'
      borderLeft={
        checkIsCurrentRoute() ? "5px solid teal" : "5px solid transparent"
      }
      bg={checkIsCurrentRoute() ? "gray.100" : ""}
      paddingY='7px'
      color={checkIsCurrentRoute() ? "black" : "gray.600"}
    >
      <LinkBox as={Link} href={route}>
        <Flex display='flex' alignItems='center' cursor='pointer'>
          <ListIcon
            as={icon}
            marginX='10px'
            fontSize='2xl'
            bg='teal'
            borderRadius='2xl'
            color='white'
            padding='5px'
          />
          <Text as='span' fontSize='16px'>
            {name}
          </Text>
        </Flex>
      </LinkBox>
    </ListItem>
  )
}

export default SidebarItem
