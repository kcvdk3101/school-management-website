import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
  isAuthenticated: boolean
}

const initialState: AuthState = { 
  isAuthenticated: false 
} 

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signin(state, action) {
      state.isAuthenticated = action.payload
    },
    signout(state, action) {
      state.isAuthenticated = action.payload
    }
  },
})

export const { signin,signout  } = authSlice.actions
export default authSlice.reducer