import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineCloudUpload } from 'react-icons/hi'
import { Success, Danger } from './../../Alerts';
import { Upload_New_Brand, Fetch_Brand } from './../../../Redux/Actions/BrandAction';
import { BsTrash } from 'react-icons/bs';
import ModalConfirm from './Sub_Layouts/ModalConfirm';
import { FeaturesAction } from '../../../Redux/Slices/FeaturesSlice';
import BrandInfo from './Sub_Layouts/BrandInfo';
const AddBrand = () => {
  const { error, success, loading, Brand } = useSelector((state) => state.Brand);
  const { IsModalConfirm } = useSelector(state => state.Features)
  const [id, setId] = useState('');
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    brand: '', des: ''
  });
  const [image, setImage] = useState([]);
  const loadFile = (e) => {
    for (const file of e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result);
      }
    }
  }
  const handleChange = ({ currentTarget: input }) => {
    setInputs({ ...inputs, [input.name]: input.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { brand, des } = inputs
    dispatch(Upload_New_Brand(brand, des, image));
  }
  const PreviewImeges = (props) => {
    return (
      <>
        <img className='relative object-cover max-h-40 rounded-lg' src={props.img} alt='' />
        <button className='text-red-500 font-semibold hover:underline mt-3 ml-auto block' onClick={props.onClick}>Remove Image</button>
      </>
    )
  }
  useEffect(() => {
    dispatch(Fetch_Brand());
    setImage('')
    setInputs({ brand: '', des: '' });
  }, [dispatch]);

  return (
    <>
      {error && <Danger error={error} className={'container'} />}
      {success && <Success error={success} className={'container'} />}
      {IsModalConfirm && <ModalConfirm onCancel={() => dispatch(FeaturesAction.Show_ModalConfirm(false))} />}
      {<BrandInfo id={id} />}
      <div className='container px-0 max-w-8xl mt-10'>

        <div className='grid grid-cols-1 lg:grid-cols-3 lg:gap-8'>
          <div className='rounded-lg lg:border lg:px-10 col-span-1 max-h-[52rem]'>
            <form onSubmit={handleSubmit} className='px-6 rounded-xl py-8'>
              <div className='mt-4'>
                <label className='text-sm py-3 font-light font-serif text-gray-500'>Brand Name</label>
                <input onChange={handleChange} value={inputs.brand} name='brand' className='inputfield w-full' type='text' placeholder='Add Brand Name' />
                <label className='text-sm py-3 font-light font-serif text-gray-500'>Discription</label>
                <input onChange={handleChange} value={inputs.des} name='des' min='0' className='inputfield w-full' type='text' placeholder='Add Some Words discribing the brand' />
              </div>
              <p className='my-4 font-serif text-lg'>Add Image</p>
              <div className="flex justify-center items-center w-full">
                <label className="flex flex-col justify-center items-center w-full h-64 mb-3 bg-gray-50 rounded-lg border border-slate-400 border-dashed cursor-pointer">
                  <div className="flex flex-col justify-center items-center pt-5 pb-6">
                    <HiOutlineCloudUpload style={{ fontSize: '3.5rem', color: 'rgb(156 163 175)' }} />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                  </div>
                  <input onChange={loadFile} name='image' accept='image/*' id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>
              {image && <PreviewImeges img={image} onClick={() => setImage(image.filter((e) => e !== image))} />}
              <button type='submit' className='bg-green-500 py-2 my-3 px-3 rounded-lg text-white font-semibold w-1/2 focus:ring focus:ring-green-400 mt-5 mb-10'>{loading ? 'Uploading ......' : 'Submit'}</button>
            </form>

          </div>
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-5 col-span-2">
            <div className='grid grid-cols-4 gap-5 px-5'>
              {Brand?.map((old) => (
                <div key={old._id} onClick={() => dispatch(FeaturesAction.Show_SideBrandInfo())}>
                  <div onClick={() => setId(old._id)} className='border shadow-sm text-center rounded-lg py-5 cursor-pointer relative'>
                    <div className='py-3 px-5'>
                      <img src={old.image.url} alt='' className='w-full h-36 object-cover py-4 mx-auto' /><hr />
                      <button className='text-gray-500 font-semibold hover:underline mt-3 ml-auto block absolute top-0 right-0 mx-3 text-xl' onClick={() => dispatch(FeaturesAction.Show_ModalConfirm(true))} ><BsTrash /></button>
                      <p className='text-lg font-serif font-semibold text-gray-500 mt-3'>{old.brand}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
// onClick={()=>{const id = old._id;dispatch(Delete_Brand(id))}}
export default AddBrand
