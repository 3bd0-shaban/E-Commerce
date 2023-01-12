import React, { useEffect, useState } from 'react'
import { useGetCategoryQuery } from '../../../Redux/APIs/CategoryApi';
const Category = (props) => {
    const [SubCat, setSubCat] = useState([]);
    const [ID, SetID] = useState([]);
    const { data: Category } = useGetCategoryQuery() || {};
    const getId = (e) => {
        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index];
        SetID(el.getAttribute('id'));
        // props.OnChange
    }
    useEffect(() => {
        const sub = Category?.find(p => p._id === ID)
        setSubCat(sub?.subcategory)
    }, [Category, ID])
    return (
        <>
            <div className='grid grid-cols-2 gap-4'>
                <div>
                    <label className="text-sm py-3 font-light font-serif text-gray-500">Select Category</label>
                    <select onChange={getId} id="category" value={props.valuecat} name='category' className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none">
                        <option value=''> --- Choose One --- </option>
                        {Category &&
                            Category?.map((cat) => (
                                <option key={cat._id} id={cat._id} value={cat._id} onChange={() => setSubCat(cat.subcategory)}>{cat.category}</option>
                            ))}
                    </select>
                </div>
                <div>
                    <label className="text-sm py-3 font-light font-serif text-gray-500">Select Sub Category</label>
                    <select onChange={props.onChange} id="category" value={props.valuesub} name='subcategory' className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none">
                        <option value=''> --- Choose One --- </option>
                        {SubCat &&
                            SubCat?.map((cat) => (
                                <option key={cat._id} value={cat._id}>{cat.nameOfSub}</option>
                            ))}
                    </select>
                </div>
            </div>
        </>
    )
}

export default Category
