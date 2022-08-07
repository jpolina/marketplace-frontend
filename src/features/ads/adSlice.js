import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
    ads:[],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const adSlice = createSlice({
    name: 'ad',
    initialState,
    reducers: {
        reset: (state) => initialState
    }
})

export const {reset} = adSlice.actions
export default adSlice.reducer