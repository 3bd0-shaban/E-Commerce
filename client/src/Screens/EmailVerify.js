import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useForgetPasswordMutation, useRequestOTP2Mutation, useVerifyEmailMutation, useVerifyEmailtoResestMutation } from '../Redux/APIs/AuthApi';
import { setCredentials } from '../Redux/Slices/UserSlice';
import { ImSpinner7 } from 'react-icons/im';
import { useTitle, Header, Footer } from '../Components/Exports'
import { BsCheck2 } from 'react-icons/bs';
import { useSearchParams } from 'react-router-dom';

const EmailVerify = () => {
    useTitle('Add new Address')
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userRef = useRef();
    const [inputs, setInputs] = useState({
        code: '',
    });
    const handleChange = ({ currentTarget: input }) => {
        setInputs({ ...inputs, [input.name]: input.value });
    };
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email');
    const isActivate = JSON.parse(searchParams.get('activate'));
    const isCartVerify = JSON.parse(searchParams.get('cart'));
    const [VerifyEmail, { isLoading, isError, error }] = useVerifyEmailMutation();
    const [VerifyEmailtoResest, { isLoading: loading, isError: isErrorReset, error: errorReset }] = useVerifyEmailtoResestMutation();
    const [ForgetPassword, { isError: isErrorReq2optres, error: errorReq2optres }] = useForgetPasswordMutation();
    const [RequestOTP2, { isError: isErrorReq2opt, error: errorReq2opt }] = useRequestOTP2Mutation();

    useEffect(() => {
        userRef.current.focus()
    }, []);

    const SubmitActivateEmail = async (event) => {
        event.preventDefault();
        const { code } = inputs;
        try {
            const { accessToken } = await VerifyEmail({ code, email }).unwrap()
            dispatch(setCredentials({ accessToken }));
            localStorage.setItem('persist', true)
            setInputs({ code: '' });
            if (isCartVerify) {
                navigate('/cart')
                return
            }
            navigate('/address')
        } catch (error) {
            console.log(error)
        }
    }
    const SubmitVerifingEmailToReset = async (event) => {
        event.preventDefault();
        const { code } = inputs;
        try {
            const { accessToken } = await VerifyEmailtoResest({ code, email }).unwrap()
            dispatch(setCredentials({ accessToken }));
            localStorage.setItem('persist', true)
            setInputs({ code: '' });
            navigate(`/resetpassword?email=${email}`)
        } catch (error) {
            console.log(error)
        }
    }

    const Request2ResetOTP = async (event) => {
        event.preventDefault();
        try {
            await ForgetPassword(email).unwrap()
        } catch (error) {
            console.log(error)
        }
    }
    const RequestOTP2Activate = async (event) => {
        event.preventDefault();
        const data = { email }
        try {
            await RequestOTP2(data).unwrap()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Header />
            <div className='container px-0 mt-8'>
                <div className='container grid grid-cols-1 lg:grid-cols-2'>
                    <div className='container px-0 lg:max-w-[60%]'>
                        <p className="text-2xl font-semibold text-gray-700 my-3">Verify you email</p><hr />
                        <p className='text-lg text-gray-700 py-3'>We send message to to you please check your email . </p>
                        <form className='flex flex-col' onSubmit={isActivate ? SubmitActivateEmail : SubmitVerifingEmailToReset}>
                            <label className='text-lg py-2 font-light font-serif text-gray-500'>OTP :</label>
                            <input type='number' ref={userRef} onChange={handleChange} value={inputs.code} name='code' autoComplete='off' className='inputfield' placeholder='Enter OTP' />
                            <Link onClick={isActivate ? RequestOTP2Activate : Request2ResetOTP} className='text-blue-800 focus:text-blue-300 text-sm'>Didn't get OTP ?</Link>

                            <button type='submit' className='btn-primary my-3 !w-1/2 !py-3 !rounded-3xl !mt-8' disabled={isLoading || loading}>
                                {(isLoading || loading) ? <span className='flex items-center justify-center text-2xl py-1 animate-spin'><ImSpinner7 /> </span> : 'Submit'}</button>
                            {(isError || isErrorReset || isErrorReq2opt || isErrorReq2optres) && <span className="text-red-500 pb-3 font-poppins font-medium text-center my-4">
                                {error?.data?.msg || errorReset?.data?.msg || errorReq2opt?.data?.msg || errorReq2optres?.data?.msg}</span>}
                        </form>
                    </div>
                    <div className='conatiner lg:max-w-[60%]'>
                        <p className='text-2xl font-semibold text-gray-700 my-3'>New Customer</p><hr />
                        <div className='my-6'>
                            <p className='text-lg text-gray-700'>Creating an acount today to reap the beneits of personalized shopping experince </p>
                            <div className='my-3 font-bold text-blue-600 hover:text-blue-700 hover:underline mt-8'><Link to='/signup' className='w-full'>Create Account</Link></div>
                        </div>
                        <div>
                            <p className='text-2xl font-medium text-gray-600'>Sign Up today and you will be able to :</p>
                            <div className='px-4 font-light text-md my-4 space-y-4'>
                                <div className='flex items-center gap-4 text-lg'>
                                    <BsCheck2 style={{ color: 'blue' }} />
                                    <p>Track your order easily</p>
                                </div>
                                <div className='flex items-center gap-4 text-lg'>
                                    <BsCheck2 style={{ color: 'blue' }} />
                                    <p>Speed yourway through the checkout</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default EmailVerify
