// import React, { useState } from 'react'
// import {useAuth} from '../hook/useAuth'
// import { Link, useNavigate } from 'react-router'
// import ContinueWithGoogle from '../components/ContinueWithGoogle'

// const Register = () => {

//     const navigate=useNavigate()
//     const {handleRegister}=useAuth()

//   const [form, setForm] = useState({ fullName: '', email: '', contact: '', password: '', isSeller: false })

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target
//     setForm((s) => ({ ...s, [name]: type === 'checkbox' ? checked : value }))
//   }

//   const handleSubmit =async(e) => {
//     e.preventDefault()

//     await handleRegister({
//         email:form.email, 
//         fullname:form.fullName, 
//         contact:form.contact, 
//         password:form.password, 
//         isSeller:form.isSeller
//     })

//     navigate('/')

//   }

//   return (
//     <div className="h-screen w-full flex bg-[#f9f9f9] overflow-hidden">
//       {/* Left side - Form */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 bg-white relative order-2 lg:order-1 overflow-y-auto">
//         <div className="w-full max-w-md space-y-8">
          
//           <div className="text-left space-y-2">
//             <h1 className="text-4xl lg:text-5xl font-bold tracking-widest text-black uppercase" style={{ fontFamily: 'Epilogue, sans-serif' }}>
//               SNITCH
//             </h1>
//             <p className="text-[#474747] text-sm tracking-wider font-light uppercase">
//               Become a Member
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="space-y-4">
//               <div className="relative group">
//                 <input
//                   name="fullName"
//                   type="text"
//                   value={form.fullName}
//                   onChange={handleChange}
//                   placeholder="FULL NAME"
//                   required
//                   className="w-full bg-transparent border-b border-[#c6c6c6] pb-3 pt-2 text-[#1b1b1b] transition-all duration-300 focus:outline-none focus:border-black hover:border-[#777777] placeholder-[#adabaa] text-sm tracking-wide"
//                 />
//               </div>

//               <div className="relative group">
//                 <input
//                   name="email"
//                   type="email"
//                   value={form.email}
//                   onChange={handleChange}
//                   placeholder="EMAIL ADDRESS"
//                   required
//                   className="w-full bg-transparent border-b border-[#c6c6c6] pb-3 pt-2 text-[#1b1b1b] transition-all duration-300 focus:outline-none focus:border-black hover:border-[#777777] placeholder-[#adabaa] text-sm tracking-wide"
//                 />
//               </div>

//               <div className="relative group">
//                 <input
//                   name="contact"
//                   type="text"
//                   value={form.contact}
//                   onChange={handleChange}
//                   placeholder="CONTACT NO. (OPTIONAL)"
//                   className="w-full bg-transparent border-b border-[#c6c6c6] pb-3 pt-2 text-[#1b1b1b] transition-all duration-300 focus:outline-none focus:border-black hover:border-[#777777] placeholder-[#adabaa] text-sm tracking-wide"
//                 />
//               </div>

//               <div className="relative group">
//                 <input
//                   name="password"
//                   type="password"
//                   value={form.password}
//                   onChange={handleChange}
//                   placeholder="PASSWORD"
//                   required
//                   className="w-full bg-transparent border-b border-[#c6c6c6] pb-3 pt-2 text-[#1b1b1b] transition-all duration-300 focus:outline-none focus:border-black hover:border-[#777777] placeholder-[#adabaa] text-sm tracking-wide"
//                 />
//               </div>
//             </div>

//             <div className="flex items-center space-x-3 mt-4">
//               <label className="flex items-center cursor-pointer group">
//                 <div className="relative flex items-center">
//                   <input
//                     name="isSeller"
//                     type="checkbox"
//                     checked={form.isSeller}
//                     onChange={handleChange}
//                     className="peer sr-only"
//                   />
//                   <div className="w-5 h-5 border border-[#c6c6c6] peer-checked:bg-black peer-checked:border-black transition-all"></div>
//                   <svg className="absolute w-5 h-5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 p-0.5" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <span className="ml-3 text-xs tracking-wider text-[#474747] uppercase">Register as Seller</span>
//               </label>
//             </div>

//             <div className="pt-6 space-y-4">
//               <button
//                 type="submit"
//                 className="w-full py-4 bg-black text-[#e2e2e2] font-semibold tracking-widest text-sm uppercase transition-all duration-500 hover:bg-[#5e5e5e] hover:text-white"
//               >
//                 Create Account
//               </button>
              
//               <div className="w-full flex justify-center mt-2">
//                  <ContinueWithGoogle href={'/api/auth/google'} />
//               </div>
//             </div>

//             <div className="text-center pt-6">
//               <span className="text-xs tracking-wider text-[#474747]">
//                 ALREADY HAVE AN ACCOUNT?
//                 <Link to={'/login'} className="ml-2 text-black font-semibold hover:text-[#5e5e5e] transition-colors duration-300 uppercase">
//                   Log in
//                 </Link>
//               </span>
//             </div>
//           </form>
//         </div>
//       </div>

