import React from 'react'

const GoogleG = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.28 1.53 8.17 2.8l6-6C35.9 3 30.3 1 24 1 14.9 1 6.9 6.2 3 13.9l7 5.4C12.8 15 17.9 9.5 24 9.5z"/>
    <path fill="#34A853" d="M46.5 24c0-1.6-.2-2.8-.5-4H24v8h12.7c-.6 3.4-3.1 6.1-6.7 7.2l6 4.7C43.9 37.5 46.5 31.5 46.5 24z"/>
    <path fill="#FBBC05" d="M10.9 28.3A14.9 14.9 0 0 1 10 24c0-1.3.2-2.6.6-3.8L3.6 14.8A23 23 0 0 0 1 24c0 3.8.9 7.4 2.6 10.6l7.3-6.3z"/>
    <path fill="#4285F4" d="M24 46c6.3 0 11.6-2.1 15.5-5.6l-7.6-6.1C29.8 35.7 27 36.9 24 36.9c-6.1 0-11.2-5.3-11.9-12.2l-7.4 5.7C6.9 40.2 14.9 46 24 46z"/>
  </svg>
)

const ContinueWithGoogle = ({ isDark = false, href = '/api/auth/google' }) => {
  return (
    <a
      href={href}
      role="button"
      className={`flex items-center justify-center gap-3 w-full px-4 py-3 rounded-2xl border focus:outline-none transition ${isDark ? 'bg-[#121212] text-white border-gray-700' : 'bg-white text-gray-700 border-gray-200'} shadow-sm`}
    >
      <span className="bg-transparent p-0 flex items-center justify-center">
        <GoogleG />
      </span>
      <span className="text-sm font-medium">Continue with Google</span>
    </a>
  )
}

export default ContinueWithGoogle
// import React from 'react'

// const ContinueWithGoogle = () => {
//   return (
//     <div>ContinueWithGoogle</div>
//   )
// }

// export default ContinueWithGoogle