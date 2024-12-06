import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postRequest } from '../../utils/apiService.js';
import { toast } from 'react-toastify';

export const resetPassword = createAsyncThunk('auth/resetPassword',async(payload)=>{
    try {
        const response = await postRequest('api/v1/resetPassword', payload.body,{'authorization' : 'Bearer ' +payload.token});
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

export const resetPasswordSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(resetPassword.pending,(state) => {
        state.status = 'loading';
    }).addCase(resetPassword.fulfilled,(state,action)=>{
        state.status = 'successfull';
        state.response = action.payload;
    }).addCase(resetPassword.rejected,(state,action) => {
        state.state = 'faild';
        state.error = action.error.message;
    });
  }
})

export default resetPasswordSlice.reducer;