export type Question = {
  id: number
  question: string
  answer: string
  code?: string | null
  difficulty?: 'easy' | 'medium' | 'hard'
  category: string
}
