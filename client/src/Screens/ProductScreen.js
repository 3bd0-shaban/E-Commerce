import React from 'react'
import { useParams } from 'react-router-dom';
// import  data  from '../data';

const ProductScreen = () => {
    const params = useParams();
    const { id } = params;
  return (
    <div>
      {id}
    </div>
  )
}

export default ProductScreen
