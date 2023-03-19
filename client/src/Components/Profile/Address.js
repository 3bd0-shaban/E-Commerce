import React, { useEffect, useState } from 'react'
import cities from '../Home/Cities.json'
const Address = () => {
  const [inputs, setInputs] = useState({
    city: '', state: '', zipCode: '', PhoneNumber: '', area: '', nearestlandmark: ''
  });
  const [subRegions, setSubRegions] = useState([]);
  const handleChange = ({ currentTarget: input }) => {
    setInputs({ ...inputs, [input.name]: input.value });
  };
  useEffect(() => {
    const city = cities.find(p => p.name_en === inputs.city);
    if (city) setSubRegions(city.subregions)
  }, [inputs.city]);
  return (
    <div className='container select-none max-w-8xl'>
      <p className='font-meduim text-2xl mb-3'>Billing Address</p><hr />
      <div className='w-full my-7'>
        <label className='text-sm py-3 font-light font-serif text-gray-500'>Phone Number</label>
        <input type='text' onChange={handleChange} value={inputs.PhoneNumber} name='PhoneNumber' className='inputfield !py-6 !w-full' placeholder='' />
        <label className='text-sm py-3 font-light font-serif text-gray-500'>Building name/no</label>

        <input type='text' onChange={handleChange} value={inputs.cities} name='cities' className='inputfield !py-6 !w-full' placeholder='' />
        <label className='text-sm py-3 font-light font-serif text-gray-500'>Building name/no</label>
        <input type='text' onChange={handleChange} value={inputs.cities} name='cities' className='inputfield !py-6 !w-full' placeholder='' />
        <div className='grid grid-cols-1 xl:grid-cols-2 gap-5'>
          <div>
            <label className='text-sm py-3 font-light font-serif text-gray-500'>Building name/no</label>
            <input type='text' onChange={handleChange} value={inputs.cities} name='cities' className='inputfield !py-6 !w-full' placeholder='' />
          </div>
          <div>
            <label className='text-sm py-3 font-light font-serif text-gray-500'>Zip Code</label>
            <input type='number' onChange={handleChange} value={inputs.cities} name='cities' className='inputfield !py-6 !w-full' placeholder='' />
          </div>
        </div>
        <div className='grid grid-cols-2 gap-5'>
          <div>
            <label className='text-sm py-3 font-light font-serif text-gray-500'>Building name/no</label>
            <select type='text' onChange={handleChange} value={inputs.city} name='city' className='inputfield !py-6 !w-full capitalize !text-base !font-meduim !text-gray-600'>
              <option value=''> --- Choose One --- </option>
              {cities?.map(city => (
                <option key={city.id} value={city.name_en} className='capitalize text-xl font-meduim py-2 my-2 hover:bg-gray-600'>{city.name_en}</option>
              ))}
            </select>
          </div>
          <div>
            <label className='text-sm py-3 font-light font-serif text-gray-500'>Building name/no</label>
            <select type='text' onChange={handleChange} value={inputs.state} name='state' className='inputfield !py-6 !w-full capitalize !text-base !font-meduim !text-gray-600'>
              <option value=''> --- Choose One --- </option>
              {subRegions?.map(city => (
                <option key={city.id} value={city.name_en} className='capitalize text-xl font-meduim py-2 my-2 hover:bg-gray-600'>{city.name_en}</option>
              ))}
            </select>
          </div>
        </div>
        <label className='text-sm py-3 font-light font-serif text-gray-500'>City/Area</label>
        <input type='text' onChange={handleChange} value={inputs.area} name='area' className='inputfield !py-6 !w-full' placeholder='' />
        <label className='text-sm py-3 font-light font-serif text-gray-500'>Nearest landmark ( optional )</label>
        <input type='text' onChange={handleChange} value={inputs.nearestlandmark} name='nearestlandmark' className='inputfield !py-6 !w-full' placeholder='' />
      </div>
    </div>
  )
}

export default Address
