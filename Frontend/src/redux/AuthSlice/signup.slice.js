import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postRequest } from '../../utils/apiService.js';
import { toast } from 'react-toastify';

export const signUpUser = createAsyncThunk('auth/signUpUser',async({payload,onSucces,onError})=>{
    try {
        const response = await postRequest('api/v1/register', payload);
        onSucces(response);
        return response;

    } catch (error) {
        toast.error(error.message);
        onError(error);
    }
});

const initialState = {
    response: {},
    status: 'idle',
    error: null,
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