import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {

  const navigate = useNavigate()

  return (
    <section className="w-full py-6 md:py-10 mb-10 px-4">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-6 bg-blue-100 rounded-2xl shadow-sm px-6 pt-6 md:pt-10">

        {/* Left Content */}
        <div className="text-center md:text-left">
          <p className="text-blue-700 text-xl sm:text-2xl md:text-3xl font-bold leading-snug">
            Book Appointment
          </p>

          <p className="text-gray-900 text-lg sm:text-xl md:text-2xl font-semibold mt-2">
            With 100+ Trusted Doctors
          </p>

          <button
            onClick={() => {
              navigate('/login')
              window.scrollTo(0, 0)
            }}
            className="mt-5 w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-full shadow transition-all"
          >
            Create Account
          </button>
        </div>

        {/* Right Image */}
        <div className="flex justify-center items-end">
          <img
            src={assets.appointment_img}
            alt="appointment"
            className="w-40 sm:w-48 md:w-56 object-contain drop-shadow-md"
          />
        </div>

      </div>
    </section>
  )
}

export default Banner
