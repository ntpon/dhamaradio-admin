import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react"
import PageLayout from "../components/layout/page-layout"
import { useAppDispatch, useAppSelector } from "../store/store"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { login, resetMessage } from "../store/auth/auth.slice"
import Navbar from "../components/navbar/navbar"
import NavbarLogin from "../components/navbar/navbar-login"
import Loading from "../components/loading/loading"
import { toast } from "react-toastify"
const LoginPage = () => {
  const dispatch = useAppDispatch()
  const { userId, authReady, status, message } = useAppSelector(
    (state) => state.auth
  )
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("v@admin.com")
  const [password, setPassword] = useState("v@admin")
  const [isLoadingPage, setIsLoadingPage] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (authReady) {
      if (userId) {
        router.push("/dashboard")
      } else {
        setIsLoadingPage(false)
      }
    }
  }, [userId, authReady, router])

  useEffect(() => {
    if (status === "error") {
      toast.error(message)
      dispatch(resetMessage())
    } else if (status === "success") {
      toast.success(message)
      dispatch(resetMessage())
    }
  }, [status, message, dispatch])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      await dispatch(login({ email, password }))
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <PageLayout titleText='Login'>
      {isLoadingPage ? (
        <Loading />
      ) : (
        <>
          <NavbarLogin />
          <Flex
            width='100vw'
            height='100vh'
            justifyContent='center'
            alignItems='center'
            bg='gray.50'
          >
            <Box
              bg='white'
              width={{ base: "100%", md: "360px" }}
              padding='15px'
              margin='15px'
              boxShadow='md'
              borderRadius='md'
            >
              <form onSubmit={handleSubmit}>
                <Box padding='20px'>
                  <Flex justifyContent='center'>
                    <Heading as='h2' fontSize='30px' color='gray.600'>
                      เข้าสู่ระบบ
                    </Heading>
                  </Flex>
                  <Divider marginTop='10px' marginBottom='15px' />

                  <Box pb={6}>
                    <FormControl>
                      <FormLabel>อีเมล</FormLabel>
                      <Input
                        placeholder='เพิ่มอีเมล'
                        type='email'
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setEmail(e.target.value)
                        }
                        value={email}
                        required
                      />
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>รหัสผ่าน</FormLabel>
                      <InputGroup size='md'>
                        <Input
                          pr='4.5rem'
                          type={showPassword ? "text" : "password"}
                          placeholder='เพิ่มรหัสผ่าน'
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setPassword(e.target.value)
                          }
                          value={password}
                          required
                        />
                        <InputRightElement width='4.5rem'>
                          <Button
                            h='1.75rem'
                            size='sm'
                            onClick={() => {
                              setShowPassword((prev) => !prev)
                            }}
                          >
                            {showPassword ? "Hide" : "Show"}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                  </Box>
                  <Divider marginBottom='15px' />
                  <Box justifyContent='center' flexDirection='column'>
                    <Button
                      width='100%'
                      colorScheme='facebook'
                      type='submit'
                      isLoading={isLoading}
                    >
                      เข้าสู่ระบบ
                    </Button>
                  </Box>
                </Box>
              </form>
            </Box>
          </Flex>
        </>
      )}
    </PageLayout>
  )
}
LoginPage.displayName = "LoginPage"

export default LoginPage
