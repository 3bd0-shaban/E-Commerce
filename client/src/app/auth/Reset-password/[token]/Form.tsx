'use client';
import React, { useEffect, useRef, FC, useState } from 'react'
import { ImSpinner7 } from 'react-icons/im'
import { useResetPasswordMutation } from '@Redux/APIs/AuthApi';
import GetError from '@lib/GetError';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
interface Inputs {
    password: string;
    passwordConfirm: string;
}
const Form: FC = ({ }) => {
    const router = useRouter();
    const path = usePathname();
    const token = path.split('/')[3]
    const userRef = useRef<HTMLInputElement>(null);
    const [inputs, setInputs] = useState<Inputs>({
        password: '',
        passwordConfirm: ''
    });

    const handleChange = ({
        currentTarget: input,
    }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setInputs({ ...inputs, [input.name]: input.value });
    };
    useEffect(() => {
        if (localStorage.getItem("persist") === 'true') {
            router.push("/");
        }
    })
    useEffect(() => {
        userRef.current?.focus()
    }, []);
    const [ResetPassword, { isError, error: errorres, isLoading }] = useResetPasswordMutation();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { password, passwordConfirm } = inputs
        const data = { password, passwordConfirm }
        await ResetPassword({ token, data }).unwrap()
            .then(() => {
                router.push('/')
                setInputs({
                    password: '',
                    passwordConfirm: ''
                })
            })
            .catch((err: any) => {
                console.log(err);
            });
    }

    return (
        <form className='flex flex-col'
            onSubmit={handleSubmit}>
            <input type='password'
                ref={userRef}
                onChange={handleChange}
                name='password'
                className='inputfield'
                placeholder='Password'
            />
            <input
                type='password'
                onChange={handleChange}
                name='passwordConfirm'
                className='inputfield'
                placeholder='Confirm Password'
            />
            <button
                type='submit'
                aria-label='submit'
                className='btn-primary mt-4 !mb-8'
                disabled={isLoading}>
                {isLoading ?
                    <span className='flex items-center justify-center text-2xl py-1 animate-spin'>
                        <ImSpinner7 />
                    </span> : 'Confirm'}
            </button>
            <div className='flex justify-center mt-4'>
                <hr className='w-[40%] mt-3'></hr>
                <p className='mx-3 font-semibold text-gray-500'>OR</p>
                <hr className='w-[40%] mt-3'></hr>
            </div>

            <Link
                href='/auth/signup'
                aria-label='sign up'
                className='text-blue-800 focus:text-blue-300 md:mb-7 text-sm font-medium mt-3'>
                Create New Account ?
            </Link>
            {isError && <GetError error={errorres} />}
        </form>
    )
}

export default Form