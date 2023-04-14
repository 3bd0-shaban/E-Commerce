'use client';
import { FC, useState } from 'react'

interface InfoProps {

}

const Info: FC<InfoProps> = ({ }) => {
    const [inputs, setInputs] = useState({
        name: '',
        department: '',
        doctor: '',
        email: '',
        phone: '',
        message: '',
    });
    const handleChange = ({
        currentTarget: input,
    }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setInputs({ ...inputs, [input.name]: input.value });
    };
    return (
        <form>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div>
                    <label className='text-sm text-gray-500 font-medium text-start my-1.5'>First Name</label>
                    <input type='email' onChange={handleChange} name='firstname' className='inputfield w-full' placeholder='Email' />
                </div>
                <div>
                    <label className='text-sm text-gray-500 font-medium text-start my-1.5'>Last Name</label>
                    <input type='tel' onChange={handleChange} name='lastname' className='inputfield w-full' placeholder='Phone Number' />
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div>
                    <label className='text-sm text-gray-500 font-medium text-start my-1.5'>Your Email</label>
                    <input type='email' onChange={handleChange} name='email' className='inputfield w-full' placeholder='Email' />
                </div>
                <div>
                    <label className='text-sm text-gray-500 font-medium text-start my-1.5'>Phone no.</label>
                    <input type='tel' onChange={handleChange} name='phone' className='inputfield w-full' placeholder='Phone Number' />
                </div>
            </div>
            <div>
                <label className='text-sm text-gray-500 font-medium text-start my-1 block'>Your Bio Here</label>
                <textarea
                    placeholder='content...'
                    cols={60}
                    rows={5}
                    className='w-full border p-3 outline-none focus:border-black
                    dark:outline-none dark:bg-slate-800 dark:border-slate-500 dark:focus:border-blue-700 rounded-lg g-24'
                />

            </div>
            <button
                aria-label='save changes'
                className='bg-blue-600 active:bg-blue-700 text-white w-36 
                font-medium py-2 my-3 rounded-md border border-blue-200 dark:border-none'>
                Save Changes
            </button>
        </form>
    );
}

export default Info