import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify';
import { object, ref, string } from 'yup';
import video from '../../assets/videos/earth.mp4';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../redux/AuthSlice/resetPassword.slice';

export default function ResetPassword() {

  const { response, status } = useSelector((state) => state.resetPassword);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get Search Params
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('t');

  // Get Query Params
  // const {token} = useParams();


  useEffect(()=>{
    if(response?.data?.success){
      setTimeout(() => {
        navigate('/signin');
      }, 500);
    }
  },[response,status]);

  const initialValues = {
    new_password: '',
    confirm_password: ''
  }

  const validationSchema = object({
    new_password: string().required("Password is Required !").min(6, "Password must be 6 to 10 character long !.").max(10, "Password must be 6 to 10 character long !."),
    confirm_password: string().required('Confirm Password is required').oneOf([ref('new_password'), null], "Password and Confirm password must Match !"),
  })

  const handleSubmit = (data) => {
    console.log(data);
    const payload = {
      body : {new_password : data.new_password},
      token:token
    }
    dispatch(resetPassword(payload));
  }

  const showPasswordToggle = () => {
    let input1 = document.getElementById('new_password');
    let input2 = document.getElementById('confirm_password');
    let text = document.getElementById('passwordTxt');

    if (input1 !== null && input2 !== null) {
      if (input1.type == 'password' && input2.type == 'password') {
        input1.type = 'text';
        input2.type = 'text';
        text.innerHTML = 'Hide password';
      } else {
        input1.type = 'password';
        input2.type = 'password';
        text.innerHTML = 'Show password';
      }
    }
  }


  return (
    <div>
      <div className="w-full" id="resetPassword">
        <ToastContainer />
        {/* {status === 'loading' && <Loader isLoading={true} />} */}
        <div className="bg-gray-100">
          <div className="flex flex-col md:flex-row h-screen">
            {/* Left Side (Dark Background with Text) */}
            <div className="w-full md:w-1/2 bg-black relative flex items-center justify-center rounded-lg">
              {/* Video Element */}
              <video
                autoPlay
                loop
                muted
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Overlaying Content */}
              <div className="absolute inset-0 bg-black opacity-75" />
              <div className="relative z-10 text-white p-10">
                <h1 className="text-3xl font-bold mb-4">Welcome to</h1>
                <h2 className="text-5xl font-bold mb-4">Graph Community</h2>
                <p className="text-sm opacity-75">
                  Home to 23 Million developers worldwide
                </p>
                <a href="#" className="text-green-400 mt-2 block">
                  Know more
                </a>
              </div>
            </div>

            {/* Right Side (Forgot Password Form) */}
            <div className="w-full md:w-1/2 pb-5  md:mt-0 md:pb-0 flex flex-col items-center justify-center bg-white">
              <div className="w-full mt-5 max-w-md bg-white p-8 rounded shadow-md">
                <h2 className="text-3xl font-bold mb-6">Create New Password</h2>
                {/* <p className="text-sm text-gray-500 mb-4">
                  No problem! Enter your email or username below, and we will send you an
                  email with instructions to reset your password.
                </p> */}
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(data) => handleSubmit(data)}>
                  <Form>
                    <div className="flex flex-col space-y-1 mt-3 mb-3">
                      <label htmlFor="new_password" className="text-sm font-semibold text-gray-500">New Password</label>
                      <Field
                        type="password"
                        id="new_password"
                        name="new_password"
                        className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-green-200"
                      />
                      <ErrorMessage component={'div'} name="new_password" className="text-red-600 text-sm" />

                    </div>
                    <div className="flex flex-col space-y-1 mt-3 mb-3">
                      <label htmlFor="confirm_password" className="text-sm font-semibold text-gray-500">Confirm Password</label>
                      <Field
                        type="password"
                        id="confirm_password"
                        name="confirm_password"
                        className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-green-200"
                      />
                      <ErrorMessage component={'div'} name="confirm_password" className="text-red-600 text-sm" />

                    </div>
                    <div className="flex items-center space-x-2 mt-3 mb-3">
                      <input
                        type="checkbox"
                        id="pass"
                        onClick={showPasswordToggle}
                        className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
                      />
                      <label htmlFor="pass" className="text-sm font-semibold text-gray-500" id="passwordTxt">Show password</label>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
                    >
                      {status === 'loading' ? 'Please Wait ...' : 'Reset Password'}
                    </button>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
