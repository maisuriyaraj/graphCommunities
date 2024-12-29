import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRequest } from '../../utils/apiService.js';
import { toast } from 'react-toastify';
import { getAccessTokens } from '../../utils/CookiesService.js';

export const getAIChatConfigs = createAsyncThunk('getAIChatConfigs',async({onSuccess})=>{
    try {
        const token = getAccessTokens();
        const response = await getRequest('api/ai/aiConfigs',{},{'authorization': `Bearer ${token}`});
        onSuccess(response?.data);
        return response?.data || null;
    } catch (error) {
        toast.error(error.message);
    }
});

const initialState = {
    response: {}, // List of users
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null, // For storing error messages
  };

export const AIConfigsSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAIChatConfigs.pending,(state) => {
        state.status = 'loading';
    }).addCase(getAIChatConfigs.fulfilled,(state,action)=>{
        state.status = 'successfull';
        state.response = action.payload;
    }).addCase(getAIChatConfigs.rejected,(state,action) => {
        state.state = 'faild';
        toast.error(action.error.message);
        state.error = action.error.message;
    });
  }
})

export default AIConfigsSlice.reducer;