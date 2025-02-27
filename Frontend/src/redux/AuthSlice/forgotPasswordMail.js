import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postRequest } from '../../utils/apiService.js';
import { toast } from 'react-toastify';

export const forgotPasswordMail = createAsyncThunk('auth/forgotPasswordMail',async(payload)=>{
    try {
        const response = await postRequest('api/v1/forgotPasswordMail', payload);
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

export const forgotPasswordMailSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(forgotPasswordMail.pending,(state) => {
        state.status = 'loading';
    }).addCase(forgotPasswordMail.fulfilled,(state,action)=>{
        state.status = 'successfull';
        state.response = action.payload;
    }).addCase(forgotPasswordMail.rejected,(state,action) => {
        state.state = 'faild';
        state.error = action.error.message;
    });
  }
})

export default forgotPasswordMailSlice.reducer;