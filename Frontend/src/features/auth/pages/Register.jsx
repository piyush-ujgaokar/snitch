import React, { useState } from 'react'
import {useAuth} from '../hook/useAuth'
import { Link, useNavigate } from 'react-router'

const Register = () => {

    const navigate=useNavigate()
    const {handleRegister}=useAuth()

  const [form, setForm] = useState({ fullName: '', email: '', contact: '', password: '', isSeller: false })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((s) => ({ ...s, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit =async(e) => {
    e.preventDefault()

    await handleRegister({
        email:form.email, 
        fullname:form.fullName, 
        contact:form.contact, 
        password:form.password, 
        isSeller:form.isSeller
    })

    navigate('/')

  }

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extralight text-gray-900">Fab_Mens_Wear</h1>
          <p className="mt-2 text-gray-500">Own Your Style.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-transparent space-y-5">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">FULL NAME</label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Alexandros Vance"
              required
              className="w-full rounded-2xl bg-gray-100 placeholder-gray-400 px-4 py-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition transform hover:scale-[1.002]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">EMAIL</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="vance@curator.io"
              required
              className="w-full rounded-2xl bg-gray-100 placeholder-gray-400 px-4 py-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition transform hover:scale-[1.002]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">CONTACT NO.</label>
            <input
              name="contact"
              value={form.contact}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
              required
              className="w-full rounded-2xl bg-gray-100 placeholder-gray-400 px-4 py-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition transform hover:scale-[1.002]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">PASSWORD</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••••••"
              required
              className="w-full rounded-2xl bg-gray-100 placeholder-gray-400 px-4 py-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition transform hover:scale-[1.002]"
            />
          </div>

          <div className="flex items-center space-x-3 mt-1">
            <label className="inline-flex items-center">
              <input
                name="isSeller"
                type="checkbox"
                checked={form.isSeller}
                onChange={handleChange}
                className="h-5 w-5 rounded-md border-gray-300 text-purple-600 focus:ring-purple-400"
              />
            </label>
            <span className="text-sm text-gray-700">Register as Seller</span>
          </div>

          <div>
            <button
              type="submit"
              className="w-full mt-6 py-4 rounded-full bg-gradient-to-r from-purple-600 to-violet-700 text-white font-semibold text-lg shadow-md hover:scale-[1.01] transform transition"
            >
              Create Account
            </button>
          </div>

          <div className="text-center mt-6 text-sm text-gray-500">
            Already have an account? <Link to={'/login'} className="text-purple-600 font-medium">Log in</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register