import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Header, getError } from '../Exports';
import { Danger } from '../Components/Alerts';
import { useDispatch, useSelector } from 'react-redux';
import { UserAction } from '../Redux/Slices/UserSlice';
import axios from 'axios';
const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initState = {
    email: '',
    password: '',
  }
  useEffect(() => {
    if (localStorage.getItem("Logedin ?")) {
      navigate("/");
    }
  })
  const { user, error } = useSelector((state) => state.user)
  const [auth, setAuth] = useState(initState)
  const handleChange = ({ currentTarget: input }) => {
    setAuth({ ...auth, [input.name]: input.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = auth
    try {
      const config = {
        header: {
          "Content-Type": "application/json"
        },
      };
      const values = await axios.post('http://localhost:5000/api/auth/signin', { email, password }, config);
      setAuth({ ...auth, error, user })
      dispatch(UserAction.LoggedIn());
      localStorage.setItem("Logedin ?", true);
      navigate('/');
    } catch (error) {
      // console.log(error)
      dispatch(UserAction.Failed_LogIn(getError(error)));
    }
  }

  return (
    <>
      <Header />
      <div className=' container max-w-xl'>
        <div className='flex items-center justify-center align-middle mt-16 '>
          <form onSubmit={handleSubmit} className='border px-4 text-center rounded-xl py-32'>
            <p className='mx-auto text-4xl font-bold font-mono text-gray-600 py-5'>Sign In</p>
            <input onChange={handleChange} name='email' className='outline-none bg-gray-50 rounded-xl py-3 px-3 w-full my-2 placeholder:text-sm placeholder:font-mono focus:border' type='email' placeholder='Enter Email' />
            <input onChange={handleChange} name='password' className='outline-none bg-gray-50 rounded-xl py-3 px-3 w-full my-2 placeholder:text-sm placeholder:font-mono focus:border' type='password' placeholder='Enter Password' />
            <button className='bg-green-500 py-2 px-3 rounded-lg text-white font-semibold w-1/2 focus:ring focus:ring-green-400 mt-5'>Submit</button>
            <div className='flex text-center items-center justify-center mt-5'>
              <p>Don't have an account ?</p>
              <Link to='/signup' className='text-sm font-poppins font-medium text-green-500 mt-1 ml-2'>Sign Up</Link>
            </div>
            {error && <Danger error={error} className={'mx-auto mt-5 text-lg text-gray-700 font-serif font-semibold bg-red-200 py-3 px-5'} />}

          </form>

        </div>
      </div>
    </>
  )
}

export default Signin
