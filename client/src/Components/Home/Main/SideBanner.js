import React from 'react'

const SideBanner = () => {
    return (
        <div className='hidden xl:flex max-w-full'>
            <div className='grid grid-cols-1 gap-2'>
                <img className='w-full object-cover h-[17rem]' src='https://res.cloudinary.com/abdo9/image/upload/v1667226242/Market/bdrtt9rzjht2dipmrlqn.png' alt='' />
                <img className='w-full object-cover h-[17rem]' src='https://res.cloudinary.com/abdo9/image/upload/v1667230361/Market/o2j35oibma2rgxppk7yo.png' alt='' />
                {/* <img className='w-full object-cover h-[14.7rem]' src='https://res.cloudinary.com/abdo9/image/upload/v1667230163/Market/nes2ik3wuyb7wxwcaubr.png' alt='' />
        <img className='w-full object-cover h-[14.7rem]' src='https://res.cloudinary.com/abdo9/image/upload/v1667235118/Market/ebpk3p8skrxto0cz98ip.png' alt='' /> */}
            </div>
        </div>
    )
}

export default SideBanner
