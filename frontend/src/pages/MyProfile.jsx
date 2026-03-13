import React, { useState, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('phone', userData.phone || 'Not Added')
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender || 'Not Specified')
      formData.append('dob', userData.dob || 'Not Added')
      image && formData.append('image', image)

      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || error.message)
    }
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-gray-500 text-sm font-medium">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br bg-white py-8 px-3 sm:px-6">
      <div className="max-w-3xl mx-auto">

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

          {/* Header Banner */}
          <div className="h-28 sm:h-36 bg-gradient-to-r from-blue-200 to-indigo-300" />

          <div className="px-5 sm:px-8 pb-8">

            {/* Avatar + Name + Button Row */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6 -mt-14 sm:-mt-16 mb-8">

              {/* Profile Image */}
              {isEdit ? (
                <label htmlFor='image' className="cursor-pointer group shrink-0">
                  <div className="relative">
                    <img
                      src={image ? URL.createObjectURL(image) : userData.image}
                      alt="Profile"
                      className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-lg group-hover:shadow-xl transition-all"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <img src={assets.upload_icon} alt="Upload" className="w-7 h-7 filter invert" />
                    </div>
                  </div>
                  <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden accept="image/*" />
                </label>
              ) : (
                <img
                  src={userData.image}
                  alt="Profile"
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-lg shrink-0"
                />
              )}

              {/* Name */}
              <div className="flex-1 text-center sm:text-left sm:pb-2">
                {isEdit ? (
                  <input
                    type="text"
                    value={userData.name}
                    onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
                    className="text-xl sm:text-2xl font-bold text-gray-800 bg-transparent border-b-2 border-blue-400 focus:border-blue-600 focus:outline-none px-2 py-1 transition-colors w-full sm:w-auto"
                  />
                ) : (
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{userData.name}</h1>
                )}
                <p className="text-sm text-gray-400 mt-1">{userData.email}</p>
              </div>

              {/* Edit/Save Button */}
              <div className="sm:pb-2">
                {isEdit ? (
                  <button
                    onClick={updateUserProfileData}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-full hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all font-semibold text-sm whitespace-nowrap"
                  >
                    Save Changes
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEdit(true)}
                    className="border-2 border-blue-600 text-blue-600 px-5 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all font-semibold text-sm whitespace-nowrap"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-gray-200 rounded-2xl p-5 sm:p-6">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full inline-block" />
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6">
                  <p className="sm:w-28 text-sm font-semibold text-gray-500">Email</p>
                  <p className="text-gray-700 bg-white border border-gray-200 px-4 py-2.5 rounded-xl flex-1 text-sm">{userData.email}</p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6">
                  <p className="sm:w-28 text-sm font-semibold text-gray-500">Phone</p>
                  {isEdit ? (
                    <input
                      type="text"
                      value={userData.phone}
                      onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                      className="flex-1 border-2 border-gray-200 focus:border-blue-500 px-4 py-2.5 rounded-xl focus:outline-none transition-colors text-sm"
                    />
                  ) : (
                    <p className="text-gray-700 bg-white border border-gray-200 px-4 py-2.5 rounded-xl flex-1 text-sm">{userData.phone}</p>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-6">
                  <p className="sm:w-28 text-sm font-semibold text-gray-500 sm:pt-2.5">Address</p>
                  {isEdit ? (
                    <div className="flex-1 space-y-3">
                      <input
                        type="text"
                        value={userData.address.line1}
                        onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                        placeholder="Address Line 1"
                        className="w-full border-2 border-gray-200 focus:border-blue-500 px-4 py-2.5 rounded-xl focus:outline-none transition-colors text-sm"
                      />
                      <input
                        type="text"
                        value={userData.address.line2}
                        onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                        placeholder="Address Line 2"
                        className="w-full border-2 border-gray-200 focus:border-blue-500 px-4 py-2.5 rounded-xl focus:outline-none transition-colors text-sm"
                      />
                    </div>
                  ) : (
                    <p className="text-gray-700 bg-white border border-gray-200 px-4 py-2.5 rounded-xl flex-1 text-sm">
                      {userData.address.line1 || 'Not Added'}
                      {userData.address.line2 && <><br />{userData.address.line2}</>}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-gray-200 rounded-2xl p-5 sm:p-6">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full inline-block" />
                Basic Information
              </h2>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6">
                  <p className="sm:w-28 text-sm font-semibold text-gray-500">Gender</p>
                  {isEdit ? (
                    <select
                      value={userData.gender}
                      onChange={e => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                      className="flex-1 sm:flex-initial border-2 border-gray-200 focus:border-blue-500 px-4 py-2.5 rounded-xl focus:outline-none transition-colors bg-white cursor-pointer text-sm"
                    >
                  
                      <option value="Not Specified">Not Specified</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  ) : (
                    <p className="text-gray-700 bg-white border border-gray-200 px-4 py-2.5 rounded-xl flex-1 text-sm">{userData.gender}</p>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6">
                  <p className="sm:w-28 text-sm font-semibold text-gray-500">Birthday</p>
                  {isEdit ? (
                    <input
                      type="date"
                      value={userData.dob && userData.dob !== 'Not Added' ? userData.dob.split('T')[0] : ''}
                      onChange={e => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                      className="flex-1 sm:flex-initial border-2 border-gray-200 focus:border-blue-500 px-4 py-2.5 rounded-xl focus:outline-none transition-colors text-sm"
                    />
                  ) : (
                    <p className="text-gray-700 bg-white border border-gray-200 px-4 py-2.5 rounded-xl flex-1 text-sm">
                      {userData.dob && userData.dob !== 'Not Added' ? userData.dob.split('T')[0] : 'Not Added'}
                    </p>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile