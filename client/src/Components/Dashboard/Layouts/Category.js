import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getError } from '../../Exports'
import { CategoryAction } from '../../../Redux/Slices/CategorySlice';
const Category = (props) => {
    const dispatch = useDispatch();

    const { Category } = useSelector((state) => state.Category)
    useEffect(() => {
        const FetchData = async () => {
            dispatch(CategoryAction.Fetch_Category_Request())
            try {
                const result = await axios.get('http://localhost:5000/api/category/get');
                dispatch(CategoryAction.Fetch_Category_Success(result.data));
            } catch (error) {
                dispatch(CategoryAction.Fetch_Category_Fails(getError(error)));
            }
        };
        FetchData();
    }, [dispatch]);
    return (
        <>
            <div className='grid grid-cols-2 gap-4'>
                <div>
                    <label className="text-sm py-3 font-light font-serif text-gray-500">Select an option</label>
                    <select onChange={props.onChange} id="category" value={props.valuecat} name='category' className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none">
                    <option value=''>---Choose One ---</option>
                        {Category.map((cat) => (
                            <option key={cat._id} value={cat._id}>{cat.category}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="text-sm py-3 font-light font-serif text-gray-500">Select an option</label>
                    <select onChange={props.onChange} id="category" value={props.valuesub} name='subcategory' className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none">
                    <option value=''>---Choose One ---</option>
                        {Category.map((cat) => (
                            cat.subcategory.map((child) => (
                                <option key={child} value={child}>{child}</option>
                            ))
                        ))}
                    </select>
                </div>
            </div>
        </>
    )
}

export default Category
