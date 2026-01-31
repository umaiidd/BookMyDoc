import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets'

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  return dashData && (
    <div className='w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50/30 p-5 sm:p-8 lg:p-12'>
      <div className='max-w-7xl mx-auto'>
        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'>
          {/* Doctors Card */}
          <div className='bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300'>
            <div className='flex items-center gap-4'>
              <img className='w-14 h-14' src={assets.doctor_icon} alt="doctors" />
              <div>
                <h3 className='text-3xl font-bold text-gray-800'>{dashData.doctors}</h3>
                <p className='text-gray-600 font-medium text-sm'>Doctors</p>
              </div>
            </div>
          </div>

          {/* Appointments Card */}
          <div className='bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300'>
            <div className='flex items-center gap-4'>
              <img className='w-14 h-14' src={assets.appointments_icon} alt="appointments" />
              <div>
                <h3 className='text-3xl font-bold text-gray-800'>{dashData.appointments}</h3>
                <p className='text-gray-600 font-medium text-sm'>Appointments</p>
              </div>
            </div>
          </div>

          {/* Patients Card */}
          <div className='bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300'>
            <div className='flex items-center gap-4'>
              <img className='w-14 h-14' src={assets.patients_icon} alt="patients" />
              <div>
                <h3 className='text-3xl font-bold text-gray-800'>{dashData.patients}</h3>
                <p className='text-gray-600 font-medium text-sm'>Patients</p>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Bookings Section */}
        <div className='bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden'>
          {/* Section Header */}
          <div className='bg-gray-50 px-6 py-5 border-b border-gray-200'>
            <div className='flex items-center justify-between'>
              <div>
                <h2 className='text-2xl font-bold text-gray-800 mb-1'>Latest Appointments</h2>
                <p className='text-gray-600 text-sm'>Recent booking records</p>
              </div>
              <div className='bg-blue-100 text-blue-800 px-4 py-2 rounded-md font-semibold text-sm border border-blue-200'>
                {dashData.latestAppointments.length} Records
              </div>
            </div>
          </div>

          {/* Bookings Table */}
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-gray-50 border-b border-gray-200'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                    Doctor
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                    Specialization
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                    Date
                  </th>
                  <th className='px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {dashData.latestAppointments.map((item, index) => (
                  <tr 
                    key={index} 
                    className='hover:bg-gray-50 transition-colors duration-150'
                  >
                    {/* Doctor Info */}
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-3'>
                        <img 
                          className='w-10 h-10 rounded-full object-cover border-2 border-gray-200' 
                          src={item.docData.image} 
                          alt={item.docData.name} 
                        />
                        <div>
                          <p className='font-semibold text-gray-800 text-sm'>
                            {item.docData.name}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Specialization */}
                    <td className='px-6 py-4'>
                      <p className='text-gray-600 text-sm'>
                        {item.docData.speciality || 'General Physician'}
                      </p>
                    </td>

                    {/* Date */}
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-2 text-gray-700'>
                        <svg className='w-4 h-4 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                        </svg>
                        <span className='font-medium text-sm'>{item.slotDate}</span>
                      </div>
                    </td>

                    {/* Status */}
   <td className='px-6 py-4 text-center'>
  {item.cancelled === true ? (
    <p className='text-red-400 text-xs font-medium'>Cancelled</p>
  ) : item.isCompleted === true ? (
    <p className='text-green-500 text-xs font-medium'>Completed</p>
  ) : (
    <p className='text-yellow-500 text-xs font-medium'>Pending</p>
  )}
</td>


                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {dashData.latestAppointments.length === 0 && (
            <div className='px-6 py-16 text-center border-t border-gray-200'>
              <div className='inline-block p-4 bg-gray-100 rounded-full mb-4'>
                <svg className='w-10 h-10 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
                </svg>
              </div>
              <h3 className='text-lg font-semibold text-gray-800 mb-1'>No Appointments Found</h3>
              <p className='text-gray-600 text-sm'>New appointments will be displayed here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard