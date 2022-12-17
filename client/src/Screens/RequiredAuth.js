import React from 'react'
import { useLocation,Navigate,Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../Redux/Slices/UserSlice'
const RequiredAuth = () => {
  return (
    <div>
      
    </div>
  )
}

export default RequiredAuth
