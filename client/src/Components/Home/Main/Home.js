import React from 'react'
import {  CiShoppingTag } from 'react-icons/ci'
import { TfiReload } from 'react-icons/tfi'
import { SiContactlesspayment } from 'react-icons/si'
import { HiOutlineChatBubbleOvalLeft, HiOutlineTruck } from 'react-icons/hi2'
import { HomeProducts, HomeProducts2, Banners, Header, Footer, HomeCategory, HomeBrands, FeaturesCategory } from '../../Exports'
import { Helmet } from 'react-helmet-async'
// import { useGetUserQuery } from '../../../Redux/APIs/AuthApi'
const Home = () => {
    const FeaturesHeader = () => {
        // const { data } = useGetUserQuery() || {};
        const Item = (props) => {
            return (
                <div className='grid grid-cols-4 text-start border-t py-14 px-8'>
                    <div className='text-5xl text-blue-500 col-span-1'>{props.Icon}</div>
                    <div className='text-center col-span-3'>
                        <p className='text-2xl font-semibold text-gray-700'>{props.Title}</p>
                        <p className='font-light text-xl'>{props.SubTitle}</p>
                    </div>
                </div>
            )
        }
        return (
            <div className='border rounded-xl'>
                <Item Icon={<HiOutlineTruck style={{ fontSize: '4rem' }} />} Title={'Free Delivary'} SubTitle={'From 50$'} />
                <Item Icon={<HiOutlineChatBubbleOvalLeft style={{ fontSize: '3rem' }} />} Title={'99% Customer'} SubTitle={'Feedbacks'} />
                <Item Icon={<TfiReload style={{ fontSize: '2.5rem' }} />} Title={'365 Days'} SubTitle={'For Free Return'} />
                <Item Icon={<SiContactlesspayment style={{ fontSize: '4.5rem' }} />} Title={'Payment'} SubTitle={'Secure System'} />
                <Item Icon={<CiShoppingTag style={{ fontSize: '3.5rem' }} />} Title={'Only Best'} SubTitle={'Brands'} />
            </div>
        )
    }
    const SideBanner = () => {
        return (
            <>
                <div className='space-y-10 max-h-full '>
                    <img className='' src='https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500,quality=95/https://www.bhphotovideo.com/images/images500x500/Foba_F6001_TT_Plast_Plastic_Background_1294131763_747513.jpg' alt='' />
                    <img className='' src='https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500,quality=95/https://www.bhphotovideo.com/images/images500x500/Foba_F6001_TT_Plast_Plastic_Background_1294131763_747513.jpg' alt='' />
                </div>
            </>
        )
    }
    return (
        <>
            <Helmet>
                <title>Market</title>
            </Helmet>
            <div>
                <Header />
                <div className='container max-w-[142rem] gap-3'>
                    <div className='flex '>
                        <HomeCategory />
                        <div className='container max-w-[120rem]'>
                            <Banners />
                            <div className='mt-10'>
                                <p className='text-3xl font-bold'>Features Categories</p>
                                <HomeBrands />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container max-w-[142rem] gap-3'>
                    <FeaturesCategory />
                </div>

                <div className='container max-w-[140rem] mt-5'>

                    <div className='grid grid-cols-7 mt-10 gap-6'>
                        <div className='col-span-1 mt-10 space-y-5'>
                            <SideBanner />
                            <FeaturesHeader />
                        </div>
                        <div className='w-full col-span-6'>
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
