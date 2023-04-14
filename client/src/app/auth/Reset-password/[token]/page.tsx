import Image from 'next/image';
import Link from 'next/link';
import Form from './Form';

export default function Page() {
  
    return (
        <>
            <div className='container px-5 max-w-5xl flex gap-1 place-content-center mt-[2rem] md:mt-[6rem] mb-5 md:mb-28 dark:bg-slate-900'>
                <div className='container px-3 max-w-md py-32 md:py-0 md:mt-16'>
                    <div className='md:border rounded-lg border-gray-300 md:max-w-[90%] ss:px-5 md:px-12 items-center text-center md:bg-white 
                        dark:bg-slate-900 dark:text-slate-300 dark:border-slate-500 '>
                        <Link href="/" aria-label='home'>
                            <div className='flex items-center justify-center wfull gap-2 py-10 instalogo'>
                                <Image
                                    height={200}
                                    width={200}
                                    className='w-10 h-10 rounded-xl'
                                    src='/Images/logo-icon.png'
                                    alt=''
                                />
                                <p className='text-2xl font-bold'>Doctris</p>
                            </div>
                        </Link>
                        <div className='text-lg space-y-2 py-4'>
                            <p className='font-medium'>Reset Password</p>
                            <p className='text-gray-400 text-sm'>Please Enter your new password</p>
                        </div>
                        <Form/>
                    </div>
                </div>
            </div>
        </>
    )
}
