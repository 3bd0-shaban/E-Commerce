"use client";
import React, { useEffect, useState } from "react";
import { useGetCategoryQuery } from "@Redux/APIs/CategoryApi";
import { categoryType, subCategoryType } from "@lib/types/category";
interface CategoryProps {
    valuecat: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    valuesub: string;
}
const Category: React.FC<CategoryProps> = ({
    valuecat,
    onChange,
    valuesub,
}) => {
    const [SubCat, setSubCat] = useState<subCategoryType[]>([]);
    const { data: Category } = useGetCategoryQuery() || {};
    useEffect(() => {
        const sub = Category?.find((p) => p._id === valuecat) as categoryType;
        setSubCat(sub?.subcategory);
    }, [Category, valuecat]);
    return (
        <>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-sm py-3 font-light font-serif text-gray-500">
                        Select Category
                    </label>
                    <select
                        onChange={onChange}
                        id="category"
                        value={valuecat}
                        name="category"
                        className="bg-gray-50 border mt-2 border-gray-300
                     text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                    >
                        <option value=""> --- Choose One --- </option>
                        {Category?.map((cat) => (
                            <option key={cat._id} id={cat._id} value={cat._id}>
                                {cat.category}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="text-sm py-3 font-light font-serif text-gray-500">
                        Select Sub Category
                    </label>
                    <select
                        onChange={onChange}
                        id="category"
                        value={valuesub}
                        name="subcategory"
                        className="bg-gray-50 border mt-2 border-gray-300
                     text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                    >
                        <option value=""> --- Choose One --- </option>
                        {SubCat?.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                                {cat.nameOfSub}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    );
};

export default Category;
