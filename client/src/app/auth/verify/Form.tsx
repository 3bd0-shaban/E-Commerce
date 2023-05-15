'use client';
import React, { useEffect, useRef, FC, useState } from 'react'
import {
    useForgetPasswordMutation,
    useRequestOTP2Mutation,
    useVerifyEmailMutation,
    useVerifyEmailtoResestMutation
} from '@Redux/APIs/AuthApi';
import { ImSpinner7 } from 'react-icons/im';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import GetError from '@lib/GetError';
interface FormProps {

}

const Form: FC<FormProps> = ({ }) => {
    const [code, setCode] = useState<number>();
    const [success, setSuccess] = useState<string>('');
    const userRef = useRef<HTMLInputElement>(null);
    const Router = useRouter();
    const SearchQuery = useSearchParams();
    const email = SearchQuery?.get('email') as string;
    const isActivate = SearchQuery?.get('activate') === 'true' ? true : false;
    const isCartVerify = SearchQuery?.get('cart') as string;

    const [VerifyEmail, { isLoading, isError, error }] = useVerifyEmailMutation();
    const [VerifyEmailtoResest, { isLoading: loading, isError: isErrorReset, error: errorReset }] = useVerifyEmailtoResestMutation();
    const [ForgetPassword, { isError: isErrorReq2optres, error: errorReq2optres }] = useForgetPasswordMutation();
    const [RequestOTP2, { isError: isErrorReq2opt, error: errorReq2opt }] = useRequestOTP2Mutation();


    const SubmitActivateEmail = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await VerifyEmail({ code, email }).unwrap()
            localStorage.setItem('persist', 'true')
            setCode(0);
            if (isCartVerify) {
                Router.push('/cart')
                return
            }
            Router.push('/address')
        } catch (error) {
            console.log(error)
        }
    }
    const SubmitVerifingEmailToReset = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            VerifyEmailtoResest({ code, email }).unwrap()
            localStorage.setItem('persist', 'true')
            setCode(0);
            Router.push(`/resetpassword?email=${email}`)
        } catch (error) {
            console.log(error)
        }
    }

    const Request2ResetOTP = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        ForgetPassword(email).unwrap()
    }
    const RequestOTP2Activate = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = { email }
        RequestOTP2(data).unwrap()

    }
    return (
        <>
            <form onSubmit={isActivate ? RequestOTP2Activate : Request2ResetOTP} className='mb-5 space-y-2'>
                <span className='dark:text-slate-400'>Enter the confirmation code we sent to {email}
                    <button
                        aria-label='submit'
                        className='text-blue-500 font-semibold'>
                        Resend Code
                    </button>
                </span>
            </form>
            <form className='flex flex-col'
                onSubmit={isActivate ? SubmitActivateEmail : SubmitVerifingEmailToReset}>
                <div className='flex gap-3 '>
                    <input
                        type='number'
                        ref={userRef}
                        onChange={(e) => setCode(parseInt(e.target.value))}
                        value={code}
                        name='email'
                        className='inputfield appearance-none !w-full'
                        placeholder='Confirmation code'
                    />
                </div>
                <button
                    type='submit'
                    aria-label='submit'
                    className='btn-primary mt-4 !mb-4'
                    disabled={isLoading}>
                    {isLoading ?
                        <span className='flex items-center justify-center text-2xl py-1 animate-spin'>
                            <ImSpinner7 />
                        </span> : 'Next'
                    }
                </button>
                <Link
                    href='/auth/signin'
                    aria-label='sign in'
                    className='font-medium text-blue-500 text-md focus:text-blue-300 '>
                    Go Back?
                </Link>
                {isError && <GetError error={error} />}
                {success &&
                    <span className="text-green-500 pb-3 font-poppins font-medium">
                        {success}
                    </span>
                }
            </form>
        </>
    )
}

export default Form