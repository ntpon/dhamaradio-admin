import "../styles/globals.css"
import type { AppProps } from "next/app"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import Layout from "../components/layout/layout"
import { Provider } from "react-redux"
import { store } from "../store/store"
import App from "../components/App"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const theme = extendTheme({
  font: {
    body: "IBM Plex Sans Thai",
    heading: "IBM Plex Sans Thai",
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App>
          {Component.displayName === "LoginPage" ? (
            <Component {...pageProps} />
          ) : (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </App>
        <ToastContainer />
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
