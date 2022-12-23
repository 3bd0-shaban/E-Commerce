import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Footer, Header } from './Exports'

const NotFounded = () => {
    return (
        <>
            <Helmet>
                <title>Market</title>
            </Helmet>
            <div>
                <Header />
                <div className='container max-w-[142rem] gap-3'>
                    <div className='flex justify-center my-24'>
                        <p className='text-7xl underline font-semibold'>Page not Founded Or it may Changed to anthor URL</p>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default NotFounded
