import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import { Loader } from '../../components/loader';
import { object, string } from 'yup';
import { Link } from 'react-router-dom';
import video from '../../assets/videos/earth.mp4';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordMail } from '../../redux/AuthSlice/forgotPasswordMail';

export default function ForgotPassword() {

  const { response, status } = useSelector((state) => state.forgotPassword);
  const [emailSent, setEmailSent] = useState(false);
  const [email,setEmail] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    // Handler for the beforeunload event
    const handleBeforeUnload = (event) => {
        event.preventDefault(); // Standard for most browsers
        event.returnValue = ''; // Chrome requires setting this property
    };

    // Adding the event listener when the component mounts
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup the event listener when the component unmounts
    return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
    };
}, []);

  const initialValues = {
    email: ""
  }

  const validationSchema = object({
    email: string().required("Email is Required !").email("Please Provide Valid Email Address !")
  });

  const handleSubmit = async (data) => {
    const payload = {
      email: data.email
    }

    setEmail(data.email);

    
    let res = await dispatch(forgotPasswordMail(payload));
    if(res?.payload?.data?.statusCode === 201){
      setEmailSent(true);
    }
  }

  const resendMail = async() => {
    const payload = {
      email: email
    }

    
    let res = await dispatch(forgotPasswordMail(payload));
    if(res?.payload?.data?.statusCode === 201){
      setEmailSent(true);
    }
  }
  return (
    <>
      <div className="w-full" id="forgotPassword">
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
                <h2 className="text-3xl font-bold mb-6">Forgot Password?</h2>
                <p className="text-sm text-gray-500 mb-4">
                  No problem! Enter your email below, and we will send you an
                  email with instructions to reset your password.
                </p>
                {!emailSent && <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(data) => handleSubmit(data)}>
                  <Form>
                    <div className="flex flex-col space-y-1 mt-3 mb-3">
                      <label htmlFor="email" className="text-sm font-semibold text-gray-500">Email address</label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter Email Address"
                        className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-green-200"
                      />
                      <ErrorMessage component={'div'} name="email" className="text-red-600 text-sm" />

                    </div>
                    {/* <div className="mb-4 flex items-center">
                    <input type="checkbox" id="recaptcha" className="mr-2" />
                    <label htmlFor="recaptcha" className="text-sm text-gray-700">
                      I'm not a robot
                    </label>
                  </div> */}
                    <button
                      type="submit"
                      className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
                    >
                      {status === 'loading' ? 'Please Wait ...' : 'Send Reset Link'}
                    </button>
                  </Form>
                </Formik>}
                {emailSent && <>
                  <h2 className="text-3xl text-green-600 mb-6">Email Sent Successfully !.</h2>
                  <a type='button' onClick={() => resendMail()} className=" cursor-pointer w-full py-2 rounded-md block text-center text-sm text-gray-500 hover:bg-gray-200 hover:text-green-600 mt-4">
                    Resend
                  </a>
                </>
                }
                <Link to='/signin' className=" py-2 rounded-md block text-center text-sm text-gray-500 hover:bg-gray-200 hover:text-green-600 mt-4">
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
