import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postRequest } from '../../utils/apiService.js';
import { toast } from 'react-toastify';

export const verifyOtp = createAsyncThunk('auth/verifyOtp',async(payload)=>{
    try {
        const response = await postRequest('api/v1/verifyOtp', payload);
        return response;

    } catch (error) {
        toast.error(error.message);
    }
});

const initialState = {
    response: {}, // List of users
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null, // For storing error messages
  };

export const verifyOtpSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(verifyOtp.pending,(state) => {
        state.status = 'loading';
    }).addCase(verifyOtp.fulfilled,(state,action)=>{
        state.status = 'successfull';
        state.response = action.payload;
    }).addCase(verifyOtp.rejected,(state,action) => {
        state.state = 'faild';
        state.error = action.error.message;
    });
  }
})

export default verifyOtpSlice.reducer;