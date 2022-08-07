import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { FaGlasses } from 'react-icons/fa'
import authService from './authService'

// Get seller from localStorage
const seller = JSON.parse(localStorage.getItem('seller'))

const initialState = {
    seller: seller ? seller: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Register seller
export const register = createAsyncThunk('auth/register', async (seller, thunkAPI) => {
    try{
        return await authService.register(seller)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message || error.message || error.toString())
        return thunkAPI.rejectWithValue(message)
    }
})

// Login seller
export const login = createAsyncThunk('auth/login', async (seller, thunkAPI) => {
    try{
        return await authService.login(seller)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message || error.message || error.toString())
        return thunkAPI.rejectWithValue(message)
    }
})

export const logout = createAsyncThunk('auth/logout', async() => {
    await authService.logout()
})

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(register.pending, (state) => {
            state.isLoading = true
          })
          .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.seller = action.payload
          })
          .addCase(register.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.seller = null
          })
          .addCase(login.pending, (state) => {
            state.isLoading = true
          })
          .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.seller = action.payload
          })
          .addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.seller = null
          })
          .addCase(logout.fulfilled, (state) => {
            state.seller = null
          })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer