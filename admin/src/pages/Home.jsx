import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'

const Home = () => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      
    
      <div className="flex flex-col items-center justify-center text-center px-6 translate-y-12">

        
        <div className="mb-6 w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center shadow-sm">
          <div className="w-7 h-7 rounded-full border-2 border-blue-600"></div>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
          {aToken ? 'Admin Dashboard' : 'Doctor Dashboard'}
        </h1>

        <div className="mt-4 mb-5 w-20 h-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"></div>

        <p className="max-w-xl text-base sm:text-lg text-gray-600 leading-relaxed">
          {aToken
            ? 'Manage doctors and appointments efficiently with a centralized system.'
            : 'Access your schedule, manage appointments, and deliver better care.'}
        </p>

      </div>
    </div>
  )
}

export default Home