import React from 'react'

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 bg-indigo-600 rounded-md flex items-center justify-center text-white font-bold">IP</div>
        <span className="font-semibold">Interview Prep</span>
      </div>
      <div className="text-sm text-gray-600">HR Questions · Tailored for engineers</div>
    </nav>
  )
}
