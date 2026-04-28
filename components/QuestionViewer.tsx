"use client"

import React from 'react'
import type { Question } from '../types/question'

export default function QuestionViewer({ q }: { q?: Question }) {
  if (!q) {
    return (
      <div className="card max-w-3xl mx-auto text-center py-12">
        <p className="text-slate-400">No questions in this category.</p>
      </div>
    )
  }

  return (
    <article className="max-w-3xl mx-auto">
      <div className="card">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-50 leading-snug">{q.question}</h1>
        </header>

        <section className="mb-8 pb-8 border-b border-slate-800">
          <p className="text-slate-300 text-lg leading-relaxed">{q.answer}</p>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xs uppercase font-semibold text-slate-400 tracking-wide mb-4">Key Points</h3>
            <ul className="space-y-3">
              {q.keyPoints.map((kp, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-300">
                  <span className="text-indigo-400 font-bold mt-1">•</span>
                  <span>{kp}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase font-semibold text-slate-400 tracking-wide mb-4">Follow-up Questions</h3>
            <ul className="space-y-3">
              {q.followUps.map((f, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-300">
                  <span className="text-indigo-400 font-bold mt-1">•</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  )
}
