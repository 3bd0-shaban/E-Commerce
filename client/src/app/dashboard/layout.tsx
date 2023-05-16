import { authOptions } from "@lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import Header from "./Header";
import SideBar from "./SideBar";

export const metadata = {
  title: "Dashboard",
};
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions)
  if (!session?.isAdmin) notFound()
  return (
    <>
      <Header />
      <div className="container max-w-[130rem]">
        <div className='grid grid-cols-1 md:grid-cols-7 gap-1 dark:bg-slate-900 select-none container max-w-[140rem] sm:px-5'>
          <div className='lg:col-span-2 xl:col-span-1 px-3'>
            <SideBar />
          </div>
          <div className='w-full col-span-7 lg:col-span-5 xl:col-span-6'>
            <div className='xl:pt-5 w-full'>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>);
}
