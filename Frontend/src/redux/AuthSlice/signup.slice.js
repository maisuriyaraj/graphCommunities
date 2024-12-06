import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postRequest } from '../../utils/apiService.js';
import { toast } from 'react-toastify';

export const signUpUser = createAsyncThunk('auth/signUpUser',async(payload)=>{
    try {
        const response = await postRequest('api/v1/register', payload);
        return response;

    } catch (error) {
        toast.error(error.message);    }
});

const initialState = {
    response: {}, // List of users
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null, // For storing error messages
  };

export const signUpSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUpUser.pending,(state)=>{
        state.status = 'loading';
    }).addCase(signUpUser.fulfilled,(state,action) => {
        state.status = 'successfull';
        state.response = action.payload;
    }).addCase(signUpUser.rejected,(state,action)=>{
        state.status = 'faild';
        state.error = action.error.message;
    })
  }
})

export default signUpSlice.reducer;