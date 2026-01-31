import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'

const Appointment = () => {

  const { docId } = useParams()
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const navigate = useNavigate()

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')


  useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" })
}, [])

const bookAppointment = async () => {
  if (!token) {
    toast.warn('Login to Book Appointment')
    return navigate('/login')
  }

  if (!slotTime) {
    return toast.warn('Please select a time slot')
  }

  try {
    const date = docSlots[slotIndex][0].datetime

    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    const slotDate = `${year}-${month}-${day}`

    const { data } = await axios.post(
      backendUrl + '/api/user/book-appointment',
      { docId, slotDate, slotTime },
      { headers: { token } }
    )

    if (data.success) {
      toast.success(data.message)
      getDoctorsData()
      navigate('/my-appointments')
    } else {
      toast.error(data.message)
    }
  } catch (error) {
    console.error(error)
    toast.error(error.response?.data?.message || error.message)
  }
}



  useEffect(() => {
    const info = doctors.find(doc => doc._id === docId)
    setDocInfo(info)
  }, [docId, doctors])

  useEffect(() => {
    if (!docInfo) return

    let slots = []
    let today = new Date()

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      let endTime = new Date(currentDate)
      endTime.setHours(21, 0, 0, 0)

      if (i === 0) {
        currentDate.setHours(Math.max(currentDate.getHours() + 1, 10))
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10, 0, 0, 0)
      }

      let timeSlots = []
while (currentDate < endTime) {

  const slotTime = currentDate.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })

  let day = currentDate.getDate()
  let month = currentDate.getMonth() + 1
  let year = currentDate.getFullYear()

  const slotDate = `${year}-${month}-${day}`

  const isSlotAvailable =
    !docInfo.slots_booked ||
    !docInfo.slots_booked[slotDate] ||
    !docInfo.slots_booked[slotDate].includes(slotTime)

  if (isSlotAvailable) {
    timeSlots.push({
      datetime: new Date(currentDate),
      time: slotTime
    })
  }

  currentDate.setMinutes(currentDate.getMinutes() + 30)
}


      slots.push(timeSlots)
    }

    setDocSlots(slots)
  }, [docInfo])

  if (!docInfo) return null

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">

        {/* Doctor Card */}
        <div className="bg-blue-50 rounded-2xl sm:rounded-3xl p-5 sm:p-8 border flex flex-col md:flex-row gap-6 sm:gap-10 items-center">

          {/* Image */}
          <img
            src={docInfo.image}
            alt="Doctor"
            className="w-48 h-56 sm:w-64 sm:h-72 object-cover rounded-xl"
          />

          {/* Info */}
          <div className="flex-1">
            <p className="text-xl sm:text-3xl font-semibold text-gray-900 flex items-center gap-2">
              {docInfo.name}
              <img src={assets.verified_icon} alt="" className="w-5 h-5 sm:w-6 sm:h-6" />
            </p>

            <p className="text-gray-600 mt-1 text-sm sm:text-lg">
              {docInfo.degree}
              <span className="text-blue-600 font-medium">
                {' '}— {docInfo.speciality}
              </span>
            </p>

            <span className="inline-block mt-3 px-4 py-1.5 rounded-full bg-gray-100 text-sm">
              {docInfo.experience}
            </span>

            <div className="my-5 h-px bg-gray-200" />

            <p className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              About Doctor
              <img src={assets.info_icon} alt="" className="w-5 h-5" />
            </p>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mt-2">
              {docInfo.about}
            </p>

            <p className="text-gray-500 font-medium mt-4">
              Appointment Fee:{' '}
              <span className="text-gray-700">
                {currencySymbol}{docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* Booking Section */}
        <div className="mt-10">
          <p className="text-xl sm:text-2xl font-semibold mb-4">
            Book Appointment
          </p>

          {/* Days */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {docSlots.map((item, index) => (
              <div
                key={index}
                onClick={() => setSlotIndex(index)}
                className={`min-w-[90px] sm:min-w-[110px] rounded-xl px-3 py-2 text-center cursor-pointer border transition
                  ${slotIndex === index
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border-gray-200'
                  }`}
              >
                <p className="font-semibold">
                  {item[0] && daysOfWeek[item[0].datetime.getDay()]}
                </p>
                <p className="text-xs">
                  {item[0] && item[0].datetime.getDate()}
                </p>
              </div>
            ))}
          </div>

          {/* Time Slots */}
          <div className="mt-6">
            <p className="font-semibold mb-3">Available Time Slots</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {docSlots[slotIndex]?.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSlotTime(item.time)}
                  className={`px-4 py-2 rounded-xl border text-sm transition
                    ${slotTime === item.time
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border-gray-200'
                    }`}
                >
                  {item.time}
                </button>
              ))}
            </div>

            <button onClick={bookAppointment} className="mt-8 w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow transition">
              Book an Appointment
            </button>
          </div>
        </div>

        {/* Related Doctors */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />

      </div>
    </div>
  )
}

export default Appointment
