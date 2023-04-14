'use client';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BsFillDropletFill, BsFillPersonFill, BsTelephoneFill } from "react-icons/bs";
import { FaAddressCard } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import { motion } from 'framer-motion';
import { useAppSelector } from "@Hooks/useRedux";
import { selectCurrentUser } from "@Redux/Slices/UserSlice";

interface InfoProps {
  Icon: React.ReactNode;
  Title: string;
  Value: string;
}
interface SpecProps {
  value: number;

}
export default function ProfileWraper({ children }: { children: React.ReactNode }) {
  const spec: SpecProps = {
    value: 90
  };
  const pathname = usePathname();
  const userInfo = useAppSelector(selectCurrentUser)
  const profile = (pathname.includes(`${userInfo.username}`));
  const profileSettings = (pathname.includes('settings'));
  const INFO = ({ Icon, Title, Value }: InfoProps) => {
    return (
      <div className='flex items-center gap-3'>
        <span className='text-blue-600'>{Icon}</span>
        <p className='text-lg'>{Title}</p>
        <p className='text-gray-400'>{Value}</p>
      </div>
    )
  }

  return (
    <>
      <div className='container my-36 lg:max-w-[60rem] xl:max-w-[80rem] duration-300 flex items-center'>
        <div className='grid grid-cols-1 lg:grid-cols-3 lg:gap-5 gap-y-5'>
          <div className='shadow-[.2px_.2px_3px_1px] dark:shadow-slate-700 shadow-gray-100 overflow-hidden rounded-lg'>
            <div className='relative'>
              <Image
                height={500}
                width={500}
                draggable={false}
                className='w-full relative'
                src='/Images/profile-bg.jpg'
                alt=''
              />
              <Image
                height={500}
                width={500}
                draggable={false}
                className='w-24 h-24 rounded-full absolute flex inset-x-0 !left-[40%] -bottom-10 shadow-lg'
                src='/Images/Clients/09.jpg'
                alt=''
              />
            </div>
            <div className='text-center w-full mt-12'>
              <p className='font-medium text-lg'>Christopher Burrell</p>
              <p className='text-gray-500'>25 Years old</p>
            </div><hr className="dark:border-slate-500 mt-5" />
            <div className='lg:p-5 px-3 py-5'>
              <div className='my-5'>
                <div className='flex justify-between text-gray-500 mb-2'>
                  <p className='font-medium text-gray-600'>Complete your profile</p>
                  <p className='font-medium'>{spec?.value} %</p>
                </div>
                <div
                  className='bg-gray-100 w-full rounded-full overflow-hidden border h-4 dark:bg-slate-900 dark:border-slate-500'>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${spec.value}%` }}
                    transition={{ ease: "easeOut", duration: 1 }} className='bg-blue-500 h-full rounded-full'
                  >
                  </motion.div>
                </div>
              </div>
              <div className='space-y-3'>
                <INFO Icon={<BsFillPersonFill size={23} />} Title='Gender' Value='Female' />
                <INFO Icon={<MdMarkEmailRead size={23} />} Title='Birthday' Value='19th January 1995' />
                <INFO Icon={<BsTelephoneFill size={22} />} Title='Phone No' Value='+(125) 458-8547' />
                <INFO Icon={<FaAddressCard size={22} />} Title='Address' Value='Sydney, Australia' />
                <INFO Icon={<BsFillDropletFill size={22} />} Title='Blood Group' Value='B +' />
              </div>
            </div>
          </div>
          <div className='shadow-[.2px_.2px_3px_1px] dark:shadow-slate-700 shadow-gray-100 overflow-hidden rounded-lg col-span-2'>
            <div className='container px-0 max-w-full rounded-lg overflow-hidden'>
              <div className='grid grid-cols-2 text-center text-lg border-b dark:border-slate-600'>
                <Link
                  href={`/profile/${userInfo.username}`}
                  aria-label='profile'
                  draggable={false}
                  className={`bg-[#F8F9FA] dark:bg-slate-900 py-3 font-medium ${profile && '!bg-blue-500 text-white'}`}>
                  Profile
                </Link>
                <Link
                  href='/profile/settings'
                  aria-label='settings'
                  draggable={false}
                  className={`bg-[#F8F9FA] dark:bg-slate-900 py-3 font-medium ${profileSettings && '!bg-blue-500 text-white'}`}>
                  Profile Settings
                </Link>
              </div>
              <div className='p-5'>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
