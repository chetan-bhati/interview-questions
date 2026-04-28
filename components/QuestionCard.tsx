import React from 'react'
import type { Question } from '../types/question'

export default function QuestionCard({ q }: { q: Question }) {
  return (
    <article className="card">
      <h2 className="text-lg font-semibold mb-2">{q.question}</h2>
      <p className="text-gray-700 mb-4">{q.answer}</p>

      <div className="mb-3">
        <h3 className="font-medium text-sm text-gray-800 mb-1">Key Points</h3>
        <ul className="list-disc list-inside text-sm text-gray-700">
          {q.keyPoints.map((kp, i) => (
            <li key={i}>{kp}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-medium text-sm text-gray-800 mb-1">Follow-ups</h3>
        <ul className="list-disc list-inside text-sm text-gray-700">
          {q.followUps.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}
