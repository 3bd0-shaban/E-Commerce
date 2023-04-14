'use client';
import GetError from '@lib/GetError';
import { useForgetPasswordMutation } from '@Redux/APIs/AuthApi';
import Link from 'next/link';
import { FC, useEffect, useRef, useState } from 'react'
import { ImSpinner7 } from 'react-icons/im';

const Form: FC = () => {
    // const router = useRouter();
    const userRef = useRef<HTMLInputElement>(null);
    const [success, setSuccess] = useState<string>('');
    // useEffect(() => {
    //     if (localStorage.getItem("persist") === 'true') {
    //         router.push("/");
    //     }
    // })
    const [email, setEMail] = useState('')

    useEffect(() => {
        userRef.current?.focus()
    }, []);
    const [ForgetPassword, { isError, error, isLoading }] = useForgetPasswordMutation();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await ForgetPassword({ email }).unwrap()
            .then(() => {
                setSuccess(`We Send a reset message to your email ${email}`);
                setEMail('')
            })
            .catch((err: any) => {
                console.log(err?.data?.message);
            });
    }
    return (
        <form className='flex flex-col' onSubmit={handleSubmit}>
            <input
                type='email'
                ref={userRef}
                onChange={(e) => setEMail(e.target.value)}
                name='email'
                className='inputfield'
                placeholder='Phone number username,or email'
            />
            <button
                type='submit'
                aria-label='submit'
                className='btn-primary mt-4 !mb-8'
                disabled={isLoading}>
                {isLoading ?
                    <span className='flex items-center justify-center text-2xl py-1 animate-spin'>
                        <ImSpinner7 />
                    </span> : 'Send Otp Reset'}
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
            {isError && <GetError error={error} />}
            {success && <span className="text-green-500 pb-3 font-poppins font-medium">{success}</span>}
        </form>
    )
}

export default Form