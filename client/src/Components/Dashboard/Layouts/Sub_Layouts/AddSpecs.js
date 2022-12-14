import { useState } from "react";
import { BsTrash } from 'react-icons/bs'
const AddSpecs = () => {
    const [title, setTitle] = useState();
    const [tags, setTags] = useState([]);
    console.log(tags)
    const addTag = e => {
        e.preventDefault();
        e.stopPropagation();
        const tag = title;
        setTitle('');
        if (tags.includes(tag)) return;
        setTags(tags => ([...tags, tag]));
    };
    return (
        <div className="mt-5">
            {tags?.map((tag, index) => (
                <div key={index} className="grid grid-cols-2 items-center gap-8 ">
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-medium truncate">{tag}</span>
                        <button onClick={() => setTags(tags => tags.filter(t => t !== tag))}><BsTrash /></button>
                    </div>
                </div>
            ))}
            <div className='flex gap-5 items-center'>
                <input className="inputfield w-full" onChange={e => setTitle(e.target.value)}
                    type="text" value={title} name='title' placeholder="Enter a title for a specification …" />
                <button onClick={addTag} className="border rounded-xl px-5 py-0 h-14 hover:bg-gray-200 focus:bg-gray-300" >+</button>
            </div>
        </div>
    )
}
export default AddSpecs
