import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <section id="speciality" className="w-full py-10 sm:py-14 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-5">

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
          Find by <span className="text-blue-600">Speciality</span>
        </h1>

        {/* Description */}
        <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Browse trusted medical specialities and connect with experts you can rely on.
        </p>

        {/* Speciality Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-5 sm:gap-6 mt-8 place-items-center">
          {specialityData.map((item, index) => (
            <Link
              key={index}
              to={`/doctors/${item.speciality}`}
              onClick={() => window.scrollTo(0, 0)}
              className="flex flex-col items-center gap-2 sm:gap-3 cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.speciality}
                className="
                  w-20 h-20
                  sm:w-24 sm:h-24
                  md:w-28 md:h-28
                  rounded-full object-cover
                  shadow-md
                  transition
                  md:hover:-translate-y-2 md:hover:shadow-xl
                  active:scale-95
                "
              />

              <p className="text-sm sm:text-base font-medium text-gray-700 hover:text-blue-600 transition">
                {item.speciality}
              </p>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}

export default SpecialityMenu
