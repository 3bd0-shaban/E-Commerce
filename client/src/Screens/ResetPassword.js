import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useResetPasswordMutation } from '../Redux/APIs/AuthApi';
import { ImSpinner7 } from 'react-icons/im';
import { useTitle, Header, Footer } from '../Components/Exports'
import { BsCheck2 } from 'react-icons/bs';
const ResetPassword = () => {
  useTitle('Reset Password')
  const navigate = useNavigate();
  const userRef = useRef();
  const [inputs, setInputs] = useState({
    password: '', confirmpassword: '',
  });
  const handleChange = ({ currentTarget: input }) => {
    setInputs({ ...inputs, [input.name]: input.value });
  };

  const [ResetPassword, { isLoading, isError, error }] = useResetPasswordMutation();
  useEffect(() => {
    userRef.current.focus()
  }, []);
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email')
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { confirmpassword, password } = inputs;
    const data = { confirmpassword, password, email }
    try {
      await ResetPassword(data).unwrap()
      setInputs({ confirmpassword: '', password: '' });
      navigate('/signin')
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
            <p className="text-2xl font-semibold text-gray-700 my-3">Reset Password</p><hr />
            <form className='flex flex-col' onSubmit={handleSubmit}>
              <label className='text-lg py-1 font-light font-serif mt-3 text-gray-500'>Password:</label>
              <input type='password' ref={userRef} onChange={handleChange} value={inputs.password} name='password' className='inputfield !mt-0' placeholder='Enter Email' />
              <label className='text-lg py-1 font-light font-serif mt-3 text-gray-500'>Confirm ResetPassword:</label>
              <input type='password' onChange={handleChange} value={inputs.confirmpassword} name='confirmpassword' className='inputfield !mt-0' placeholder='Enter Email' />
              <button type='submit' className='btn-primary my-3 !w-1/2 !py-3 !rounded-3xl !mt-8' disabled={isLoading}>
                {isLoading ? <span className='flex items-center justify-center text-2xl py-1 animate-spin'><ImSpinner7 /> </span> : 'Submit'}</button>
              {isError && <span className="text-red-500 pb-3 font-poppins font-medium text-center my-4">{error?.data?.msg}</span>}
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

export default ResetPassword
