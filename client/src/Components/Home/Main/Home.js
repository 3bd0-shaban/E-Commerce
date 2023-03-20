import React from 'react'
import { IoPricetagsOutline } from 'react-icons/io5'
import { TfiReload } from 'react-icons/tfi'
import { SiContactlesspayment } from 'react-icons/si'
import { HomeProducts, HomeProducts2, Banners, Header, Footer, HomeCategory, HomeBrands, FeaturesCategory, SideBanner, SideImages } from '../../Exports'
import { useTitle } from '../../Exports'
import { BsChat, BsTruck } from 'react-icons/bs';
const Home = () => {
    useTitle('Market')
    const FeaturesHeader = () => {
        const Item = (props) => {
            return (
                <div className='xl:grid grid-cols-4 justify-center items-center text-start border-t py-14 px-8 hidden '>
                    <div className='text-5xl text-blue-500 col-span-1'>{props.Icon}</div>
                    <div className='text-center col-span-3'>
                        <p className='text-2xl font-semibold text-gray-700'>{props.Title}</p>
                        <p className='font-light text-xl'>{props.SubTitle}</p>
                    </div>
                </div>
            )
        }
        return (
            <div className='border rounded-xl flex items-center justify-center'>
                <div>
                    <Item Icon={<BsTruck style={{ fontSize: '3.rem' }} />} Title={'Free Delivary'} SubTitle={'From 50$'} />
                    <Item Icon={<BsChat style={{ fontSize: '2.7rem' }} />} Title={'99% Customer'} SubTitle={'Feedbacks'} />
                    <Item Icon={<TfiReload style={{ fontSize: '2.5rem' }} />} Title={'365 Days'} SubTitle={'For Free Return'} />
                    <Item Icon={<SiContactlesspayment style={{ fontSize: '4.5rem' }} />} Title={'Payment'} SubTitle={'Secure System'} />
                    <Item Icon={<IoPricetagsOutline style={{ fontSize: '3rem' }} />} Title={'Only Best'} SubTitle={'Brands'} />
                </div>
            </div>
        )
    }
    return (
        <>
            <div className='select-none'>
                <Header />
                <div className='container overflow-hidden max-w-full px-0 xl:max-w-[120rem] gap-3'>
                    <div className='flex '>
                        <HomeCategory />
                        <div className='container px-0 max-w-full'>
                            <div className='grid grid-cols-1 xl:grid-cols-5 gap-5'>
                                <div className='col-span-4 h-52 sm:h-auto'><Banners /></div>
                                <div className='col-span-1 hidden xl:block'><SideBanner /></div>
                            </div>
                            <div className='p-3 xl:mt-10'>
                                <p className='xl:text-3xl font-bold'>Features Brands</p>
                                <HomeBrands />
                            </div>
                        </div>
                    </div>
                </div>
                <FeaturesCategory />

                <div className='container max-w-full xl:max-w-[120rem] xl:mt-5'>

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
            </div>

        </>
    )
}

export default Home
