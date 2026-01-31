import React, { useContext, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext)
  const { currency } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available
      }

      // Fixed: removed extra curly braces around updateData
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
      console.log(error)
    }
  }

  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])

  return profileData && (
    <div className="min-h-screen bg-gray-50 py-6 pl-4 sm:pl-6 lg:pl-8 pr-2">
      <div className="w-full">

        {/* Main Profile Container */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200 w-6xl">

          {/* Header Section */}
          <div className="relative bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 px-6 sm:px-10 lg:px-12 py-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

              {/* Profile Image */}
              <div className="flex-shrink-0">
                <img
                  className="w-32 h-32 sm:w-36 sm:h-36 rounded-3xl object-cover shadow-xl ring-4 ring-white"
                  src={profileData.image}
                  alt={profileData.name}
                />
              </div>

              {/* Doctor Info */}
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                  {profileData.name}
                </h1>
                <div className="inline-flex items-center gap-3 bg-white px-5 py-2.5 rounded-2xl shadow-md mb-3 border border-gray-200">
                  <span className="text-gray-700 font-semibold text-base">{profileData.degree}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-700 font-semibold text-base">{profileData.speciality}</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-3 text-gray-700">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="font-semibold text-base">{profileData.experience} Years of Experience</span>
                </div>
              </div>

              {/* Edit Button */}
              {isEdit ? (
                <button
                  onClick={updateProfile}
                  className="sm:absolute top-6 right-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Save Profile
                </button>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="sm:absolute top-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="px-6 sm:px-10 lg:px-12 py-6">

            {/* About Section */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                About Doctor
              </h2>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <p className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
                  {profileData.about}
                </p>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid sm:grid-cols-2 gap-6 mb-6">

              {/* Appointment Fee Card */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-xl shadow-md">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Consultation Fee</h3>
                    {isEdit ? (
                      <input
                        type='number'
                        onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))}
                        value={profileData.fees}
                        className="w-full px-4 py-2 border-2 border-blue-300 rounded-xl focus:outline-none focus:border-blue-500 text-2xl font-bold text-gray-900"
                      />
                    ) : (
                      <p className="text-3xl font-bold text-gray-900">
                        {currency} {profileData.fees}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Address Card */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-xl shadow-md flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Clinic Address</h3>
                    {isEdit ? (
                      <div className="space-y-2">
                        <input
                          type='text'
                          onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                          value={profileData.address.line1}
                          className="w-full px-3 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800"
                          placeholder="Address Line 1"
                        />
                        <input
                          type='text'
                          onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                          value={profileData.address.line2}
                          className="w-full px-3 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800"
                          placeholder="Address Line 2"
                        />
                      </div>
                    ) : (
                      <p className="text-gray-800 leading-relaxed text-base">
                        {profileData.address.line1}
                        <br />
                        {profileData.address.line2}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Availability Status */}
            <div className="flex items-center justify-center sm:justify-start">
              {isEdit ? (
                <button
                  onClick={() => setProfileData(prev => ({ ...prev, available: !prev.available }))}
                  className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl shadow-sm border-2 font-bold text-base transition-all duration-200 ${profileData.available
                      ? 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100'
                      : 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100'
                    }`}
                >
                  {profileData.available ? (
                    <>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Available (Click to toggle)</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span>Not Available (Click to toggle)</span>
                    </>
                  )}
                </button>
              ) : (
                <>
                  {profileData.available ? (
                    <div className="inline-flex items-center gap-3 bg-green-50 border-2 border-green-200 text-green-700 px-6 py-3 rounded-2xl shadow-sm">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-bold text-base">Available</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-3 bg-red-50 border-2 border-red-200 text-red-700 px-6 py-3 rounded-2xl shadow-sm">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span className="font-bold text-base">Not Available</span>
                    </div>
                  )}
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile