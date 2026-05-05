"use client"

import React from 'react'
import Link from 'next/link'
import { BookOpen, Code2, Zap, Layers, Database, Radio, X } from 'lucide-react'

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'HR': <BookOpen className="w-5 h-5" />,
  'Python': <Code2 className="w-5 h-5" />,
  'Django': <Zap className="w-5 h-5" />,
  'FastAPI': <Radio className="w-5 h-5" />,
  'DSA': <Layers className="w-5 h-5" />,
  'System Design': <Database className="w-5 h-5" />,
}

type Props = {
  categories: string[]
  active: string
  onSelect: (cat: string) => void
  mobile?: boolean
  categoryCounts?: Record<string, number>
  onClose?: () => void
}

export default function Sidebar({ categories, active, onSelect, mobile = false, categoryCounts = {}, onClose }: Props) {
  const containerClassName = mobile
    ? 'fixed inset-y-0 left-0 z-50 flex flex-col w-72 h-screen border-r border-slate-800 bg-slate-900 shadow-2xl overflow-hidden'
    : 'hidden md:flex flex-col w-64 flex-shrink-0 h-screen sticky top-0 border-r border-slate-800 bg-slate-900 overflow-hidden'

  return (
    <aside className={containerClassName}>
      <div className="p-6 border-b border-slate-800 flex items-start justify-between gap-3 bg-slate-900/50 backdrop-blur-xl">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/20">IP</div>
          <div>
            <div className="font-bold text-slate-50 tracking-tight">Interview Prep</div>
            <div className="text-[10px] uppercase font-bold text-indigo-400 tracking-widest">Premium</div>
          </div>
        </div>
        {mobile && onClose && (
          <button
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-300 transition-all duration-200 hover:bg-slate-700 hover:text-slate-50"
            aria-label="Close categories menu"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
        {categories.map((c) => {
          const isActive = c === active
          const count = categoryCounts[c]
          return (
            <button
              key={c}
              onClick={() => onSelect(c)}
              className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 text-sm font-semibold transition-all duration-300 group ${
                isActive
                  ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-lg shadow-indigo-500/5'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent'
              }`}
            >
              <span className={`transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`}>
                {CATEGORY_ICONS[c] || <BookOpen className="w-5 h-5" />}
              </span>
              <span className="flex-1 truncate">{c}</span>
              <span className="flex items-center gap-2">
                {typeof count === 'number' && (
                  <span className={`text-[10px] font-bold rounded-md px-1.5 py-0.5 border tabular-nums ${
                    isActive ? 'bg-indigo-500/20 border-indigo-500/30 text-indigo-300' : 'bg-slate-800/50 border-slate-700/50 text-slate-500'
                  }`}>
                    {count}
                  </span>
                )}
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></div>
                )}
              </span>
            </button>
          )
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 bg-slate-900/50">
        <div className="p-3 rounded-xl bg-slate-800/30 border border-slate-700/30">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Your Progress</p>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full w-1/3 shadow-[0_0_8px_rgba(99,102,241,0.4)]"></div>
          </div>
        </div>
      </div>
    </aside>
  )
}
