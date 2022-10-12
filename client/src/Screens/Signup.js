import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Header, getError } from '../Exports';
import { Danger } from '../Components/Alerts';
import { useDispatch, useSelector } from 'react-redux';
import { UserAction } from '../Redux/Slices/UserSlice';
import axios from 'axios';
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
    confirmpassword: '',
    username: '',
  })
  const handleChange = ({ currentTarget: input }) => {
    setInputs({ ...inputs, [input.name]: input.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password, username, confirmpassword } = inputs
    try {
      const config = {
        header: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      };
      const res = await axios.post('http://localhost:5000/api/auth/signup', { email, password, username, confirmpassword }, config);
      // setInputs({ ...inputs, error, auth })
      dispatch(UserAction.Register(res.data));
      // localStorage.setItem("Logedin ?", true);
      navigate('/signin');
    } catch (error) {
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
            <input onChange={handleChange} value={inputs.email} name='email' className='outline-none bg-gray-50 rounded-xl py-3 px-3 w-full my-2 placeholder:text-sm placeholder:font-mono focus:border' type='email' placeholder='Enter Email' />
            <input onChange={handleChange} value={inputs.username} name='username' className='outline-none bg-gray-50 rounded-xl py-3 px-3 w-full my-2 placeholder:text-sm placeholder:font-mono focus:border' type='text' placeholder='Enter username' />
            <input onChange={handleChange} value={inputs.password} name='password' className='outline-none bg-gray-50 rounded-xl py-3 px-3 w-full my-2 placeholder:text-sm placeholder:font-mono focus:border' type='password' placeholder='Enter Password' />
            <input onChange={handleChange} value={inputs.confirmpassword} name='confirmpassword' className='outline-none bg-gray-50 rounded-xl py-3 px-3 w-full my-2 placeholder:text-sm placeholder:font-mono focus:border' type='password' placeholder='Confirm Password' />
            <button className='bg-green-500 py-2 px-3 rounded-lg text-white font-semibold w-1/2 focus:ring focus:ring-green-400 mt-5'>Submit</button>
            <div className='flex text-center items-center justify-center mt-5'>
              <p>Aleardy have an account ?</p>
              <Link to='/signin' className='text-sm font-poppins font-medium text-green-500 mt-1 ml-2'>Sign In</Link>
            </div>
            {error && <Danger error={error} className={'mx-auto mt-5 text-lg text-gray-700 font-serif font-semibold bg-red-200 py-3 px-5'} />}

          </form>

        </div>
      </div>
    </>
  )
}

export default Signup
