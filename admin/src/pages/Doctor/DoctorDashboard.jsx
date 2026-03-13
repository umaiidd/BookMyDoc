import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const DoctorDashboard = () => {

  const { dashData, setDashData, getDashData, dToken } = useContext(DoctorContext)
  const {currency} = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getDashData()
    }
  }, [dToken])

  return dashData && (
    <div className='w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50/30 p-5 sm:p-8 lg:p-12'>
      <div className='max-w-7xl mx-auto'>
        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'>
          {/* Earnings Card */}
          <div className='bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300'>
            <div className='flex items-center gap-4'>
              <img className='w-14 h-14' src={assets.earning_icon} alt="earnings" />
              <div>
                <h3 className='text-3xl font-bold text-gray-800'>{currency}{dashData.earnings}</h3>
                <p className='text-gray-600 font-medium text-sm'>Earnings</p>
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
                    Patient
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                    Payment
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                    Date & Time
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
                    {/* Patient Info */}
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-3'>
                        <img
                          className='w-10 h-10 rounded-full object-cover border-2 border-gray-200'
                          src={item.userData.image}
                          alt={item.userData.name}
                        />
                        <div>
                          <p className='font-semibold text-gray-800 text-sm'>
                            {item.userData.name}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Payment */}
                    <td className='px-6 py-4'>
                      <p className='text-gray-600 text-sm font-medium'>
                        {currency}{item.amount}
                      </p>
                    </td>

                    {/* Date & Time */}
                    <td className='px-6 py-4'>
                      <div className='flex flex-col gap-1'>
                        <div className='flex items-center gap-2 text-gray-700'>
                          <svg className='w-4 h-4 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                          </svg>
                          <span className='font-medium text-sm'>{item.slotDate}</span>
                        </div>
                        <div className='flex items-center gap-2 text-gray-600'>
                          <svg className='w-4 h-4 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                          </svg>
                          <span className='text-xs'>{item.slotTime}</span>
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className='px-6 py-4 text-center'>
                      {item.cancelled ? (
                        <span className='inline-flex items-center gap-1.5 bg-red-100 text-red-700 px-3 py-1.5 rounded-md font-medium text-xs border border-red-200'>
                          <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                          </svg>
                          Cancelled
                        </span>
                      ) : item.isCompleted ? (
                        <span className='inline-flex items-center gap-1.5 bg-green-500 text-white px-3 py-1.5 rounded-md font-medium text-xs border border-blue-200'>
                          <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                          </svg>
                          Completed
                        </span>
                      ) : (
                     <span className='inline-flex items-center gap-1.5 bg-amber-100 text-amber-700 px-3 py-1.5 rounded-md font-medium text-xs border border-amber-200'>
  <svg
    className='w-3.5 h-3.5'
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
    />
  </svg>
  Pending
</span>

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

export default DoctorDashboard