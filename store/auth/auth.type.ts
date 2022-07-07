export interface IAuthState {
  token: string
  userId: string
  role: string
  message: string
  status: "init" | "loading" | "error" | "success"
  authReady: boolean
}
