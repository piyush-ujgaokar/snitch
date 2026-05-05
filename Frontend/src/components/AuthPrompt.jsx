import React from 'react'
import { useNavigate } from 'react-router'

const AuthPrompt = ({ message = "You are not logged in. Please login or register first.", onClose }) => {
  const navigate = useNavigate()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-md mx-4 bg-white text-black rounded-lg shadow-xl border border-[#e8e8e8] p-8 flex flex-col items-center">
        <h3 className="text-lg font-bold tracking-wider uppercase mb-2" style={{ fontFamily: 'Epilogue, sans-serif' }}>Not Signed In</h3>
        <p className="text-sm text-[#444444] text-center mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>{message}</p>

        <div className="w-full flex gap-3">
          <button
            onClick={() => navigate('/login')}
            className="flex-1 py-3 bg-black text-white text-xs font-bold tracking-[0.2em] uppercase rounded transition-colors hover:bg-[#1f1f1f]"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="flex-1 py-3 bg-white text-black text-xs font-bold tracking-[0.2em] uppercase rounded border border-[#c6c6c6] hover:border-black transition-colors"
          >
            Register
          </button>
        </div>

        <button onClick={onClose} className="mt-4 text-xs text-[#777777] hover:text-black">Close</button>
      </div>
    </div>
  )
}

export default AuthPrompt
