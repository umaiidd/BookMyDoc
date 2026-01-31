import { createContext, useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

export const AppContext = createContext()

const AppContextProvider = ({ children }) => {
  const currencySymbol = "$"
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const [doctors, setDoctors] = useState([])
  const [token, setToken] = useState(
    localStorage.getItem("token") || ""
  )
  const [userData, setUserData] = useState(null)

  /* -------------------- Doctors -------------------- */
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/doctor/list`
      )

      if (data.success) {
        setDoctors(data.doctors)
      } else {
        toast.error(data.message || "Failed to load doctors")
      }
    } catch (error) {
      console.error(error)
      toast.error("Failed to load doctors")
    }
  }

  /* -------------------- User Profile -------------------- */
  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/get-profile`,
        { headers: { token } }
      )

      if (data.success) {
        setUserData(data.userData)
      } else {
        setUserData(null)
        toast.error(data.message)
      }
    } catch (error) {
      console.error(error)
      setUserData(null)
      toast.error(
        error.response?.data?.message || "Failed to load profile"
      )
    }
  }

  /* -------------------- Effects -------------------- */
  useEffect(() => {
    getDoctorsData()
  }, [])

  useEffect(() => {
    if (token) {
      loadUserProfileData()
    } else {
      setUserData(null)
    }
  }, [token])

  /* -------------------- Context Value -------------------- */
  const value = {
    doctors, getDoctorsData,
    currencySymbol,
    backendUrl,

    token,
    setToken,

    userData,
    setUserData,

    loadUserProfileData
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
