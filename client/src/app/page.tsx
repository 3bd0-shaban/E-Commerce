import Banners from '@Components/app/Banners'
import SideBanner from '@Components/app/SideBanner'
import SideImages from '@Components/app/SideImages'
import HomeProducts from '@Components/app/HomeProducts'
import HomeProducts2 from '@Components/app/HomeProducts2'
import HomeCategory from '@Components/app/HomeCategory'
import HomeBrands from '@Components/app/HomeBrands'
import { BsChat, BsTruck } from 'react-icons/bs'
import { IoPricetagsOutline } from 'react-icons/io5'
import { TfiReload } from 'react-icons/tfi'
import { SiContactlesspayment } from 'react-icons/si'
import TopCategory from '@Components/app/TopCategory'
import Footer from '@Components/app/Footer'
import Header from '@Components/app/Header'

interface ItemProps {
  Icon?: React.ReactNode;
  Title?: string;
  SubRating?: string;
  SubTitle: string;
}

export default function Home() {

  const FeaturesHeader = () => {
    const Item = ({ Icon, Title, SubTitle }: ItemProps) => {
      return (
        <div className='hidden xl:flex flex-col justify-center items-center text-start border-t p-5 '>
          <div className='text-blue-500 col-span-1'>{Icon}</div>
          <div className='text-center col-span-3'>
            <p className='text-xl text-gray-700'>{Title}</p>
            <p className='font-light text-sm'>{SubTitle}</p>
          </div>
        </div>
      )
    }
    return (
      <div className='border rounded-xl flex items-center justify-center'>
        <div>
          <Item Icon={<BsTruck size={25} />} Title={'Free Delivary'} SubTitle={'From 50$'} />
          <Item Icon={<BsChat size={25} />} Title={'99% Customer'} SubTitle={'Feedbacks'} />
          <Item Icon={<TfiReload size={25} />} Title={'365 Days'} SubTitle={'For Free Return'} />
          <Item Icon={<SiContactlesspayment size={25} />} Title={'Payment'} SubTitle={'Secure System'} />
          <Item Icon={<IoPricetagsOutline size={25} />} Title={'Only Best'} SubTitle={'Brands'} />
        </div>
      </div>
    )
  }

  return (
    <>
      <Header />
      <div className='container overflow-hidden max-w-[100rem] gap-3'>
        <div className='flex gap-5'>
          <HomeCategory />
          <div>
            <div className='grid grid-cols-1 xl:grid-cols-5 gap-5'>
              <div className='col-span-4 h-52 sm:h-auto'><Banners /></div>
              <div className='col-span-1 hidden xl:block'><SideBanner /></div>
            </div>
          </div>
        </div>
        <div className='p-3 xl:mt-10'>
          <p className='xl:text-xl font-medium'>Features Brands</p>
          <HomeBrands />
        </div>
        <TopCategory />
      </div>

      <div className='container max-w-full xl:max-w-[100rem] xl:mt-5'>

        <div className='grid grid-cols-7 xl:mt-10 gap-6'>
          <div className='col-span-1 hidden xl:block xl:mt-10 space-y-5'>
            <SideImages />
            <FeaturesHeader />
          </div>
          <div className='w-full col-span-7 xl:col-span-6'>
            <HomeProducts Category={'Best Offers'} />
            <HomeBrands />
            <HomeProducts Category={'Monitors'} />
            <HomeProducts Category={'Monitors'} />
          </div>
        </div>
        <HomeProducts Category={'Laptops'} />
        <HomeProducts2 Category={'Monitors'} />
      </div>
      <Footer />
    </>
  )
}
