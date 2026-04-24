// import React, { useState } from 'react'
// import { useAuth } from '../hook/useAuth'
// import { Link, useNavigate } from 'react-router'
// import ContinueWithGoogle from '../components/ContinueWithGoogle'

// const Login = () => {
//   const navigate = useNavigate()
//   const { handleLogin } = useAuth()
//   const [form, setForm] = useState({ email: '', password: '' })

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setForm((s) => ({ ...s, [name]: value }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     const user = await handleLogin({
//       email: form.email,
//       password: form.password
//     })

//     if (user.role == 'buyer') {
//       navigate('/')
//     } else if (user.role == 'seller') {
//       navigate('/seller/dashboard')
//     }
//   }

//   return (
//     <div className="min-h-screen w-full flex bg-[#f9f9f9]">
//       {/* Left side - Image */}
//       <div className="hidden lg:block lg:w-1/2 relative bg-[#1b1b1b]">
//         <div className="absolute inset-0 bg-black/20 z-10" />
//         <img
//           src="/images/login.png"
//           alt="Fashion Model"
//           className="object-cover w-full h-full object-center"
//         />
//         <div className="absolute bottom-12 left-12 z-20 text-white">
//           <h2 className="font-extralight text-4xl tracking-widest mb-2">FAB_MENS</h2>
//           <p className="text-sm tracking-wide opacity-80">Discover the avant-garde collection.</p>
//         </div>
//       </div>

//       {/* Right side - Form */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white relative">
//         <div className="w-full max-w-md space-y-12">

//           <div className="text-left space-y-4">
//             <h1 className="text-4xl lg:text-5xl font-bold tracking-widest text-black uppercase" style={{ fontFamily: 'Epilogue, sans-serif' }}>
//               SNITCH
//             </h1>
//             <p className="text-[#474747] text-sm tracking-wider font-light">
//               ENTER YOUR CREDENTIALS
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-8">
//             <div className="space-y-6">
//               <div className="relative group">
//                 <label className="block text-xs font-semibold tracking-widest text-[#1b1b1b] mb-2 uppercase" style={{ fontFamily: 'Manrope, sans-serif' }}>Email Address</label>
//                 <input
//                   name="email"
//                   type="email"
//                   value={form.email}
//                   onChange={handleChange}
//                   placeholder="name@example.com"
//                   required
//                   className="w-full bg-transparent border-b border-[#c6c6c6] pb-3 pt-2 text-[#1b1b1b] transition-all duration-300 focus:outline-none focus:border-black hover:border-[#777777] placeholder-[#adabaa]"
//                 />
//               </div>

//               <div className="relative group">
//                 <label className="block text-xs font-semibold tracking-widest text-[#1b1b1b] mb-2 uppercase" style={{ fontFamily: 'Manrope, sans-serif' }}>Password</label>
//                 <input
//                   name="password"
//                   type="password"
//                   value={form.password}
//                   onChange={handleChange}
//                   placeholder="••••••••"
//                   required
//                   className="w-full bg-transparent border-b border-[#c6c6c6] pb-3 pt-2 text-[#1b1b1b] transition-all duration-300 focus:outline-none focus:border-black hover:border-[#777777] placeholder-[#adabaa]"
//                 />
//               </div>
//             </div>

//             <div className="flex items-center justify-between mt-2">
//               <a href="#" className="text-xs font-medium tracking-wide text-[#777777] hover:text-black transition-colors duration-300">
//                 FORGOT PASSWORD?
//               </a>
//             </div>

//             <div className="pt-4 space-y-4">
//               <button
//                 type="submit"
//                 className="w-full py-4 bg-black text-[#e2e2e2] font-semibold tracking-widest text-sm uppercase transition-all duration-500 hover:bg-[#5e5e5e] hover:text-white"
//               >
//                 Sign In
//               </button>

//               <div className="w-full border border-[#c6c6c6] hover:border-black transition-colors duration-300 p-1 flex justify-center">
//                 <ContinueWithGoogle href={'/api/auth/google'} />
//               </div>
//             </div>

//             <div className="text-center pt-8">
//               <span className="text-xs tracking-wider text-[#474747]">
//                 DON'T HAVE AN ACCOUNT?
//                 <Link to={'/register'} className="ml-2 text-black font-semibold hover:text-[#5e5e5e] transition-colors duration-300">
//                   REGISTER
//                 </Link>
//               </span>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Login


import React, { useState } from 'react'
import { useAuth } from '../hook/useAuth'
import { Link, useNavigate } from 'react-router'
import ContinueWithGoogle from '../components/ContinueWithGoogle'

const Login = () => {
  const navigate = useNavigate()
  const { handleLogin } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((s) => ({ ...s, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const user = await handleLogin({
      email: form.email,
      password: form.password
    })

    if (user.role == 'buyer') {
      navigate('/')
    } else if (user.role == 'seller') {
      navigate('/seller/dashboard')
    }
  }

  return (
    <div className="h-screen w-full flex bg-[#f9f9f9] overflow-hidden">
      {/* Left side - Image */}
      <div className=" hidden lg:block lg:w-1/2 relative bg-[#1b1b1b] h-full">
        <div className="absolute inset-0 bg-black/20 z-10" />
        <img
          src="/images/login.png"
          alt="Fashion Model"
          className="object-cover w-full h-full object-center"
        />
        <div className="absolute bottom-12 left-12 z-20 text-white">
          <h2 className="font-extralight text-4xl tracking-widest mb-2">FAB_MENS</h2>
          <p className="text-sm tracking-wide opacity-80">Discover collection.</p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-12 bg-white relative">
        <div className="w-full max-w-md space-y-12">

          <div className="text-left space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-widest text-black uppercase" style={{ fontFamily: 'Epilogue, sans-serif' }}>
              FAB MENS
            </h1>
            <p className="text-[#474747] text-sm tracking-wider font-light">
              ENTER YOUR CREDENTIALS
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="relative group">
                <label className="block text-xs font-semibold tracking-widest text-[#1b1b1b] mb-2 uppercase" style={{ fontFamily: 'Manrope, sans-serif' }}>Email Address</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  required
                  className="w-full bg-transparent border-b border-[#c6c6c6] pb-3 pt-2 text-[#1b1b1b] transition-all duration-300 focus:outline-none focus:border-black hover:border-[#777777] placeholder-[#adabaa]"
                />
              </div>

              <div className="relative group">
                <label className="block text-xs font-semibold tracking-widest text-[#1b1b1b] mb-2 uppercase" style={{ fontFamily: 'Manrope, sans-serif' }}>Password</label>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full bg-transparent border-b border-[#c6c6c6] pb-3 pt-2 text-[#1b1b1b] transition-all duration-300 focus:outline-none focus:border-black hover:border-[#777777] placeholder-[#adabaa]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-2">
              <a href="#" className="text-xs font-medium tracking-wide text-[#777777] hover:text-black transition-colors duration-300">
                FORGOT PASSWORD?
              </a>
            </div>

            <div className="pt-4 space-y-4">
              <button
                type="submit"
                className="w-full py-4 bg-black text-[#e2e2e2] font-semibold tracking-widest text-sm uppercase transition-all duration-500 hover:bg-[#5e5e5e] hover:text-white"
              >
                Sign In
              </button>

              <div className="w-full  transition-colors duration-300 p-1 flex justify-center">
                <ContinueWithGoogle href={'/api/auth/google'} />
              </div>
            </div>

            <div className="text-center pt-8">
              <span className="text-xs tracking-wider text-[#474747]">
                DON'T HAVE AN ACCOUNT?
                <Link to={'/register'} className="ml-2 text-black font-semibold hover:text-[#5e5e5e] transition-colors duration-300">
                  REGISTER
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login