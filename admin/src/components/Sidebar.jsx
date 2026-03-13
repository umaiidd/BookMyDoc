import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  return (
    <aside className="min-h-screen bg-white border-r border-gray-100 shadow-sm sticky top-0 w-56 shrink-0">

      {aToken && (
        <ul className="flex flex-col gap-1 p-3 pt-6">
          <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest px-3 mb-2">Admin</p>

          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 border border-blue-100'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
              }`}
          >
            <img src={assets.home_icon} alt="" className="w-4 h-4 opacity-70" />
            <p>Dashboard</p>
          </NavLink>

          <NavLink
            to="/all-appointments"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 border border-blue-100'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
              }`}
          >
            <img src={assets.appointment_icon} alt="" className="w-4 h-4 opacity-70" />
            <p>Appointments</p>
          </NavLink>

          <NavLink
            to="/add-doctor"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 border border-blue-100'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
              }`}
          >
            <img src={assets.add_icon} alt="" className="w-4 h-4 opacity-70" />
            <p>Add Doctor</p>
          </NavLink>

          <NavLink
            to="/doctor-list"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 border border-blue-100'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
              }`}
          >
            <img src={assets.people_icon} alt="" className="w-4 h-4 opacity-70" />
            <p>Doctors List</p>
          </NavLink>
        </ul>
      )}

      {dToken && (
        <ul className="flex flex-col gap-1 p-3 pt-6">
          <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest px-3 mb-2">Doctor</p>

          <NavLink
            to="/doctor-dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 border border-blue-100'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
              }`}
          >
            <img src={assets.home_icon} alt="" className="w-4 h-4 opacity-70" />
            <p>Dashboard</p>
          </NavLink>

          <NavLink
            to="/doctor-appointments"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 border border-blue-100'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
              }`}
          >
            <img src={assets.appointment_icon} alt="" className="w-4 h-4 opacity-70" />
            <p>Appointments</p>
          </NavLink>

          <NavLink
            to="/doctor-profile"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 border border-blue-100'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
              }`}
          >
            <img src={assets.people_icon} alt="" className="w-4 h-4 opacity-70" />
            <p>Profile</p>
          </NavLink>
        </ul>
      )}
    </aside>
  )
}

export default Sidebar