import React, { useState } from 'react'
import { useAuth } from '../hook/useAuth'
import { Link, useNavigate } from 'react-router'
import ContinueWithGoogle from '../components/ContinueWithGoogle'

const Login = () => {
    const navigate=useNavigate()
    const {handleLogin}=useAuth()
  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((s) => ({ ...s, [name]: value }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    
    const user=await handleLogin({
        email:form.email,
        password:form.password
    })

if(user.role=='buyer'){
  navigate('/')
}else if(user.role=='seller'){
  navigate('/seller/dashboard')
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extralight text-gray-900">FAB_MENS</h1>
          <p className="mt-2 text-gray-500">Welcome back — sign in to continue.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-transparent space-y-5">
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
            <label className="block text-xs font-medium text-gray-600 mb-2">PASSWORD</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••••"
              required
              className="w-full rounded-2xl bg-gray-100 placeholder-gray-400 px-4 py-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition transform hover:scale-[1.002]"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full mt-6 py-4 rounded-full bg-gradient-to-r from-purple-600 to-violet-700 text-white font-semibold text-lg shadow-md hover:scale-[1.01] transform transition"
            >
              Sign In
            </button>
          </div>

          <div>
            <ContinueWithGoogle href={'/api/auth/google'} />
          </div>

          <div className="text-center mt-6 text-sm text-gray-500">
            Don't have an account? <Link to={'/register'} className="text-purple-600 font-medium">Create one</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login