import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext)
  const { dToken, setDToken } = useContext(DoctorContext)
  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    if (aToken) {
      setAToken('')
      localStorage.removeItem('aToken')
    }
    if(dToken){
      setDToken('')
      localStorage.removeItem('dToken')
    }
  }

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="w-full pl-6 pr-6 py-4 flex items-center justify-between">
        
        {/* Left: Logo + Title */}
        <div className="flex items-center gap-4">
          <img
            src={assets.admin_logo}
            alt="logo"
            className="w-10 h-10 object-contain"
          />

          <div className="flex flex-col leading-tight">
        
            <span className="text-lg font-semibold text-gray-800">
              {aToken ? 'Admin Panel' : 'Doctor Panel'}
            </span>
          </div>
        </div>

        {/* Right: Logout */}
        <button
          onClick={logout}
          className="px-5 py-2 text-sm font-medium text-red-600 border border-red-500 rounded-lg
                     hover:bg-red-50 transition-colors duration-200"
        >
          Logout
        </button>

      </div>
    </header>
  )
}

export default Navbar

