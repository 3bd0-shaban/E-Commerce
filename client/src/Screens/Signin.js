import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Header, getError } from '../Components/Exports';
import { Danger } from '../Components/Alerts';
import { useDispatch, useSelector } from 'react-redux';
import { UserAction } from '../Redux/Slices/UserSlice';
import axios from 'axios';
const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // useEffect(() => {
  //   if (localStorage.getItem("Logedin ?")) {
  //     navigate("/");
  //   }
  // })
  const { error,success } = useSelector((state) => state.auth)
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  })
  const handleChange = ({ currentTarget: input }) => {
    setInputs({ ...inputs, [input.name]: input.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = inputs
    try {

      const res = await axios.post('http://localhost:5000/api/auth/signin', { email, password }, { withCredentials: true });
      localStorage.setItem('Logged?', true)
      dispatch(UserAction.LoggedIn(res.data));
      dispatch(UserAction.AccessToken(res.data.token));
      navigate('/');
    } catch (error) {
      dispatch(UserAction.Failed_LogIn(getError(error)));
    }
  }

  return (
    <>
      <div>
        <div className='container max-w-4xl flex place-content-center h-[80%] mt-28 mb-28'>
          <div className='hidden md:block '>
            {/* <img src='Images/logo.webp' className='w-full' alt='' /> */}
          </div>
          <div className='container  max-w-md md:mt-20'>
            <div className='md:border border-gray-300 px-12 items-center text-center md:bg-white'>
              {success && <span className="text-green-500 pt-4 pb-3 font-poppins font-medium">{success.msg}</span>}
              <Link to="/"><p className="py-10 instalogo">Market</p></Link>
              <form className='flex flex-col' onSubmit={handleSubmit}>
                <input type='email' onChange={handleChange} value={inputs.email} name='email' className='inputfield' placeholder='Phone number username,or email' />
                <input type='password' onChange={handleChange} value={inputs.password} name='password' className='inputfield' placeholder='Password' />
                <button className='btn-primary'>Log In</button>
                <div className='flex justify-center mt-4'>
                  <hr className='w-[40%] mt-3'></hr>
                  <p className='mx-3 font-semibold text-gray-500'>OR</p>
                  <hr className='w-[40%] mt-3'></hr>
                </div>
                <button className='flex mx-auto pt-5 mb-3 ' >
                  <div className='mt-1 text-blue-700 focus:text-blue-300 text-xl'>
                    {/* <AiFillFacebook /> */}
                  </div>
                  <p className=' focus:text-blue-300 ml-2 text-base text-blue-900 font-medium'>Log in with facebook</p>
                </button>
                <Link to='forgetpassword' className='text-blue-800 focus:text-blue-300 md:mb-7 text-sm mt-2'>Forgot password ?</Link>
                {error && <span className="text-red-500 pb-3 font-poppins font-medium">{error}</span>}
              </form>
            </div>
            <div className='md:border border-gray-300 justify-center flex mt-5 md:bg-white'>
              <p className="py-5 inline">Don't have an account? <Link to="/signup" className='font-semibold text-blue-400'>SignUp</Link></p>
            </div>
          </div>
        </div>
      </div>



    </>
  )
}

export default Signin
