"use client"

import React from 'react'
import type { Question } from '../types/question'
import { Terminal, Lightbulb } from 'lucide-react'

export default function QuestionViewer({ q }: { q?: Question }) {
  if (!q) {
    return (
      <div className="card max-w-3xl mx-auto text-center py-20">
        <div className="h-20 w-20 bg-slate-800/50 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Terminal className="w-10 h-10 text-slate-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-200 mb-2">No question selected</h2>
        <p className="text-slate-400">Please select a category from the sidebar to begin.</p>
      </div>
    )
  }

  // Helper to format the answer with simple code detection
  const renderAnswer = (text: string) => {
    const parts = text.split('\n')
    return parts.map((line, i) => {
      if (line.trim().startsWith('#') || line.trim().startsWith('//') || line.includes(' = ') || line.includes('(')) {
        if (line.length > 20) {
          return (
            <code key={i} className="block bg-slate-950/50 border border-slate-800 rounded-lg p-3 my-2 font-mono text-sm text-indigo-300 overflow-x-auto whitespace-pre">
              {line}
            </code>
          )
        }
      }
      return <p key={i} className="mb-4 last:mb-0">{line}</p>
    })
  }

  return (
    <article className="max-w-4xl mx-auto space-y-6">
      <div className="card overflow-hidden !p-0">
        <div className="bg-gradient-to-r from-indigo-500/10 to-transparent p-6 sm:p-8 border-b border-slate-800/50">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase tracking-wider border border-indigo-500/20">
              {q.category}
            </span>
            <span className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">Question ID: {q.id}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-slate-50 leading-tight tracking-tight">
            {q.question}
          </h1>
        </div>

        <div className="p-6 sm:p-8 space-y-8 bg-slate-900/40">
          <section>
            <div className="flex items-center gap-2 mb-6 text-indigo-400">
              <Lightbulb className="w-5 h-5" />
              <h3 className="text-sm font-bold uppercase tracking-wider">Expert Answer</h3>
            </div>
            <div className="text-slate-300 text-lg leading-relaxed space-y-1">
              <div className="whitespace-pre-wrap">{q.answer}</div>
            </div>
          </section>

          {q.code && (
            <section className="pt-8 border-t border-slate-800/50">
              <div className="flex items-center gap-2 mb-6 text-slate-400">
                <Terminal className="w-5 h-5" />
                <h3 className="text-sm font-bold uppercase tracking-wider">Reference Code</h3>
              </div>
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <pre className="relative overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-5 text-sm leading-6 text-slate-200 font-mono shadow-2xl">
                  <code className="whitespace-pre">{q.code}</code>
                </pre>
              </div>
            </section>
          )}
        </div>
      </div>
    </article>
  )
}
