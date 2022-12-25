import React, { useState } from 'react'
import { FeaturesAction } from './../../../../Redux/Slices/FeaturesSlice';
import { RiMoreFill } from 'react-icons/ri';
import PendingSideBar from './SubLayouts/PendingSideBar';
import { useTitle } from '../../../Exports';
import { useDispatch } from 'react-redux';
import { useGetDeliveredOrderQuery } from '../../../../Redux/APIs/OrderApi';
import { Link } from 'react-router-dom';
import moment from 'moment'

const Delevered = () => {
  useTitle('Delevred Orders - Dashboard');
  const [id, setID] = useState('');
  const dispatch = useDispatch();
  const { data: products } = useGetDeliveredOrderQuery();
  return (
    <>

      <PendingSideBar id={id} />
      <table className="w-full text-sm text-left text-gray-500 mt-5">
        <thead className="text-xs text-gray-700 uppercase border-b-2 py-3">
          <tr className='whitespace-nowrap'>
            <th scope="col" className="py-3 px-6">Customer</th>
            <th scope="col" className="py-3 px-6">Baid ?</th>
            <th scope="col" className="py-3 px-6">Price</th>
            <th scope="col" className="py-3 px-6">Date</th>
            <th scope="col" className="py-3 px-6"></th>
          </tr>
        </thead>
        <tbody className='cursor-pointer' onClick={() => dispatch(FeaturesAction.Show_sideOrderInfo(true))}>
          {products &&
            products?.map(product =>
              <tr className="bg-white border-b hover:bg-gray-50" key={product._id} onClick={() => setID(product._id)}>
                <td className="py-4 px-6 w-[20%]">{`${product.user.firstname} ${product.user.lastname}`}</td>
                {product.CashOnDelivery ?
                  <td className="py-4 px-6"><span className='text-green-500 bg-green-200 rounded-lg font-semibold text-base px-5 py-2'>True</span></td>
                  :
                  <td className="py-4 px-6"><span className='text-red-500 bg-red-200 rounded-lg font-semibold text-base px-5 py-2'>False</span></td>}
                <td className="py-4 px-6 text-base font-semibold">{product.totalPrice} EGP</td>
                <td className="py-4 px-6">{moment(product.createdAt).calendar()}</td>
                <td className="py-4 px-6 flex items-center">
                  <Link to="" className="font-medium text-blue-600 text-3xl hover:underline mr-3"><RiMoreFill /></Link>
                </td>
              </tr>
            )}
        </tbody>
      </table>
    </>
  )
}

export default Delevered
