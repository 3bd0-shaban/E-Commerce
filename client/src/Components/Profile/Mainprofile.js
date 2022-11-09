import React from 'react'
import { Header, PersonalInfo, SideProfile } from '../Exports'


const Mainprofile = () => {

    return (
        <>
            <Header />
            <div className='container max-w-7xl'>
                <div className='flex'>
                    <SideProfile />
                    <PersonalInfo />
                </div>
            </div>
        </>
    )
}

export default Mainprofile
