export type Question = {
  id: number
  question: string
  answer: string
  keyPoints: string[]
  followUps: string[]
  difficulty?: 'easy' | 'medium' | 'hard'
  category: string
}
