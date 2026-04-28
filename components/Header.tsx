"use client"

import React from 'react'
import { Menu, Search } from 'lucide-react'

type Props = {
  category: string
  searchQuery: string
  onSearchChange: (query: string) => void
  onMenuClick: () => void
}

export default function Header({ category, searchQuery, onSearchChange, onMenuClick }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={onMenuClick}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-100 transition-all duration-200 hover:bg-slate-700 hover:border-slate-600"
              aria-label="Open categories menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="min-w-0">
              <h1 className="text-lg font-semibold text-slate-50 truncate">{category} Questions</h1>
            </div>
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
