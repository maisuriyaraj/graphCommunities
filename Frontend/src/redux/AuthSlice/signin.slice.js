import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postRequest } from '../../utils/apiService.js';
import { toast } from 'react-toastify';

export const loginUser = createAsyncThunk('auth/loginUser',async({payload,onSucces,onError})=>{
    try {
        const response = await postRequest('api/v1/login', payload);
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