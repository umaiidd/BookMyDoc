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
    'Gynaecologist',
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

  // On mobile: slice unless showAll. On desktop: always show all (handled via CSS)
  const mobileDoctors = showAll ? filterDoc : filterDoc.slice(0, MOBILE_LIMIT)

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

          {/* MOBILE GRID — limited until "More" is clicked */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:hidden">
            {mobileDoctors.map((item, index) => (
              <DoctorCard key={index} item={item} navigate={navigate} />
            ))}
          </div>

          {/* DESKTOP GRID — always shows ALL doctors */}
          <div className="hidden md:grid lg:grid-cols-4 md:grid-cols-3 gap-5">
            {filterDoc.map((item, index) => (
              <DoctorCard key={index} item={item} navigate={navigate} />
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


const DoctorCard = ({ item, navigate }) => (
  <div
    onClick={() => navigate(`/appointment/${item._id}`)}
    className="bg-white border-white rounded-xl p-3 cursor-pointer transition
               hover:shadow-xl hover:-translate-y-1"
  >
    <div className="w-full aspect-[3/4] rounded-lg bg-gray-50 overflow-hidden">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-full object-contain sm:object-cover"
      />
    </div>

    <div className="mt-3 space-y-1">
     <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        ${item.available
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-gray-100 text-gray-500'
                    }`}
                >
                  {item.available ? 'Available' : 'Unavailable'}
                </span>
      <p className="font-semibold text-gray-900 text-sm sm:text-base">
        {item.name}
      </p>

      <p className="text-blue-600 text-sm font-medium">
        {item.speciality}
      </p>
    </div>
  </div>
)

export default Doctors