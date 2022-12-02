import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Fetch_Product_Details } from '../../../../Redux/Actions/ProductsAction';
import { FeaturesAction } from '../../../../Redux/Slices/FeaturesSlice';
const ProductsInfo = (props) => {
    const { productDetails } = useSelector((state) => state.products);
    const { sideProductInfo } = useSelector(state => state.Features)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(Fetch_Product_Details(props.id));
    }, [dispatch, props.id]);
    return (
        sideProductInfo &&
        <>
            <div onClick={() => dispatch(FeaturesAction.Show_sideProductInfo(false))} className="fixed inset-0 bg-gray-800 bg-opacity-80 transition-opacity z-20"></div>
            <div className='h-screen w-[50%] z-30 bg-white shadow-xl fixed right-0 top-0'>
                <div>
                    <p>{productDetails.name}</p>
                    <p>{productDetails.des}</p>
                    <p>{productDetails.rating}</p>
                </div>
            </div>
        </>
    )
}

export default ProductsInfo