//       {/* Right side - Image */}
//       <div className="hidden lg:block lg:w-1/2 relative bg-[#1b1b1b] order-1 lg:order-2">
//         <div className="absolute inset-0 bg-black/10 z-10" />
//         <img 
//           src="/images/register.png" 
//           alt="Fashion Model" 
//           className="object-cover w-full h-full object-center"
//         />
//         <div className="absolute top-12 right-12 z-20 text-white text-right">
//           <h2 className="font-extralight text-4xl tracking-widest mb-2">OWN YOUR STYLE</h2>
//           <p className="text-sm tracking-wide opacity-80">Join the exclusive collective.</p>
//         </div>
//       </div>
//     </div>
    
//   )
// }

// export default Register


import React, { useState } from 'react'
import {useAuth} from '../hook/useAuth'
import { Link, useNavigate } from 'react-router'
import ContinueWithGoogle from '../components/ContinueWithGoogle'

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
    <div className="min-h-screen w-full flex bg-[#f9f9f9]">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 bg-white relative order-2 lg:order-1 overflow-y-auto">
        <div className="w-full max-w-md space-y-8">
          
          <div className="text-left space-y-2">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-widest text-black uppercase" style={{ fontFamily: 'Epilogue, sans-serif' }}>
              SNITCH
            </h1>
            <p className="text-[#474747] text-sm tracking-wider font-light uppercase">
              Become a Member
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <input
                  name="fullName"
                  type="text"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="FULL NAME"
                  required
                  className="w-full bg-transparent border-b border-[#c6c6c6] pb-3 pt-2 text-[#1b1b1b] transition-all duration-300 focus:outline-none focus:border-black hover:border-[#777777] placeholder-[#adabaa] text-sm tracking-wide"
                />
              </div>

              <div className="relative group">
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="EMAIL ADDRESS"
                  required
                  className="w-full bg-transparent border-b border-[#c6c6c6] pb-3 pt-2 text-[#1b1b1b] transition-all duration-300 focus:outline-none focus:border-black hover:border-[#777777] placeholder-[#adabaa] text-sm tracking-wide"
                />
              </div>

              <div className="relative group">
                <input
                  name="contact"
                  type="text"
                  value={form.contact}
                  onChange={handleChange}
                  placeholder="CONTACT NO. (OPTIONAL)"
                  className="w-full bg-transparent border-b border-[#c6c6c6] pb-3 pt-2 text-[#1b1b1b] transition-all duration-300 focus:outline-none focus:border-black hover:border-[#777777] placeholder-[#adabaa] text-sm tracking-wide"
                />
              </div>

              <div className="relative group">
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="PASSWORD"
                  required
                  className="w-full bg-transparent border-b border-[#c6c6c6] pb-3 pt-2 text-[#1b1b1b] transition-all duration-300 focus:outline-none focus:border-black hover:border-[#777777] placeholder-[#adabaa] text-sm tracking-wide"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3 mt-4">
              <label className="flex items-center cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    name="isSeller"
                    type="checkbox"
                    checked={form.isSeller}
                    onChange={handleChange}
                    className="peer sr-only"
                  />
                  <div className="w-5 h-5 border border-[#c6c6c6] peer-checked:bg-black peer-checked:border-black transition-all"></div>
                  <svg className="absolute w-5 h-5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 p-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="ml-3 text-xs tracking-wider text-[#474747] uppercase">Register as Seller</span>
              </label>
            </div>

            <div className="pt-6 space-y-4">
              <button
                type="submit"
                className="w-full py-4 bg-black text-[#e2e2e2] font-semibold tracking-widest text-sm uppercase transition-all duration-500 hover:bg-[#5e5e5e] hover:text-white"
              >
                Create Account
              </button>
              
              <div className="w-full flex justify-center mt-2">
                 <ContinueWithGoogle href={'/api/auth/google'} />
              </div>
            </div>

            <div className="text-center pt-6">
              <span className="text-xs tracking-wider text-[#474747]">
                ALREADY HAVE AN ACCOUNT?
                <Link to={'/login'} className="ml-2 text-black font-semibold hover:text-[#5e5e5e] transition-colors duration-300 uppercase">
                  Log in
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative bg-[#1b1b1b] order-1 lg:order-2">
        <div className="absolute inset-0 bg-black/10 z-10" />
        <img 
          src="/images/register.png" 
          alt="Fashion Model" 
          className="object-cover w-full h-full object-center"
        />
        <div className="absolute top-12 right-12 z-20 text-white text-right">
          <h2 className="font-extralight text-4xl tracking-widest mb-2">OWN YOUR STYLE</h2>
          <p className="text-sm tracking-wide opacity-80">Join the exclusive collective.</p>
        </div>
      </div>
    </div>
    
  )
}

export default Register