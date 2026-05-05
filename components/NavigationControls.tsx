"use client"

import React, { useEffect } from 'react'
import { ChevronLeft, ChevronRight, Keyboard } from 'lucide-react'

type Props = {
  index: number
  total: number
  onNext: () => void
  onPrev: () => void
}

export default function NavigationControls({ index, total, onNext, onPrev }: Props) {
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onNext, onPrev])

  const progress = ((index + 1) / total) * 100

  return (
    <div className="w-full space-y-8">
      {/* Progress Section */}
      <div className="relative p-6 rounded-3xl bg-slate-900/40 border border-slate-800/50 backdrop-blur-sm overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-slate-800/50">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:200%_100%] animate-[gradient_3s_linear_infinite] transition-all duration-500 ease-out shadow-[0_0_15px_rgba(99,102,241,0.3)]" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Current Progress</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-100 tabular-nums">{index + 1}</span>
              <span className="text-slate-500 font-medium">/ {total}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/50">
              <Keyboard className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Arrows to navigate</span>
            </div>
            <p className="text-[10px] text-slate-600 font-medium italic">Auto-saving your position...</p>
          </div>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={onPrev}
          disabled={index <= 0}
          className="flex-1 group relative flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 font-bold transition-all duration-300 hover:bg-slate-800 hover:text-white hover:border-slate-700 disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
          <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span>Previous</span>
        </button>

        <button
          onClick={onNext}
          disabled={index >= total - 1}
          className="flex-[2] group relative flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-indigo-600 text-white font-bold transition-all duration-300 hover:bg-indigo-500 hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] disabled:opacity-30 disabled:cursor-not-allowed overflow-hidden shadow-xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
          <span>Next Question</span>
          <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}
