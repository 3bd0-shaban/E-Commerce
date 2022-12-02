import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Fetch_User_Details } from '../../../../Redux/Actions/AuthAction';
import { FeaturesAction } from '../../../../Redux/Slices/FeaturesSlice';
const UserInfo = (props) => {
    const { UserDetails } = useSelector((state) => state.auth);
    const { sideUserInfo } = useSelector(state => state.Features)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(Fetch_User_Details(props.id));
    }, [dispatch, props.id]);
    return (
        sideUserInfo &&
        <>
            <div onClick={() => dispatch(FeaturesAction.Show_sideUserInfo(false))} className="fixed inset-0 bg-gray-800 bg-opacity-80 transition-opacity z-20"></div>
            <div className='h-screen w-[50%] z-30 bg-white shadow-xl fixed right-0 top-0'>
                <div>
                    <p>{UserDetails.firstname}</p>
                    <p>{UserDetails.whitelist}</p>
                    <p>{UserDetails.email}</p>
                </div>
            </div>
        </>
    )
}

export default UserInfo
