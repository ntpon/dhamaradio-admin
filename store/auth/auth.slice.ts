import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import api from "../../utils/api"
import { setHttpToken } from "../../utils/http"
import { IAuthState } from "./auth.type"

const initialState: IAuthState = {
  token: "",
  userId: "",
  role: "",
  message: "",
  status: "init",
  authReady: false,
}

export const login = createAsyncThunk(
  "auth/login",
  async (userData: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await api.Auth.login(userData)
      const { user, token, message } = response.data
      setHttpToken(token)
      localStorage.setItem("token", token)
      return {
        message,
        user,
        token,
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data.error)
    }
  }
)

export const checkTokenIsExpired = createAsyncThunk(
  "auth/checkTokenIsExpired",
  async (tokenData: string, thunkAPI) => {
    try {
      setHttpToken(tokenData)
      const response = await api.Auth.getCurrentUser()
      const { user } = response.data
      return { user, token: tokenData }
    } catch (error) {
      setHttpToken(null)
      localStorage.removeItem("token")
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetMessage: (state: IAuthState) => {
      state.status = "init"
      state.message = ""
    },
    setAuthReady: (state: IAuthState, action: PayloadAction<boolean>) => {
      state.authReady = action.payload
    },
    logout: (state: IAuthState) => {
      localStorage.removeItem("token")
      state.token = ""
      state.role = ""
      state.userId = ""
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.status = "loading"
      state.message = ""
    })
    builder.addCase(login.fulfilled, (state, action) => {
      const { user, token, message } = action.payload
      state.status = "success"
      state.token = token
      state.userId = user.id
      state.role = user.role
      state.message = message
    })
    builder.addCase(login.rejected, (state, action: any) => {
      state.message = action.payload
      state.status = "error"
    })
    builder.addCase(checkTokenIsExpired.fulfilled, (state, action) => {
      state.token = action.payload.token
      state.role = action.payload.user.role
      state.userId = action.payload.user.id
      state.authReady = true
    })
    builder.addCase(checkTokenIsExpired.rejected, (state) => {
      state.authReady = true
      state.token = ""
      state.role = ""
      state.userId = ""
    })
  },
})

export const { logout, setAuthReady, resetMessage } = authSlice.actions
