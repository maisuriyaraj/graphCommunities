import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postRequest } from '../../utils/apiService.js';
import { toast } from 'react-toastify';

export const resend2FaMail = createAsyncThunk('auth/resend2FaMail',async(payload)=>{
    try {
        const response = await postRequest('api/v1/resendOtp', payload);
        return response;

    } catch (error) {
        toast.error(error.message);
    }
});

const initialState = {
    response: {},
    status: 'idle',
    error: null,
  };

export const resend2FaMailSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(resend2FaMail.pending,(state) => {
        state.status = 'loading';
    }).addCase(resend2FaMail.fulfilled,(state,action)=>{
        state.status = 'successfull';
        state.response = action.payload;
    }).addCase(resend2FaMail.rejected,(state,action) => {
        state.state = 'faild';
        state.error = action.error.message;
    });
  }
})

export default resend2FaMailSlice.reducer;