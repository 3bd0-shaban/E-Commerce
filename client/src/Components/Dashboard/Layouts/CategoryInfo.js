import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FeaturesAction } from '../../../Redux/Slices/FeaturesSlice';
import { Fetch_Category_Details } from './../../../Redux/Actions/CategoryAction';

const CategoryInfo = (props) => {
    const { CategoryDetails } = useSelector((state) => state.Category);
    const { SideCategoryInfo } = useSelector(state => state.Features)
    const dispatch = useDispatch();
    const params = useParams();
    const { id } = params;
    useEffect(() => {
        dispatch(Fetch_Category_Details(id));
    }, [dispatch, id]);
    return (
         SideCategoryInfo &&
        <>
            <div onClick={() => dispatch(FeaturesAction.Show_SideCategoryInfo(false))} className="fixed inset-0 bg-gray-800 bg-opacity-80 transition-opacity z-20"></div>
            <div className='h-screen w-[50%] z-30 bg-white shadow-xl fixed right-0 top-0'>
                <div>
                    <p>{CategoryDetails.category}</p>
                    <p>{props.Name}</p>
                </div>
            </div>
        </>
    )
}

export default CategoryInfo
