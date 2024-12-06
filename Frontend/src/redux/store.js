import { configureStore } from '@reduxjs/toolkit'
import loginUserSlice from './AuthSlice/signin.slice.js';
import signUpSlice from './AuthSlice/signup.slice.js';
import forgotPasswordMailSlice from './AuthSlice/forgotPasswordMail.js';
import resetPasswordSlice from './AuthSlice/resetPassword.slice.js';
import  verifyOtpSlice  from './AuthSlice/verifyOtp.slice.js';
import  resend2FaMailSlice  from './AuthSlice/resendOtp.slice.js';
import  getQuestionsListSlice  from './DashboardSlices/getQuestions.js';

export const store = configureStore({
  reducer: {
    login: loginUserSlice,
    signup: signUpSlice,
    forgotPassword: forgotPasswordMailSlice,
    resetPassword: resetPasswordSlice,
    verifyOtp:verifyOtpSlice,
    resend2famail : resend2FaMailSlice,
    getQuestions : getQuestionsListSlice
  },
})