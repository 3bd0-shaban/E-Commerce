'use client';
import React from "react";
import SideBar from "./SideBar";
import Header from "./Header";

export default function DashboardWraper({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="container max-w-[130rem]">
        <div className='grid grid-cols-1 md:grid-cols-7 gap-1 dark:bg-slate-900 select-none container max-w-[140rem] px-5'>
          <div className='md:col-span-2 xxl:col-span-1 px-3'>
            <SideBar />
          </div>
          <div className='w-full md:col-span-2 xxl:col-span-6'>
            <div className='xl:pt-5'>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}