import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { FeaturesAction } from '../../../../Redux/Slices/FeaturesSlice';
import { Fetch_Brand_Details } from './../../../../Redux/Actions/BrandAction';

const BrandInfo = (props) => {
    const { BrandDetails } = useSelector((state) => state.Brand);
    const { SideBrandInfo } = useSelector(state => state.Features)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(Fetch_Brand_Details(props.id));
    }, [dispatch, props.id]);
    return (
        SideBrandInfo &&
        <>
            <div onClick={() => dispatch(FeaturesAction.Show_SideBrandInfo(false))} className="fixed inset-0 bg-gray-800 bg-opacity-80 transition-opacity z-20"></div>
            <div className='h-screen w-[50%] z-30 bg-white shadow-xl fixed right-0 top-0'>
                <div>
                    <p>{BrandDetails.brand}</p>
                </div>
            </div>
        </>
    )
}

export default BrandInfo
