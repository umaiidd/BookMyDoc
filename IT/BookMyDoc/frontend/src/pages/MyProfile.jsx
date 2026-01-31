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
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)

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

  return userData && (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header with gradient */}
          <div className="h-32 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
          
          {/* Profile Section */}
          <div className="px-6 sm:px-8 pb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 mb-8">
              {/* Profile Image */}
              {isEdit ? (
                <label htmlFor='image' className="cursor-pointer group">
                  <div className="relative">
                    <img 
                      src={image ? URL.createObjectURL(image) : userData.image} 
                      alt="Profile" 
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg group-hover:shadow-xl transition-all"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <img 
                        src={assets.upload_icon} 
                        alt="Upload" 
                        className="w-8 h-8 filter invert"
                      />
                    </div>
                  </div>
                  <input 
                    onChange={(e) => setImage(e.target.files[0])} 
                    type='file' 
                    id='image' 
                    hidden 
                    accept="image/*"
                  />
                </label>
              ) : (
                <img
                  src={userData.image}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
              )}

              {/* Name */}
              <div className="flex-1 text-center sm:text-left sm:pb-2">
                {isEdit ? (
                  <input
                    type="text"
                    value={userData.name}
                    onChange={e =>
                      setUserData(prev => ({ ...prev, name: e.target.value }))
                    }
                    className="text-2xl font-bold text-gray-800 bg-transparent border-b-2 border-blue-400 focus:border-blue-600 focus:outline-none px-2 py-1 transition-colors"
                  />
                ) : (
                  <h1 className="text-3xl font-bold text-gray-800 mb-1">
                    {userData.name}
                  </h1>
                )}
              </div>

              {/* Edit/Save Button */}
              <div className="sm:pb-2">
                {isEdit ? (
                  <button
                    onClick={updateUserProfileData}
                    className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all font-medium"
                  >
                    Save Changes
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEdit(true)}
                    className="px-6 py-2.5 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all font-medium"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-8">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-blue-500"></span>
                Contact Information
              </h2>

              <div className="space-y-5">
                {/* Email */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 group">
                  <p className="sm:w-32 text-sm font-semibold text-gray-500">Email</p>
                  <p className="text-gray-700 bg-gray-50 px-4 py-2.5 rounded-lg flex-1">{userData.email}</p>
                </div>

                {/* Phone */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                  <p className="sm:w-32 text-sm font-semibold text-gray-500">Phone</p>
                  {isEdit ? (
                    <input
                      type="text"
                      value={userData.phone}
                      onChange={e =>
                        setUserData(prev => ({ ...prev, phone: e.target.value }))
                      }
                      className="flex-1 border-2 border-gray-200 focus:border-blue-500 px-4 py-2.5 rounded-lg focus:outline-none transition-colors"
                    />
                  ) : (
                    <p className="text-gray-700 bg-gray-50 px-4 py-2.5 rounded-lg flex-1">{userData.phone}</p>
                  )}
                </div>

                {/* Address */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
                  <p className="sm:w-32 text-sm font-semibold text-gray-500 sm:pt-2.5">Address</p>
                  {isEdit ? (
                    <div className="flex-1 space-y-3">
                      <input
                        type="text"
                        value={userData.address.line1}
                        onChange={e =>
                          setUserData(prev => ({
                            ...prev,
                            address: { ...prev.address, line1: e.target.value }
                          }))
                        }
                        placeholder="Address Line 1"
                        className="w-full border-2 border-gray-200 focus:border-blue-500 px-4 py-2.5 rounded-lg focus:outline-none transition-colors"
                      />
                      <input
                        type="text"
                        value={userData.address.line2}
                        onChange={e =>
                          setUserData(prev => ({
                            ...prev,
                            address: { ...prev.address, line2: e.target.value }
                          }))
                        }
                        placeholder="Address Line 2"
                        className="w-full border-2 border-gray-200 focus:border-blue-500 px-4 py-2.5 rounded-lg focus:outline-none transition-colors"
                      />
                    </div>
                  ) : (
                    <p className="text-gray-700 bg-gray-50 px-4 py-2.5 rounded-lg flex-1">
                      {userData.address.line1}
                      <br />
                      {userData.address.line2}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div>
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-purple-500"></span>
                Basic Information
              </h2>

              <div className="space-y-5">
                {/* Gender */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                  <p className="sm:w-32 text-sm font-semibold text-gray-500">Gender</p>
                  {isEdit ? (
                    <select
                      value={userData.gender}
                      onChange={e =>
                        setUserData(prev => ({ ...prev, gender: e.target.value }))
                      }
                      className="flex-1 sm:flex-initial border-2 border-gray-200 focus:border-blue-500 px-4 py-2.5 rounded-lg focus:outline-none transition-colors bg-white cursor-pointer"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  ) : (
                    <p className="text-gray-700 bg-gray-50 px-4 py-2.5 rounded-lg flex-1">{userData.gender}</p>
                  )}
                </div>

                {/* DOB */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                  <p className="sm:w-32 text-sm font-semibold text-gray-500">Birthday</p>
                  {isEdit ? (
                    <input
                      type="date"
                      value={userData.dob.split('T')[0]}
                      onChange={e =>
                        setUserData(prev => ({ ...prev, dob: e.target.value }))
                      }
                      className="flex-1 sm:flex-initial border-2 border-gray-200 focus:border-blue-500 px-4 py-2.5 rounded-lg focus:outline-none transition-colors"
                    />
                  ) : (
                    <p className="text-gray-700 bg-gray-50 px-4 py-2.5 rounded-lg flex-1">{userData.dob.split('T')[0]}</p>
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