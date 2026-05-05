"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCategories } from '../data/loader'

export default function RootPage() {
  const router = useRouter()
  
  useEffect(() => {
    // Check localStorage for last visited category
    const lastCategory = localStorage.getItem('last_category')
    const categories = getCategories()
    const defaultCategory = categories.includes(lastCategory || '') ? lastCategory : (categories[0] || 'HR')
    
    // Check for last index
    const lastIndex = localStorage.getItem(`last_index_${defaultCategory}`) || '0'
    
    // Redirect to category with index
    router.replace(`/${defaultCategory}?i=${lastIndex}`)
  }, [router])

  return (
    <div className="flex h-screen items-center justify-center bg-slate-950">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
        <p className="text-slate-400 font-medium">Restoring your progress...</p>
      </div>
    </div>
  )
}
