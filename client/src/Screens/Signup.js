import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { SignUp } from '../Redux/Actions/AuthAction';
const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("Logedin ?")) {
      navigate("/");
    }
  })
  const { error } = useSelector((state) => state.auth)
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    username: '',
    confirmpassword: ''
  })
  const handleChange = ({ currentTarget: input }) => {
    setInputs({ ...inputs, [input.name]: input.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password, username, firstname, lastname, confirmpassword } = inputs
    dispatch(SignUp(email, password, username, lastname, firstname, confirmpassword, navigate))
  }

  return (
    <>
      <div className='container max-w-4xl flex place-content-center h-[80%] lg:mt-20 mb-28'>
        <div className='max-w-md'>
          <div className='lg:border border-gray-300 px-12 items-center text-center lg:bg-white'>
            <Link to="/"><p className="pt-10 mb-4 instalogo">Market</p></Link>
            <p className='text-xl font-semibold text-gray-400 mb-5'>Sign up to see photos and videos from your friends.</p>
            <button className='flex mx-auto p-2 w-full place-content-center  mb-3 bg-blue-500 rounded-md focus:bg-blue-400 ' >
              <div className='mt-[.2rem] text-white  text-xl'>
                {/* <AiFillFacebook /> */}
              </div>
              <p className=' ml-2 text-base font-medium text-white'>Log in with facebook</p>
            </button>
            <div className='flex justify-center my-4'>
              <hr className='w-[40%] mt-3'></hr>
              <p className='mx-3 font-semibold text-gray-500'>OR</p>
              <hr className='w-[40%] mt-3'></hr>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col'>
              <input onChange={handleChange} value={inputs.email} name='email' type='email' className='inputfield' placeholder='Mobile Number Or Email' />
              <input onChange={handleChange} value={inputs.firstname} name='firstname' type='text' className='inputfield' placeholder='Full Name' />
              <input onChange={handleChange} value={inputs.lastname} name='lastname' type='text' className='inputfield' placeholder='Full Name' />
              <input onChange={handleChange} value={inputs.username} name='username' type='text' className='inputfield' placeholder='Username' />
              <input onChange={handleChange} value={inputs.password} name='password' type='password' className='inputfield' placeholder='Password' />
              <input onChange={handleChange} value={inputs.confirmpassword} name='confirmpassword' type='password' className='inputfield' placeholder='Confirm Password' />
              <p className='text-sm font-normal text-gray-500'>People who use our service may have uploaded your contact information to Instagram. <Link to='/more' className='font-semibold text-gray-500'>Learn More</Link></p>
              <p className='text-sm font-normal text-gray-500 mt-5'>By signing up, you agree to our Terms , <Link to='/privacy' className='font-semibold text-gray-500'>Privacy Policy </Link>and<Link to='/cookies' className='font-semibold text-gray-500'> Cookies Policy .</Link></p>
              <button className='btn-primary mt-4 !mb-8'>Sign up</button>
              {error && <span className="text-red-500 pb-3 font-poppins font-medium">{error}</span>}

            </form>
          </div>
          <div className='lg:border border-gray-300 justify-center flex mt-5 lg:bg-white'>
            <p className="py-5 inline">Don't have an account? <Link to="/signin" className='font-semibold text-blue-400'>Log In</Link></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup
