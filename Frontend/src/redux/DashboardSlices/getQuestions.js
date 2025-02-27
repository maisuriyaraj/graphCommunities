import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRequest } from '../../utils/apiService.js';
import { toast } from 'react-toastify';

export const getQuestionsList = createAsyncThunk('dashboard/getQuestionsList',async(payload)=>{
    try {
        const response = await getRequest('api/fetch/getQuestions', payload);
        return response?.data || null;

    } catch (error) {
        toast.error(error.message);
    }
});

const initialState = {
    response: {},
    status: 'idle',
    error: null,
  };

export const getQuestionsListSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getQuestionsList.pending,(state) => {
        state.status = 'loading';
    }).addCase(getQuestionsList.fulfilled,(state,action)=>{
        state.status = 'successfull';
        state.response = action.payload;
    }).addCase(getQuestionsList.rejected,(state,action) => {
        state.state = 'faild';
        state.error = action.error.message;
    });
  }
})

export default getQuestionsListSlice.reducer;