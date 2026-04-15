import React from 'react'

const LogoToggle = ({ isDark, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle theme"
      className="flex items-center gap-3 focus:outline-none"
    >
      {isDark ? (
        <svg
          width="40"
          height="40"
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 cursor-pointer transform-gpu scale-105"
        >
          <defs>
            <linearGradient id="dg" x1="0" x2="1">
              <stop offset="0%" stopColor="#BB86FC" />
              <stop offset="100%" stopColor="#3F51B5" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect x="4" y="4" width="56" height="56" rx="12" fill="url(#dg)" filter="url(#glow)" />
          <circle cx="46" cy="18" r="5" fill="#C35167" opacity="0.95" />
          <text x="32" y="38" textAnchor="middle" fontFamily="Inter, Helvetica, Arial" fontWeight="600" fontSize="20" fill="#0f172a">Mode</text>
        </svg>
      ) : (
        <svg
          width="40"
          height="40"
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 transform-gpu cursor-pointer hover:rotate-3"
        >
          <defs>
            <linearGradient id="lgFill" x1="0" x2="1">
              <stop offset="0%" stopColor="#BB86FC" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#C35167" stopOpacity="0.12" />
            </linearGradient>
            <linearGradient id="strokeG" x1="0" x2="1">
              <stop offset="0%" stopColor="#BB86FC" />
              <stop offset="60%" stopColor="#3F51B5" />
              <stop offset="100%" stopColor="#C35167" />
            </linearGradient>
          </defs>
          <rect  x="4" y="4" width="56" height="56" rx="12" fill="url(#lgFill)" stroke="url(#strokeG)" strokeWidth="1.8" />
          <text  x="32" y="36" textAnchor="middle" fontFamily="Inter, Helvetica, Arial" fontWeight="700" fontSize="18" fill="#3F51B5">Mode</text>
          <circle cx="46" cy="18" r="4" fill="#BB86FC" opacity="0.95" />
        </svg>
      )}
      <span className={`cursor-pointer text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{isDark ? 'Dark' : 'Light'}</span>
    </button>
  )
}

export default LogoToggle
