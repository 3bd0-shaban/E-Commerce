import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSignupMutation } from '../Redux/APIs/AuthApi';
import { ImSpinner7 } from 'react-icons/im';
import { Footer, Header, useTitle } from '../Components/Exports'
import { BsCheck2 } from 'react-icons/bs';
const Signup = () => {
  useTitle('Sign Up');
  const navigate = useNavigate();
  const userRef = useRef();
  useEffect(() => {
    if (localStorage.getItem("Logedin ?")) {
      navigate("/");
    }
  })
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    confirmpassword: ''
  })
  const handleChange = ({ currentTarget: input }) => {
    setInputs({ ...inputs, [input.name]: input.value });
  };
  useEffect(() => {
    userRef.current.focus()
  }, []);
  const [signup, { isError, error, isLoading }] = useSignupMutation();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password, lastname, firstname, confirmpassword } = inputs;
    const data = { email, password, lastname, firstname, confirmpassword }
    await signup(data).unwrap()
      .then((payload) => {
        localStorage.setItem('Logged?', true);
        setInputs({ email: '', password: '' })
        navigate('/signin')
      })
      .catch((err) => {
        console.log(err.data.msg);
      });
  }

  return (
    <>
      <Header />
      <div className='container px-0 mt-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2'>
          <div className='container px-0 lg:max-w-[60%]'>
            <p className="text-2xl font-semibold text-gray-700 my-3">Log in to your account</p><hr />
            <form onSubmit={handleSubmit} className='flex flex-col py-5'>
              <label className='text-lg py-2 font-light font-serif text-gray-500'>Email Address :</label>
              <input onChange={handleChange} value={inputs.email} ref={userRef} name='email' type='email' className='inputfield' placeholder='Mobile Number Or Email' />
              <label className='text-lg py-2 font-light font-serif text-gray-500'>First Name :</label>
              <input onChange={handleChange} value={inputs.firstname} name='firstname' type='text' className='inputfield' placeholder='Full Name' />
              <label className='text-lg py-2 font-light font-serif text-gray-500'>Last Name:</label>
              <input onChange={handleChange} value={inputs.lastname} name='lastname' type='text' className='inputfield' placeholder='Full Name' />
              <div className='flex gap-5 w-full mt-2'>
                <div className='w-full'>
                  <label className='text-lg py-2 font-light font-serif text-gray-500'>Password :</label>
                  <input onChange={handleChange} value={inputs.password} name='password' type='password' className='inputfield !w-full' placeholder='Password' />
                </div>
                <div className='w-full'>
                  <label className='text-lg py-2 font-light font-serif text-gray-500'>Confirm :</label>
                  <input onChange={handleChange} value={inputs.confirmpassword} name='confirmpassword' type='password' className='inputfield !w-full' placeholder='Confirm Password' />
                </div>
              </div>
              <div className='text-center px-6'>
                <p className='text-sm font-normal text-gray-500'>People who use our service may have uploaded your contact information to Instagram. <Link to='/more' className='font-semibold text-gray-500'>Learn More</Link></p>
                <p className='text-sm font-normal text-gray-500 mt-5'>By signing up, you agree to our Terms , <Link to='/privacy' className='font-semibold text-gray-500'>Privacy Policy </Link>and<Link to='/cookies' className='font-semibold text-gray-500'> Cookies Policy .</Link></p>
              </div>
              <button type='submit' className='btn-primary my-3 !w-1/2 !py-3 !rounded-3xl !mt-8' disabled={isLoading}>
                {isLoading ? <span className='flex items-center justify-center text-2xl py-1 animate-spin'><ImSpinner7 /> </span> : 'Submit'}</button>
              <div className='justify-center flex mt-2'>
                <p className="py-5 inline">Already have an account? <Link to="/signin" className='font-semibold text-blue-400 px-3'>Log In</Link></p>
              </div>
              {isError && <span className="text-red-500 pb-3 font-poppins font-medium text-center">{error?.data?.msg}</span>}
            </form>
          </div>
          <div className='conatiner lg:max-w-[60%]'>
            <form>
              <p className='text-2xl font-semibold text-gray-700 my-3'>New Customer</p><hr />
              <div className='my-6'>
                <p className='font-medium text-lg text-gray-700'>Creating an acount today  yo reap the beneits of personalized shopping experince </p>
                {/* <div className='my-4'>
                  <label className='text-lg py-3 font-light font-serif text-gray-500'>Email Address :</label>
                  <input type='email' onChange={(e) => setEmailRegister(e.target.value)} value={emailregister} name='email' className='inputfield !py-4 !w-full' placeholder='Phone number username,or email' />
                </div> */}
                <button type='submit' className='btn-primary my-3 !w-1/2 !py-3 !rounded-3xl !mt-8' disabled={isLoading}>
                  {isLoading ? <span className='flex items-center justify-center text-2xl py-1 animate-spin'><ImSpinner7 /> </span> : 'Next'}</button>
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
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>

  )
}

export default Signup
