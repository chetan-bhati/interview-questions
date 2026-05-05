import React from 'react'
import type { Question } from '../types/question'

export default function QuestionCard({ q }: { q: Question }) {
  return (
    <article className="card">
      <h2 className="text-lg font-semibold mb-2">{q.question}</h2>
      <p className="text-gray-700 mb-4">{q.answer}</p>
    </article>
  )
}
