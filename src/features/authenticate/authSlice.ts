import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import userApi from '../../api/user/userApi'

interface AuthState {
  isAuthenticated: boolean
}

const initialState: AuthState = {
  isAuthenticated: false,
}

export const sigin = createAsyncThunk(
  'auth/sigin',
  async ({ email, password }: { email: string; password: string }) => {
    const response = await userApi.signin(email, password)
    return response
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signin(state, action) {
      state.isAuthenticated = action.payload
    },
    signout(state, action) {
      state.isAuthenticated = action.payload
    },
  },
})

export const { signin, signout } = authSlice.actions
export default authSlice.reducer
