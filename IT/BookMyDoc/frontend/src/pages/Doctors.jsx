import React, { useState, useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Doctors = () => {

  const { speciality } = useParams()
  const { doctors } = useContext(AppContext)
  const navigate = useNavigate()

  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const [showAll, setShowAll] = useState(false)

  const specialities = [
    'General Physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatrician',
    'Neurologist',
    'Gastroenterologist'
  ]

  // how many doctors to show initially on mobile
  const MOBILE_LIMIT = 6

  useEffect(() => {
    if (speciality) {
      setFilterDoc(
        doctors.filter(
          doc => doc.speciality.toLowerCase() === speciality.toLowerCase()
        )
      )
    } else {
      setFilterDoc(doctors)
    }

    // reset "More" when filter changes
    setShowAll(false)
  }, [speciality, doctors])

  // doctors to render
  const doctorsToShow =
    showAll ? filterDoc : filterDoc.slice(0, MOBILE_LIMIT)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

      {/* MOBILE HEADER + FILTER TOGGLE */}
      <div className="md:hidden mb-4 flex justify-between items-center">
        <p className="text-lg font-semibold text-gray-800">
          Doctors
        </p>

        <button
          onClick={() => setShowFilter(!showFilter)}
          className="px-4 py-2 text-sm rounded-full border border-gray-300 bg-white"
        >
          {showFilter ? 'Hide Filters' : 'Filter'}
        </button>
      </div>

      {/* MOBILE FILTERS (HIDDEN SCROLLBAR) */}
      {showFilter && (
        <div className="md:hidden mb-6">
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {specialities.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  speciality === item
                    ? navigate('/doctors')
                    : navigate(`/doctors/${encodeURIComponent(item)}`)
                  setShowFilter(false)
                }}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap border transition
                  ${speciality === item
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white border-gray-300'
                  }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-10">

        {/* DESKTOP SIDEBAR */}
        <div className="hidden md:block w-1/5">
          <p className="text-2xl font-semibold text-gray-800 mb-4">
            Browse through the doctors specialist.
          </p>

          <div className="space-y-2">
            {specialities.map((item, index) => (
              <p
                key={index}
                onClick={() =>
                  speciality === item
                    ? navigate('/doctors')
                    : navigate(`/doctors/${encodeURIComponent(item)}`)
                }
                className={`px-4 py-2 rounded-lg cursor-pointer transition
                  ${speciality === item
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                  }`}
              >
                {item}
              </p>
            ))}
          </div>
        </div>

        {/* DOCTORS GRID */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {doctorsToShow.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(`/appointment/${item._id}`)}
                className="bg-white border rounded-xl p-3 cursor-pointer transition
                           md:hover:shadow-xl md:hover:-translate-y-1"
              >
                {/* FACE-SAFE IMAGE */}
                <div className="w-full aspect-[3/4] rounded-lg bg-gray-50 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain sm:object-cover"
                  />
                </div>

                <div className="mt-3 space-y-1">
                  <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700 font-medium">
                    Available
                  </span>

                  <p className="font-semibold text-gray-900 text-sm sm:text-base">
                    {item.name}
                  </p>

                  <p className="text-blue-600 text-sm font-medium">
                    {item.speciality}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* MORE BUTTON (MOBILE ONLY) */}
          {!showAll && filterDoc.length > MOBILE_LIMIT && (
            <div className="md:hidden flex justify-center mt-8">
              <button
                onClick={() => setShowAll(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium shadow hover:bg-blue-700 transition"
              >
                More Doctors
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default Doctors
