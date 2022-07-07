import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { checkTokenIsExpired, setAuthReady } from "../store/auth/auth.slice"
import { useAppDispatch } from "../store/store"
interface IProps {
  children: any
}
const App = ({ children }: IProps) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      dispatch(checkTokenIsExpired(token))
    } else {
      dispatch(setAuthReady(true))
    }
  }, [])
  return children
}

export default App
