import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import spinnerWhite from '../../assets/Spinner-f.svg';
import spinner from '../../assets/Spinner.svg';
import { verifyOtp } from '../../redux/AuthSlice/verifyOtp.slice';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { resend2FaMail } from '../../redux/AuthSlice/resendOtp.slice';

export default function VerifyOtp() {
    const { response, status, error } = useSelector((state) => state.login);
    const twofamailData = useSelector((state) => state.resend2famail);

    const dispatch = useDispatch();
    const [user, setUser] = useState();
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const inputRefs = useRef([]);
    const navigate = useNavigate();


    useEffect(() => {
        let temp = JSON.parse(sessionStorage.getItem('tempId'));
        setUser(response?.data?.data?.user || temp);

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

    const handleOtpChange = (val, key) => {
        if (!isNaN(val)) {
            let otpVal = [...otp];
            otpVal[key - 1] = val;  // Adjusting for array indexing (index starts at 0)
            setOtp(otpVal);

            // Focus the next input if available
            if (val !== "" && key < 6) {
                inputRefs.current[key].focus();
            }
        }
    };

    const handleKeyDown = (e, key) => {
        // Handle backspace navigation to previous input
        if (e.key === 'Backspace' && otp[key - 1] === "") {
            if (key > 1) {
                inputRefs.current[key - 2].focus();
            }
        }
    };

    const handleVerificationOTP = async (e) => {
        e.preventDefault();
        const payload = {
            userId: user, otp: otp.join("")
        }
        const res = await dispatch(verifyOtp(payload));

        if (res?.payload?.data?.message === "Request Successfull") {
            setTimeout(() => {
                navigate('/questions');
            }, 500);
        }
    }

    const resenOtp = () => {
        const payload = {
            userId: user
        }
        console.log(payload);
        dispatch(resend2FaMail(payload));
    }
    return (
        <div>
            <main className="relative min-h-screen flex flex-col justify-center bg-slate-50 overflow-hidden">
                <ToastContainer />
                <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
                    <div className="flex justify-center">
                        <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
                            <header className="mb-8">
                                <h1 className="text-2xl font-bold mb-1">OTP Verification</h1>
                                <p className="text-[15px] text-slate-500">
                                    Enter the 6-digit verification code that was sent to your Email.
                                </p>
                            </header>
                            <form id="otp-form" onSubmit={(e) => handleVerificationOTP(e)}>
                                <div className="flex items-center justify-center gap-3">
                                    {otp.map((data, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-green-400 focus:ring-2 focus:ring-green-100"
                                            maxLength={1}
                                            value={otp[index]}
                                            onChange={(e) => handleOtpChange(e.target.value, index + 1)}
                                            onKeyDown={(e) => handleKeyDown(e, index + 1)}
                                            ref={(el) => (inputRefs.current[index] = el)}
                                            pattern="\d*"
                                        />
                                    ))}
                                </div>
                                <div className="max-w-[260px] mx-auto mt-4">
                                    <button
                                        type="submit"
                                        className="w-full inline-flex justify-center items-center whitespace-nowrap rounded-lg bg-green-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-green-950/10  focus:outline-none focus:ring focus:ring-green-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-green-300 transition-colors duration-150"
                                    >
                                        {<p>Verify Account</p>}
                                        {/* <img src={spinnerWhite} width={25} alt="" /> */}
                                    </button>
                                </div>
                            </form>
                            <div className="text-sm text-slate-500 mt-4">
                                Didn't receive code?{" "}
                                <a
                                    className="font-medium cursor-pointer text-green-500 hover:text-green-600"
                                    type='button'
                                    onClick={() => resenOtp()}
                                >
                                    <div className='flex justify-center '>
                                        {twofamailData.status != "loading" && <span>Resend</span>}
                                        {twofamailData.status == "loading" && <img src={spinner} width={25} alt="" />}
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    )
}
