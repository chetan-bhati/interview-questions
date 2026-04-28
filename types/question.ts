export type Question = {
  id: number
  question: string
  answer: string
  code?: string | null
  keyPoints: string[]
  followUps: string[]
  difficulty?: 'easy' | 'medium' | 'hard'
  category: string
}
