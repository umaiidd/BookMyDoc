import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import {assets} from '../../assets/assets'

const AllAppointments = () => {

  const { aToken, appointments, getAllAppointments,cancelAppointment } = useContext(AdminContext)
  const {calculateAge, slotDateFormat, currency} = useContext(AppContext)


  
  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken, getAllAppointments])

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        
        {/* Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b font-medium">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {/* Rows */}
        {appointments.reverse().map((item, index) => (
          <div
            key={item._id || index}
            className="grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center py-3 px-6 border-b"
          >
            <p>{index + 1}</p>

            {/* Patient */}
            <div className="flex items-center gap-2">
              <img
                src={item.userData.image}
                alt="patient"
                className="w-8 h-8 rounded-full object-cover"
              />
              <p>{item.userData.name}</p>
            </div>

            {/* Age */}
            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>

      
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

            <div className="flex items-center gap-2">
              <img
                src={item.docData.image}
                alt="doctor"
                className="w-8 h-8 rounded-full object-cover"
              />
              <p>{item.docData.name}</p>
            </div>
            {/* Fees */}
            <p>{currency}{item.amount}</p>
            {item.cancelled ?
            <p className='text-red-400 text-xs font-medium'>Cancelled</p>
          :
          item.isCompleted ?
          <p className='text-green-500 text-xs font-medium'>Completed</p> :
           <img onClick={()=>cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="cancel button" />
          }

            {/* Actions */}
       
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllAppointments
