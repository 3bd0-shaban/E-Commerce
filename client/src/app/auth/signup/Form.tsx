'use client';
import GetError from '@lib/GetError';
import { useSignupMutation } from '@Redux/APIs/AuthApi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useRef, useState } from 'react'
import { ImSpinner7 } from 'react-icons/im';

interface InpupProps {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    passwordConfirm: string;
}


const Form: FC = ({ }) => {
    const router = useRouter();
    const userRef = useRef<HTMLInputElement>(null);
    // useEffect(() => {
    //     if (localStorage.getItem("Logedin ?")) {
    //         navigate("/");
    //     }
    // })
    const [inputs, setInputs] = useState<InpupProps>({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        passwordConfirm: ''
    })
    const handleChange = ({
        currentTarget: input,
    }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setInputs({ ...inputs, [input.name]: input.value });
    };
    useEffect(() => {
        userRef.current?.focus()
    }, []);
    const [signup, { isError, error, isLoading }] = useSignupMutation();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { email, password, firstname,
            lastname, passwordConfirm } = inputs;
        const data = { email, password, firstname, lastname, passwordConfirm }
        await signup(data).unwrap()
            .then(() => {
                router.push(`/auth/verify?email=${email}`)
            })
    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col'>
            <input
                onChange={handleChange}
                value={inputs.email}
                ref={userRef}
                name='email'
                type='email'
                className='inputfield'
                placeholder='Mobile Number Or Email'
            />
            <input
                onChange={handleChange}
                value={inputs.firstname}
                name='firstname'
                type='text'
                className='inputfield'
                placeholder='First Name'
            />
            <input
                onChange={handleChange}
                value={inputs.lastname}
                name='lastname'
                type='text'
                className='inputfield'
                placeholder='Last name'
            />
            <div className='flex gap-5 w-full mt-2'>
                <input
                    onChange={handleChange}
                    value={inputs.password}
                    name='password'
                    type='password'
                    className='inputfield !w-full'
                    placeholder='Password'
                />
                <input
                    onChange={handleChange}
                    value={inputs.passwordConfirm}
                    name='passwordConfirm'
                    type='password'
                    className='inputfield !w-full'
                    placeholder='Confirm Password'
                />
            </div>
            <p className='text-sm font-normal text-gray-500'>
                People who use our service may have uploaded your contact information to Instagram.
                <Link href='/more' aria-label='more' className='font-semibold text-gray-500'>Learn More</Link>
            </p>
            <p className='text-sm font-normal text-gray-500 mt-5'>By signing up, you agree to our Terms ,
                <Link href='/privacy' aria-label='privacy' className='font-semibold text-gray-500'>
                    Privacy Policy
                </Link>
                and
                <Link href='/cookies' aria-label='cookies' className='font-semibold text-gray-500'>
                    Cookies Policy .
                </Link>
            </p>
            <button
                aria-label='submit'
                type='submit'
                className='btn-primary mt-4 !mb-5'
                disabled={isLoading}>
                {isLoading ?
                    <span className='flex items-center justify-center text-2xl py-1 animate-spin'>
                        <ImSpinner7 />
                    </span>
                    :
                    'Sign Up'
                }
            </button>
            <div className='justify-center flex'>
                <p className="py-5 inline">
                    Already have an account?
                    <Link draggable={false} href="/auth/signin" className='font-semibold text-blue-400 px-3'>
                        Log In
                    </Link>
                </p>
            </div>
            {isError && <GetError error={error} />}
        </form>

    )
}

export default Form