"use client"

import React from 'react'
import { Search } from 'lucide-react'

type Props = {
  category: string
  searchQuery: string
  onSearchChange: (query: string) => void
}

export default function Header({ category, searchQuery, onSearchChange }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-slate-50">{category} Questions</h1>
            <p className="text-sm text-slate-400">Tailored for engineers • Master your interview skills</p>
          </div>
          <div className="relative hidden sm:block w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-700 bg-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
