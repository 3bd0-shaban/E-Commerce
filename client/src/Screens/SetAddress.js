import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ImSpinner7 } from 'react-icons/im';
import cities from '../Components/Home/Cities.json'
import { useTitle, Header, Footer } from '../Components/Exports'
import { useAddressMutation } from '../Redux/APIs/AddressApi';
const SetAddress = () => {
    useTitle('Verify Email')
    const navigate = useNavigate();
    const userRef = useRef();
    const [inputs, setInputs] = useState({
        city: '', state: '', zipCode: '', PhoneNumber: '', area: '', nearestlandmark: '', street: '', floor: ''
    });
    const handleChange = ({ currentTarget: input }) => {
        setInputs({ ...inputs, [input.name]: input.value });
    };
    const [Address, { isLoading, isError, error }] = useAddressMutation();
    useEffect(() => {
        userRef.current.focus()
    }, []);
    const [subRegions, setSubRegions] = useState([]);
    useEffect(() => {
        const city = cities.find(p => p.name_en === inputs.city);
        if (city) setSubRegions(city.subregions)
    }, [inputs.city]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { city, state, zipCode, PhoneNumber, area, nearestlandmark, street, floor } = inputs;
        const data = { city, state, zipCode, PhoneNumber, area, nearestlandmark, street, floor }
        try {
            await Address(data).unwrap()
            setInputs({ city: '', state: '', zipCode: '', PhoneNumber: '', area: '', nearestlandmark: '', street: '', floor: '' });
            navigate('/');
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Header />
            <div className='container max-w-[90rem] px-0 mt-8'>
                <div className='container grid grid-cols-1 lg:grid-cols-5'>

                    <div className='col-span-1 space-y-3 hidden xl:block'>
                        <p className='text-2xl font-medium text-gray-600'>Add New Address</p>
                        <p className='mt-2 text-base font-semibold text-gray-500 leading-7'>Please provide us with with an address you usually in</p>
                    </div>

                    <form onSubmit={handleSubmit} className='container max-w-8xl col-span-4'>
                        <p className='font-meduim text-2xl mb-3'>Billing Address</p><hr />
                        <div className='w-full my-7'>
                            <label className='text-sm py-3 font-light font-serif text-gray-500'>Phone Number</label>
                            <input type='number' ref={userRef} onChange={handleChange} value={inputs.PhoneNumber} name='PhoneNumber' className='inputfield !w-full' placeholder='' />
                            <label className='text-sm py-3 font-light font-serif text-gray-500'>Street Name</label>

                            <input type='text' onChange={handleChange} value={inputs.street} name='street' className='inputfield !w-full' placeholder='' />
                            <label className='text-sm py-3 font-light font-serif text-gray-500'>Building name/no</label>
                            <input type='text' onChange={handleChange} value={inputs.cities} name='cities' className='inputfield !w-full' placeholder='' />
                            <div className='grid grid-cols-1 xl:grid-cols-2 gap-5'>
                                <div>
                                    <label className='text-sm py-3 font-light font-serif text-gray-500'>Floor, apartment, or villa no.</label>
                                    <input type='text' onChange={handleChange} value={inputs.floor} name='floor' className='inputfield !w-full' placeholder='' />
                                </div>
                                <div>
                                    <label className='text-sm py-3 font-light font-serif text-gray-500'>Zip Code</label>
                                    <input type='number' onChange={handleChange} value={inputs.zipCode} name='zipCode' className='inputfield !w-full' placeholder='' />
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-5'>
                                <div>
                                    <label className='text-sm py-3 font-light font-serif text-gray-500'>City</label>
                                    <select type='text' onChange={handleChange} value={inputs.city} name='city' className='inputfield !w-full capitalize !text-base !font-meduim !text-gray-600'>
                                        <option value=''> --- Choose One --- </option>
                                        {cities?.map(city => (
                                            <option key={city.id} value={city.name_en} className='capitalize text-xl font-meduim py-2 my-2 hover:bg-gray-600'>{city.name_en}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className='text-sm py-3 font-light font-serif text-gray-500'>State</label>
                                    <select type='text' onChange={handleChange} value={inputs.state} name='state' className='inputfield !w-full capitalize !text-base !font-meduim !text-gray-600'>
                                        <option value=''> --- Choose One --- </option>
                                        {subRegions?.map(city => (
                                            <option key={city.id} value={city.name_en} className='capitalize text-xl font-meduim py-2 my-2 hover:bg-gray-600'>{city.name_en}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <label className='text-sm py-3 font-light font-serif text-gray-500'>Area</label>
                            <input type='text' onChange={handleChange} value={inputs.area} name='area' className='inputfield !w-full' placeholder='' />
                            <label className='text-sm py-3 font-light font-serif text-gray-500'>Nearest landmark ( optional )</label>
                            <input type='text' onChange={handleChange} value={inputs.nearestlandmark} name='nearestlandmark' className='inputfield !w-full' placeholder='Enter nearest landmark' />
                            <button type='submit' className='btn-primary my-3 !w-1/2 !py-3 !rounded-3xl !mt-8' disabled={isLoading}>
                                {isLoading ? <span className='flex items-center justify-center text-2xl py-1 animate-spin'><ImSpinner7 /> </span> : 'Submit'}</button>
                            <Link to='/' className='text-blue-800 focus:text-blue-300 text-sm block mx-3 mt-4'>Skip for now ?</Link>
                            {isError && <span className="text-red-500 pb-3 font-poppins font-medium text-center block my-4">{error?.data?.msg}</span>}

                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default SetAddress
