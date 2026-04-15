import React, { useState } from 'react'
import { useAuth } from '../hook/useAuth'
import { Link, useNavigate } from 'react-router'
import LogoToggle from '../components/LogoToggle'
import ContinueWithGoogle from '../components/ContinueWithGoogle'

const Login = () => {
    const navigate=useNavigate()
    const {handleLogin}=useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [isDark, setIsDark] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((s) => ({ ...s, [name]: value }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    
    await handleLogin({
        email:form.email,
        password:form.password
    })

    navigate('/')

  }

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-[#121212] text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className={`text-5xl font-extralight ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>FAB_MENS</h1>
            <p className={`mt-2 ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>Welcome back — sign in to continue.</p>
          </div>
          <LogoToggle isDark={isDark} onToggle={() => setIsDark((s) => !s)} />
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
              className={`w-full rounded-2xl px-4 py-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#BB86FC] transition transform hover:scale-[1.002] ${isDark ? 'bg-[#1f1f1f] text-gray-200' : 'bg-gray-100 text-gray-700'}`}
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
              className={`w-full rounded-2xl px-4 py-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#BB86FC] transition transform hover:scale-[1.002] ${isDark ? 'bg-[#1f1f1f] text-gray-200' : 'bg-gray-100 text-gray-700'}`}
            />
          </div>

          <div>
            <button
              type="submit"
              className={`w-full mt-6 py-4 rounded-full text-white font-semibold text-lg shadow-md hover:scale-[1.01] transform transition ${isDark ? 'bg-gradient-to-r from-[#BB86FC] to-[#3F51B5]' : 'bg-gradient-to-r from-purple-600 to-violet-700'}`}
            >
              Sign In
            </button>
          </div>

          <div>
            <ContinueWithGoogle isDark={isDark} href={'/api/auth/google'} />
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