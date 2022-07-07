import axios from "axios"
import { logout } from "../store/auth/auth.slice"
import { store } from "../store/store"
const sleep = () => new Promise((resolve) => setTimeout(resolve, 500))

const http = axios.create({
  baseURL: `${process.env.NEXT_WEB_API}`,
})

// axios.interceptors.request.use((config: any) => {
//   const token = store.getState().auth?.token
//   if (token) config.headers.Authorization = `Bearer ${token}`
//   return config
// })

http.interceptors.response.use(
  async (response) => {
    await sleep()
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      store.dispatch(logout())
    }
    return Promise.reject(error)
  }
)

export const setHttpToken = (token: string | null) => {
  if (token) {
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`
  } else {
    http.defaults.headers.common["Authorization"] = ""
  }
}
export default http
