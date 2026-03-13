import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import {useNavigate} from 'react-router-dom'

const MyAppointments = () => {

  const { backendUrl, token, getDoctorsData } = useContext(AppContext)

  const [appointments, setAppointments] = useState([])
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ]


  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('-')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }

  const navigate = useNavigate()
  const getUserAppointments = async () => {
    try {

      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })

      if (data.success) {
        setAppointments([...data.appointments].reverse())
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/cancel-appointment',
        { appointmentId },
        { headers: { token } }
      )

      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

const initPay = (order) =>{

const options = {
  key:import.meta.env.VITE_RAZORPAY_KEY_ID,
  amount:order.amount,
  currency:order.currency,
  name:'Appointment Payment',
  description:'Appointment Payment',
  order_id:order.id,
  receipt:order.receipt,
  handler:async (response) =>{
    console.log(response)
    try {
      const {data} = await axios.post(backendUrl+ '/api/user/verifyRazorpay',response,{headers:{token}})
      if(data.success){
        getUserAppointments()
        navigate('/my-appointments')
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  } 
}
const rzp = new window.Razorpay(options)
rzp.open()

}

  const appointmentRazorpay = async (appointmentId)=>{
try {
  console.log("button clicked")
const {data} = await axios.post(backendUrl+'/api/user/payment-razorpay',{appointmentId},{headers:{token}})

if(data.success){
  initPay(data.order)
}

} catch (error) {
   console.log(error)
      toast.error(error.message)
}
  }


  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h2 className="text-4xl font-bold text-blue-900 mb-2">
            My Appointments
          </h2>
          <p className="text-blue-600">View and manage your upcoming medical appointments</p>
        </div>

        <div className="space-y-6">
          {appointments.slice(0, 5).map((item, index) => (
            <div
              key={index}
              className="group relative flex flex-col md:flex-row gap-6 bg-white shadow-md hover:shadow-xl rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
            >

              {/* Doctor Image */}
              <div className="flex-shrink-0">
                <img
                  src={item.docData.image}
                  alt={item.docData.name}
                  className="w-36 h-36 rounded-xl object-cover border border-gray-200 group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Doctor Info */}
              <div className="flex-1 text-gray-700 space-y-3">
                <div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">
                    {item.docData.name}
                  </p>
                  <p className="inline-block text-sm font-medium text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                    {item.docData.speciality}
                  </p>
                </div>

                <div className="text-sm space-y-1">
                  <p className="font-medium text-gray-600">Address:</p>
                  <p className="text-gray-700">{item.docData.address.line1}</p>
                  <p className="text-gray-700">{item.docData.address.line2}</p>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-700">
                    <span className="font-medium text-gray-600">Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex md:flex-col gap-3 justify-end items-end">
                {!item.cancelled && !item.payment && !item.isCompleted && (
                  <button 
                  
                    onClick={() => appointmentRazorpay(item._id)} 
                    className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    Pay Online
                  </button>
                )}

                {!item.cancelled && item.payment && !item.isCompleted && (
                  <button 
                    className="px-6 py-3 text-sm font-medium text-green-600 bg-green-50 border border-green-300 rounded-lg cursor-not-allowed"
                    disabled
                  >
                    ✓ Paid
                  </button>
                )}

                {!item.cancelled && !item.isCompleted && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="px-6 py-3 text-sm font-medium text-blue-600 bg-white border border-blue-300 rounded-lg hover:bg-blue-50 shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    Cancel
                  </button>
                )}

                {item.cancelled && !item.isCompleted && (
                  <button className="sm:min-w-48 px-6 py-3 text-sm font-medium text-red-500 bg-gray-100 border border-gray-300 rounded-lg cursor-not-allowed">
                    Appointment Cancelled
                  </button>
                )}

                {item.isCompleted && (
                  <button className="sm:min-w-48 px-6 py-3 text-sm font-medium text-green-600 bg-green-50 border border-green-300 rounded-lg cursor-not-allowed">
                    Completed
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {appointments.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-md">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Appointments Yet</h3>
            <p className="text-gray-500">Your upcoming appointments will appear here</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyAppointments