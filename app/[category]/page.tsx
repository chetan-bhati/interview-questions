"use client"

import React, { useMemo, useState, useEffect } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import QuestionViewer from '../../components/QuestionViewer'
import NavigationControls from '../../components/NavigationControls'
import { getCategories, getCategoryCounts, searchQuestionsByCategory } from '../../data/loader'

export default function CategoryPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const category = (params.category as string) || 'HR'
  const initialIndex = parseInt(searchParams.get('i') || '0', 10)

  const categories = useMemo(() => getCategories(), [])
  const categoryCounts = useMemo(() => getCategoryCounts(), [])
  
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [index, setIndex] = useState(initialIndex)

  // Get filtered questions
  const filtered = useMemo(() => {
    return searchQuestionsByCategory(category, searchQuery)
  }, [category, searchQuery])

  // Sync state with URL and localStorage
  useEffect(() => {
    localStorage.setItem('last_category', category)
    localStorage.setItem(`last_index_${category}`, index.toString())
    
    // Update URL without full reload to reflect current question index
    const url = new URL(window.location.href)
    url.searchParams.set('i', index.toString())
    window.history.replaceState({}, '', url.toString())
  }, [category, index])

  // Reset index if category changes or search query changes
  useEffect(() => {
    // We only reset if the index is out of bounds or it's a new category
    // But since the index is in the URL, we should be careful.
    // If it's a fresh category navigation from sidebar, index will be 0 from the link.
  }, [category])

  const current = filtered[index] || filtered[0]

  const handleCategorySelect = (c: string) => {
    const lastIndexForCat = localStorage.getItem(`last_index_${c}`) || '0'
    router.push(`/${c}?i=${lastIndexForCat}`)
    setMobileMenuOpen(false)
  }

  const handleNext = () => {
    if (index < filtered.length - 1) {
      setIndex(i => i + 1)
    }
  }

  const handlePrev = () => {
    if (index > 0) {
      setIndex(i => i - 1)
    }
  }

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}
      
      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-y-0 left-0 z-40 w-72 md:hidden animate-fade-in">
          <Sidebar
            mobile
            categoryCounts={categoryCounts}
            categories={categories}
            active={category}
            onClose={() => setMobileMenuOpen(false)}
            onSelect={handleCategorySelect}
          />
        </div>
      )}

      {/* Desktop Sidebar */}
      <Sidebar 
        categories={categories} 
        categoryCounts={categoryCounts} 
        active={category} 
        onSelect={handleCategorySelect} 
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0">
        <Header
          category={category}
          searchQuery={searchQuery}
          onSearchChange={(val) => {
            setSearchQuery(val)
            setIndex(0) // Reset index on search
          }}
          onMenuClick={() => setMobileMenuOpen(true)}
        />

        <main className="flex-1 overflow-y-auto scroll-smooth">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12">
            {searchQuery && (
              <div className="mb-6 p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-sm text-indigo-300 flex items-center justify-between">
                <span>Showing {filtered.length} result{filtered.length !== 1 ? 's' : ''} for "{searchQuery}"</span>
                <button onClick={() => setSearchQuery('')} className="text-xs hover:underline">Clear search</button>
              </div>
            )}

            {filtered.length > 0 ? (
              <div className="space-y-8 animate-fade-in">
                <QuestionViewer q={current} />
                
                <div className="max-w-3xl mx-auto">
                  <NavigationControls
                    index={index}
                    total={filtered.length}
                    onNext={handleNext}
                    onPrev={handlePrev}
                  />
                </div>
              </div>
            ) : (
              <div className="card max-w-3xl mx-auto text-center py-16">
                <div className="h-16 w-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-200 mb-2">No questions found</h3>
                <p className="text-slate-400">
                  {searchQuery ? `We couldn't find any questions matching "${searchQuery}" in ${category}.` : `This category seems to be empty.`}
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
