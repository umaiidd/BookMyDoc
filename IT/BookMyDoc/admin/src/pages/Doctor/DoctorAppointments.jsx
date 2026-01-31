import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointment = () => {
  const {dToken, appointments, getAppointments, cancelAppointment, completeAppointment} = useContext(DoctorContext)
  const {calculateAge, slotDateFormat, currency} = useContext(AppContext)

  useEffect(() => {
    if(dToken){
      getAppointments()
    }
  }, [dToken])

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50/30 p-5 sm:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Stats Summary */}
        {appointments && appointments.length > 0 && (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
            {/* Total Appointments */}
            <div className='bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300'>
              <div className='flex items-center gap-4'>
                <div className='bg-blue-100 p-3 rounded-xl'>
                  <svg className='w-8 h-8 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
                  </svg>
                </div>
                <div>
                  <h3 className='text-3xl font-bold text-gray-800'>{appointments.length}</h3>
                  <p className='text-gray-600 font-medium text-sm'>Total Appointments</p>
                </div>
              </div>
            </div>

            {/* Online Payments */}
            <div className='bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300'>
              <div className='flex items-center gap-4'>
                <div className='bg-green-100 p-3 rounded-xl'>
                  <svg className='w-8 h-8 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' />
                  </svg>
                </div>
                <div>
                  <h3 className='text-3xl font-bold text-gray-800'>{appointments.filter(item => item.payment).length}</h3>
                  <p className='text-gray-600 font-medium text-sm'>Online Payments</p>
                </div>
              </div>
            </div>

            {/* Cash Payments */}
            <div className='bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300'>
              <div className='flex items-center gap-4'>
                <div className='bg-amber-100 p-3 rounded-xl'>
                  <svg className='w-8 h-8 text-amber-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z' />
                  </svg>
                </div>
                <div>
                  <h3 className='text-3xl font-bold text-gray-800'>{appointments.filter(item => !item.payment).length}</h3>
                  <p className='text-gray-600 font-medium text-sm'>Cash Payments</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Appointments Table */}
        <div className='bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden'>
          {/* Section Header */}
          <div className='bg-gray-50 px-6 py-5 border-b border-gray-200'>
            <div className='flex items-center justify-between'>
              <div>
                <h2 className='text-2xl font-bold text-gray-800 mb-1'>All Appointments</h2>
                <p className='text-gray-600 text-sm'>Manage your patient appointments</p>
              </div>
              {appointments && appointments.length > 0 && (
                <div className='bg-blue-100 text-blue-800 px-4 py-2 rounded-md font-semibold text-sm border border-blue-200'>
                  {appointments.length} Records
                </div>
              )}
            </div>
          </div>

          {/* Table */}
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-gray-50 border-b border-gray-200'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                    #
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                    Patient
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                    Payment
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                    Age
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                    Date & Time
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                    Fees
                  </th>
                  <th className='px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {appointments && appointments.length > 0 ? (
                  appointments.slice().reverse().map((item, index) => (
                    <tr
                      key={index}
                      className='hover:bg-gray-50 transition-colors duration-150'
                    >
                      {/* Index */}
                      <td className='px-6 py-4'>
                        <span className='text-gray-500 font-medium text-sm'>
                          {appointments.length - index}
                        </span>
                      </td>

                      {/* Patient Info */}
                      <td className='px-6 py-4'>
                        <div className='flex items-center gap-3'>
                          <img
                            src={item.userData.image}
                            alt={item.userData.name}
                            className='w-10 h-10 rounded-full object-cover border-2 border-gray-200'
                          />
                          <div>
                            <p className='font-semibold text-gray-800 text-sm'>
                              {item.userData.name}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Payment Method */}
                      <td className='px-6 py-4'>
                        {item.payment ? (
                          <span className='inline-flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1 rounded-md font-medium text-xs border border-green-200'>
                            <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' />
                            </svg>
                            Online
                          </span>
                        ) : (
                          <span className='inline-flex items-center gap-1.5 bg-amber-100 text-amber-700 px-3 py-1 rounded-md font-medium text-xs border border-amber-200'>
                            <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z' />
                            </svg>
                            Cash
                          </span>
                        )}
                      </td>

                      {/* Age */}
                      <td className='px-6 py-4'>
                        <p className='text-gray-700 text-sm font-medium'>
                          {calculateAge(item.userData.dob)} yrs
                        </p>
                      </td>

                      {/* Date & Time */}
                      <td className='px-6 py-4'>
                        <div className='flex flex-col gap-1'>
                          <div className='flex items-center gap-2 text-gray-700'>
                            <svg className='w-4 h-4 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                            </svg>
                            <span className='font-medium text-sm'>{slotDateFormat(item.slotDate)}</span>
                          </div>
                          <div className='flex items-center gap-2 text-gray-600'>
                            <svg className='w-4 h-4 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                            </svg>
                            <span className='text-xs'>{item.slotTime}</span>
                          </div>
                        </div>
                      </td>

                      {/* Fees */}
                      <td className='px-6 py-4'>
                        <p className='text-gray-900 font-bold text-sm'>
                          {currency}{item.amount}
                        </p>
                      </td>

                      {/* Action Buttons */}
                      <td className='px-6 py-4'>
                        {item.cancelled ? (
                          <div className='flex justify-center'>
                            <span className='inline-flex items-center gap-1.5 bg-red-100 text-red-700 px-3 py-1.5 rounded-md font-medium text-xs border border-red-200'>
                              <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                              </svg>
                              Cancelled
                            </span>
                          </div>
                        ) : item.isCompleted ? (
                          <div className='flex justify-center'>
                            <span className='inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-md font-medium text-xs border border-blue-200'>
                              <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                              </svg>
                              Completed
                            </span>
                          </div>
                        ) : (
                          <div className='flex items-center justify-center gap-2'>
                            <button
                              onClick={() => completeAppointment(item._id)}
                              className='p-2 bg-green-50 hover:bg-green-100 rounded-lg transition-colors border border-green-200 group'
                              title='Mark as Complete'
                            >
                              <img
                                src={assets.tick_icon}
                                alt='Complete'
                                className='w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity'
                              />
                            </button>
                            <button
                              onClick={() => cancelAppointment(item._id)}
                              className='p-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-200 group'
                              title='Cancel Appointment'
                            >
                              <img
                                src={assets.cancel_icon}
                                alt='Cancel'
                                className='w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity'
                              />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan='7' className='px-6 py-16 text-center'>
                      <div className='inline-block p-4 bg-gray-100 rounded-full mb-4'>
                        <svg className='w-10 h-10 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
                        </svg>
                      </div>
                      <h3 className='text-lg font-semibold text-gray-800 mb-1'>No Appointments Found</h3>
                      <p className='text-gray-600 text-sm'>Your appointments will appear here</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorAppointment