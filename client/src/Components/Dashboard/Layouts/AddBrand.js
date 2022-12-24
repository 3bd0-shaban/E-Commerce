import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { ImSpinner7 } from 'react-icons/im'
import { useGetBrandQuery, useCreateBrandMutation } from '../../../Redux/APIs/BrandApi';
import { Success, Danger } from './../../Alerts';
import { FeaturesAction } from '../../../Redux/Slices/FeaturesSlice';
import { BrandInfo, AddImage } from '../../Exports';
const AddBrand = () => {
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
  const { brand, des } = inputs
  const values = { image, brand, des }
  const handleChange = ({ currentTarget: input }) => {
    setInputs({ ...inputs, [input.name]: input.value });
  };
  const { data, isFetching, isError: error } = useGetBrandQuery();

  const [createBrand, { isLoading, isSuccess }] = useCreateBrandMutation();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!inputs || !image) return {};
    await createBrand(values).unwrap()
      .then((payload) => {
        setInputs({ brand: '', des: '' });
        setImage('');
      })
      .catch((error) => console.log(error.data.msg));

  }
  const PreviewImeges = (props) => {
    return (
      <>
        <img className='relative object-cover max-h-40 rounded-lg' src={props.img} alt='' />
        <button className='text-red-500 font-semibold hover:underline mt-3 ml-auto block' onClick={props.onClick}>Remove Image</button>
      </>
    )
  }
  return (
    <>
      {error && <Danger error={error?.data?.msg || 'An error accured'} className={'container my-5'} />}
      {isSuccess && <Success error={'Brand Added Successfully'} className={'container max-w-full px-0 xl:pr-10 my-5'} />}
      {<BrandInfo id={id} />}
      <div className='container px-0 max-w-full mt-10'>
        <div className='grid grid-cols-1 lg:grid-cols-4 lg:gap-8'>
          <div className='rounded-lg lg:border lg:px-10 col-span-1 max-h-[52rem]'>
            <form onSubmit={handleSubmit} className='px-6 rounded-xl py-8'>
              <div className='mt-4'>
                <label className='text-sm py-3 font-light font-serif text-gray-500'>Brand Name</label>
                <input onChange={handleChange} value={inputs.brand} name='brand' className='inputfield w-full' type='text' placeholder='Add Brand Name' />
                <label className='text-sm py-3 font-light font-serif text-gray-500'>Discription</label>
                <input onChange={handleChange} value={inputs.des} name='des' min='0' className='inputfield w-full' type='text' placeholder='Add Some Words discribing the brand' />
              </div>
              <p className='my-4 font-serif text-lg'>Add Image</p>
              <AddImage onChange={loadFile} />

              {image && <PreviewImeges img={image} onClick={() => setImage()} />}
              <button type='submit' className='btn-success' disabled={isLoading}>
                {isLoading ? <span className='flex items-center justify-center text-2xl py-1 animate-spin'><ImSpinner7 /> </span> : 'Submit'}</button>
            </form>

          </div>
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-5 col-span-3 xl:mx-10 xl:px-10">
            <div className={error ? 'px-0' : 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 xxl:grid-cols-4 gap-5 px-5'}>
              {isFetching ? <p>Loading ........</p> :
                error ? <Danger error={error?.data?.msg || 'Can not display Brands'} className={'container my-5'} /> :
                  data &&
                  data?.map((old) => (
                    <div key={old?._id} onClick={() => dispatch(FeaturesAction.Show_SideBrandInfo())}>
                      <div onClick={() => setId(old?._id)} className='border shadow-sm text-center rounded-lg py-5 cursor-pointer relative'>
                        <div className='py-3 px-5'>
                          <img src={old?.image.url} alt='' className='w-full h-36 object-contain py-4 mx-auto' /><hr className='my-3' />
                          <p className='text-lg font-serif font-semibold text-gray-500 mt-3'>{old?.brand}</p>
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
export default AddBrand
