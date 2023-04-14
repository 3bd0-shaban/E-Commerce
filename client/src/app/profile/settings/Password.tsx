'use client';
import { FC, useState } from 'react'

interface PasswordProps {

}

const Password: FC<PasswordProps> = ({ }) => {
    const [inputs, setInputs] = useState({
        oldpassword: '',
        newpassword: '',
        confirmpassword: '',
    });
    const handleChange = ({
        currentTarget: input,
    }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setInputs({ ...inputs, [input.name]: input.value });
    };
    return (
        <form>
            <div>
                <label className='text-sm text-gray-500 font-medium text-start my-1.5'>Old password :</label>
                <input type='password' onChange={handleChange} name='oldpassword' className='inputfield w-full' placeholder='Old password' />
            </div>
            <div>
                <label className='text-sm text-gray-500 font-medium text-start my-1.5'>New password :</label>
                <input type='password' onChange={handleChange} name='newpassword' className='inputfield w-full' placeholder='New password' />
            </div>
            <div>
                <label className='text-sm text-gray-500 font-medium text-start my-1.5'>Re-type New password :</label>
                <input type='password' onChange={handleChange} name='confirmpassword' className='inputfield w-full' placeholder='Re-type New password' />
            </div>
            <button
                aria-label='submit'
                className='bg-blue-600 active:bg-blue-700 text-white
                w-36 font-medium py-2 my-3 rounded-md border border-blue-200 dark:border-none'>
                Save Changes
            </button>
        </form>
    );
}

export default Password