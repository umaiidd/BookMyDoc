import React, { useContext, useState, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } =
    useContext(DoctorContext)
  const { currency } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
        about: profileData.about
      }

      const { data } = await axios.post(
        backendUrl + '/api/doctor/update-profile',
        updateData,
        { headers: { dToken } }
      )

      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (dToken) getProfileData()
  }, [dToken])

  if (!profileData) return null

  return (
    <div className="w-full bg-gray-50 p-6">
      <div className="w-full h-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200 flex flex-col">

        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              className="w-32 h-32 sm:w-36 sm:h-36 rounded-3xl object-cover shadow-xl ring-4 ring-white flex-shrink-0"
              src={profileData.image}
              alt={profileData.name}
            />

            <div className="flex-1 min-w-0 text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                {profileData.name}
              </h1>
              <div className="inline-flex items-center gap-3 bg-white px-5 py-2.5 rounded-2xl shadow-md mb-3 border border-gray-200">
                <span className="font-semibold">{profileData.degree}</span>
                <span className="text-gray-400">•</span>
                <span className="font-semibold">{profileData.speciality}</span>
              </div>
              <p className="font-semibold text-gray-700">
                {profileData.experience} Years of Experience
              </p>
            </div>

            <div className="flex-shrink-0">
              {isEdit ? (
                <button
                  onClick={updateProfile}
                  className="bg-green-600 text-white px-6 py-2.5 rounded-2xl font-semibold shadow-lg hover:bg-green-700 transition-all"
                >
                  Save Profile
                </button>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-2xl font-semibold shadow-lg hover:bg-blue-700 transition-all"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-8 py-6 flex flex-col gap-6">

          {/* About */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">About Doctor</h2>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              {isEdit ? (
                <textarea
                  value={profileData.about || ''}
                  onChange={(e) =>
                    setProfileData(prev => ({ ...prev, about: e.target.value }))
                  }
                  className="w-full resize-none px-4 py-3 border-2 border-blue-300 rounded-xl focus:outline-none focus:border-blue-500 text-gray-700 h-40 leading-relaxed bg-white"
                />
              ) : (
                <div className="px-4 py-3 h-40 overflow-y-auto">
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                    {profileData.about}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Grid — Fees + Address */}
          <div className="grid sm:grid-cols-2 gap-6">

            {/* Fees */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
                Consultation Fee
              </h3>
              {isEdit ? (
                <input
                  type="number"
                  value={profileData.fees}
                  onChange={(e) =>
                    setProfileData(prev => ({ ...prev, fees: Number(e.target.value) }))
                  }
                  className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl text-2xl font-bold text-gray-900 focus:outline-none focus:border-blue-500 bg-white"
                />
              ) : (
                <div className="px-4 py-3">
                  <p className="text-3xl font-bold text-gray-900">
                    {currency} {profileData.fees}
                  </p>
                </div>
              )}
            </div>

            {/* Address */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
                Clinic Address
              </h3>
              {isEdit ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Address Line 1"
                    value={profileData.address?.line1 || ''}
                    onChange={(e) =>
                      setProfileData(prev => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value }
                      }))
                    }
                    className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl text-sm focus:outline-none focus:border-blue-500 bg-white"
                  />
                  <input
                    type="text"
                    placeholder="Address Line 2"
                    value={profileData.address?.line2 || ''}
                    onChange={(e) =>
                      setProfileData(prev => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value }
                      }))
                    }
                    className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl text-sm focus:outline-none focus:border-blue-500 bg-white"
                  />
                </div>
              ) : (
                <div className="px-4 py-3">
                  <p className="text-gray-700 text-sm leading-loose">
                    {profileData.address?.line1}
                    {profileData.address?.line2 && (
                      <><br />{profileData.address.line2}</>
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Availability */}
          <div>
            <button
              disabled={!isEdit}
              onClick={() =>
                setProfileData(prev => ({ ...prev, available: !prev.available }))
              }
              className={`px-6 py-3 rounded-2xl font-bold border-2 transition-all ${profileData.available
                ? 'bg-green-50 border-green-200 text-green-700'
                : 'bg-red-50 border-red-200 text-red-700'
                } ${!isEdit ? 'cursor-default opacity-80' : 'hover:shadow-md active:scale-95'}`}
            >
              {profileData.available ? '✓ Available' : '✕ Not Available'}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default DoctorProfile