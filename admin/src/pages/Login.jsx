import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'

const Login = () => {

  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { setAToken, backendUrl } = useContext(AdminContext)
  const { setDToken } = useContext(DoctorContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(
          `${backendUrl}/api/admin/login`,
          {
            email: email.trim(),
            password
          }
        )

        if (data.success) {
          toast.success('Login successful')
          localStorage.setItem('aToken', data.token)
          setAToken(data.token)
        }
      }
      else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
        if (data.success) {
          localStorage.setItem('dToken', data.token)
          setDToken(data.token)
        }
        else {
          toast.error(data.message)
        }
      }
    } catch (err) {
      const message =
        err.response?.data?.message || 'Invalid email or password'

      toast.error(message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md bg-white/90 backdrop-blur rounded-3xl shadow-xl px-6 py-8 sm:px-8"
      >
        {/* Heading */}
        <div className="text-center mb-7">
          <p className="text-3xl font-bold text-gray-800 tracking-tight">
            <span className="text-blue-600">{state}</span> Login
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Please enter your credentials to continue
          </p>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email Address
          </label>
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 border rounded-xl bg-white
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       transition shadow-sm"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 border rounded-xl bg-white
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       transition shadow-sm"
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98]
                     text-white py-3 rounded-xl font-semibold
                     shadow-md transition-all duration-200"
        >
          Login
        </button>

        {/* Toggle Role */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            {state === 'Admin' ? 'Doctor Login?' : 'Admin Login?'}{' '}
            <span
              onClick={() =>
                setState(state === 'Admin' ? 'Doctor' : 'Admin')
              }
              className="text-blue-600 cursor-pointer hover:underline font-semibold"
            >
              Click here
            </span>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login
