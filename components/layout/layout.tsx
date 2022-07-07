import { Box } from "@chakra-ui/react"
import { useEffect, useLayoutEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from "next/router"
import Navbar from "../navbar/navbar"
import Sidebar from "../sidebar/sidebar"
import { useAppSelector } from "../../store/store"
import Loading from "../loading/loading"
import PageLayout from "./page-layout"
interface IProps {
  children: React.ReactNode
}
const Layout = ({ children }: IProps) => {
  const router = useRouter()
  const { userId, authReady } = useAppSelector((state) => state.auth)
  const [showSidebar, setShowSidebar] = useState(false)
  useEffect(() => {
    if (authReady && !userId) {
      router.push("/")
    }
  }, [router, userId, authReady])
  if (!authReady)
    return (
      <PageLayout>
        <Loading />
      </PageLayout>
    )
  return (
    <Box>
      <Navbar setShowSidebar={setShowSidebar} />
      <Box height='calc(100vh - 65px)'>
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <Box
          marginLeft={{ base: "0px", md: "250px" }}
          minHeight='100%'
          zIndex='1'
          top='65'
          position='relative'
          paddingBottom='100px'
          padding='15px'
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}

export default Layout
