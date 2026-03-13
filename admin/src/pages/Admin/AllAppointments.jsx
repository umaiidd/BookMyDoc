import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) getAllAppointments()
  }, [aToken, getAllAppointments])

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 w-full">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">All Appointments</h1>
          <p className="text-sm text-gray-400 mt-0.5">{appointments.length} total appointments</p>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-3 sm:px-4 py-2">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-xs font-semibold text-blue-600">
            {appointments.filter(a => !a.cancelled && !a.isCompleted).length} Active
          </span>
        </div>
      </div>

      {/* Table Card */}
      <div className="w-full bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">

        {/* Desktop Table Header */}
        <div className="hidden md:grid grid-cols-[0.4fr_2fr_1fr_2fr_2fr_1fr_1.2fr] px-5 py-3.5 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
          {['#', 'Patient', 'Age', 'Date & Time', 'Doctor', 'Fees', 'Status'].map((col) => (
            <p key={col} className={`text-[11px] font-bold text-gray-400 uppercase tracking-wider ${col === 'Doctor' || col === 'Patient' ? 'pl-10' : ''}`}>{col}</p>
          ))}
        </div>

        {/* Rows */}
        <div className="max-h-[72vh] overflow-y-auto">
          {appointments.slice().reverse().map((item, index) => (
            <div
              key={item._id || index}
              className="grid grid-cols-[0.4fr_2fr_1fr_2fr_2fr_1fr_1.2fr] max-md:grid-cols-1 items-center px-5 py-3.5 border-b border-gray-50 hover:bg-gray-50/60 transition-colors"
            >

              {/* Mobile card header */}
              <div className="hidden max-md:flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-400">#{index + 1}</span>
                {item.cancelled ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-50 text-red-500 border border-red-100">Cancelled</span>
                ) : item.isCompleted ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-50 text-green-600 border border-green-100">Completed</span>
                ) : (
                  <button onClick={() => cancelAppointment(item._id)} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-50 text-gray-500 border border-gray-200 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all">Cancel</button>
                )}
              </div>

              {/* Index — desktop only */}
              <p className="text-xs font-semibold text-gray-400 max-md:hidden">{index + 1}</p>

              {/* Patient */}
              <div className="flex items-center gap-2.5">
                <img src={item.userData.image} alt="patient" className="w-8 h-8 rounded-full object-cover border border-gray-100 shrink-0" />
                <p className="text-sm font-semibold text-gray-800 truncate">{item.userData.name}</p>
              </div>

              {/* Age */}
              <p className="text-sm text-gray-500 max-md:hidden">{calculateAge(item.userData.dob)}</p>

              {/* Date & Time */}
              <div className="max-md:mt-1">
                <p className="text-sm text-gray-700 font-medium">{slotDateFormat(item.slotDate)}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">{item.slotTime}</p>
              </div>

              {/* Doctor */}
              <div className="flex items-center gap-2.5 max-md:mt-1">
                <img src={item.docData.image} alt="doctor" className="w-8 h-8 rounded-full object-cover border border-gray-100 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-800 truncate">{item.docData.name}</p>
                  <p className="text-[10px] text-blue-400 truncate">{item.docData.speciality}</p>
                </div>
              </div>

              {/* Fees */}
              <p className="text-sm font-semibold text-gray-700 max-md:mt-1">{currency}{item.amount}</p>

              {/* Status — desktop only */}
              <div className="max-md:hidden">
                {item.cancelled ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-red-50 text-red-500 border border-red-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-green-50 text-green-600 border border-green-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />Completed
                  </span>
                ) : (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-gray-50 text-gray-500 border border-gray-200 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all duration-200 cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {appointments.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">📋</span>
            </div>
            <p className="text-gray-700 font-semibold">No appointments yet</p>
            <p className="text-gray-400 text-sm mt-1">Appointments will appear here once booked</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AllAppointments