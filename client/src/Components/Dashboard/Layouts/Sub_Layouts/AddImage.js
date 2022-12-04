import React from 'react'
import { HiOutlineCloudUpload } from 'react-icons/hi';

const AddImage = (props) => {
    return (
        <div className="flex justify-center items-center w-full py-3">
            <label className={`${props.Hight} flex flex-col justify-center items-center w-full bg-gray-50 rounded-lg border border-slate-400 border-dashed cursor-pointer`}>
                <div className="flex flex-col justify-center items-center pt-5 pb-6">
                    <HiOutlineCloudUpload style={{ fontSize: '3.5rem', color: 'rgb(156 163 175)' }} />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="text-blue-500 font-bold text-sm">Click here to upload images</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input onChange={props.onChange} name='image' accept='image/*' id="dropzone-file" multiple={props.IsMultiple} type="file" className="hidden" />
            </label>
        </div>
    )
}

export default AddImage
