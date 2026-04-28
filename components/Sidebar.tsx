"use client"

import React from 'react'
import { BookOpen, Code2, Zap, Layers, Database, Radio } from 'lucide-react'

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
}

export default function Sidebar({ categories, active, onSelect }: Props) {
  return (
    <aside className="hidden md:flex flex-col w-64 flex-shrink-0 h-screen sticky top-0 border-r border-slate-800 bg-slate-900">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">IP</div>
          <div>
            <div className="font-semibold text-slate-50">Interview Prep</div>
            <div className="text-xs text-slate-400">Premium Edition</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {categories.map((c) => {
          const isActive = c === active
          return (
            <button
              key={c}
              onClick={() => onSelect(c)}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-indigo-900/30 text-indigo-400 shadow-lg border border-indigo-800'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-slate-100'
              }`}
            >
              <span className={isActive ? 'text-indigo-400' : 'text-slate-400'}>
                {CATEGORY_ICONS[c] || <BookOpen className="w-5 h-5" />}
              </span>
              <span className="flex-1">{c}</span>
              {isActive && <span className="text-xs bg-indigo-600 text-white rounded-full w-5 h-5 flex items-center justify-center">✓</span>}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
