import type { Question } from '@/types/question'

// Import all category JSON files
import hrQuestions from './hr.json'
import pythonQuestions from './python.json'
import djangoQuestions from './django.json'
import fastapiQuestions from './fastapi.json'
import dsaQuestions from './dsa.json'
import codingQuestions from './coding.json'
import systemDesignQuestions from './system-design.json'
import awsQuestions from './aws.json'
import dockerQuestions from './docker.json'
import devopsQuestions from './devops.json'
import genaiQuestions from './gen-ai.json'

// Combine all questions
const allQuestions: Question[] = [
  ...hrQuestions,
  ...pythonQuestions,
  ...djangoQuestions,
  ...fastapiQuestions,
  ...dsaQuestions,
  ...codingQuestions,
  ...systemDesignQuestions,
  ...awsQuestions,
  ...dockerQuestions,
  ...devopsQuestions,
  ...genaiQuestions,
]

// Get unique categories
export const getCategories = (): string[] => {
  const categories = Array.from(new Set(allQuestions.map((q) => q.category)))
  return ['HR', 'Python', 'Django', 'FastAPI', 'DSA', 'Coding', 'System Design', 'AWS', 'Docker', 'DevOps', 'Gen AI'].filter((c) => categories.includes(c))
}

// Get question counts by category
export const getCategoryCounts = (): Record<string, number> => {
  return allQuestions.reduce<Record<string, number>>((counts, question) => {
    counts[question.category] = (counts[question.category] ?? 0) + 1
    return counts
  }, {})
}

// Get questions by category
export const getQuestionsByCategory = (category: string): Question[] => {
  return allQuestions.filter((q) => q.category === category)
}

// Search questions
export const searchQuestions = (query: string): Question[] => {
  if (!query.trim()) return allQuestions
  const lowerQuery = query.toLowerCase()
  return allQuestions.filter(
    (q) =>
      q.question.toLowerCase().includes(lowerQuery) ||
      q.answer.toLowerCase().includes(lowerQuery) ||
      q.keyPoints.some((kp) => kp.toLowerCase().includes(lowerQuery)) ||
      q.followUps.some((fu) => fu.toLowerCase().includes(lowerQuery))
  )
}

// Search by category and query
export const searchQuestionsByCategory = (category: string, query: string): Question[] => {
  const categoryQuestions = getQuestionsByCategory(category)
  if (!query.trim()) return categoryQuestions
  const lowerQuery = query.toLowerCase()
  return categoryQuestions.filter(
    (q) =>
      q.question.toLowerCase().includes(lowerQuery) ||
      q.answer.toLowerCase().includes(lowerQuery) ||
      q.keyPoints.some((kp) => kp.toLowerCase().includes(lowerQuery)) ||
      q.followUps.some((fu) => fu.toLowerCase().includes(lowerQuery))
  )
}

export default allQuestions
