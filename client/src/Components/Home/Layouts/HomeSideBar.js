import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FeaturesAction } from './../../../Redux/Slices/FeaturesSlice';

const SideBarMain = () => {
    const dispatch = useDispatch();
    const { HomeSideBar } = useSelector(state => state.Features)

    return (
        <>
            {HomeSideBar &&
                <>
                    <div onClick={() => dispatch(FeaturesAction.Show_HomeSideBar(false))} className="w-screen h-screen bg-gray-800 fixed bg-opacity-80 transition-opacity block xl:hidden z-10"></div>
                    <div className="xl:hidden flex h-screen fixed z-20 w-80 border-r shadow-2xl bg-[#F6F8F9]">
                    </div>
                </>
            }
        </>
    )
}
export default SideBarMain
