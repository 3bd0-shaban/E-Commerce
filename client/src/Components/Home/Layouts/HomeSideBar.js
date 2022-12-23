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
                    <div onClick={() => dispatch(FeaturesAction.Show_HomeSideBar(false))} className={HomeSideBar ? "backdrop opened" : 'backdrop closed'}></div>
                    <div className={HomeSideBar ? "sidebar opened" : 'sidebar closed'}>
                    </div>
                </>
            }
        </>
    )
}
export default SideBarMain
