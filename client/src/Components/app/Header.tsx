'use client'
import React, { useEffect, useState } from 'react';
import { SlHandbag } from 'react-icons/sl';
import { CgDetailsMore } from 'react-icons/cg';
import { CiHeart } from 'react-icons/ci';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SecNavbar from './SecNavbar';
import Logo from '@Components/Layouts/Logo';

const Header: React.FC = () => {
  const [inputs, setInputs] = useState({
    keyword: ''
  });
  const router = useRouter();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handlesearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?keyword=${inputs.keyword}`)
  }

  const SearchPart: React.FC = () => {
    return (
      <form onSubmit={handlesearch} className='w-[52%] hidden xl:flex justify-center select-none'>
        <div className="relative w-full">
          <input
            type="search"
            onChange={handleChange}
            value={inputs.keyword}
            name='keyword'
            className="py-4 px-4 w-full text-sm rounded-lg text-gray-900 bg-gray-50
            border outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search for product "
          />
          <Link
            href='/'
            draggable={false}
            className="absolute top-0 inset-y-0 right-[9rem] px-4 text-md font-medium flex items-center text-center text-gray-500 border-l my-3">
            All Category
          </Link>
          <button
            type='submit'
            className="absolute top-0 right-0 py-4 px-10 text-sm font-semibold tracking-wide 
          text-white border rounded-r-lg border-blue-700 hover:border-blue-800 bg-blue-700 hover:bg-blue-800">
            Search
          </button>
        </div>
      </form>
    )
  }

  const Rightnav: React.FC = () => {
    return (
      <div className='flex gap-3 justify-end ml-auto xl:ml-0'>
        <Link
          draggable={false}
          href='/whitelist'
          className='items-center text-black hidden md:flex gap-2'
        >
          <CiHeart style={{ 'fontSize': '2.5rem', 'height': '2.5rem' }} />
          <p className='text-xl'>5</p>
        </Link>

        <Link
          draggable={false}
          href='/cart'
          className="flex gap-3 relative items-center px-3 text-sm font-medium 
          text-center text-black rounded-lg focus:outline-none"
        >
          <div className='text-3xl lg:text-4xl'>
            <SlHandbag />
          </div>
          <span className="sr-only">Notifications</span>
          <div className="flex absolute left-[3.2rem] justify-center items-center 
          w-6 h-6 text-[10px] font-bold  bg-[#E9EFF2] text-gray-600 rounded-full">20</div>
          <div className='ml-8 text-start'>
            <p className='font-extralight'>Your Cart</p>
            <div className='flex gap-3'>
              <p className='font-bold'>$ 1545.99 </p>
            </div>
          </div>
        </Link>
      </div>
    )
  }

  const [prevScrollpos, setPrevScrollpos] = useState<number>(0);
  const [navbarTop, setNavbarTop] = useState<string>('0');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        setNavbarTop('0');
      } else {
        setNavbarTop('-3.6rem');
      }
      setPrevScrollpos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollpos]);
  return (
    <>
      <div className='pb-32 lg:pb-[10rem]'>
        <div className='mb-4 bg-white fixed z-20 w-screen top-0 block transition-all' style={{ top: navbarTop }}>
          <SecNavbar />
          <div className='border-b shadow'>
            <div className='container max-w-[120rem] my-3 px-4 flex items-center justify-between md:px-5'>
              <div className='hidden xl:flex'>
                <Logo />
                <div className='text-4xl ml-14'>
                  <CgDetailsMore />
                </div>
              </div>
              <SearchPart />
              <Rightnav />
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
export default Header