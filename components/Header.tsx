"use client"

import React from 'react'
import { Menu, Search, Command } from 'lucide-react'

type Props = {
  category: string
  searchQuery: string
  onSearchChange: (query: string) => void
  onMenuClick: () => void
}

export default function Header({ category, searchQuery, onSearchChange, onMenuClick }: Props) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-800/50 bg-slate-950/60 backdrop-blur-xl">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <button
              onClick={onMenuClick}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-800/50 text-slate-100 transition-all duration-200 hover:bg-slate-700 hover:border-slate-600 active:scale-95"
              aria-label="Open categories menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="min-w-0">
              <h1 className="text-xl font-bold text-slate-50 truncate tracking-tight flex items-center gap-2">
                <span className="text-indigo-400">#</span>
                {category}
              </h1>
            </div>
          </div>
          
          <div className="flex-1 max-w-md relative group hidden sm:block">
            <div className="absolute inset-0 bg-indigo-500/10 rounded-xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center">
              <Search className="absolute left-3.5 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
              <input
                type="text"
                placeholder="Search everything..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-12 py-2.5 rounded-xl border border-slate-800 bg-slate-900/50 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200"
              />
              <div className="absolute right-3 hidden lg:flex items-center gap-1 px-1.5 py-1 rounded bg-slate-800 border border-slate-700">
                <Command className="w-2.5 h-2.5 text-slate-400" />
                <span className="text-[10px] font-bold text-slate-400">K</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
             <div className="hidden lg:flex items-center -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400 overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 123}`} alt="User" />
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-slate-950 bg-indigo-500/20 flex items-center justify-center text-[10px] font-bold text-indigo-400 backdrop-blur-md">
                  +12
                </div>
             </div>
          </div>
        </div>
      </div>
    </header>
  )
}
