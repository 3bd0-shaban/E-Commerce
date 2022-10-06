import React from 'react'

export const Danger = (props) => {
  return (
    <div>
      <p className={props.className}>{props.error}</p>
    </div>
  )
};
export const Warning = (props) => {
  return (
    <div>
      <p className='mx-auto mt-20 text-7xl font-serif font-semibold bg-yellow-200 py-3 px-5'>{props.error}</p>
    </div>
  );
}
export const Success = (props) => {
  return (
    <div>
      <p className='mx-auto mt-20 text-7xl font-serif font-semibold bg-green-200 py-3 px-5'>{props.error}</p>
    </div>
  )
}


