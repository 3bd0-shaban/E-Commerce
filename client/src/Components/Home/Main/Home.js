import React from 'react'
import { CiDeliveryTruck, CiShoppingTag } from 'react-icons/ci'
import { TfiReload } from 'react-icons/tfi'
import { SiContactlesspayment } from 'react-icons/si'
import { HiOutlineChatBubbleOvalLeft } from 'react-icons/hi2'
import { HomeProducts, HomeProducts2, Banners, Header, Footer, HomeCategory, HomeBrands } from '../../Exports'
import { Helmet } from 'react-helmet-async'
const Home = () => {
    const FeaturesHeader = () => {
        const Item = (props) => {
            return (
                <div className='flex gap-6 items-center justify-center border-r'>
                    <div className='text-5xl text-blue-500'>{props.Icon}</div>
                    <div className='text-center'>
                        <p className='text-2xl font-semibold text-gray-700 '>{props.Title}</p>
                        <p className='font-light text-xl'>{props.SubTitle}</p>
                    </div>
                </div>
            )
        }
        return (
            <div className='border rounded-xl grid grid-cols-5 gap-7 justify-center py-8'>
                <Item Icon={<CiDeliveryTruck style={{ fontSize: '4rem' }} />} Title={'Free Delivary'} SubTitle={'From 50$'} />
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
                <div className='space-y-10 max-h-full'>
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

                <div className='container max-w-[140rem] mt-5'>
                    <FeaturesHeader />
                    <div className='grid grid-cols-7 mt-10 gap-6'>
                        <div className='col-span-1 mt-10'><SideBanner /></div>
                        <div className='w-full col-span-6'>
                            <HomeProducts Category={'Best Offers'} />
                            <HomeBrands />
                        </div>
                    </div>
                    <HomeProducts Category={'Monitors'} />
                    <HomeProducts Category={'Laptops'} />
                    <HomeProducts Category={'Storage'} />
                    <HomeProducts2 Category={'Monitors'} />
                </div>
                <Footer />
            </div>

        </>
    )
}

export default Home
