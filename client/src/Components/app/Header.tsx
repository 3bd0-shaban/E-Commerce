'use client'
import React, { useEffect, useState } from 'react';
import { SlHandbag } from 'react-icons/sl';
import { CgDetailsMore } from 'react-icons/cg';
import { CiHeart } from 'react-icons/ci';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Logo from '@Components/Layouts/Logo';
import { useAppDispatch, useAppSelector } from '@Hooks/useRedux';
import { useLogOutMutation } from '@Redux/APIs/AuthApi';
import { FeaturesAction } from '@Redux/Slices/FeaturesSlice';
import { BsList } from 'react-icons/bs';
import { siteFeatures } from '@config/siteFeatures';

const Header: React.FC = () => {
  const [keyword, setKeyword] = useState<string>('');
  const router = useRouter();

  const handlesearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?keyword=${keyword}`)
  }


  const [prevScrollpos, setPrevScrollpos] = useState<number>(0);
  const [navbarTop, setNavbarTop] = useState<string>('0');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        setNavbarTop('0');
      } else {
        setNavbarTop('-2.5rem');
      }
      setPrevScrollpos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollpos]);

  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [logOut] = useLogOutMutation();
  const Router = useRouter();
  const HandleLogOut = async () => {
    await logOut().unwrap()
      .then(() => {
        Router.push('/auth/signin')
      })
      .catch((err) => {

      });
  }
  const ListLinks = () => {
    return (

      <>
        {
          siteFeatures.NaveBar.MainNav.map((item, index) => (
            <Link
              key={index}
              href={item.linkDir}
              draggable={false}>
              {item.title}
            </Link>
          ))
        }
      </>

    )
  }
  const SearchPart: React.FC = () => {
    return (
      <form onSubmit={handlesearch} className='w-[40%] hidden xl:flex justify-center'>
        <div className="relative w-full">
          <input
            type="search"
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
            className="py-3 px-3 w-full text-sm rounded-lg text-gray-900 bg-gray-50
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
            className="absolute top-0 right-0 py-3 px-10 text-sm font-semibold tracking-wide 
          text-white border rounded-r-lg border-blue-700 hover:border-blue-800 bg-blue-700 hover:bg-blue-800">
            Search
          </button>
        </div>
      </form>
    )
  }

  const Rightnav: React.FC = () => {
    return (
      <div className='hidden md:flex gap-3'>
        <Link
          draggable={false}
          href='/whitelist'
          className='items-center text-black flex gap-2'
        >
          <CiHeart size={23} />
          <p className='text-xl'>5</p>
        </Link>

        <Link
          draggable={false}
          href='/cart'
          className="flex gap-3 relative items-center px-3 text-sm font-medium text-center text-black rounded-lg focus:outline-none">
          <SlHandbag size={20} />
          <p className="flex absolute left-[3.2rem] justify-center items-center w-6 h-6  bg-[#E9EFF2] text-gray-600 rounded-full">20</p>
          <div className='text-start text-sm'>
            <p className='font-extralight'>Your Cart</p>
            <div className='flex gap-3'>
              <p className='font-medium'>$ 1545.99 </p>
            </div>
          </div>
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className='h-36'>
        <div className='bg-white fixed z-20 w-screen top-0 block transition-all' style={{ top: navbarTop }}>
          <div className={`${open ? 'xl:hidden block bg-gray-50' : `xl:hidden block`}`}>
            <div className="flex items-center justify-between py-1 px-5 text-2xl ">
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => dispatch(FeaturesAction.Show_HomeSideBar())}
                  className="bg-gray-50 p-2 rounded-3xl hover:bg-gray-100 focus:bg-gray-200 focus:ring focus:ring-gray-200 text-3xl text-gray-500" >
                  <BsList />
                </button>
                <Logo Font='text-xl' />
              </div>
              <button
                onClick={() => setOpen(!open)}
                className="bg-gray-50 rounded-md border py-1.5 px-3 duration-300 hover:bg-gray-100 focus:ring focus:ring-gray-200 text-2xl text-gray-500">
                <BsList size={20} />
              </button>
            </div>
            <div className="w-screen flex flex-col gap-y-4 px-5 z-10 text-sm text-gray-500 uppercase whitespace-nowrap">
              {open && < ListLinks />}
            </div>

          </div>
          <div className='container max-w-[100rem] hidden xl:block'>
            <div className='flex justify-between items-center py-2'>
              <div className="flex gap-5 z-10 text-sm text-gray-500 uppercase whitespace-nowrap">
                <ListLinks />
              </div>
              <div className='text-gray-500 font-light text-center divide-x-2 flex text-sm gap-4'>
                {siteFeatures.NaveBar.topRight.map((item, index) => (
                  <Link
                    key={index}
                    href={item.linkDir}
                    draggable={false}
                    className="flex gap-1 items-center" >
                    {item.title}
                    {item.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className='border-b shadow py-2'>
            <div className='container max-w-[100rem] px-4 flex items-center justify-between md:px-5'>
              <div className='hidden xl:flex gap-12'>
                <Logo />
                <CgDetailsMore size={25} />
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