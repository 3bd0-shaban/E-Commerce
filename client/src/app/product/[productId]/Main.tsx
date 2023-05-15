'use client';
import { FC, useEffect } from 'react'
import Link from 'next/link';
import HomeCategory from '@Components/app/HomeCategory';
import UpperProductDetails from '../UpperProductDetails';
import Reviews from '../Reviews';
import { useParams, usePathname } from 'next/navigation';
import { useGetProductsDetailsQuery } from '@Redux/APIs/ProductsApi';

interface mainProps {

}

const Main: FC<mainProps> = ({ }) => {
    const params = useParams() as { productId :string};
    const productId = params.productId;
    const { data: productDetails } = useGetProductsDetailsQuery({ productId }) || {};
    const pathname = usePathname();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const SpicHeader = () => {
        return (
            <div className='w-full my-5 py-12 bg-[#F5F5F5]'>
                <div className='text-lg xl:text-2xl font-semibold flex gap-5 xl:gap-16 text-gray-600 items-center whitespace-nowrap px-4 xl:px-32 uppercase'>
                    <Link href='/' draggable={false}>related</Link>
                    <Link href='/' draggable={false}>DESCRIPTION</Link>
                    <Link href='/' draggable={false}>specification</Link>
                    <Link href='/' draggable={false}>Reviews ( {productDetails?.numofreviews} )</Link>
                </div>
            </div>
        )
    }
    return (


        <div className='container max-w-[100rem]'>
            <SpicHeader />
            <div
                className='conatiner max-w-full my-7'
                dangerouslySetInnerHTML=
                {{ __html: productDetails?.fulldes as string}}
            />
            <Reviews productId={productId} productDetails={productDetails} />
        </div>
    )
}

export default Main