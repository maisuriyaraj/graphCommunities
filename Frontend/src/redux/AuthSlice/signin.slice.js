import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postRequest } from '../../utils/apiService.js';
import { toast } from 'react-toastify';

export const loginUser = createAsyncThunk('auth/loginUser',async(payload)=>{
    try {
        const response = await postRequest('api/v1/login', payload);
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

export const loginUserSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending,(state) => {
        state.status = 'loading';
    }).addCase(loginUser.fulfilled,(state,action)=>{
        state.status = 'successfull';
        state.response = action.payload;
    }).addCase(loginUser.rejected,(state,action) => {
        state.state = 'faild';
        state.error = action.error.message;
    });
  }
})

export default loginUserSlice.reducer;