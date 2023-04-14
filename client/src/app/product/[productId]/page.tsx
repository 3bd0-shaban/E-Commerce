import React from 'react'
import HomeProducts2 from '@Components/app/HomeProducts2'
import Main from './Main'
import UpperProductDetails from '../UpperProductDetails'
import HomeCategory from '@Components/app/HomeCategory'

export default function page() {

    return (
        <>
            <div
                className='flex container max-w-full select-none xl:max-w-[120rem] gap-5'>
                <HomeCategory Height={'h-[54.5rem]'} />
                <div>
                    <UpperProductDetails />
                    <Main />
                </div>
            </div>
            <div className='container max-w-[130]'>
                <HomeProducts2
                    Category={'Revently Viewed'}
                />
            </div>
        </>
    )
}
