import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRequest } from '../../utils/apiService.js';
import { toast } from 'react-toastify';

export const getQuestionsList = createAsyncThunk('dashboard/getQuestionsList',async({payload,onSuccess,onError})=>{
    try {
        const response = await getRequest('api/fetch/getQuestions', payload);
        onSuccess(response?.data);
        return response?.data || null;

    } catch (error) {
        onError(error);
        toast.error(error.message);
    }
});

const initialState = {
    response: {},
    allData:[],
    currentPage:1,
    loader : false,
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
        state.loader = true;
    }).addCase(getQuestionsList.fulfilled,(state,action)=>{
        state.status = 'successfull';
        state.response = action.payload;
        state.allData = [...state.allData,...action.payload.data.questions];
        state.currentPage = action.payload.data.currentPage;
        state.loader = false;
    }).addCase(getQuestionsList.rejected,(state,action) => {
        state.state = 'faild';
        state.error = action.error.message;
        state.loader = false;
    });
  }
})

export default getQuestionsListSlice.reducer;