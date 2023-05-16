'use client';
import React, { useEffect, useRef, FC, useState } from 'react'
import { AiFillFacebook } from 'react-icons/ai';
import { useSigninUserMutation } from '@Redux/APIs/AuthApi';
import { signIn } from "next-auth/react"
import { ImSpinner7 } from 'react-icons/im';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import GetError from '@lib/GetError';
interface Inputs {
    email: string;
    password: string;
}
const Form: FC = ({ }) => {

    const userRef = useRef<HTMLInputElement>(null);
    const [inputs, setInputs] = useState<Inputs>({
        email: '',
        password: ''
    });
    const router = useRouter();
    const handleChange = ({
        currentTarget: input,
    }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setInputs({ ...inputs, [input.name]: input.value });
    };
    const [SigninUser, { isLoading, isError, error }] = useSigninUserMutation();
    useEffect(() => {
        userRef.current?.focus()
    }, []);
    const SubmitSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { email, password } = inputs;
        await SigninUser({ email, password }).unwrap()
            .then(() => {
                signIn("credentials", {
                    email,
                    password,
                })
            })
    }


    return (
        <form className='flex flex-col my-4' onSubmit={SubmitSignIn}>
            <label className='text-sm text-gray-500 font-medium text-start my-1'>Your Email</label>
            <input
                type='email'
                ref={userRef}
                onChange={handleChange}
                name='email'
                className='inputfield'
                placeholder='Phone number username,or email'
            />
            <label className='text-sm text-gray-500 font-medium text-start my-1'>Your password</label>
            <input
                type='password'
                onChange={handleChange}
                name='password'
                className='inputfield'
                placeholder='Password'
            />
            <button
                type='submit'
                aria-label='submit'
                className='btn-primary mt-4 !mb-8'
                disabled={isLoading}>
                {isLoading ?
                    <span className='flex items-center justify-center text-2xl py-1 animate-spin'>
                        <ImSpinner7 />
                    </span> : 'Sign In'}
            </button>
            <div className='flex justify-center mt-4'>
                <hr className='w-[40%] mt-3'></hr>
                <p className='mx-3 font-semibold text-gray-500'>OR</p>
                <hr className='w-[40%] mt-3'></hr>
            </div>
            <button
                aria-label='submit'
                className='flex mx-auto pt-5 mb-3 ' >
                <div className='mt-1 text-blue-700 focus:text-blue-300 text-xl'>
                    <AiFillFacebook />
                </div>
                <p className=' focus:text-blue-300 ml-2 text-base text-blue-900 font-medium'>
                    Log in with facebook
                </p>
            </button>
            <Link
                href='/auth/forget-password'
                aria-label='forget password'
                className='text-blue-800 focus:text-blue-300 md:mb-7 text-sm mt-2'>
                Forgot password ?
            </Link>
            {isError && <GetError error={error} />}

        </form>
    )
}

export default Form